// Type guards for discriminated union
const isContribution = (event) => {
    return event.type === 'CONTRIBUTION_SUBMITTED';
};
const isVerification = (event) => {
    return event.type === 'VERIFICATION_SUBMITTED';
};
export const calculateState = (events, now = new Date()) => {
    const state = {};
    const contributions = {};
    const projectDomains = {}; // projectId -> domain
    const successTracking = {}; // userId -> domain -> { total, count }
    const initUser = (uid) => {
        const id = uid;
        if (!state[id])
            state[id] = {
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
            if (!state[uid].roleHistory[role])
                state[uid].roleHistory[role] = {};
            if (!state[uid].roleHistory[role][specialty])
                state[uid].roleHistory[role][specialty] = 0;
            state[uid].roleHistory[role][specialty] += 1;
            if (!state[uid].lastActivity || event.timestamp > state[uid].lastActivity) {
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
                if (!state[verifierId].lastActivity || event.timestamp > state[verifierId].lastActivity) {
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
                    const uid = userId;
                    state[uid].successRate[domain] = tracking.total / tracking.count;
                }
            }
        }
    }
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    for (const userId in state) {
        const user = state[userId];
        if (!user.lastActivity)
            continue;
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
//# sourceMappingURL=index.js.map