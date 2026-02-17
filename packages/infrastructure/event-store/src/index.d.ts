/**
 * @fated/infra-event-store
 * In-Memory Event Store with Materialized State
 */
import { PrismaClient } from '@prisma/client';
import { type AppEvent, type Specialty } from '@fated/core';
declare const prisma: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
interface UserState {
    userId: string;
    totalXP: number;
    pendingXP: number;
    contributions: number;
    lastActivity: Date | null;
    successRate: Record<Specialty, number>;
    specialtyXP: Record<Specialty, number>;
}
export declare class InMemoryEventStore {
    private events;
    private hydrateFromDB;
    constructor(hydrateFromDB?: boolean);
    private hydrate;
    append(event: AppEvent): {
        ok: true;
        eventId: string;
    } | {
        ok: false;
        error: unknown;
    };
    private persistEvent;
    getEvents(): AppEvent[];
    getState(): Map<string, UserState>;
    getLeaderboard({ offset, limit }: {
        offset?: number;
        limit?: number;
    }): {
        userId: string;
        total: number;
        pending: number;
        contributions: number;
        lastActivity: Date | null;
    }[];
    getUserCount(): number;
    getUser(userId: string): UserState | undefined;
}
export { prisma };
//# sourceMappingURL=index.d.ts.map