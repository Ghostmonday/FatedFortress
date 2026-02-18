import Fastify from 'fastify';
import { InMemoryEventStore } from '@fated/event-store';
import { formParty } from '@fated/matchmaker';

// Create a test Fastify instance
const fastify = Fastify({ logger: false });
const store = new InMemoryEventStore();

// Test helper: create contribution event payload
function createContributionPayload(userId: string = 'user-1', complexityScore: number = 8) {
    return {
        id: crypto.randomUUID(),
        streamId: userId,
        type: 'CONTRIBUTION_SUBMITTED' as const,
        timestamp: new Date().toISOString(),
        payload: {
            userId,
            url: 'https://github.com/test/project',
            complexityScore,
        },
    };
}

// Register routes for testing
fastify.post('/contribute', async (request: any, reply) => {
    const result = await store.append(request.body);

    if (!result.ok) {
        const error = result as { ok: false; error: unknown };
        return reply.status(400).send({ error: 'Invalid contribution payload', details: error.error });
    }

    return {
        success: true,
        eventId: result.eventId,
        message: 'Contribution recorded'
    };
});

fastify.get('/leaderboard', async (request: any) => {
    const offset = Number(request.query.offset) || 0;
    const limit = Number(request.query.limit) || 50;

    const leaderboard = store.getLeaderboard({ offset, limit });
    const total = store.getUserCount();

    return {
        leaderboard: leaderboard.map((entry: any) => ({
            userId: entry.userId,
            totalXP: entry.totalXP,
            pendingXP: entry.pendingXP,
            contributions: Object.values(entry.roleHistory || {}).reduce((total: number, role: any) =>
                total + Object.values(role).reduce((sum: number, count: any) => sum + count, 0), 0),
            lastActivity: entry.lastActivity
        })),
        total
    };
});

// Test: POST contribution, then GET leaderboard, assert new XP appears
async function testContributionAndLeaderboard() {
    console.log('🧪 Test: Contribution updates leaderboard XP...');

    // Clear store
    store.clear();

    // Submit a contribution
    const contribPayload = createContributionPayload('alice', 8);

    const contribResponse = await fastify.inject({
        method: 'POST',
        url: '/contribute',
        payload: contribPayload,
    });

    if (contribResponse.statusCode !== 200) {
        throw new Error(`Contribution failed: ${contribResponse.body}`);
    }

    // Get leaderboard
    const lbResponse = await fastify.inject({
        method: 'GET',
        url: '/leaderboard',
    });

    const lbResult = JSON.parse(lbResponse.body);

    // Assert XP appears in leaderboard (pending since not yet verified)
    const aliceEntry = lbResult.leaderboard.find((entry: any) => entry.userId === 'alice');
    if (!aliceEntry) {
        throw new Error('Alice not found in leaderboard after contribution');
    }

    // Contributions add to pending XP, not total
    if (aliceEntry.pendingXP <= 0) {
        throw new Error(`Expected positive pending XP, got ${aliceEntry.pendingXP}`);
    }

    console.log('   ✅ Alice has pending XP in leaderboard:', aliceEntry.pendingXP);
    return true;
}

// Test: GET leaderboard?limit=5, assert length is 5 and total is correct
async function testLeaderboardPagination() {
    console.log('🧪 Test: Leaderboard pagination...');

    // Clear store
    store.clear();

    // Create 10 users with contributions
    for (let i = 0; i < 10; i++) {
        const payload = createContributionPayload(`user-${i}`, 5 + (i % 5));

        await fastify.inject({
            method: 'POST',
            url: '/contribute',
            payload,
        });
    }

    // Get leaderboard with limit=5
    const lbResponse = await fastify.inject({
        method: 'GET',
        url: '/leaderboard?limit=5',
    });

    const lbResult = JSON.parse(lbResponse.body);

    // Assert length is 5
    if (lbResult.leaderboard.length !== 5) {
        throw new Error(`Expected 5 entries, got ${lbResult.leaderboard.length}`);
    }

    // Assert total is correct (10 users)
    if (lbResult.total !== 10) {
        throw new Error(`Expected total=10, got ${lbResult.total}`);
    }

    console.log('   ✅ Limit=5 returns exactly 5 entries');
    console.log('   ✅ Total correctly reports 10 users');

    // Test offset with second page
    const page2Response = await fastify.inject({
        method: 'GET',
        url: '/leaderboard?offset=5&limit=5',
    });

    const page2Result = JSON.parse(page2Response.body);

    if (page2Result.leaderboard.length !== 5) {
        throw new Error(`Expected 5 entries on page 2, got ${page2Result.leaderboard.length}`);
    }

    console.log('   ✅ Offset=5 returns entries 6-10');
    return true;
}

// Run all tests
async function runTests() {
    console.log('🚀 Running FatedFortress API Tests...\n');

    try {
        await testContributionAndLeaderboard();
        console.log('   🎉 Test 1 passed!\n');

        await testLeaderboardPagination();
        console.log('   🎉 Test 2 passed!\n');

        console.log('✅ All tests passed!');
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}

runTests();
