# FatedFortress - Complete Source Code

> Generated on 2026-02-14
> This file contains all source code from the FatedFortress repository.

---

## Table of Contents

1. [Apps - Server](#apps---server)
2. [Apps - Swarm](#apps---swarm)
3. [Apps - Web](#apps---web)
4. [Packages - API](#packages---api)
5. [Packages - Bonding](#packages---bonding)
6. [Packages - Core](#packages---core)
7. [Packages - DB](#packages---db)
8. [Packages - Events](#packages---events)
9. [Packages - Event Store](#packages---event-store)
10. [Packages - Infrastructure Event Store](#packages---infrastructure-event-store)
11. [Packages - Infrastructure Webhooks](#packages---infrastructure-webhooks)
12. [Packages - Matchmaker](#packages---matchmaker)
13. [Packages - Types](#packages---types)
14. [Packages - Domain Bonding](#packages---domain-bonding)
15. [Packages - Domain Matching](#packages---domain-matching)
16. [Packages - Domain XP](#packages---domain-xp)
17. [Packages - @fated/bonds](#packages---fatedbonds)
18. [Packages - @fated/contributions](#packages---fatedcontributions)
19. [Packages - @fated/db](#packages---fateddb)
20. [Packages - @fated/event-store](#packages---fatedevent-store)
21. [Packages - @](#packages---fatedmatchmaker)
fated/matchmaker22. [Packages - @fated/types](#packages---fatedtypes)
23. [Packages - @fated/verifier](#packages---fatedverifier)
24. [Packages - @fated/xp-logic](#packages---fatedxp-logic)
25. [CLI - Python](#cli---python)
26. [Database Schema (Prisma)](#database-schema-prisma)
27. [Legacy - XP Logic Backup](#legacy---xp-logic-backup)

---

## Apps - Server

```typescript:apps/server/src/index.ts
/**
 * @fated/server
 * Server entry point - re-export the API
 */

// Re-export everything from @fated/api
// This allows running via: pnpm --filter @fated/server dev

import '@fated/api';
```

---

## Apps - Swarm

```typescript:apps/swarm/src/agent.ts
import { faker } from '@faker-js/faker';
import { ContributionSubmitted, VerificationSubmitted } from '@fated/events';
import { UserId, toUserId, Specialty } from '@fated/types';

export class Agent {
    public readonly id: UserId;
    public readonly name: string;
    public readonly role: 'BUILDER' | 'REVIEWER';
    public readonly specialty: Specialty;

    constructor(specialty?: Specialty) {
        this.id = toUserId(faker.string.uuid());
        this.name = faker.internet.userName();
        this.role = Math.random() > 0.5 ? 'BUILDER' : 'REVIEWER';
        this.specialty = specialty || (['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH'][Math.floor(Math.random() * 5)] as Specialty);
    }

    public act(now: Date): ContributionSubmitted | null {
        if (this.role !== 'BUILDER') return null;
        if (Math.random() > 0.3) return null;

        return {
            id: faker.string.uuid(),
            streamId: this.id,
            timestamp: now,
            type: 'CONTRIBUTION_SUBMITTED',
            payload: {
                userId: this.id,
                url: `https://github.com/expnet/${faker.hacker.noun()}`,
                complexityScore: Math.floor(Math.random() * 10) + 1,
                specialty: this.specialty,
            },
        };
    }

    public verify(targetId: string, now: Date): VerificationSubmitted | null {
        const chance = this.role === 'REVIEWER' ? 0.8 : 0.1;
        if (Math.random() > chance) return null;

        return {
            id: faker.string.uuid(),
            streamId: this.id,
            timestamp: now,
            type: 'VERIFICATION_SUBMITTED',
            payload: {
                verifierId: this.id,
                targetContributionId: targetId,
                verdict: 'APPROVE',
                qualityScore: 5,
                specialty: this.specialty,
            },
        };
    }
}
```

```typescript:apps/swarm/src/benchmark.ts
import { randomUUID } from 'crypto';

const API_URL = process.env.API_URL || 'http://localhost:3000';
const API_KEY = process.env.API_SECRET || 'dev-api-secret';

/**
 * Generate a contribution event for benchmarking.
 */
function generateContributionEvent(index: number): object {
    return {
        id: randomUUID(),
        streamId: `project-${index % 10}`,
        timestamp: new Date().toISOString(),
        type: 'CONTRIBUTION_SUBMITTED',
        metadata: { source: 'benchmark', iteration: index },
        payload: {
            userId: `user-${index % 100}`,
            projectId: `project-${index % 10}`,
            specialty: ['BACKEND', 'FRONTEND', 'DEVOPS'][index % 3],
            contribution: {
                linesOfCode: Math.floor(Math.random() * 500) + 50,
                quality: 0.7 + Math.random() * 0.3,
                timestamp: new Date().toISOString()
            }
        }
    };
}

/**
 * Generate a verification event for benchmarking.
 */
function generateVerificationEvent(index: number): object {
    return {
        id: randomUUID(),
        streamId: `project-${index % 10}`,
        timestamp: new Date().toISOString(),
        type: 'VERIFICATION_SUBMITTED',
        metadata: { source: 'benchmark', iteration: index },
        payload: {
            verifierId: `user-${index % 100}`,
            projectId: `project-${index % 10}`,
            approval: Math.random() > 0.2,
            quality: 0.7 + Math.random() * 0.3,
            timestamp: new Date().toISOString()
        }
    };
}

/**
 * Create HTTP client helper.
 */
async function post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(body)
    });
    return response.json() as Promise<T>;
}

/**
 * Create HTTP client helper.
 */
async function get<T>(path: string): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        }
    });
    return response.json() as Promise<T>;
}

/**
 * Benchmark throughput: fires 1000 events/sec with batching.
 */
async function benchmarkThroughput(): Promise<void> {
    console.log('Starting throughput benchmark (1000 events)...');
    const start = Date.now();

    const totalEvents = 1000;
    const batchSize = 50;
    let completed = 0;

    for (let i = 0; i < totalEvents; i += batchSize) {
        const batch = Array(batchSize).fill(0).map((_, j) => {
            const index = i + j;
            return index % 2 === 0
                ? generateContributionEvent(index)
                : generateVerificationEvent(index);
        });

        const results = await Promise.all(
            batch.map(event => post<{ success: boolean }>('/contribute', event))
        );

        completed += batchSize;
        const successCount = results.filter(r => (r as any).success).length;
        console.log(`Progress: ${completed}/${totalEvents} (${successCount} successful)`);
    }

    const duration = Date.now() - start;
    const eventsPerSec = (totalEvents / duration) * 1000;
    console.log(`\nThroughput: ${eventsPerSec.toFixed(2)} events/sec (${duration}ms total)`);
}

/**
 * Benchmark P99 latency for leaderboard endpoint.
 */
async function benchmarkLatency(): Promise<void> {
    console.log('\nStarting latency benchmark (P99 for leaderboard)...');

    // Warm up
    for (let i = 0; i < 10; i++) {
        await get<any>('/leaderboard');
    }

    const latencies: number[] = [];
    const samples = 100;

    for (let i = 0; i < samples; i++) {
        const t0 = Date.now();
        await get<any>('/leaderboard');
        const latency = Date.now() - t0;
        latencies.push(latency);
    }

    latencies.sort((a, b) => a - b);
    const p99Index = Math.floor(latencies.length * 0.99);
    const p50Index = Math.floor(latencies.length * 0.50);
    const p95Index = Math.floor(latencies.length * 0.95);

    console.log(`Latency Percentiles (${samples} samples):`);
    console.log(`  P50: ${latencies[p50Index]}ms`);
    console.log(`  P95: ${latencies[p95Index]}ms`);
    console.log(`  P99: ${latencies[p99Index]}ms`);
    console.log(`  Max: ${latencies[latencies.length - 1]}ms`);
}

/**
 * Run full benchmark suite.
 */
async function benchmark(): Promise<void> {
    console.log('='.repeat(60));
    console.log('FATED FORTRESS BENCHMARK SUITE');
    console.log('='.repeat(60));
    console.log(`API URL: ${API_URL}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('='.repeat(60));

    try {
        // Test connectivity first
        await get<any>('/leaderboard');
        console.log('✓ API is reachable\n');

        await benchmarkThroughput();
        await benchmarkLatency();

        console.log('\n' + '='.repeat(60));
        console.log('BENCHMARK COMPLETE');
        console.log('='.repeat(60));
    } catch (error) {
        console.error('Benchmark failed:', error);
        process.exit(1);
    }
}

// Run if executed directly
benchmark().catch(console.error);
```

```typescript:apps/swarm/src/index.ts
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
```

```typescript:apps/swarm/src/project-lifecycle-sim.ts
import { Agent } from './agent';
import { calculateState } from '@fated/xp-logic';
import { formParty } from '@fated/matchmaker';
import { AppEvent } from '@fated/events';
import { Specialty } from '@fated/types';

const DOMAINS = ['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH'] as const;

interface AgentStats {
    agent: Agent;
    totalXP: number;
    successRates: Record<string, number>;
    projectCount: number;
}

interface ProjectAssignment {
    projectId: string;
    domain: string;
    members: string[];
}

async function runProjectLifecycleSimulation() {
    console.log('🚀 FatedFortress Project Lifecycle Simulation v0.1');
    console.log('='.repeat(60));

    // Create 20 agents with varying specialty distributions
    console.log('\n📋 Creating 20 agents with varied specializations...');
    const agents: Agent[] = Array.from({ length: 20 }, () => {
        const bias = Math.random();
        const specialty = bias < 0.3 ? 'BACKEND' :
            bias < 0.5 ? 'FRONTEND' :
                bias < 0.7 ? 'DEVOPS' :
                    bias < 0.85 ? 'SECURITY' : 'RESEARCH';
        return new Agent(specialty as Specialty);
    });

    const history: AppEvent[] = [];
    const START_DATE = new Date('2026-01-01');
    let currentDate = new Date(START_DATE);

    // Track project assignments for evaluations (use array instead of Map)
    const projectAssignments: ProjectAssignment[] = [];
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
            const party = formParty(state, currentDate, domain as Specialty);

            // Get squad members
            const squadIds: string[] = party.members.length > 0
                ? party.members.map(m => m.userId)
                : agents.slice(0, 3).map(a => a.id);

            // Create PROJECT_CREATED event
            const projectCreated: AppEvent = {
                id: `evt-project-created-${projectId}`,
                streamId: projectId,
                timestamp: new Date(currentDate),
                type: 'PROJECT_CREATED',
                payload: {
                    projectId,
                    name: `${domain} Project ${projectIdCounter}`,
                    domain: domain as Specialty
                }
            };
            history.push(projectCreated);

            // Create SQUAD_ASSIGNED event
            const squadAssigned: AppEvent = {
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
        const evaluations: Array<{ userId: string; score: number; feedback?: string }> = [];

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
        const projectCompleted: AppEvent = {
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
    const agentStats: AgentStats[] = Object.entries(finalState).map(([userId, xp]) => {
        const agent = agents.find(a => a.id === userId);
        return {
            agent: agent!,
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
        } else if (change < 0) {
            console.log(`   ⬇️ ${name}: XP Rank #${xpRank} → Success-Adjusted #${successRank} (${change})`);
        } else {
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
```

```typescript:apps/swarm/src/specialist-test.ts
import { XpVector } from '@fated/xp-logic';
import { UserId } from '@fated/types';

type Specialty = 'BACKEND' | 'FRONTEND' | 'DEVOPS' | 'SECURITY' | 'RESEARCH';

const SPECIALTY_MULTIPLIER = 1.5;
const ROLE_MULTIPLIER = 1.5;

const hasSpecialty = (xp: XpVector, targetDomain: Specialty): boolean => {
    for (const roleHistory of Object.values(xp.roleHistory)) {
        if (roleHistory[targetDomain] && roleHistory[targetDomain] > 0) {
            return true;
        }
    }
    return false;
};

const getEffectiveScore = (
    xp: XpVector,
    roleXP: number,
    targetDomain?: Specialty
): number => {
    let score = roleXP;
    if (roleXP > 0) {
        score *= ROLE_MULTIPLIER;
    }
    if (targetDomain && hasSpecialty(xp, targetDomain)) {
        score *= SPECIALTY_MULTIPLIER;
    }
    return score;
};

interface TestUser {
    userId: string;
    name: string;
    xpVector: XpVector;
}

const createGeneralist = (): TestUser => {
    const userId = 'generalist-alice';
    return {
        userId,
        name: 'Generalist Alice',
        xpVector: {
            totalXP: 100,
            pendingXP: 0,
            execution: 50,   // Lower execution XP
            collaboration: 30,
            judgment: 20,
            roleHistory: {
                BUILDER: { FRONTEND: 25, BACKEND: 25 },  // Some BACKEND XP
            },
            lastActivity: new Date()
        }
    };
};

const createSpecialist = (): TestUser => {
    const userId = 'specialist-bob';
    return {
        userId,
        name: 'Specialist Bob',
        xpVector: {
            totalXP: 80,     // Lower total XP
            pendingXP: 0,
            execution: 80,   // Higher execution XP
            collaboration: 0,
            judgment: 0,
            roleHistory: {
                BUILDER: { BACKEND: 80 }  // Deep BACKEND specialization
            },
            lastActivity: new Date()
        }
    };
};

const runSpecialistTest = (): boolean => {
    console.log('=== Chapter 070: Specialist Swarm Test ===\n');

    const generalist = createGeneralist();
    const specialist = createSpecialist();

    console.log('Generalist Alice:');
    console.log(`  - Total XP: ${generalist.xpVector.totalXP}`);
    console.log(`  - Execution XP: ${generalist.xpVector.execution}`);
    console.log(`  - Role History:`, JSON.stringify(generalist.xpVector.roleHistory));
    console.log('');

    console.log('Specialist Bob:');
    console.log(`  - Total XP: ${specialist.xpVector.totalXP}`);
    console.log(`  - Execution XP: ${specialist.xpVector.execution}`);
    console.log(`  - Role History:`, JSON.stringify(specialist.xpVector.roleHistory));
    console.log('');

    // Calculate BUILDER scores for BACKEND project
    const targetDomain: Specialty = 'BACKEND';

    console.log('--- BUILDER Scoring for BACKEND Project ---');
    const generalistScore = getEffectiveScore(generalist.xpVector, generalist.xpVector.execution, targetDomain);
    const specialistScore = getEffectiveScore(specialist.xpVector, specialist.xpVector.execution, targetDomain);

    console.log(`Generalist Alice: ${generalist.xpVector.execution} XP × ${ROLE_MULTIPLIER} (role) × ${hasSpecialty(generalist.xpVector, targetDomain) ? SPECIALTY_MULTIPLIER : '1.0'} (specialty) = ${generalistScore}`);
    console.log(`Specialist Bob:   ${specialist.xpVector.execution} XP × ${ROLE_MULTIPLIER} (role) × ${hasSpecialty(specialist.xpVector, targetDomain) ? SPECIALTY_MULTIPLIER : '1.0'} (specialty) = ${specialistScore}`);
    console.log('');

    // Determine winner
    console.log('--- Result ---');
    if (specialistScore > generalistScore) {
        console.log(`✅ PASS: Specialist Bob wins with ${specialistScore.toFixed(2)} vs ${generalistScore.toFixed(2)}`);
        console.log('   The 1.5x specialty multiplier favors the specialist with matching domain!');
        return true;
    } else {
        console.log(`❌ FAIL: Generalist Alice wins with ${generalistScore.toFixed(2)} vs ${specialistScore.toFixed(2)}`);
        return false;
    }
};

// Export for use in swarm
export { runSpecialistTest, createGeneralist, createSpecialist };

// Run if executed directly
if (require.main === module) {
    const success = runSpecialistTest();
    process.exit(success ? 0 : 1);
}
```

---

## Apps - Web

```typescript:apps/web/src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FatedFortress - Build with people who actually ship',
  description: 'The resume is a lie. FatedFortress replaces LinkedIn theater with verified contributions. Earn XP through real work. Join Execution Squads. Ship with people who actually deliver.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```typescript:apps/web/src/app/page.tsx
export default function Home() {
  return (
    <>
      <header>
        <div className="container header-inner">
          <a href="/" className="logo">
            <div className="logo-icon">F</div>
            FatedFortress
          </a>
          <nav>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#" className="cta-button">Join Waitlist</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-badge">
              <span>⚡</span> The resume is a lie. Let's end the performance.
            </div>
            
            <h1>
              Build with people<br />
              who <span className="highlight">actually ship.</span>
            </h1>
            
            <p className="hero-subtitle">
              FatedFortress replaces LinkedIn theater with verified contributions. 
              Earn XP through real work. Join Execution Squads. 
              Ship with people who actually deliver.
            </p>
            
            <div className="hero-cta">
              <a href="#" className="primary">Get Early Access</a>
              <a href="#how-it-works" className="secondary">See How It Works</a>
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-value">0%</div>
                <div className="stat-label">Resume Required</div>
              </div>
              <div className="stat">
                <div className="stat-value">100%</div>
                <div className="stat-label">Verified Contributions</div>
              </div>
              <div className="stat">
                <div className="stat-value">∞</div>
                <div className="stat-label">Possibilities</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <div className="section-header">
              <h2>Why FatedFortress?</h2>
              <p>The professional network for developers who actually build things.</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📡</div>
                <h3>Telemetry as Truth</h3>
                <p>
                  Your XP is built on verified code commits, completed tasks, 
                  and code reviews—not self-reported skills.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎭</div>
                <h3>Anonymous or Visible</h3>
                <p>
                  Work under a pseudonym until you're ready to reveal. 
                  Full control over your visibility.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚔️</div>
                <h3>Execution Squads</h3>
                <p>
                  AI assembles teams based on complementary XP profiles. 
                  Find your perfect collaborators.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📉</div>
                <h3>Trust Decay</h3>
                <p>
                  Old XP fades. Recent contributions matter more. 
                  Your reputation reflects what you do now.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Decentralized Trust</h3>
                <p>
                  No central authority. No manipulation. 
                  Just verified contributions and transparent scoring.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Ship Fast</h3>
                <p>
                  Find teams, complete work, earn XP. 
                  The platform that rewards execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="how-it-works">
          <div className="container">
            <div className="section-header">
              <h2>How It Works</h2>
              <p>From resume to reality in four steps.</p>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Connect Your Work</h3>
                  <p>
                    Link your GitHub, GitLab, or Bitbucket. We track your 
                    actual contributions, not your profile.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Earn XP</h3>
                  <p>
                    Complete tasks, review code, ship features. Every verified 
                    contribution earns you XP in multiple axes.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Join a Squad</h3>
                  <p>
                    AI matches you with complementary XP profiles. 
                    Find collaborators who complement your skills.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Ship & Scale</h3>
                  <p>
                    Execute. Deliver. Build your reputation on real work, 
                    not theater. The truth is your credential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="cta-section">
          <div className="container">
            <h2>Ready to end the performance?</h2>
            <p>Join the waitlist. Be first to access the platform.</p>
            <a href="#" className="hero-cta primary">Get Early Access</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-copy">
            © 2026 FatedFortress. Built for builders.
          </div>
        </div>
      </footer>
    </>
  )
}
```

---

## Packages - API

```typescript:packages/api/src/index.ts
/**
 * @fated/api
 * Main API Server - Modular Architecture
 */

// Load .env from project root
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Go up 3 levels: src -> api -> packages -> root
const rootDir = resolve(__dirname, '../../..');
const envPath = resolve(rootDir, '.env');

if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      let value = match[2].trim();
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Convert relative paths to absolute paths
      if (value.startsWith('file:./')) {
        const relativePath = value.slice(7); // Remove 'file:./' (7 chars)
        const absolutePath = resolve(rootDir, relativePath);
        console.log('[ENV] rootDir:', rootDir);
        console.log('[ENV] relativePath:', relativePath);
        console.log('[ENV] absolutePath:', absolutePath);
        value = 'file:' + absolutePath;
      }
      process.env[match[1].trim()] = value;
    }
  });
  console.log('[ENV] Loaded DATABASE_URL:', process.env.DATABASE_URL);
} else {
  console.log('[ENV] No .env file found at', envPath);
}

import Fastify, { FastifyRequest, FastifyInstance } from 'fastify';
import { randomUUID } from 'crypto';
import { PrismaClient } from '@prisma/client';

// Domain imports
import {
  stakeRep,
  releaseStake,
  createTicket,
  claimTicket,
  completeTicket,
  processForfeitures,
  getStakeSummary,
  listOpenTickets,
  getTicket,
} from '@fated/domain-bonding';

import { formParty, type MemberInput } from '@fated/domain-matching';

// Infrastructure imports
import { InMemoryEventStore } from '@fated/infra-event-store';
import { AppEventSchema, type AppEvent } from '@fated/core';

import {
  verifyGitHubSignature,
  extractTicketId,
  GitHubPRPayloadSchema,
} from '@fated/infra-webhooks';

// ... (API continues with all endpoints - see full file for complete implementation)
```

> Note: The full API file contains approximately 940 lines. See `packages/api/src/index.ts` for the complete implementation.

---

## Packages - Bonding

```typescript:packages/bonding/src/index.ts
/**
 * @fated/bonding
 * REP Staking and Bonding Logic
 */

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { AppEvent, BaseEventSchema } from '@fated/events';
import { UserId } from '@fated/types';

// Lazy initialization - only create PrismaClient when needed
let _prisma: PrismaClient | undefined;
function getPrisma() {
  if (!_prisma) {
    _prisma = new PrismaClient();
  }
  return _prisma;
}

// ============================================
// SCHEMAS
// ============================================

export const StakeSchema = z.object({
  actorId: z.string().uuid(),
  amount: z.number().positive(),
});

export const UnstakeSchema = z.object({
  actorId: z.string().uuid(),
  stakeId: z.string().uuid(),
});

export const CreateTicketSchema = z.object({
  workPackageId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  bondRequired: z.number().positive(),
  deadline: z.coerce.date(),
});

export const ClaimTicketSchema = z.object({
  actorId: z.string().uuid(),
  ticketId: z.string().uuid(),
});

export const CompleteTicketSchema = z.object({
  ticketId: z.string().uuid(),
  verifierId: z.string().uuid(), // Who verified the work
});

// ... (Complete implementation in packages/bonding/src/index.ts)
```

---

## Packages - Core

```typescript:packages/core/src/index.ts
import { z } from "zod";

// ============================================
// SPECIALTIES & ENUMS
// ============================================

export const SpecialtyEnum = z.enum(['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH']);
export type Specialty = z.infer<typeof SpecialtyEnum>;

export const TicketStatusEnum = z.enum(['OPEN', 'CLAIMED', 'COMPLETED', 'FORFEITED', 'CANCELLED']);
export type TicketStatus = z.infer<typeof TicketStatusEnum>;

export const StakeStatusEnum = z.enum(['ACTIVE', 'RELEASED', 'FORFEITED']);
export type StakeStatus = z.infer<typeof StakeStatusEnum>;

// ============================================
// BASE SCHEMAS
// ============================================

export const BaseEventSchema = z.object({
  id: z.string().uuid(),
  streamId: z.string(),
  timestamp: z.coerce.date(),
  metadata: z.record(z.any()).optional(),
});

export type BaseEvent = z.infer<typeof BaseEventSchema>;

// ============================================
// CONTRIBUTION EVENTS
// ============================================

export const ContributionSubmittedSchema = BaseEventSchema.extend({
  type: z.literal("CONTRIBUTION_SUBMITTED"),
  payload: z.object({
    userId: z.string(),
    url: z.string().url(),
    complexityScore: z.number().min(1).max(10).optional(),
    specialty: SpecialtyEnum.optional(),
  }),
});

export type ContributionSubmitted = z.infer<typeof ContributionSubmittedSchema>;

export const VerificationSubmittedSchema = BaseEventSchema.extend({
  type: z.literal("VERIFICATION_SUBMITTED"),
  payload: z.object({
    verifierId: z.string(),
    targetContributionId: z.string(),
    verdict: z.literal("APPROVE").or(z.literal("REJECT")),
    qualityScore: z.number().min(1).max(5).optional(),
    specialty: SpecialtyEnum.optional(),
  }),
});

export type VerificationSubmitted = z.infer<typeof VerificationSubmittedSchema>;

// ... (Full schema definitions in packages/core/src/index.ts)
```

---

## Packages - DB

```typescript:packages/db/src/index.ts
import { PrismaClient } from '@prisma/client';

/**
 * Singleton PrismaClient instance for database operations.
 * Prevents connection pool exhaustion in development/hot-reload scenarios.
 */
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export type { PrismaClient };
```

---

## Packages - Events

```typescript:packages/events/src/index.ts
import { z } from "zod";

// Base Event
export const BaseEventSchema = z.object({
  id: z.string().uuid(),
  streamId: z.string(),
  timestamp: z.coerce.date(),
  metadata: z.record(z.any()).optional(),
});

// Specialty enum for domain-aware specialization
const SpecialtyEnum = z.enum(['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH']);

// 1. Contribution (The Work)
export const ContributionSubmittedSchema = BaseEventSchema.extend({
  type: z.literal("CONTRIBUTION_SUBMITTED"),
  payload: z.object({
    userId: z.string(),
    url: z.string().url(),
    complexityScore: z.number().min(1).max(10).optional(),
    specialty: SpecialtyEnum.optional(),
  }),
});

// 2. Verification (The Judgment)
export const VerificationSubmittedSchema = BaseEventSchema.extend({
  type: z.literal("VERIFICATION_SUBMITTED"),
  payload: z.object({
    verifierId: z.string(),
    targetContributionId: z.string(),
    verdict: z.literal("APPROVE").or(z.literal("REJECT")),
    qualityScore: z.number().min(1).max(5).optional(),
    specialty: SpecialtyEnum.optional(),
  }),
});

export type ContributionSubmitted = z.infer<typeof ContributionSubmittedSchema>;
export type VerificationSubmitted = z.infer<typeof VerificationSubmittedSchema>;

// 3. Project Lifecycle Events
export const ProjectCreatedSchema = BaseEventSchema.extend({
  type: z.literal("PROJECT_CREATED"),
  payload: z.object({
    projectId: z.string(),
    name: z.string(),
    domain: SpecialtyEnum,
  }),
});

export const SquadAssignedSchema = BaseEventSchema.extend({
  type: z.literal("SQUAD_ASSIGNED"),
  payload: z.object({
    projectId: z.string(),
    squadIds: z.array(z.string()),
  }),
});

export const ProjectCompletedSchema = BaseEventSchema.extend({
  type: z.literal("PROJECT_COMPLETED"),
  payload: z.object({
    projectId: z.string(),
    evaluations: z.array(z.object({
      userId: z.string(),
      score: z.number().min(0).max(1),
      feedback: z.string().optional(),
    })),
  }),
});

export type ProjectCreated = z.infer<typeof ProjectCreatedSchema>;
export type SquadAssigned = z.infer<typeof SquadAssignedSchema>;
export type ProjectCompleted = z.infer<typeof ProjectCompletedSchema>;

// The Union - All Event Types
export const AppEventSchema = z.discriminatedUnion("type", [
  ContributionSubmittedSchema,
  VerificationSubmittedSchema,
  ProjectCreatedSchema,
  SquadAssignedSchema,
  ProjectCompletedSchema,
]);

export type AppEvent = z.infer<typeof AppEventSchema>;
```

---

## Packages - Event Store

```typescript:packages/event-store/src/index.ts
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

    // ... (Full implementation in packages/event-store/src/index.ts)
}

export type { AppEvent, XpVector, SystemState };
```

---

## Packages - Infrastructure Event Store

```typescript:packages/infrastructure/event-store/src/index.ts
/**
 * @fated/infra-event-store
 * In-Memory Event Store with Materialized State
 */

import { PrismaClient } from '@prisma/client';
import { AppEventSchema, type AppEvent, type Specialty } from '@fated/core';
import { calculateXP, applyDecay } from '@fated/domain-xp';

const prisma = new PrismaClient();

// ============================================
// STATE MANAGEMENT
// ============================================

interface UserState {
  userId: string;
  totalXP: number;
  pendingXP: number;
  contributions: number;
  lastActivity: Date | null;
  successRate: Record<Specialty, number>;
  specialtyXP: Record<Specialty, number>;
}

const state = new Map<string, UserState>();

// ... (Full implementation in packages/infrastructure/event-store/src/index.ts)

export class InMemoryEventStore {
  // ... (Full implementation)
}

export { prisma };
```

---

## Packages - Infrastructure Webhooks

```typescript:packages/infrastructure/webhooks/src/index.ts
/**
 * @fated/infra-webhooks
 * Webhook Verification and Payload Parsing
 */

import { createHmac } from 'crypto';
import { z } from 'zod';

// ============================================
// GITHUB WEBHOOKS
// ============================================

export const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'dev-secret';

/**
 * Verify GitHub webhook HMAC-SHA256 signature
 */
export function verifyGitHubSignature(
  payload: string,
  signature: string,
  secret: string = GITHUB_WEBHOOK_SECRET
): boolean {
  // In dev mode, skip verification
  if (secret === 'dev-secret' || !signature) return true;
  
  const hmac = createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  
  return signature === digest;
}

/**
 * Parse GitHub PR webhook payload
 */
export const GitHubPRPayloadSchema = z.object({
  action: z.string(),
  pull_request: z.object({
    id: z.number(),
    number: z.number(),
    title: z.string(),
    body: z.string().nullable(),
    html_url: z.string(),
    user: z.object({ login: z.string() }),
    merged: z.boolean().nullable(),
    merged_at: z.string().nullable(),
    state: z.string(),
  }),
  repository: z.object({
    id: z.number(),
    name: z.string(),
    full_name: z.string(),
  }),
});

export type GitHubPRPayload = z.infer<typeof GitHubPRPayloadSchema>;

/**
 * Extract ticket ID from PR body
 * Looks for patterns like: "ticket-uuid", "closes ticket-uuid", "Fixes ticket-uuid"
 */
export function extractTicketId(prBody: string | null): string | null {
  if (!prBody) return null;
  
  const patterns = [
    /ticket-([a-f0-9\-]{36})/i,
    /closes\s+ticket-([a-f0-9\-]{36})/i,
    /fixes\s+ticket-([a-f0-9\-]{36})/i,
    /resolves\s+ticket-([a-f0-9\-]{36})/i,
  ];
  
  for (const pattern of patterns) {
    const match = prBody.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

// ... (Full implementation in packages/infrastructure/webhooks/src/index.ts)
```

---

## Packages - Matchmaker

```typescript:packages/matchmaker/src/index.ts
import { SystemState, XpVector } from '@fated/xp-logic';
import { Specialty, UserId } from '@fated/types';

export type PartyRole = 'ARCHITECT' | 'GUARDIAN' | 'BUILDER';

export type PartyMember = {
    userId: UserId;
    role: PartyRole;
    score: number;
};

export type AdventuringParty = {
    members: PartyMember[];
    totalPower: number;
};

// Specialty and role multiplier constants
const SPECIALTY_MULTIPLIER = 1.5;
const ROLE_MULTIPLIER = 1.5;
const SUCCESS_MULTIPLIER = 0.5; // Success rate adds up to 50% bonus

/**
 * Get the XP value for a specific role.
 */
const getRoleXP = (xp: XpVector, role: PartyRole): number => {
    switch (role) {
        case 'BUILDER': return xp.execution;
        case 'ARCHITECT': return xp.collaboration;
        case 'GUARDIAN': return xp.judgment;
    }
};

/**
 * Check if user has activity in the target domain across any role.
 */
const hasSpecialty = (xp: XpVector, targetDomain: Specialty): boolean => {
    for (const roleHistory of Object.values(xp.roleHistory)) {
        if (roleHistory[targetDomain] && roleHistory[targetDomain] > 0) {
            return true;
        }
    }
    return false;
};

/**
 * Get effective score for a user with specialty, role, and success rate multipliers.
 *
 * Formula:
 * effectiveScore = baseScore
 *                * (role === targetRole ? 1.5 : 1.0)
 *                * (specialty === targetDomain ? 1.5 : 1.0)
 *                * (1 + (successRate[domain] * 0.5))
 */
const getEffectiveScore = (
    xp: XpVector,
    roleXP: number,
    targetDomain?: Specialty
): number => {
    let score = roleXP;

    // Apply role multiplier if user has XP in this role
    if (roleXP > 0) {
        score *= ROLE_MULTIPLIER;
    }

    // Apply specialty multiplier if target domain is specified and user has it
    if (targetDomain && hasSpecialty(xp, targetDomain)) {
        score *= SPECIALTY_MULTIPLIER;
    }

    // Apply success rate multiplier if target domain is specified and user has history
    if (targetDomain && xp.successRate && xp.successRate[targetDomain] !== undefined) {
        const successMultiplier = 1 + (xp.successRate[targetDomain] * SUCCESS_MULTIPLIER);
        score *= successMultiplier;
    }

    return score;
};

export const formParty = (
    state: SystemState,
    now: Date = new Date(),
    targetDomain?: Specialty
): AdventuringParty => {
    const activeUsers = Object.entries(state).filter(([_, xp]) => {
        if (!xp.lastActivity) return false;
        const daysSilent = (now.getTime() - xp.lastActivity.getTime()) / (1000 * 3600 * 24);
        return daysSilent < 30;
    });

    const pool = new Set<string>();

    const pickBest = (
        role: PartyRole,
        scorer: (xp: XpVector) => number
    ): PartyMember | null => {
        let bestId: string | null = null;
        let bestScore = -1;

        for (const [id, xp] of activeUsers) {
            if (pool.has(id)) continue;

            const baseScore = scorer(xp);
            const effectiveScore = getEffectiveScore(xp, baseScore, targetDomain);

            if (effectiveScore > bestScore) {
                bestScore = effectiveScore;
                bestId = id;
            }
        }

        if (bestId) {
            pool.add(bestId);
            return { userId: bestId as UserId, role, score: bestScore };
        }
        return null;
    };

    const members: PartyMember[] = [];

    // Pick ARCHITECT - requires collaboration XP
    const architect = pickBest('ARCHITECT', (xp) => xp.collaboration);
    if (architect && architect.score > 0) {
        members.push(architect);
    }

    // Pick GUARDIAN - requires judgment XP
    const guardian = pickBest('GUARDIAN', (xp) => xp.judgment);
    if (guardian && guardian.score > 0) {
        members.push(guardian);
    }

    // Pick BUILDERs - requires execution XP (specialty-aware)
    const builder1 = pickBest('BUILDER', (xp) => xp.execution);
    if (builder1 && builder1.score > 0) {
        members.push(builder1);
    }

    const builder2 = pickBest('BUILDER', (xp) => xp.execution);
    if (builder2 && builder2.score > 0) {
        members.push(builder2);
    }

    return {
        members,
        totalPower: members.reduce((sum, m) => sum + m.score, 0)
    };
};
```

---

## Packages - Types

```typescript:packages/types/src/index.ts
// Branded types to prevent mixing up IDs
export type Brand<K, T> = K & { __brand: T };

export type UserId = Brand<string, "UserId">;
export type ProjectId = Brand<string, "ProjectId">;
export type ContributionId = Brand<string, "ContributionId">;

// Factories to avoid ugly casting everywhere
export const toUserId = (id: string) => id as UserId;
export const toProjectId = (id: string) => id as ProjectId;
export const toContributionId = (id: string) => id as ContributionId;

export enum Visibility {
  OFF = "OFF",
  ANON = "ANON"
}

// Specialty domains for domain-aware specialization
export type Specialty = 'BACKEND' | 'FRONTEND' | 'DEVOPS' | 'SECURITY' | 'RESEARCH';
```

---

## Packages - Domain Bonding

```typescript:packages/domain/bonding/src/index.ts
/**
 * @fated/domain-bonding
 * REP Staking, Tickets, and Forfeiture Logic
 */

import { PrismaClient } from '@prisma/client';
import {
  StakeInputSchema,
  UnstakeInputSchema,
  CreateTicketInputSchema,
  ClaimTicketInputSchema,
  CompleteTicketInputSchema,
  type Stake,
  type Ticket,
  type ActorState,
} from '@fated/core';

// Lazy initialization - only create PrismaClient when needed
let _prisma: PrismaClient | undefined;
function getPrisma() {
  if (!_prisma) {
    _prisma = new PrismaClient();
  }
  return _prisma;
}

// ============================================
// PRIVATE HELPERS
// ============================================

async function emitEvent(
  tx: PrismaClient,
  actorId: string,
  type: string,
  payload: Record<string, unknown>
) {
  return tx.event.create({
    data: {
      id: crypto.randomUUID(),
      actorId,
      streamId: `bonding-${Date.now()}`,
      timestamp: new Date(),
      type,
      payload: JSON.stringify(payload),
    },
  });
}

// ============================================
// STAKE OPERATIONS
// ============================================

/**
 * Place a stake - locks REP from user's liquid balance
 */
export async function stakeRep(input: z.infer<typeof StakeInputSchema>) {
  // ... (Full implementation in packages/domain/bonding/src/index.ts)
}

/**
 * Release a stake - returns REP to liquid balance
 * Only allows releasing stakes not tied to active tickets
 */
export async function releaseStake(input: z.infer<typeof UnstakeSchema>) {
  // ... (Full implementation)
}

// ============================================
// TICKET OPERATIONS
// ============================================

/**
 * Create a new ticket (work package)
 */
export async function createTicket(input: z.infer<typeof CreateTicketInputSchema>) {
  // ... (Full implementation)
}

/**
 * Claim a ticket - auto-stakes from current REP if needed
 */
export async function claimTicket(input: z.infer<typeof ClaimTicketInputSchema>) {
  // ... (Full implementation)
}

/**
 * Complete a ticket - returns stake + awards REP
 */
export async function completeTicket(input: z.infer<typeof CompleteTicketInputSchema>) {
  // ... (Full implementation)
}

// ============================================
// FORFEITURE LOGIC
// ============================================

/**
 * Process overdue tickets - slash staked REP
 */
export async function processForfeitures(slashPercent: number = 0.5) {
  // ... (Full implementation)
}

// ============================================
// QUERY OPERATIONS
// ============================================

export async function getStakeSummary(actorId: string) {
  // ... (Full implementation)
}

export async function listOpenTickets(limit: number = 20) {
  // ... (Full implementation)
}

export async function getTicket(ticketId: string) {
  // ... (Full implementation)
}

export async function getActorState(actorId: string) {
  return getPrisma().actorState.findUnique({ where: { actorId } });
}

export async function listStakes(actorId: string, status?: string) {
  return getPrisma().stake.findMany({
    where: { actorId, ...(status ? { status } : {}) },
    orderBy: { createdAt: 'desc' },
  });
}

// ============================================
// EXPORTS
// ============================================

export { prisma };
export type { Stake, Ticket, ActorState } from '@fated/core';
```

---

## Packages - Domain Matching

```typescript:packages/domain/matching/src/index.ts
/**
 * @fated/domain-matching
 * Team Formation and Matching Logic
 */

import { z } from 'zod';
import type { Specialty } from '@fated/core';

// ============================================
// CONFIGURATION
// ============================================

const MATCHING_CONFIG = {
  IDEAL_TEAM_SIZE: 4,
  MIN_TEAM_SIZE: 2,
  MAX_TEAM_SIZE: 6,
  SPECIALTY_WEIGHTS: {
    BACKEND: 1.0,
    FRONTEND: 1.0,
    DEVOPS: 1.5,
    SECURITY: 2.0,
    RESEARCH: 1.5,
  },
  ROLE_SCORES: {
    LEADER: 1.5,
    CONTRIBUTOR: 1.0,
    REVIEWER: 1.2,
  },
};

// ============================================
// TYPES
// ============================================

export interface Member {
  userId: string;
  specialty: Specialty;
  xp: number;
  successRate: number;
  role?: 'LEADER' | 'CONTRIBUTOR' | 'REVIEWER';
}

export interface Team {
  id: string;
  members: Member[];
  totalPower: number;
  specialtyCoverage: Record<Specialty, number>;
}

// ============================================
// SCORING
// ============================================

/**
 * Calculate individual member's power score
 */
export function calculateMemberPower(member: Member): number {
  const specialtyWeight = MATCHING_CONFIG.SPECIALTY_WEIGHTS[member.specialty];
  const roleScore = MATCHING_CONFIG.ROLE_SCORES[member.role ?? 'CONTRIBUTOR'];
  
  return member.xp * member.successRate * specialtyWeight * roleScore;
}

/**
 * Calculate team's total power
 */
export function calculateTeamPower(members: Member[]): number {
  return members.reduce((sum, m) => sum + calculateMemberPower(m), 0);
}

/**
 * Calculate specialty coverage score
 */
export function calculateSpecialtyCoverage(members: Member[]): Record<Specialty, number> {
  const coverage: Record<Specialty, number> = {
    BACKEND: 0,
    FRONTEND: 0,
    DEVOPS: 0,
    SECURITY: 0,
    RESEARCH: 0,
  };
  
  for (const member of members) {
    coverage[member.specialty]++;
  }
  
  return coverage;
}

// ============================================
// TEAM FORMATION
// ============================================

/**
 * Check if a team is balanced (has required specialties)
 */
export function isTeamBalanced(members: Member[], requiredSpecialties: Specialty[] = []): boolean {
  const coverage = calculateSpecialtyCoverage(members);
  
  // Must have at least one of each required specialty
  for (const specialty of requiredSpecialties) {
    if (coverage[specialty] < 1) return false;
  }
  
  // Team size should be appropriate
  if (members.length < MATCHING_CONFIG.MIN_TEAM_SIZE) return false;
  if (members.length > MATCHING_CONFIG.MAX_TEAM_SIZE) return false;
  
  return true;
}

/**
 * Form optimal teams from a pool of members
 */
export function formTeams(members: Member[], targetTeamSize: number = MATCHING_CONFIG.IDEAL_TEAM_SIZE): Team[] {
  // ... (Full implementation)
}

/**
 * Find best member to assign as team leader
 */
export function findLeader(members: Member[]): Member | null {
  // ... (Full implementation)
}

/**
 * Assign roles to team members optimally
 */
export function assignRoles(members: Member[]): Member[] {
  // ... (Full implementation)
}

// ============================================
// INPUT VALIDATION
// ============================================

export const MemberInputSchema = z.object({
  userId: z.string(),
  specialty: z.enum(['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH']),
  xp: z.number().min(0),
  successRate: z.number().min(0).max(1),
  role: z.enum(['LEADER', 'CONTRIBUTOR', 'REVIEWER']).optional(),
});

export type MemberInput = z.infer<typeof MemberInputSchema>;

// ============================================
// MAIN EXPORTS
// ============================================

/**
 * Form a party (team) from member pool
 */
export function formParty(members: MemberInput[]): Team {
  const parsed = members.map(m => MemberInputSchema.parse(m));
  const withRoles = assignRoles(parsed);
  
  return {
    id: crypto.randomUUID(),
    members: withRoles,
    totalPower: calculateTeamPower(withRoles),
    specialtyCoverage: calculateSpecialtyCoverage(withRoles),
  };
}

/**
 * Get configuration (useful for testing)
 */
export function getMatchingConfig() {
  return { ...MATCHING_CONFIG };
}

export type { Specialty };
```

---

## Packages - Domain XP

```typescript:packages/domain/xp/src/index.ts
/**
 * @fated/domain-xp
 * XP Calculation and Decay Logic
 */

import { z } from 'zod';
import type { Specialty, ContributionSubmitted, VerificationSubmitted } from '@fated/core';

// ============================================
// CONFIGURATION
// ============================================

const XP_CONFIG = {
  BASE_CONTRIBUTION_XP: 100,
  VERIFICATION_XP: 25,
  COMPLEXITY_MULTIPLIER: {
    1: 0.5,
    2: 0.75,
    3: 1.0,
    4: 1.25,
    5: 1.5,
    6: 1.75,
    7: 2.0,
    8: 2.5,
    9: 3.0,
    10: 4.0,
  },
  SPECIALTY_BONUS: {
    BACKEND: 1.2,
    FRONTEND: 1.2,
    DEVOPS: 1.3,
    SECURITY: 1.5,
    RESEARCH: 1.4,
  },
  DECAY_HALF_LIFE_DAYS: 30,
  DECAY_RATE: 0.02, // 2% per day
};

// ============================================
// XP CALCULATIONS
// ============================================

/**
 * Calculate XP earned from a contribution
 */
export function calculateContributionXP(
  contribution: ContributionSubmitted['payload'],
  verdict: 'APPROVE' | 'REJECT' = 'APPROVE'
): number {
  if (verdict === 'REJECT') return 0;

  const complexityMult = XP_CONFIG.COMPLEXITY_MULTIPLIER[contribution.complexityScore ?? 3];
  const specialtyBonus = XP_CONFIG.SPECIALTY_BONUS[contribution.specialty ?? 'BACKEND'];

  const baseXP = XP_CONFIG.BASE_CONTRIBUTION_XP;
  return Math.floor(baseXP * complexityMult * specialtyBonus);
}

/**
 * Calculate XP earned from verification
 */
export function calculateVerificationXP(
  verification: VerificationSubmitted['payload']
): number {
  // ... (Full implementation)
}

/**
 * Apply decay to XP based on time since last activity
 */
export function applyDecay(currentXP: number, daysSinceLastActivity: number): number {
  // ... (Full implementation)
}

// ============================================
// MAIN CALCULATOR
// ============================================

export interface XPCalculationResult {
  xp: number;
  breakdown: {
    baseXP: number;
    complexityMultiplier: number;
    specialtyBonus: number;
    qualityBonus?: number;
  };
}

/**
 * Calculate XP from contribution or verification
 */
export function calculateXP(input: CalculateXPInput): XPCalculationResult {
  // ... (Full implementation)
}

/**
 * Get configuration (useful for testing)
 */
export function getXPConfig() {
  return { ...XP_CONFIG };
}

export type { Specialty };
```

---

## Packages - @fated/bonds

```typescript:packages/@fated/bonds/src/index.ts
/**
 * @fated/bonds - Execution Bond Management
 * Chapter 3.5: Two-Tier Reputation System
 * 
 * Handles active-staked reputation with slashing triggers.
 */

import { z } from 'zod';

// ============================================
// BOND TYPES
// ============================================

export const BondStatus = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  FORFEITED: 'FORFEITED',
  RELEASED: 'RELEASED',
} as const;

export type BondStatusType = typeof BondStatus[keyof typeof BondStatus];

export const BondTrigger = {
  P0_OUTAGE: 'P0_OUTAGE',         // Breaking change caused production outage
  MISSED_DEADLINE: 'MISSED_DEADLINE', // Failed to deliver on time
  PROJECT_ABAND: 'PROJECT_ABANDON', // Left committed project
} as const;

export type BondTriggerType = typeof BondTrigger[keyof typeof BondTrigger];

// ============================================
// BOND SCHEMA
// ============================================

export const ExecutionBondSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  squadId: z.string().uuid(),
  amount: z.number().int().min(100), // Minimum 100 REP to stake
  trigger: z.enum(['P0_OUTAGE', 'MISSED_DEADLINE', 'PROJECT_ABANDON']),
  status: z.enum(['ACTIVE', 'COMPLETED', 'FORFEITED', 'RELEASED']),
  createdAt: z.date(),
  completedAt: z.date().optional(),
  slashedAt: z.date().optional(),
  slashReason: z.string().optional(),
});

export type ExecutionBond = z.infer<typeof ExecutionBondSchema>;

// ============================================
// BOND MANAGEMENT
// ============================================

export interface BondSlashedEvent {
  bondId: string;
  userId: string;
  squadId: string;
  amount: number;
  trigger: BondTriggerType;
  slashedAt: Date;
  reason: string;
}

export interface BondCompletedEvent {
  bondId: string;
  userId: string;
  squadId: string;
  amount: number;
  completedAt: Date;
}

/**
 * Create a new execution bond
 */
export function createBond(
  userId: string,
  squadId: string,
  amount: number,
  trigger: BondTriggerType
): ExecutionBond {
  if (amount < 100) {
    throw new Error('Minimum bond amount is 100 REP');
  }

  return {
    id: crypto.randomUUID(),
    userId,
    squadId,
    amount,
    trigger,
    status: BondStatus.ACTIVE,
    createdAt: new Date(),
  };
}

/**
 * Slash a bond (called when trigger condition is met)
 */
export function slashBond(
  bond: ExecutionBond,
  reason: string
): BondSlashedEvent {
  // ... (Full implementation)
}

/**
 * Complete a bond successfully
 */
export function completeBond(bond: ExecutionBond): BondCompletedEvent {
  // ... (Full implementation)
}

/**
 * Release a bond (voluntary exit before trigger)
 */
export function releaseBond(bond: ExecutionBond): ExecutionBond {
  // ... (Full implementation)
}

// ============================================
// BOND CALCULATIONS
// ============================================

/**
 * Calculate slash penalty based on bond amount
 * Higher bonds have steeper penalties
 */
export function calculateSlashPenalty(bondAmount: number): number {
  if (bondAmount <= 500) {
    return 0.5; // 50% penalty for small bonds
  }
  if (bondAmount <= 1000) {
    return 0.75; // 75% penalty for medium bonds
  }
  return 0.9; // 90% penalty for large bonds
}

/**
 * Calculate REP penalty after slash
 */
export function calculateREPPenalty(
  originalAmount: number,
  trigger: BondTriggerType
): number {
  // ... (Full implementation)
}

/**
 * Check if a trigger condition is met
 */
export function evaluateTrigger(
  trigger: BondTriggerType,
  evidence: {
    outageOccurred?: boolean;
    deadlineMissed?: boolean;
    abandonedProject?: boolean;
  }
): boolean {
  // ... (Full implementation)
}

// ============================================
// EXPORTS
// ============================================

export const BondsLib = {
  BondStatus,
  BondTrigger,
  ExecutionBond: ExecutionBondSchema,
  
  // Operations
  createBond,
  slashBond,
  completeBond,
  releaseBond,
  
  // Calculations
  calculateSlashPenalty,
  calculateREPPenalty,
  evaluateTrigger,
};
```

---

## Packages - @fated/contributions

```typescript:packages/@fated/contributions/src/index.ts
/**
 * @fated/contributions - Contribution Tracking
 * Chapter 3: REP System
 * 
 * Tracks and processes user contributions.
 */

import { z } from 'zod';

// ============================================
// CONTRIBUTION TYPES
// ============================================

export const ContributionType = {
  CODE_COMMIT: 'CODE_COMMIT',
  CODE_REVIEW: 'CODE_REVIEW',
  TASK_COMPLETION: 'TASK_COMPLETION',
  DOCUMENTATION: 'DOCUMENTATION',
  MENTORSHIP: 'MENTORSHIP',
} as const;

export type ContributionTypeType = typeof ContributionType[keyof typeof ContributionType];

// ============================================
// CONTRIBUTION SCHEMA
// ============================================

export const ContributionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(['CODE_COMMIT', 'CODE_REVIEW', 'TASK_COMPLETION', 'DOCUMENTATION', 'MENTORSHIP']),
  axes: z.array(z.string()),
  description: z.string().optional(),
  metadata: z.record(z.unknown()),
  createdAt: z.date(),
});

export type Contribution = z.infer<typeof ContributionSchema>;

// ============================================
// CONTRIBUTION OPERATIONS
// ============================================

/**
 * Create a new contribution record
 */
export function createContribution(
  userId: string,
  type: ContributionTypeType,
  axes: string[],
  metadata: Record<string, unknown> = {},
  description?: string
): Contribution {
  return {
    id: crypto.randomUUID(),
    userId,
    type,
    axes,
    description,
    metadata,
    createdAt: new Date(),
  };
}

/**
 * Calculate REP earned from contribution
 */
export function calculateContributionREP(
  type: ContributionTypeType,
  verificationLevel: 'NONE' | 'AUTOMATED' | 'PEER_REVIEW' | 'STAKEHOLDER_APPROVAL',
  axisMultiplier: number = 1.0
): number {
  // ... (Full implementation)
}

/**
 * Process contribution - main entry point
 */
export function processContribution(
  userId: string,
  type: ContributionTypeType,
  axes: string[],
  verificationLevel: 'NONE' | 'AUTOMATED' | 'PEER_REVIEW' | 'STAKEHOLDER_APPROVAL',
  metadata: Record<string, unknown> = {}
): {
  contribution: Contribution;
  repEarned: number;
} {
  // ... (Full implementation)
}

/**
 * Aggregate contributions by type
 */
export function aggregateByType(contributions: Contribution[]): Record<ContributionTypeType, number> {
  // ... (Full implementation)
}

/**
 * Aggregate contributions by axis
 */
export function aggregateByAxis(contributions: Contribution[]): Record<string, number> {
  // ... (Full implementation)
}

// ============================================
// EXPORTS
// ============================================

export const ContributionsLib = {
  ContributionType,
  Contribution: ContributionSchema,
  
  // Operations
  createContribution,
  calculateContributionREP,
  processContribution,
  aggregateByType,
  aggregateByAxis,
};
```

---

## Packages - @fated/db

```typescript:packages/@fated/db/src/index.ts
/**
 * @fated/db - Persistence Bridge with Write-Through Cache
 * Chapter 6: Technical Architecture
 * 
 * Integrates Prisma with SQLite using a write-through cache pattern.
 * Maintains high-speed in-memory cache for O(1) writes while
 * asynchronously ensuring durability in SQLite.
 */

import { z } from 'zod';

// ============================================
// DATABASE SCHEMAS (Prisma-equivalent in Zod)
// ============================================

/**
 * User table schema
 */
export const UserTableSchema = z.object({
  id: z.string().uuid(),
  primaryPseudonymId: z.string().uuid(),
  realName: z.string().optional(),
  visibilityMode: z.enum(['ANON', 'OFF']),
  state: z.enum(['VISITOR', 'PASSIVE', 'ACTIVE', 'PROJECT', 'TRUSTED']),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type UserTable = z.infer<typeof UserTableSchema>;

/**
 * REP Profile table schema
 */
export const REPProfileTableSchema = z.object({
  userId: z.string().uuid(),
  totalREP: z.number().int().min(0),
  lastUpdated: z.date(),
});
export type REPProfileTable = z.infer<typeof REPProfileTableSchema>;

// ... (More schemas in full file)

// ============================================
// WRITE-THROUGH CACHE INTERFACE
// ============================================

export interface CacheEntry<T> {
  data: T;
  dirty: boolean;
  lastWrite: Date;
}

/**
 * Write-Through Cache
 * O(1) writes to memory, async flush to SQLite
 */
export class WriteThroughCache<K, T> {
  private cache: Map<K, CacheEntry<T>> = new Map();
  private writeQueue: Array<{ key: K; data: T }> = [];
  private flushInterval: number;
  private isFlushing = false;

  constructor(flushIntervalMs: number = 1000) {
    this.flushInterval = flushIntervalMs;
    // Start periodic flush
    setInterval(() => this.flush(), this.flushInterval);
  }

  /**
   * O(1) write to cache
   */
  set(key: K, data: T): void {
    // ... (Full implementation)
  }

  /**
   * O(1) read from cache
   */
  get(key: K): T | undefined {
    return this.cache.get(key)?.data;
  }

  /**
   * Async flush dirty entries to database
   */
  private async flush(): Promise<void> {
    // ... (Full implementation)
  }
}

// ============================================
// DATABASE REPOSITORY INTERFACE
// ============================================

export interface UserRepository {
  findById(id: string): Promise<UserTable | null>;
  findAll(): Promise<UserTable[]>;
  create(user: UserTable): Promise<void>;
  update(user: UserTable): Promise<void>;
  delete(id: string): Promise<void>;
}

// ... (More repository interfaces)

// ============================================
// EXPORTS
// ============================================

export const DBLib = {
  // Schemas
  User: UserTableSchema,
  REPProfile: REPProfileTableSchema,
  // ... (More exports)
  
  // Cache
  WriteThroughCache,
  
  // Hydration
  defaultHydrationScript,
};
```

---

## Packages - @fated/event-store

```typescript:packages/@fated/event-store/src/index.ts
/**
 * @fated/event-store - Materialized State with Replay-on-Write Engine
 * Chapter 6: Technical Architecture
 * 
 * This is the "Truth Engine" - an event-sourced system where 
 * state is derived from an immutable event stream.
 */

import { z } from 'zod';
import {
  ContributionSchema,
  ExecutionBondSchema,
  UserSchema,
  SquadSchema,
  type Contribution,
  type ExecutionBond,
  type User,
  type Squad,
  type UserId,
} from '@fated/types';

// ============================================
// EVENT TYPES
// ============================================

export const EventTypeSchema = z.enum([
  'USER_CREATED',
  'USER_STATE_CHANGED',
  'VISIBILITY_CHANGED',
  'CONTRIBUTION_LOGGED',
  'CONTRIBUTION_VERIFIED',
  'REP_EARNED',
  'REP_DECAYED',
  'TRUST_CALCULATED',
  'SQUAD_CREATED',
  'SQUAD_MEMBER_JOINED',
  'SQUAD_MEMBER_LEFT',
  'BOND_CREATED',
  'BOND_COMPLETED',
  'BOND_FORFEITED',
]);
export type EventType = z.infer<typeof EventTypeSchema>;

// ============================================
// CORE EVENT STRUCTURE
// ============================================

export const BaseEventSchema = z.object({
  id: z.string().uuid(),
  type: EventTypeSchema,
  timestamp: z.date(),
  actorId: z.string().uuid(),  // User who triggered the event
  correlationId: z.string().uuid().optional(),  // For tracing related events
});
export type BaseEvent = z.infer<typeof BaseEventSchema>;

// ... (Full implementation with payload schemas)

// ============================================
// EVENT STORE INTERFACE
// ============================================

export interface EventStore {
  /**
   * Append a new event to the stream
   * This is the "Write" in "Replay-on-Write"
   */
  append(event: Event): Promise<void>;
  
  /**
   * Get all events for a specific aggregate (user, squad, etc.)
   */
  getEventsForAggregate(aggregateId: string): Promise<Event[]>;
  
  /**
   * Replay events to derive current state
   * This is the "Replay" in "Replay-on-Write"
   */
  replay<T>(aggregateId: string, reducer: EventReducer<T>): Promise<T>;
  
  /**
   * Get events by type
   */
  getEventsByType(type: EventType, since?: Date): Promise<Event[]>;
  
  /**
   * Get events in time range
   */
  getEventsInRange(start: Date, end: Date): Promise<Event[]>;
}

export type EventReducer<T> = (state: T, event: Event) => T;

// ============================================
// EXPORTS
// ============================================

export const EventStoreLib = {
  EventType: EventTypeSchema,
  Event: EventSchema,
  BaseEvent: BaseEventSchema,
  // ... (More exports)
};
```

---

## Packages - @fated/matchmaker

```typescript:packages/@fated/matchmaker/src/index.ts
/**
 * @fated/matchmaker - Execution Squad Matching Engine
 * Chapter 4: Execution Squad
 * 
 * Matches users into teams based on trust scores,
 * skill axes, and availability.
 */

import { z } from 'zod';

// ============================================
// MATCHING CRITERIA
// ============================================

export const MatchingCriteriaSchema = z.object({
  requiredAxes: z.array(z.string()),
  preferredAxes: z.array(z.string()),
  minTrustScore: z.number().min(0).max(100).default(0),
  rolesNeeded: z.array(z.enum(['LEAD', 'ENGINEER', 'AUDITOR', 'COORDINATOR', 'MENTOR', 'SPONSOR'])),
  maxTeamSize: z.number().int().min(2).max(10).default(5),
});
export type MatchingCriteria = z.infer<typeof MatchingCriteriaSchema>;

// ============================================
// MATCHING ALGORITHM
// ============================================

/**
 * Calculate skill match score between user and criteria
 */
function calculateSkillMatch(
  userProfile: UserREPProfile,
  criteria: MatchingCriteria
): number {
  // ... (Full implementation)
}

/**
 * Calculate trust match score
 */
function calculateTrustMatch(
  trustScore: number,
  criteria: MatchingCriteria
): number {
  // ... (Full implementation)
}

/**
 * Calculate overall match score
 */
export function calculateMatchScore(
  userProfile: UserREPProfile,
  trustScore: number,
  criteria: MatchingCriteria
): number {
  // ... (Full implementation)
}

/**
 * Find best matches for criteria
 */
export function findMatches(
  candidates: Array<{
    userId: UserId;
    profile: UserREPProfile;
    trustScore: number;
  }>,
  criteria: MatchingCriteria
): Array<{
  userId: UserId;
  score: number;
  skillMatch: number;
  trustMatch: number;
}> {
  // ... (Full implementation)
}

/**
 * Form an Execution Squad from matched candidates
 */
export function formSquad(
  matches: Array<{
    userId: UserId;
    score: number;
    skillMatch: number;
    trustMatch: number;
  }>,
  criteria: MatchingCriteria,
  squadName: string
): Squad {
  // ... (Full implementation)
}

/**
 * Calculate squad trust score based on member trust
 * Uses Chapter 2 Trust Gradient: high-trust members boost squad
 */
export function calculateSquadTrust(
  memberTrustScores: number[]
): number {
  // ... (Full implementation)
}

// ============================================
// EXPORTS
// ============================================

export const MatchmakerLib = {
  MatchingCriteria: MatchingCriteriaSchema,
  
  // Core matching
  calculateMatchScore,
  calculateSkillMatch,
  calculateTrustMatch,
  findMatches,
  formSquad,
  
  // Trust calculation
  calculateSquadTrust,
};
```

---

## Packages - @fated/types

```typescript:packages/@fated/types/src/index.ts
/**
 * @fated/types - Zod schemas and type definitions for FatedFortress
 * Chapter 6: Technical Architecture
 * Chapter 3: REP System
 */

import { z } from 'zod';

// ============================================
// USER & IDENTITY
// ============================================

export const UserIdSchema = z.string().uuid();
export type UserId = z.infer<typeof UserIdSchema>;

export const PseudonymSchema = z.object({
  id: UserIdSchema,
  name: z.string().min(1).max(50),
  createdAt: z.date(),
});
export type Pseudonym = z.infer<typeof PseudonymSchema>;

export const VisibilityModeSchema = z.enum(['ANON', 'OFF']);
export type VisibilityMode = z.infer<typeof VisibilityModeSchema>;

export const UserStateSchema = z.enum([
  'VISITOR',      // Initial browsing state
  'PASSIVE',      // Created account, no contributions
  'ACTIVE',       // Primary contributing state
  'PROJECT',       // Scoped to specific projects
  'TRUSTED',      // Earned through sustained contribution
]);
export type UserState = z.infer<typeof UserStateSchema>;

export const UserSchema = z.object({
  id: UserIdSchema,
  primaryPseudonymId: UserIdSchema,
  realName: z.string().optional(), // Only visible in OFF mode
  visibilityMode: VisibilityModeSchema,
  state: UserStateSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type User = z.infer<typeof UserSchema>;

// ============================================
// REP (REPUTATION) SYSTEM
// ============================================

export const REP_AXIS_TECHNICAL = [
  'BACKEND',
  'FRONTEND',
  'DEVOPS',
  'DATA_ENGINEERING',
  'SECURITY',
  'MOBILE',
] as const;

export const REP_AXIS_PROCESS = [
  'PROJECT_MANAGEMENT',
  'QUALITY_ASSURANCE',
  'DOCUMENTATION',
] as const;

export const REP_AXIS_COLLABORATION = [
  'TECHNICAL_LEADERSHIP',
  'CROSS_FUNCTIONAL',
  'COMMUNITY_BUILDING',
] as const

export const REP_AXIS_ENABLEMENT = [
  'PATRONAGE',
  'MENTORSHIP',
  'EVANGELISM',
] as const;

export type REPTechnicalAxis = typeof REP_AXIS_TECHNICAL[number];
export type REPProcessAxis = typeof REP_AXIS_PROCESS[number];
export type REPCollaborationAxis = typeof REP_AXIS_COLLABORATION[number];
export type REPEnablementAxis = typeof REP_AXIS_ENABLEMENT[number];

export type REPAxis = REPTechnicalAxis | REPProcessAxis | REPCollaborationAxis | REPEnablementAxis;

// ... (More type definitions in full file)

// ============================================
// EXPORT ALL SCHEMAS
// ============================================

export const AllSchemas = {
  UserId: UserIdSchema,
  User: UserSchema,
  // ... (More exports)
};
```

---

## Packages - @fated/verifier

```typescript:packages/@fated/verifier/src/index.ts
/**
 * @fated/verifier - Contribution Verification Logic
 * Chapter 2: Core Philosophy (Telemetry as Truth)
 * Chapter 3: REP System
 * 
 * The verifier validates contributions and determines
 * verification levels based on telemetry.
 */

import { z } from 'zod';
import {
  VerificationLevelSchema,
  ContributionSchema,
  type Contribution,
  type UserId,
} from '@fated/types';

// ============================================
// VERIFICATION RULES
// ============================================

/**
 * Verification Level Rules
 * Chapter 3: Determines how much REP a contribution earns
 */
export const VERIFICATION_RULES = {
  NONE: {
    requires: [],
    autoApprove: false,
    decayHours: null,
  },
  AUTOMATED: {
    requires: ['CI_PASSED', 'LINT_PASSED', 'TESTS_PASSED'],
    autoApprove: true,
    decayHours: null,
  },
  PEER_REVIEW: {
    requires: ['APPROVED_BY', 'CI_PASSED'],
    autoApprove: false,
    decayHours: 72, // 3 days to review
  },
  STAKEHOLDER_APPROVAL: {
    requires: ['PROJECT_LEAD_SIGNOFF', 'PEER_REVIEW', 'CI_PASSED'],
    autoApprove: false,
    decayHours: 168, // 1 week for stakeholder
  },
} as const;

// ============================================
// TELEMETRY VERIFICATION
// ============================================

/**
 * Telemetry Evidence Types
 * Chapter 2: Telemetry as Truth
 */
export const TELEMETRY_EVIDENCE = {
  CI_PASSED: 'continuous_integration',
  LINT_PASSED: 'code_quality',
  TESTS_PASSED: 'test_coverage',
  DEPLOY_SUCCESS: 'deployment',
  UPTIME_METRIC: 'availability',
  RESPONSE_TIME: 'performance',
} as const;

// ============================================
// VERIFICATION DECISION
// ============================================

export const VerificationDecisionSchema = z.object({
  contributionId: z.string().uuid(),
  level: VerificationLevelSchema,
  approved: z.boolean(),
  evidence: z.record(z.boolean()),  // What checks passed
  verifierId: z.string().uuid().optional(),
  verifiedAt: z.date(),
  reason: z.string().optional(),
});
export type VerificationDecision = z.infer<typeof VerificationDecisionSchema>;

// ============================================
// VERIFICATION ENGINE
// ============================================

export interface TelemetryData {
  ciPassed?: boolean;
  lintPassed?: boolean;
  testsPassed?: boolean;
  deploySuccess?: boolean;
  uptimeMetric?: number;      // Percentage
  responseTime?: number;      // Milliseconds
  approvedBy?: string[];      // User IDs who approved
  projectLeadSignoff?: boolean;
}

/**
 * Determine verification level based on telemetry
 * This is the core "Telemetry as Truth" logic
 */
export function determineVerificationLevel(
  contribution: Contribution,
  telemetry: TelemetryData
): VerificationDecision {
  // ... (Full implementation)
}

/**
 * Calculate verification decay
 * If verification isn't confirmed within time limit, it expires
 */
export function calculateVerificationDecay(
  decision: VerificationDecision
): { shouldDecay: boolean; newLevel: z.infer<typeof VerificationLevelSchema> } {
  // ... (Full implementation)
}

/**
 * Verify a contribution end-to-end
 */
export function verifyContribution(
  contribution: Contribution,
  telemetry: TelemetryData,
  manualVerifierId?: UserId
): VerificationDecision {
  // ... (Full implementation)
}

/**
 * Calculate execution reliability from verification history
 */
export function calculateExecutionReliability(
  verificationHistory: VerificationDecision[]
): number {
  // ... (Full implementation)
}

// ============================================
// EXPORTS
// ============================================

export const VerifierLib = {
  VERIFICATION_RULES,
  TELEMETRY_EVIDENCE,
  VerificationDecision: VerificationDecisionSchema,
  
  // Core functions
  determineVerificationLevel,
  calculateVerificationDecay,
  verifyContribution,
  calculateExecutionReliability,
};
```

---

## Packages - @fated/xp-logic

```typescript:packages/@fated/xp-logic/src/index.ts
/**
 * @fated/xp-logic - Trust Gradient & REP Calculation Engine
 * Chapter 2: Core Philosophy (Telemetry as Truth)
 * Chapter 3: Trust Gradients & REP System
 */

import { z } from 'zod';
import {
  TrustComponentSchema,
  TrustScoreSchema,
  REPRecordSchema,
  UserREPProfileSchema,
  REPAmountSchema,
  type TrustComponent,
  type TrustScore,
  type REPRecord,
  type UserREPProfile,
  type UserId,
} from '@fated/types';

// ============================================
// TRUST GRADIENT CALCULATIONS
// ============================================

/**
 * Trust Gradient Weights - Chapter 2
 * These weights determine how different factors
 * contribute to the overall trust score
 */
export const TRUST_WEIGHTS = {
  executionReliability: 0.35,   // 35% - Most important
  collaborationQuality: 0.25,  // 25%
  contributionQuality: 0.25,    // 25%
  judgmentQuality: 0.15,        // 15% - Least weight
} as const;

/**
 * Calculate overall trust score from components
 * Uses weighted average formula
 */
export function calculateTrustScore(
  userId: UserId,
  components: TrustComponent
): TrustScore {
  // ... (Full implementation)
}

/**
 * Decay Rate Constants - Chapter 3
 * Passive REP decays at 3% monthly to allow for sabbaticals
 */
export const DECAY_CONFIG = {
  PASSIVE_REP_MONTHLY_RATE: 0.03,    // 3% monthly
  ACTIVE_BOND_DECAY_RATE: 0.00,      // Bonds don't decay, they slash
  GRACE_PERIOD_DAYS: 30,             // No decay in first 30 days
  MIN_TRUST_THRESHOLD: 10,           // Below this, user needs re-verification
} as const;

/**
 * Calculate REP decay for passive reputation
 * Chapter 3.5: Two-Tier System - Passive REP
 */
export function calculateREPDecay(
  record: REPRecord,
  daysSinceLastUpdate: number
): number {
  // ... (Full implementation)
}

// ============================================
// REP EARNING ALGORITHMS
// ============================================

/**
 * REP Multipliers by Verification Level
 * Higher verification = more REP earned
 */
export const REP_MULTIPLIERS = {
  NONE: 0.5,                // Self-reported, half value
  AUTOMATED: 1.0,          // CI/CD verified
  PEER_REVIEW: 1.5,        // Code review approved
  STAKEHOLDER_APPROVAL: 2.0, // Project lead verified
} as const;

/**
 * Base REP values by contribution type
 */
export const REP_BASE_VALUES = {
  CODE_COMMIT: 10,
  CODE_REVIEW: 5,
  TASK_COMPLETION: 8,
  DOCUMENTATION: 3,
  MENTORSHIP: 15,
} as const;

/**
 * Calculate REP earned from a contribution
 */
export function calculateREPEarned(
  contributionType: keyof typeof REP_BASE_VALUES,
  verificationLevel: keyof typeof REP_MULTIPLIERS,
  axisMultiplier: number = 1.0
): number {
  // ... (Full implementation)
}

// ============================================
// TRUST GRADIENTS - NETWORK EFFECTS
// ============================================

/**
 * Trust Gradient: How trust propagates through networks
 * Chapter 2: Trust Gradients
 * 
 * When you work with high-trust users, your trust grows faster
 * When you work with low-trust users, your trust grows slower
 */
export const TRUST_GRADIENT_CONFIG = {
  HIGH_TRUST_PARTNER_BOOST: 1.5,    // Work with trusted users = 50% boost
  LOW_TRUST_PARTNER_PENALTY: 0.5,   // Work with new users = 50% penalty
  HIGH_TRUST_THRESHOLD: 75,         // Above this = high trust
  LOW_TRUST_THRESHOLD: 25,          // Below this = low trust
} as const;

/**
 * Apply trust gradient to REP calculation
 */
export function applyTrustGradient(
  baseREP: number,
  partnerTrustScore: number
): number {
  // ... (Full implementation)
}

// ============================================
// EXPORTS
// ============================================

export const XPLogic = {
  // Trust calculations
  calculateTrustScore,
  calculateTrustDecay,
  calculateTrustScoreSchema: TrustScoreSchema,
  
  // REP calculations
  calculateREPDecay,
  calculateREPEarned,
  processREPProfile,
  applyTrustGradient,
  
  // Config exports
  TRUST_WEIGHTS,
  DECAY_CONFIG,
  REP_MULTIPLIERS,
  REP_BASE_VALUES,
  TRUST_GRADIENT_CONFIG,
};
```

---

## CLI - Python

```python:cli/fortress_cli.py
#!/usr/bin/env python3
"""
Fated Fortress CLI
Command-line interface for the Fortress Guild

Usage:
    fortress --help
    fortress status
    fortress quests list
    fortress quests create <title>
    fortress squads list
    fortress leaderboard
    fortress submit --quest-id <id> --content <content>
    fortress verify --quest-id <id>
"""

import argparse
import sys
import os
import json
import subprocess
from datetime import datetime
from pathlib import Path

# ANSI colors
class Colors:
    RESET = '\033[0m'
    BOLD = '\033[1m'
    DIM = '\033[2m'
    
    # Light theme colors (matching website)
    BG_PRIMARY = '\033[47m'
    TEXT_PRIMARY = '\033[34m'
    TEXT_SECONDARY = '\033[90m'
    ACCENT_GOLD = '\033[33m'
    ACCENT_WARM = '\033[38;5;130m'
    SUCCESS = '\033[32m'
    WARNING = '\033[38;5;130m'
    ERROR = '\033[31m'
    
    # Special
    BORDER = '\033[90m'
    HIGHTLIGHT = '\033[46m'

# Configuration
CONFIG_DIR = Path.home() / '.fortress'
CONFIG_FILE = CONFIG_DIR / 'config.json'
DATA_DIR = Path.home() / '.fortress' / 'data'

# ASCII Art
FORTRESS_ASCII = f"""
{Colors.ACCENT_GOLD}
    ╔═══════════════════════════════════════════════════════════╗
    ║  {Colors.BOLD}██╗   ██╗ ██████╗ ██╗██████╗     ███████╗██╗  ██╗ ██████╗ ██████╗ {Colors.RESET}{Colors.ACCENT_GOLD}║
    ║  {Colors.BOLD}██║   ██║██╔═══██╗██║██╔══██╗    ██╔════╝██║  ██║██╔═══██╗██╔══██╗{Colors.RESET}{Colors.ACCENT_GOLD} ║
    ║  {Colors.BOLD}██║   ██║██║   ██║██║██║  ██║    ███████╗███████║██║   ██║██████╔╝{Colors.RESET}{Colors.ACCENT_GOLD} ║
    ║  {Colors.BOLD}╚██╗ ██╔╝██║   ██║██║██║  ██║    ╚════██║██╔══██║██║   ██║██╔══██╗{Colors.RESET}{Colors.ACCENT_GOLD} ║
    ║   {Colors.BOLD}╚████╔╝ ╚██████╔╝██║██████╔╝    ███████║██║  ██║╚██████╔╝██║  ██║{Colors.RESET}{Colors.ACCENT_GOLD} ║
    ║    {Colors.BOLD}╚═══╝   ╚═════╝ ╚═╝╚═════╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝{Colors.RESET}{Colors.ACCENT_GOLD} ║
    ╚═══════════════════════════════════════════════════════════╝
{Colors.RESET}
"""

DIVIDER = f"{Colors.BORDER}{'─' * 60}{Colors.RESET}"


def ensure_config():
    """Ensure config directory and files exist"""
    CONFIG_DIR.mkdir(exist_ok=True)
    DATA_DIR.mkdir(exist_ok=True)
    
    if not CONFIG_FILE.exists():
        config = {
            "user": {
                "id": None,
                "name": None,
                "squad": None
            },
            "api": {
                "endpoint": "http://localhost:3000",
                "key": None
            },
            "theme": "light"
        }
        CONFIG_FILE.write_text(json.dumps(config, indent=2))
    
    return json.loads(CONFIG_FILE.read_text())


def save_config(config):
    """Save configuration"""
    CONFIG_FILE.write_text(json.dumps(config, indent=2))


def cmd_status(args):
    """Show fortress status"""
    config = ensure_config()
    
    print(FORTRESS_ASCII)
    print(f"{Colors.BOLD}⚔ FATED FORTRESS CLI{Colors.RESET} | {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(DIVIDER)
    
    # Show connection status
    print(f"\n{Colors.BOLD}Connection Status:{Colors.RESET}")
    print(f"  Endpoint: {config['api']['endpoint']}")
    print(f"  Theme:    {config['theme'].upper()}")
    
    # User info
    print(f"\n{Colors.BOLD}User:{Colors.RESET}")
    if config['user']['name']:
        print(f"  Name:   {config['user']['name']}")
        print(f"  Squad:  {config['user']['squad'] or 'None'}")
    else:
        print(f"  {Colors.WARNING}Not logged in - run 'fortress login'{Colors.RESET}")
    
    # Stats (mock for now)
    print(f"\n{Colors.BOLD}Fortress Stats:{Colors.RESET}")
    print(f"  🏰 Builders:  {Colors.ACCENT_GOLD}32{Colors.RESET}")
    print(f"  📜 Quests:    {Colors.ACCENT_GOLD}14{Colors.RESET}")
    print(f"  ⚔ REP:       {Colors.ACCENT_GOLD}634{Colors.RESET}")
    print(f"  ✅ Verify:    {Colors.ACCENT_GOLD}61%{Colors.RESET}")
    
    print(f"\n{Colors.BOLD}Quick Actions:{Colors.RESET}")
    print(f"  fortress quests list    - View all quests")
    print(f"  fortress squads list    - View all squads")
    print(f"  fortress leaderboard    - View top builders")
    print(f"  fortress quests create  - Create new quest")
    print()


def cmd_quests(args):
    """Quest management commands"""
    # ... (Full implementation - see cli/fortress_cli.py)


def cmd_squads(args):
    """Squad management commands"""
    # ... (Full implementation)


def cmd_leaderboard(args):
    """Show leaderboard"""
    # ... (Full implementation)


def cmd_submit(args):
    """Submit work for a quest"""
    # ... (Full implementation)


def cmd_verify(args):
    """Verify a submission"""
    # ... (Full implementation)


def cmd_login(args):
    """Login to fortress"""
    # ... (Full implementation)


def main():
    parser = argparse.ArgumentParser(
        description=f"{Colors.BOLD}⚔ Fated Fortress CLI{Colors.RESET} - Manage your guild from the command line",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  fortress status                    Show fortress status
  fortress quests list               List all quests
  fortress quests create --title "Build API" --domain BACKEND
  fortress squads list               List all squads
  fortress leaderboard               Show top builders
  fortress submit --quest-id Q-001 --content "Implemented auth"
  fortress verify --quest-id Q-001
  fortress login --name "YourName"
        """
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # Status command
    subparsers.add_parser('status', help='Show fortress status')
    
    # Quests command
    quest_parser = subparsers.add_parser('quests', help='Quest management')
    quest_sub = quest_parser.add_subparsers(dest='quest_action')
    
    quest_list = quest_sub.add_parser('list', help='List all quests')
    
    quest_create = quest_sub.add_parser('create', help='Create new quest')
    quest_create.add_argument('--title', required=True, help='Quest title')
    quest_create.add_argument('--domain', choices=['BACKEND', 'FRONTEND', 'DEVOPS'], default='BACKEND')
    quest_create.add_argument('--bond', type=int, default=25, help='Bond amount')
    
    quest_show = quest_sub.add_parser('show', help='Show quest details')
    quest_show.add_argument('quest_id', help='Quest ID')
    
    # Squads command
    squads_parser = subparsers.add_parser('squads', help='Squad management')
    squads_sub = squads_parser.add_subparsers(dest='squad_action')
    squads_sub.add_parser('list', help='List all squads')
    
    # Leaderboard
    subparsers.add_parser('leaderboard', help='Show leaderboard')
    
    # Submit
    submit_parser = subparsers.add_parser('submit', help='Submit work')
    submit_parser.add_argument('--quest-id', required=True, help='Quest ID')
    submit_parser.add_argument('--content', required=True, help='Submission content')
    
    # Verify
    verify_parser = subparsers.add_parser('verify', help='Verify a quest')
    verify_parser.add_argument('--quest-id', required=True, help='Quest ID')
    
    # Login
    login_parser = subparsers.add_parser('login', help='Login to fortress')
    login_parser.add_argument('--name', help='Your name')
    
    args = parser.parse_args()
    
    if not args.command:
        # Show status by default
        cmd_status(args)
        return
    
    # Route commands
    if args.command == 'status':
        cmd_status(args)
    elif args.command == 'quests':
        cmd_quests(args)
    elif args.command == 'squads':
        cmd_squads(args)
    elif args.command == 'leaderboard':
        cmd_leaderboard(args)
    elif args.command == 'submit':
        cmd_submit(args)
    elif args.command == 'verify':
        cmd_verify(args)
    elif args.command == 'login':
        cmd_login(args)
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
```

---

## Database Schema (Prisma)

```prisma:packages/db/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Event {
  id               String   @id @default(uuid())
  actorId          String   // Denormalized for efficient queries
  streamId         String
  timestamp        DateTime
  type             String
  payload          String   // JSON string
  metadata         String?  // JSON string (optional)
  createdAt        DateTime @default(now())

  @@index([actorId, timestamp(sort: Desc)])
}

model ActorState {
  actorId          String   @id
  currentRep      Float    @default(0)   // Liquid REP (available to use)
  stakedRep       Float    @default(0)   // Locked REP (currently staked)
  currentXp        Int      @default(0)
  pendingXp        Int      @default(0)
  contributions    Int      @default(0)
  decayRate        Float    @default(0.0)
  lastActivity     DateTime?
  lastUpdated      DateTime @default(now())
  roleHistory      String   @default("[]") // JSON string
  successRate      String   @default("{}")  // JSON: { BACKEND: 0.85, FRONTEND: 0.72 }
  
  // Relations for staking
  stakes          Stake[]
  ticketsClaimed  Ticket[] @relation("ClaimedTickets")
}

model Project {
  id          String   @id @default(uuid())
  name        String
  domain      String   // BACKEND, FRONTEND, etc.
  status      String   @default("OPEN") // OPEN, ACTIVE, COMPLETED
  squadIds    String   // JSON array of UserIds
  createdAt   DateTime @default(now())
  completedAt DateTime?
  evaluations Evaluation[] @relation("ProjectEvaluations")

  @@index([status])
}

model Evaluation {
  id          String   @id @default(uuid())
  projectId   String
  userId      String   // Who is being evaluated
  score       Float    // 0.0 to 1.0 success rate
  feedback    String?
  createdAt   DateTime @default(now())
  project     Project  @relation("ProjectEvaluations", fields: [projectId], references: [id])

  @@unique([projectId, userId]) // Prevent duplicate evaluations per project per user
}

// ============================================
// BONDING CURVE / STAKING MODELS
// ============================================

model Stake {
  id          String    @id @default(uuid())
  actorId     String
  amount      Float
  ticketId    String?   @unique  // Link to ticket if this stake is for claiming
  createdAt   DateTime  @default(now())
  releasedAt  DateTime? // When stake was returned
  status      String    @default("ACTIVE") // ACTIVE, RELEASED, FORFEITED
  
  // Relations
  actor       ActorState @relation(fields: [actorId], references: [actorId])
  ticket      Ticket?    @relation(fields: [ticketId], references: [id])

  @@index([actorId, status])
}

model Ticket {
  id            String    @id @default(uuid())
  workPackageId String    // Reference to project/task ID
  title         String
  description   String?
  bondRequired  Float     // REP required to claim
  claimedBy     String?
  claimedAt     DateTime?
  deadline      DateTime  // When the work is due
  completedAt   DateTime?
  status        String    @default("OPEN") // OPEN, CLAIMED, COMPLETED, FORFEITED, CANCELLED
  
  // Relations
  actor         ActorState? @relation("ClaimedTickets", fields: [claimedBy], references: [actorId])
  stake         Stake?

  @@index([claimedBy, status])
  @@index([status, deadline])
}
```

---

## Legacy - XP Logic Backup

```typescript:legacy/backups/xp-logic/src/index.ts
import { AppEvent } from '@fated/events';
import { Specialty, UserId } from '@fated/types';

export type XpVector = {
  totalXP: number;
  pendingXP: number;
  execution: number;      // From BUILDER actions
  collaboration: number;  // From ARCHITECT actions
  judgment: number;       // From GUARDIAN actions
  roleHistory: Record<string, Record<string, number>>; // { BUILDER: { BACKEND: 15 } }
  successRate: Record<string, number>; // { BACKEND: 0.85, FRONTEND: 0.72 }
  lastActivity: Date | null;
};

// Internal tracking for running average calculation
type RunningAverage = { total: number; count: number };

export type SystemState = Record<UserId, XpVector>;

// Type guards for discriminated union
const isContribution = (event: AppEvent): event is Extract<AppEvent, { type: 'CONTRIBUTION_SUBMITTED' }> => {
  return event.type === 'CONTRIBUTION_SUBMITTED';
};

const isVerification = (event: AppEvent): event is Extract<AppEvent, { type: 'VERIFICATION_SUBMITTED' }> => {
  return event.type === 'VERIFICATION_SUBMITTED';
};

export const calculateState = (events: AppEvent[], now: Date = new Date()): SystemState => {
  const state: SystemState = {};

  const contributions: Record<string, { userId: UserId; xpValue: number; approved: boolean }> = {};
  const projectDomains: Record<string, string> = {}; // projectId -> domain
  const successTracking: Record<string, Record<string, RunningAverage>> = {}; // userId -> domain -> { total, count }

  const initUser = (uid: string) => {
    const id = uid as UserId;
    if (!state[id]) state[id] = {
      totalXP: 0,
      pendingXP: 0,
      execution: 0,
      collaboration: 0,
      judgment: 0,
      roleHistory: {},
      successRate: {},
      lastActivity: null
    };
    // Initialize success tracking for this user
    if (!successTracking[id]) {
      successTracking[id] = {};
    }
    return id;
  };

  for (const event of events) {
    if (isContribution(event)) {
      const uid = initUser(event.payload.userId);
      const xpValue = 10 + (event.payload.complexityScore ?? 0);
      const role = 'BUILDER';
      const specialty = event.payload.specialty || 'RESEARCH';

      contributions[event.id] = { userId: uid, xpValue, approved: false };
      state[uid].pendingXP += xpValue;
      state[uid].execution += xpValue;

      // Track roleHistory: { BUILDER: { BACKEND: 15 } }
      if (!state[uid].roleHistory[role]) state[uid].roleHistory[role] = {};
      if (!state[uid].roleHistory[role][specialty]) state[uid].roleHistory[role][specialty] = 0;
      state[uid].roleHistory[role][specialty] += 1;

      if (!state[uid].lastActivity || event.timestamp > state[uid].lastActivity!) {
        state[uid].lastActivity = event.timestamp;
      }
    }

    if (isVerification(event)) {
      const work = contributions[event.payload.targetContributionId];
      if (work && !work.approved && event.payload.verdict === 'APPROVE') {
        work.approved = true;
        state[work.userId].pendingXP -= work.xpValue;
        state[work.userId].totalXP += work.xpValue;

        const verifierId = initUser(event.payload.verifierId);
        state[verifierId].totalXP += 2;
        state[verifierId].judgment += 2;
        if (!state[verifierId].lastActivity || event.timestamp > state[verifierId].lastActivity!) {
          state[verifierId].lastActivity = event.timestamp;
        }
      }
    }

    // Track project domains from PROJECT_CREATED events
    if (event.type === 'PROJECT_CREATED') {
      const payload = event.payload;
      projectDomains[payload.projectId] = payload.domain;
    }

    // Update success rates from PROJECT_COMPLETED events
    if (event.type === 'PROJECT_COMPLETED') {
      const payload = event.payload;
      const domain = projectDomains[payload.projectId];

      for (const evaluation of payload.evaluations) {
        const userId = evaluation.userId;
        initUser(userId);

        // Initialize domain tracking if needed
        if (domain && !successTracking[userId][domain]) {
          successTracking[userId][domain] = { total: 0, count: 0 };
        }

        // Update running average for this domain
        if (domain) {
          const tracking = successTracking[userId][domain];
          tracking.total += evaluation.score;
          tracking.count += 1;
          const uid = userId as UserId;
          state[uid].successRate[domain] = tracking.total / tracking.count;
        }
      }
    }
  }

  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  for (const userId in state) {
    const user = state[userId as UserId];
    if (!user.lastActivity) continue;

    const daysInactive = (now.getTime() - user.lastActivity.getTime()) / MS_PER_DAY;

    if (daysInactive > 30) {
      const monthsInactive = Math.floor((daysInactive - 30) / 30);
      if (monthsInactive > 0) {
        const decayFactor = Math.pow(0.95, monthsInactive);
        user.totalXP = Math.floor(user.totalXP * decayFactor);
      }
    }
  }

  return state;
};
```

---

## End of Source Code

> Total: 32 source files combined
> Languages: TypeScript (30), Python (1), Prisma (1)
