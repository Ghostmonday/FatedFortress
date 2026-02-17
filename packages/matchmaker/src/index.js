// Specialty and role multiplier constants
const SPECIALTY_MULTIPLIER = 1.5;
const ROLE_MULTIPLIER = 1.5;
const SUCCESS_MULTIPLIER = 0.5; // Success rate adds up to 50% bonus
/**
 * Get the XP value for a specific role.
 */
const getRoleXP = (xp, role) => {
    switch (role) {
        case 'BUILDER': return xp.execution;
        case 'ARCHITECT': return xp.collaboration;
        case 'GUARDIAN': return xp.judgment;
    }
};
/**
 * Check if user has activity in the target domain across any role.
 */
const hasSpecialty = (xp, targetDomain) => {
    for (const roleHistory of Object.values(xp.roleHistory)) {
        if (roleHistory[targetDomain] && roleHistory[targetDomain] > 0) {
            return true;
        }
    }
    return false;
};
/**
 * Get effective score for a user with specialty, role, and success rate multipliers.
 *
 * Formula:
 * effectiveScore = baseScore
 *                * (role === targetRole ? 1.5 : 1.0)
 *                * (specialty === targetDomain ? 1.5 : 1.0)
 *                * (1 + (successRate[domain] * 0.5))
 */
const getEffectiveScore = (xp, roleXP, targetDomain) => {
    let score = roleXP;
    // Apply role multiplier if user has XP in this role
    if (roleXP > 0) {
        score *= ROLE_MULTIPLIER;
    }
    // Apply specialty multiplier if target domain is specified and user has it
    if (targetDomain && hasSpecialty(xp, targetDomain)) {
        score *= SPECIALTY_MULTIPLIER;
    }
    // Apply success rate multiplier if target domain is specified and user has history
    if (targetDomain && xp.successRate && xp.successRate[targetDomain] !== undefined) {
        const successMultiplier = 1 + (xp.successRate[targetDomain] * SUCCESS_MULTIPLIER);
        score *= successMultiplier;
    }
    return score;
};
export const formParty = (state, now = new Date(), targetDomain) => {
    const activeUsers = Object.entries(state).filter(([_, xp]) => {
        if (!xp.lastActivity)
            return false;
        const daysSilent = (now.getTime() - xp.lastActivity.getTime()) / (1000 * 3600 * 24);
        return daysSilent < 30;
    });
    const pool = new Set();
    const pickBest = (role, scorer) => {
        let bestId = null;
        let bestScore = -1;
        for (const [id, xp] of activeUsers) {
            if (pool.has(id))
                continue;
            const baseScore = scorer(xp);
            const effectiveScore = getEffectiveScore(xp, baseScore, targetDomain);
            if (effectiveScore > bestScore) {
                bestScore = effectiveScore;
                bestId = id;
            }
        }
        if (bestId) {
            pool.add(bestId);
            return { userId: bestId, role, score: bestScore };
        }
        return null;
    };
    const members = [];
    // Pick ARCHITECT - requires collaboration XP
    const architect = pickBest('ARCHITECT', (xp) => xp.collaboration);
    if (architect && architect.score > 0) {
        members.push(architect);
    }
    // Pick GUARDIAN - requires judgment XP
    const guardian = pickBest('GUARDIAN', (xp) => xp.judgment);
    if (guardian && guardian.score > 0) {
        members.push(guardian);
    }
    // Pick BUILDERs - requires execution XP (specialty-aware)
    const builder1 = pickBest('BUILDER', (xp) => xp.execution);
    if (builder1 && builder1.score > 0) {
        members.push(builder1);
    }
    const builder2 = pickBest('BUILDER', (xp) => xp.execution);
    if (builder2 && builder2.score > 0) {
        members.push(builder2);
    }
    return {
        members,
        totalPower: members.reduce((sum, m) => sum + m.score, 0)
    };
};
//# sourceMappingURL=index.js.map