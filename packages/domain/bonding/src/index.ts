/**
 * @fated/domain-bonding
 * REP Staking, Tickets, and Forfeiture Logic
 */

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import {
  StakeInputSchema,
  UnstakeInputSchema,
  CreateTicketInputSchema,
  ClaimTicketInputSchema,
  CompleteTicketInputSchema,
  type Stake,
  type Ticket,
  type ActorState,
} from '@fated/core';

// Lazy initialization - only create PrismaClient when needed
let _prisma: PrismaClient | undefined;
function getPrisma() {
  if (!_prisma) {
    _prisma = new PrismaClient();
  }
  return _prisma;
}

// ============================================
// PRIVATE HELPERS
// ============================================

async function emitEvent(
  tx: any,
  actorId: string,
  type: string,
  payload: Record<string, unknown>
) {
  return tx.event.create({
    data: {
      id: crypto.randomUUID(),
      actorId,
      streamId: `bonding-${Date.now()}`,
      timestamp: new Date(),
      type,
      payload: JSON.stringify(payload),
    },
  });
}

// ============================================
// STAKE OPERATIONS
// ============================================

/**
 * Place a stake - locks REP from user's liquid balance
 */
export async function stakeRep(input: z.infer<typeof StakeInputSchema>) {
  const { actorId, amount } = StakeInputSchema.parse(input);

  return getPrisma().$transaction(async (tx: PrismaClient) => {
    // Ensure actor exists
    let actor = await tx.actorState.findUnique({ where: { actorId } });
    if (!actor) {
      actor = await tx.actorState.create({
        data: { actorId, currentRep: 0, stakedRep: 0 },
      });
    }

    if (actor.currentRep < amount) {
      throw new Error(`Insufficient REP: have ${actor.currentRep}, need ${amount}`);
    }

    // Move REP from liquid to staked
    await tx.actorState.update({
      where: { actorId },
      data: {
        currentRep: { decrement: amount },
        stakedRep: { increment: amount },
      },
    });

    // Create stake record
    const stake = await tx.stake.create({
      data: { actorId, amount, status: 'ACTIVE' },
    });

    // Emit event
    await emitEvent(tx, actorId, 'STAKE_PLACED', {
      stakeId: stake.id,
      amount,
      totalStaked: actor.stakedRep + amount,
    });

    return stake;
  });
}

/**
 * Release a stake - returns REP to liquid balance
 * Only allows releasing stakes not tied to active tickets
 */
export async function releaseStake(input: z.infer<typeof UnstakeInputSchema>) {
  const { actorId, stakeId } = UnstakeInputSchema.parse(input);

  return getPrisma().$transaction(async (tx: PrismaClient) => {
    const stake = await tx.stake.findFirst({
      where: { id: stakeId, actorId, status: 'ACTIVE' },
    });

    if (!stake) {
      throw new Error('Stake not found or already released');
    }

    // Check if stake is linked to an active ticket
    if (stake.ticketId) {
      const ticket = await tx.ticket.findUnique({ where: { id: stake.ticketId } });
      if (ticket?.status === 'CLAIMED') {
        throw new Error('Cannot release stake tied to active ticket');
      }
    }

    // Return REP to liquid balance
    await tx.actorState.update({
      where: { actorId },
      data: {
        currentRep: { increment: stake.amount },
        stakedRep: { decrement: stake.amount },
      },
    });

    // Update stake status
    await tx.stake.update({
      where: { id: stakeId },
      data: { status: 'RELEASED', releasedAt: new Date() },
    });

    // Emit event
    await emitEvent(tx, actorId, 'STAKE_RELEASED', {
      stakeId: stake.id,
      amount: stake.amount,
    });

    return { success: true, stakeId };
  });
}

// ============================================
// TICKET OPERATIONS
// ============================================

/**
 * Create a new ticket (work package)
 */
export async function createTicket(input: z.infer<typeof CreateTicketInputSchema>) {
  const data = CreateTicketInputSchema.parse(input);

  return getPrisma().ticket.create({
    data: {
      workPackageId: data.workPackageId,
      title: data.title,
      description: data.description,
      bondRequired: data.bondRequired,
      deadline: data.deadline,
      status: 'OPEN',
    },
  });
}

/**
 * Claim a ticket - auto-stakes from current REP if needed
 */
export async function claimTicket(input: z.infer<typeof ClaimTicketInputSchema>) {
  const { actorId, ticketId } = ClaimTicketInputSchema.parse(input);

  return getPrisma().$transaction(async (tx: PrismaClient) => {
    const ticket = await tx.ticket.findUnique({ where: { id: ticketId } });

    if (!ticket) throw new Error('Ticket not found');
    if (ticket.status !== 'OPEN') throw new Error(`Ticket is ${ticket.status}, not available`);

    const actor = await tx.actorState.findUniqueOrThrow({ where: { actorId } });

    // Auto-stake if insufficient staked REP but has current REP
    let stakeAmount = ticket.bondRequired;
    let autoStaked = false;
    
    if (actor.stakedRep < ticket.bondRequired) {
      const needed = ticket.bondRequired - actor.stakedRep;
      if (actor.currentRep >= needed) {
        // Auto-stake from current REP
        await tx.actorState.update({
          where: { actorId },
          data: {
            currentRep: { decrement: needed },
            stakedRep: { increment: needed },
          },
        });
        stakeAmount = ticket.bondRequired; // Now we have enough
        autoStaked = true;
      } else {
        throw new Error(`Insufficient REP: have ${actor.currentRep} liquid + ${actor.stakedRep} staked, need ${ticket.bondRequired}`);
      }
    }

    // Create stake for this ticket
    const stake = await tx.stake.create({
      data: { actorId, amount: stakeAmount, ticketId, status: 'ACTIVE' },
    });

    // Update ticket status
    const updatedTicket = await tx.ticket.update({
      where: { id: ticketId },
      data: { claimedBy: actorId, claimedAt: new Date(), status: 'CLAIMED' },
    });

    // Emit event
    await emitEvent(tx, actorId, 'TICKET_CLAIMED', {
      ticketId: ticket.id,
      stakeId: stake.id,
      title: ticket.title,
      deadline: ticket.deadline,
      autoStaked,
    });

    return { ticket: updatedTicket, stake, autoStaked };
  });
}

