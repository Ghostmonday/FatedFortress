   // Test script for the API
// Run this after starting the server: pnpm --filter api dev

const API_URL = 'http://localhost:3000';

async function testApi() {
    console.log('🧪 Testing FatedFortress API...\n');

    // Generate some test IDs
    const user1Id = '550e8400-e29b-41d4-a716-446655440001';
    const user2Id = '550e8400-e29b-41d4-a716-446655440002';
    const contributionId = '550e8400-e29b-41d4-a716-446655440003';

    try {
        // 1. Submit a contribution
        console.log('1. POST /contribute');
        const contribResponse = await fetch(`${API_URL}/contribute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: contributionId,
                streamId: user1Id,
                type: 'CONTRIBUTION_SUBMITTED',
                payload: {
                    userId: user1Id,
                    url: 'https://github.com/test/project',
                    complexityScore: 8,
                },
            }),
        });
        const contribResult = await contribResponse.json();
        console.log('   Response:', JSON.stringify(contribResult, null, 2));
        console.log(`   Status: ${contribResponse.ok ? '✅' : '❌'}\n`);

        // 2. Submit a verification
        console.log('2. POST /verify');
        const verifyResponse = await fetch(`${API_URL}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: '550e8400-e29b-41d4-a716-446655440004',
                streamId: user2Id,
                type: 'VERIFICATION_SUBMITTED',
                payload: {
                    verifierId: user2Id,
                    targetContributionId: contributionId,
                    verdict: 'APPROVE',
                    qualityScore: 5,
                },
            }),
        });
        const verifyResult = await verifyResponse.json();
        console.log('   Response:', JSON.stringify(verifyResult, null, 2));
        console.log(`   Status: ${verifyResponse.ok ? '✅' : '❌'}\n`);

        // 3. Get leaderboard
        console.log('3. GET /leaderboard');
        const lbResponse = await fetch(`${API_URL}/leaderboard`);
        const lbResult = await lbResponse.json();
        console.log('   Response:', JSON.stringify(lbResult, null, 2));
        console.log(`   Status: ${lbResponse.ok ? '✅' : '❌'}\n`);

        // 4. Get team
        console.log('4. GET /team');
        const teamResponse = await fetch(`${API_URL}/team`);
        const teamResult = await teamResponse.json();
        console.log('   Response:', JSON.stringify(teamResult, null, 2));
        console.log(`   Status: ${teamResponse.ok ? '✅' : '❌'}\n`);

        console.log('🎉 All tests complete!');
    } catch (error) {
        console.error('❌ Test failed:', error);
        console.log('\n💡 Make sure the API server is running: pnpm --filter api dev');
    }
}

testApi();
