import { AppEvent, AppEventSchema } from '@fated/events';
import { calculateState, SystemState, XpVector } from '@fated/xp-logic';
import { prisma } from '@fated/db';

/**
 * Result type for successful append operations.
 */
export type AppendOk = { ok: true; eventId: string };

/**
 * Result type for failed append operations.
 */
export type AppendError = { ok: false; error: unknown };

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
export class InMemoryEventStore {
    private events: AppEvent[] = [];
    private state: SystemState = {};
    private prisma = prisma;
    private queue: Promise<AppendResult> = Promise.resolve({ ok: false, error: 'not started' });
    private readonly EVENT_LIMIT = 1000;

    /**
     * Constructor - optionally hydrates state from database.
     * @param hydrate - If true, loads state from SQLite on initialization
     */
    constructor(hydrate: boolean = false) {
        if (hydrate) {
            this.hydrate();
        }
    }

    /**
     * Hydrate in-memory state from SQLite database.
     */
    private async hydrate(): Promise<void> {
        // Hydrate actor states from database
        const actorStates = await this.prisma.actorState.findMany();
        for (const actor of actorStates) {
            this.state[actor.actorId as any] = {
                totalXP: actor.currentXp,
                pendingXP: actor.pendingXp,
                execution: 0,
                collaboration: 0,
                judgment: 0,
                roleHistory: actor.roleHistory ? JSON.parse(actor.roleHistory) : {},
                successRate: actor.successRate ? JSON.parse(actor.successRate) : {},
                lastActivity: actor.lastActivity
            };
        }

        // Hydrate events from database
        const dbEvents = await this.prisma.event.findMany({
            orderBy: { timestamp: 'asc' }
        });
        for (const event of dbEvents) {
            const raw = JSON.parse(event.payload);
            const parsed = AppEventSchema.parse(raw);
            this.events.push(parsed);
        }
    }

    /**
     * Append an event with validation, in-memory update, and SQLite persistence.
     * Uses a Promise Queue to ensure sequential processing under concurrent requests.
     * Returns a promise that resolves to { ok: true, eventId } on success,
     * or { ok: false, error } on validation failure.
     */
    append(input: unknown): Promise<AppendResult> {
        // Queue ensures sequential processing even under concurrent requests
        this.queue = this.queue.then(async () => {
            return await this._append(input);
        });
        return this.queue;
    }

    /**
     * Internal append implementation - processes a single event.
     */
    private async _append(input: unknown): Promise<AppendResult> {
        // 1. Validate input with Zod schema
        const result = AppEventSchema.safeParse(input);

        if (!result.success) {
            return { ok: false, error: result.error };
        }

        // 2. Construct cleanEvent with only allowed fields
        const cleanEvent = result.data as AppEvent;

        // 3. Push clean event to events array (in-memory)
        this.events.push(cleanEvent);

        // 4. Event compaction: keep only the last EVENT_LIMIT events in memory
        // SystemState is preserved separately and stays fully intact
        if (this.events.length > this.EVENT_LIMIT) {
            this.events = this.events.slice(-this.EVENT_LIMIT);
        }

        // 5. Replay-on-write: recalculate state with all events
        this.state = calculateState(this.events, new Date());

        // 6. Persist to SQLite (write-through) using atomic transaction
        await this.persistEvent(cleanEvent);
        await this.persistActorState(cleanEvent);
        await this.persistProjectEvent(cleanEvent);

        // 7. Return success with eventId
        return { ok: true, eventId: cleanEvent.id };
    }

    /**
     * Persist event to SQLite.
     */
    private async persistEvent(event: AppEvent): Promise<void> {
        try {
            // Determine actorId from event payload
            let actorId: string;
            switch (event.type) {
                case 'CONTRIBUTION_SUBMITTED':
                    actorId = event.payload.userId;
                    break;
                case 'VERIFICATION_SUBMITTED':
                    actorId = event.payload.verifierId;
                    break;
                case 'PROJECT_CREATED':
                    actorId = 'SYSTEM';
                    break;
                case 'SQUAD_ASSIGNED':
                    actorId = 'SYSTEM';
                    break;
                case 'PROJECT_COMPLETED':
                    actorId = 'SYSTEM';
                    break;
                default:
                    actorId = 'UNKNOWN';
            }

            await this.prisma.event.create({
                data: {
                    id: event.id,
                    actorId,
                    streamId: event.streamId,
                    timestamp: new Date(event.timestamp),
                    type: event.type,
                    payload: JSON.stringify(event),
                    metadata: event.metadata ? JSON.stringify(event.metadata) : null,
                    createdAt: new Date()
                }
            });
        } catch (error) {
            console.error('Failed to persist event:', error);
            // Don't fail the operation - data is already in memory
        }
    }

