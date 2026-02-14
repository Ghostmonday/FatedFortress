/**
 * @fated/api
 * Main API Server - Modular Architecture
 */

import Fastify, { FastifyRequest, FastifyInstance } from 'fastify';
import { randomUUID } from 'crypto';
import { PrismaClient } from '@prisma/client';

// Domain imports
import {
  stakeRep,
  releaseStake,
  createTicket,
  claimTicket,
  completeTicket,
  processForfeitures,
  getStakeSummary,
  listOpenTickets,
  getTicket,
} from '@fated/domain-bonding';

import { formParty, type MemberInput } from '@fated/domain-matching';

// Infrastructure imports
import { InMemoryEventStore } from '@fated/infra-event-store';
import { AppEventSchema, type AppEvent } from '@fated/core';

import {
  verifyGitHubSignature,
  extractTicketId,
  GitHubPRPayloadSchema,
} from '@fated/infra-webhooks';

// ============================================
// SERVER SETUP
// ============================================

const fastify = Fastify({ logger: true });

const prisma = new PrismaClient();
const store = new InMemoryEventStore(true);

// ============================================
// ERROR HANDLER
// ============================================

fastify.setErrorHandler((error: any, request: FastifyRequest, reply: any) => {
  console.error('Error:', error);

  if (error.code === 'P2002') {
    return reply.status(409).send({ error: 'Resource conflict' });
  }

  if (error.message?.includes('SQLITE') || error.code === 'P3000') {
    return reply.status(500).send({ error: 'Internal storage error' });
  }

  if (error.name === 'ZodError') {
    return reply.status(400).send({ error: 'Validation failed', details: error.errors });
  }

  return reply.status(error.statusCode || 500).send({
    error: error.message || 'Operation failed'
  });
});

// ============================================
// CORE EVENT ENDPOINTS
// ============================================

fastify.post('/contribute', async (request: FastifyRequest<{ Body: AppEvent }>, reply) => {
  const result = store.append(request.body);
  if (!result.ok) {
    return reply.status(400).send({ error: 'Invalid contribution payload', details: result.error });
  }
  return { success: true, eventId: result.eventId };
});

fastify.post('/verify', async (request: FastifyRequest<{ Body: AppEvent }>, reply) => {
  const result = store.append(request.body);
  if (!result.ok) {
    return reply.status(400).send({ error: 'Invalid verification payload', details: result.error });
  }
  return { success: true, eventId: result.eventId };
});

// ============================================
// LEADERBOARD & TEAM
// ============================================

fastify.get('/leaderboard', async (request: FastifyRequest<{ Querystring: { offset?: string; limit?: string } }>) => {
  const offset = Number(request.query.offset) || 0;
  const limit = Number(request.query.limit) || 50;
  const leaderboard = store.getLeaderboard({ offset, limit });
  const total = store.getUserCount();
  return { leaderboard, total };
});

fastify.get('/team', async () => {
  const state = store.getState();
  
  const members: MemberInput[] = Array.from(state.values()).map(u => ({
    userId: u.userId,
    specialty: 'BACKEND' as const, // Default for now
    xp: u.totalXP,
    successRate: Object.values(u.successRate)[0] ?? 0.5,
  }));
  
  const party = formParty(members);
  return {
    team: party.members.map(m => ({
      userId: m.userId,
      role: m.role,
      power: m.xp * m.successRate,
    })),
    totalPower: party.totalPower,
  };
});

// ============================================
// GITHUB WEBHOOK
// ============================================

fastify.post('/webhooks/github', async (request: FastifyRequest, reply) => {
  const signature = request.headers['x-hub-signature-256'] as string;
  const eventName = request.headers['x-github-event'] as string;
  
  if (!verifyGitHubSignature(JSON.stringify(request.body), signature || '')) {
    return reply.status(401).send({ error: 'Invalid signature' });
  }

  if (eventName !== 'pull_request') {
    return reply.send({ status: 'ignored', event: eventName });
  }

  try {
    const payload = GitHubPRPayloadSchema.parse(request.body);
    const { action, pull_request: pr } = payload;
    
    const ticketId = extractTicketId(pr.body);
    const userId = pr.user.login;

    if (action === 'opened' && ticketId) {
      await prisma.event.create({
        data: {
          id: randomUUID(),
          actorId: userId,
          streamId: `ticket-${ticketId}`,
          timestamp: new Date(),
          type: 'CONTRIBUTION_SUBMITTED',
          payload: JSON.stringify({ ticketId, prUrl: pr.html_url, status: 'IN_REVIEW' }),
        },
      });
    }

    if (action === 'closed' && pr.merged && ticketId) {
      await prisma.event.create({
        data: {
          id: randomUUID(),
          actorId: userId,
          streamId: `ticket-${ticketId}`,
          timestamp: new Date(),
          type: 'TICKET_COMPLETED',
          payload: JSON.stringify({ ticketId, prUrl: pr.html_url }),
        },
      });
    }

    return reply.send({ success: true });
  } catch (e) {
    return reply.status(400).send({ error: 'Invalid payload' });
  }
});

