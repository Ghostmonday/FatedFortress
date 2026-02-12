import { AppEvent } from '@fated/events';
import { UserId } from '@fated/types';

export type XpVector = {
  total: number;
  pending: number;
  contributions: number;
  lastActivity: Date | null;
};

export type SystemState = Record<UserId, XpVector>;

// Type guards for discriminated union
const isContribution = (event: AppEvent): event is Extract<AppEvent, { type: 'CONTRIBUTION_SUBMITTED' }> => {
  return event.type === 'CONTRIBUTION_SUBMITTED';
};

const isVerification = (event: AppEvent): event is Extract<AppEvent, { type: 'VERIFICATION_SUBMITTED' }> => {
  return event.type === 'VERIFICATION_SUBMITTED';
};

export const calculateState = (events: AppEvent[], now: Date = new Date()): SystemState => {
  const state: SystemState = {};

  const contributions: Record<string, { userId: UserId; xpValue: number; approved: boolean }> = {};

  const initUser = (uid: string) => {
    const id = uid as UserId;
    if (!state[id]) state[id] = { total: 0, pending: 0, contributions: 0, lastActivity: null };
    return id;
  };

  for (const event of events) {
    if (isContribution(event)) {
      const uid = initUser(event.payload.userId);
      const xpValue = 10 + (event.payload.complexityScore ?? 0);

      contributions[event.id] = { userId: uid, xpValue, approved: false };
      state[uid].pending += xpValue;
      state[uid].contributions += 1;

      if (!state[uid].lastActivity || event.timestamp > state[uid].lastActivity!) {
        state[uid].lastActivity = event.timestamp;
      }
    }

    if (isVerification(event)) {
      const work = contributions[event.payload.targetContributionId];
      if (work && !work.approved && event.payload.verdict === 'APPROVE') {
        work.approved = true;
        state[work.userId].pending -= work.xpValue;
        state[work.userId].total += work.xpValue;

        const verifierId = initUser(event.payload.verifierId);
        state[verifierId].total += 2;
        if (!state[verifierId].lastActivity || event.timestamp > state[verifierId].lastActivity!) {
          state[verifierId].lastActivity = event.timestamp;
        }
      }
    }
  }

  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  for (const userId in state) {
    const user = state[userId as UserId];
    if (!user.lastActivity) continue;

    const daysInactive = (now.getTime() - user.lastActivity.getTime()) / MS_PER_DAY;

    if (daysInactive > 30) {
      const monthsInactive = Math.floor((daysInactive - 30) / 30);
      if (monthsInactive > 0) {
        const decayFactor = Math.pow(0.95, monthsInactive);
        user.total = Math.floor(user.total * decayFactor);
      }
    }
  }

  return state;
};
