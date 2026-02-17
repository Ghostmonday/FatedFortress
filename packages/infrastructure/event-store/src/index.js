/**
 * @fated/infra-event-store
 * In-Memory Event Store with Materialized State
 */
import { PrismaClient } from '@prisma/client';
import { AppEventSchema } from '@fated/core';
import { calculateXP } from '@fated/domain-xp';
const prisma = new PrismaClient();
const state = new Map();
// ============================================
// STATE OPERATIONS
// ============================================
function getOrCreateUser(userId) {
    if (!state.has(userId)) {
        state.set(userId, {
            userId,
            totalXP: 0,
            pendingXP: 0,
            contributions: 0,
            lastActivity: null,
            successRate: {},
            specialtyXP: {},
        });
    }
    return state.get(userId);
}
function applyContribution(event) {
    if (event.type !== 'CONTRIBUTION_SUBMITTED')
        return;
    const user = getOrCreateUser(event.payload.userId);
    const xp = calculateXP({
        complexityScore: event.payload.complexityScore,
        specialty: event.payload.specialty,
        verdict: 'APPROVE',
    });
    user.pendingXP += xp.xp;
    user.contributions++;
    user.lastActivity = event.timestamp;
    const specialty = event.payload.specialty ?? 'BACKEND';
    user.specialtyXP[specialty] = (user.specialtyXP[specialty] ?? 0) + xp.xp;
}
function applyVerification(event) {
    if (event.type !== 'VERIFICATION_SUBMITTED')
        return;
    const user = getOrCreateUser(event.payload.verifierId);
    const xp = calculateXP({
        specialty: event.payload.specialty,
        qualityScore: event.payload.qualityScore,
    });
    user.totalXP += xp.xp;
    user.lastActivity = event.timestamp;
    // Update success rate for specialty
    const specialty = event.payload.specialty ?? 'BACKEND';
    const current = user.successRate[specialty] ?? 0;
    const total = user.specialtyXP[specialty] ?? 0;
    if (event.payload.verdict === 'APPROVE') {
        user.successRate[specialty] = (current * total + 1) / (total + 1);
    }
    else {
        user.successRate[specialty] = (current * total) / (total + 1);
    }
}
// ============================================
// MAIN EVENT STORE
// ============================================
export class InMemoryEventStore {
    events = [];
    hydrateFromDB;
    constructor(hydrateFromDB = false) {
        this.hydrateFromDB = hydrateFromDB;
        if (hydrateFromDB) {
            this.hydrate();
        }
    }
    async hydrate() {
        try {
            const events = await prisma.event.findMany({
                orderBy: { timestamp: 'asc' },
                take: 10000,
            });
            for (const event of events) {
                const parsed = AppEventSchema.parse({
                    id: event.id,
                    streamId: event.streamId,
                    timestamp: event.timestamp,
                    type: event.type,
                    payload: JSON.parse(event.payload),
                });
                this.append(parsed);
            }
            console.log(`[EventStore] Hydrated ${events.length} events from DB`);
        }
        catch (e) {
            console.error('[EventStore] Failed to hydrate:', e);
        }
    }
    append(event) {
        try {
            const parsed = AppEventSchema.parse(event);
            this.events.push(parsed);
            // Apply to materialized state
            applyContribution(parsed);
            applyVerification(parsed);
            // Also persist to DB
            this.persistEvent(parsed).catch(console.error);
            return { ok: true, eventId: parsed.id };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
    async persistEvent(event) {
        try {
            await prisma.event.create({
                data: {
                    id: event.id,
                    actorId: event.payload.userId ?? event.payload.verifierId ?? 'unknown',
                    streamId: event.streamId,
                    timestamp: event.timestamp,
                    type: event.type,
                    payload: JSON.stringify(event.payload),
                },
            });
        }
        catch (e) {
            console.error('[EventStore] Failed to persist:', e);
        }
    }
    getEvents() {
        return [...this.events];
    }
    getState() {
        return new Map(state);
    }
    getLeaderboard({ offset = 0, limit = 50 }) {
        const users = Array.from(state.values())
            .sort((a, b) => b.totalXP - a.totalXP)
            .slice(offset, offset + limit);
        return users.map(u => ({
            userId: u.userId,
            total: u.totalXP,
            pending: u.pendingXP,
            contributions: u.contributions,
            lastActivity: u.lastActivity,
        }));
    }
    getUserCount() {
        return state.size;
    }
    getUser(userId) {
        return state.get(userId);
    }
}
export { prisma };
//# sourceMappingURL=index.js.map