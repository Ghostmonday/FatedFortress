# AI Evaluation — Design Doc

**Status:** In progress. Needs to be figured out.

---

**Last Updated:** February 11, 2026

---

## Purpose

This document is the working space for designing how AI evaluation works across the platform. The platform spec mentions AI in many places but doesn't define *how* it evaluates. This doc fills that gap.

---

## Where AI Is Used (From Platform Docs)

| Area | What AI Does | Status |
|------|--------------|--------|
| **Contribution quality** | "AI quality assessment within acceptable parameters" for XP verification | Undefined |
| **Event interpretation** | `outcome_indicator` (-1 to 1), `confidence_score` on telemetry events | Undefined |
| **Pattern detection** | Unused skill capacity, overload, latent clusters, unmet needs | Undefined |
| **Project generation** | Generate project proposals from patterns | Undefined |
| **Matching** | Skill alignment, timezone, availability, growth opportunity | Undefined |
| **Party composition** | Identify role gaps, compose teams | Undefined |
| **Abuse detection** | Flag concerning behavior | Undefined |

---

## Open Questions

### 1. Contribution / Code Quality

- [ ] What model(s)? Claude? GPT? Open source?
- [ ] What inputs? Diff? Full file? PR description + code?
- [ ] What outputs? Pass/fail? Score 0–100? Category (architecture, style, security)?
- [ ] Human override? Can a human reviewer override AI assessment?
- [ ] Cost? Per-request cost at scale?
- [ ] Latency? Sync (blocking) or async (queue)?

### 2. Telemetry Event Interpretation

- [ ] How does raw event → `outcome_indicator` (-1 to 1)?
- [ ] How does raw event → `confidence_score`?
- [ ] Is this real-time or batch?
- [ ] What events get AI evaluation vs. rule-based?

### 3. Pattern Detection

- [ ] What's the pipeline? Raw telemetry → aggregation → pattern detection?
- [ ] Batch job? How often?
- [ ] What patterns are we looking for? (Docs list 4; are there more?)
- [ ] How do we avoid false positives? Confidence thresholds?

### 4. Project Generation

- [ ] From pattern → project scope: prompt? Template? RAG?
- [ ] Human review gate: who reviews? SLA?
- [ ] How do we evaluate if a generated project was good?

### 5. Matching

- [ ] Embedding-based? Rule-based? Hybrid?
- [ ] What features go into the match score?
- [ ] How do we handle cold start (new users, no telemetry)?

### 6. Abuse Detection

- [ ] What triggers AI review vs. human review?
- [ ] What's the model? Binary flag? Risk score?
- [ ] Feedback loop? Does outcome improve the model?

---

## Pipeline Sketches (Draft)

### Contribution Quality Pipeline

```
Code/PR submitted
  → Extract: diff, context, task description
  → AI eval: quality, completeness, security
  → Output: score, feedback, pass/fail
  → Human review (optional? required for edge cases?)
  → XP awarded or not
```

### Pattern Detection Pipeline

```
Telemetry events (e.g. daily batch)
  → Aggregate by user, project, axis
  → Run pattern detectors (unused capacity, overload, etc.)
  → Confidence scoring
  → High confidence → auto-generate project proposal
  → Medium confidence → human review queue
  → Low confidence → log, don't act
```

### Matching Pipeline

```
Project needs: skills[], timezone, size
  → Filter: availability, opt-in
  → Score: axis alignment, history, growth fit
  → Rank
  → Return top N
```

---

## Dependencies

- [ ] Model selection (provider, cost, capability)
- [ ] Prompt design (eval criteria, output format)
- [ ] Feedback loop (did the match work? did the project succeed?)
- [ ] NotebookLM material (user has notes to include)

---

## Related Docs

- `XP_TAXONOMY.md` — axes feed into matching
- `TECHNICAL_DEPTH_ASSESSMENT_QUESTIONNAIRE.md` — initial seeding, not ongoing AI
- `FATEDFORTRESS_PLATFORM_DOCUMENTATION.md` — Sections 4.3.2, 4.3.3, 4.3.4, 9, 10

---

## Next Steps

1. [ ] Define API/interface for AI evaluation (inputs, outputs)
2. [ ] Prototype contribution quality eval (single PR)
3. [ ] Prototype pattern detection (synthetic data)
4. [ ] Prototype matching (simple feature vector)
5. [ ] Add NotebookLM material when available

---

*This doc is a scratchpad. Update as decisions are made.*
