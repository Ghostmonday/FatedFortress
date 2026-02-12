import { describe, it, expect } from 'vitest';
import { calculateState } from '../src/index';
import { AppEvent } from '@fated/events';
import { toUserId } from '@fated/types';

describe('XP Logic Engine', () => {
  it('should calculate XP from a stream of events', () => {
    const userId = 'user_123';

    const history: AppEvent[] = [
      {
        id: 'evt_1',
        streamId: userId,
        timestamp: new Date(),
        type: 'CONTRIBUTION_SUBMITTED',
        payload: {
          userId,
          url: 'https://github.com/expnet/core',
          description: 'Initial commit',
          complexityScore: 5,
        },
      },
      {
        id: 'evt_2',
        streamId: userId,
        timestamp: new Date(),
        type: 'CONTRIBUTION_SUBMITTED',
        payload: {
          userId,
          url: 'https://github.com/expnet/core',
          description: 'Fix bug',
          complexityScore: 0,
        },
      },
    ];

    const state = calculateState(history);

    // Event 1: 10 base + 5 bonus = 15
    // Event 2: 10 base + 0 bonus = 10
    // Total: 25
    expect(state[toUserId(userId)].total).toBe(25);
    expect(state[toUserId(userId)].details['general_contribution']).toBe(25);
  });
});
