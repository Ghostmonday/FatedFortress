import { describe, it, expect } from 'vitest';
import { calculateState } from '../src/index';
import { AppEvent } from '@fated/events';
import { toUserId } from '@fated/types';

describe('XP Logic - Project Events', () => {
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
    ];

    const state = calculateState(history);
    const userState = state[toUserId(userId)];

    expect(userState).toBeDefined();
    // Verify that the success rate for the domain was updated correctly
    expect(userState.successRate[domain]).toBeCloseTo(0.8);
  });
});
