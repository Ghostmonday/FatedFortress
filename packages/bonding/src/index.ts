import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { AppEvent, BaseEventSchema } from '@fated/events';
import { UserId } from '@fated/types';

const prisma = new PrismaClient();

// ============================================
// SCHEMAS
// ============================================

export const StakeSchema = z.object({
  actorId: z.string().uuid(),
  amount: z.number().positive(),
});

export const UnstakeSchema = z.object({
  actorId: z.string().uuid(),
  stakeId: z.string().uuid(),
});

export const CreateTicketSchema = z.object({
  workPackageId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  bondRequired: z.number().positive(),
  deadline: z.coerce.date(),
});

export const ClaimTicketSchema = z.object({
  actorId: z.string().uuid(),
  ticketId: z.string().uuid(),
});

export const CompleteTicketSchema = z.object({
  ticketId: z.string().uuid(),
  verifierId: z.string().uuid(), // Who verified the work
});

// ============================================
// STAKE OPERATIONS
// ============================================

/**
 * Place a stake - locks REP from user's liquid balance
 */
export async function stakeRep(input: z.infer<typeof StakeSchema>) {
  const { actorId, amount } = StakeSchema.parse(input);

  return prisma.$transaction(async (tx) => {
    const actor = await tx.actorState.findUnique({
      where: { actorId },
    });

    if (!actor) {
      // Initialize actor if doesn't exist
      await tx.actorState.create({
        data: { actorId, currentRep: 0, stakedRep: 0 },
      });
    }

    const currentActor = await tx.actorState.findUniqueOrThrow({
      where: { actorId },
    });

    if (currentActor.currentRep < amount) {
      throw new Error(`Insufficient REP: have ${currentActor.currentRep}, need ${amount}`);
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
      data: {
        actorId,
        amount,
        status: 'ACTIVE',
      },
    });

    // Emit event
    await emitEvent(tx, actorId, 'STAKE_PLACED', {
      stakeId: stake.id,
      amount,
      totalStaked: currentActor.stakedRep + amount,
    });

    return stake;
  });
}

/**
 * Release a stake - returns REP to liquid balance
 * Only allows releasing stakes not tied to active tickets
 */
