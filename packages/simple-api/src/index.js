/**
 * @fated/simple-api
 * Minimal working API for The Void
 */
import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';
const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });
// Health check
fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});
// Create/get actor
fastify.post('/actor', async (request) => {
    const { actorId } = request.body;
    if (!actorId)
        return { error: 'actorId required' };
    let actor = await prisma.actorState.findUnique({ where: { actorId } });
    if (!actor) {
        actor = await prisma.actorState.create({
            data: { actorId, currentRep: 1000, currentXp: 0 }
        });
    }
    return { actor };
});
// Get actor
fastify.get('/actor/:actorId', async (request) => {
    const { actorId } = request.params;
    const actor = await prisma.actorState.findUnique({ where: { actorId } });
    if (!actor)
        return { error: 'Actor not found' };
    return { actor };
});
// Mint REP (dev only)
fastify.post('/admin/mint', async (request) => {
    const { actorId, amount } = request.body;
    if (!actorId || !amount)
        return { error: 'actorId and amount required' };
    const actor = await prisma.actorState.update({
        where: { actorId },
        data: { currentRep: { increment: amount } }
    });
    return { success: true, actor };
});
// Create ticket
fastify.post('/ticket', async (request) => {
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
fastify.post('/claim', async (request) => {
    const { actorId, ticketId } = request.body;
    if (!actorId || !ticketId)
        return { error: 'actorId and ticketId required' };
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket)
        return { error: 'Ticket not found' };
    if (ticket.status !== 'OPEN')
        return { error: 'Ticket not available' };
    const actor = await prisma.actorState.findUnique({ where: { actorId } });
    if (!actor)
        return { error: 'Actor not found' };
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
fastify.post('/complete', async (request) => {
    const { ticketId, verifierId } = request.body;
    if (!ticketId || !verifierId)
        return { error: 'ticketId and verifierId required' };
    const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: { stake: true }
    });
    if (!ticket)
        return { error: 'Ticket not found' };
    if (ticket.status !== 'CLAIMED')
        return { error: 'Ticket not claimed' };
    if (!ticket.claimedBy || !ticket.stake)
        return { error: 'Invalid ticket state' };
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
// Start server
const start = async () => {
    try {
        // Push schema to DB
        await prisma.$connect();
        console.log('✅ Connected to database');
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('🚀 Server running at http://localhost:3000');
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map