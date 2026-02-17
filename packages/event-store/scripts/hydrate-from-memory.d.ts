/**
 * Hydration Script: Migrate in-memory event store state to SQLite
 *
 * Usage: pnpm --filter @fated/event-store hydrate
 *
 * This script:
 * 1. Reads current in-memory events and state from the InMemoryEventStore
 * 2. Bulk inserts all events into the SQLite Event table
 * 3. Upserts all actor states into the SQLite ActorState table
 */
export {};
//# sourceMappingURL=hydrate-from-memory.d.ts.map