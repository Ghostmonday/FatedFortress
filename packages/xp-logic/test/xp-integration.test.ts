import { describe, it, expect } from 'vitest';
import { calculateState } from '../src/index';
import { AppEvent } from '@fated/events';
import { toUserId } from '@fated/types';

describe('XP Logic Refactor Verification', () => {
  it('should correctly handle PROJECT_CREATED and PROJECT_COMPLETED events', () => {
    const userId = 'user_refactor';
    const projectId = 'proj_123';
    const domain = 'BACKEND';

    const history: AppEvent[] = [
      {
        id: 'evt_1',
        streamId: 'sys',
        timestamp: new Date(),
        type: 'PROJECT_CREATED',
        payload: {
          projectId,
          name: 'Test Project',
          domain: domain as any,
        },
      },
      {
        id: 'evt_2',
        streamId: 'sys',
        timestamp: new Date(),
        type: 'PROJECT_COMPLETED',
        payload: {
          projectId,
          evaluations: [
            { userId, score: 0.8 },
          ],
        },
      },
      {
        id: 'evt_3',
        streamId: 'sys',
        timestamp: new Date(),
        type: 'PROJECT_COMPLETED',
        payload: {
          projectId,
          evaluations: [
            { userId, score: 0.9 },
          ],
        },
      },
    ];

    const state = calculateState(history);
    const userState = state[toUserId(userId)];

    expect(userState).toBeDefined();
    expect(userState.successRate[domain]).toBeCloseTo(0.85); // (0.8 + 0.9) / 2
  });

  it('should correctly handle specialty from CONTRIBUTION_SUBMITTED events', () => {
    const userId = 'user_specialty';
    const specialty = 'FRONTEND';

    const history: AppEvent[] = [
      {
        id: 'evt_contrib',
        streamId: userId,
        timestamp: new Date(),
        type: 'CONTRIBUTION_SUBMITTED',
        payload: {
          userId,
          url: 'https://github.com/expnet/ui',
          specialty: specialty as any,
          complexityScore: 5
        },
      },
    ];

    const state = calculateState(history);
    const userState = state[toUserId(userId)];

    expect(userState).toBeDefined();
    expect(userState.roleHistory['BUILDER'][specialty]).toBe(1);
  });
});