export async function releaseStake(input: z.infer<typeof UnstakeSchema>) {
  const { actorId, stakeId } = UnstakeSchema.parse(input);

  return prisma.$transaction(async (tx) => {
    const stake = await tx.stake.findFirst({
      where: { id: stakeId, actorId, status: 'ACTIVE' },
    });

    if (!stake) {
      throw new Error('Stake not found or already released');
    }

    // Check if stake is linked to an active ticket
    if (stake.ticketId) {
      const ticket = await tx.ticket.findUnique({
        where: { id: stake.ticketId },
      });
      if (ticket && ticket.status === 'CLAIMED') {
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
export async function createTicket(input: z.infer<typeof CreateTicketSchema>) {
  const data = CreateTicketSchema.parse(input);

  const ticket = await prisma.ticket.create({
    data: {
      workPackageId: data.workPackageId,
      title: data.title,
      description: data.description,
      bondRequired: data.bondRequired,
      deadline: data.deadline,
      status: 'OPEN',
    },
  });

  return ticket;
}

/**
 * Claim a ticket - requires sufficient staked REP
 */
export async function claimTicket(input: z.infer<typeof ClaimTicketSchema>) {
  const { actorId, ticketId } = ClaimTicketSchema.parse(input);

  return prisma.$transaction(async (tx) => {
    const ticket = await tx.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    if (ticket.status !== 'OPEN') {
      throw new Error(`Ticket is ${ticket.status}, not available`);
    }

    const actor = await tx.actorState.findUniqueOrThrow({
      where: { actorId },
    });

    if (actor.stakedRep < ticket.bondRequired) {
      throw new Error(`Insufficient staked REP: have ${actor.stakedRep}, need ${ticket.bondRequired}`);
    }

    // Create a stake specifically for this ticket
    const stake = await tx.stake.create({
      data: {
        actorId,
        amount: ticket.bondRequired,
        ticketId,
        status: 'ACTIVE',
      },
    });

    // Update ticket status
    const updatedTicket = await tx.ticket.update({
      where: { id: ticketId },
      data: {
        claimedBy: actorId,
        claimedAt: new Date(),
        status: 'CLAIMED',
      },
    });

    // Emit event
    await emitEvent(tx, actorId, 'TICKET_CLAIMED', {
      ticketId: ticket.id,
      stakeId: stake.id,
      title: ticket.title,
      deadline: ticket.deadline,
    });

    return { ticket: updatedTicket, stake };
  });
}

/**
 * Complete a ticket - returns stake + awards REP
 */
export async function completeTicket(input: z.infer<typeof CompleteTicketSchema>) {
  const { ticketId, verifierId } = CompleteTicketSchema.parse(input);

  return prisma.$transaction(async (tx) => {
    const ticket = await tx.ticket.findUnique({
      where: { id: ticketId },
      include: { stake: true },
    });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    if (ticket.status !== 'CLAIMED') {
      throw new Error(`Ticket is ${ticket.status}, cannot complete`);
    }

    if (!ticket.claimedBy || !ticket.stake) {
      throw new Error('Ticket has no claimant or stake');
    }

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
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
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
 * @param slashPercent - percentage of stake to burn (0-1)
 */
export async function processForfeitures(slashPercent: number = 0.5) {
  const overdueTickets = await prisma.ticket.findMany({
    where: {
      status: 'CLAIMED',
      deadline: { lt: new Date() },
    },
    include: { stake: true, actor: true },
  });

  const results = [];

  for (const ticket of overdueTickets) {
    if (!ticket.stake || !ticket.claimedBy) continue;

    const slashAmount = ticket.stake.amount * slashPercent;
    const returnAmount = ticket.stake.amount - slashAmount;

    await prisma.$transaction(async (tx) => {
      // Update ticket status
      await tx.ticket.update({
        where: { id: ticket.id },
        data: { status: 'FORFEITED' },
      });

      // Update stake to forfeited
      await tx.stake.update({
        where: { id: ticket.stake!.id },
        data: { status: 'FORFEITED' },
      });

      // Handle REP: slash some, return remainder
      if (returnAmount > 0) {
        await tx.actorState.update({
          where: { actorId: ticket.claimedBy },
          data: {
            stakedRep: { decrement: ticket.stake!.amount },
            currentRep: { increment: returnAmount },
          },
        });
      } else {
        // All staked REP is burned
        await tx.actorState.update({
          where: { actorId: ticket.claimedBy },
          data: {
            stakedRep: { decrement: ticket.stake!.amount },
          },
        });
      }

      // Emit forfeiture event
      await emitEvent(tx, ticket.claimedBy, 'FORFEITURE_EXECUTED', {
        ticketId: ticket.id,
        title: ticket.title,
        originalStake: ticket.stake.amount,
        slashed: slashAmount,
        returned: returnAmount,
      });

      results.push({
        ticketId: ticket.id,
        slashed: slashAmount,
        returned: returnAmount,
      });
    });
  }

  return results;
}

// ============================================
// UTILITIES
// ============================================

async function emitEvent(
  tx: PrismaClient,
  actorId: string,
  type: string,
  payload: Record<string, unknown>
) {
  const event = await tx.event.create({
    data: {
      id: crypto.randomUUID(),
      actorId,
      streamId: `bonding-${Date.now()}`,
      timestamp: new Date(),
      type,
      payload: JSON.stringify(payload),
    },
  });
  return event;
}

/**
 * Get user's staking summary
 */
export async function getStakeSummary(actorId: string) {
  const actor = await prisma.actorState.findUnique({
    where: { actorId },
  });

  const stakes = await prisma.stake.findMany({
    where: { actorId, status: 'ACTIVE' },
  });

  const tickets = await prisma.ticket.findMany({
    where: { claimedBy: actorId, status: 'CLAIMED' },
  });

  return {
    currentRep: actor?.currentRep ?? 0,
    stakedRep: actor?.stakedRep ?? 0,
    activeStakes: stakes.length,
    activeTickets: tickets.length,
  };
}

/**
 * List available tickets
 */
export async function listOpenTickets(limit: number = 20) {
  return prisma.ticket.findMany({
    where: { status: 'OPEN' },
    orderBy: { deadline: 'asc' },
    take: limit,
  });
}

/**
 * Get ticket details
 */
export async function getTicket(ticketId: string) {
  return prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { stake: true },
  });
}

export { prisma };
