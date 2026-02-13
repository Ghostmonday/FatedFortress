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
          complexityScore: 0,
        },
      },
    ];

    const state = calculateState(history);

    // Event 1: 10 base + 5 bonus = 15
    // Event 2: 10 base + 0 bonus = 10
    // Total pending: 25
    expect(state[toUserId(userId)].pendingXP).toBe(25);
  });

  it('should process verification events and update XP accordingly', () => {
    const contributorId = 'user_1';
    const verifierId = 'user_2';
    const contributionId = 'evt_1';

    const history: AppEvent[] = [
      {
        id: contributionId,
        streamId: contributorId,
        timestamp: new Date(),
        type: 'CONTRIBUTION_SUBMITTED',
        payload: {
          userId: contributorId,
          url: 'https://github.com/expnet/core',
          complexityScore: 5,
        },
      },
      {
        id: 'evt_2',
        streamId: verifierId,
        timestamp: new Date(),
        type: 'VERIFICATION_SUBMITTED',
        payload: {
          verifierId: verifierId,
          targetContributionId: contributionId,
          verdict: 'APPROVE',
          qualityScore: 4,
        },
      },
    ];

    const state = calculateState(history);

    // Contributor: 10 base + 5 complexity = 15
    expect(state[toUserId(contributorId)].pendingXP).toBe(0);
    expect(state[toUserId(contributorId)].totalXP).toBe(15);
    expect(state[toUserId(contributorId)].execution).toBe(15);

    // Verifier: 2 XP
    expect(state[toUserId(verifierId)].totalXP).toBe(2);
    expect(state[toUserId(verifierId)].judgment).toBe(2);
  });
});
