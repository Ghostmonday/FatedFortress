# The Void

### *Where Reputation Is Earned, Not Claimed*

---

## The Problem

You're a developer. You've built things. You've shipped products. You've collaborated with teams that actually delivered.

But your LinkedIn profile? It's a collection of buzzwords and inflated titles. Your resume? A creative writing exercise. Your contribution graph? Artfully gamed.

The professional world runs on a currency that's entirely fictional: *claimed* reputation. You say you're a senior engineer. I say I am too. Anyone can say anything. The whole system is theater.

Until now.

---

## The Vision

The Void is a sovereign talent marketplace that replaces the fiction of credentials with the immutable truth of behavior.

We don't care what you *say* you can do. We care about what you *actually* do. Every code review. Every merged PR. Every deadline met. Every deadline missed. Every collaboration. Every failure. Every success.

We capture it all.

Then we turn it into something undeniable: a multi-dimensional XP Profile that proves — with data, not words — exactly what you're capable of.

---

## What Makes The Void Different

| Traditional Platforms | The Void |
|---------------------|----------|
| Self-reported skills | Telemetry-verified expertise |
| Static resumes | Dynamic, live profiles |
| Connections based on who you know | Teams formed on who you've proven to be |
| Reputation that grows forever | XP that decays, keeping you honest |
| Job applications | Reputation-driven matching |

---

## The Mechanics

### Staking: Skin in the Game

When you claim a task in The Void, you don't just sign up. You *stake* your reputation. You lock your REP (reputation points) as collateral.

Here's the deal:

- **You complete on time**: Your stake returns, plus XP rewards. Everyone sees you deliver.
- **You complete late**: Partial return. Reduced XP. The system remembers.
- **You miss the deadline**: Your stake gets *slashed*. Burned. Gone. Your reputation takes a hit.

This isn't theoretical. The **Reaper** — our automated enforcement system — runs continuously, catching overdue tickets and executing the forfeiture. It's brutal, fair, and completely automated.

### The Reaper

The Reaper is the economic heartbeat of The Void. Every few minutes, it scans for tickets past their deadline and burns the associated stakes.

We've built it to handle real-world chaos:

- **Multiple servers? No problem.** Redis-based distributed locking ensures only one instance runs at a time.
- **Thousands of overdue tickets? Handled.** Batch processing with time budgets prevents the system from freezing.
- **Reaper goes down? Still covered.** Our lazy enforcement checks deadlines at interaction time too — users can't exploit downtime to skip penalties.
- **Something breaks? You'll know.** Run IDs, heartbeats, and structured logging mean debugging isn't a guessing game.

This is financial infrastructure, not a side project. We treat it accordingly.

### XP That Decays

Your code from 2019 shouldn't count as much as code you wrote last week. So it doesn't.

The Void applies time-based decay to all XP. Old contributions slowly fade. Recent work matters more. Your profile is a *current* snapshot of what you bring, not a museum of everything you've ever done.

### Team Formation: No More Lucky Guesses

Traditional teams form through resumes, interviews, and hope. The Void's matchmaker analyzes actual performance data to suggest perfect team compositions:

- Your domain expertise across multiple axes
- How well you've collaborated historically
- Your current capacity and availability
- Trust gradients — who vouches for whom, and how strongly

When The Void suggests a team, it's not guessing. It's calculating.

---

## The Stack

We built this with modern, battle-tested tools:

- **Runtime**: Node.js 20+
- **Language**: TypeScript, everywhere
- **Package Management**: pnpm workspaces
- **Build System**: Turborepo
- **API**: Fastify — fast, type-safe, extensible
- **Database**: SQLite via Prisma
- **Validation**: Zod
- **Testing**: Vitest
- **Frontend**: Next.js

---

## Project Structure

