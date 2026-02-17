import { AppEvent } from '@fated/events';
import { Specialty, UserId } from '@fated/types';

export type XpVector = {
  totalXP: number;
  pendingXP: number;
  execution: number;      // From BUILDER actions
  collaboration: number;  // From ARCHITECT actions
  judgment: number;       // From GUARDIAN actions
  roleHistory: Record<string, Record<string, number>>; // { BUILDER: { BACKEND: 15 } }
  successRate: Record<string, number>; // { BACKEND: 0.85, FRONTEND: 0.72 }
  lastActivity: Date | null;
};

// Internal tracking for running average calculation
type RunningAverage = { total: number; count: number };

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
  const projectDomains: Record<string, string> = {}; // projectId -> domain
  const successTracking: Record<string, Record<string, RunningAverage>> = {}; // userId -> domain -> { total, count }

  const initUser = (uid: string) => {
    const id = uid as UserId;
    if (!state[id]) state[id] = {
      totalXP: 0,
      pendingXP: 0,
      execution: 0,
      collaboration: 0,
      judgment: 0,
      roleHistory: {},
      successRate: {},
      lastActivity: null
    };
    // Initialize success tracking for this user
    if (!successTracking[id]) {
      successTracking[id] = {};
    }
    return id;
  };

  for (const event of events) {
    if (isContribution(event)) {
      const uid = initUser(event.payload.userId);
      const xpValue = 10 + (event.payload.complexityScore ?? 0);
      const role = 'BUILDER';
      const specialty = event.payload.specialty || 'RESEARCH';

      contributions[event.id] = { userId: uid, xpValue, approved: false };
      state[uid].pendingXP += xpValue;
      state[uid].execution += xpValue;

      // Track roleHistory: { BUILDER: { BACKEND: 15 } }
      if (!state[uid].roleHistory[role]) state[uid].roleHistory[role] = {};
      if (!state[uid].roleHistory[role][specialty]) state[uid].roleHistory[role][specialty] = 0;
      state[uid].roleHistory[role][specialty] += 1;

      if (!state[uid].lastActivity || event.timestamp > state[uid].lastActivity!) {
        state[uid].lastActivity = event.timestamp;
      }
    }

    if (isVerification(event)) {
      const work = contributions[event.payload.targetContributionId];
      if (work && !work.approved && event.payload.verdict === 'APPROVE') {
        work.approved = true;
        state[work.userId].pendingXP -= work.xpValue;
        state[work.userId].totalXP += work.xpValue;

        const verifierId = initUser(event.payload.verifierId);
        state[verifierId].totalXP += 2;
        state[verifierId].judgment += 2;
        if (!state[verifierId].lastActivity || event.timestamp > state[verifierId].lastActivity!) {
          state[verifierId].lastActivity = event.timestamp;
        }
      }
    }

    // Track project domains from PROJECT_CREATED events
    if (event.type === 'PROJECT_CREATED') {
      const payload = event.payload;
      projectDomains[payload.projectId] = payload.domain;
    }

    // Update success rates from PROJECT_COMPLETED events
    if (event.type === 'PROJECT_COMPLETED') {
      const payload = event.payload;
      const domain = projectDomains[payload.projectId];

      for (const evaluation of payload.evaluations) {
        const userId = evaluation.userId;
        initUser(userId);

        // Initialize domain tracking if needed
        if (domain && !successTracking[userId][domain]) {
          successTracking[userId][domain] = { total: 0, count: 0 };
        }

        // Update running average for this domain
        if (domain) {
          const tracking = successTracking[userId][domain];
          tracking.total += evaluation.score;
          tracking.count += 1;
          const uid = userId as UserId;
          state[uid].successRate[domain] = tracking.total / tracking.count;
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
        user.totalXP = Math.floor(user.totalXP * decayFactor);
      }
    }
  }

  return state;
};
