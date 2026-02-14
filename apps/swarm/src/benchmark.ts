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