// ============================================
// BONDING & STAKING
// ============================================

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

fastify.post('/ticket', async (request: FastifyRequest<{
  Body: { workPackageId: string; title: string; description?: string; bondRequired: number; deadline: string }
}>, reply) => {
  const { workPackageId, title, description, bondRequired, deadline } = request.body;
  if (!workPackageId || !title || !bondRequired || !deadline) {
    return reply.status(400).send({ error: 'Missing required fields' });
  }
  try {
    const ticket = await createTicket({ workPackageId, title, description, bondRequired, deadline: new Date(deadline) });
    return { success: true, ticket };
  } catch (err) {
    return reply.status(400).send({ error: (err as Error).message });
  }
});

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

fastify.get('/tickets', async (request: FastifyRequest<{ Querystring: { limit?: string } }>) => {
  const limit = Number(request.query.limit) || 20;
  const tickets = await listOpenTickets(limit);
  return { tickets };
});

fastify.get('/ticket/:id', async (request: FastifyRequest<{ Params: { id: string } }>) => {
  const ticket = await getTicket(request.params.id);
  if (!ticket) return { error: 'Ticket not found' };
  return { ticket };
});

fastify.get('/stake/:actorId', async (request: FastifyRequest<{ Params: { actorId: string } }>) => {
  return getStakeSummary(request.params.actorId);
});

// ============================================
// MINTING (DEV ONLY)
// ============================================

fastify.post('/mint-rep', async (request: FastifyRequest<{ Body: { actorId: string; amount: number } }>, reply) => {
  const { actorId, amount } = request.body;
  if (!actorId || !amount) {
    return reply.status(400).send({ error: 'actorId and amount required' });
  }
  const actor = await prisma.actorState.upsert({
    where: { actorId },
    update: { currentRep: { increment: amount } },
    create: { actorId, currentRep: amount, stakedRep: 0 },
  });
  return { success: true, actor };
});

// ============================================
// ADMIN & REAPER
// ============================================

const REAPER_INTERVAL_MS = 60 * 1000;

console.log(`[Reaper] ⏰ Starting automatic forfeiture checks (every ${REAPER_INTERVAL_MS/1000}s)`);

setInterval(async () => {
  try {
    const results = await processForfeitures(0.5);
    if (results.length > 0) {
      console.log(`[Reaper] 💀 Executed ${results.length} forfeitures`);
    }
  } catch (err) {
    console.error('[Reaper] ❌ Error:', err);
  }
}, REAPER_INTERVAL_MS);

fastify.post('/admin/reaper', async () => {
  const results = await processForfeitures(0.5);
  return { success: true, processed: results.length, results };
});

// ============================================
// ANALYTICS
// ============================================

fastify.get('/analytics/summary', async () => {
  const [totalActors, totalTickets, ticketsByStatus] = await Promise.all([
    prisma.actorState.count(),
    prisma.ticket.count(),
    prisma.ticket.groupBy({ by: ['status'], _count: true }),
  ]);
  
  const actors = await prisma.actorState.findMany();
  const totalStaked = actors.reduce((sum, a) => sum + Number(a.stakedRep), 0);
  
  return {
    totalActors,
    totalTickets,
    totalStaked,
    ticketsByStatus: ticketsByStatus.reduce((acc, t) => {
      acc[t.status] = t._count;
      return acc;
    }, {} as Record<string, number>),
  };
});

fastify.get('/analytics/leaderboard/rep', async () => {
  const actors = await prisma.actorState.findMany({ orderBy: { currentRep: 'desc' }, take: 50 });
  const totalRep = actors.reduce((sum, a) => sum + Number(a.currentRep) + Number(a.stakedRep), 0);
  return {
    totalRep,
    count: actors.length,
    holders: actors.map(a => ({
      actorId: a.actorId,
      currentRep: a.currentRep,
      stakedRep: a.stakedRep,
      total: Number(a.currentRep) + Number(a.stakedRep),
    })),
  };
});

// ============================================
// SIMULATION
// ============================================

fastify.post('/admin/sim/stress', async (request: FastifyRequest<{ Body: { iterations?: number } }>) => {
  const iterations = request.body?.iterations || 100;
  const startTime = Date.now();
  let successCount = 0;
  
  for (let i = 0; i < iterations; i++) {
    try {
      const actorId = randomUUID();
      await prisma.actorState.upsert({
        where: { actorId },
        update: {},
        create: { actorId, currentRep: 1000, stakedRep: 0 },
      });
      await stakeRep({ actorId, amount: 10 });
      successCount++;
    } catch (e) { /* ignore */ }
  }
  
  const duration = Date.now() - startTime;
  return { iterations, successCount, durationMs: duration, opsPerSec: (iterations / duration * 1000).toFixed(2) };
});

fastify.delete('/admin/sim/reset', async () => {
  await prisma.event.deleteMany({});
  await prisma.stake.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.actorState.deleteMany({});
  return { success: true };
});

// ============================================
// START SERVER
// ============================================

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