/**
 * Complete a ticket - returns stake + awards REP
 */
export async function completeTicket(input: z.infer<typeof CompleteTicketInputSchema>) {
  const { ticketId, verifierId } = CompleteTicketInputSchema.parse(input);

  return getPrisma().$transaction(async (tx: PrismaClient) => {
    const ticket = await tx.ticket.findUnique({
      where: { id: ticketId },
      include: { stake: true },
    });

    if (!ticket) throw new Error('Ticket not found');
    if (ticket.status !== 'CLAIMED') throw new Error(`Ticket is ${ticket.status}, cannot complete`);
    if (!ticket.claimedBy || !ticket.stake) throw new Error('Ticket has no claimant or stake');

    // Return staked REP to liquid
    await tx.actorState.update({
      where: { actorId: ticket.claimedBy },
      data: {
        currentRep: { increment: ticket.stake.amount },
        stakedRep: { decrement: ticket.stake.amount },
      },
    });

    // Update stake to released
    await tx.stake.update({
      where: { id: ticket.stake.id },
      data: { status: 'RELEASED', releasedAt: new Date() },
    });

    // Update ticket status
    const updatedTicket = await tx.ticket.update({
      where: { id: ticketId },
      data: { status: 'COMPLETED', completedAt: new Date() },
    });

    // Emit completion event
    await emitEvent(tx, ticket.claimedBy, 'TICKET_COMPLETED', {
      ticketId: ticket.id,
      title: ticket.title,
      bondReturned: ticket.stake.amount,
      verifiedBy: verifierId,
    });

    return { ticket: updatedTicket, returnedAmount: ticket.stake.amount };
  });
}

// ============================================
// FORFEITURE LOGIC
// ============================================

/**
 * Process overdue tickets - slash staked REP
 */
export async function processForfeitures(slashPercent: number = 0.5) {
  const overdueTickets = await getPrisma().ticket.findMany({
    where: { status: 'CLAIMED', deadline: { lt: new Date() } },
    include: { stake: true },
  });

  const results: Array<{ ticketId: string; slashed: number; returned: number }> = [];

  for (const ticket of overdueTickets) {
    if (!ticket.stake || !ticket.claimedBy) continue;

    const claimedBy = ticket.claimedBy;
    const stakeAmount = ticket.stake.amount;
    const slashAmount = stakeAmount * slashPercent;
    const returnAmount = stakeAmount - slashAmount;
    const stakeId = ticket.stake.id;

    await getPrisma().$transaction(async (tx: PrismaClient) => {
      // Update ticket status
      await tx.ticket.update({ where: { id: ticket.id }, data: { status: 'FORFEITED' } });

      // Update stake to forfeited
      await tx.stake.update({ where: { id: stakeId }, data: { status: 'FORFEITED' } });

      // Handle REP: slash some, return remainder
      if (returnAmount > 0) {
        await tx.actorState.update({
          where: { actorId: claimedBy },
          data: { stakedRep: { decrement: stakeAmount }, currentRep: { increment: returnAmount } },
        });
      } else {
        await tx.actorState.update({
          where: { actorId: claimedBy },
          data: { stakedRep: { decrement: stakeAmount } },
        });
      }

      // Emit forfeiture event
      await emitEvent(tx, claimedBy, 'FORFEITURE_EXECUTED', {
        ticketId: ticket.id,
        title: ticket.title,
        originalStake: stakeAmount,
        slashed: slashAmount,
        returned: returnAmount,
      });

      results.push({ ticketId: ticket.id, slashed: slashAmount, returned: returnAmount });
    });
  }

  return results;
}

// ============================================
// QUERY OPERATIONS
// ============================================

export async function getStakeSummary(actorId: string) {
  const actor = await getPrisma().actorState.findUnique({ where: { actorId } });
  const stakes = await getPrisma().stake.findMany({ where: { actorId, status: 'ACTIVE' } });
  const tickets = await getPrisma().ticket.findMany({ where: { claimedBy: actorId, status: 'CLAIMED' } });

  return {
    currentRep: actor?.currentRep ?? 0,
    stakedRep: actor?.stakedRep ?? 0,
    activeStakes: stakes.length,
    activeTickets: tickets.length,
  };
}

export async function listOpenTickets(limit: number = 20) {
  return getPrisma().ticket.findMany({
    where: { status: 'OPEN' },
    orderBy: { deadline: 'asc' },
    take: limit,
  });
}

export async function getTicket(ticketId: string) {
  return getPrisma().ticket.findUnique({
    where: { id: ticketId },
    include: { stake: true },
  });
}

export async function getActorState(actorId: string) {
  return getPrisma().actorState.findUnique({ where: { actorId } });
}

export async function listStakes(actorId: string, status?: string) {
  return getPrisma().stake.findMany({
    where: { actorId, ...(status ? { status } : {}) },
    orderBy: { createdAt: 'desc' },
  });
}

// ============================================
// EXPORTS
// ============================================

export { getPrisma };
export type { Stake, Ticket, ActorState } from '@fated/core';
