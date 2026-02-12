import { SystemState } from '@fated/xp-logic';
import { UserId } from '@fated/types';

export type PartyRole = 'ARCHITECT' | 'GUARDIAN' | 'BUILDER';

export type PartyMember = {
    userId: UserId;
    role: PartyRole;
    score: number;
};

export type AdventuringParty = {
    members: PartyMember[];
    totalPower: number;
};

export const formParty = (state: SystemState): AdventuringParty => {
    const activeUsers = Object.entries(state).filter(([_, xp]) => {
        if (!xp.lastActivity) return false;
        const daysSilent = (new Date().getTime() - xp.lastActivity.getTime()) / (1000 * 3600 * 24);
        return daysSilent < 30;
    });

    const pool = new Set<string>();

    const pickBest = (
        role: PartyRole,
        scorer: (xp: any) => number
    ): PartyMember | null => {
        let bestId: string | null = null;
        let bestScore = -1;

        for (const [id, xp] of activeUsers) {
            if (pool.has(id)) continue;

            const score = scorer(xp);
            if (score > bestScore) {
                bestScore = score;
                bestId = id;
            }
        }

        if (bestId) {
            pool.add(bestId);
            return { userId: bestId as UserId, role, score: bestScore };
        }
        return null;
    };

    const members: PartyMember[] = [];

    const architect = pickBest('ARCHITECT', (xp) => xp.total);
    if (architect) members.push(architect);

    const guardian = pickBest('GUARDIAN', (xp) => {
        return xp.contributions > 0 ? (xp.total / xp.contributions) : 0;
    });
    if (guardian) members.push(guardian);

    const builder1 = pickBest('BUILDER', (xp) => xp.contributions);
    if (builder1) members.push(builder1);

    const builder2 = pickBest('BUILDER', (xp) => xp.contributions);
    if (builder2) members.push(builder2);

    return {
        members,
        totalPower: members.reduce((sum, m) => sum + m.score, 0)
    };
};
