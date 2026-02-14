import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import {
  stakeRep,
  releaseStake,
  createTicket,
  claimTicket,
  completeTicket,
  processForfeitures,
  getStakeSummary,
  getTicket,
  listOpenTickets
} from './src/index';

const prisma = new PrismaClient();

// Test constants
const A = '550e8400-e29b-41d4-a716-4466554400aa';
const B = '550e8400-e29b-41d4-a716-4466554400bb';

describe('Bonding Curve - Integration Tests', () => {
  
  beforeAll(async () => {
    // Clean up test data
    await prisma.stake.deleteMany({ where: { actorId: { in: [A, B] } } });
    await prisma.ticket.deleteMany({ where: { OR: [{ claimedBy: A }, { claimedBy: B }] } });
    await prisma.actorState.deleteMany({ where: { actorId: { in: [A, B] } } });
    await prisma.event.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Reset state before each test
    await prisma.stake.deleteMany({ where: { actorId: { in: [A, B] } } });
    await prisma.ticket.deleteMany({ where: { OR: [{ claimedBy: A }, { claimedBy: B }] } });
    await prisma.actorState.deleteMany({ where: { actorId: { in: [A, B] } } });
  });

  describe('Full REP Flow', () => {
    it('should complete full stake → claim → complete flow', async () => {
      // 1. Mint REP (via upsert)
      await prisma.actorState.upsert({
        where: { actorId: A },
        update: {},
        create: { actorId: A, currentRep: 100, stakedRep: 0 }
      });

      // 2. Stake 50 REP
      const stake = await stakeRep({ actorId: A, amount: 50 });
      expect(stake.amount).toBe(50);
      expect(stake.status).toBe('ACTIVE');

      // Verify in DB
      const actor = await prisma.actorState.findUnique({ where: { actorId: A } });
      expect(actor?.currentRep).toBe(50);
      expect(actor?.stakedRep).toBe(50);

      // 3. Create ticket
      const ticket = await createTicket({
        workPackageId: 'wp-test-1',
        title: 'Test Ticket',
        bondRequired: 30,
        deadline: new Date('2099-12-31T23:59:59Z')
      });
      expect(ticket.status).toBe('OPEN');

      // 4. Claim ticket
      const claimResult = await claimTicket({ actorId: A, ticketId: ticket.id });
      expect(claimResult.ticket.status).toBe('CLAIMED');
      expect(claimResult.ticket.claimedBy).toBe(A);

      // 5. Complete ticket
      const completeResult = await completeTicket({ 
        ticketId: ticket.id, 
        verifierId: B 
      });
      expect(completeResult.ticket.status).toBe('COMPLETED');
      expect(completeResult.returnedAmount).toBe(30);

      // Verify final state
      const finalActor = await prisma.actorState.findUnique({ where: { actorId: A } });
      // After stake: currentRep=50, stakedRep=50
      // After complete: currentRep=50+30=80, stakedRep=50-30=20
      expect(finalActor?.currentRep).toBe(80);
      expect(finalActor?.stakedRep).toBe(20);
    });

    it('should handle releaseStake correctly', async () => {
      // Setup
      await prisma.actorState.upsert({
        where: { actorId: A },
        update: {},
        create: { actorId: A, currentRep: 100, stakedRep: 0 }
      });

      // Stake
      const stake = await stakeRep({ actorId: A, amount: 50 });
      
      // Unstake
      const result = await releaseStake({ actorId: A, stakeId: stake.id });
      expect(result.success).toBe(true);

      // Verify
      const actor = await prisma.actorState.findUnique({ where: { actorId: A } });
      expect(actor?.currentRep).toBe(100);
      expect(actor?.stakedRep).toBe(0);
    });

    it('should fail stake with insufficient REP', async () => {
      await prisma.actorState.upsert({
        where: { actorId: A },
        update: {},
        create: { actorId: A, currentRep: 10, stakedRep: 0 }
      });

      await expect(
        stakeRep({ actorId: A, amount: 50 })
      ).rejects.toThrow('Insufficient REP');
    });

    it('should fail claim with insufficient staked REP', async () => {
      // Setup actor with minimal stake
      await prisma.actorState.upsert({
        where: { actorId: A },
        update: {},
        create: { actorId: A, currentRep: 100, stakedRep: 10 }
      });
      await prisma.stake.create({
        data: { id: A + '-stake', actorId: A, amount: 10, status: 'ACTIVE' }
      });

      // Create ticket with high bond
      const ticket = await createTicket({
        workPackageId: 'wp-test-2',
        title: 'High Bond Ticket',
        bondRequired: 50,
        deadline: new Date('2099-12-31T23:59:59Z')
      });

      // Claim should fail
      await expect(
        claimTicket({ actorId: A, ticketId: ticket.id })
      ).rejects.toThrow('Insufficient staked REP');
    });

    it('should fail double completion', async () => {
      // Setup
      await prisma.actorState.upsert({
        where: { actorId: A },
        update: {},
        create: { actorId: A, currentRep: 100, stakedRep: 0 }
      });
      await stakeRep({ actorId: A, amount: 50 });

      const ticket = await createTicket({
        workPackageId: 'wp-test-3',
        title: 'Double Complete Test',
        bondRequired: 30,
        deadline: new Date('2099-12-31T23:59:59Z')
      });

      await claimTicket({ actorId: A, ticketId: ticket.id });
      await completeTicket({ ticketId: ticket.id, verifierId: B });

      // Second completion should fail
      await expect(
        completeTicket({ ticketId: ticket.id, verifierId: B })
      ).rejects.toThrow();
    });
  });

  describe('Forfeiture Flow', () => {
    it('should slash overdue tickets', async () => {
      // Setup: past deadline
      await prisma.actorState.upsert({
        where: { actorId: A },
        update: {},
        create: { actorId: A, currentRep: 50, stakedRep: 30 }
      });

      const ticket = await createTicket({
        workPackageId: 'wp-test-f1',
        title: 'Overdue Ticket',
        bondRequired: 30,
        deadline: new Date('2020-01-01T00:00:00Z') // Past
      });

      await claimTicket({ actorId: A, ticketId: ticket.id });

      // Run forfeiture
      const results = await processForfeitures(0.5);
      
      expect(results.length).toBe(1);
      expect(results[0].slashed).toBe(15);
      expect(results[0].returned).toBe(15);

      // Verify ticket status
      const updatedTicket = await getTicket(ticket.id);
      expect(updatedTicket?.status).toBe('FORFEITED');
    });

    it('should not slash future tickets', async () => {
      await prisma.actorState.upsert({
        where: { actorId: A },
        update: {},
        create: { actorId: A, currentRep: 50, stakedRep: 30 }
      });

      const ticket = await createTicket({
        workPackageId: 'wp-test-f2',
        title: 'Future Ticket',
        bondRequired: 30,
        deadline: new Date('2099-12-31T23:59:59Z') // Future
      });

      await claimTicket({ actorId: A, ticketId: ticket.id });

      const results = await processForfeitures(0.5);
      expect(results.length).toBe(0);
    });
  });

  describe('Query Functions', () => {
    it('should list open tickets', async () => {
      await createTicket({
        workPackageId: 'wp-query-1',
        title: 'Open Ticket 1',
        bondRequired: 10,
        deadline: new Date('2099-12-31T23:59:59Z')
      });
      await createTicket({
        workPackageId: 'wp-query-2',
        title: 'Open Ticket 2',
        bondRequired: 20,
        deadline: new Date('2099-12-31T23:59:59Z')
      });

      const tickets = await listOpenTickets(10);
      expect(tickets.length).toBeGreaterThanOrEqual(2);
    });

    it('should get stake summary', async () => {
      await prisma.actorState.upsert({
        where: { actorId: A },
        update: {},
        create: { actorId: A, currentRep: 80, stakedRep: 20 }
      });

      const summary = await getStakeSummary(A);
      expect(summary.currentRep).toBe(80);
      expect(summary.stakedRep).toBe(20);
    });
  });
});
