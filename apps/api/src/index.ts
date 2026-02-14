import Fastify, { FastifyRequest, FastifyInstance } from 'fastify';
import { randomUUID, timingSafeEqual } from 'crypto';
import { formParty } from '@fated/matchmaker';
import { AppEvent } from '@fated/events';
import { InMemoryEventStore } from '@fated/event-store';

const fastify = Fastify({ logger: true });

// Authentication Hook
const API_SECRET = process.env.API_SECRET;

// Enforce security in production
if (process.env.NODE_ENV === 'production' && !API_SECRET) {
    console.error('FATAL: API_SECRET environment variable is required in production.');
    process.exit(1);
}

const EFFECTIVE_API_SECRET = API_SECRET || 'dev-api-secret';

fastify.addHook('preHandler', async (request, reply) => {
    // Exclude GitHub webhooks from this auth mechanism
    if (request.url.startsWith('/webhooks/github')) {
        return;
    }

    // Exclude simple health check if it existed (not currently defined but safe to exclude)
    if (request.url === '/health') {
        return;
    }

    const apiKey = request.headers['x-api-key'];

    if (!apiKey || typeof apiKey !== 'string') {
        return reply.status(401).send({ error: 'Unauthorized' });
    }

    // Constant-time comparison to prevent timing attacks
    const secretBuffer = Buffer.from(EFFECTIVE_API_SECRET);
    const keyBuffer = Buffer.from(apiKey);

    if (secretBuffer.length !== keyBuffer.length) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }

    if (!timingSafeEqual(secretBuffer, keyBuffer)) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }
});

// Global error handler for production resilience
fastify.setErrorHandler((error: any, request: FastifyRequest, reply: any) => {
    // Log full error internally for debugging
    console.error('Error:', error);

    // Handle Prisma unique constraint violations (P2002)
    if (error.code === 'P2002') {
        return reply.status(409).send({ error: 'Resource conflict' });
    }

    // Handle SQLite errors
    if (error.message?.includes('SQLITE') || error.code === 'P3000') {
        return reply.status(500).send({ error: 'Internal storage error' });
    }

    // Handle validation errors from Zod
    if (error.name === 'ZodError') {
        return reply.status(400).send({ error: 'Validation failed', details: error.errors });
    }

    // Default: return sanitized error
    return reply.status(error.statusCode || 500).send({
        error: error.message || 'Operation failed'
    });
});

// In-Memory Event Store with Materialized State
// Pass hydrate=true to load state from SQLite on startup
const store = new InMemoryEventStore(true);

// Register GitHub Webhook Routes
githubRoutes(fastify, { store });

// POST /contribute
fastify.post('/contribute', async (request: FastifyRequest<{ Body: AppEvent }>, reply) => {
    const result = store.append(request.body);

    if (!result.ok) {
        const error = result as { ok: false; error: unknown };
        return reply.status(400).send({ error: 'Invalid contribution payload', details: error.error });
    }

    return {
        success: true,
        eventId: result.eventId,
        message: 'Contribution recorded'
    };
});

// POST /verify
fastify.post('/verify', async (request: FastifyRequest<{ Body: AppEvent }>, reply) => {
    const result = store.append(request.body);

    if (!result.ok) {
        const error = result as { ok: false; error: unknown };
        return reply.status(400).send({ error: 'Invalid verification payload', details: error.error });
    }

    return {
        success: true,
        eventId: result.eventId,
        message: 'Verification recorded'
    };
});

// GET /leaderboard
fastify.get('/leaderboard', async (request: FastifyRequest<{ Querystring: { offset?: string; limit?: string } }>) => {
    const offset = Number(request.query.offset) || 0;
    const limit = Number(request.query.limit) || 50;

    const leaderboard = store.getLeaderboard({ offset, limit });
    const total = store.getUserCount();

    return {
        leaderboard: leaderboard.map(entry => ({
            userId: entry.userId,
            totalXP: entry.total,
            pendingXP: entry.pending,
            contributions: entry.contributions,
            lastActivity: entry.lastActivity
        })),
        total
    };
});

// GET /team
fastify.get('/team', async () => {
    const state = store.getState();
    const party = formParty(state);

    return {
        team: party.members.map((m) => ({
            userId: m.userId,
            role: m.role,
            score: m.score
        })),
        totalPower: party.totalPower
    };
});

// ============================================
// BONDING CURVE / STAKING ENDPOINTS
// ============================================

import {
    stakeRep,
    releaseStake,
    createTicket,
    claimTicket,
    completeTicket,
    processForfeitures,
    getStakeSummary,
    listOpenTickets,
    getTicket
} from '@fated/bonding';

import { githubRoutes } from './routes/github';

// POST /stake - Lock REP to stake
fastify.post('/stake', async (request: FastifyRequest<{ Body: { actorId: string; amount: number } }>, reply) => {
    const { actorId, amount } = request.body;

    if (!actorId || !amount) {
        return reply.status(400).send({ error: 'actorId and amount required' });
    }

    try {
        const stake = await stakeRep({ actorId, amount });
        return { success: true, stake };
    } catch (err) {
        return reply.status(400).send({ error: (err as Error).message });
    }
});

