import { describe, it, expect } from 'vitest';
import { calculateState } from '../src/index';
import { AppEvent } from '@fated/events';
import { toUserId } from '@fated/types';

describe('XP Inactivity Decay', () => {
  const userId = 'user_decay_test';
  const verifierId = 'verifier_1';

  // Helper to create a base state where user has XP
  const createBaseHistory = (activityDate: Date): AppEvent[] => {
    return [
      {
        id: 'evt_1',
        streamId: userId,
        timestamp: activityDate,
        type: 'CONTRIBUTION_SUBMITTED',
        payload: {
          userId,
          url: 'https://github.com/expnet/core',
          complexityScore: 5, // 10 + 5 = 15 XP
        },
      },
      {
        id: 'evt_2',
        streamId: verifierId,
        timestamp: new Date(activityDate.getTime() + 1000), // 1 sec later
        type: 'VERIFICATION_SUBMITTED',
        payload: {
          verifierId,
          targetContributionId: 'evt_1',
          verdict: 'APPROVE',
        },
      },
    ];
  };

  it('should not decay XP for active users (recently active)', () => {
    const now = new Date('2024-01-01');
    const activityDate = new Date('2023-12-20'); // ~10 days ago
    const history = createBaseHistory(activityDate);

    const state = calculateState(history, now);
    // User has 15 XP
    expect(state[toUserId(userId)].totalXP).toBe(15);
  });

  it('should not decay XP for users inactive for 30 days (grace period)', () => {
    const now = new Date('2024-02-01');
    const activityDate = new Date('2024-01-02'); // 30 days ago
    const history = createBaseHistory(activityDate);

    const state = calculateState(history, now);
    expect(state[toUserId(userId)].totalXP).toBe(15);
  });

  it('should not decay XP for users inactive for 59 days (threshold check)', () => {
    const now = new Date('2024-03-01');
    // 59 days ago.
    const activityDate = new Date(now.getTime() - 59 * 24 * 60 * 60 * 1000);

    const history = createBaseHistory(activityDate);
    const state = calculateState(history, now);

    // daysInactive = 59.
    // monthsInactive = floor((59-30)/30) = 0.
    // No decay.
    expect(state[toUserId(userId)].totalXP).toBe(15);
  });

  it('should decay XP for users inactive for 61 days (decay starts)', () => {
    const now = new Date();
    // 61 days ago
    const activityDate = new Date(now.getTime() - 61 * 24 * 60 * 60 * 1000);

    const history = createBaseHistory(activityDate);
    const state = calculateState(history, now);

    // daysInactive = 61.
    // monthsInactive = floor((61-30)/30) = 1.
    // decayFactor = 0.95^1 = 0.95.
    // totalXP = floor(15 * 0.95) = floor(14.25) = 14.

    expect(state[toUserId(userId)].totalXP).toBe(14);
  });

  it('should decay XP progressively for users inactive for 91 days', () => {
    const now = new Date();
    // 91 days ago
    const activityDate = new Date(now.getTime() - 91 * 24 * 60 * 60 * 1000);

    const history = createBaseHistory(activityDate);
    const state = calculateState(history, now);

    // daysInactive = 91.
    // monthsInactive = floor((91-30)/30) = floor(61/30) = 2.
    // decayFactor = 0.95^2 = 0.9025.
    // totalXP = floor(15 * 0.9025) = floor(13.5375) = 13.

    expect(state[toUserId(userId)].totalXP).toBe(13);
  });

  it('should reset inactivity timer when new activity occurs', () => {
    const now = new Date();
    // Old activity 100 days ago
    const oldDate = new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000);
    // New activity 10 days ago
    const newDate = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);

    const history = createBaseHistory(oldDate);
    // Add new activity
    history.push({
      id: 'evt_new',
      streamId: userId,
      timestamp: newDate,
      type: 'CONTRIBUTION_SUBMITTED',
      payload: {
        userId,
        url: 'https://github.com/expnet/core',
        complexityScore: 1, // 10+1 = 11 XP
      },
    });

    const state = calculateState(history, now);

    // Total XP before decay check: 15 (from old). New contribution adds to pendingXP, not totalXP.
    // But calculateState updates lastActivity for user on new event.
    // So lastActivity is 10 days ago.
    // daysInactive = 10.
    // No decay.

    expect(state[toUserId(userId)].totalXP).toBe(15);
  });

  it('should only decay inactive users in multi-user scenario', () => {
    const now = new Date();
    const inactiveUser = 'user_inactive';
    const activeUser = 'user_active';

    // Inactive user: 70 days ago
    const inactiveDate = new Date(now.getTime() - 70 * 24 * 60 * 60 * 1000);
    // Active user: 5 days ago
    const activeDate = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const history: AppEvent[] = [
      // Inactive user events
      {
        id: 'evt_in_1',
        streamId: inactiveUser,
        timestamp: inactiveDate,
        type: 'CONTRIBUTION_SUBMITTED',
        payload: { userId: inactiveUser, url: 'url', complexityScore: 5 },
      },
      {
        id: 'evt_in_2',
        streamId: 'verifier',
        timestamp: new Date(inactiveDate.getTime() + 1000),
        type: 'VERIFICATION_SUBMITTED',
        payload: { verifierId: 'verifier', targetContributionId: 'evt_in_1', verdict: 'APPROVE' },
      },
      // Active user events
      {
        id: 'evt_ac_1',
        streamId: activeUser,
        timestamp: activeDate,
        type: 'CONTRIBUTION_SUBMITTED',
        payload: { userId: activeUser, url: 'url', complexityScore: 5 },
      },
      {
        id: 'evt_ac_2',
        streamId: 'verifier',
        timestamp: new Date(activeDate.getTime() + 1000),
        type: 'VERIFICATION_SUBMITTED',
        payload: { verifierId: 'verifier', targetContributionId: 'evt_ac_1', verdict: 'APPROVE' },
      },
    ];

    const state = calculateState(history, now);

    // Inactive user: 15 XP. Days inactive = 70.
    // monthsInactive = floor((70-30)/30) = 1.
    // decay = 0.95. 15 * 0.95 = 14.25 -> 14.
    expect(state[toUserId(inactiveUser)].totalXP).toBe(14);

    // Active user: 15 XP. Days inactive = 5.
    // No decay.
    expect(state[toUserId(activeUser)].totalXP).toBe(15);
  });
});
