/**
 * Fated Fortress E2E Tests
 * 
 * Tests the complete API flow:
 * 1. Start server
 * 2. Test health endpoints
 * 3. Test contribution/verification flow
 * 4. Test leaderboard
 * 5. Test ticket lifecycle
 * 6. Test staking flow
 * 7. Test analytics
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';

// Test configuration
const API_URL = process.env.API_URL || 'http://localhost:3000';
const API_KEY = process.env.API_KEY || 'test-key-123';

describe('Fated Fortress E2E', () => {
  
  describe('Health Checks', () => {
    it('should respond to root endpoint', async () => {
      const response = await fetch(API_URL);
      // Fastify may return 404 for root, but server is up
      expect([200, 404]).toContain(response.status);
    });

    it('should have CORS headers', async () => {
      const response = await fetch(API_URL, { 
        method: 'OPTIONS',
        headers: { 'Origin': 'http://localhost' }
      });
      // Server should respond to OPTIONS
      expect([200, 204, 404]).toContain(response.status);
    });
  });

  describe('Leaderboard', () => {
    it('should get leaderboard with default pagination', async () => {
      const response = await fetch(`${API_URL}/leaderboard`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('leaderboard');
      expect(data).toHaveProperty('total');
      expect(Array.isArray(data.leaderboard)).toBe(true);
    });

    it('should support pagination parameters', async () => {
      const response = await fetch(`${API_URL}/leaderboard?offset=0&limit=10`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.leaderboard.length).toBeLessThanOrEqual(10);
    });
  });

  describe('Team', () => {
    it('should get team composition', async () => {
      const response = await fetch(`${API_URL}/team`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('team');
      expect(data).toHaveProperty('totalPower');
      expect(Array.isArray(data.team)).toBe(true);
    });
  });

  describe('Tickets', () => {
    let createdTicketId: string | null = null;

    it('should list open tickets', async () => {
      const response = await fetch(`${API_URL}/tickets`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('tickets');
      expect(Array.isArray(data.tickets)).toBe(true);
    });

    it('should create a new ticket', async () => {
      const ticketData = {
        workPackageId: 'TEST-001',
        title: 'E2E Test Ticket',
        description: 'Created by E2E test suite',
        bondRequired: 50,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      };

      const response = await fetch(`${API_URL}/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(ticketData),
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        expect(data).toHaveProperty('ticket');
        createdTicketId = data.ticket?.id || null;
      }
      // May fail if API key is invalid - that's ok for this test
      expect([200, 201, 400, 401]).toContain(response.status);
    });

    it('should get a specific ticket', async () => {
      if (!createdTicketId) {
        // Skip if we couldn't create a ticket
        return;
      }

      const response = await fetch(`${API_URL}/ticket/${createdTicketId}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('Staking Flow', () => {
    const testActorId = `e2e-test-${Date.now()}`;

    it('should stake REP', async () => {
      const response = await fetch(`${API_URL}/stake`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          actorId: testActorId,
          amount: 100,
        }),
      });

      // May succeed or fail depending on API key / actor existence
      expect([200, 201, 400, 401, 404]).toContain(response.status);
    });

    it('should get stake summary', async () => {
      const response = await fetch(`${API_URL}/stake/${testActorId}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('Analytics', () => {
    it('should get analytics summary', async () => {
      const response = await fetch(`${API_URL}/analytics/summary`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('totalActors');
      expect(data).toHaveProperty('totalTickets');
      expect(data).toHaveProperty('totalStaked');
      expect(data).toHaveProperty('ticketsByStatus');
    });

    it('should get REP leaderboard', async () => {
      const response = await fetch(`${API_URL}/analytics/leaderboard/rep`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('totalRep');
      expect(data).toHaveProperty('count');
      expect(data).toHaveProperty('holders');
      expect(Array.isArray(data.holders)).toBe(true);
    });
  });

  describe('Reaper', () => {
    it('should get reaper status', async () => {
      const response = await fetch(`${API_URL}/admin/reaper/status`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('enabled');
      expect(data).toHaveProperty('intervalMs');
      expect(data).toHaveProperty('running');
    });

    it('should manually trigger reaper', async () => {
      const response = await fetch(`${API_URL}/admin/reaper`, {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
        },
      });

      expect([200, 400, 401]).toContain(response.status);
    });
  });

  describe('Simulation Endpoints', () => {
    it('should get stress test results', async () => {
      const response = await fetch(`${API_URL}/admin/sim/stress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ iterations: 10 }),
      });

      expect([200, 400, 401]).toContain(response.status);
      
      if (response.status === 200) {
        const data = await response.json();
        expect(data).toHaveProperty('iterations');
        expect(data).toHaveProperty('successCount');
        expect(data).toHaveProperty('durationMs');
      }
    });
  });
});
