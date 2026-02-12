import Fastify from 'fastify';
import { calculateState } from '@fated/xp-logic';
import { formParty } from '@fated/matchmaker';
import { AppEvent } from '@fated/events';
import crypto from 'crypto';

const fastify = Fastify({ logger: true });

// In-Memory Event Store
const EVENTS: AppEvent[] = [];

// POST /contribute
fastify.post('/contribute', async (request: any, reply) => {
    const body = request.body as any;

    // Validate required fields manually
    if (!body || !body.payload || !body.payload.userId || !body.payload.url) {
        return reply.status(400).send({
            error: 'Invalid contribution payload',
            details: { fieldErrors: { payload: ['Required: userId, url, etc.'] } }
        });
    }

    const event: AppEvent = {
        id: body.id || crypto.randomUUID(),
        streamId: body.streamId || body.payload.userId,
        timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
        type: 'CONTRIBUTION_SUBMITTED',
        payload: {
            userId: body.payload.userId,
            url: body.payload.url,
            complexityScore: body.payload.complexityScore,
        },
    };

    EVENTS.push(event);

    return {
        success: true,
        eventId: event.id,
        message: 'Contribution recorded'
    };
});

// POST /verify
fastify.post('/verify', async (request: any, reply) => {
    const body = request.body as any;

    if (!body || !body.payload || !body.payload.verifierId || !body.payload.targetContributionId) {
        return reply.status(400).send({
            error: 'Invalid verification payload',
            details: { fieldErrors: { payload: ['Required: verifierId, targetContributionId, verdict'] } }
        });
    }

    const event: AppEvent = {
        id: body.id || crypto.randomUUID(),
        streamId: body.streamId || body.payload.verifierId,
        timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
        type: 'VERIFICATION_SUBMITTED',
        payload: {
            verifierId: body.payload.verifierId,
            targetContributionId: body.payload.targetContributionId,
            verdict: body.payload.verdict || 'APPROVE',
            qualityScore: body.payload.qualityScore,
        },
    };

    EVENTS.push(event);

    return {
        success: true,
        eventId: event.id,
        message: 'Verification recorded'
    };
});

// GET /leaderboard
fastify.get('/leaderboard', async () => {
    const state = calculateState(EVENTS);

    const leaderboard = Object.entries(state)
        .map(([userId, xp]: [string, any]) => ({
            userId,
            totalXP: xp.total,
            pendingXP: xp.pending,
            contributions: xp.contributions,
            lastActivity: xp.lastActivity
        }))
        .sort((a: any, b: any) => b.totalXP - a.totalXP);

    return { leaderboard };
});

// GET /team
fastify.get('/team', async () => {
    const state = calculateState(EVENTS);
    const party = formParty(state);

    return {
        team: party.members.map((m: any) => ({
            userId: m.userId,
            role: m.role,
            score: m.score
        })),
        totalPower: party.totalPower
    };
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
