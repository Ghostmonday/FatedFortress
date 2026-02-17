# The Void

### *Sovereign Telemetry-Verified Talent Marketplace*

---

## Abstract

The Void implements a cryptoeconomic reputation protocol designed to replace self-reported credentials with behaviorally-verified competency assertions. The system leverages event-sourced state machines, distributed locking mechanisms, and temporal decay functions to establish an immutable, multi-dimensional XP profile that serves as the sole source of truth for professional capability assessment.

---

## Architectural Overview

### Core Tenet
The platform operates on a fundamental postulate: **claimed reputation is non-fungible noise; demonstrated competence is verifiable signal.** Every action constitutes an append-only event, enabling complete auditability and mathematical reconstruction of any actor's competency profile.

---

## Implemented Subsystems

### 1. Domain-Bonding Protocol (Staking Mechanism)

A collateralized commitment system wherein actors lock Reputation Points (REP) as economic skin-in-the-game when claiming tickets.

**State Transitions:**
- **ACTIVE** → **RELEASED**: On-time completion yields stake return + XP bounty
- **ACTIVE** → **RELEASED** (late): Proportional XP reduction
- **ACTIVE** → **FORFEITED**: Deadline miss triggers slash operation

The protocol enforces **economic finality** — once a stake enters FORFEITED state, the REP is irrevocably burned from the actor's liquid balance.

### 2. The Reaper (Automated Slash Orchestrator)

A cron-based enforcement daemon implementing:

- **Distributed Locking**: Redis-based mutex ensures single-instance execution across multi-server deployments
- **Batch Processing with Time Budgeting**: Prevents O(n) blocking on large overdue ticket sets
- **Lazy Enforcement**: Deadline validation at interaction-time mitigates downtime exploitation vectors
- **Observability**: Structured logging with run IDs and heartbeat telemetry

The Reaper operates on a configurable interval (default: 5 minutes) and executes proportional slashing (configurable percentage) on detected FORFEITED stakes.

### 3. Temporal XP Decay Engine

All experience points are subjected to exponential time-decay:

```
Xp_effective = Xp_initial × e^(-λ × Δt)
```

Where λ represents the actor-specific decay coefficient. This ensures profiles represent **current** capability rather than historical artifacts — a 2019 contribution carries negligible weight versus Q1 2024 output.

### 4. Multi-Vector Matchmaking Algorithm

The team formation engine ingests:

- Domain expertise tensors across N axes
- Collaboration coefficient matrices (derived from historical co-contributions)
- Resource availability vectors
- Trust gradient graphs (voucher-weighted directed edges)

Output: Optimized team composition minimizing expected project failure probability.

### 5. Event Sourcing Foundation

Every state mutation is codified as an immutable Event:

```
Event { id, actorId, type, payload, timestamp }
```

This enables:
- Full state reconstruction via fold operations
- Temporal queries (actor state at T-1)
- Fraud-resistant audit trails

### 6. GitHub Webhook Integration

The `/webhooks/github` endpoint ingests push, PR, and review events, automatically populating contributor profiles via webhook signature verification.

---

## Technical Infrastructure

### Runtime Environment
- **Runtime**: Node.js 20+ (event-driven non-blocking I/O)
- **Language**: TypeScript (strict mode, full type coverage)
- **Package Manager**: pnpm workspaces (monorepo hoisting)
- **Build Orchestration**: Turborepo (caching, parallelization)

### Application Layer
- **API Gateway**: Fastify (low-overhead, schema-validated)
- **Database**: SQLite via Prisma ORM (type-safe migrations)
- **Validation**: Zod (runtime schema inference)
- **Testing**: Vitest (snapshot-based, parallel execution)

### Presentation Layer
- **Frontend**: Next.js (React SSR/SSG framework)

---

## Monorepo Topology

```
thevoid/
├── apps/
│   ├── api/           # Fastify REST gateway (port 3000)
│   ├── web/           # Next.js frontend
│   ├── server/        # Entry point
│   └── swarm/        # Economic simulation/stress testing
├── packages/
│   ├── @fated/
│   │   ├── core/           # Event schemas, DDD aggregates
│   │   ├── db/             # Prisma client, migration layer
│   │   ├── types/          # TypeScript interfaces
│   │   ├── events/         # Event store implementation
│   │   ├── domain-bonding/ # Stake state machine
│   │   ├── domain-xp/      # XP calculation, decay logic
│   │   ├── domain-matching/# Team formation algorithms
│   │   └── infra-*/       # Redis, logging, config adapters
└── scripts/           # Build automation
```

---

## Data Model (Prisma Schema)

**ActorState**
```
actorId, currentRep, stakedRep, currentXp, decayRate
```

**Stake**
```
id, actorId, amount, ticketId, status (ACTIVE|RELEASED|FORFEITED)
```

**Ticket**
```
id, title, bondRequired, claimedBy, status (OPEN|CLAIMED|COMPLETED|FORFEITED), deadline
```

**Event**
```
id, actorId, type, payload (JSON), timestamp
```

---

## API Surface

### Staking
- `POST /stake` — Lock REP
- `POST /unstake` — Release stake

### Task Management
- `POST /ticket` — Create ticket
- `POST /claim` — Claim + auto-stake
- `POST /complete` — Verify completion (triggers lazy slash if overdue)

### Analytics
- `GET /leaderboard` — Top contributors
- `GET /analytics/summary` — System metrics
- `GET /analytics/leaderboard/rep` — REP rankings

### Events
- `POST /contribute` — Record contribution
- `POST /verify` — Verify contribution

### Integration
- `POST /webhooks/github` — GitHub event ingestion

### Administration
- `POST /admin/reaper` — Trigger Reaper execution
- `GET /admin/reaper/status` — Reaper health
- `POST /admin/sim/stress` — Load injection
- `DELETE /admin/sim/reset` — State reset

---

## Configuration

| Variable | Purpose | Default |
|----------|---------|---------|
| `DATABASE_URL` | SQLite path | `file:./dev.db` |
| `PORT` | API port | `3000` |
| `REDIS_URL` | Lock backend | `redis://localhost:6379` |
| `REAPER_INTERVAL_MS` | Execution interval | `300000` |
| `REAPER_SLASH_PERCENT` | Slash rate | `0.5` |

---

## Operational Commands

```bash
pnpm install
pnpm prisma generate
pnpm dev
pnpm test --coverage
```

---

## Thesis

The professional labor market suffers from information asymmetry: credentials are theater, resumes are creative writing, and claimed expertise is non-verifiable. The Void eliminates this asymmetry through behavioral telemetry, economic stake mechanisms, and mathematically-enforced temporal relevance. Reputation is no longer claimed — it is computed.

---

*Everything is observed. Everything is recorded. Everything decays.*

