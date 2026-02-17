import { Agent } from './agent';
import { calculateState } from '@fated/xp-logic';
import { formParty } from '@fated/matchmaker';
const DOMAINS = ['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH'];
async function runProjectLifecycleSimulation() {
    console.log('🚀 FatedFortress Project Lifecycle Simulation v0.1');
    console.log('='.repeat(60));
    // Create 20 agents with varying specialty distributions
    console.log('\n📋 Creating 20 agents with varied specializations...');
    const agents = Array.from({ length: 20 }, () => {
        const bias = Math.random();
        const specialty = bias < 0.3 ? 'BACKEND' :
            bias < 0.5 ? 'FRONTEND' :
                bias < 0.7 ? 'DEVOPS' :
                    bias < 0.85 ? 'SECURITY' : 'RESEARCH';
        return new Agent(specialty);
    });
    const history = [];
    const START_DATE = new Date('2026-01-01');
    let currentDate = new Date(START_DATE);
    // Track project assignments for evaluations (use array instead of Map)
    const projectAssignments = [];
    let projectIdCounter = 0;
    // Simulate 30 days of projects (~10 projects total, ~3 per day)
    const TOTAL_DAYS = 30;
    const TOTAL_PROJECTS = 10;
    console.log(`⚡ Simulating ${TOTAL_DAYS} days with ${TOTAL_PROJECTS} projects...`);
    // First, build up some XP for agents through regular contributions
    for (let day = 0; day < TOTAL_DAYS; day++) {
        currentDate.setDate(currentDate.getDate() + 1);
        // Each day: some contributions and verifications
        for (const agent of agents) {
            if (Math.random() < 0.7) {
                const contribution = agent.act(currentDate);
                if (contribution) {
                    history.push(contribution);
                }
            }
        }
        // Random verifications
        for (const agent of agents.slice(0, 10)) {
            if (Math.random() < 0.5) {
                const verification = agent.verify('test-contribution-id', currentDate);
                if (verification) {
                    history.push(verification);
                }
            }
        }
        // Create 1 project every ~3 days
        if (day % 3 === 0 && projectIdCounter < TOTAL_PROJECTS) {
            const projectId = `proj-${projectIdCounter++}`;
            const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
            // Calculate state to get party for squad assignment
            const state = calculateState(history, currentDate);
            const party = formParty(state, currentDate, domain);
            // Get squad members
            const squadIds = party.members.length > 0
                ? party.members.map(m => m.userId)
                : agents.slice(0, 3).map(a => a.id);
            // Create PROJECT_CREATED event
            const projectCreated = {
                id: `evt-project-created-${projectId}`,
                streamId: projectId,
                timestamp: new Date(currentDate),
                type: 'PROJECT_CREATED',
                payload: {
                    projectId,
                    name: `${domain} Project ${projectIdCounter}`,
                    domain: domain
                }
            };
            history.push(projectCreated);
            // Create SQUAD_ASSIGNED event
            const squadAssigned = {
                id: `evt-squad-assigned-${projectId}`,
                streamId: projectId,
                timestamp: new Date(currentDate),
                type: 'SQUAD_ASSIGNED',
                payload: {
                    projectId,
                    squadIds
                }
            };
            history.push(squadAssigned);
            projectAssignments.push({ projectId, domain, members: squadIds });
            console.log(`   📦 Day ${day + 1}: Created ${domain} project with squad [${squadIds.slice(0, 3).join(', ')}]`);
        }
    }
    // Complete all projects with random success (0.5-1.0)
    console.log('\n🏁 Completing projects with evaluations...');
    let completedProjects = 0;
    for (const assignment of projectAssignments) {
        const { projectId, domain, members } = assignment;
        const evaluations = [];
        for (const memberId of members) {
            const agent = agents.find(a => a.id === memberId);
            const baseSuccess = 0.5 + Math.random() * 0.5;
            const specialtyBonus = agent && agent.specialty === domain ? 0.1 : 0;
            const score = Math.min(1.0, baseSuccess + specialtyBonus);
            evaluations.push({
                userId: memberId,
                score,
                feedback: score > 0.8 ? 'Excellent work!' : score > 0.6 ? 'Good job.' : 'Needs improvement.'
            });
        }
        // Create PROJECT_COMPLETED event
        const projectCompleted = {
            id: `evt-project-completed-${projectId}`,
            streamId: projectId,
            timestamp: new Date(currentDate),
            type: 'PROJECT_COMPLETED',
            payload: {
                projectId,
                evaluations
            }
        };
        history.push(projectCompleted);
        completedProjects++;
        console.log(`   ✅ Completed ${projectId}: ${evaluations.map(e => `${e.userId.slice(0, 4)}:${e.score.toFixed(2)}`).join(', ')}`);
    }
    // Final state calculation
    console.log('\n📊 Calculating final state with success rates...');
    const finalState = calculateState(history, currentDate);
    // Collect agent stats
    const agentStats = Object.entries(finalState).map(([userId, xp]) => {
        const agent = agents.find(a => a.id === userId);
        return {
            agent: agent,
            totalXP: xp.totalXP,
            successRates: xp.successRate || {},
            projectCount: 0
        };
    }).filter(s => s.agent);
    // Count project participation
    for (const assignment of projectAssignments) {
        for (const memberId of assignment.members) {
            const stat = agentStats.find(s => s.agent.id === memberId);
            if (stat) {
                stat.projectCount++;
            }
        }
    }
    // Calculate who became "Elite"
    console.log('\n' + '='.repeat(60));
    console.log('🏆 ELITE PERFORMERS REPORT');
    console.log('='.repeat(60));
    // Sort by raw XP
    const byXP = [...agentStats].sort((a, b) => b.totalXP - a.totalXP);
    // Sort by success-adjusted score
    const bySuccessAdjusted = [...agentStats].map(stat => {
        const domains = Object.keys(stat.successRates);
        const avgSuccessRate = domains.length > 0
            ? domains.reduce((sum, d) => sum + stat.successRates[d], 0) / domains.length
            : 0;
        const adjustedScore = stat.totalXP * (1 + avgSuccessRate * 0.5);
        return { ...stat, adjustedScore, avgSuccessRate };
    }).sort((a, b) => b.adjustedScore - a.adjustedScore);
    console.log('\n📈 Top 5 by Raw XP:');
    console.log('-'.repeat(50));
    for (let i = 0; i < Math.min(5, byXP.length); i++) {
        const stat = byXP[i];
        const successRates = Object.entries(stat.successRates)
            .map(([d, r]) => `${d}:${(r * 100).toFixed(0)}%`)
            .join(', ') || 'None';
        console.log(`   ${i + 1}. ${stat.agent.name.slice(0, 8)} | XP: ${stat.totalXP} | Projects: ${stat.projectCount} | Success: [${successRates}]`);
    }
    console.log('\n⭐ Top 5 by Success-Adjusted Score:');
    console.log('-'.repeat(50));
    for (let i = 0; i < Math.min(5, bySuccessAdjusted.length); i++) {
        const stat = bySuccessAdjusted[i];
        const successRates = Object.entries(stat.successRates)
            .map(([d, r]) => `${d}:${(r * 100).toFixed(0)}%`)
            .join(', ') || 'None';
        console.log(`   ${i + 1}. ${stat.agent.name.slice(0, 8)} | Score: ${stat.adjustedScore.toFixed(0)} | Success: [${successRates}]`);
    }
    // Identify ranking changes
    console.log('\n🔄 Ranking Changes (XP → Success-Adjusted):');
    console.log('-'.repeat(50));
    const xpTop10 = byXP.slice(0, 10).map(s => s.agent.id);
    const successTop10 = bySuccessAdjusted.slice(0, 10).map(s => s.agent.id);
    for (const userId of xpTop10) {
        const xpRank = xpTop10.indexOf(userId) + 1;
        const successRank = successTop10.indexOf(userId) + 1;
        const change = xpRank - successRank;
        const stat = agentStats.find(s => s.agent.id === userId);
        const name = stat?.agent.name.slice(0, 8) || userId.slice(0, 8);
        if (change > 0) {
            console.log(`   ⬆️ ${name}: XP Rank #${xpRank} → Success-Adjusted #${successRank} (+${change})`);
        }
        else if (change < 0) {
            console.log(`   ⬇️ ${name}: XP Rank #${xpRank} → Success-Adjusted #${successRank} (${change})`);
        }
        else {
            console.log(`   ➡️ ${name}: XP Rank #${xpRank} → Success-Adjusted #${successRank} (no change)`);
        }
    }
    console.log('\n' + '='.repeat(60));
    console.log('📋 Summary:');
    console.log(`   - Total Agents: ${agents.length}`);
    console.log(`   - Total Projects: ${completedProjects}`);
    console.log(`   - Total Events: ${history.length}`);
    console.log(`   - Domains: ${DOMAINS.join(', ')}`);
    console.log('='.repeat(60));
}
// Run the simulation
runProjectLifecycleSimulation().catch(console.error);
//# sourceMappingURL=project-lifecycle-sim.js.map