// POST /unstake - Release a stake
fastify.post('/unstake', async (request: FastifyRequest<{ Body: { actorId: string; stakeId: string } }>, reply) => {
    const { actorId, stakeId } = request.body;

    if (!actorId || !stakeId) {
        return reply.status(400).send({ error: 'actorId and stakeId required' });
    }

    try {
        const result = await releaseStake({ actorId, stakeId });
        return { success: true, ...result };
    } catch (err) {
        return reply.status(400).send({ error: (err as Error).message });
    }
});

// POST /ticket - Create a new ticket
fastify.post('/ticket', async (request: FastifyRequest<{
    Body: {
        workPackageId: string;
        title: string;
        description?: string;
        bondRequired: number;
        deadline: string;
    }
}>, reply) => {
    const { workPackageId, title, description, bondRequired, deadline } = request.body;

    if (!workPackageId || !title || !bondRequired || !deadline) {
        return reply.status(400).send({ error: 'workPackageId, title, bondRequired, and deadline required' });
    }

    try {
        const ticket = await createTicket({
            workPackageId,
            title,
            description,
            bondRequired,
            deadline: new Date(deadline),
        });
        return { success: true, ticket };
    } catch (err) {
        return reply.status(400).send({ error: (err as Error).message });
    }
});

// POST /claim - Claim a ticket
fastify.post('/claim', async (request: FastifyRequest<{ Body: { actorId: string; ticketId: string } }>, reply) => {
    const { actorId, ticketId } = request.body;

    if (!actorId || !ticketId) {
        return reply.status(400).send({ error: 'actorId and ticketId required' });
    }

    try {
        const result = await claimTicket({ actorId, ticketId });
        return { success: true, ...result };
    } catch (err) {
        return reply.status(400).send({ error: (err as Error).message });
    }
});

// POST /complete - Complete a claimed ticket
fastify.post('/complete', async (request: FastifyRequest<{ Body: { ticketId: string; verifierId: string } }>, reply) => {
    const { ticketId, verifierId } = request.body;

    if (!ticketId || !verifierId) {
        return reply.status(400).send({ error: 'ticketId and verifierId required' });
    }

    try {
        const result = await completeTicket({ ticketId, verifierId });
        return { success: true, ...result };
    } catch (err) {
        return reply.status(400).send({ error: (err as Error).message });
    }
});

// POST /forfeit - Process overdue tickets (cron endpoint)
fastify.post('/forfeit', async (request: FastifyRequest<{ Body: { slashPercent?: number } }>, reply) => {
    const slashPercent = request.body?.slashPercent ?? 0.5;

    try {
        const results = await processForfeitures(slashPercent);
        return { success: true, processed: results.length, results };
    } catch (err) {
        return reply.status(500).send({ error: (err as Error).message });
    }
});

// GET /tickets - List open tickets
fastify.get('/tickets', async (request: FastifyRequest<{ Querystring: { limit?: string } }>) => {
    const limit = Number(request.query.limit) || 20;
    const tickets = await listOpenTickets(limit);
    return { tickets };
});

// GET /ticket/:id - Get ticket details
fastify.get('/ticket/:id', async (request: FastifyRequest<{ Params: { id: string } }>) => {
    const ticket = await getTicket(request.params.id);
    if (!ticket) {
        return { error: 'Ticket not found' };
    }
    return { ticket };
});

// GET /stake/:actorId - Get stake summary for actor
fastify.get('/stake/:actorId', async (request: FastifyRequest<{ Params: { actorId: string } }>) => {
    const summary = await getStakeSummary(request.params.actorId);
    return summary;
});

// POST /mint-rep - Mint REP for testing (REMOVE IN PRODUCTION)
fastify.post('/mint-rep', async (request: FastifyRequest<{ Body: { actorId: string; amount: number } }>, reply) => {
    const { actorId, amount } = request.body;

    if (!actorId || !amount) {
        return reply.status(400).send({ error: 'actorId and amount required' });
    }

    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    try {
        const actor = await prisma.actorState.upsert({
            where: { actorId },
            update: { currentRep: { increment: amount } },
            create: { actorId, currentRep: amount, stakedRep: 0 },
        });
        return { success: true, actor };
    } finally {
        await prisma.$disconnect();
    }
});

// ============================================
// THE REAPER - Automatic Forfeiture Cron
// ============================================

const REAPER_INTERVAL_MS = 60 * 1000; // Run every 60 seconds

console.log(`[Reaper] ⏰ Starting automatic forfeiture checks (every ${REAPER_INTERVAL_MS/1000}s)`);

setInterval(async () => {
    try {
        const results = await processForfeitures(0.5); // 50% slash
        if (results.length > 0) {
            console.log(`[Reaper] 💀 Executed ${results.length} forfeitures:`, results);
        }
    } catch (err) {
        console.error('[Reaper] ❌ Error during forfeiture:', err);
    }
}, REAPER_INTERVAL_MS);

// Manual trigger for testing
fastify.post('/admin/reaper', async () => {
    const results = await processForfeitures(0.5);
    return { success: true, processed: results.length, results };
});

// Start server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('🚀 FatedFortress API running at http://localhost:3000');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
