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
    const contributorId = 'user_contrib';
    const verifierId = 'user_verifier';
    const contributionId = 'evt_contrib_1';

    const history: AppEvent[] = [
      {
        id: contributionId,
        streamId: contributorId,
        timestamp: new Date('2023-01-01T10:00:00Z'),
        type: 'CONTRIBUTION_SUBMITTED',
        payload: {
          userId: contributorId,
          url: 'https://github.com/expnet/core/pull/1',
          complexityScore: 5, // 10 base + 5 = 15 XP
        },
      },
      {
        id: 'evt_verify_1',
        streamId: verifierId,
        timestamp: new Date('2023-01-01T12:00:00Z'),
        type: 'VERIFICATION_SUBMITTED',
        payload: {
          verifierId: verifierId,
          targetContributionId: contributionId,
          verdict: 'APPROVE',
        },
      },
    ];

    const state = calculateState(history, new Date('2023-01-02T00:00:00Z'));

    const contributor = state[toUserId(contributorId)];
    const verifier = state[toUserId(verifierId)];

    // Contributor checks
    expect(contributor.pendingXP).toBe(0); // Should be moved to total
    expect(contributor.totalXP).toBe(15);  // 10 base + 5 complexity
    expect(contributor.execution).toBe(15);

    // Verifier checks
    expect(verifier.totalXP).toBe(2);
    expect(verifier.judgment).toBe(2);
  });
});