    /**
     * Persist/upsert actor state to SQLite based on event.
     */
    private async persistActorState(event: AppEvent): Promise<void> {
        try {
            // Determine actorId from event payload
            let actorId: string;
            let specialty: string | undefined;
            let role: string;

            switch (event.type) {
                case 'CONTRIBUTION_SUBMITTED':
                    actorId = event.payload.userId;
                    specialty = (event.payload as { specialty?: string }).specialty;
                    role = 'BUILDER';
                    break;
                case 'VERIFICATION_SUBMITTED':
                    actorId = event.payload.verifierId;
                    specialty = (event.payload as { specialty?: string }).specialty;
                    role = 'GUARDIAN';
                    break;
                default:
                    // Project events don't affect actor state directly
                    return;
            }

            const currentState = this.state[actorId as any];
            if (!currentState) return;

            // Update roleHistory with specialty from event
            if (!currentState.roleHistory[role]) {
                currentState.roleHistory[role] = {};
            }
            if (specialty && !currentState.roleHistory[role][specialty]) {
                currentState.roleHistory[role][specialty] = 0;
            }
            if (specialty) {
                currentState.roleHistory[role][specialty] += 1;
            }

            await this.prisma.actorState.upsert({
                where: { actorId },
                update: {
                    currentXp: currentState.totalXP,
                    pendingXp: currentState.pendingXP,
                    contributions: 0, // Deprecated field
                    lastActivity: currentState.lastActivity,
                    lastUpdated: new Date(),
                    roleHistory: JSON.stringify(currentState.roleHistory),
                    successRate: JSON.stringify(currentState.successRate)
                },
                create: {
                    actorId,
                    currentXp: currentState.totalXP,
                    pendingXp: currentState.pendingXP,
                    contributions: 0,
                    lastActivity: currentState.lastActivity,
                    lastUpdated: new Date(),
                    decayRate: 0.0,
                    roleHistory: JSON.stringify(currentState.roleHistory),
                    successRate: JSON.stringify(currentState.successRate)
                }
            });
        } catch (error) {
            console.error('Failed to persist actor state:', error);
            // Don't fail the operation - data is already in memory
        }
    }

    /**
     * Handle project-related events (PROJECT_CREATED, PROJECT_COMPLETED).
     */
    private async persistProjectEvent(event: AppEvent): Promise<void> {
        try {
            switch (event.type) {
                case 'PROJECT_CREATED': {
                    const payload = event.payload as { projectId: string; name: string; domain: string };
                    await this.prisma.project.create({
                        data: {
                            id: payload.projectId,
                            name: payload.name,
                            domain: payload.domain,
                            status: 'OPEN',
                            squadIds: JSON.stringify([]),
                            createdAt: new Date(event.timestamp),
                            completedAt: null
                        }
                    });
                    break;
                }

                case 'SQUAD_ASSIGNED': {
                    const payload = event.payload as { projectId: string; squadIds: string[] };
                    await this.prisma.project.update({
                        where: { id: payload.projectId },
                        data: {
                            squadIds: JSON.stringify(payload.squadIds),
                            status: 'ACTIVE'
                        }
                    });
                    break;
                }

                case 'PROJECT_COMPLETED': {
                    const payload = event.payload as {
                        projectId: string;
                        evaluations: Array<{ userId: string; score: number; feedback?: string }>
                    };

                    // Update project status
                    await this.prisma.project.update({
                        where: { id: payload.projectId },
                        data: {
                            status: 'COMPLETED',
                            completedAt: new Date(event.timestamp)
                        }
                    });

                    // Create evaluation records
                    for (const evaluation of payload.evaluations) {
                        await this.prisma.evaluation.create({
                            data: {
                                id: `${payload.projectId}-${evaluation.userId}`,
                                projectId: payload.projectId,
                                userId: evaluation.userId,
                                score: evaluation.score,
                                feedback: evaluation.feedback || null,
                                createdAt: new Date(event.timestamp)
                            }
                        });
                    }
                    break;
                }
            }
        } catch (error) {
            console.error('Failed to persist project event:', error);
            // Don't fail the operation - data is already in memory
        }
    }

    /**
     * Get all events (full replay capability if needed).
     */
    getAll(): AppEvent[] {
        return [...this.events];
    }

    /**
     * Get the materialized state directly - O(1) access.
     * Returns a shallow copy for safety.
     */
    getState(): SystemState {
        return { ...this.state };
    }

    /**
     * Get leaderboard entries with pagination.
     * Returns sorted entries from offset to offset + limit.
     */
    getLeaderboard(options: { offset?: number; limit?: number } = {}): Array<{ userId: string } & XpVector> {
        const { offset = 0, limit = 10 } = options;

        const leaderboard = Object.entries(this.state)
            .map(([userId, xp]: [string, XpVector]) => ({
                userId,
                totalXP: xp.totalXP,
                pendingXP: xp.pendingXP,
                execution: xp.execution,
                collaboration: xp.collaboration,
                judgment: xp.judgment,
                roleHistory: xp.roleHistory,
                successRate: xp.successRate,
                lastActivity: xp.lastActivity
            }))
            .sort((a, b) => (b.totalXP || 0) - (a.totalXP || 0))
            .slice(offset, offset + limit);

        return leaderboard;
    }

    /**
     * Get total user count for pagination metadata.
     */
    getUserCount(): number {
        return Object.keys(this.state).length;
    }

    /**
     * Clear all events and state.
     */
    clear(): void {
        this.events = [];
        this.state = {};
    }

    /**
     * Get event count.
     */
    get count(): number {
        return this.events.length;
    }
}

export type { AppEvent, XpVector, SystemState };
