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
import { prisma } from '@fated/db';
import { InMemoryEventStore } from '../src/index';
function getActorId(event) {
    switch (event.type) {
        case 'CONTRIBUTION_SUBMITTED':
            return event.payload.userId;
        case 'VERIFICATION_SUBMITTED':
            return event.payload.verifierId;
        case 'PROJECT_CREATED':
        case 'SQUAD_ASSIGNED':
        case 'PROJECT_COMPLETED':
            return 'SYSTEM';
        default:
            return 'UNKNOWN';
    }
}
async function main() {
    console.log('Starting hydration from memory to SQLite...');
    // Create a fresh in-memory store (this will be empty if running after server restart)
    // In practice, you'd export/import the memory state or connect to running instance
    const store = new InMemoryEventStore(false);
    console.log('Current in-memory event count:', store.count);
    console.log('Current in-memory user count:', store.getUserCount());
    // If store has data, hydrate it
    if (store.count > 0) {
        const events = store.getAll();
        const state = store.getState();
        console.log(`Hydrating ${events.length} events and ${Object.keys(state).length} actors...`);
        // Bulk insert events
        if (events.length > 0) {
            await prisma.event.createMany({
                data: events.map(event => ({
                    id: event.id,
                    actorId: getActorId(event), // Fix: actorId is required by schema
                    streamId: event.streamId,
                    timestamp: new Date(event.timestamp),
                    type: event.type,
                    payload: JSON.stringify(event),
                    metadata: event.metadata ? JSON.stringify(event.metadata) : null,
                    createdAt: new Date()
                }))
            });
            console.log(`Inserted ${events.length} events`);
        }
        // Upsert actor states
        const actorEntries = Object.entries(state);
        const BATCH_SIZE = 50; // Batch size to optimize DB throughput while respecting connection limits
        for (let i = 0; i < actorEntries.length; i += BATCH_SIZE) {
            const batch = actorEntries.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(([actorId, xpVector]) => prisma.actorState.upsert({
                where: { actorId },
                update: {
                    currentXp: xpVector.totalXP, // Fix: correct property name
                    pendingXp: xpVector.pendingXP, // Fix: correct property name
                    contributions: 0, // Fix: contributions property deprecated/removed from XpVector
                    lastActivity: xpVector.lastActivity,
                    lastUpdated: new Date(),
                    roleHistory: JSON.stringify(xpVector.roleHistory),
                    successRate: JSON.stringify(xpVector.successRate)
                },
                create: {
                    actorId,
                    currentXp: xpVector.totalXP, // Fix: correct property name
                    pendingXp: xpVector.pendingXP, // Fix: correct property name
                    contributions: 0, // Fix: contributions property deprecated/removed from XpVector
                    lastActivity: xpVector.lastActivity,
                    lastUpdated: new Date(),
                    decayRate: 0.0,
                    roleHistory: JSON.stringify(xpVector.roleHistory),
                    successRate: JSON.stringify(xpVector.successRate)
                }
            })));
        }
        console.log(`Upserted ${actorEntries.length} actors`);
        console.log('Hydration complete!');
    }
    else {
        console.log('No in-memory data to hydrate. SQLite will serve as the source of truth.');
        console.log('Use the API to add events - they will be persisted to SQLite automatically.');
    }
    await prisma.$disconnect();
}
main().catch(async (error) => {
    console.error('Hydration failed:', error);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=hydrate-from-memory.js.map