```
thevoid/
├── apps/
│   ├── api/           # The heart — Fastify REST API
│   ├── web/           # Next.js frontend
│   ├── server/        # Entry point
│   └── swarm/        # Simulation for testing economic models
├── packages/
│   ├── @fated/       # Core domain packages
│   │   ├── core/           # Event schemas, base types
│   │   ├── db/             # Prisma and database layer
│   │   ├── types/          # Shared type definitions
│   │   ├── events/         # Event sourcing foundations
│   │   ├── domain-bonding/ # Staking, tickets, forfeiture
│   │   ├── domain-xp/      # XP calculation, decay, trust
│   │   ├── domain-matching/# Team formation logic
│   │   └── infra-*/       # Infrastructure implementations
│   └── [legacy packages]
└── scripts/           # Build automation
```

---

## Getting Started

### Quick Start

```bash
# Clone and enter
git clone https://github.com/Ghostmonday/thevoid.git
cd thevoid

# Install everything
pnpm install

# Spin up Prisma
pnpm prisma generate

# Fire it up
pnpm dev
```

The API runs on `http://localhost:3000` by default.

### Environment

| Variable | What It Does | Default |
|----------|--------------|---------|
| `DATABASE_URL` | SQLite file path | `file:./dev.db` |
| `PORT` | API port | `3000` |
| `REDIS_URL` | Redis for locks | `redis://localhost:6379` |
| `REAPER_INTERVAL_MS` | How often Reaper runs | `300000` (5 min) |
| `REAPER_SLASH_PERCENT` | Slash rate on forfeiture | `0.5` |

---

## API Endpoints

### Staking

```
POST /stake
```

Lock REP into a stake. Requires `{ actorId, amount }`.

```
POST /unstake
```

Release a completed stake. Requires `{ actorId, stakeId }`.

### Tickets

```
POST /ticket
```

Create a new task. Requires `{ workPackageId, title, bondRequired, deadline }`.

```
POST /claim
```

Claim a ticket and auto-stake. Requires `{ actorId, ticketId }`.

```
POST /complete
```

Mark done, return stake, award XP. Requires `{ ticketId, verifierId }`.

*If the deadline passed, this triggers lazy forfeiture — the stake gets slashed immediately, even if the Reaper hasn't run.*

### Reputation

```
GET /leaderboard
```

Top contributors, ranked.

```
GET /analytics/summary
```

System-wide stats.

```
GET /analytics/leaderboard/rep
```

REP-richest actors.

### Events

```
POST /contribute
POST /verify
```

Record and verify contribution events.

### Webhooks

```
POST /webhooks/github
```

GitHub integration. Push events, PRs, and reviews auto-populate your profile.

### Admin

```
POST /admin/reaper
GET /admin/reaper/status
POST /admin/sim/stress
DELETE /admin/sim/reset
```

Reaper control and simulation tools.

---

## The Database

Four core models power everything:

**ActorState** — Every participant
```prisma
actorId       String  @id
currentRep   Float   // Liquid REP you can spend
stakedRep    Float   // Locked in active stakes
currentXp    Int     // Your total XP
decayRate    Float   // How fast your XP ages
```

**Stake** — Collateral on the line
```prisma
id          String  @id
actorId     String
amount      Float
ticketId    String? // Link to the task
status      String  // ACTIVE | RELEASED | FORFEITED
```

**Ticket** — The work itself
```prisma
id           String   @id
title        String
bondRequired Float    // REP needed to claim
claimedBy    String?
status       String   // OPEN | CLAIMED | COMPLETED | FORFEITED
deadline     DateTime
```

**Event** — The immutable record
```prisma
id        String   @id
actorId   String
type      String   // What happened
payload   String   // JSON data
timestamp DateTime
```

Every action in The Void is an event. Everything is traceable. Nothing is lost.

---

## Running Tests

```bash
# Full suite
pnpm test

# Specific package
pnpm --filter @fated/bonds test

# With coverage
pnpm test --coverage
```

---

## Contributing

We welcome builders. Just make sure:

1. Tests pass
2. Types compile
3. You don't break the economics

---

## The Point

The professional world is broken. It's built on trust without proof. On claims without evidence. On theater instead of truth.

The Void fixes this.

Your reputation isn't what you say. It's what you *do*. And we're watching.

---

## Links

- **GitHub**: https://github.com/Ghostmonday/thevoid

---

*The Void sees everything. And now, so can you.*
