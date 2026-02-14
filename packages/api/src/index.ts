/**
 * @fated/api
 * Main API Server - Modular Architecture
 */

// Load .env from project root
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Go up 3 levels: src -> api -> packages -> root
const rootDir = resolve(__dirname, '../../..');
const envPath = resolve(rootDir, '.env');

if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      let value = match[2].trim();
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Convert relative paths to absolute paths
      if (value.startsWith('file:./')) {
        const relativePath = value.slice(7); // Remove 'file:./' (7 chars)
        const absolutePath = resolve(rootDir, relativePath);
        console.log('[ENV] rootDir:', rootDir);
        console.log('[ENV] relativePath:', relativePath);
        console.log('[ENV] absolutePath:', absolutePath);
        value = 'file:' + absolutePath;
      }
      process.env[match[1].trim()] = value;
    }
  });
  console.log('[ENV] Loaded DATABASE_URL:', process.env.DATABASE_URL);
} else {
  console.log('[ENV] No .env file found at', envPath);
}

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
// ADMIN & REAPER (Forfeiture Processing)
// ============================================

// Redis client for distributed locking and heartbeat
// Falls back gracefully if Redis is not available
let redisClient: any = null;
let redisAvailable = false;

// Try to initialize Redis
async function initRedis() {
  try {
    // Dynamic import to avoid hard dependency
    const Redis = (await import('ioredis')).default;
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    redisClient = new Redis(redisUrl);
    
    // Test connection
    await redisClient.ping();
    redisAvailable = true;
    console.log('[Reaper] Redis connected for distributed locking');
  } catch (err) {
    console.warn('[Reaper] Redis not available, running without distributed lock (single-instance only)');
    redisAvailable = false;
  }
}

/**
 * Try to acquire distributed lock for Reaper
 * Returns true if lock acquired, false otherwise
 */
async function acquireReaperLock(): Promise<boolean> {
  if (!redisAvailable || !redisClient) {
    // No Redis - assume single instance (warning in logs)
    return true;
  }
  
  try {
    // NX = only set if not exists, EX = expire
    const result = await redisClient.set('lock:reaper', process.env.HOSTNAME || 'unknown', 'NX', 'EX', 65);
    return result === 'OK';
  } catch (err) {
    console.error('[Reaper] Redis lock error:', err);
    return true; // On error, allow execution
  }
}

/**
 * Update heartbeat timestamp to prove Reaper is alive
 */
async function updateHeartbeat(): Promise<void> {
  if (!redisAvailable || !redisClient) {
    return;
  }
  
  try {
    await redisClient.set('reaper:heartbeat', Date.now().toString());
  } catch (err) {
    // Silent fail for heartbeat
  }
}

// Configuration with environment variables and sensible defaults
const REAPER_CONFIG = {
  // Default: 5 minutes (300s) - much more reasonable than 60s
  intervalMs: parseInt(process.env.REAPER_INTERVAL_MS || '300000'),
  // Default: 50% slash on forfeited stakes
  slashPercent: parseFloat(process.env.REAPER_SLASH_PERCENT || '0.5'),
  // Enable/disable via env (default: enabled in production-like envs)
  enabled: process.env.REAPER_ENABLED !== 'false',
  // Jitter percentage to avoid thundering herd (±10%)
  jitterPercent: 0.1,
};

let reaperInterval: NodeJS.Timeout | null = null;

/**
 * Calculate next run time with jitter to avoid thundering herd
 */
function getNextRunTime(baseIntervalMs: number, jitterPercent: number): number {
  const jitter = baseIntervalMs * jitterPercent;
  const randomJitter = (Math.random() * 2 - 1) * jitter; // ±jitter
  return Math.max(1000, baseIntervalMs + randomJitter); // Minimum 1s
}

/**
 * Execute the reaper - process overdue tickets and slash staked REP
 * Includes distributed lock to prevent multi-instance race conditions
 */
async function runReaper(): Promise<{ processed: number; results: Array<{ ticketId: string; slashed: number; returned: number }> }> {
  // Try to acquire distributed lock
  const lockAcquired = await acquireReaperLock();
  
  if (!lockAcquired) {
    // Another instance has the lock - skip this cycle
    return { processed: 0, results: [] };
  }
  
  const runId = randomUUID();
  
  try {
    console.log(`[Reaper] Starting cycle ${runId.slice(0, 8)}`);
    
    const result = await processForfeitures(REAPER_CONFIG.slashPercent);
    const results = result.results || [];
    
    if (results.length > 0) {
      console.log(`[Reaper] 💀 Executed ${results.length} forfeitures`);
      for (const r of results) {
        console.log(`[Reaper]   - Ticket ${r.ticketId.slice(0, 8)}: slashed ${r.slashed.toFixed(2)} REP, returned ${r.returned.toFixed(2)} REP`);
      }
    }
    
    // Update heartbeat to prove we're alive
    await updateHeartbeat();
    
    console.log(`[Reaper] Cycle ${runId.slice(0, 8)} complete: ${results.length} processed, ${result.totalFailed || 0} failed`);
    
    return { processed: results.length, results };
  } catch (err) {
    console.error('[Reaper] ❌ Error:', err);
    return { processed: 0, results: [] };
  }
}

/**
 * Start the reaper with configurable interval and jitter
 */
function startReaper(): void {
  if (!REAPER_CONFIG.enabled) {
    console.log('[Reaper] ⚠️  Reaper is disabled (REAPER_ENABLED=false)');
    return;
  }

  console.log(`[Reaper] ⏰ Starting automatic forfeiture checks (every ${REAPER_CONFIG.intervalMs / 1000}s, slash ${REAPER_CONFIG.slashPercent * 100}%)`);

  // Initial run after a short delay
  setTimeout(async () => {
    await runReaper();
  }, 5000);

  // Schedule with jitter
  const scheduleNext = () => {
    const nextRun = getNextRunTime(REAPER_CONFIG.intervalMs, REAPER_CONFIG.jitterPercent);
    reaperInterval = setTimeout(async () => {
      await runReaper();
      scheduleNext(); // Reschedule with new jitter
    }, nextRun);
  };

  scheduleNext();
}

/**
 * Stop the reaper gracefully
 */
function stopReaper(): void {
  if (reaperInterval) {
    clearTimeout(reaperInterval);
    reaperInterval = null;
    console.log('[Reaper] 🛑 Reaper stopped');
  }
}

// Start reaper on module load
startReaper();

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('[Reaper] 📥 Received SIGTERM, shutting down...');
  stopReaper();
});

process.on('SIGINT', () => {
  console.log('[Reaper] 📥 Received SIGINT, shutting down...');
  stopReaper();
});

// Manual trigger endpoint for testing/admin
fastify.post('/admin/reaper', async () => {
  const result = await runReaper();
  return { success: true, ...result };
});

// Health check for reaper status
fastify.get('/admin/reaper/status', async () => {
  return {
    enabled: REAPER_CONFIG.enabled,
    intervalMs: REAPER_CONFIG.intervalMs,
    slashPercent: REAPER_CONFIG.slashPercent,
    running: reaperInterval !== null,
  };
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
    // Initialize Redis for distributed locking
    await initRedis();
    
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 FatedFortress API running at http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
