# XP Metrics & Taxonomy — Design Doc

**Status:** In progress. Figures need to be figured out. Taxonomy needs to be built.

---

**Last Updated:** February 11, 2026

---

## Purpose

This document is the working space for:
1. **XP axes** — What dimensions do we track?
2. **Metrics** — How do we measure/derive each?
3. **Taxonomy** — How do axes relate? Hierarchy? Naming?
4. **Verification** — How does contribution become XP?

Nothing here is final. It's a design scratchpad.

---

## Current State (From Platform Docs)

### Axes mentioned in FATEDFORTRESS_PLATFORM_DOCUMENTATION.md

**Technical:**
- Backend Development
- Frontend Development
- DevOps
- Data Engineering
- Security
- Mobile Development

**Process:**
- Project Management
- Quality Assurance
- Documentation

**Collaboration:**
- Technical Leadership
- Cross-functional Coordination
- Community Building

**Enablement:**
- Patronage
- Mentorship
- Evangelism

### Trust Gradient Components (from docs)

- Execution Reliability
- Collaboration Quality
- Contribution Quality
- Judgment Quality

### Technical Depth Assessment (from questionnaire)

- Technical Depth Score (TDS)
- AI Augmentation Index
- Quality-Velocity Weighting
- Team Composition Preference

---

## Open Questions

### 1. Axis structure

- [ ] Flat list vs. hierarchical? (e.g. `Backend > API Design > REST` vs. `Backend`)
- [ ] How many axes? Too few = coarse; too many = noisy, hard to match
- [ ] Extensible? Can we add axes without breaking existing data?
- [ ] Canonical IDs? `backend`, `backend-dev`, `Backend Development` — standardize

### 2. Metrics per axis

- [ ] Raw XP value — how computed? By task completion? By verification?
- [ ] Decay rate — per axis or global? How fast?
- [ ] Confidence interval — do we track uncertainty?
- [ ] Source attribution — which projects/tasks contributed?

### 3. Verification pipeline

- [ ] What counts as "verified"? Code review? Tests? Stakeholder acceptance?
- [ ] Who verifies? Peer? Project lead? Automated?
- [ ] Partial credit? Failed verification = 0 or partial?

### 4. Display / UX

- [ ] XP ranges for ANON: Minimal / Moderate / Substantial / Exceptional — what are the thresholds?
- [ ] How many decimal places? Do we show 1,234.5 XP or round?
- [ ] "Leagues" — is this a display tier? Bronze / Silver / Gold? Or something else?

### 5. Matching

- [ ] How do project requirements map to axes? Free text? Tag selection?
- [ ] Weighting — does "required" skill weigh more than "preferred"?
- [ ] Gap matching — match to "needs growth" or only "has skill"?

---

## Proposed Taxonomy (Draft)

### Option A: Flat axes (current)

```
Technical: backend, frontend, devops, data, security, mobile
Process: pm, qa, docs
Collaboration: leadership, coordination, community
Enablement: patronage, mentorship, evangelism
```

### Option B: Two-tier (category + skill)

```
technical.backend
technical.frontend
technical.devops
...
process.pm
process.qa
collaboration.leadership
enablement.mentorship
```

### Option C: Role-aligned (party model)

```
execution.builder
execution.guardian
execution.architect
coordination.navigator
coordination.mentor
enablement.patron
```

---

## Metrics to Define

| Metric | Description | Status |
|--------|-------------|--------|
| `xp_value` | Raw XP per axis | TBD |
| `decay_rate` | Per-axis or global | TBD |
| `decay_schedule` | When/how much decays | See PHILOSOPHY_RECONSIDERED |
| `confidence_low` | Lower bound of uncertainty | TBD |
| `confidence_high` | Upper bound of uncertainty | TBD |
| `last_activity` | Timestamp for decay calc | TBD |
| `source_contexts` | Project/task IDs | TBD |

---

## Verification Rules (Draft)

| Contribution type | Verification | XP award |
|-------------------|--------------|----------|
| Code/task | PR merged + tests pass | Base × multipliers |
| Design | Review approval | TBD |
| Documentation | Accuracy check | TBD |
| Mentorship | Mentee attestation? | TBD |
| Patronage | Payment + engagement | TBD |

---

## Naming: "Leagues"

If "Join the leagues" becomes the headline, we need to define what a league is:

- **Option 1:** Display tier (e.g. Bronze / Silver / Gold) — maps to XP ranges
- **Option 2:** Rank/division (like sports leagues) — competitive framing
- **Option 3:** Guild/crew — collaborative, not competitive
- **Option 4:** Kept as marketing only — no technical mapping

---

## Next Steps

1. [ ] Decide axis structure (flat vs. hierarchical)
2. [ ] Define canonical axis IDs
3. [ ] Specify XP calculation formula
4. [ ] Specify decay schedule
5. [ ] Define verification rules per contribution type
6. [ ] Define ANON display ranges (Minimal/Moderate/etc.)
7. [ ] Decide if "leagues" maps to technical entity

---

*This doc is a scratchpad. Update as decisions are made.*
