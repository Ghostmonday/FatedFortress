import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InMemoryEventStore } from './index';
import { prisma } from '@fated/db';

// Mock the prisma client
vi.mock('@fated/db', () => ({
  prisma: {
    event: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
    actorState: {
      findMany: vi.fn(),
      upsert: vi.fn(),
    },
    project: {
      create: vi.fn(),
      update: vi.fn(),
    },
    evaluation: {
      create: vi.fn(),
    },
  },
}));

describe('InMemoryEventStore', () => {
  let store: InMemoryEventStore;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    store = new InMemoryEventStore(false);
    expect(store.getAll()).toEqual([]);
    expect(store.getState()).toEqual({});
    expect(store.getUserCount()).toBe(0);
  });

  it('should hydrate from database', async () => {
    const fullEvent = {
        id: 'ev-1',
        type: 'PROJECT_CREATED',
        payload: { projectId: 'p1', name: 'Test Project', domain: 'BACKEND' },
        timestamp: new Date().toISOString(),
        streamId: 'p1',
        metadata: {}
    };

    const mockEvents = [
      {
        id: 'ev-1',
        type: 'PROJECT_CREATED',
        payload: JSON.stringify(fullEvent),
        timestamp: new Date(),
        actorId: 'SYSTEM',
        streamId: 'p1',
        metadata: null,
        createdAt: new Date(),
      },
    ];

    const mockActorStates = [
      {
        actorId: 'user-1',
        currentXp: 100,
        pendingXp: 50,
        roleHistory: JSON.stringify({ BUILDER: { BACKEND: 5 } }),
        successRate: JSON.stringify({ BACKEND: 0.9 }),
        lastActivity: new Date(),
      }
    ];

    // Mock implementations
    vi.mocked(prisma.event.findMany).mockResolvedValue(mockEvents as any);
    vi.mocked(prisma.actorState.findMany).mockResolvedValue(mockActorStates as any);

    store = new InMemoryEventStore(true);

    // Wait for async hydration promise to resolve.
    // Since hydration is not awaited in constructor, we wait a tick.
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(prisma.actorState.findMany).toHaveBeenCalled();
    expect(prisma.event.findMany).toHaveBeenCalled();

    // Verify events loaded
    expect(store.count).toBe(1);
    expect(store.getAll()[0].id).toBe('ev-1');

    // Verify state loaded
    const state = store.getState();
    expect(state['user-1' as any]).toBeDefined();
    expect(state['user-1' as any].totalXP).toBe(100);
    expect(state['user-1' as any].pendingXP).toBe(50);
  });

  it('should append valid event', async () => {
    store = new InMemoryEventStore(false);

    const event = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      type: 'PROJECT_CREATED',
      payload: { projectId: 'p2', name: 'New Project', domain: 'FRONTEND' },
      timestamp: new Date(),
      streamId: 'p2',
      metadata: {}
    };

    const result = await store.append(event);

    expect(result.ok).toBe(true);
    if (result.ok) {
        expect(result.eventId).toBe('550e8400-e29b-41d4-a716-446655440000');
    }

    expect(store.count).toBe(1);
    expect(store.getAll()[0].id).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  it('should reject invalid event', async () => {
    store = new InMemoryEventStore(false);

    const invalidEvent = {
      id: 'ev-bad', // Invalid UUID
      type: 'PROJECT_CREATED',
      // Missing payload
    };

    const result = await store.append(invalidEvent);

    expect(result.ok).toBe(false);
    expect(store.count).toBe(0);
  });

  it('should update state on append', async () => {
    store = new InMemoryEventStore(false);

    const contributionEvent = {
      id: '550e8400-e29b-41d4-a716-446655440001',
      type: 'CONTRIBUTION_SUBMITTED',
      payload: {
          userId: 'u1',
          url: 'http://git.com',
          complexityScore: 5,
          specialty: 'BACKEND'
      },
      timestamp: new Date(),
      streamId: 'u1',
      metadata: {}
    };

    await store.append(contributionEvent);

    const state = store.getState();
    const user = state['u1' as any];
    expect(user).toBeDefined();
    // complexity 5 + 10 base = 15
    expect(user.pendingXP).toBe(15);
    expect(user.execution).toBe(15);
  });

  it('should persist event to database', async () => {
    store = new InMemoryEventStore(false);

    const event = {
      id: '550e8400-e29b-41d4-a716-446655440002',
      type: 'PROJECT_CREATED',
      payload: { projectId: 'p3', name: 'Persist Project', domain: 'SECURITY' },
      timestamp: new Date(),
      streamId: 'p3',
      metadata: {}
    };

    await store.append(event);

    expect(prisma.event.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
            id: event.id,
            type: event.type,
            actorId: 'SYSTEM'
        })
    }));

    // For PROJECT_CREATED, it should also create a project
    expect(prisma.project.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
            id: 'p3',
            name: 'Persist Project',
            domain: 'SECURITY'
        })
    }));
  });

  it('should persist actor state updates', async () => {
    store = new InMemoryEventStore(false);

    const event = {
      id: '550e8400-e29b-41d4-a716-446655440003',
      type: 'CONTRIBUTION_SUBMITTED',
      payload: {
          userId: 'u2',
          url: 'http://git.com',
          complexityScore: 5,
          specialty: 'DEVOPS'
      },
      timestamp: new Date(),
      streamId: 'u2',
      metadata: {}
    };

    await store.append(event);

    expect(prisma.actorState.upsert).toHaveBeenCalledWith(expect.objectContaining({
        where: { actorId: 'u2' },
        create: expect.objectContaining({
            actorId: 'u2',
            currentXp: 0,
            pendingXp: 15,
        }),
        update: expect.objectContaining({
            currentXp: 0,
            pendingXp: 15,
        })
    }));
  });

  it('should compact events array when limit exceeded', async () => {
    store = new InMemoryEventStore(false);

    // The limit is 1000
    const limit = 1000;

    // Add limit + 10 events
    // We mock the persistence to avoid 1010 calls slowing down or erroring
    vi.mocked(prisma.event.create).mockResolvedValue({} as any);
    vi.mocked(prisma.project.create).mockResolvedValue({} as any);

    const eventsToAppend = [];
    for (let i = 0; i < limit + 10; i++) {
        // Need 12 digits for the last part of UUID
        const id = `550e8400-e29b-41d4-a716-${(1000000000000 + i).toString().slice(1)}`;
        eventsToAppend.push({
          id,
          type: 'PROJECT_CREATED',
          payload: { projectId: `p-${i}`, name: `Project ${i}`, domain: 'RESEARCH' },
          timestamp: new Date(),
          streamId: `p-${i}`,
          metadata: {}
        });
    }

    // Append sequentially
    for (const event of eventsToAppend) {
        await store.append(event);
    }

    expect(store.count).toBe(limit);
    // The first events should have been dropped
    // The last event should be present
    const events = store.getAll();
    expect(events.length).toBe(limit);

    const lastId = `550e8400-e29b-41d4-a716-${(1000000000000 + limit + 9).toString().slice(1)}`;
    expect(events[events.length - 1].id).toBe(lastId);
  });

  it('should return leaderboard sorted by totalXP', async () => {
    store = new InMemoryEventStore(false);

    const event1 = {
      id: '550e8400-e29b-41d4-a716-446655440100',
      type: 'CONTRIBUTION_SUBMITTED',
      payload: { userId: 'u1', url: 'http://u1.com', complexityScore: 10, specialty: 'BACKEND' }, // 10 + 10 = 20 XP
      timestamp: new Date(),
      streamId: 'u1',
      metadata: {}
    };

    const event2 = {
      id: '550e8400-e29b-41d4-a716-446655440101',
      type: 'CONTRIBUTION_SUBMITTED',
      payload: { userId: 'u2', url: 'http://u2.com', complexityScore: 5, specialty: 'FRONTEND' }, // 10 + 5 = 15 XP
      timestamp: new Date(),
      streamId: 'u2',
      metadata: {}
    };

    await store.append(event1);
    await store.append(event2);

    const verify1 = {
        id: '550e8400-e29b-41d4-a716-446655440200',
        type: 'VERIFICATION_SUBMITTED',
        payload: { verifierId: 'v1', targetContributionId: event1.id, verdict: 'APPROVE', specialty: 'BACKEND' },
        timestamp: new Date(),
        streamId: 'v1',
        metadata: {}
    };

    const verify2 = {
        id: '550e8400-e29b-41d4-a716-446655440201',
        type: 'VERIFICATION_SUBMITTED',
        payload: { verifierId: 'v2', targetContributionId: event2.id, verdict: 'APPROVE', specialty: 'FRONTEND' },
        timestamp: new Date(),
        streamId: 'v2',
        metadata: {}
    };

    await store.append(verify1);
    await store.append(verify2);

    const leaderboard = store.getLeaderboard();

    expect(leaderboard.length).toBe(4);
    expect(leaderboard[0].userId).toBe('u1');
    expect(leaderboard[0].totalXP).toBe(20);
    expect(leaderboard[1].userId).toBe('u2');
    expect(leaderboard[1].totalXP).toBe(15);

    expect(store.getUserCount()).toBe(4);
  });
});
