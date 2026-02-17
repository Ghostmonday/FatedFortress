import { AppEvent } from '@fated/events';
import { SystemState, XpVector } from '@fated/xp-logic';
/**
 * Result type for successful append operations.
 */
export type AppendOk = {
    ok: true;
    eventId: string;
};
/**
 * Result type for failed append operations.
 */
export type AppendError = {
    ok: false;
    error: unknown;
};
/**
 * Result type for append operations.
 */
export type AppendResult = AppendOk | AppendError;
/**
 * In-memory event store with SQLite persistence via Prisma.
 * Implements write-through caching for durability while maintaining O(1) reads.
 *
 * Features:
 * - Materialized state for O(1) reads
 * - Incremental updates on append
 * - Automatic state recalculation
 * - Zod validation on write
 * - SQLite persistence via Prisma (write-through)
 */
export declare class InMemoryEventStore {
    private events;
    private state;
    private prisma;
    private queue;
    private readonly EVENT_LIMIT;
    /**
     * Constructor - optionally hydrates state from database.
     * @param hydrate - If true, loads state from SQLite on initialization
     */
    constructor(hydrate?: boolean);
    /**
     * Hydrate in-memory state from SQLite database.
     */
    private hydrate;
    /**
     * Append an event with validation, in-memory update, and SQLite persistence.
     * Uses a Promise Queue to ensure sequential processing under concurrent requests.
     * Returns a promise that resolves to { ok: true, eventId } on success,
     * or { ok: false, error } on validation failure.
     */
    append(input: unknown): Promise<AppendResult>;
    /**
     * Internal append implementation - processes a single event.
     */
    private _append;
    /**
     * Persist event to SQLite.
     */
    private persistEvent;
    /**
     * Persist/upsert actor state to SQLite based on event.
     */
    private persistActorState;
    /**
     * Handle project-related events (PROJECT_CREATED, PROJECT_COMPLETED).
     */
    private persistProjectEvent;
    /**
     * Get all events (full replay capability if needed).
     */
    getAll(): AppEvent[];
    /**
     * Get the materialized state directly - O(1) access.
     * Returns a shallow copy for safety.
     */
    getState(): SystemState;
    /**
     * Get leaderboard entries with pagination.
     * Returns sorted entries from offset to offset + limit.
     */
    getLeaderboard(options?: {
        offset?: number;
        limit?: number;
    }): Array<{
        userId: string;
    } & XpVector>;
    /**
     * Get total user count for pagination metadata.
     */
    getUserCount(): number;
    /**
     * Clear all events and state.
     */
    clear(): void;
    /**
     * Get event count.
     */
    get count(): number;
}
export type { AppEvent, XpVector, SystemState };
//# sourceMappingURL=index.d.ts.map