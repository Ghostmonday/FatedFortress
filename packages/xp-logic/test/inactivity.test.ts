import { describe, it, expect } from 'vitest';
import { calculateState } from '../src/index';
import { AppEvent } from '@fated/events';
import { toUserId } from '@fated/types';

describe('XP Inactivity Decay', () => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const userId = toUserId('user_123');
  const verifierId = toUserId('verifier_456');

  const createEvents = (startTime: Date): AppEvent[] => {
    // User contributes -> Pending XP
    // Verifier approves -> Total XP
    return [
      {
        id: 'evt_1',
        streamId: userId,
        timestamp: startTime,
        type: 'CONTRIBUTION_SUBMITTED',
        payload: {
          userId,
          url: 'https://github.com/expnet/core',
          complexityScore: 0, // 10 base XP
        },
      },
      {
        id: 'evt_2',
        streamId: verifierId,
        timestamp: new Date(startTime.getTime() + 1000), // 1 second later
        type: 'VERIFICATION_SUBMITTED',
        payload: {
          verifierId,
          targetContributionId: 'evt_1',
          verdict: 'APPROVE',
        },
      },
    ];
  };

  it('should not decay XP for inactivity < 30 days', () => {
    const startTime = new Date('2023-01-01T00:00:00Z');
    const events = createEvents(startTime);
    const now = new Date(startTime.getTime() + 29 * MS_PER_DAY);

    const state = calculateState(events, now);
    // 10 XP base. No decay.
    expect(state[userId].totalXP).toBe(10);
  });

  it('should not decay XP for inactivity between 30 and 59 days', () => {
    const startTime = new Date('2023-01-01T00:00:00Z');
    const events = createEvents(startTime);
    const now = new Date(startTime.getTime() + 59 * MS_PER_DAY);

    const state = calculateState(events, now);
    // (59 - 30) / 30 = 0.96 -> floor 0 -> no decay
    expect(state[userId].totalXP).toBe(10);
  });

  it('should decay XP by 5% after 60 days inactivity', () => {
    const startTime = new Date('2023-01-01T00:00:00Z');
    // Use 100 XP to make math easier. 10 base + 90 complexity
    const events: AppEvent[] = [
      {
        id: 'evt_1',
        streamId: userId,
        timestamp: startTime,
        type: 'CONTRIBUTION_SUBMITTED',
        payload: {
          userId,
          url: 'https://github.com/expnet/core',
          complexityScore: 90,
        },
      },
      {
        id: 'evt_2',
        streamId: verifierId,
        timestamp: new Date(startTime.getTime() + 1000),
        type: 'VERIFICATION_SUBMITTED',
        payload: {
          verifierId,
          targetContributionId: 'evt_1',
          verdict: 'APPROVE',
        },
      },
    ];

    const now = new Date(startTime.getTime() + 61 * MS_PER_DAY); // 61 days > 60
    // daysInactive = 61. (61-30)/30 = 1.03 -> floor 1.
    // decayFactor = 0.95^1 = 0.95.
    // totalXP = floor(100 * 0.95) = 95.

    const state = calculateState(events, now);
    expect(state[userId].totalXP).toBe(95);
  });

  it('should decay XP exponentially for multiple months of inactivity', () => {
    const startTime = new Date('2023-01-01T00:00:00Z');
    // Use 100 XP
    const events: AppEvent[] = [
      {
        id: 'evt_1',
        streamId: userId,
        timestamp: startTime,
        type: 'CONTRIBUTION_SUBMITTED',
        payload: {
          userId,
          url: 'https://github.com/expnet/core',
          complexityScore: 90,
        },
      },
      {
        id: 'evt_2',
        streamId: verifierId,
        timestamp: new Date(startTime.getTime() + 1000),
        type: 'VERIFICATION_SUBMITTED',
        payload: {
          verifierId,
          targetContributionId: 'evt_1',
          verdict: 'APPROVE',
        },
      },
    ];

    const now = new Date(startTime.getTime() + 91 * MS_PER_DAY); // 91 days > 90
    // daysInactive = 91. (91-30)/30 = 2.03 -> floor 2.
    // decayFactor = 0.95^2 = 0.9025.
    // totalXP = floor(100 * 0.9025) = 90.

    const state = calculateState(events, now);
    expect(state[userId].totalXP).toBe(90);
  });

  it('should not decay if recent activity occurred', () => {
    const startTime = new Date('2023-01-01T00:00:00Z');
    const events = createEvents(startTime); // T0

    // Add another event at T0 + 80 days.
    // Total duration 90 days.
    // If no second event: 90 days inactive -> decay.
    // With second event: lastActivity is T0 + 80 days.
    // Inactive time = 10 days. No decay.

    const secondEventTime = new Date(startTime.getTime() + 80 * MS_PER_DAY);
    events.push({
      id: 'evt_3',
      streamId: userId,
      timestamp: secondEventTime,
      type: 'CONTRIBUTION_SUBMITTED',
      payload: {
        userId,
        url: 'https://github.com/expnet/core',
        complexityScore: 0,
      },
    });

    const now = new Date(startTime.getTime() + 90 * MS_PER_DAY);

    const state = calculateState(events, now);
    // User has 10 XP (first event) + 10 XP (second event, pending) = 20 total pending?
    // Wait, first event was verified -> 10 totalXP.
    // Second event is pending -> 10 pendingXP.
    // lastActivity should be T0 + 80 days.
    // Inactivity = 10 days. No decay.
    // So totalXP should be 10.

    expect(state[userId].totalXP).toBe(10);
    // Also verify pendingXP just in case
    expect(state[userId].pendingXP).toBe(10);
  });
});
