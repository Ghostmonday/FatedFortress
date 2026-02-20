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

- Domain expertise tensors across N axes (BACKEND, FRONTEND, DEVOPS, SECURITY, RESEARCH)
- Role-based XP vectors (BUILDER, ARCHITECT, GUARDIAN)
- Collaboration coefficient matrices (derived from historical co-contributions)
- Success rate tracking per domain
- Trust gradient graphs (voucher-weighted directed edges)

**Party Roles:**
- **ARCHITECT** — Collaboration-focused (high `collaboration` XP)
- **GUARDIAN** — Judgment-focused (high `judgment` XP)
- **BUILDER** — Execution-focused (high `execution` XP)

**Scoring Formula:**
```
effectiveScore = baseScore
               × (role === targetRole ? 1.5 : 1.0)
               × (hasSpecialty ? 1.5 : 1.0)
               × (1 + (successRate[domain] × 0.5))
```

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
fatedfortress/
├── apps/
│   ├── web/            # Next.js frontend
│   ├── server/         # Entry point / server
│   └── swarm/          # Economic simulation/stress testing
├── packages/
│   ├── @fated/
│   │   ├── core/             # Event schemas, DDD aggregates
│   │   ├── db/               # Prisma client, migration layer
│   │   ├── types/            # TypeScript interfaces, branded types
│   │   ├── events/           # Event store implementation
│   │   ├── simple-api/       # Fastify REST gateway
│   │   ├── xp-logic/         # XP calculation, decay logic
│   │   ├── matchmaker/       # Team formation algorithms
│   │   ├── bonding/          # Stake state machine
│   │   └── infra-*/         # Redis, logging, config adapters
└── scripts/            # Build automation
```

---

## Data Model (Prisma Schema)

**ActorState**
```
actorId, currentRep, stakedRep, currentXp, pendingXp, decayRate, lastActivity, roleHistory, successRate
```

**Stake**
```
id, actorId, amount, ticketId, status (ACTIVE|RELEASED|FORFEITED), createdAt, releasedAt
```

**Ticket**
```
id, workPackageId, title, description, bondRequired, claimedBy, claimedAt, deadline, completedAt, status
```

**Event**
```
id, actorId, streamId, type, payload, metadata, timestamp
```

**Project**
```
id, name, domain, status, squadIds, createdAt, completedAt
```

**Evaluation**
```
id, projectId, userId, score, feedback, createdAt
```

---

## API Surface

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/actor` | Create actor |
| `GET` | `/actor/:actorId` | Get actor details |

### Staking
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/ticket` | Create ticket |
| `GET` | `/tickets` | List open tickets |
| `POST` | `/claim` | Claim ticket + auto-stake |
| `POST` | `/complete` | Verify completion |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/leaderboard` | Top contributors by XP |

### Administration
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/admin/mint` | Mint REP (dev only) |

### Integration
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/webhooks/github` | GitHub event ingestion |

---

## Configuration

| Variable | Purpose | Default |
|----------|---------|---------|
| `DATABASE_URL` | SQLite path | `file:./dev.db` |
| `PORT` | API port | `3000` |
| `REDIS_URL` | Lock backend | `redis://localhost:6379` |
| `REAPER_INTERVAL_MS` | Execution interval | `300000` (5 min) |
| `REAPER_SLASH_PERCENT` | Slash rate | `0.5` (50%) |

---

## Developer Setup

### Prerequisites
- Node.js 20+
- pnpm 9+
- Redis (optional, for distributed locking)

### Installation

```bash
# Clone the repository
git clone https://github.com/fatedfortress/fatedfortress.git
cd fatedfortress

# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma generate

# Push schema to database
pnpm prisma db push
```

### Running the API

```bash
# Development mode (all apps)
pnpm dev

# API only
pnpm start:api

# Frontend only
pnpm dev:web
```

### Running Tests

```bash
# Run all tests with coverage
pnpm test --coverage

# Run tests for specific package
pnpm --filter @fated/matchmaker test
```

### Building

```bash
# Build all packages and apps
pnpm build

# Build specific app
pnpm build:web
pnpm build:api
```

---

## Key Packages

### `@fated/xp-logic`
XP calculation, temporal decay, role-based XP vectors (BUILDER, ARCHITECT, GUARDIAN), success rate tracking.

### `@fated/matchmaker`
Team formation using multi-vector matchmaking. Forms optimal parties based on:
- Domain expertise (BACKEND, FRONTEND, DEVOPS, SECURITY, RESEARCH)
- Role alignment (1.5× multiplier)
- Specialty match (1.5× multiplier)
- Success rate (up to 50% bonus)

### `@fated/simple-api`
Fastify-based REST API exposing all core functionality.

### `@fated/db`
Prisma schema and database migrations for SQLite.

---

## Thesis

The professional labor market suffers from information asymmetry: credentials are theater, resumes are creative writing, and claimed expertise is non-verifiable. The Void eliminates this asymmetry through behavioral telemetry, economic stake mechanisms, and mathematically-enforced temporal relevance. Reputation is no longer claimed — it is computed.

---

*Everything is observed. Everything is recorded. Everything decays.*
