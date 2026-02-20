/**
 * @fated/simple-api
 * Minimal working API for The Void
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Create/get actor
fastify.post('/actor', async (request: any) => {
  const { actorId } = request.body;
  if (!actorId) return { error: 'actorId required' };
  
  let actor = await prisma.actorState.findUnique({ where: { actorId } });
  if (!actor) {
    actor = await prisma.actorState.create({
      data: { actorId, currentRep: 1000, currentXp: 0 }
    });
  }
  return { actor };
});

// Get actor
fastify.get('/actor/:actorId', async (request: any) => {
  const { actorId } = request.params;
  const actor = await prisma.actorState.findUnique({ where: { actorId } });
  if (!actor) return { error: 'Actor not found' };
  return { actor };
});

// Mint REP (dev only)
fastify.post('/admin/mint', async (request: any) => {
  const { actorId, amount } = request.body;
  if (!actorId || !amount) return { error: 'actorId and amount required' };
  
  const actor = await prisma.actorState.update({
    where: { actorId },
    data: { currentRep: { increment: amount } }
  });
  return { success: true, actor };
});

// Create ticket
fastify.post('/ticket', async (request: any) => {
  const { workPackageId, title, description, bondRequired, deadline } = request.body;
  if (!workPackageId || !title || !bondRequired || !deadline) {
    return { error: 'Missing required fields' };
  }
  
  const ticket = await prisma.ticket.create({
    data: {
      workPackageId,
      title,
      description,
      bondRequired,
      deadline: new Date(deadline),
      status: 'OPEN'
    }
  });
  return { ticket };
});

// List open tickets
fastify.get('/tickets', async () => {
  const tickets = await prisma.ticket.findMany({
    where: { status: 'OPEN' },
    orderBy: { deadline: 'asc' }
  });
  return { tickets };
});

// Claim ticket
fastify.post('/claim', async (request: any) => {
  const { actorId, ticketId } = request.body;
  if (!actorId || !ticketId) return { error: 'actorId and ticketId required' };
  
  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  if (!ticket) return { error: 'Ticket not found' };
  if (ticket.status !== 'OPEN') return { error: 'Ticket not available' };
  
  const actor = await prisma.actorState.findUnique({ where: { actorId } });
  if (!actor) return { error: 'Actor not found' };
  
  // Check if actor has enough REP
  const totalRep = actor.currentRep + actor.stakedRep;
  if (totalRep < ticket.bondRequired) {
    return { error: 'Insufficient REP' };
  }
  
  // Auto-stake if needed
  if (actor.stakedRep < ticket.bondRequired) {
    const needed = ticket.bondRequired - actor.stakedRep;
    await prisma.actorState.update({
      where: { actorId },
      data: {
        currentRep: { decrement: needed },
        stakedRep: { increment: needed }
      }
    });
  }
  
  // Create stake
  await prisma.stake.create({
    data: {
      actorId,
      amount: ticket.bondRequired,
      ticketId,
      status: 'ACTIVE'
    }
  });
  
  // Update ticket
  const updated = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      claimedBy: actorId,
      claimedAt: new Date(),
      status: 'CLAIMED'
    }
  });
  
  return { ticket: updated };
});

// Complete ticket
fastify.post('/complete', async (request: any) => {
  const { ticketId, verifierId } = request.body;
  if (!ticketId || !verifierId) return { error: 'ticketId and verifierId required' };
  
  const ticket = await prisma.ticket.findUnique({ 
    where: { id: ticketId },
    include: { stake: true }
  }) as any;
  if (!ticket) return { error: 'Ticket not found' };
  if (ticket.status !== 'CLAIMED') return { error: 'Ticket not claimed' };
  if (!ticket.claimedBy || !ticket.stake) return { error: 'Invalid ticket state' };
  
  // Return staked REP
  await prisma.actorState.update({
    where: { actorId: ticket.claimedBy },
    data: {
      currentRep: { increment: ticket.stake.amount },
      stakedRep: { decrement: ticket.stake.amount }
    }
  });
  
  // Update stake
  await prisma.stake.update({
    where: { id: ticket.stake.id },
    data: { status: 'RELEASED', releasedAt: new Date() }
  });
  
  // Update ticket
  const updated = await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: 'COMPLETED', completedAt: new Date() }
  });
  
  return { ticket: updated };
});

// Leaderboard
fastify.get('/leaderboard', async () => {
  const actors = await prisma.actorState.findMany({
    orderBy: { currentXp: 'desc' },
    take: 50
  });
  return { leaderboard: actors };
});

// Waitlist - Join
fastify.post('/waitlist', async (request: any) => {
  const { email, name, github, source } = request.body;
  if (!email) return { error: 'email required' };
  
  // Basic email validation
  if (!email.includes('@')) return { error: 'Invalid email format' };
  
  try {
    let entry = await prisma.waitlist.findUnique({ where: { email } });
    if (entry) {
      return { success: true, message: 'Already on waitlist', waitlist: entry };
    }
    
    entry = await prisma.waitlist.create({
      data: { email, name, github, source: source || 'landing' }
    });
    return { success: true, message: 'Joined waitlist!', waitlist: entry };
  } catch (err: any) {
    return { error: err.message || 'Failed to join waitlist' };
  }
});

// Waitlist - Check status
fastify.get('/waitlist/:email', async (request: any) => {
  const { email } = request.params;
  const entry = await prisma.waitlist.findUnique({ where: { email } });
  if (!entry) return { error: 'Not on waitlist' };
  return { waitlist: entry };
});

// Waitlist - Count (public)
fastify.get('/waitlist-count', async () => {
  const count = await prisma.waitlist.count({
    where: { status: { not: 'CONVERTED' } }
  });
  return { count };
});

// Matchmaker endpoint (stub for compatibility)
fastify.post('/api/match', async (request: any) => {
  const { project_requirements, available_developers } = request.body || {};
  if (!project_requirements || !available_developers) {
    return { error: 'project_requirements and available_developers required' };
  }
  // Simple matching algorithm
  const totalSlots = Object.values(project_requirements).reduce((a: number, b: any) => a + (typeof b === 'number' ? b : 0), 0);
  const assignments = available_developers.slice(0, Math.min(totalSlots, available_developers.length));
  return { assignments };
});

// GitHub webhook endpoint (stub for compatibility)
fastify.post('/webhooks/github', async (request: any) => {
  const { commits, sender } = request.body || {};
  if (!commits || !Array.isArray(commits)) {
    return { received: true };
  }
  // Process commits and award XP
  for (const commit of commits) {
    const author = commit.author?.username || sender?.login || 'unknown';
    await prisma.actorState.upsert({
      where: { actorId: author },
      update: { currentXp: { increment: 10 } },
      create: { actorId: author, currentRep: 100, currentXp: 10 }
    });
  }
  return { received: true, processed: commits.length };
});

// Start server
const start = async () => {
  try {
    // Push schema to DB
    await prisma.$connect();
    console.log('✅ Connected to database');
    
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Server running at http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
