import { Agent } from './agent';
import { calculateState } from '@fated/xp-logic';
import { formParty } from '@fated/matchmaker';
import { AppEvent } from '@fated/events';

async function runSimulation() {
    console.log('🚀 FatedFortress Swarm v0.4: The Matching Engine');

    const agents: Agent[] = Array.from({ length: 50 }, () => new Agent());
    const history: AppEvent[] = [];
    let pendingWorkIds: string[] = [];

    const START_DATE = new Date('2026-01-01');
    let currentDate = new Date(START_DATE);

    const victim = agents[0];
    console.log(`🧪 Subject for Sabbatical Test: ${victim.name} (${victim.role})`);

    const TOTAL_DAYS = 120;

    console.log(`⚡ Simulating ${TOTAL_DAYS} days of history...`);

    for (let day = 0; day < TOTAL_DAYS; day++) {
        currentDate.setDate(currentDate.getDate() + 1);

        const isVictimOnVacation = day > 40 && day < 100;

        for (const agent of agents) {
            if (agent.id === victim.id && isVictimOnVacation) continue;

            const contribution = agent.act(currentDate);
            if (contribution) {
                history.push(contribution);
                pendingWorkIds.push(contribution.id);
            }

            if (pendingWorkIds.length > 0) {
                const targetId = pendingWorkIds[Math.floor(Math.random() * pendingWorkIds.length)];
                const verification = agent.verify(targetId, currentDate);
                if (verification) {
                    history.push(verification);
                    pendingWorkIds = pendingWorkIds.filter(id => id !== targetId);
                }
            }
        }
    }

    const state = calculateState(history, currentDate);

    const leaderboard = Object.entries(state)
        .map(([userId, xp]) => {
            const lastActive = xp.lastActivity ? xp.lastActivity.getTime() : 0;
            const daysSilent = Math.floor((currentDate.getTime() - lastActive) / (1000 * 60 * 60 * 24));

            return {
                name: agents.find(a => a.id === userId)?.name,
                totalXP: xp.total,
                daysSilent: daysSilent,
                status: daysSilent > 30 ? '⚠️ DECAYING' : '✅ ACTIVE'
            };
        })
        .sort((a, b) => b.totalXP - a.totalXP)
        .slice(0, 10);

    console.log(`\n📅 Simulation End Date: ${currentDate.toISOString().split('T')[0]}`);
    console.table(leaderboard);

    const victimState = leaderboard.find(u => u.name === victim.name);
    if (victimState) {
        console.log(`\n📉 VICTIM REPORT: ${victim.name}`);
        console.log(`   Days Silent: ${victimState.daysSilent}`);
        console.log(`   Status: ${victimState.status}`);
    } else {
        console.log(`\n📉 VICTIM REPORT: ${victim.name} fell off the leaderboard entirely.`);
    }

    console.log('\n⚔️ --- TEAM FORMATION PROTOCOL --- ⚔️');
    console.log('Analyzing survivors for optimal party composition...');

    const party = formParty(state);

    party.members.forEach(member => {
        const agentName = agents.find(a => a.id === member.userId)?.name;
        console.log(`Role: [${member.role.padEnd(9)}] | Score: ${member.score.toFixed(0).padEnd(4)} | Agent: ${agentName}`);
    });

    console.log('-------------------------------------------');
    console.log(`Party Power Rating: ${party.totalPower.toFixed(0)}`);
}

runSimulation();
