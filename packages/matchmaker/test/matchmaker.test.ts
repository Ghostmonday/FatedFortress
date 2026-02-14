import { describe, it, expect } from 'vitest';
import { formParty } from '../src/index';
import { SystemState, XpVector } from '@fated/xp-logic';
import { UserId, Specialty } from '@fated/types';

const createXp = (
    execution: number,
    collaboration: number,
    judgment: number,
    roleHistory: Record<string, Record<string, number>> = {},
    successRate: Record<string, number> = {},
    lastActivity: Date = new Date()
): XpVector => ({
    totalXP: execution + collaboration + judgment,
    pendingXP: 0,
    execution,
    collaboration,
    judgment,
    roleHistory,
    successRate,
    lastActivity
});

describe('Matchmaker: formParty', () => {
    it('should form a complete party when sufficient users are available', () => {
        const now = new Date('2023-01-01');
        const state: SystemState = {
            ['user1' as UserId]: createXp(0, 100, 0, {}, {}, now), // Architect
            ['user2' as UserId]: createXp(0, 0, 100, {}, {}, now), // Guardian
            ['user3' as UserId]: createXp(100, 0, 0, {}, {}, now), // Builder 1
            ['user4' as UserId]: createXp(100, 0, 0, {}, {}, now), // Builder 2
        };

        const party = formParty(state, now);

        expect(party.members).toHaveLength(4);
        expect(party.members.find(m => m.role === 'ARCHITECT')?.userId).toBe('user1');
        expect(party.members.find(m => m.role === 'GUARDIAN')?.userId).toBe('user2');
        expect(party.members.filter(m => m.role === 'BUILDER')).toHaveLength(2);

        const builders = party.members.filter(m => m.role === 'BUILDER').map(m => m.userId);
        expect(builders).toContain('user3');
        expect(builders).toContain('user4');
    });

    it('should calculate effective score with role multiplier', () => {
        const now = new Date('2023-01-01');
        // User has history as BUILDER in RESEARCH specialty
        const roleHistory = { 'BUILDER': { 'RESEARCH': 10 } };

        const state: SystemState = {
            ['user1' as UserId]: createXp(100, 0, 0, roleHistory, {}, now),
        };

        const party = formParty(state, now, 'RESEARCH');
        const builder = party.members.find(m => m.role === 'BUILDER');

        // Base score: 100
        // Role multiplier: 1.5 (due to role history)
        // Specialty multiplier: 1.5 (due to matching specialty in history)
        // Expected: 100 * 1.5 * 1.5 = 225
        expect(builder).toBeDefined();
        expect(builder?.score).toBe(225);
    });

    it('should prioritize users with matching specialty', () => {
        const now = new Date('2023-01-01');
        const state: SystemState = {
            ['specialist' as UserId]: createXp(100, 0, 0, { 'BUILDER': { 'BACKEND': 10 } }, {}, now),
            ['generalist' as UserId]: createXp(120, 0, 0, {}, {}, now),
        };

        // Target domain is BACKEND
        const party = formParty(state, now, 'BACKEND');
        const builder = party.members.find(m => m.role === 'BUILDER');

        // specialist: 100 * 1.5 (role) * 1.5 (specialty) = 225
        // generalist: 120 (no history multiplier as empty roleHistory? No wait, getEffectiveScore logic check)

        // Let's re-read getEffectiveScore logic in my head:
        // if (roleXP > 0) score *= ROLE_MULTIPLIER;
        // if (targetDomain && hasSpecialty(xp, targetDomain)) score *= SPECIALTY_MULTIPLIER;

        // specialist: 100 * 1.5 (roleXP>0) * 1.5 (hasSpecialty) = 225
        // generalist: 120 * 1.5 (roleXP>0) = 180 (assuming generalist has roleXP > 0 which is true: 120)

        expect(builder?.userId).toBe('specialist');
    });

    it('should exclude inactive users (silent > 30 days)', () => {
        const now = new Date('2023-02-01'); // Feb 1st
        const activeDate = new Date('2023-01-15'); // 17 days ago
        const inactiveDate = new Date('2022-12-15'); // 48 days ago

        const state: SystemState = {
            ['active' as UserId]: createXp(100, 0, 0, {}, {}, activeDate),
            ['inactive' as UserId]: createXp(100, 0, 0, {}, {}, inactiveDate),
        };

        const party = formParty(state, now);

        expect(party.members).toHaveLength(1);
        expect(party.members[0].userId).toBe('active');
    });

    it('should apply success rate multiplier', () => {
        const now = new Date('2023-01-01');
        // Success rate 0.8 -> multiplier = 1 + (0.8 * 0.5) = 1.4
        const successRate = { 'FRONTEND': 0.8 };

        const state: SystemState = {
            ['expert' as UserId]: createXp(100, 0, 0, { 'BUILDER': { 'FRONTEND': 1 } }, successRate, now),
        };

        const party = formParty(state, now, 'FRONTEND');
        const builder = party.members.find(m => m.role === 'BUILDER');

        // Base: 100
        // Role mult (has history): 1.5
        // Specialty mult (has history in target): 1.5
        // Success mult: 1.4
        // Total: 100 * 1.5 * 1.5 * 1.4 = 315

        expect(builder?.score).toBeCloseTo(315);
    });

    it('should handle partial party formation', () => {
        const now = new Date('2023-01-01');
        const state: SystemState = {
            ['user1' as UserId]: createXp(0, 100, 0, {}, {}, now), // Architect
        };

        const party = formParty(state, now);

        expect(party.members).toHaveLength(1);
        expect(party.members[0].role).toBe('ARCHITECT');
    });

    it('should pick best candidate for each role', () => {
        const now = new Date('2023-01-01');
        const state: SystemState = {
            ['arch_pro' as UserId]: createXp(0, 200, 0, {}, {}, now),
            ['arch_novice' as UserId]: createXp(0, 50, 0, {}, {}, now),
            ['guard_pro' as UserId]: createXp(0, 0, 200, {}, {}, now),
            ['guard_novice' as UserId]: createXp(0, 0, 50, {}, {}, now),
        };

        const party = formParty(state, now);

        expect(party.members.find(m => m.role === 'ARCHITECT')?.userId).toBe('arch_pro');
        expect(party.members.find(m => m.role === 'GUARDIAN')?.userId).toBe('guard_pro');
    });
});
