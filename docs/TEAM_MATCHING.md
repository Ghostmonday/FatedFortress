# Team Matching Guide

The Void uses a sophisticated multi-vector matchmaking algorithm to form optimal teams ("Adventuring Parties") based on demonstrated competency across multiple dimensions.

## Overview

The matchmaker forms parties of 4 members:
- **1 ARCHITECT** — High collaboration XP, strategic planning
- **1 GUARDIAN** — High judgment XP, code review/verification
- **2 BUILDERS** — High execution XP, implementation

## Scoring Formula

Each candidate's effective score is calculated as:

```
effectiveScore = baseScore
               × roleMultiplier
               × specialtyMultiplier
               × successMultiplier
```

### Base Score
The raw XP in the target role:
- ARCHITECT → `collaboration` XP
- GUARDIAN → `judgment` XP
- BUILDER → `execution` XP

### Role Multiplier (1.5×)
If the candidate has XP in the target role, they get a 1.5× boost.

### Specialty Multiplier (1.5×)
If the candidate has activity in the target domain (BACKEND, FRONTEND, etc.), they get an additional 1.5× boost.

### Success Multiplier (up to 1.5×)
Based on historical success rate in the domain:
```
multiplier = 1 + (successRate × 0.5)
```
Example: 85% success rate → 1 + (0.85 × 0.5) = 1.425×

## Domains

The system tracks expertise across these domains:
- `BACKEND`
- `FRONTEND`
- `DEVOPS`
- `SECURITY`
- `RESEARCH`

## Activity Filtering

Only active users are considered (activity within the last 30 days).

## Usage

```typescript
import { formParty } from '@fated/matchmaker';
import { calculateState } from '@fated/xp-logic';

const events = [...]; // Load events
const state = calculateState(events);

// Form a party for a BACKEND project
const party = formParty(state, new Date(), 'BACKEND');

console.log(party);
// {
//   members: [
//     { userId: 'user-1', role: 'ARCHITECT', score: 45.5 },
//     { userId: 'user-2', role: 'GUARDIAN', score: 30.2 },
//     { userId: 'user-3', role: 'BUILDER', score: 60.0 },
//     { userId: 'user-4', role: 'BUILDER', score: 55.5 }
//   ],
//   totalPower: 191.2
// }
```

## TypeScript Types

```typescript
type PartyRole = 'ARCHITECT' | 'GUARDIAN' | 'BUILDER';

type PartyMember = {
  userId: UserId;
  role: PartyRole;
  score: number;
};

type AdventuringParty = {
  members: PartyMember[];
  totalPower: number;
};
```

## Design Principles

1. **Domain-Aware**: Matches users with proven expertise in the relevant domain
2. **Role-Specialized**: Each party needs all three roles for balance
3. **Success-Weighted**: Prioritizes users with track records of successful delivery
4. **Freshness-Filtered**: Only considers recently active users
5. **Multiplicative Scoring**: Small advantages compound, rewarding specialists

## Why This Works

Traditional hiring looks at:
- Self-reported skills ❌
- Years of experience ❌
- Resume keywords ❌

The Void looks at:
- **Actual code contributions** (execution XP)
- **Code reviews performed** (judgment XP)
- **Projects led** (collaboration XP)
- **Success rate per domain** (verified outcomes)
- **Recency of activity** (current capability)

A user with 500 total XP but 90% success rate in BACKEND will be selected before a user with 1000 XP but 50% success rate.
