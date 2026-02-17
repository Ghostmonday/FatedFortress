import { describe, it, expect } from 'vitest';
import { formParty } from './index';
describe('formParty', () => {
    it('should form a party correctly', () => {
        const now = new Date();
        const state = {
            'user1': {
                totalXP: 100,
                pendingXP: 0,
                execution: 100,
                collaboration: 0,
                judgment: 0,
                roleHistory: { 'BUILDER': { 'BACKEND': 10 } },
                successRate: {},
                lastActivity: now
            },
            'user2': {
                totalXP: 100,
                pendingXP: 0,
                execution: 0,
                collaboration: 100,
                judgment: 0,
                roleHistory: { 'ARCHITECT': { 'BACKEND': 10 } },
                successRate: {},
                lastActivity: now
            },
            'user3': {
                totalXP: 100,
                pendingXP: 0,
                execution: 0,
                collaboration: 0,
                judgment: 100,
                roleHistory: { 'GUARDIAN': { 'BACKEND': 10 } },
                successRate: {},
                lastActivity: now
            }
        };
        const party = formParty(state, now, 'BACKEND');
        expect(party.members).toHaveLength(3);
        const builder = party.members.find(m => m.role === 'BUILDER');
        expect(builder).toBeDefined();
        expect(builder?.userId).toBe('user1');
        const architect = party.members.find(m => m.role === 'ARCHITECT');
        expect(architect).toBeDefined();
        expect(architect?.userId).toBe('user2');
        const guardian = party.members.find(m => m.role === 'GUARDIAN');
        expect(guardian).toBeDefined();
        expect(guardian?.userId).toBe('user3');
    });
});
//# sourceMappingURL=index.test.js.map