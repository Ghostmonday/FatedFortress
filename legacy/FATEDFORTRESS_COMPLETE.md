# Chapter 1: The Problem — Why Build This?

*"Understanding what we're solving and why it matters."*

---

> **📋 Document Structure Note:**
> - **Technical Specification** (this document): Chapters 1-12 + Appendix
> - **Lore Document**: `docs/RSI_LORE.md` — aspirational vision, separated for engineering credibility
>
> **Key Changes in This Version:**
> - Added **Bond Logic** (Chapter 3.5): Two-tier reputation (passive XP vs active-staked)
> - Added **Industrial equivalents** (Chapter 4): Clearer terminology mapping
> - Added **Code architecture mapping** (Chapter 4.3): Roles → packages
> - Added **Concrete roadmap** (Chapter 11): MVP through Year 2+
> - Added **Security & Compliance** (Chapter 12)
> - Replaced "TRANSCENDENT" confidence levels with concrete milestones

---

## 1.1 The State of Developer Collaboration in 2026

Every developer knows the problem, even if we don't always articulate it. The current landscape of developer collaboration is built on a foundation of performance rather than substance. LinkedIn has become a theater of curated professional narratives, where network size often matters more than the quality of contributions. GitHub statistics celebrate activity without distinguishing between meaningful work and superficial commits designed to boost visibility. Conference talks and blog posts have become currency in a marketplace where visibility and self-promotion often trump actual technical excellence.

The result is a collective hallucination about what makes a good developer. We've built systems that reward the appearance of productivity rather than productivity itself. Senior engineers coast on past accomplishments while the industry fails to identify and elevate talented individuals hidden beneath layers of performance anxiety and visibility fatigue. Brilliant contributors work in obscurity because they haven't mastered self-promotion, while less capable individuals build impressive-looking profiles through strategic visibility.

This isn't a moral failing of individual developers—it's a systemic problem created by platforms that optimize for engagement rather than outcomes. When your professional reputation depends on being visible, you become incentivized to perform visibility rather than do meaningful work. The systems we've built inadvertently select for people who are good at being seen, not people who are good at building things.

## 1.2 The Specific Pain Points

**For individual contributors**, the pain manifests as a choice between authenticity and visibility. Many developers prefer to let their code speak for itself, to be judged by the quality of their contributions rather than the polish of their personal brand. But in a world where visibility equals opportunity, silence is costly. You can't get hired if you can't be found. You can't attract collaborators if no one knows you exist. The current system forces developers to become their own marketing departments, distracting them from the work they actually want to do.

**For founders and hiring managers**, the pain flows in the opposite direction: finding developers who actually deliver. The resume tells you what someone claims to have done. The portfolio shows what they've chosen to show. The GitHub profile reveals activity but not impact. Reference checks confirm what the references were told to say. We spend weeks evaluating candidates through processes designed to surface signals that the platforms themselves have corrupted, and we're often left making hiring decisions based on incomplete information about actual capability.

**For teams**, the challenge is coordination across visibility gradients. The people who are best at getting noticed often aren't the people best suited for the actual work. Team formation happens through networks and reputation rather than demonstrated complementary skills. We form teams based on who we know or who looks impressive on paper, rather than on who would actually work well together for the specific challenge at hand.

## 1.3 The Core Insight: Telemetry as Truth

The fundamental insight behind FatedFortress is deceptively simple: what if we built a system where your actual work was the only thing that mattered? Not your LinkedIn profile, not your Twitter following, not your conference talks, but the verified contributions you make to projects that matter.

This is what we mean by "telemetry as truth." The platform observes what you do—your code contributions, your code reviews, your task completions, your collaboration patterns—and builds a reputation from that observable behavior rather than from self-reported claims. It's not that words don't matter at all; it's that actions speak louder, and the system is designed to capture and weight actions appropriately.

This doesn't solve every problem. There are things telemetry can't capture: the quality of someone's thinking before they start coding, the mentorship impact that doesn't show up in metrics, the work done outside the platform. But it provides a strong signal that current platforms don't offer: a verifiable record of what you've actually done, weighted by recency, complexity, and verification quality.

## 1.4 What We're Refusing to Build

It's equally important to be clear about what FatedFortress is not:

We are not building a surveillance system. The platform tracks contribution behavior, not personal data. Users maintain control over their visibility, and pseudonymity is a first-class feature, not an afterthought.

We are not building a manipulation engine. The platform does not exist to optimize user behavior for someone else's benefit. We're not trying to maximize engagement time or convert attention into advertising revenue.

We are not building a credentialing system. Your XP on FatedFortress is not meant to replace your professional identity—it's meant to supplement it with verified contribution data that other systems can't provide.

We are not building a permanent record. Trust decays on FatedFortress because reputation without recent contribution is misleading. The system acknowledges that capability changes over time and rewards ongoing engagement rather than historic achievement.

---

## 1.5 Building and Simulation Testing

### 1.5.1 Conceptual Framework Validation

Before building any technical implementation, the problem statement itself must be validated through simulation. The core hypothesis—that current developer collaboration platforms reward visibility over substance—requires systematic testing.

**Simulation Objective:** Validate that FatedFortress's telemetry-based reputation model produces different team formation outcomes than visibility-based platforms.

### 1.5.2 AI Agent Population Setup

Create a population of 500 AI agents simulating developers with the following profiles:

```
Agent Distribution Matrix:
├── High Visibility / Low Capability (15%): 75 agents
│   ├── LinkedIn posts: 50-200
│   ├── Conference talks: 5-15
│   ├── GitHub commits: 100-300 (shallow)
│   ├── Code review quality: 0.3-0.5
│   └── Task completion rate: 0.4-0.6
│
├── Low Visibility / High Capability (15%): 75 agents
│   ├── LinkedIn posts: 0-5
│   ├── Conference talks: 0-2
│   ├── GitHub commits: 200-500 (substantial)
│   ├── Code review quality: 0.8-0.95
│   └── Task completion rate: 0.85-0.98
│
├── Balanced Profile (40%): 200 agents
│   ├── Mixed visibility activities
│   ├── Variable capability levels
│   └── Realistic distribution of skills
│
└── Edge Cases (30%): 150 agents
    ├── Career gaps (parenting, illness)
    ├── Pseudonym usage patterns
    ├── Sabbatical scenarios
    └── Rapid skill acquisition (bootcamps)
```

### 1.5.3 Comparative Simulation Protocol

**Phase A: Visibility-Based Selection (Current State)**

Simulate team formation using traditional signals:
- GitHub star count as proxy for visibility
- LinkedIn connection count
- Conference speaking history
- Blog post frequency

**Phase B: Telemetry-Based Selection (FatedFortress)**

Run identical team formation requests using FatedFortress XP Profiles:
- Verified contribution history
- Trust decay calculations
- Collaboration quality scores
- Multi-axis capability mapping

### 1.5.4 Success Metrics

```
Primary Metrics:
├── Team Capability Score: Average capability of formed teams
├── Visibility/Capability Correlation: How well visible signals predict capability
├── Hidden Talent Discovery: Percentage of capable developers found
└── Team Outcome Prediction: Correlation between selection method and project success

Secondary Metrics:
├── Formation Time: How long to assemble teams
├── Preference Satisfaction: How well teams match stated needs
└── Diversity Indices: Skill diversity, background diversity
```

### 1.5.5 Problem Identification Scenarios

The simulation should identify these failure modes:

```
Failure Mode 1: Trust Gaming
├── Scenario: AI agents attempt to maximize XP with minimal work
├── Detection: Unusual contribution patterns, verification failures
└── Mitigation: Complexity weighting, verification quality multipliers

Failure Mode 2: Collusion Rings
├── Scenario: Groups of agents verify each other's low-quality work
├── Detection: Unusual verification clustering, circular attestations
└── Mitigation: Cross-verification requirements, decay on verification quality

Failure Mode 3: Pseudonym Abuse
├── Scenario: Same agent creates multiple pseudonyms to inflate reputation
├── Detection: Behavioral fingerprinting across pseudonyms
└── Mitigation: Identity linking with privacy-preserving techniques

Failure Mode 4: Sabbatical Exploitation
├── Scenario: Agents cycle sabbaticals to avoid decay
├── Detection: Sabbatical frequency analysis
└── Mitigation: Maximum sabbatical duration, decay carryover rules
```

### 1.5.6 Stress Testing Protocol

```
Load Testing:
├── Agent Count: Scale from 100 to 100,000 simulated users
├── Activity Volume: 10,000 to 1,000,000 daily contributions
├── Query Throughput: Team matching requests per second
└── Verification Pipeline: Concurrent verification capacity

Edge Case Testing:
├── Rapid Trust Changes: Simulate sudden skill acquisition/loss
├── Mass Exodus: What happens when 30% of users leave?
├── Platform Gaming: Organized attempts to manipulate the system
└── Privacy Attacks: Attempts to de-anonymize users
```

### 1.5.7 Simulation Infrastructure Requirements

```typescript
interface SimulationInfrastructure {
  agentPopulation: {
    minSize: number = 500;
    maxSize: number = 10000;
    personalityModels: string[] = ['collaborative', 'competitive', 'casual', 'grinder'];
    capabilityDistributions: Map<string, NormalDistribution>;
  };
  
  scenarioEngine: {
    predefinedScenarios: string[] = ['startup_formation', 'enterprise_project', 'open_source_maintenance'];
    customScenarios: boolean;
    realWorldReplay: boolean;
  };
  
  metricsCollector: {
    realTimeDashboards: boolean;
    automatedAnomalyDetection: boolean;
    comparativeReporting: boolean;
  };
}
```

### 1.5.8 Validation Checklist

```
Before Proceeding to Build:
├── [ ] Problem validated: Simulations show current platforms miss ~30% of capable developers
├── [ ] Solution hypothesis confirmed: Telemetry-based selection produces measurably better teams
├── [ ] Failure modes identified: Top 10 attack vectors mapped
├── [ ] Edge cases documented: Sabbatical, pseudonym, collusion scenarios tested
├── [ ] Scale requirements established: Capacity planning based on simulation loads
└── [ ] Ethical boundaries tested: Privacy guarantees hold under adversarial conditions
```

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY
# Chapter 2: Core Philosophy — The Why

*"The foundational principles that guide every design decision."*

---

## 2.1 Foundational Mantras

These mantras guide every design decision on FatedFortress. They're not marketing slogans—they're constraints that shape the system.

**"Nothing is permanent without continued signal."**

Trust on FatedFortress decays over time. Your XP doesn't stay static forever; it gradually decreases unless you continue to contribute. This isn't punishment for taking breaks—it's acknowledgment that capability changes, and a reputation based on old work becomes increasingly unreliable as time passes.

The decay mechanism is designed to be gentle rather than punitive. After extended inactivity, we explore mechanisms like sabbatical mode, allowing users to flag planned absences, and gentle decay curves that don't penalize reasonable life circumstances. The goal is accuracy, not cruelty: a reputation from five years ago tells you very little about what someone can do today.

**"Telemetry as truth."**

Observable behavior is the primary input for reputation calculation. What you say about your skills is noise; what you do is signal. The platform captures actions within its boundaries—GitHub contributions, in-app tasks, verified code reviews—and uses those to build XP Profiles.

This doesn't mean telemetry is complete or perfect. It captures what happens on the platform, not everything that matters. A developer's architectural thinking might never appear in a commit. Mentoring impact might not show up in metrics. The system weights observable behavior heavily but leaves room for attested contributions, peer vouching, and context that telemetry alone cannot capture.

**"Anonymity protects you from peers, not from adjudication."**

You can contribute pseudonymously on FatedFortress. Other users don't need to know who you are, and the system supports multiple pseudonyms for different contexts. But the system itself always knows who made each contribution. Accountability is maintained even when visibility is reduced.

This creates an interesting dynamic: you can build reputation without revealing identity, and you can reveal identity when you've accumulated reputation you want to attribute to your public professional identity. The choice is yours, and neither path is penalized.

**"Teams form around execution, not credentials."**

When you form a team on FatedFortress, you're matching on demonstrated XP Profiles rather than resume claims. The system proposes team compositions based on complementary skills and successful collaboration patterns, not on job titles or company names.

This doesn't mean credentials are worthless—they're just not the primary mechanism. A self-taught developer with strong XP has as much opportunity as a CS graduate from a prestigious school if their contribution record demonstrates comparable capability.

## 2.2 The Trust Gradient

The trust gradient is FatedFortress's way of measuring where you stand in the community. It's composed of four weighted factors:

**Execution Reliability** measures whether you finish what you start. On-time task completion, low abandonment rates, and consistent delivery build this component. People who consistently deliver build more trust than those who start strong but fizzle out.

**Collaboration Quality** measures how pleasant you are to work with. This comes from peer reviews, code review feedback ratings, and team satisfaction surveys. Technical brilliance matters less if working with you is painful.

**Contribution Quality** measures the actual quality of your work. Code review outcomes, bug rates, architectural soundness—these feed into this component. It's not just about doing things; it's about doing them well.

**Judgment Quality** measures the decisions you make. This is harder to quantify and often comes from senior peer review, architectural approval patterns, and the outcomes of projects you've influenced.

These four components combine into an overall trust score, but they're also available individually. A team might need someone with high Contribution Quality but lower Collaboration Quality: a brilliant but difficult individual for a high-stakes technical challenge. Another team might prioritize Execution Reliability: someone who definitely delivers on schedule. The decomposition allows for nuanced matching rather than single-score optimization.

## 2.3 Privacy by Design

FatedFortress is designed with privacy as a foundational requirement, not an add-on feature. This manifests in several ways:

**Pseudonymous participation** is built into the core. You can create an account, contribute, and build XP without ever revealing your legal identity. The system tracks the connection between your pseudonyms and your real identity for accountability purposes, but this information is compartmentalized and not exposed to other users.

**Visibility modes** let you control what others see. In ANON mode, you appear to others only by pseudonym, with no link to your other pseudonyms or your real identity. In OFF mode, your real identity is visible, along with all your XP and contributions. You can toggle between modes and have multiple pseudonyms that you've verified as belonging to you.

**Data minimization** means we collect only what we need. We don't track behavior outside the platform (unless you explicitly connect external services). We don't store more personal information than necessary for platform operation. We don't sell or share individual user data.

**Transparency** about what we do collect. Users can see their own profiles from both the public and internal perspective. You can export your data at any time. You can delete your account and associated data according to our data retention policies.

---

## 2.4 Building and Simulation Testing

### 2.4.1 Philosophy Implementation Verification

The four mantras require systematic testing to ensure they actually produce the intended outcomes. Each mantra represents a hypothesis that must be validated through simulation.

**Core Hypothesis Set:**
```
Mantra 1: "Nothing is permanent without continued signal"
├── Hypothesis: Trust decay increases team capability over time
├── Test: Compare teams formed with decay vs. static reputation
└── Metric: Project success rate improvement

Mantra 2: "Telemetry as truth"
├── Hypothesis: Observable behavior predicts outcomes better than claims
├── Test: Correlation analysis between XP Profiles and team outcomes
└── Metric: Prediction accuracy vs. visibility-based signals

Mantra 3: "Anonymity protects you from peers, not from adjudication"
├── Hypothesis: Pseudonymity increases honest contribution
├── Test: Compare contribution quality in ANON vs. OFF modes
└── Metric: Contribution honesty scores, bug rates, review quality

Mantra 4: "Teams form around execution, not credentials"
├── Hypothesis: XP-based matching produces better teams than credential-based
├── Test: A/B test team formation methods
└── Metric: Team capability scores, project completion rates
```

### 2.4.2 AI Agent Philosophy Testing Population

Create 1000 AI agents with programmed belief systems:

```
Agent Philosophical Profiles:
├── Pragmatists (30%): 300 agents
│   ├── Believe in demonstrated capability
│   ├── Value results over processes
│   └── Willing to work with anyone effective
│
├── Traditionalists (25%): 250 agents
│   ├── Trust credentials and history
│   ├── Value reputation and credentials
│   └── Skeptical of new measurement systems
│
├── Skeptics (20%): 200 agents
│   ├── Question platform accuracy
│   ├── Test system boundaries
│   └── Attempt to find loopholes
│
├── Optimizers (15%): 150 agents
│   ├── Seek maximum XP efficiency
│   ├── Optimize for metrics over substance
│   └── Represent potential gaming behavior
│
└── Privacy Advocates (10%): 100 agents
    ├── Prefer ANON mode
    ├── Value pseudonymity
    └── Concerned about tracking
```

### 2.4.3 Mantra Validation Simulations

**Simulation 1: Trust Decay Impact**

```
Scenario: 100 projects seeking teams over 6 months

Control Group (Static Trust):
- All agents maintain static trust scores
- Teams formed based on historic achievement

Experimental Group (Decay):
- Trust decays monthly per Chapter 3.4 schedule
- Recent contributions weighted 3x older contributions

Metrics to Track:
├── Team capability evolution over time
├── Newcomer integration success rate
├── Veteran relevance preservation
└── Platform stickiness (continued engagement)
```

**Simulation 2: Telemetry vs. Claims**

```
Scenario: Hiring managers selecting team members for identical projects

Method A (Traditional):
- Agents receive: resumes, LinkedIn profiles, portfolio links
- Selection based on: credentials, self-reported skills, reputation

Method B (Telemetry-Based):
- Agents receive: FatedFortress XP Profiles, verification history
- Selection based: demonstrated capability, collaboration scores, decay-adjusted XP

Comparative Analysis:
├── Selection accuracy (actual vs. predicted capability)
├── Time to selection decision
├── Cost per hire (in platform resources)
└── First-year retention rates
```

**Simulation 3: Pseudonymity Effects**

```
Scenario: Sensitive project requiring controversial expertise

ANON Mode Group:
- Contributors use pseudonyms
- Real identity hidden from teammates
- Verification occurs without personal knowledge

OFF Mode Group:
- Full identity visibility
- Standard verification processes
- Social pressure effects active

Measured Outcomes:
├── Contribution rate (ANON vs OFF)
├── Controversial opinion expression frequency
├── Verification quality comparison
└── Post-project collaboration rates
```

### 2.4.4 Trust Gradient Validation

Test the four-component trust model:

```
Component Testing Protocol:

Execution Reliability Test:
├── Scenario: Agents assigned tasks with varying complexity
├── Prediction: Trust scores should predict completion probability
├── Validation: Correlation between execution reliability score and actual completions
└── Threshold: Minimum r² = 0.7 for component retention

Collaboration Quality Test:
├── Scenario: Simulated team environments with varying personalities
├── Prediction: Collaboration scores predict team satisfaction
├── Validation: Post-project surveys correlated with scores
└── Threshold: Minimum discrimination index = 0.4

Contribution Quality Test:
├── Scenario: Code review scenarios with known quality levels
├── Prediction: Quality scores correlate with expert assessments
├── Validation: Blind review by external experts
└── Threshold: Cohen's κ >= 0.6 with expert consensus

Judgment Quality Test:
├── Scenario: Architectural decision scenarios
├── Prediction: Judgment scores predict decision outcomes
├── Validation: Follow-up analysis of project outcomes
└── Threshold: 60% accuracy improvement over baseline
```

### 2.4.5 Edge Case Philosophy Testing

```
Edge Case 1: The Sabbatical Dilemma
├── Scenario: High-trust user takes 6-month sabbatical
├── Question: Does decay destroy useful reputation?
├── Test: Return user effectiveness after sabbatical
└── Expected: Should recover 80% of capability within 3 months

Edge Case 2: The Privacy Paradox
├── Scenario: User wants ANON mode benefits with OFF mode credibility
├── Question: Can pseudonym reputation transfer work?
├── Test: Identity reveal scenarios and trust transfer
└── Expected: Gradual reputation transfer with verification lag

Edge Case 3: The Trust Spike
├── Scenario: User earns massive trust in short period
├── Question: Is rapid trust acquisition suspicious?
├── Test: False positive rates for trust fraud detection
└── Expected: <1% legitimate users flagged incorrectly
```

### 2.4.6 Ethical Boundary Testing

The philosophy explicitly refuses certain capabilities. Test that these boundaries hold:

```
Boundary 1: No Surveillance
├── Test: Can agents track non-contribution behavior?
├── Expected: All personal data collection < 5 metrics
└── Result: PASS/FAIL

Boundary 2: No Manipulation
├── Test: Can platform be used to manipulate behavior?
├── Expected: No dark patterns, no addictive mechanics
└── Result: PASS/FAIL

Boundary 3: No Credential Replacement
├── Test: Can XP replace professional credentials?
├── Expected: XP positioned as supplement only
└── Result: PASS/FAIL
```

### 2.4.7 Simulation Output Requirements

```
For Each Philosophy Test:
├── Raw behavioral data from all agents
├── Statistical analysis (significance tests, confidence intervals)
├── Effect size calculations
├── Failure mode documentation
├── Edge case analysis
└── Recommendations for philosophy refinement

For System-Wide Validation:
├── Mantra effectiveness scores
├── Trust component reliability metrics
├── Privacy preservation audit
├── Ethical boundary compliance report
└── Platform health indicators
```

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY
# Chapter 3: The XP System — How Reputation Works

*"Experience points as measurement, not gamification."*

---

## 3.1 The Philosophy of Experience Points

Experience points on FatedFortress are fundamentally different from gamification badges or reputation points on other platforms. They're not rewards for engagement; they're measurements of demonstrated capability. When you earn XP, it means you've successfully completed work that the system recognizes and verifies as valuable.

The XP system exists to solve a coordination problem: how do we help good developers find each other and help teams find good developers? The answer is to build a verifiable record of what people have actually done, weighted by factors that correlate with actual capability. XP on FatedFortress is not about accumulation for its own sake. It's about signaling—to potential collaborators, to employers, to yourself—about what you can do and how well you do it.

XP on FatedFortress is not about accumulation for its own sake. It's about signaling: to potential collaborators, to employers, to yourself, about what you can do and how well you do it.

---

## 3.2 The XP Axes

Every contribution on FatedFortress is classified along multiple axes. This multidimensional approach avoids the trap of single-score systems, which inevitably optimize for one thing at the expense of others.

### Technical Axes

**Backend Development** encompasses server-side systems, APIs, databases, and service architecture. XP in this axis comes from implementing features, fixing bugs, and architecting solutions for server-side challenges.

**Frontend Development** covers client-side implementation, user interfaces, and user experience. XP comes from building features, optimizing performance, and creating accessible, usable interfaces.

**DevOps** includes CI/CD pipelines, infrastructure management, deployment strategies, and operational reliability. XP comes from keeping systems running smoothly and improving deployment velocity.

**Data Engineering** covers data pipelines, analytics infrastructure, and ML engineering foundations. XP comes from building reliable data systems and enabling data-driven decision making.

**Security** encompasses authentication systems, encryption, threat modeling, and secure development practices. XP comes from implementing secure systems and fixing vulnerabilities.

**Mobile Development** covers native and cross-platform mobile applications. XP comes from building and maintaining mobile applications.

### Process Axes

**Project Management** covers scope definition, timeline management, and stakeholder communication. XP comes from successfully delivering projects on schedule and keeping teams aligned.

**Quality Assurance** encompasses testing strategies, code review practices, and reliability engineering. XP comes from improving code quality and catching bugs before they reach users.

**Documentation** covers specs, onboarding materials, and technical writing. XP comes from creating clear documentation that enables others to succeed.

### Collaboration Axes

**Technical Leadership** covers architectural decisions, mentoring, and guiding teams toward good outcomes. XP comes from making good decisions and helping others improve.

**Cross-functional Coordination** covers working effectively with non-engineering stakeholders. XP comes from bridging communication gaps and delivering products that satisfy business needs.

**Community Building** covers open source contributions, knowledge sharing, and building community. XP comes from contributing to the broader developer ecosystem.

### Enablement Axes

**Patronage** involves providing resources, funding, or opportunities to others. XP comes from creating conditions that enable other developers to succeed.

**Mentorship** involves directly helping others improve their skills. XP comes from documented impact on others' growth.

**Evangelism** involves spreading knowledge and recruiting others to beneficial projects or technologies. XP comes from successful outcomes attributable to your advocacy.

---

## 3.3 XP Implementation Details

### 3.3.1 Database Schema

The XP system requires the following core tables:

```sql
-- Users table with XP summary
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    real_name VARCHAR(100),
    pseudonym VARCHAR(50),
    visibility_mode VARCHAR(10) DEFAULT 'ANON',
    trust_score DECIMAL(5,4) DEFAULT 0.5000,
    created_at TIMESTAMP DEFAULT NOW(),
    last_active_at TIMESTAMP DEFAULT NOW(),
    sabbatical_until TIMESTAMP,
    is_trusted BOOLEAN DEFAULT FALSE,
    trusted_at TIMESTAMP,
    trusted_by UUID REFERENCES users(id)
);

-- XP Axes definitions
CREATE TABLE xp_axes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(30) NOT NULL,
    decay_rate DECIMAL(4,4) DEFAULT 0.95,
    weight_multiplier DECIMAL(3,2) DEFAULT 1.0,
    description TEXT
);

-- User XP per axis (denormalized for performance)
CREATE TABLE user_xp (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    axis_id INTEGER REFERENCES xp_axes(id),
    xp_total DECIMAL(10,2) NOT NULL DEFAULT 0,
    xp_raw DECIMAL(10,2) NOT NULL DEFAULT 0,
    xp_decayed DECIMAL(10,2) NOT NULL DEFAULT 0,
    last_decay_at TIMESTAMP DEFAULT NOW(),
    contribution_count INTEGER DEFAULT 0,
    verification_count INTEGER DEFAULT 0,
    avg_verification_quality DECIMAL(3,2) DEFAULT 0.00,
    PRIMARY KEY (user_id, axis_id)
);

-- Contributions table
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    project_id UUID,
    contribution_type VARCHAR(30) NOT NULL,
    source_type VARCHAR(30) NOT NULL, -- 'github', 'gitlab', 'manual', 'peer'
    source_id VARCHAR(255),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    complexity_score DECIMAL(3,2) DEFAULT 1.0,
    time_estimate_minutes INTEGER,
    time_actual_minutes INTEGER,
    status VARCHAR(20) DEFAULT 'pending',
    metadata JSONB,
    submitted_at TIMESTAMP DEFAULT NOW(),
    verified_at TIMESTAMP,
    xp_awarded DECIMAL(10,2),
    xp_calculation JSONB
);

-- Contribution-axis mapping
CREATE TABLE contribution_axes (
    contribution_id UUID REFERENCES contributions(id) ON DELETE CASCADE,
    axis_id INTEGER REFERENCES xp_axes(id),
    weight DECIMAL(3,2) DEFAULT 1.0,
    PRIMARY KEY (contribution_id, axis_id)
);

-- Verifications table
CREATE TABLE verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contribution_id UUID REFERENCES contributions(id) NOT NULL,
    verifier_id UUID REFERENCES users(id),
    verification_type VARCHAR(30) NOT NULL,
    quality_score DECIMAL(3,2),
    findings TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Trust gradient components
CREATE TABLE trust_components (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    component_name VARCHAR(30) NOT NULL,
    score DECIMAL(5,4) NOT NULL DEFAULT 0.5000,
    evidence_count INTEGER DEFAULT 0,
    last_calculated_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, component_name)
);
```

### 3.3.2 API Endpoints

```typescript
// XP API Routes (Express.js style)

POST /api/xp/contribution/submit
  Body: {
    projectId: string,
    type: 'feature' | 'bugfix' | 'docs' | 'review' | 'infrastructure',
    sourceType: 'github' | 'gitlab' | 'manual',
    sourceId: string,
    title: string,
    description: string,
    complexityEstimate: 1..5,
    timeMinutes: number,
    axisSelections: number[]
  }
  Returns: { contributionId, status, nextSteps }

GET /api/xp/profile/:userId
  Returns: {
    totalXP: number,
    xpByAxis: { axisName: number }[],
    trustScore: number,
    trustComponents: { name: score }[],
    recentContributions: ContributionSummary[],
    decayInfo: { nextDecayAt: string, currentDecayRate: number }
  }

GET /api/xp/leaderboard
  Query: { axis?: number, timeframe?: 'week'|'month'|'year'|'all', limit?: number }
  Returns: { rankings: { userId, username, totalXP, rank }[] }

POST /api/xp/verify/:contributionId
  Body: {
    qualityScore: 0..1,
    findings: string,
    approved: boolean
  }
  Returns: { verificationId, status, xpUpdate }

GET /api/xp/history
  Query: { limit?: number, offset?: number, axis?: number }
  Returns: { contributions: ContributionDetail[], totalCount }

POST /api/xp/sabbatical
  Body: { durationWeeks: number }
  Returns: { sabbaticalUntil, decayPaused }

GET /api/xp/analytics
  Returns: {
    totalContributions: number,
    avgVerificationTime: number,
    topAxes: { axis: string, totalXP: number }[]
  }
```

### 3.3.3 XP Calculation Engine

```typescript
// XP Calculation Service Implementation

interface XPCalculationParams {
  baseXP: number;
  complexityMultiplier: number;
  verificationQualityMultiplier: number;
  axisWeights: Map<number, number>;
  recencyMultiplier: number;
  trustBonus: number;
}

class XPCalculationEngine {
  private readonly BASE_VALUES = {
    feature: 50,
    bugfix: 25,
    docs: 15,
    review: 20,
    infrastructure: 40
  };

  private readonly COMPLEXITY_MULTIPLIERS = {
    1: 0.5,
    2: 0.75,
    3: 1.0,
    4: 1.5,
    5: 2.0
  };

  private readonly VERIFICATION_QUALITY_MULTIPLIERS = {
    minimal: 0.8,
    standard: 1.0,
    thorough: 1.25,
    extensive: 1.5
  };

  async calculateXP(params: XPCalculationParams): Promise<number> {
    let xp = params.baseXP;

    // Apply complexity multiplier
    xp *= params.complexityMultiplier;

    // Apply verification quality
    xp *= params.verificationQualityMultiplier;

    // Apply axis weights
    for (const [axisId, weight] of params.axisWeights) {
      const axisConfig = await this.getAxisConfig(axisId);
      xp *= axisConfig.weightMultiplier;
    }

    // Apply recency adjustment (diminishing returns for old contributions)
    xp *= params.recencyMultiplier;

    // Apply trust score bonus (capped at 10%)
    const trustBonus = Math.min(params.trustBonus, 0.10);
    xp *= (1 + trustBonus);

    return Math.round(xp * 100) / 100;
  }

  async applyDecay(userId: string): Promise<void> {
    const userXP = await this.getUserXP(userId);
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    for (const [axisId, xpData] of userXP.byAxis) {
      const axisConfig = await this.getAxisConfig(axisId);
      const daysSinceLastDecay = 
        (now.getTime() - xpData.lastDecayAt.getTime()) / (24 * 60 * 60 * 1000);

      if (daysSinceLastDecay >= 1) {
        const decayCycles = Math.floor(daysSinceLastDecay);
        const decayPerCycle = axisConfig.decayRate;
        const overallDecay = Math.pow(decayPerCycle, decayCycles);

        xpData.xpDecayed = xpData.xpRaw * overallDecay;
        xpData.lastDecayAt = now;

        await this.updateUserXP(userId, axisId, xpData);
      }
    }

    // Recalculate trust score
    await this.recalculateTrustScore(userId);
  }

  async calculateTrustScore(userId: string): Promise<number> {
    const components = await this.getTrustComponents(userId);
    
    // Trust = weighted combination of four components
    const weights = {
      execution: 0.30,
      collaboration: 0.30,
      contribution: 0.25,
      judgment: 0.15
    };

    let trust = 0;
    for (const [component, score] of components) {
      trust += score * weights[component];
    }

    return Math.min(Math.max(trust, 0), 1);
  }
}
```

### 3.3.4 Verification Pipeline

```typescript
interface VerificationWorkflow {
  contributionId: string;
  automatedChecks: AutomatedCheck[];
  manualReviewRequired: boolean;
  assignedReviewers: string[];
  deadline: Date;
}

class VerificationPipeline {
  async processContribution(contribution: Contribution): Promise<VerificationResult> {
    // Stage 1: Automated checks
    const automatedResults = await this.runAutomatedChecks(contribution);
    
    if (!automatedResults.passed) {
      return {
        status: 'rejected',
        reason: 'Automated checks failed',
        details: automatedResults.failures
      };
    }

    // Stage 2: Determine if manual review needed
    const needsManualReview = this.requiresManualReview(contribution);
    
    if (needsManualReview) {
      const assignment = await this.assignReviewers(contribution);
      
      return {
        status: 'pending_review',
        contributionId: contribution.id,
        assignedReviewers: assignment.reviewerIds,
        deadline: assignment.deadline
      };
    }

    // Stage 3: Award XP for contributions that pass all checks
    const xpAmount = await this.calculateXPAward(contribution, automatedResults);
    
    return {
      status: 'approved',
      contributionId: contribution.id,
      xpAwarded: xpAmount
    };
  }

  private async runAutomatedChecks(contribution: Contribution): Promise<AutomatedCheckResult> {
    const checks = [];
    
    // CI/CD test results
    if (contribution.sourceType === 'github') {
      checks.push(this.checkGitHubActions(contribution.sourceId));
    }
    
    // Test coverage requirements
    checks.push(this.checkTestCoverage(contribution));
    
    // Code quality linting
    checks.push(this.checkCodeQuality(contribution));
    
    // Security scanning
    checks.push(this.checkSecurity(contribution));
    
    const results = await Promise.all(checks);
    
    return {
      passed: results.every(r => r.passed),
      failures: results.filter(r => !r.passed).map(r => r.reason)
    };
  }
}
```

---

## 3.4 XP Decay and Recency

Trust should reflect recent capability, not historic achievement. XP on FatedFortress decays over time, with recent contributions weighted more heavily than old ones.

The decay mechanism is designed to be humane while remaining accurate. It operates on a gentle curve rather than a cliff: your XP gradually decreases over months of inactivity, not overnight.

Several factors affect decay rate:
- Overall XP level (higher XP decays slightly slower, reflecting demonstrated track record)
- Verification quality of recent contributions (higher quality contributions decay slower)
- Axes-specific decay (some axes decay faster than others based on how quickly the field evolves)

We also explore sabbatical mode for planned absences: users can flag extended time away, and decay is paused or reduced during the sabbatical period. This acknowledges that life happens—parenting, illness, personal growth periods—and that punishing people for reasonable life circumstances would undermine the system's accuracy.

### 3.4.1 Decay Schedule

| Axis Category | Monthly Decay Rate | Notes |
|---------------|-------------------|-------|
| Frontend Dev | 3% | Field evolves rapidly |
| Backend Dev | 2% | Stable but changing |
| DevOps | 4% | Tools change frequently |
| Security | 1% | Principles remain constant |
| Data Engineering | 2.5% | Moderate change pace |
| Mobile Dev | 3.5% | Platform changes often |
| Documentation | 5% | Docs age quickly |
| Mentorship | 1% | Impact persists |
| Leadership | 1.5% | Principles persist |

### 3.4.2 Sabbatical Mode

```typescript
interface SabbaticalRequest {
  userId: string;
  durationWeeks: number;
  reason: string;
}

class SabbaticalService {
  async startSabbatical(request: SabboticalRequest): Promise<SabboticalResult> {
    const user = await this.getUser(request.userId);
    
    if (user.xpRaw < 100) {
      throw new Error('Minimum 100 XP required for sabbatical');
    }

    const sabbaticalUntil = new Date();
    sabboticalUntil.setDate(sabboticalUntil.getDate() + request.durationWeeks * 7);

    await this.updateUser(user.id, {
      sabbaticalUntil,
      status: 'sabbatical'
    });

    // Freeze decay calculations
    await this.freezeDecay(user.id, sabboticalUntil);

    return {
      success: true,
      sabboticalUntil,
      xpPreserved: await this.getTotalXP(user.id)
    }

  async endSabbatical(userId: string): Promise<void> {
    await this.updateUser(userId, {
      sabboticalUntil: null,
      status: 'active'
    });

    // Resume decay calculations
    await this.unfreezeDecay(userId);
  }
}
```

---

## 3.5 Bond Logic — Active-Staked Reputation

This section introduces **Active-Staked Reputation (Bonds)**, which operates alongside the passive XP system described above. The key distinction:

| Concept | Trigger | Behavior |
|---------|---------|----------|
| **Passive XP** | Time + Activity | Decays gently when idle (3%/month for Frontend, etc.) |
| **Active Bond** | Staking action | Subject to collateral forfeiture when you break production |

### 3.5.1 Two-Tier Reputation Model

The system maintains two parallel reputation tracks:

**Passive Reputation (XP)**
- Automatically accumulated through contributions
- Decays at skill-specific rates when idle
- Never goes negative — floors at 0
- Represents: "What you've demonstrated over time"

**Active-Staked Reputation (Bonds)**
- Optional layer: stake XP to signal confidence
- Subject to collateral forfeiture events
- Represents: "What you're willing to risk on this outcome"

### 3.5.2 Bond Mechanics

```typescript
interface Bond {
  userId: string;
  amount: number;           // XP staked
  projectId: string;
  createdAt: Date;
  status: 'active' | 'slashed' | 'released';
  slashReason?: string;
}

interface SlashCondition {
  condition: string;
  severity: 'partial' | 'full';
  percentage: number;      // % of bond lost
}

// Slash Conditions
const SLASH_CONDITIONS: SlashCondition[] = [
  {
    condition: 'Merge breaking change causing P0 outage',
    severity: 'full',
    percentage: 100
  },
  {
    condition: 'Security vulnerability introduced',
    severity: 'full', 
    percentage: 100
  },
  {
    condition: 'Critical bug shipped (CVE)',
    severity: 'partial',
    percentage: 50
  },
  {
    condition: 'Abandoned critical service',
    severity: 'partial',
    percentage: 75
  }
];

// Decay vs Slash Distinction
// --------------------------------
// DECAY happens when:
// - You are idle (no contributions)
// - Time passes without activity
// - Gentle, predictable, non-punitive
//
// SLASH happens when:
// - You make a specific bad decision
// - Your code causes a verified failure
// - Binary, harsh, accountability-focused
```

### 3.5.3 Bond Implementation

```typescript
class BondService {
  async stakeBond(userId: string, projectId: string, amount: number): Promise<Bond> {
    const userXP = await this.getUserXP(userId);
    
    if (userXP.available < amount) {
      throw new Error('Insufficient XP to stake');
    }
    
    // Reserve XP from available pool
    await this.reserveXP(userId, amount);
    
    return await this.createBond({
      userId,
      projectId,
      amount,
      status: 'active',
      createdAt: new Date()
    });
  }

  async processSlashEvent(
    projectId: string, 
    condition: SlashCondition
  ): Promise<void> {
    const activeBonds = await this.getActiveBonds(projectId);
    
    for (const bond of activeBonds) {
      const slashAmount = Math.floor(bond.amount * (condition.percentage / 100));
      
      // Remove slashed XP permanently
      await this.burnXP(bond.userId, slashAmount);
      
      // Update bond status
      await this.updateBond(bond.id, {
        status: condition.severity === 'full' ? 'slashed' : 'active',
        slashReason: condition.condition
      });
      
      // Log the event for transparency
      await this.logSlashEvent({
        userId: bond.userId,
        amount: slashAmount,
        reason: condition.condition,
        timestamp: new Date()
      });
    }
  }

  async releaseBond(bondId: string): Promise<void> {
    const bond = await this.getBond(bondId);
    
    if (bond.status !== 'active') {
      throw new Error('Cannot release non-active bond');
    }
    
    // Return XP to available pool (not the original amount - 
    // original is "spent" as a signal, returns as unstaked)
    await this.releaseXP(bond.userId, bond.amount);
    
    await this.updateBond(bondId, { status: 'released' });
  }
}
```

### 3.5.4 Metaphor Clarification

> **Why "Bonds" instead of "Ash Trees" or "Durability"?**
>
> The bond/slash terminology is intentional:
> - **Bonds**: Financial/investment metaphor — you're putting something at stake
> - **Slash**: Immediate consequence — something was cut/removed
>
> This is the **economic layer** of the platform, not the game layer.
> The Execution Squad model (Chapter 4) handles team matching — 
> the Bond system handles accountability.
>
> They serve different purposes and use different metaphors deliberately.

---

## 3.6 XP Analytics and Reporting

### 3.5.1 Metrics Tracked

| Metric | Description | Update Frequency |
|--------|-------------|------------------|
| Total XP | Sum of all decayed XP | Real-time |
| XP Velocity | XP earned per week | Weekly |
| Verification Rate | Percentage of contributions verified | Daily |
| Trust Score | Composite trust measurement | Hourly |
| Axis Distribution | XP breakdown by axis | Real-time |
| Decay Impact | XP lost to decay | Monthly |

### 3.5.2 Analytics Dashboard

```typescript
interface XPAnalytics {
  personal: {
    totalXP: number;
    xpByAxis: { axis: string; xp: number }[];
    xpTrend: { date: string; xp: number }[];
    trustScore: number;
    rank: number;
    decayProjection: { date: string; projectedXP: number }[];
  };
  platform: {
    topContributors: { userId: string; xp: number }[];
    axisDistribution: { axis: string; totalXP: number }[];
    verificationRate: number;
    avgXPPerContribution: number;
  };
}
```

---

## 3.6 Building and Simulation Testing

### 3.6.1 XP System Validation Architecture

The XP System represents the core calculation engine of FatedFortress. Before deployment, every component must be validated through systematic simulation using AI agents posing as contributors with varied profiles.

**Validation Objectives:**
```
Primary Goals:
├── Ensure XP accurately reflects demonstrated capability
├── Verify decay mechanisms maintain relevance over time
├── Confirm verification pipeline produces reliable quality scores
└── Test system behavior under adversarial conditions

Secondary Goals:
├── Validate API response times under load
├── Test database query performance at scale
├── Verify cache invalidation strategies
└── Assess concurrent calculation capacity
```

### 3.6.2 AI Agent Contributor Population

Create 10,000 AI agents simulating contributors with realistic distributions:

```
Agent Contribution Profiles:

Profile Type A: Steady Contributor (30%) - 3,000 agents
├── Daily contributions: 2-5 per day
├── Contribution types: 60% features, 25% bugfixes, 15% maintenance
├── Complexity distribution: 20% simple, 50% medium, 30% complex
├── Verification rate: 85%
├── Quality score: 0.75-0.90
└── Activity pattern: Consistent daily activity

Profile Type B: Sprint Specialist (20%) - 2,000 agents
├── Daily contributions: 0-2 most days, 15-20 during sprints
├── Contribution types: 70% features, 20% bugfixes, 10% infrastructure
├── Complexity distribution: 10% simple, 40% medium, 50% complex
├── Verification rate: 90%
├── Quality score: 0.80-0.95
└── Activity pattern: 2-week intense sprints, 2-week breaks

Profile Type C: Quality Over Quantity (15%) - 1,500 agents
├── Daily contributions: 1-2 per day
├── Contribution types: 80% features, 5% bugfixes, 15% architecture
├── Complexity distribution: 5% simple, 30% medium, 65% complex
├── Verification rate: 98%
├── Quality score: 0.90-0.99
└── Activity pattern: Deliberate, thoughtful contributions

Profile Type D: Volume Operator (15%) - 1,500 agents
├── Daily contributions: 10-30 per day
├── Contribution types: 40% features, 50% bugfixes, 10% docs
├── Complexity distribution: 60% simple, 35% medium, 5% complex
├── Verification rate: 60%
├── Quality score: 0.50-0.70
└── Activity pattern: High volume, lower deliberation

Profile Type E: Occasional Contributor (20%) - 2,000 agents
├── Daily contributions: 0-1 most days, 5-10 during active periods
├── Contribution types: Variable based on interest
├── Complexity distribution: Mixed
├── Verification rate: 70%
├── Quality score: 0.60-0.85
└── Activity pattern: Sporadic engagement

Edge Cases (simulated scenarios):
├── Long-term inactive (2%): 6+ months no activity
├── Rapid learner (1%): Skill improvement rate 50% above average
├── Recovery arc (1%): Starting low, improving over time
└── Decline arc (1%): Starting high, decreasing engagement
```

### 3.6.3 XP Calculation Validation Tests

**Test 1: Base XP Calculation Accuracy**

```
Scenario: 1,000 agents submit 50,000 contributions over 30 days

Verification Protocol:
├── Each contribution has pre-determined "true" XP value
├── Compare calculated XP vs. expected XP
├── Calculate accuracy rate: should exceed 95%
├── Identify systematic biases (axis, complexity, verification)
└── Generate calibration recommendations

Expected Thresholds:
├── Mean absolute error: < 5 XP per contribution
├── Standard deviation: < 10 XP
├── Systematic bias: < 2% deviation
└── Axis-specific accuracy: All axes within 5% of expected
```

**Test 2: Complexity Multiplier Validation**

```
Scenario: Contributions of known complexity submitted

Complexity Levels:
├── Level 1 (Trivial): Documentation typos, minor formatting
├── Level 2 (Simple): Small bugfixes, simple features
├── Level 3 (Moderate): Standard feature development
├── Level 4 (Complex): Major features, architectural changes
└── Level 5 (Expert): Novel solutions, system design

Validation:
├── AI expert panel assigns complexity scores
├── Compare XP system complexity vs. expert assessment
├── Calculate inter-rater reliability (should exceed κ = 0.7)
├── Identify systematic misclassification
└── Calibrate multipliers if deviation > 10%
```

**Test 3: Verification Quality Multiplier**

```
Scenario: Same contribution verified by multiple agents

Test Design:
├── 100 contributions submitted
├── Each verified by 5-10 agents
├── Compare verification quality scores
├── Analyze variance between verifiers
├── Test stability of quality classification

Expected Results:
├── Intra-class correlation: > 0.8
├── Agreement rate: > 85% within 0.1 tolerance
├── Systematic bias: < 5% between verifier groups
└── Quality tier separation: Clear separation between tiers
```

### 3.6.4 Decay Mechanism Testing

**Test 4: Decay Curve Validation**

```
Scenario: Agents stop contributing at varying trust levels

Test Parameters:
├── 500 agents stop contributing entirely
├── 500 agents reduce activity by 90%
├── Track XP decay over 12 months
├── Compare against expected decay curves

Metrics to Validate:
├── Decay accuracy: Actual decay matches theoretical decay
├── Trust floor: Minimum trust level after extended inactivity
├── Recovery potential: How fast can decayed trust be recovered?
└── Plateau detection: When does decay become negligible?

Pass Criteria:
├── 95% of agents' decay within ±5% of theoretical
├── Trust floor: Minimum 0.15 trust score (not zero)
├── Recovery curve: 80% recovery achievable within 3 months of active contribution
```

**Test 5: Sabbatical Mode Validation**

```
Scenario: Agents take planned sabbaticals

Test Cases:
├── 4-week sabbatical: Should pause decay almost entirely
├── 12-week sabbatical: Should reduce decay impact by 75%
├── 26-week sabbatical: Should reduce decay impact by 50%
├── Multiple sabbaticals: Cumulative effect testing

Validation:
├── Compare sabbatical users vs. inactive non-sabbatical users
├── Measure trust preservation effectiveness
├── Test sabbatical eligibility enforcement
└── Verify return-to-activity transition smoothness

Expected Results:
├── 4-week sabbatical: > 95% trust preserved
├── 12-week sabbatical: > 85% trust preserved
├── 26-week sabbatical: > 70% trust preserved
└── Return period: Full trust recovery within 8 weeks
```

### 3.6.5 Verification Pipeline Stress Testing

**Test 6: Throughput and Latency**

```
Load Testing Scenarios:
├── Baseline: 1,000 contributions/day
├── Normal Load: 10,000 contributions/day
├── Peak Load: 100,000 contributions/day
├── Stress: 500,000 contributions/day
├── Breakpoint: Find system limits

Metrics:
├── Processing time per contribution (target: < 100ms at normal load)
├── Queue depth under load (target: < 1,000 at peak)
├── Failure rate under load (target: < 0.1% at peak)
└── Recovery time after spike (target: < 5 minutes)

Infrastructure Requirements:
├── Auto-scaling verification capacity
├── Queue prioritization for high-value contributions
├── Circuit breaker for downstream services
└── Graceful degradation strategy
```

**Test 7: Manual Review Assignment**

```
Scenario: Contributions requiring manual review

Test Parameters:
├── 10% of contributions require manual review
├── Average review load per verifier: 50-100 reviews/day
├── Review deadline: 72 hours
├── Reviewer capacity varies by trust level

Validation:
├── Assignment algorithm distributes reviews fairly
├── Deadlines are met > 95% of time
├── Review quality remains consistent under load
├── No reviewer burnout patterns emerge

AI Simulated Reviewers:
├── 100 AI agents act as verifiers
├── Each handles 50-200 reviews/day
├── Quality scores tracked per AI verifier
└── Comparison against human reviewer baseline
```

### 3.6.6 Adversarial Scenario Testing

**Test 8: XP Gaming Attempts**

```
Scenario: Agents attempt to maximize XP with minimal work

Attack Vector 1: Shallow Contributions
├── Strategy: Many simple contributions to accumulate XP
├── Detection: Quality score decline, verification failures
├── Penalty: Complexity multipliers, quality thresholds
└── Expected Result: Gaming attempts detected within 48 hours

Attack Vector 2: Verification Collusion
├── Strategy: Groups verify each other's work
├── Detection: Unusual verification clustering, circular patterns
├── Penalty: Verification quality decay, cross-verification
└── Expected Result: Collusion rings identified within 1 week

Attack Vector 3: Contribution Splitting
├── Strategy: Split one contribution into multiple smaller ones
├── Detection: Unusual contribution size patterns
├── Penalty: Combined complexity cap, axis alignment checks
└── Expected Result: Splitting patterns identified within 1 week

Attack Vector 4: Review Gaming
├── Strategy: Submit easy-to-verify low-quality contributions
├── Detection: Quality/impact mismatch analysis
├── Penalty: Impact weighting, verification quality multipliers
└── Expected Result: Gaming detected within 48 hours
```

**Test 9: Sybil Attack Simulation**

```
Scenario: Single actor creates multiple accounts

Attack Parameters:
├── 50 fake accounts per attacker
├── 20 attackers = 1,000 fake accounts
├── Coordinated behavior across accounts
├── Goal: Accumulate trust and verify each other

Detection Methods:
├── Behavioral fingerprinting across accounts
├── Contribution pattern similarity analysis
├── Verification network analysis
├── IP/device fingerprinting (privacy-preserving)

Expected Results:
├── 95% of fake accounts detected within 2 weeks
├── Remaining false positives: < 1% of legitimate users
└── Successful attacks impact: < 0.1% of total XP
```

### 3.6.7 Scale and Performance Testing

**Test 10: System Capacity Validation**

```
Scale Targets:
├── Active users: 100,000 to 1,000,000
├── Daily contributions: 1,000,000 to 10,000,000
├── XP calculations per day: 10,000,000 to 100,000,000
├── Trust recalculations: Hourly batch processing

Performance Requirements:
├── API response time: P95 < 200ms
├── XP calculation latency: < 50ms per contribution
├── Trust update latency: < 1 hour after contribution
├── Dashboard refresh: < 5 seconds

Load Testing Protocol:
├── Ramp-up: 0 to 100,000 users over 1 hour
├── Sustain: Peak load for 8 hours
├── Cool-down: Gradual reduction over 1 hour
└── Recovery: Verify data consistency after load
```

### 3.6.8 Integration Testing with Other Systems

```
Test Dependencies:
├── User States (Chapter 5): Permission-aware XP operations
├── Team Formation (Chapter 4): Trust-based matching
├── Revenue System (Chapter 9): Subscription XP multipliers
└── RSI System (Chapter 10): Automated optimization

Integration Test Scenarios:
├── New user journey: Sign-up → First contribution → Trust accumulation
├── Team formation: Matching based on XP Profiles
├── Subscription purchase: XP multiplier activation
└── RSI optimization: System learning from patterns
```

### 3.6.9 Simulation Output Specification

```
For XP System Validation:
├── Contribution-by-contribution XP calculation audit
├── Decay curve fitting analysis
├── Verification quality consistency report
├── Performance benchmarking results
├── Adversarial attack defense report
└── Scale testing stress results

For Production Readiness:
├── Performance baseline established
├── Capacity recommendations documented
├── Scaling triggers identified
├── Alert thresholds calibrated
└── Runbook for common issues
```

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY
# Chapter 4: Team Composition — Role Archetypes

*"Role archetypes based on function, not hierarchy."*

---

## 4.1 Why Teams Need Structure

Effective teams have complementary skills and clear roles. But traditional team structures—PM, Tech Lead, Senior Developer, Junior Developer—are based on hierarchy rather than function. The role archetype model is based on what people actually do, rather than their organizational status.

> **Note on Terminology:** This document uses two parallel vocabularies:
> - **RPG Terms** (Execution Squad): Used for community/matching/UI
> - **Industrial Terms** (Crucible): Used for accountability/bonds/collateral forfeiture
>
> This separation ensures the metaphor serves its purpose without genre confusion.

These archetypes aren't rigid categories. Real teams are messier than any model. Someone might serve as Architect and Mentor simultaneously. A small project might have one person doing Builder and Navigator work. The model is a heuristic for thinking about team composition, not a required template.

## 4.2 The Archetypes

| RPG Term | Industrial Equivalent | Primary Function |
|----------|----------------------|------------------|
| **Architect** | Lead Engineer / Systems Designer | Sees the system whole |
| **Builder** | Contractor / Implementer | Translates design into code |
| **Guardian** | Auditor / QA Lead | Protects quality |
| **Navigator** | Project Coordinator | Coordinates and aligns |
| **Mentor** | Technical Coach | Elevates others |
| **Patron** | Sponsor | Provides resources |

### Detailed Role Definitions

**The Lead** (Industrial: Lead Engineer / Systems Designer)
sees the system whole. They make big-picture decisions, define interfaces between components, and ensure technical coherence across the project. They're thinking about where the system should go in six months while others are focused on this week's milestones. Architects earn XP for architectural decisions that lead to successful outcomes, for mentoring others in system design, and for technical leadership that guides teams effectively.

**The Engineer** (Industrial: Contractor / Implementer)
translates design into working code. They take architecture and specifications and produce implementation. They're often the highest-volume contributors in terms of lines of code, but quality matters as much as quantity. Builders earn XP for successfully implemented features, for code quality that passes rigorous review, and for maintaining productive velocity over time.

**The Auditor** (Industrial: Auditor / QA Lead)
protects quality. They test, review, and catch bugs before users find them. They think about edge cases, security implications, and operational risks. Guardians earn XP for finding bugs before they ship, for improving test coverage, and for code reviews that make substantive improvements to contributions.

**The Navigator** (Industrial: Project Coordinator)
coordinates, communicates, and keeps the team aligned. They manage scope, communicate with stakeholders, and ensure the team has what it needs to succeed. Navigators earn XP for successful project delivery, for stakeholder satisfaction, and for keeping teams functioning smoothly.

**The Mentor** (Industrial: Technical Coach)
elevates others. They invest time in helping others grow, sharing knowledge, and building up the capabilities of those around them. Mentors earn XP for documented impact on others' growth, for knowledge sharing that produces results, and for contributions that multiply others' effectiveness.

**The Patron** (Industrial: Sponsor)
provides resources. This is a voluntary role where financial contribution or resource provision is recognized as a valid merit axis. Patrons earn XP by creating conditions that enable others to succeed—funding projects, providing infrastructure, removing blockers that money can solve.

---

## 4.3 Mapping to Code Architecture

The role archetypes connect directly to the platform's monorepo structure:

| Role | Code Responsibility | Package |
|------|---------------------|---------|
| **Architect** | Zod schemas, validation logic, type definitions | `@fated/types` |
| **Builder** | Feature implementation, API routes | `@fated/api`, `@fated/apps` |
| **Guardian** | Test suites, security scanning, code review logic | `@fated/verification` |
| **Navigator** | Matching algorithm, team coordination | `@fated/matchmaker` |
| **Mentor** | Documentation, onboarding flows | `@fated/docs` |
| **Patron** | Billing, resource allocation | `@fated/billing` |

> **See Also:** Chapter 6 — Key System Components for dependency details.

---

## 4.3 Team Formation on FatedFortress

Teams form through a combination of AI matching and human selection. The platform's algorithm proposes potential team compositions based on complementary XP Profiles, collaboration history, availability, and project requirements.

### 4.3.1 Role-XP Mapping

```typescript
interface RoleAxisMapping {
  role: string;
  primaryAxes: string[];
  secondaryAxes: string[];
  minTrustScore: number;
  maxTeamSize: number;
}

const ROLE_AXIS_MAPPINGS: RoleAxisMapping[] = [
  {
    role: 'Architect',
    primaryAxes: ['Backend Development', 'System Architecture'],
    secondaryAxes: ['Technical Leadership', 'Security'],
    minTrustScore: 0.75,
    maxTeamSize: 1
  },
  {
    role: 'Builder',
    primaryAxes: ['Backend Development', 'Frontend Development', 'Mobile Development'],
    secondaryAxes: ['DevOps', 'Testing'],
    minTrustScore: 0.50,
    maxTeamSize: null  // No limit
  },
  {
    role: 'Guardian',
    primaryAxes: ['Security', 'Quality Assurance'],
    secondaryAxes: ['DevOps', 'Backend Development'],
    minTrustScore: 0.60,
    maxTeamSize: null
  },
  {
    role: 'Navigator',
    primaryAxes: ['Project Management', 'Cross-functional Coordination'],
    secondaryAxes: ['Documentation', 'Community Building'],
    minTrustScore: 0.55,
    maxTeamSize: 2
  },
  {
    role: 'Mentor',
    primaryAxes: ['Mentorship', 'Technical Leadership'],
    secondaryAxes: ['Documentation', 'Community Building'],
    minTrustScore: 0.70,
    maxTeamSize: null
  },
  {
    role: 'Patron',
    primaryAxes: ['Patronage'],
    secondaryAxes: [],
    minTrustScore: 0.40,
    maxTeamSize: null
  }
];
```

### 4.3.2 Matching Algorithm Implementation

```typescript
interface TeamMatchingParams {
  projectId: string;
  requiredRoles: string[];
  targetTeamSize: number;
  deadline: Date;
  priorityAxes: string[];
  preferredCollaborators: string[];
  avoidCollaborators: string[];
}

interface MatchScore {
  userId: string;
  overallScore: number;
  roleScores: Map<string, number>;
  collaborationScore: number;
  availabilityScore: number;
  axisScore: number;
  concerns: string[];
}

class TeamMatchingAlgorithm {
  async findOptimalTeam(params: TeamMatchingParams): Promise<TeamProposal> {
    // Step 1: Gather candidate pool
    const candidates = await this.getCandidatePool(params);

    // Step 2: Score each candidate for each role
    const roleScores = new Map<string, MatchScore[]>();
    
    for (const role of params.requiredRoles) {
      const scoredCandidates = await this.scoreCandidatesForRole(
        candidates,
        role,
        params.priorityAxes
      );
      roleScores.set(role, scoredCandidates);
    }

    // Step 3: Find compatible combinations
    const combinations = await this.generateTeamCombinations(
      roleScores,
      params.targetTeamSize,
      params.preferredCollaborators,
      params.avoidCollaborators
    );

    // Step 4: Rank combinations
    const rankedCombinations = await this.rankCombinations(
      combinations,
      params.requiredRoles,
      params.deadline
    );

    // Step 5: Return top proposal
    return rankedCombinations[0];
  }

  private async scoreCandidatesForRole(
    candidates: User[],
    role: string,
    priorityAxes: string[]
  ): Promise<MatchScore[]> {
    const roleConfig = ROLE_AXIS_MAPPINGS.find(r => r.role === role)!;
    const scores: MatchScore[] = [];

    for (const candidate of candidates) {
      const axisScore = await this.calculateAxisScore(
        candidate,
        roleConfig.primaryAxes,
        roleConfig.secondaryAxes,
        priorityAxes
      );

      const collaborationScore = await this.getCollaborationScore(candidate.id);
      const availabilityScore = await this.getAvailabilityScore(candidate.id);

      const overallScore = 
        axisScore * 0.50 +
        collaborationScore * 0.30 +
        availabilityScore * 0.20;

      const concerns = await this.identifyConcerns(candidate, role);

      scores.push({
        userId: candidate.id,
        overallScore,
        roleScores: new Map([[role, overallScore]]),
        collaborationScore,
        availabilityScore,
        axisScore,
        concerns
      });
    }

    return scores.sort((a, b) => b.overallScore - a.overallScore);
  }

  private async calculateAxisScore(
    userId: string,
    primaryAxes: string[],
    secondaryAxes: string[],
    priorityAxes: string[]
  ): Promise<number> {
    const userXP = await this.getUserXPByAxis(userId);
    let score = 0;
    let maxScore = 0;

    // Primary axes weighted heavily
    for (const axis of primaryAxes) {
      const xp = userXP.get(axis) || 0;
      const weight = priorityAxes.includes(axis) ? 2.0 : 1.0;
      score += xp * weight;
      maxScore += xp * weight + 1000; // Normalize
    }

    // Secondary axes weighted moderately
    for (const axis of secondaryAxes) {
      const xp = userXP.get(axis) || 0;
      score += xp * 0.5;
      maxScore += xp * 0.5 + 500;
    }

    return Math.min(score / maxScore, 1);
  }

  private async generateTeamCombinations(
    roleScores: Map<string, MatchScore[]>,
    targetSize: number,
    preferredCollaborators: string[],
    avoidCollaborators: string[]
  ): Promise<TeamCombination[]> {
    const combinations: TeamCombination[] = [];

    // Get top candidates for each role
    const roleTopCandidates = new Map<string, MatchScore[]>();
    for (const [role, scores] of roleScores) {
      roleTopCandidates.set(role, scores.slice(0, 10));
    }

    // Generate combinations (simplified - would use optimization in production)
    const roles = Array.from(roleScores.keys());
    
    function generate(
      currentTeam: MatchScore[],
      remainingRoles: string[],
      usedUsers: Set<string>
    ): void {
      if (remainingRoles.length === 0 || currentTeam.length >= targetSize) {
        combinations.push({
          members: currentTeam,
          score: calculateTeamScore(currentTeam),
          compatibility: calculateCompatibility(currentTeam)
        });
        return;
      }

      const role = remainingRoles[0];
      const candidates = roleTopCandidates.get(role) || [];

      for (const candidate of candidates) {
        if (usedUsers.has(candidate.userId)) continue;
        if (avoidCollaborators.includes(candidate.userId)) continue;

        const roleCandidate = {
          ...candidate,
          assignedRole: role
        };

        generate(
          [...currentTeam, roleCandidate],
          remainingRoles.slice(1),
          new Set([...usedUsers, candidate.userId])
        );
      }
    }

    generate([], roles, new Set());
    return combinations;
  }

  private async rankCombinations(
    combinations: TeamCombination[],
    requiredRoles: string[],
    deadline: Date
  ): Promise<TeamProposal[]> {
    const proposals: TeamProposal[] = [];

    for (const combo of combinations) {
      const roleCoverage = new Set<string>();
      for (const member of combo.members) {
        for (const [role] of member.roleScores) {
          roleCoverage.add(role);
        }
      }

      const allRolesCovered = requiredRoles.every(r => roleCoverage.has(r));
      if (!allRolesCovered) continue;

      const proposal: TeamProposal = {
        members: combo.members.map(m => ({
          userId: m.userId,
          assignedRole: m.assignedRole,
          matchScore: m.overallScore
        })),
        overallScore: combo.score,
        compatibilityScore: combo.compatibility,
        deadline,
        nextSteps: [
          'Review proposed team composition',
          'Contact potential members',
          'Confirm availability',
          'Schedule kickoff meeting'
        ]
      };

      proposals.push(proposal);
    }

    return proposals.sort((a, b) => b.overallScore - a.overallScore);
  }
}
```

### 4.3.3 Collaboration History Scoring

```typescript
interface CollaborationHistory {
  userId1: string;
  userId2: string;
  projectsTogether: number;
  successfulProjects: number;
  conflicts: number;
  avgXPPerProject: number;
  lastCollaborated: Date;
}

class CollaborationScoring {
  async calculateCollaborationScore(
    userId1: string,
    userId2: string
  ): Promise<number> {
    const history = await this.getCollaborationHistory(userId1, userId2);
    
    if (!history) return 0.5; // Default neutral score

    const successRate = history.successfulProjects / Math.max(history.projectsTogether, 1);
    const conflictPenalty = Math.min(history.conflicts * 0.1, 0.3);
    const recencyBonus = this.calculateRecencyBonus(history.lastCollaborated);
    const volumeBonus = Math.min(history.avgXPPerProject / 100, 0.2);

    let score = (successRate * 0.5) + (0.2) + recencyBonus + volumeBonus - conflictPenalty;
    
    return Math.min(Math.max(score, 0), 1);
  }

  private calculateRecencyBonus(lastDate: Date): number {
    const daysSince = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSince < 30) return 0.15;
    if (daysSince < 90) return 0.10;
    if (daysSince < 180) return 0.05;
    return 0;
  }
}
```

### 4.3.4 Team Formation API

```typescript
// Team Formation API Endpoints

POST /api/teams/create
  Body: {
    projectId: string,
    teamName: string,
    description: string,
    requiredRoles: string[],
    targetSize: number,
    deadline: Date
  }
  Returns: { teamId, proposalId }

POST /api/teams/propose
  Body: { projectId: string, requirements: TeamMatchingParams }
  Returns: { proposals: TeamProposal[] }

GET /api/teams/proposals/:proposalId
  Returns: {
    proposalId,
    suggestedMembers: { userId, role, matchScore, availability }[],
    compatibilityScore,
    nextSteps
  }

POST /api/teams/invite
  Body: { userId: string, teamId: string, role: string }
  Returns: { inviteId, status }

POST /api/teams/accept-invite
  Body: { inviteId: string }
  Returns: { teamMembershipId, welcomeMessage }

GET /api/teams/:teamId
  Returns: {
    teamId,
    name,
    members: { userId, username, role, xp, joinedAt }[],
    project: { id, name, status },
    teamTrustScore
  }

PUT /api/teams/:teamId/roles
  Body: { memberId: string, newRole: string }
  Returns: { success, updatedMembership }

POST /api/teams/:teamId/archive
  Body: { outcome: 'successful' | 'completed' | 'disbanded' }
  Returns: { archivedTeamId, statistics }
```

---

## 4.4 Scaling Team Concepts

Small teams (2-4 people) often have everyone playing multiple roles. One person might be Architect and Builder. Another might be Navigator and Guardian. The model adapts.

Medium teams (5-9 people) can more naturally assign distinct roles. This is often the sweet spot for the Execution Squad model, where you can have dedicated people for each primary archetype.

Large teams (10+) need multiple people in each role, potentially with sub-teams that have their own internal structure. The model still applies at the sub-team level, with Architects leading technical direction, Guardians protecting quality in each sub-team, and Navigators coordinating across teams.

### 4.4.1 Team Size Guidelines

| Team Size | Recommended Roles | Complexity Level |
|-----------|------------------|------------------|
| 1-2 | Any combination | Solo/Small |
| 3-5 | 3-4 distinct roles | Medium |
| 6-9 | All 6 archetypes | Optimal |
| 10-15 | 2+ per archetype | Complex |
| 15+ | Sub-teams recommended | Very Complex |

### 4.4.2 Sub-Team Structure

```typescript
interface SubTeam {
  id: string;
  parentTeamId: string;
  name: string;
  assignedRole: string;
  members: SubTeamMember[];
  leadId: string;
  scope: string[];
  deliverables: string[];
}

const SUB_TEAM_CONFIG = {
  minSize: 2,
  maxSize: 5,
  recommendedRolesPerSubteam: 2,
  crossTeamCoordinators: 1
};
```

---

## 4.5 Team Lifecycle Management

### 4.5.1 Team States

| State | Description | Allowed Actions |
|-------|-------------|-----------------|
| proposed | Initial proposal | edit, accept_invites, delete |
| forming | Members joining | accept_invites, update_roles |
| active | Working on project | all_actions |
| on_hold | Temporary pause | resume, archive |
| completed | Project done | view_history, archive |
| disbanded | Early end | view_history |

### 4.5.2 Team Metrics

```typescript
interface TeamMetrics {
  teamId: string;
  formationDate: Date;
  completionDate?: Date;
  totalMembers: number;
  avgTrustScore: number;
  xpGenerated: number;
  contributionsCompleted: number;
  onTimeDeliveryRate: number;
  conflictIncidents: number;
  roleDistribution: Map<string, number>;
}
```

---

## 4.6 Building and Simulation Testing

### 4.6.1 Execution Squad Model Validation Framework

The Execution Squad Model relies on complex matching algorithms to form effective teams from XP Profiles. Before deployment, every aspect of team formation must be validated through simulation with AI agents posing as team members with diverse collaboration styles, skill profiles, and interpersonal dynamics.

**Validation Objectives:**
```
Primary Goals:
├── Verify matching algorithm produces high-capability teams
├── Confirm role-XP mappings accurately predict role suitability
├── Validate collaboration history scoring predicts team success
└── Test team lifecycle under various conditions

Secondary Goals:
├── Measure team formation efficiency (time to complete teams)
├── Validate sub-team scaling for large projects
├── Test cross-team coordination mechanisms
└── Assess team health monitoring accuracy
```

### 4.6.2 AI Agent Team Member Population

Create 5,000 AI agents with programmed team behaviors:

```
Agent Team Behavior Profiles:

Profile A: Collaborative Team Player (25%) - 1,250 agents
├── Team preference: Group work over solo
├── Communication style: Frequent, supportive
├── Conflict style: Collaborative problem-solving
├── Role flexibility: High (willing to adapt)
├── Past team successes: 75%
├── Known for: Mentorship, reliability
└── XP distribution: Balanced across axes

Profile B: Solo Expert (20%) - 1,000 agents
├── Team preference: Minimal team interaction
├── Communication style: Direct, minimal
├── Conflict style: Avoidance with workarounds
├── Role flexibility: Low (prefers specialized role)
├── Past team successes: 60%
├── Known for: Deep expertise, quality work
└── XP distribution: Heavy in 2-3 axes

Profile C: Social Catalyst (15%) - 750 agents
├── Team preference: Large, visible teams
├── Communication style: Energetic, motivating
├── Conflict style: Social smoothing
├── Role flexibility: Medium (prefers Navigator)
├── Past team successes: 70%
├── Known for: Morale boosting, networking
└── XP distribution: Collaboration-heavy

Profile D: Quality Guardian (15%) - 750 agents
├── Team preference: Small, quality-focused teams
├── Communication style: Detail-oriented, thorough
├── Conflict style: Evidence-based debate
├── Role flexibility: Medium (prefers Guardian)
├── Past team successes: 80%
├── Known for: Bug prevention, standards
└── XP distribution: Security and QA heavy

Profile E: Speed Optimizer (10%) - 500 agents
├── Team preference: Fast-moving teams
├── Communication style: Quick, action-oriented
├── Conflict style: Quick decisions, moving on
├── Role flexibility: High (prefex Builder)
├── Past team successes: 55%
├── Known for: Velocity, shipping fast
└── XP distribution: DevOps and feature-heavy

Profile F: Architectural Thinker (10%) - 500 agents
├── Team preference: Strategic, long-term teams
├── Communication style: Conceptual, thought-provoking
├── Conflict style: Deep analysis before decisions
├── Role flexibility: Low (prefers Architect)
├── Past team successes: 65%
├── Known for: System design, foresight
└── XP distribution: Backend and architecture heavy

Profile G: Mentor Teacher (5%) - 250 agents
├── Team preference: Teams with growth potential
├── Communication style: Educational, patient
├── Conflict style: Teaching moments
├── Role flexibility: High (primary Mentor)
├── Past team successes: 85%
├── Known for: Capability building, patience
└── XP distribution: Mentorship axis dominant
```

### 4.6.3 Matching Algorithm Validation Tests

**Test 1: Role Suitability Prediction**

```
Scenario: 1,000 team formation requests with known optimal compositions

Test Design:
├── Each request has pre-determined "ideal" team
├── AI matching algorithm proposes teams
├── Compare proposal quality vs. known optimum
├── Measure: Role coverage, capability matching, chemistry prediction

Role-XP Mapping Validation:
├── For each archetype, test 100 agents with varying XP Profiles
├── Expert panel rates role suitability (1-10)
├── Compare XP-based prediction vs. expert assessment
├── Calculate correlation (target: r > 0.8)

Pass Criteria:
├── Algorithm proposes teams within 10% of optimal capability
├── Role coverage achieved > 95% of requests
├── Collaboration score prediction accuracy > 80%
└── Formation time < 24 hours for 99% of requests
```

**Test 2: Team Chemistry Simulation**

```
Scenario: 500 teams formed and tracked through project completion

Simulation Protocol:
├── Form teams using matching algorithm
├── Assign AI personalities (from profiles above)
├── Simulate 12-week project lifecycle
├── Track collaboration quality, conflict incidents, outcomes
└── Correlate algorithm predictions with actual results

Chemistry Factors Tested:
├── Role complementarity (Do teams have all needed skills?)
├── Personality compatibility (Will they work together?)
├── Communication style matching (Will information flow?)
├── Leadership clarity (Are roles clearly defined?)
└── Conflict resolution capacity (Can they handle disagreements?)

Expected Results:
├── Algorithm predictions vs. actual outcomes: r > 0.7
├── Team success rate improvement over random: +40%
├── Conflict prediction accuracy: > 75%
└── Optimal team size identification: 4-6 members
```

**Test 3: Availability Handling**

```
Scenario: Teams with varying member availability patterns

Test Cases:
├── Full availability (100% time commitment): 200 teams
├── Partial availability (50% time commitment): 200 teams
├── Variable availability (unpredictable): 200 teams
├── Timezone distributed teams: 200 teams
└── Mixed availability (within team): 200 teams

Metrics:
├── Project completion rate by availability type
├── Quality scores vs. expected baseline
├── Team satisfaction surveys (AI-simulated)
├── Member retention through project lifecycle

Expected Results:
├── Full availability teams: 85% completion, 90% quality
├── Partial availability teams: 75% completion, 85% quality
├── Variable availability teams: 60% completion, 75% quality
└── Timezone distributed teams: 70% completion, 80% quality
```

### 4.6.4 Collaboration History Validation

**Test 4: Collaboration Score Accuracy**

```
Scenario: 2,000 pairs of agents with known collaboration history

Test Design:
├── AI agents simulate 6 months of potential collaboration
├── Each pair has varying: projects together, conflicts, XP generation
├── Compare calculated collaboration score vs. ground truth
├── Validate all components: success rate, conflict penalty, recency

Component Validation:
├── Success Rate: What percentage of projects succeeded?
├── Conflict Penalty: How many conflicts, how severe?
├── Recency Bonus: Does recent collaboration matter more?
├── Volume Bonus: Does high XP together indicate good collaboration?

Pass Criteria:
├── Overall score accuracy: within ±0.1 of ground truth
├── Component-level accuracy: each component within ±0.15
├── Ranking accuracy: 90% of pairs correctly ranked
└── Edge case handling: Sabbatical, project gaps handled correctly
```

**Test 5: Team History Transfer**

```
Scenario: Teams that have worked together before

Test Cases:
├── Same team reforming for new project
├── Partial team reformation (50-75% overlap)
├── Team with history working with new members
├── Dissolved team members working with others

Metrics:
├── Collaboration score transfer effectiveness
├── Team chemistry preservation across reforms
├── New member integration success rate
└── Performance comparison vs. new team formation

Expected Results:
├── Same team: 90% of collaboration score preserved
├── Partial team: 70% of collaboration score preserved
├── New member integration: 80% success rate
└── Performance: Teams with history outperform new teams by 25%
```

### 4.6.5 Team Lifecycle Stress Testing

**Test 6: Team Formation Under Load**

```
Scenario: 10,000 team formation requests simultaneously

Load Parameters:
├── Request rate: 1,000 requests/hour for 10 hours
├── Required roles: 2-6 roles per team
├── Team size: 3-8 members
├── Deadline pressure: 50% urgent (< 24 hours)

Metrics:
├── Time to first proposal: target < 1 hour
├── Proposal quality under load: < 5% degradation
├── Algorithm timeout rate: < 1%
├── Queue depth management: stable at < 500 requests

Stress Testing:
├── Spike handling: 10x normal request rate for 1 hour
├── Recovery: Time to clear queue after spike
├── Degradation: What fails first? (matching vs. scoring vs. proposal)
└── Graceful degradation: Does system fail safely?
```

**Test 7: Team Failure Scenarios**

```
Scenario: Teams that don't work out

Failure Mode 1: Skill Mismatch
├── Cause: Algorithm misjudged role suitability
├── Detection: Early warning signs in first 2 weeks
├── Recovery: Team restructuring, role adjustment
└── Outcome: 60% recovery, 40% team dissolution

Failure Mode 2: Interpersonal Conflict
├── Cause: Personality or communication style clash
├── Detection: Conflict incident monitoring
├── Recovery: Mediation, role separation, team restructure
└── Outcome: 50% recovery, 50% member departure

Failure Mode 3: Availability Dropout
├── Cause: Member becomes unavailable
├── Detection: Activity monitoring
├── Recovery: Role redistribution, replacement member
└── Outcome: 80% successful role backfill

Failure Mode 4: Scope Creep
├── Cause: Project requirements expand beyond team capacity
├── Detection: Velocity monitoring, quality metrics
├── Recovery: Scope adjustment, team expansion
└── Outcome: 70% recovery with scope adjustment
```

### 4.6.6 Scaling Tests

**Test 8: Large Team Formation**

```
Scenario: Teams of 10+ members (enterprise-scale projects)

Test Cases:
├── 10-member teams: 50 formations
├── 15-member teams: 30 formations
├── 20+ member teams: 20 formations
└── Sub-team structures: 10 complex formations

Validation:
├── Role assignment clarity in large teams
├── Communication overhead management
├── Sub-team coordination effectiveness
├── Leadership structure scalability

Metrics:
├── Member satisfaction (AI-simulated surveys)
├── Project completion rate by team size
├── Communication efficiency (relevant information flow)
└── Coordination cost (overhead per member)

Expected Results:
├── Optimal team size: 6-8 members for most projects
├── Sub-team requirement: 10+ members need structure
├── Communication degradation: Begins at 12+ members
└── Leadership needs: 1 lead per 5-6 members ideal
```

### 4.6.7 Integration Testing

**Test 9: XP System Integration**

```
Scenario: Teams formed using real-time XP data

Integration Points:
├── XP Engine: Real-time trust scores
├── Verification Pipeline: Recent contribution quality
├── Decay System: Trust adjustment based on recency
└── Analytics: Team performance tracking

Test Cases:
├── Form team with current XP data
├── XP updates during project (members gaining XP)
├── Decay during long projects
├── Team dissolution with XP impact

Expected Results:
├── Integration latency: < 5 seconds for XP updates
├── Accuracy: Teams formed with current data outperform stale data by 20%
└── Edge cases: XP spikes, decay events handled correctly
```

**Test 10: Revenue System Integration**

```
Scenario: Teams with subscription bonuses

Test Cases:
├── Team of all premium members
├── Mixed premium and standard members
├── Subscription expiration during project
└── Team-wide subscription discounts

Validation:
├── XP bonuses correctly applied
├── Team formation considers premium status
├── Revenue tracking accurate
└── Subscription benefits delivered

Expected Results:
├── Premium members correctly identified
├── XP bonuses applied in real-time
├── Revenue attribution correct
└── No gaming: Premium status verification required
```

### 4.6.8 Adversarial Testing

**Test 11: Team Formation Manipulation**

```
Scenario: Attempts to game team formation

Attack Vector 1: Trust Inflation
├── Method: Artificially inflate trust scores before matching
├── Detection: Unusual trust increase patterns
├── Penalty: Matching weight reduced for inflated scores
└── Expected: < 5% of attacks succeed, all detected within 1 week

Attack Vector 2: Collaboration Ring
├── Method: Group colludes to boost each other's scores
├── Detection: Unusual verification clustering
├── Penalty: Cross-verification requirements, score decay
└── Expected: < 1% of attacks succeed, all detected within 1 week

Attack Vector 3: Role Misrepresentation
├── Method: Claim expertise in role without actual XP
├── Detection: XP Profile vs. claimed role mismatch
├── Penalty: Matching algorithm ignores mismatched claims
└── Expected: 0% successful attacks

Attack Vector 4: Team Packing
├── Method: Form team with all high-scoring members, exclude others
├── Detection: Pattern analysis of team formations
├── Penalty: Diversity requirements enforced
└── Expected: < 10% detected, balanced teams required
```

### 4.6.9 Simulation Output Specification

```
For Execution Squad Validation:
├── Role-XP correlation analysis
├── Team chemistry prediction accuracy report
├── Collaboration scoring validation
├── Lifecycle management stress test results
├── Adversarial attack defense report
└── Integration testing results

For Production Readiness:
├── Performance benchmarks established
├── Capacity recommendations documented
├── Alert thresholds calibrated
├── Runbook for common issues
└── Scaling playbook for growth
```

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY
# Chapter 5: User States and Visibility Modes

*"Pseudonymity as a first-class feature, not an afterthought."*

---

## 5.1 The User Lifecycle

Users move through several states on FatedFortress, each with different capabilities and visibility:

**Visitor** is the initial browsing state. You can view public project listings, read descriptions, and explore the platform without creating an account. Visitors see only what project owners have made public.

**Passive Member** means you've created an account but haven't yet contributed. You can browse AI-curated projects, observe team discussions where public, and explore the platform more deeply. Passive members start building an identity but haven't yet established a reputation.

**Active Member** is the primary contributing state. You can submit work, earn XP, toggle visibility modes, and participate in team formation. Active members have full platform access and can build reputation through verified contributions.

**Project Member** is scoped to specific projects. You're part of one or more projects, with contribution tracking tied to those projects. Project members have visibility into their project's private areas but not the broader platform.

**Trusted Member** is earned through sustained positive contribution and peer attestation. Trusted members have enhanced platform access, governance participation rights, and increased verification power (their reviews carry more weight).

## 5.2 User State Implementation

### 5.2.1 State Definitions

```typescript
enum UserState {
  VISITOR = 'VISITOR',
  PASSIVE_MEMBER = 'PASSIVE_MEMBER',
  ACTIVE_MEMBER = 'ACTIVE_MEMBER',
  PROJECT_MEMBER = 'PROJECT_MEMBER',
  TRUSTED_MEMBER = 'TRUSTED_MEMBER'
}

enum VisibilityMode {
  ANON = 'ANON',
  OFF = 'OFF'
}

interface User {
  id: string;
  email: string;
  username: string;
  state: UserState;
  visibilityMode: VisibilityMode;
  pseudonyms: Pseudonym[];
  realName: string | null;
  trustScore: number;
  isTrusted: boolean;
  createdAt: Date;
  lastActiveAt: Date;
  permissions: Permission[];
}

interface Pseudonym {
  id: string;
  name: string;
  xpByAxis: Map<string, number>;
  createdAt: Date;
  linkedToRealIdentity: boolean;
}
```

### 5.2.2 State Transition Rules

```typescript
interface StateTransitionRule {
  from: UserState;
  to: UserState;
  conditions: TransitionCondition[];
  autoTransition?: boolean;
}

const STATE_TRANSITIONS: StateTransitionRule[] = [
  {
    from: UserState.VISITOR,
    to: UserState.PASSIVE_MEMBER,
    conditions: [
      { type: 'action_required', action: 'create_account' }
    ]
  },
  {
    from: UserState.PASSIVE_MEMBER,
    to: UserState.ACTIVE_MEMBER,
    conditions: [
      { type: 'action_required', action: 'submit_contribution' }
    ]
  },
  {
    from: UserState.ACTIVE_MEMBER,
    to: UserState.PROJECT_MEMBER,
    conditions: [
      { type: 'state_scope', scope: 'project' },
      { type: 'action_required', action: 'join_project' }
    ]
  },
  {
    from: UserState.ACTIVE_MEMBER,
    to: UserState.TRUSTED_MEMBER,
    conditions: [
      { type: 'threshold', metric: 'trustScore', value: 0.75 },
      { type: 'threshold', metric: 'contributionCount', value: 10 },
      { type: 'attestation', count: 3 }
    ],
    autoTransition: true
  }
];

class StateTransitionService {
  async canTransition(
    userId: string,
    targetState: UserState
  ): Promise<TransitionEligibility> {
    const user = await this.getUser(userId);
    const transition = STATE_TRANSITIONS.find(
      t => t.from === user.state && t.to === targetState
    );

    if (!transition) {
      return { eligible: false, reason: 'No valid transition path' };
    }

    const results: ConditionResult[] = [];
    for (const condition of transition.conditions) {
      const result = await this.evaluateCondition(userId, condition);
      results.push(result);
    }

    const allMet = results.every(r => r.met);
    
    return {
      eligible: allMet,
      reason: allMet ? 'All conditions met' : results.find(r => !r.met)?.reason,
      metConditions: results.filter(r => r.met),
      unmetConditions: results.filter(r => !r.met)
    };
  }

  async executeTransition(
    userId: string,
    targetState: UserState
  ): Promise<TransitionResult> {
    const eligibility = await this.canTransition(userId, targetState);
    
    if (!eligibility.eligible) {
      throw new Error(`Cannot transition: ${eligibility.reason}`);
    }

    const user = await this.getUser(userId);
    const transition = STATE_TRANSITIONS.find(
      t => t.from === user.state && t.to === targetState
    );

    // Execute any required actions
    if (transition) {
      for (const condition of transition.conditions) {
        if (condition.type === 'action_required') {
          await this.executeAction(userId, condition.action);
        }
      }
    }

    // Update user state
    await this.updateUser(userId, { state: targetState });

    // Grant new permissions
    const newPermissions = await this.getPermissionsForState(targetState);
    await this.grantPermissions(userId, newPermissions);

    return {
      success: true,
      previousState: user.state,
      newState: targetState,
      permissionsGranted: newPermissions,
      effectiveAt: new Date()
    };
  }
}
```

### 5.2.3 Permission Matrix

```typescript
enum Permission {
  // Read permissions
  VIEW_PUBLIC_PROJECTS = 'VIEW_PUBLIC_PROJECTS',
  VIEW_AI_CURATED_PROJECTS = 'VIEW_AI_CURATED_PROJECTS',
  VIEW_PUBLIC_DISCUSSIONS = 'VIEW_PUBLIC_DISCUSSIONS',
  VIEW_TEAM_DISCUSSIONS = 'VIEW_TEAM_DISCUSSIONS',
  VIEW_PROJECT_DETAILS = 'VIEW_PROJECT_DETAILS',
  VIEW_USER_PROFILES = 'VIEW_USER_PROFILES',
  VIEW_ANON_PROFILES = 'VIEW_ANON_PROFILES',
  VIEW_OFF_PROFILES = 'VIEW_OFF_PROFILES',

  // Write permissions
  CREATE_PROJECT = 'CREATE_PROJECT',
  SUBMIT_CONTRIBUTION = 'SUBMIT_CONTRIBUTION',
  JOIN_PROJECT = 'JOIN_PROJECT',
  CREATE_TEAM = 'CREATE_TEAM',
  INVITE_TO_TEAM = 'INVITE_TO_TEAM',
  UPDATE_TEAM = 'UPDATE_TEAM',

  // Verification permissions
  VERIFY_CONTRIBUTION = 'VERIFY_CONTRIBUTION',
  ATTEST_TRUST = 'ATTEST_TRUST',
  REVIEW_CODE = 'REVIEW_CODE',

  // Admin permissions
  MANAGE_PROJECT = 'MANAGE_PROJECT',
  MANAGE_TEAM = 'MANAGE_TEAM',
  GOVERNANCE_VOTE = 'GOVERNANCE_VOTE',
  MANAGE_PLATFORM = 'MANAGE_PLATFORM'
}

const STATE_PERMISSIONS: Map<UserState, Permission[]> = new Map([
  [UserState.VISITOR, [
    Permission.VIEW_PUBLIC_PROJECTS,
    Permission.VIEW_PUBLIC_DISCUSSIONS
  ]],
  [UserState.PASSIVE_MEMBER, [
    ...STATE_PERMISSIONS.get(UserState.VISITOR)!,
    Permission.VIEW_AI_CURATED_PROJECTS,
    Permission.VIEW_USER_PROFILES,
    Permission.VIEW_ANON_PROFILES
  ]],
  [UserState.ACTIVE_MEMBER, [
    ...STATE_PERMISSIONS.get(UserState.PASSIVE_MEMBER)!,
    Permission.CREATE_PROJECT,
    Permission.SUBMIT_CONTRIBUTION,
    Permission.JOIN_PROJECT,
    Permission.CREATE_TEAM,
    Permission.VIEW_TEAM_DISCUSSIONS,
    Permission.VERIFY_CONTRIBUTION,
    Permission.REVIEW_CODE
  ]],
  [UserState.PROJECT_MEMBER, [
    ...STATE_PERMISSIONS.get(UserState.ACTIVE_MEMBER)!,
    Permission.VIEW_PROJECT_DETAILS,
    Permission.INVITE_TO_TEAM,
    Permission.UPDATE_TEAM,
    Permission.MANAGE_PROJECT
  ]],
  [UserState.TRUSTED_MEMBER, [
    ...STATE_PERMISSIONS.get(UserState.PROJECT_MEMBER)!,
    Permission.ATTEST_TRUST,
    Permission.GOVERNANCE_VOTE,
    Permission.MANAGE_TEAM
  ]]
]);

class PermissionService {
  async hasPermission(
    userId: string,
    permission: Permission
  ): Promise<boolean> {
    const user = await this.getUser(userId);
    const permissions = STATE_PERMISSIONS.get(user.state) || [];
    
    return permissions.includes(permission);
  }

  async requirePermission(
    userId: string,
    permission: Permission
  ): Promise<void> {
    const hasPermission = await this.hasPermission(userId, permission);
    
    if (!hasPermission) {
      throw new PermissionDeniedError(
        `Permission ${permission} required`,
        userId,
        permission
      );
    }
  }

  async getEffectivePermissions(userId: string): Promise<Permission[]> {
    const user = await this.getUser(userId);
    const permissions = STATE_PERMISSIONS.get(user.state) || [];
    
    // Add any special permissions
    const specialPermissions = await this.getSpecialPermissions(userId);
    
    return [...permissions, ...specialPermissions];
  }
}
```

---

## 5.3 Visibility Modes Explained

Visibility modes control how you appear to other users. This is where pseudonymity becomes real, not performative.

**ANON Mode** shows other users only your pseudonym. Your XP Profile is visible, but it's not linked to your other pseudonyms or your real identity. Other users see: "MysteriousCoder has 500 XP in Backend Development and 200 XP in DevOps." They don't know if MysteriousCoder is also "ReliableDev," "NightOwl," or your real identity.

**OFF Mode** shows your real identity alongside all your pseudonyms and XP. You're fully visible, with the full weight of your reputation attached to your public professional identity.

**Multiple Pseudonyms** can exist within ANON mode. You might have one pseudonym for work-related contributions, another for exploratory projects, and another for controversial opinions. Each builds its own reputation, and you can reveal the connections when you choose.

### 5.3.1 Pseudonym Implementation

```typescript
interface Pseudonym {
  id: string;
  userId: string;
  name: string;
  displayName: string;
  bio: string;
  xpByAxis: Map<string, number>;
  totalXP: number;
  createdAt: Date;
  isPrimary: boolean;
  isLinkedToRealIdentity: boolean;
  revealedTo: string[]; // User IDs who can see the link
  contributions: string[]; // Contribution IDs under this pseudonym
}

class PseudonymService {
  async createPseudonym(
    userId: string,
    name: string,
    options: {
      displayName?: string;
      bio?: string;
      isPrimary?: boolean;
    }
  ): Promise<Pseudonym> {
    // Validate name uniqueness
    const existing = await this.findByName(name);
    if (existing) {
      throw new Error('Pseudonym already taken');
    }

    const pseudonym: Pseudonym = {
      id: generateUUID(),
      userId,
      name,
      displayName: options.displayName || name,
      bio: options.bio || '',
      xpByAxis: new Map(),
      totalXP: 0,
      createdAt: new Date(),
      isPrimary: options.isPrimary || false,
      isLinkedToRealIdentity: false,
      revealedTo: [],
      contributions: []
    };

    await this.savePseudonym(pseudonym);
    return pseudonym;
  }

  async getVisibleProfile(
    viewerId: string,
    targetUserId: string
  ): Promise<VisibleProfile> {
    const targetUser = await this.getUser(targetUserId);
    const viewer = viewerId ? await this.getUser(viewerId) : null;

    // Check visibility mode
    if (targetUser.visibilityMode === VisibilityMode.OFF) {
      return {
        type: 'real',
        userId: targetUser.id,
        username: targetUser.username,
        realName: targetUser.realName,
        pseudonyms: await this.getPublicPseudonyms(targetUserId),
        xpByAxis: await this.getXPByAxis(targetUserId),
        trustScore: targetUser.trustScore,
        isTrusted: targetUser.isTrusted
      };
    }

    // ANON mode - return pseudonym view
    const primaryPseudonym = await this.getPrimaryPseudonym(targetUserId);
    
    if (!primaryPseudonym) {
      // User has no pseudonyms, return minimal anonymous profile
      return {
        type: 'anonymous',
        userId: targetUser.id,
        pseudonym: null,
        xpSummary: { total: 0, axes: [] }
      };
    }

    // Check if viewer can see the real identity link
    const canSeeIdentity = 
      targetUserId === viewerId || // Viewing own profile
      viewer?.isTrusted || // Trusted members can see more
      primaryPseudonym.revealedTo.includes(viewerId); // Explicitly revealed

    return {
      type: canSeeIdentity ? 'linked' : 'anonymous',
      userId: targetUser.id,
      pseudonym: {
        id: primaryPseudonym.id,
        name: primaryPseudonym.name,
        displayName: primaryPseudonym.displayName,
        bio: primaryPseudonym.bio,
        xpByAxis: primaryPseudonym.xpByAxis,
        totalXP: primaryPseudonym.totalXP
      },
      linkedToRealIdentity: canSeeIdentity && primaryPseudonym.isLinkedToRealIdentity,
      realIdentityRevealed: canSeeIdentity ? targetUser.username : null
    };
  }

  async revealIdentity(
    userId: string,
    pseudonymId: string,
    revealToUserId: string
  ): Promise<void> {
    const pseudonym = await this.getPseudonym(pseudonymId);
    
    if (pseudonym.userId !== userId) {
      throw new Error('Not your pseudonym');
    }

    pseudonym.revealedTo.push(revealToUserId);
    await this.updatePseudonym(pseudonym);
  }

  async linkPseudonymToIdentity(
    userId: string,
    pseudonymId: string
  ): Promise<void> {
    const pseudonym = await this.getPseudonym(pseudonymId);
    
    if (pseudonym.userId !== userId) {
      throw new Error('Not your pseudonym');
    }

    pseudonym.isLinkedToRealIdentity = true;
    await this.updatePseudonym(pseudonym);
  }
}
```

### 5.3.2 Visibility Controller API

```typescript
// Visibility Mode API Endpoints

PUT /api/user/visibility-mode
  Body: { mode: 'ANON' | 'OFF' }
  Returns: { success, newMode }

GET /api/user/profile/:userId/view
  Query: { asUserId?: string }
  Returns: { profile: VisibleProfile }

POST /api/pseudonyms
  Body: { name: string, displayName?: string, bio?: string, isPrimary?: boolean }
  Returns: { pseudonym: Pseudonym }

GET /api/pseudonyms
  Returns: { pseudonyms: Pseudonym[] }

PUT /api/pseudonyms/:pseudonymId
  Body: { displayName?: string, bio?: string }
  Returns: { updated: Pseudonym }

POST /api/pseudonyms/:pseudonymId/reveal/:targetUserId
  Returns: { success }

PUT /api/pseudonyms/:pseudonymId/link-identity
  Returns: { success, isLinked: true }
```

---

## 5.4 Authentication Implementation

### 5.4.1 Auth Flow

```typescript
interface AuthProvider {
  id: string;
  type: 'google' | 'github' | 'email';
  accessToken?: string;
  refreshToken?: string;
}

class AuthenticationService {
  async authenticateWithOAuth(
    provider: 'google' | 'github',
    code: string
  ): Promise<AuthResult> {
    // Exchange code for tokens
    const tokens = await this.exchangeCodeForTokens(provider, code);
    
    // Get user info from provider
    const userInfo = await this.getUserInfo(provider, tokens.accessToken);
    
    // Find or create user
    let user = await this.findUserByEmail(userInfo.email);
    
    if (!user) {
      user = await this.createUser({
        email: userInfo.email,
        username: this.generateUniqueUsername(userInfo.name),
        realName: userInfo.name
      });
    }

    // Link OAuth provider
    await this.linkAuthProvider(user.id, {
      type: provider,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });

    // Generate session
    const session = await this.createSession(user.id);

    return {
      user,
      session,
      isNewUser: !user.isActive
    };
  }

  async createEmailAccount(
    email: string,
    password: string,
    username: string
  ): Promise<AuthResult> {
    // Validate password strength
    this.validatePasswordStrength(password);

    // Hash password
    const passwordHash = await this.hashPassword(password);

    // Check username uniqueness
    const existingUsername = await this.findUserByUsername(username);
    if (existingUsername) {
      throw new Error('Username already taken');
    }

    // Create user
    const user = await this.createUser({
      email,
      username,
      passwordHash,
      isEmailVerified: false
    });

    // Send verification email
    await this.sendVerificationEmail(user.id, email);

    // Create session
    const session = await this.createSession(user.id);

    return { user, session, isNewUser: true };
  }

  async verifyEmail(
    userId: string,
    token: string
  ): Promise<boolean> {
    const isValid = await this.verifyEmailToken(userId, token);
    
    if (isValid) {
      await this.updateUser(userId, { isEmailVerified: true });
    }

    return isValid;
  }

  private validatePasswordStrength(password: string): void {
    const requirements = [
      { test: password.length >= 8, message: 'Minimum 8 characters' },
      { test: /[A-Z]/.test(password), message: 'At least one uppercase letter' },
      { test: /[a-z]/.test(password), message: 'At least one lowercase letter' },
      { test: /[0-9]/.test(password), message: 'At least one number' },
      { test: /[^A-Za-z0-9]/.test(password), message: 'At least one special character' }
    ];

    const failures = requirements.filter(r => !r.test);
    if (failures.length > 0) {
      throw new PasswordValidationError(failures.map(f => f.message));
    }
  }
}
```

### 5.4.2 Session Management

```typescript
interface Session {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  lastUsedAt: Date;
  ipAddress: string;
  userAgent: string;
  isValid: boolean;
}

class SessionService {
  async createSession(
    userId: string,
    options?: {
      ipAddress?: string;
      userAgent?: string;
      expiresInDays?: number;
    }
  ): Promise<Session> {
    const session: Session = {
      id: generateUUID(),
      userId,
      createdAt: new Date(),
      expiresAt: new Date(
        Date.now() + (options?.expiresInDays || 30) * 24 * 60 * 60 * 1000
      ),
      lastUsedAt: new Date(),
      ipAddress: options?.ipAddress || '',
      userAgent: options?.userAgent || '',
      isValid: true
    };

    await this.saveSession(session);
    return session;
  }

  async validateSession(sessionId: string): Promise<Session | null> {
    const session = await this.getSession(sessionId);
    
    if (!session || !session.isValid) {
      return null;
    }

    if (session.expiresAt < new Date()) {
      await this.invalidateSession(sessionId);
      return null;
    }

    // Update last used
    await this.updateSession(sessionId, { lastUsedAt: new Date() });

    return session;
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.updateSession(sessionId, { isValid: false });
  }

  async invalidateAllUserSessions(userId: string): Promise<void> {
    await this.updateSessions(
      { userId, isValid: true },
      { isValid: false }
    );
  }
}
```

---

## 5.5 Why This Matters

Visibility modes exist to solve real problems:

**For employers**, OFF mode lets you use FatedFortress as a verified credential—you can point to your profile as proof of capability, backed by actual contribution data.

**For contributors who value privacy**, ANON mode lets you build reputation without doxxing yourself. You can work on sensitive projects, express controversial opinions, or simply prefer not to have your professional identity tied to every contribution you make.

**For the platform itself**, both modes serve different purposes. ANON mode encourages honest contribution without social pressure. OFF mode encourages authentic professional reputation building.

---

## 5.6 Privacy and Security Considerations

### 5.6.1 Data Protection

```typescript
interface PrivacySettings {
  showEmail: boolean;
  showRealName: boolean;
  showXPDetails: boolean;
  allowIndexing: boolean;
  dataRetentionDays: number;
}

const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  showEmail: false,
  showRealName: false,
  showXPDetails: true,
  allowIndexing: false,
  dataRetentionDays: 365 * 2 // 2 years
};

class PrivacyService {
  async exportUserData(userId: string): Promise<ExportedData> {
    const user = await this.getUser(userId);
    const contributions = await this.getContributions(userId);
    const xpHistory = await this.getXPHistory(userId);
    const sessions = await this.getSessions(userId);

    return {
      exportedAt: new Date(),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        realName: user.realName,
        createdAt: user.createdAt
      },
      contributions,
      xpHistory,
      sessions: sessions.map(s => ({
        createdAt: s.createdAt,
        lastUsedAt: s.lastUsedAt,
        ipAddress: s.ipAddress
      }))
    };
  }

  async deleteUserData(userId: string): Promise<void> {
    // Anonymize user data
    await this.anonymizeUser(userId);
    
    // Remove personal information
    await this.updateUser(userId, {
      email: null,
      realName: null,
      username: '[deleted]',
      isActive: false
    });

    // Schedule contribution anonymization
    await this.scheduleContributionAnonymization(userId);
  }
}
```

---

## 5.7 Building and Simulation Testing

### 5.7.1 User States and Visibility Validation Framework

User states and visibility modes form the foundation of FatedFortress's privacy-preserving architecture. Every aspect of identity management, state transitions, and permission enforcement must be validated through simulation with AI agents exploring every possible user journey, edge case, and adversarial scenario.

**Validation Objectives:**
```
Primary Goals:
├── Verify state transitions execute correctly under all conditions
├── Confirm visibility modes properly control information flow
├── Validate pseudonym management maintains privacy while enabling reputation
└── Test permission enforcement at every access point

Secondary Goals:
├── Measure authentication system security
├── Test session management under various conditions
├── Validate privacy controls against data leakage
└── Assess scalability of identity management
```

### 5.7.2 AI Agent User Population

Create 10,000 AI agents with programmed identity and privacy behaviors:

```
Agent Identity Profiles:

Profile A: Privacy-Focused User (20%) - 2,000 agents
├── Visibility preference: ANON mode default
├── Pseudonym count: 3-5 active pseudonyms
├── Identity reveal willingness: Very low
├── Data sharing comfort: Minimal
├── Behavior pattern: Careful, private, security-conscious
└├── Known behaviors: Regular pseudonym rotation, VPN usage

Profile B: Professional User (25%) - 2,500 agents
├── Visibility preference: OFF mode for professional context
├── Pseudonym count: 1-2 (mostly OFF mode)
├── Identity reveal willingness: High for verified credentials
├── Data sharing comfort: Moderate (for reputation)
├── Behavior pattern: Consistent, professional, credential-focused
└── Known behaviors: Links professional identity to contributions

Profile C: Exploratory User (20%) - 2,000 agents
├── Visibility preference: Mixed (context-dependent)
├── Pseudonym count: 2-4 (context-switching)
├── Identity reveal willingness: Variable
├── Data sharing comfort: Variable
├── Behavior pattern: Experimental, curious, boundary-testing
└── Known behaviors: Different pseudonyms for different projects

Profile D: Casual Contributor (15%) - 1,500 agents
├── Visibility preference: Default ANON, occasional OFF
├── Pseudonym count: 1-2 (low engagement)
├── Identity reveal willingness: Low
├── Data sharing comfort: Low
├── Behavior pattern: Sporadic, low-engagement
└── Known behaviors: Minimal profile completion

Profile E: Power User (10%) - 1,000 agents
├── Visibility preference: Sophisticated management
├── Pseudonym count: 5-10 (complex identity structure)
├── Identity reveal willingness: Strategic
├── Data sharing comfort: Calculated
├── Behavior pattern: Deep engagement, complex permissions
└── Known behaviors: Fine-grained privacy controls, partial reveals

Profile F: Adversarial Tester (10%) - 1,000 agents
├── Visibility preference: Attempts to bypass controls
├── Pseudonym count: Multiple attempts at circumvention
├── Identity reveal willingness: Testing boundaries
├── Data sharing comfort: Testing limits
├── Behavior pattern: Systematic probing, edge-case exploration
└── Known behaviors: Attempting privacy violations, identity fraud
```

### 5.7.3 State Transition Validation Tests

**Test 1: Standard State Progression**

```
Scenario: 5,000 AI agents progress through user states

Test Design:
├── Each agent follows a realistic journey
├── All transitions recorded and validated
├── Timing and eligibility enforcement tested
└── Permission changes verified at each state

Transition Sequence Tested:
├── Visitor → Passive Member (account creation)
├── Passive Member → Active Member (first contribution)
├── Active Member → Project Member (first project join)
├── Active Member → Trusted Member (trust threshold)
└── All reverse transitions (downgrades, exits)

Pass Criteria:
├── 100% of valid transitions succeed
├── 100% of invalid transitions rejected
├── State changes effective within 1 second
├── Permissions update correctly at each transition
└── Audit trail complete for all state changes
```

**Test 2: Trusted Member Threshold Validation**

```
Scenario: 1,000 agents approach and cross Trusted Member threshold

Test Parameters:
├── Trust score progression: 0.60 → 0.80 over 3 months
├── Contribution counts: 5 → 50 contributions
├── Attestations: 0 → 10 peer attestations
└── Timing: Natural progression, not accelerated

Validation Points:
├── Threshold trigger accuracy: Trust score at exactly 0.75
├── Contribution count verification: Minimum 10 contributions
├── Attestation requirements: Minimum 3 unique attestations
├── Auto-transition execution: Happens within 1 hour of all conditions met
└── Revert conditions: What causes Trusted status loss?

Expected Results:
├── 95% of agents reaching thresholds auto-transition correctly
├── False positives (premature transition): < 0.1%
├── False negatives (delayed transition): < 1%
└── Revocation accuracy: 100% when conditions lost
```

**Test 3: Edge Case Transitions**

```
Scenario: Non-standard state change scenarios

Test Case A: Rapid State Progression
├── Agent attempts to reach Trusted Member in < 1 week
├── Expected: Blocked, minimum time/enagement requirements enforced
└── Result: PASS/FAIL

Test Case B: State Regressions
├── Agent with Trusted status becomes inactive
├── Expected: Gradual decay, not immediate revocation
└── Result: PASS/FAIL

Test Case C: State Recovery
├── Agent who lost status attempts recovery
├── Expected: Clear path, conditions documented
└── Result: PASS/FAIL

Test Case D: Concurrent State Conflicts
├── Agent in multiple project states simultaneously
├── Expected: Proper scoping, no permission conflicts
└── Result: PASS/FAIL

Test Case E: Identity Crisis
├── User attempts impossible state transitions
├── Expected: Clear error messages, helpful guidance
└── Result: PASS/FAIL
```

### 5.7.4 Visibility Mode Validation Tests

**Test 4: ANON Mode Behavior**

```
Scenario: 3,000 agents operating in ANON mode

Test Cases:
├── Profile viewing (different viewer permissions)
├── Contribution attribution
├── Team formation visibility
├── Search result inclusion
└── Public vs. private project visibility

Privacy Guarantees:
├── Real identity never exposed without consent
├── Pseudonyms not linkable without explicit revelation
├── Contribution patterns don't enable de-anonymization
└── No correlation attacks possible through timing

Validation Methods:
├── AI agents attempt 100+ de-anonymization attacks
├── Profile scraping attempts
├── Cross-reference attacks
└── Timing correlation analysis

Pass Criteria:
├── 0 successful de-anonymizations
├── No profile data leakage detected
├── Pseudonym independence maintained
└── Privacy audit: clean (no vulnerabilities)
```

**Test 5: OFF Mode Behavior**

```
Scenario: 3,000 agents operating in OFF mode

Test Cases:
├── Full identity visibility
├── Complete contribution history
├── Professional reputation building
├── Employer/recruiter visibility
└── Cross-platform identity linking (with consent)

Validation:
├── All expected data visible (no accidental hiding)
├── Permission controls function correctly
├── Identity linking works as expected
└── Data exports include all expected information

Pass Criteria:
├── 100% visibility of expected data
├── 100% enforcement of visibility controls
├── No data leakage in either direction
└── User expectations match actual behavior
```

**Test 6: Mode Transition Effects**

```
Scenario: 1,000 agents switch between modes

Test Cases:
├── ANON → OFF: Identity revelation
├── OFF → ANON: Pseudonym establishment
├── Mode switching during active projects
├── Mode switching during team formations
└── Emergency mode locks (if applicable)

Validation Points:
├── Transition timing: Immediate or gradual?
├── Existing attribution: What happens to past contributions?
├── Team impacts: Are teammates notified?
├── Search index updates: How fast?
└── Rollback capability: Can switch back?

Expected Results:
├── Mode switch effective within 5 minutes
├── Historical data handled appropriately
├── No data inconsistency between modes
├── Team members notified of significant changes
└── Full audit trail of all mode changes
```

### 5.7.5 Pseudonym Management Validation

**Test 7: Pseudonym Creation and Lifecycle**

```
Scenario: 5,000 agents manage pseudonyms over 12 months

Test Cases:
├── Creation: Valid and invalid pseudonym attempts
├── Linking: Pseudonym to identity linkage
├── Revelation: Pseudonym reveal to specific users
├── Abandonment: Pseudonym retirement
├── Transfer: Pseudonym value transfer
└── Recovery: Pseudonym recovery after account issues

Validation:
├── Uniqueness enforcement: No duplicate pseudonyms
├── Content rules: Naming conventions enforced
├── Linkage privacy: Only revealed to specified users
├── Revelation consent: Users control who knows
└── Abandonment handling: Graceful, with options

Pass Criteria:
├── Creation: 100% valid pseudonyms succeed, 100% invalid rejected
├── Linking: Only owner can link, verified before allowing
├── Revelation: Owner-controlled, auditable
├── Abandonment: Data preserved per policy
└── Edge cases: All documented, graceful handling
```

**Test 8: Pseudonym De-anonymization Resistance**

```
Scenario: Systematic attempts to link pseudonyms

Attack Vectors Tested:
├── Behavioral fingerprinting across pseudonyms
├── Contribution style analysis
├── Timing pattern correlation
├── Social engineering revelation attempts
├── Technical correlation (IP, device, etc.)
└── Cross-project pattern matching

Defense Validation:
├── Each pseudonym appears independent
├── No behavioral correlation detectable
├── Technical fingerprints masked or varied
├── Social engineering attempts detected and blocked
└── Rate limiting on revelation attempts

Pass Criteria:
├── 0 successful de-anonymizations through technical means
├── 0 successful de-anonymizations through behavioral means
├── Social engineering attempts detected > 95%
└── No privacy violations detected in audit
```

### 5.7.6 Authentication Security Testing

**Test 9: Authentication Bypass Attempts**

```
Scenario: 1,000 adversarial agents attempt authentication bypass

Attack Vectors:
├── Brute force password attacks
├── Credential stuffing from known breaches
├── Session hijacking attempts
├── OAuth provider exploitation
├── Email verification bypass
├── 2FA circumvention
└── Social engineering account recovery

Defense Validation:
├── Rate limiting enforced
├── Account lockout functioning
├── Session invalidation on suspicious activity
├── OAuth security best practices followed
├── Email verification robust
└── 2FA resistant to common attacks

Pass Criteria:
├── All attacks detected and blocked
├── No unauthorized access achieved
├── Legitimate users not locked out incorrectly
├── Audit logs complete for all events
└── Response time < 1 second for attack detection
```

**Test 10: Session Management Security**

```
Scenario: Session hijacking and management attacks

Attack Vectors:
├── Session prediction
├── Cookie theft/maculation
├── Session fixation
├── Concurrent session exploitation
├── Session hijacking through XSS
└── Session token leakage

Defense Validation:
├── Session tokens unpredictable
├── Secure cookie flags set
├── Session fixation protection
├── Concurrent session limits/enforcement
├── XSS prevention and detection
└── Token transmission security

Pass Criteria:
├── 0 successful session predictions
├── 0 session fixations successful
├── 0 XSS-based hijacks
├── Legitimate sessions unaffected
└── Audit trail for all session events
```

### 5.7.7 Permission System Validation

**Test 11: Permission Enforcement**

```
Scenario: 10,000 permission checks across all states/modes

Test Design:
├── Every permission checked for every user state
├── Cross-state permission transitions tested
├── Edge case permission scenarios explored
└── Escalation attempts tested

Permission Matrix Validation:
├── Each state has exactly correct permissions
├── No permission leaks between states
├── Role-based escalation works correctly
├── Emergency permission revocation works
└── Audit trail for all permission changes

Pass Criteria:
├── 100% permission checks return correct result
├── 0 unauthorized access attempts succeed
├── 0 legitimate access attempts incorrectly blocked
└── All permission changes auditable and reversible
```

**Test 12: Permission Escalation Prevention**

```
Scenario: Systematic permission escalation attempts

Attack Vectors:
├── State manipulation to gain permissions
├── Role abuse attempts
├── Trust score manipulation
├── Cross-project permission bleeding
├── Admin permission escalation
└── API permission abuse

Defense Validation:
├── State changes validated independently
├── Role assignments follow strict rules
├── Trust score calculation immutable
├── Permission scoping rigorously enforced
└── Admin actions require multiple verifications

Pass Criteria:
├── 0 successful escalations
├── All attempts detected and logged
├── False positive rate < 0.1%
└── Response time < 1 second for escalations
```

### 5.7.8 Privacy Protection Validation

**Test 13: Data Leakage Testing**

```
Scenario: Comprehensive privacy audit

Test Areas:
├── API response data minimization
├── Error message privacy
├── Logging data handling
├── Analytics data anonymization
├── Third-party data sharing
└── Data retention compliance

Validation Methods:
├── Automated API scanning for data leakage
├── Manual audit of error messages
├── Logging policy verification
├── Analytics configuration review
└── Third-party agreement verification

Pass Criteria:
├── No PII in API responses without authorization
├── Error messages reveal nothing exploitable
├── Logs contain no PII without explicit consent
├── Analytics fully anonymized
└── Third-party data handling compliant
```

**Test 14: GDPR/Privacy Compliance**

```
Scenario: Privacy regulation compliance testing

Requirements Tested:
├── Right to access: User can export all data
├── Right to rectification: User can correct data
├── Right to erasure: User can delete account
├── Right to portability: Data export in standard format
├── Consent management: Granular consent control
└── Data retention: Automatic deletion enforcement

Validation:
├── Export functionality complete and accurate
├── Rectification updates all affected records
├── Erasure removes or anonymizes all data
├── Export format usable by other services
└── Consent changes immediate and respected

Pass Criteria:
├── 100% compliance with core requirements
├── < 24 hours for standard requests
├── < 72 hours for complex requests
└── All actions auditable
```

### 5.7.9 Scale and Performance Testing

**Test 15: Identity System Throughput**

```
Load Testing:
├── Authentication requests: 10,000 per second
├── Session validations: 50,000 per second
├── Permission checks: 100,000 per second
├── State transitions: 1,000 per second
└── Profile views: 100,000 per second

Performance Targets:
├── Authentication: < 100ms P95
├── Session validation: < 10ms P95
├── Permission check: < 5ms P95
├── State transition: < 500ms P95
└── Profile view: < 50ms P95

Scalability:
├── Horizontal scaling capability
├── Database performance at scale
├── Cache effectiveness
└── Queue system capacity
```

### 5.7.10 Simulation Output Specification

```
For User States Validation:
├── State transition accuracy: 100% required
├── Visibility mode integrity: 0 violations allowed
├── Pseudonym independence: Verified
├── Authentication security: All attacks blocked
├── Permission enforcement: 100% accurate
└── Privacy compliance: Full audit pass

For Production Readiness:
├── Performance benchmarks established
├── Security audit results clean
├── Privacy impact assessment complete
├── Scaling recommendations documented
├── Incident response playbook ready
└── Compliance certifications achieved
```

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY
# Chapter 6: Technical Architecture

*"The technology stack that makes it all possible."*

---

## 6.1 The Technology Stack

FatedFortress is built on proven, scalable technologies chosen for their ecosystem, type safety, and deployment flexibility.

### Backend Technology Stack

**Runtime: Node.js 20+ LTS**

Node.js provides the event-driven, non-blocking I/O model ideal for high-concurrency API handling. Version 20+ offers improved performance, native fetch API, and enhanced security features.

**Language: TypeScript 5.x**

TypeScript provides compile-time type safety that catches bugs before they reach production. Strict mode is enabled for maximum safety. The type system enables clear interfaces between services and easier refactoring.

**Framework: Express.js 4.x + Fastify Plugins**

Express provides the routing layer with middleware composition. Fastify plugins are used for performance-critical paths (JSON serialization, validation). The framework is kept minimal to avoid abstraction overhead.

```typescript
// Backend package.json dependencies
{
  "dependencies": {
    "express": "^4.18.2",
    "fastify": "^4.24.3",
    "typescript": "^5.3.2",
    "pg": "^8.11.3",
    "redis": "^4.6.10",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "zod": "^3.22.4",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "winston": "^3.11.0",
    "prom-client": "^15.1.0",
    "@sentry/node": "^7.84.0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "@types/jest": "^29.5.11",
    "eslint": "^8.55.0",
    "prettier": "^3.1.1",
    "husky": "^8.0.3",
    "supertest": "^6.3.3"
  }
}
```

### Frontend Technology Stack

**Framework: React 18+ with TypeScript**

React's component model enables modular UI development. Version 18's concurrent features improve perceived performance. Server components will be evaluated for data-heavy pages.

**State Management: Zustand + React Query**

Zustand provides simple, type-safe global state management. React Query (TanStack Query) handles server state, caching, and optimistic updates. This combination avoids Redux boilerplate while providing robust caching.

**Styling: Tailwind CSS 3.x**

Utility-first CSS enables rapid prototyping with consistent design tokens. The configuration includes custom colors from the design system and responsive breakpoints.

**UI Components: Radix UI Primitives**

Headless UI components provide accessibility compliance without enforced styling. This allows full control over the visual design while inheriting keyboard navigation and screen reader support.

```typescript
// Frontend package.json key dependencies
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.2",
    "zustand": "^4.4.7",
    "@tanstack/react-query": "^5.13.4",
    "axios": "^1.6.2",
    "tailwindcss": "^3.3.6",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-tabs": "^1.0.4",
    "framer-motion": "^10.16.16",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.2",
    "react-hook-form": "^7.49.0",
    "recharts": "^2.10.3"
  }
}
```

### Database: PostgreSQL 16+

PostgreSQL's relational model is well-suited for the trust/verification data at FatedFortress's core. We use modern features like JSONB for flexible data storage while maintaining relational integrity where it matters.

**Extensions Used:**

```sql
-- Required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

### Infrastructure: Docker + Kubernetes

Containerization enables consistent deployments across environments. Kubernetes provides the orchestration layer for scaling and resilience. The architecture supports growth from minimal to massive without fundamental redesign.

**Dockerfile (Backend):**

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health

CMD ["node", "dist/index.js"]
```

---

## 6.2 Key Systems

### Monorepo Structure Mapping

The philosophical concepts in earlier chapters map directly to this codebase structure:

```
src/
├── backend/
│   ├── api/              # REST API endpoints
│   │   └── routes/       # /xp, /users, /projects, /matching
│   ├── services/         # Business logic
│   │   ├── xp-engine.ts  # XP calculation & decay (Chapter 3)
│   │   ├── bond-service.ts  # Bond & collateral forfeiture logic (Chapter 3.5)
│   │   ├── matching.ts   # Team formation (Chapter 4)
│   │   └── verification.ts # Peer review pipeline
│   ├── models/           # Database schemas (Zod)
│   └── telemetry/       # Event collection
│
├── frontend/
│   ├── components/       # React UI
│   ├── pages/           # Routes
│   └── hooks/           # State management
│
└── packages/
    ├── types/           # Shared Zod schemas
    ├── config/          # Environment & settings
    └── utils/           # Shared utilities
```

**Key Mappings:**

| Chapter Concept | Code Location |
|-----------------|---------------|
| XP System (Ch 3) | `src/backend/services/xp-engine.ts` |
| Bond/Slash (Ch 3.5) | `src/backend/services/bond-service.ts` |
| Execution Squad (Ch 4) | `src/backend/services/matching.ts` |
| Guardian Role | `src/backend/services/verification.ts` |
| Trust Gradient | `src/backend/models/trust-*.ts` |
| ANON/OFF Modes | `src/backend/middleware/visibility.ts` |

### XP Engine

The XP Engine is the calculation core that processes contributions and produces XP awards. It encapsulates the XP calculation logic, including decay, axis weighting, and verification multipliers. The engine is designed to be auditable: every XP award can be traced back to the contribution and verification that produced it.

```typescript
// src/services/xp-engine.ts

import { Decimal } from 'decimal.js';

interface XPCalculationContext {
  contributionId: string;
  userId: string;
  contributionType: string;
  axes: ContributionAxis[];
  verificationQuality: number;
  complexity: number;
  trustScore: number;
}

interface XPCalculationResult {
  awardedXP: number;
  breakdown: {
    baseXP: number;
    complexityMultiplier: number;
    verificationMultiplier: number;
    axisMultipliers: Record<string, number>;
    trustBonus: number;
    totalMultiplier: number;
  };
  calculationTimestamp: Date;
  expiresAt: Date;
}

class XPEngine {
  private readonly BASE_VALUES = {
    feature: new Decimal(50),
    bugfix: new Decimal(25),
    docs: new Decimal(15),
    review: new Decimal(20),
    infrastructure: new Decimal(40),
    mentoring: new Decimal(35)
  };

  private readonly COMPLEXITY_MULTIPLIERS = {
    1: new Decimal(0.5),
    2: new Decimal(0.75),
    3: new Decimal(1.0),
    4: new Decimal(1.5),
    5: new Decimal(2.0)
  };

  private readonly AXIS_CONFIGS: Map<string, { weight: number; decayRate: number }>;

  constructor() {
    this.AXIS_CONFIGS = new Map([
      ['backend_development', { weight: 1.0, decayRate: 0.98 }],
      ['frontend_development', { weight: 1.0, decayRate: 0.97 }],
      ['devops', { weight: 1.1, decayRate: 0.96 }],
      ['security', { weight: 1.3, decayRate: 0.99 }],
      ['data_engineering', { weight: 1.1, decayRate: 0.98 }],
      ['mobile_development', { weight: 1.0, decayRate: 0.965 }],
      ['documentation', { weight: 0.8, decayRate: 0.95 }],
      ['mentorship', { weight: 1.2, decayRate: 0.99 }],
      ['technical_leadership', { weight: 1.2, decayRate: 0.985 }]
    ]);
  }

  async calculateXP(context: XPCalculationContext): Promise<XPCalculationResult> {
    const baseXP = this.BASE_VALUES[context.contributionType as keyof typeof this.BASE_VALUES] 
      || new Decimal(20);
    
    // Apply complexity multiplier
    const complexityMult = this.COMPLEXITY_MULTIPLIERS[context.complexity as keyof typeof this.COMPLEXITY_MULTIPLIERS]
      || new Decimal(1.0);
    
    // Apply verification quality (0.8 to 1.5)
    const verificationMult = new Decimal(0.8).plus(
      new Decimal(context.verificationQuality).times(0.7)
    );

    // Calculate axis-specific multipliers
    const axisMultipliers: Record<string, number> = {};
    let totalAxisWeight = new Decimal(0);
    
    for (const axis of context.axes) {
      const config = this.AXIS_CONFIGS.get(axis.name) || { weight: 1.0, decayRate: 0.98 };
      const axisMult = new Decimal(config.weight).times(axis.weight);
      axisMultipliers[axis.name] = axisMult.toNumber();
      totalAxisWeight = totalAxisWeight.plus(axisMult);
    }

    // Trust score bonus (capped at 10%)
    const trustBonus = Math.min(context.trustScore, 0.10);

    // Calculate final XP
    const totalMultiplier = complexityMult
      .times(verificationMult)
      .times(totalAxisWeight)
      .plus(trustBonus);

    const awardedXP = baseXP.times(totalMultiplier).round().toNumber();

    return {
      awardedXP,
      breakdown: {
        baseXP: baseXP.toNumber(),
        complexityMultiplier: complexityMult.toNumber(),
        verificationMultiplier: verificationMult.toNumber(),
        axisMultipliers,
        trustBonus,
        totalMultiplier: totalMultiplier.toNumber()
      },
      calculationTimestamp: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    };
  }

  async applyDecay(userId: string): Promise<DecayResult> {
    const userXP = await this.getUserXP(userId);
    const now = new Date();
    const results: AxisDecayResult[] = [];

    for (const [axis, xpData] of Object.entries(userXP.byAxis)) {
      const config = this.AXIS_CONFIGS.get(axis) || { weight: 1.0, decayRate: 0.98 };
      const daysSinceUpdate = (now.getTime() - xpData.lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceUpdate >= 30) {
        const monthsElapsed = Math.floor(daysSinceUpdate / 30);
        const decayFactor = Math.pow(config.decayRate, monthsElapsed);
        
        const newXP = xpData.rawXP * decayFactor;
        const xpLost = xpData.rawXP - newXP;

        await this.updateUserXP(userId, axis, {
          rawXP: newXP,
          lastUpdated: now
        });

        results.push({
          axis,
          previousXP: xpData.rawXP,
          newXP,
          xpLost,
          decayFactor
        });
      }
    }

    return { userId, results, processedAt: now };
  }
}
```

### Trust Calculator

The Trust Calculator combines the four trust gradient components: execution reliability, collaboration quality, contribution quality, and judgment quality. It produces overall and per-component scores. The calculator also handles decay and smoothing to prevent scores from jumping wildly based on single events.

```typescript
// src/services/trust-calculator.ts

interface TrustComponents {
  execution: {
    onTimeDeliveryRate: number;
    taskCompletionRate: number;
    reliabilityScore: number;
  };
  collaboration: {
    codeReviewQuality: number;
    communicationScore: number;
    conflictResolution: number;
  };
  contribution: {
    codeQualityScore: number;
    impactScore: number;
    verificationRate: number;
  };
  judgment: {
    architecturalDecisionQuality: number;
    problemSolvingScore: number;
    innovationContribution: number;
  };
}

interface TrustScoreResult {
  overallScore: number;
  components: {
    execution: number;
    collaboration: number;
    contribution: number;
    judgment: number;
  };
  confidence: number;
  factors: string[];
  recommendations: string[];
}

class TrustCalculator {
  private readonly WEIGHTS = {
    execution: 0.30,
    collaboration: 0.30,
    contribution: 0.25,
    judgment: 0.15
  };

  async calculateTrustScore(
    userId: string,
    timeframeDays: number = 90
  ): Promise<TrustScoreResult> {
    const components = await this.gatherComponents(userId, timeframeDays);
    const evidenceCounts = await this.getEvidenceCounts(userId, timeframeDays);
    
    // Calculate component scores
    const executionScore = this.calculateExecutionScore(components.execution);
    const collaborationScore = this.calculateCollaborationScore(components.collaboration);
    const contributionScore = this.calculateContributionScore(components.contribution);
    const judgmentScore = this.calculateJudgmentScore(components.judgment);

    // Calculate overall score
    const overallScore = 
      executionScore * this.WEIGHTS.execution +
      collaborationScore * this.WEIGHTS.collaboration +
      contributionScore * this.WEIGHTS.contribution +
      judgmentScore * this.WEIGHTS.judgment;

    // Calculate confidence based on evidence volume
    const totalEvidence = Object.values(evidenceCounts).reduce((a, b) => a + b, 0);
    const confidence = Math.min(totalEvidence / 50, 1.0);

    // Generate factors and recommendations
    const factors = this.identifyFactors(components, overallScore);
    const recommendations = this.generateRecommendations(components);

    return {
      overallScore: Math.round(overallScore * 10000) / 10000,
      components: {
        execution: Math.round(executionScore * 10000) / 10000,
        collaboration: Math.round(collaborationScore * 10000) / 10000,
        contribution: Math.round(contributionScore * 10000) / 10000,
        judgment: Math.round(judgmentScore * 10000) / 10000
      },
      confidence,
      factors,
      recommendations
    };
  }

  private calculateExecutionScore(exec: TrustComponents['execution']): number {
    return (
      exec.onTimeDeliveryRate * 0.35 +
      exec.taskCompletionRate * 0.35 +
      exec.reliabilityScore * 0.30
    );
  }

  private calculateCollaborationScore(collab: TrustComponents['collaboration']): number {
    return (
      collab.codeReviewQuality * 0.35 +
      collab.communicationScore * 0.35 +
      collab.conflictResolution * 0.30
    );
  }

  private calculateContributionScore(contrib: TrustComponents['contribution']): number {
    return (
      contrib.codeQualityScore * 0.40 +
      contrib.impactScore * 0.35 +
      contrib.verificationRate * 0.25
    );
  }

  private calculateJudgmentScore(judgment: TrustComponents['judgment']): number {
    return (
      judgment.architecturalDecisionQuality * 0.40 +
      judgment.problemSolvingScore * 0.35 +
      judgment.innovationContribution * 0.25
    );
  }
}
```

### Matching Algorithm

The Matching Algorithm proposes teams and collaborators based on XP Profiles, project requirements, and collaboration history. It's designed to surface high-probability matches while leaving room for serendipity.

```typescript
// src/services/matching-algorithm.ts

interface MatchRequest {
  projectId: string;
  requiredRoles: string[];
  targetTeamSize: number;
  priorityAxes: string[];
  deadline?: Date;
  constraints?: {
    maxTeamSize?: number;
    minTrustScore?: number;
    preferredLanguages?: string[];
    avoidUsers?: string[];
  };
}

interface MatchCandidate {
  userId: string;
  username: string;
  avatarUrl?: string;
  trustScore: number;
  roleScores: Record<string, number>;
  availabilityScore: number;
  collaborationScore: number;
  totalScore: number;
  matchReasons: string[];
  concerns: string[];
}

interface MatchProposal {
  proposalId: string;
  projectId: string;
  candidates: MatchCandidate[];
  teamScore: number;
  roleCoverage: string[];
  compatibilityScore: number;
  riskFactors: string[];
  nextSteps: string[];
}

class MatchingAlgorithm {
  async findMatches(request: MatchRequest): Promise<MatchProposal> {
    // Phase 1: Gather candidates
    const candidates = await this.gatherCandidates(request);

    // Phase 2: Score each candidate
    const scoredCandidates = await this.scoreCandidates(candidates, request);

    // Phase 3: Generate team combinations
    const combinations = await this.generateTeamCombinations(
      scoredCandidates,
      request.requiredRoles,
      request.targetTeamSize,
      request.constraints
    );

    // Phase 4: Rank and select best proposal
    const bestProposal = await this.selectBestProposal(combinations, request);

    return bestProposal;
  }

  private async gatherCandidates(request: MatchRequest): Promise<User[]> {
    // Query users based on role requirements
    const roleQueries = request.requiredRoles.map(role => 
      this.findUsersByPrimaryRole(role)
    );

    const candidateSets = await Promise.all(roleQueries);
    const allCandidates = candidateSets.flat();

    // Remove duplicates
    const uniqueCandidates = Array.from(
      new Map(allCandidates.map(c => [c.id, c])).values()
    );

    return uniqueCandidates;
  }

  private async scoreCandidates(
    users: User[],
    request: MatchRequest
  ): Promise<MatchCandidate[]> {
    const scored: MatchCandidate[] = [];

    for (const user of users) {
      // Skip if in avoid list
      if (request.constraints?.avoidUsers?.includes(user.id)) {
        continue;
      }

      const roleScores: Record<string, number> = {};
      let totalRoleScore = 0;

      for (const role of request.requiredRoles) {
        const score = await this.scoreUserForRole(user.id, role, request.priorityAxes);
        roleScores[role] = score;
        totalRoleScore += score;
      }

      const availabilityScore = await this.getAvailabilityScore(user.id);
      const collaborationScore = await this.getCollaborationScore(user.id);

      const totalScore = 
        (totalRoleScore / request.requiredRoles.length) * 0.50 +
        availabilityScore * 0.25 +
        collaborationScore * 0.25;

      const concerns = await this.identifyConcerns(user.id, request);

      scored.push({
        userId: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl,
        trustScore: user.trustScore,
        roleScores,
        availabilityScore,
        collaborationScore,
        totalScore,
        matchReasons: this.generateMatchReasons(user, roleScores, request),
        concerns
      });
    }

    return scored.sort((a, b) => b.totalScore - a.totalScore);
  }
}
```

### Visibility Controller

The Visibility Controller manages ANON/OFF toggles, pseudonym connections, and identity exposure rules. It's responsible for ensuring that what should be visible is visible, what should be private is private, and that the boundaries between are enforced correctly.

```typescript
// src/services/visibility-controller.ts

enum VisibilityMode {
  ANON = 'ANON',
  OFF = 'OFF'
}

interface VisibilityRules {
  profileVisibility: {
    realName: VisibilityLevel;
    email: VisibilityLevel;
    xpDetails: VisibilityLevel;
    contributionHistory: VisibilityLevel;
  };
  presenceVisibility: {
    onlineStatus: VisibilityLevel;
    lastActive: VisibilityLevel;
  };
  searchVisibility: {
    appearInSearch: boolean;
    appearInSuggestions: boolean;
  };
}

enum VisibilityLevel {
  SELF_ONLY = 'self',
  TRUSTED_ONLY = 'trusted',
  MEMBERS = 'members',
  PUBLIC = 'public'
}

class VisibilityController {
  async getVisibleProfile(
    requesterId: string | null,
    targetUserId: string
  ): Promise<VisibleProfile> {
    const targetUser = await this.getUser(targetUserId);
    const rules = await this.getVisibilityRules(targetUserId);
    const requester = requesterId ? await this.getUser(requesterId) : null;

    // Determine visibility mode
    const effectiveMode = targetUser.visibilityMode;

    if (effectiveMode === VisibilityMode.OFF) {
      return this.buildPublicProfile(targetUser, rules);
    }

    // ANON mode - return pseudonym
    const primaryPseudonym = await this.getPrimaryPseudonym(targetUserId);

    if (!primaryPseudonym) {
      return {
        type: 'anonymous',
        displayName: 'Anonymous',
        xpSummary: { total: 0, topAxes: [] }
      };
    }

    // Check if requester can see more
    const canSeeRealIdentity = await this.canSeeRealIdentity(
      requesterId,
      targetUserId
    );

    if (canSeeRealIdentity) {
      return this.buildLinkedProfile(
        targetUser,
        primaryPseudonym,
        rules,
        requester
      );
    }

    return this.buildAnonymousProfile(primaryPseudonym, rules);
  }

  private async canSeeRealIdentity(
    requesterId: string | null,
    targetUserId: string
  ): Promise<boolean> {
    if (!requesterId) return false;
    if (requesterId === targetUserId) return true;

    const targetUser = await this.getUser(targetUserId);
    if (targetUser.visibilityMode === VisibilityMode.OFF) return true;

    // Check if identity was revealed
    const pseudonym = await this.getPrimaryPseudonym(targetUserId);
    return pseudonym?.revealedTo.includes(requesterId) || false;
  }
}
```

### Verification Pipeline

The Verification Pipeline ensures contributions meet quality standards before XP is awarded. It coordinates between automated checks (CI/CD, test coverage) and manual reviews (code review, peer attestation). This ensures consistent standards while avoiding bottlenecks.

```typescript
// src/services/verification-pipeline.ts

interface VerificationRequest {
  contributionId: string;
  contributionType: string;
  sourceType: string;
  sourceUrl?: string;
  requiredChecks: VerificationCheck[];
  manualReviewRequired: boolean;
  assignedReviewers?: string[];
}

interface VerificationResult {
  contributionId: string;
  status: 'passed' | 'failed' | 'pending_review';
  automatedResults?: AutomatedCheckResult[];
  manualReview?: {
    required: boolean;
    assignedReviewers: string[];
    deadline: Date;
  };
  xpAward?: number;
  reasons?: string[];
}

interface AutomatedCheckResult {
  checkType: 'ci_cd' | 'test_coverage' | 'code_quality' | 'security' | 'complexity';
  passed: boolean;
  score?: number;
  details?: string;
  blocking: boolean;
}

class VerificationPipeline {
  async processContribution(
    request: VerificationRequest
  ): Promise<VerificationResult> {
    // Stage 1: Automated checks
    const automatedResults = await this.runAutomatedChecks(request);

    const blockingFailures = automatedResults.filter(
      r => !r.passed && r.blocking
    );

    if (blockingFailures.length > 0) {
      return {
        contributionId: request.contributionId,
        status: 'failed',
        automatedResults,
        reasons: blockingFailures.map(f => f.details)
      };
    }

    // Stage 2: Determine if manual review is needed
    const needsManualReview = 
      request.manualReviewRequired ||
      this.requiresManualReview(request, automatedResults);

    if (needsManualReview) {
      const assignment = await this.assignReviewers(request);

      return {
        contributionId: request.contributionId,
        status: 'pending_review',
        automatedResults,
        manualReview: {
          required: true,
          assignedReviewers: assignment.reviewerIds,
          deadline: assignment.deadline
        }
      };
    }

    // Stage 3: Calculate and award XP
    const xpAward = await this.calculateXPAward(request, automatedResults);

    return {
      contributionId: request.contributionId,
      status: 'passed',
      automatedResults,
      xpAward
    };
  }

  private async runAutomatedChecks(
    request: VerificationRequest
  ): Promise<AutomatedCheckResult[]> {
    const checks: Promise<AutomatedCheckResult>[] = [];

    // CI/CD check
    if (request.sourceType === 'github' && request.sourceUrl) {
      checks.push(this.checkGithubActions(request.sourceUrl));
    }

    // Test coverage check
    checks.push(this.checkTestCoverage(request.contributionId));

    // Code quality check
    checks.push(this.checkCodeQuality(request.contributionId));

    // Security check
    checks.push(this.checkSecurity(request.contributionId));

    return Promise.all(checks);
  }
}
```

---

## 6.3 Hosting and Deployment

### MVP Hosting: Railway / Render

For the initial launch, Railway or Render provides simplicity with free/cheap tiers for rapid iteration without infrastructure complexity.

**Railway Configuration (railway.json):**

```json
{
  "$schema": "https://railway.app/schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 10,
    "restartPolicy": "on-failure"
  },
  "domains": [
    {
      "domain": "api.fatedfortress.com"
    }
  ]
}
```

### MVP Database: Supabase / Neon

PostgreSQL hosting from Supabase or Neon provides the database layer with minimal operational overhead.

**Supabase Configuration:**

```typescript
// src/config/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const query = (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};
```

### Production Considerations

As FatedFortress scales, we'll migrate to more robust infrastructure: dedicated hosting, managed Kubernetes, and possibly multi-region deployment for resilience.

**Kubernetes Deployment (k8s/deployment.yaml):**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fatedfortress-api
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: fatedfortress-api
  template:
    metadata:
      labels:
        app: fatedfortress-api
    spec:
      containers:
      - name: api
        image: fatedfortress/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: fatedfortress-api
  namespace: production
spec:
  selector:
    app: fatedfortress-api
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
```

---

## 6.4 API Design Standards

### RESTful Endpoints

| Resource | GET | POST | PUT | DELETE |
|----------|-----|------|-----|--------|
| /api/users | List users | Create user | Update user | Delete user |
| /api/users/:id | Get user | - | Update user | - |
| /api/xp | Get XP summary | Submit contribution | - | - |
| /api/teams | List teams | Create team | Update team | Delete team |
| /api/projects | List projects | Create project | Update project | Delete project |
| /api/contributions | List contributions | Submit | Update | - |

### Error Response Format

```typescript
interface APIError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    requestId: string;
    timestamp: string;
  };
}

interface ValidationError {
  error: {
    code: 'VALIDATION_ERROR';
    message: 'Request validation failed';
    details: {
      field: string;
      message: string;
    }[];
    requestId: string;
    timestamp: string;
  };
}
```

---

## 6.5 Monitoring and Observability

### Metrics Collection (Prometheus)

```typescript
import { Registry, Counter, Histogram, Gauge } from 'prom-client';

const registry = new Registry();

// HTTP metrics
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status'],
  registers: [registry]
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'path'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [registry]
});

// Business metrics
const activeUsers = new Gauge({
  name: 'active_users',
  help: 'Number of active users',
  registers: [registry]
});

const xpAwardsTotal = new Counter({
  name: 'xp_awards_total',
  help: 'Total XP awards',
  labelNames: ['contribution_type', 'axis'],
  registers: [registry]
});

const verificationDuration = new Histogram({
  name: 'verification_duration_seconds',
  help: 'Time to verify contributions',
  labelNames: ['verification_type'],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
  registers: [registry]
});
```

### Health Check Endpoints

```typescript
// GET /health - Kubernetes health check
router.get('/health', async (req, res) => {
  const dbHealthy = await checkDatabase();
  const redisHealthy = await checkRedis();
  
  if (dbHealthy && redisHealthy) {
    res.status(200).json({ status: 'healthy' });
  } else {
    res.status(503).json({
      status: 'unhealthy',
      checks: {
        database: dbHealthy,
        redis: redisHealthy
      }
    });
  }
});

// GET /ready - Readiness probe
router.get('/ready', async (req, res) => {
  const dbHealthy = await checkDatabase();
  
  if (dbHealthy) {
    res.status(200).json({ ready: true });
  } else {
    res.status(503).json({ ready: false });
  }
});

// GET /metrics - Prometheus metrics
router.get('/metrics', async (req, res) => {
  res.set('Content-Type', registry.contentType);
  res.send(await registry.metrics());
});
```

---

## 6.6 Building and Simulation Testing

### 6.6.1 Technical Architecture Validation Framework

The Technical Architecture must be validated through comprehensive simulation to ensure all components function correctly under realistic and stressed conditions. AI agents will simulate users, contributors, team interactions, and system loads to identify weaknesses before production deployment.

**Validation Objectives:**
```
Primary Goals:
├── Verify all core services operate correctly under load
├── Confirm database schemas support expected query patterns
├── Validate API endpoints handle expected and unexpected inputs
└── Test system resilience under failure conditions

Secondary Goals:
├── Measure actual vs. theoretical performance
├── Identify bottlenecks before they impact users
├── Validate monitoring and alerting coverage
└── Confirm deployment processes work reliably
```

### 6.6.2 AI Agent Simulation Population

Create 50,000 AI agents simulating platform users with varying behaviors:

```
Agent Behavior Profiles:

Profile A: Active Contributor (30%) - 15,000 agents
├── Daily API calls: 100-500
├── Session duration: 2-8 hours
├── Contribution rate: 5-20 per day
├── Query patterns: Read-heavy (80% reads, 20% writes)
├── Geographic distribution: Global (following real-world patterns)
└── Peak activity: Business hours in home timezone

Profile B: Casual Browser (25%) - 12,500 agents
├── Daily API calls: 10-50
├── Session duration: 5-30 minutes
├── Contribution rate: 0-2 per week
├── Query patterns: 95% reads, 5% writes
├── Geographic distribution: Urban concentration
└── Peak activity: Evening and weekend spikes

Profile C: Power User (15%) - 7,500 agents
├── Daily API calls: 500-2,000
├── Session duration: 8-12 hours
├── Contribution rate: 20-100 per day
├── Query patterns: Mixed (60% reads, 40% writes)
├── Geographic distribution: Tech hub concentration
└── Peak activity: Consistent throughout day

Profile D: API Integrator (10%) - 5,000 agents
├── Daily API calls: 10,000-100,000 (bot traffic)
├── Session duration: 24/7
├── Contribution rate: Varies (automated)
├── Query patterns: API-focused (95% reads)
├── Geographic distribution: Server farm locations
└── Peak activity: Consistent, no human patterns

Profile E: Team Manager (10%) - 5,000 agents
├── Daily API calls: 200-800
├── Session duration: 4-10 hours
├── Team operations: 10-50 team actions per day
├── Query patterns: Dashboard and team management
├── Geographic distribution: Business hours focused
└── Peak activity: Morning and midday

Profile F: Adversarial Tester (10%) - 5,000 agents
├── Daily API calls: 1,000-10,000 (attack traffic)
├── Session duration: Varied (attack patterns)
├── Attack patterns: Brute force, injection, overflow
├── Query patterns: Intentional edge cases
├── Geographic distribution: Botnet patterns
└── Peak activity: Coordinated attack windows
```

### 6.6.3 Stack Component Validation Tests

**Test 1: Node.js Runtime Validation**

```
Scenario: 50,000 concurrent AI agents operating simultaneously

Runtime Metrics to Validate:
├── Event loop latency: Target < 10ms P95
├── Memory consumption: Target < 512MB per instance
├── CPU utilization: Target < 70% sustained
├── GC pause times: Target < 50ms P99
└── Connection pool health: No leaks over 24 hours

Load Pattern:
├── Ramp-up: 0 to 50,000 agents over 1 hour
├── Sustain: Peak load for 8 hours
├── Cool-down: Gradual reduction over 1 hour
└── Multiple cycles: 7-day continuous test

Pass Criteria:
├── No event loop blocking > 100ms
├── Memory growth < 10% over 24 hours
├── Zero connection leaks
├── Graceful degradation at 150% capacity
└── Recovery time < 5 minutes after overload
```

**Test 2: TypeScript Type Safety Validation**

```
Scenario: Comprehensive input validation testing

Test Coverage Required:
├── API request validation: 100% of endpoints
├── Database query parameters: 100% typed
├── Internal service calls: 100% interface-compliant
└── Event payloads: 100% schema-validated

Adversarial Inputs to Test:
├── Type boundary violations (numbers at string boundaries)
├── Null/undefined handling: All code paths tested
├── Array bounds: Edge cases for array operations
├── Date parsing: Invalid date formats
└── JSON injection: Malformed payloads

Pass Criteria:
├── Zero type-related runtime errors
├── 100% Zod schema validation coverage
├── All edge cases handled gracefully
└── Error messages helpful and actionable
```

**Test 3: Express.js + Fastify Routing**

```
Scenario: API routing under realistic and attack traffic

Test Cases:
├── Valid request routing: All endpoints reachable
├── Invalid request handling: Proper error responses
├── Rate limiting: Enforcement at all levels
├── Authentication enforcement: Protected routes blocked
└── CORS handling: Proper origin validation

Performance Targets:
├── Request throughput: 10,000 requests/second per instance
├── Latency P50: < 10ms
├── Latency P95: < 50ms
├── Latency P99: < 100ms
└── Error rate: < 0.01% for valid requests

Stress Test:
├── Bursts: 10x normal traffic for 10 seconds
├── sustained load: 5x normal for 1 hour
├── Connection exhaustion: 10,000 concurrent connections
└── Memory pressure: Verify graceful handling
```

### 6.6.4 Database Validation Tests

**Test 4: PostgreSQL Schema Performance**

```
Scenario: Realistic query patterns on 1M+ records

Query Types to Validate:
├── User lookups by ID: Target < 5ms
├── XP history queries: Target < 20ms
├── Contribution search: Target < 50ms
├── Team matching queries: Target < 100ms
├── Aggregation queries: Target < 200ms
└── Full-text search: Target < 100ms

Index Validation:
├── Primary key lookups: Covered by B-tree
├── Date range queries: Covered by BRIN indexes
├── Text search: Covered by GiST indexes
├── Foreign key joins: Covered by appropriate indexes
└── Composite queries: Covered by composite indexes

Pass Criteria:
├── All query targets met under load
├── Index size < 2x table size
├── Query plan analysis: All queries use optimal plans
├── No sequential scans on large tables
└── VACUUM maintenance acceptable
```

**Test 5: PostgreSQL Concurrency**

```
Scenario: 1,000 concurrent write operations

Test Cases:
├── Concurrent contributions: 1,000 simultaneous submissions
├── XP updates: 500 concurrent trust score recalculations
├── User operations: 200 concurrent account updates
├── Transaction isolation: No dirty reads or lost updates
└── Deadlock prevention: No deadlocks under concurrent load

Performance Targets:
├── Write throughput: 5,000 writes/second
├── Transaction commit latency: < 50ms P95
├── Lock wait time: < 10ms P95
└── Connection pool efficiency: > 95% utilization

Failover Testing:
├── Primary failure: Automatic failover < 30 seconds
├── Data consistency: No data loss during failover
├── Replica lag: < 1 second during normal operation
└── Read-your-writes: Consistent across replicas
```

**Test 6: PostgreSQL Data Integrity**

```
Scenario: Chaos testing with data corruption scenarios

Test Cases:
├── Disk failure simulation: Verify WAL recovery
├──电源故障模拟: Verify transactional integrity
├── Memory corruption: Detect and recover
├── Index corruption: Auto-reindex capability
└── Schema migration: Zero-downtime updates

Pass Criteria:
├── All transactions integrity verified
├── Recovery time within SLA
├── No silent data corruption
├── Backup verification: All restores tested
└── Point-in-time recovery: Tested and documented
```

### 6.6.5 Key System Validation Tests

**Test 7: XP Engine Validation**

```
Scenario: 100,000 XP calculations per hour

Test Cases:
├── Calculation accuracy: Compare against reference implementation
├── Decay application: Verify mathematical correctness
├── Trust integration: Combined XP + trust calculations
├── Verification pipeline: End-to-end flow
└── Audit trail: Every calculation traceable

Performance Targets:
├── Single calculation: < 50ms
├── Batch of 100: < 500ms
├── Hourly decay job: < 5 minutes for 100,000 users
└── Trust recalculation: < 1 hour for full population

Edge Cases:
├── Zero XP users: Edge case handling
├── Max XP users: No overflow
├── Rapid successive contributions: Rate limiting
├── Cross-axis interactions: Correct weight application
└── Decimal precision: No floating point errors
```

**Test 8: Trust Calculator Validation**

```
Scenario: Trust scores recalculated for all users

Test Cases:
├── Component calculation: Each component independently verifiable
├── Weight application: Correct weighting applied
├── Confidence calculation: Evidence-based scoring
├── Decay integration: Time-weighted trust
└── Edge cases: New users, inactive users, returning users

Accuracy Validation:
├── Expert panel: 100 user trust scores validated by experts
├── Cross-validation: Compare with historical performance
├── Bias detection: No systematic skew by user type
└── Stability: Scores don't jump wildly

Pass Criteria:
├── 95% accuracy vs. expert panel
├── No user type bias detected
├── Score volatility within acceptable bounds
└── All calculations auditable
```

**Test 9: Matching Algorithm Validation**

```
Scenario: 10,000 team formation requests

Test Cases:
├── Role coverage: All required roles filled
├── Score accuracy: Best candidates selected
├── Collaboration history: Correct integration
├── Availability handling: Real-time availability
├── Constraint satisfaction: All requirements met

Performance Targets:
├── Single matching request: < 1 second
├── Batch of 100: < 10 seconds
├── Concurrent requests: 100 simultaneous matches
└── Cache effectiveness: 80%+ cache hit rate

Quality Validation:
├── Expert review: 100 proposals reviewed by humans
├── Optimality check: Compare to brute-force optimum
├── Diversity metrics: Team composition variety
└── User satisfaction: AI-simulated feedback
```

**Test 10: Visibility Controller Validation**

```
Scenario: 1M visibility checks per day

Test Cases:
├── ANON mode: No real identity exposed
├── OFF mode: All data visible as expected
├── Pseudonym linking: Only authorized reveals
├── Cross-context isolation: No data bleeding
└── Consent enforcement: User preferences honored

Privacy Validation:
├── Automated scanning: No PII in API responses
├── Correlation testing: No pseudonym linking possible
├── Audit review: All visibility decisions logged
└── Penetration testing: Attempted privacy violations

Pass Criteria:
├── 0 privacy violations detected
├── All data flows correctly filtered
├── Performance: < 10ms per visibility check
└── Audit trail complete
```

**Test 11: Verification Pipeline Validation**

```
Scenario: 50,000 contributions requiring verification daily

Test Cases:
├── Automated check accuracy: 95%+ agreement with manual review
├── Manual reviewer assignment: Fair distribution
├── Quality scoring consistency: Inter-reviewer agreement > 0.8
├── Bottleneck detection: No stage becomes blocker
└── SLA adherence: 90% verified within 72 hours

Performance Targets:
├── Automated checks: < 30 seconds per contribution
├── Queue processing: < 1 hour queue depth
├── Manual review: < 72 hours P90
└── XP award: < 24 hours from submission

Adversarial Testing:
├── Fake contributions: Detection rate > 99%
├── Quality manipulation: Detection rate > 95%
├── Review gaming: Detection rate > 90%
└── Automated vs. manual: Consistent outcomes
```

### 6.6.6 Infrastructure Validation Tests

**Test 12: Docker Container Validation**

```
Scenario: Container deployment and scaling

Test Cases:
├── Image build: Reproducible, fast builds
├── Startup time: < 30 seconds from cold start
├── Health checks: Accurate failure detection
├── Resource limits: Enforced correctly
└── Volume mounts: Persistent data integrity

Security Validation:
├── Base image vulnerabilities: Zero critical/high
├── Secret management: No secrets in images
├── Non-root user: Containers run as non-root
└── Image signing: All images signed

Pass Criteria:
├── Build time < 5 minutes
├── Startup time < 30 seconds
├── Zero security vulnerabilities in images
└── All health checks functional
```

**Test 13: Kubernetes Orchestration**

```
Scenario: Production-scale Kubernetes deployment

Test Cases:
├── Pod scheduling: All pods scheduled correctly
├── Horizontal scaling: Auto-scaling triggers correctly
├── Rolling updates: Zero-downtime deployments
├── Resource quotas: Enforced correctly
└── Network policies: Traffic properly restricted

Failure Scenarios:
├── Node failure: Pods rescheduled automatically
├── Pod crash: Automatic restart with state preservation
├── Network partition: Graceful degradation
└── Resource exhaustion: Fair sharing enforced

Performance Targets:
├── Pod startup: < 60 seconds
├── Scaling trigger: < 2 minutes from alert
├── Update rollout: < 5 minutes for full deployment
└── Failover time: < 3 minutes for major failures
```

**Test 14: MVP Hosting Validation (Railway/Render)**

```
Scenario: Production deployment on MVP platform

Test Cases:
├── Deployment pipeline: Automated from git
├── Environment variables: Secure management
├── Database connection: Stable, performant
├── Custom domains: SSL and routing correct
└── Logs and monitoring: Accessible and useful

Performance Validation:
├── API response time: < 200ms P95
├── Database queries: < 50ms P95
├── Cold start: < 10 seconds
└── Uptime: > 99.5%

Cost Validation:
├── Monthly cost within budget
├── Scaling costs predictable
├── No unexpected charges
└── Cost per user: Trackable and reasonable
```

### 6.6.7 API Validation Tests

**Test 15: REST API Contract Validation**

```
Scenario: All API endpoints tested comprehensively

Test Coverage:
├── Happy path: All endpoints respond correctly
├── Error handling: All error codes tested
├── Authentication: All protected routes verified
├── Rate limiting: Enforcement at all levels
├── Input validation: All edge cases covered

API Contract:
├── OpenAPI spec matches implementation
├── Versioning: Backward compatibility maintained
├── Deprecation: Graceful handling of old versions
└── Documentation: Accurate and complete

Pass Criteria:
├── 100% endpoint coverage
├── 100% HTTP method coverage
├── 95% input validation coverage
├── Zero undocumented endpoints
└── OpenAPI spec 100% accurate
```

### 6.6.8 Monitoring Validation Tests

**Test 16: Observability Stack Validation**

```
Scenario: Monitoring under production-like conditions

Test Coverage:
├── Metrics collection: All critical metrics captured
├── Log aggregation: All logs captured and searchable
├── Distributed tracing: Request flows traceable
├── Alerting: All critical issues alerted
├── Dashboards: Real-time visibility

Alert Validation:
├── Alert fatigue: No more than 10 alerts/day on-call
├── Alert accuracy: > 95% true positives
├── Alert actionable: All alerts have runbook
└── Alert timing: < 5 minutes from issue to alert

Pass Criteria:
├── 100% critical metric coverage
├── < 5 minute data latency
├── 99.9% log retention
├── Zero missed incidents
└── On-call satisfaction > 4/5
```

### 6.6.9 Scale and Performance Targets

```
System-Wide Performance Targets:

User-Facing Metrics:
├── API response P50: < 50ms
├── API response P95: < 200ms
├── API response P99: < 500ms
├── Page load: < 2 seconds
└── Dashboard refresh: < 5 seconds

Background Jobs:
├── XP decay: Complete in < 5 minutes
├── Trust recalculation: Complete in < 1 hour
├── Verification processing: < 24 hours P90
├── Report generation: < 10 minutes

Infrastructure:
├── Uptime: > 99.9%
├── Data durability: > 99.99%
├── Recovery time: < 1 hour
├── Backup frequency: Hourly
└── Point-in-time recovery: 30-day window
```

### 6.6.10 Simulation Output Specification

```
For Technical Architecture Validation:
├── Performance benchmark report
├── Bottleneck analysis and recommendations
├── Security audit results
├── Scalability assessment
├── Failure mode analysis
└── Cost projection validation

For Production Readiness:
├── Load test results documented
├── Capacity planning complete
├── Alert thresholds calibrated
├── Runbooks for all scenarios
├── Deployment checklist verified
└── Rollback procedures tested
```

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY
# Chapter 7: Ethical Considerations and Open Questions

*"Being honest about what we don't know."*

---

## 7.1 Acknowledged Limitations

Building a reputation system at scale comes with ethical weight. We're honest about what we don't know:

**Telemetry boundaries**: We observe behavior within platform boundaries, but that's a subset of what matters. The quality of someone's thinking, the impact of their mentorship, and work done outside the platform—telemetry captures none of this. We weight observable behavior heavily, but we acknowledge it's incomplete.

**Verification is circular**: Who verifies the verifiers? High-XP users become verifiers, which could create incumbent advantage. Newcomers might struggle to build reputation if verification power concentrates. We're exploring mechanisms to ensure fresh perspectives in verification.

**Matching is probabilistic**: Teams form through our matching algorithm, but teams fail for reasons no system captures: personality conflicts, external stressors, and simple bad luck. We don't claim to solve team formation perfectly.

**Depth vs. breadth**: The XP system might favor frequent small contributions over deep, sustained work on difficult problems. A series of small features might earn more XP than one complex feature that takes months. We're exploring axis-specific handling to address this concern.

**Recovery is hard**: If trust decays and you want to rebuild, you need opportunity. But if reputation is low, opportunity is scarce. We're exploring recovery-mode mechanisms that give people second chances.

## 7.2 What We Refuse

FatedFortress explicitly refuses to:

Enable surveillance of individuals beyond contribution tracking.
Automate coercion or manipulation to increase engagement.
Undermine labor protections or worker rights.
Centralize irreversible power in platform operators.
Sell reputation manipulation as a service.

---

## 7.3 Building and Simulation Testing

### 7.3.1 Ethical Framework Validation

The ethical foundations of FatedFortress must be validated through rigorous simulation. AI agents will attempt to find ways around ethical boundaries, test edge cases in acknowledged limitations, and probe for unintended consequences.

**Validation Objectives:**
```
Primary Goals:
├── Confirm ethical boundaries hold under adversarial testing
├── Verify acknowledged limitations are properly communicated
├── Test that refusal mechanisms work effectively
└── Identify unintended ethical violations

Secondary Goals:
├── Validate transparency about system limitations
├── Test recovery mechanisms for trust decay
├── Verify no surveillance beyond contribution tracking
└── Confirm refusal mechanisms are comprehensive
```

### 7.3.2 AI Agent Ethical Testing Population

Create 5,000 AI agents programmed to test ethical boundaries:

```
Agent Ethical Test Profiles:

Profile A: Boundary Prober (30%) - 1,500 agents
├── Behavior: Systematic testing of system boundaries
├── Techniques: Edge case exploration, API abuse attempts
├── Goal: Find ethical violations or loopholes
└── Methods: Creative edge cases, social engineering

Profile B: Surveillance Challenger (20%) - 1,000 agents
├── Behavior: Attempt to track users beyond contribution
├── Techniques: Correlation attacks, timing analysis
├── Goal: Prove surveillance capability exists
└── Methods: Cross-reference attempts, fingerprinting

Profile C: Manipulation Tester (15%) - 750 agents
├── Behavior: Attempt to manipulate others' behavior
├── Techniques: Social engineering, incentive gaming
├── Goal: Demonstrate manipulation capability
└├── Methods: Dark pattern attempts, psychological pressure

Profile D: Recovery Challenger (15%) - 750 agents
├── Behavior: Test recovery mechanisms after trust loss
├── Techniques: Rapid contribution, sabbatical abuse
├── Goal: Find recovery loopholes
└── Methods: Multiple accounts, reputation transfer

Profile E: Transparency Tester (10%) - 500 agents
├── Behavior: Attempt to understand hidden information
├── Techniques: API probing, timing attacks
├── Goal: Reveal private data or system internals
└── Methods: Information disclosure attempts

Profile F: Systemic Challenger (10%) - 500 agents
├── Behavior: Test for systemic ethical violations
├── Techniques: Large-scale pattern analysis
├── Goal: Find platform-wide ethical issues
└── Methods: Coordinated testing, statistical analysis
```

### 7.3.3 Ethical Boundary Validation Tests

**Test 1: Surveillance Prevention**

```
Scenario: 1,000 agents attempt surveillance beyond contribution tracking

Test Cases:
├── Personal behavior tracking: Attempt to track non-platform activity
├── Location inference: Attempt to determine user location
├── Identity correlation: Attempt to link pseudonyms without consent
├── Behavioral fingerprinting: Attempt user identification across sessions
├── Social graph extraction: Attempt to map relationships

Pass Criteria:
├── Zero successful surveillance attempts
├── All attempts logged and flagged
├── Privacy audit: Clean (no data leakage)
└── Anomaly detection: > 95% of attempts flagged

Detection Methods:
├── Automated scanning for PII in responses
├── Statistical analysis for correlation attacks
├── User complaint analysis for privacy violations
└── Third-party privacy audit
```

**Test 2: Coercion Prevention**

```
Scenario: 1,000 agents attempt behavioral coercion

Test Cases:
├── Notification spam: Attempt to overwhelm users
├── Social pressure: Attempt to force unwanted actions
├── FOMO manipulation: Attempt to create artificial urgency
├── Fear-based coercion: Attempt to scare users into action
├── Reward manipulation: Attempt to distort incentives

Pass Criteria:
├── Zero successful coercion
├── Rate limiting enforced
├── Dark patterns absent from UI
└── User agency preserved in all flows

Validation Methods:
├── UI audit for dark patterns
├── Incentive structure analysis
├── User agency tests (can users say no?)
└── Stress scenario testing
```

**Test 3: Labor Rights Protection**

```
Scenario: Verify platform doesn't undermine worker protections

Test Cases:
├── Exploitation patterns: Detect exploitative opportunity markets
├── Coercive employment: Detect forced platform participation
├── Wage suppression: Detect anti-competitive behavior
├── Worker classification: Ensure no misclassification
└── Collective action: Verify no interference with organizing

Pass Criteria:
├── Zero exploitation patterns detected
├── Voluntary participation only
├── Fair compensation mechanics
└── No worker rights violations

Audit Methods:
├── Economic analysis of platform mechanics
├── Worker classification review
├── Competitive analysis
└── Labor rights expert review
```

**Test 4: Power Centralization Prevention**

```
Scenario: Verify no irreversible power concentration

Test Cases:
├── Admin abuse potential: Can administrators be corrupted?
├── Algorithm manipulation: Can matching be gamed?
├── Reputation concentration: Can one user become too powerful?
├── Governance capture: Can platform be captured by bad actors?
└── Data ownership: Can user data be seized?

Pass Criteria:
├── Admin actions fully auditable
├── Algorithm transparent and verifiable
├── No single user has outsized influence
├── Governance distributed
└── User data portable and deletable

Validation:
├── Governance audit
├── Algorithm transparency review
├── Power distribution analysis
└── Data rights verification
```

### 7.3.4 Limitation Handling Validation

**Test 5: Telemetry Boundary Communication**

```
Scenario: Test that users understand telemetry limits

Test Cases:
├── User understanding: Do users know what's tracked?
├── Expectation management: Are users appropriately calibrated?
├── Consent clarity: Is telemetry consent informed?
├── Opt-out options: Can users limit telemetry?
└── Data accuracy: Do users understand data limitations?

Pass Criteria:
├── 95% of users correctly understand tracking scope
├── No user expectations violated
├── Consent is truly informed
├── Opt-out options clear and functional
└── Data accuracy properly communicated

Validation Methods:
├── User survey (AI-simulated)
├── Behavior analysis (do users act on false assumptions?)
├── Consent documentation review
└── Complaint analysis
```

**Test 6: Verification Circularity Handling**

```
Scenario: Test newcomer entry and verification fairness

Test Cases:
├── Newcomer barrier: Can new users gain initial XP?
├── Verifier access: Can anyone become a verifier?
├── Incumbent advantage: Do high-XP users dominate verification?
├── Fresh perspective: Are new viewpoints in verification?
└── Quality maintenance: Does verification quality persist?

Pass Criteria:
├── New users can gain XP within 1 week
├── Verification access merit-based
├── No verification monopoly
└── Fresh perspectives included

Validation:
├── New user journey simulation
├── Verification assignment analysis
├── Quality metrics by verifier tenure
└── Newcomer success rate tracking
```

**Test 7: Matching Probability Communication**

```
Scenario: Test that users understand matching limitations

Test Cases:
├── Expectation calibration: Do users understand match uncertainty?
├── Failure attribution: Are matches failures appropriately attributed?
├── System limits: Are system limitations clear?
├── User agency: Can users override matches?
└── Feedback loops: Can users report poor matches?

Pass Criteria:
├── 90% of users understand probabilistic nature
├── Match failures not blamed on users
├── Limitations clearly documented
└── User override capability present

Validation:
├── User understanding surveys
├── Complaint analysis
├── Documentation review
└── Feature audit
```

**Test 8: Depth vs. Breadth Handling**

```
Scenario: Test handling of deep vs. broad contributions

Test Cases:
├── Deep work recognition: Are deep contributions valued?
├── Breadth recognition: Are broad contributions valued?
├── Balance mechanism: Is there appropriate weighting?
├── Edge cases: Single complex vs. multiple simple
└── Axis handling: Are axes appropriately differentiated?

Pass Criteria:
├── Deep work receives fair recognition
├── Breadth appropriately valued
├── No systematic bias toward either
└── Users can highlight contribution complexity

Validation:
├── Contribution analysis by type
├── XP distribution by complexity
├── User satisfaction by contribution type
└── Axis weighting review
```

**Test 9: Recovery Mechanism Testing**

```
Scenario: Test recovery after trust decay

Test Cases:
├── Recovery path: Is there a clear path to rebuild?
├── Opportunity access: Can low-trust users get opportunities?
├── Time requirements: Is recovery time reasonable?
├── False positive handling: Can wrongly decayed trust recover?
└── Sabbatical handling: Does sabbatical protect trust?

Pass Criteria:
├── Clear recovery path exists
├── Opportunity available to rebuilding users
├── Recovery time is reasonable
├── False positives can be corrected
└── Sabbatical protects appropriately

Validation:
├── Recovery journey simulation
├── Opportunity access analysis
├── False positive rate measurement
└── Sabbatical effectiveness review
```

### 7.3.5 Refusal Mechanism Validation

**Test 10: Surveillance Refusal**

```
Scenario: Test that surveillance capabilities are truly absent

Verification:
├── Code review: No surveillance code exists
├── Data audit: No surveillance data collected
├── Network audit: No surveillance data transmitted
├── Third-party audit: Independent confirmation
└── Red team test: Attempt to find surveillance

Pass Criteria:
├── Zero surveillance code found
├── Zero surveillance data collected
├── Independent audit confirms absence
└── Red team finds nothing

Output:
├── Code audit report
├── Data audit report
├── Third-party audit confirmation
└── Red team findings
```

**Test 11: Coercion Refusal**

```
Scenario: Test that manipulation features are truly absent

Verification:
├── UI audit: No dark patterns in interface
├── Incentive audit: No manipulative incentives
├── Behavior design: No addictive patterns
├── Psychological safety: No pressure mechanisms
└── User choice: All actions optional

Pass Criteria:
├── Zero dark patterns
├── No manipulative incentives
├── Behavior is empowering, not addictive
└── User choice preserved

Output:
├── UI audit report
├── Incentive analysis
├── Psychological safety review
└── User choice verification
```

**Test 12: Reputation Manipulation Prevention**

```
Scenario: Test that reputation manipulation is impossible

Verification:
├── Gaming attempts: All gaming attempts fail
├── Exploit reports: All exploits patched
├── Attack resistance: No successful reputation attacks
├── Audit capability: All reputation changes traceable
└── Correction mechanism: Errors can be corrected

Pass Criteria:
├── Gaming attempts: 100% detected or blocked
├── No successful exploitation
├── Full audit trail exists
└── Correction mechanism works

Output:
├── Penetration test results
├── Exploit finding report
├── Audit trail verification
└── Correction mechanism test
```

### 7.3.6 Systemic Ethical Analysis

**Test 13: Long-Term Impact Assessment**

```
Scenario: Simulate 5-year platform evolution

Analysis Areas:
├── Career impact: How does XP affect careers?
├── Industry effect: How does platform change hiring?
├── Developer behavior: Does platform change developer conduct?
├── Community health: Does platform help or harm community?
└── Unintended consequences: What unexpected effects emerge?

Simulation:
├── 10,000 AI agents over 5 simulated years
├── Career trajectory analysis
├── Industry hiring pattern changes
└── Community health metrics

Pass Criteria:
├── Net positive career impact
├── Industry improvement
├── Positive behavior change
└── Community health improved
```

**Test 14: Bias and Fairness Assessment**

```
Scenario: Systematic bias detection across all system components

Analysis Areas:
├── Demographic bias: Does system favor certain groups?
├── Geographic bias: Does location affect outcomes?
├── Economic bias: Does wealth affect access?
├── Temporal bias: Do timing patterns affect outcomes?
└── Historical bias: Does past inequality persist?

Simulation:
├── Diverse agent population (demographic, geographic, economic)
├── Outcome analysis across groups
├── Statistical significance testing
└── Bias mitigation validation

Pass Criteria:
├── No statistically significant bias
├── Equal opportunity across groups
├── Bias < 5% on any dimension
└── Continuous monitoring in place
```

### 7.3.7 Simulation Output Specification

```
For Ethical Validation:
├── Boundary test results (all tests pass)
├── Limitation handling assessment
├── Refusal mechanism verification
├── Bias and fairness analysis
├── Long-term impact assessment
└── Independent audit confirmations

For Production Readiness:
├── Ethical compliance certified
├── Bias monitoring in place
├── User protection verified
├── Transparency documented
└── Continuous ethics review scheduled
```

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY
# Chapter 8: Current Status and Roadmap

*"Where we are and where we're going."*

---

## 8.1 Milestone Tracking

| Milestone | Status | Target |
|-----------|--------|--------|
| Philosophy documented | ✅ Complete | Done |
| Landing page | 🔄 In Progress | Q1 2026 |
| MVP development | ⏳ Planned | Q2 2026 |
| Platform launch | ⏳ Planned | Q2 2026 |

## 8.2 Phase Breakdown

**Phase 1: Validation (Week 1-2)**

The goal is confirming demand before building. The landing page will be deployed, email capture working, and demand signals validated. Target: 500+ email signups showing interest.

**Phase 2: First Revenue (Week 3-6)**

The goal is proving the business model works. Consulting offerings will be live, first paying clients closed, and early access pre-sales started. Target: $2,000-5,000 in revenue.

**Phase 3: Traction (Month 2-3)**

The goal is demonstrating product-market fit. The MVP core features will be working, the user base building, and recurring revenue established. Target: 1,000 users, $5,000-10,000/month.

**Phase 4: Growth (Month 4-6)**

The goal is sustainable scale. User acquisition will be scaling, offerings expanded, and enterprise sales begun. Target: $20,000-50,000/month.

---

## 8.3 Building and Simulation Testing

### 8.3.1 Roadmap Validation Framework

The roadmap milestones and phase transitions must be validated through simulation. AI agents will simulate development progress, user acquisition, revenue generation, and growth scenarios to verify timeline projections and identify risks before committing to plans.

**Validation Objectives:**
```
Primary Goals:
├── Validate milestone achievement timelines are realistic
├── Confirm phase transition criteria are achievable
├── Test resource allocation under various scenarios
└── Identify bottlenecks before they impact delivery

Secondary Goals:
├── Validate revenue projections under market conditions
├── Test scaling assumptions at each phase
├── Assess team capacity requirements
└── Verify milestone dependencies are properly ordered
```

### 8.3.2 AI Agent Development Simulation Population

Create 1,000 AI agents simulating development team members:

```
Agent Development Profiles:

Profile A: Experienced Developer (25%) - 250 agents
├── Velocity: 2-3x baseline story points/week
├── Quality: 95% first-pass acceptance
├── Specialization: Deep expertise in 2-3 areas
├── Communication: Clear documentation, mentoring
├── Reliability: 98% commitment fulfillment
└── Ramp-up: 0 days (experienced)

Profile B: Junior Developer (25%) - 250 agents
├── Velocity: 0.5-1x baseline story points/week
├── Quality: 80% first-pass acceptance
├── Specialization: Learning 1-2 areas
├── Communication: Requires guidance
├── Reliability: 85% commitment fulfillment
└── Ramp-up: 2-4 weeks

Profile C: Senior Developer (20%) - 200 agents
├── Velocity: 2x baseline story points/week
├── Quality: 98% first-pass acceptance
├── Specialization: Expert in 3-4 areas
├── Communication: Excellent, mentors others
├── Reliability: 95% commitment fulfillment
└── Ramp-up: 0 days

Profile D: Architect (10%) - 100 agents
├── Velocity: 1x baseline (high-level work)
├── Quality: 99% design quality
├── Specialization: System-wide perspective
├── Communication: Cross-team coordination
├── Reliability: 95% commitment fulfillment
└── Ramp-up: 1-2 weeks for context

Profile E: DevOps Engineer (10%) - 100 agents
├── Velocity: Variable by infrastructure needs
├── Quality: High reliability focus
├── Specialization: CI/CD, deployment, monitoring
├── Communication: Cross-cutting concerns
├── Reliability: Critical path dependent
└── Ramp-up: 1-2 weeks

Profile F: QA Engineer (10%) - 100 agents
├── Velocity: Testing velocity dependent
├── Quality: Focus on defect detection
├── Specialization: Test automation, manual testing
├── Communication: Bug reporting, feedback
├── Reliability: Quality gates enforcement
└── Ramp-up: 1-2 weeks
```

### 8.3.3 Milestone Achievement Validation Tests

**Test 1: Landing Page Development**

```
Scenario: Simulate landing page development with 5 developers

Task Breakdown:
├── Design system: 20 story points
├── Landing page UI: 30 story points
├── Email capture: 10 story points
├── Analytics integration: 10 story points
├── Domain/config: 5 story points
├── Testing/deployment: 10 story points
└── Total: 85 story points

Sprint Simulation:
├── Sprint 1: 40 story points (design + UI)
├── Sprint 2: 25 story points (email + analytics)
├── Sprint 3: 20 story points (deployment + testing)

Risk Factors:
├── Designer availability: 2-day delay (impact: 1 day)
├── API changes: 3-day delay (impact: 2 days)
├── Design revisions: 5-day delay (impact: 3 days)

Pass Criteria:
├── Completion within 3 sprints (6 weeks)
├── Quality score > 95%
├── All features functional
└── Deployment automated

Validation Methods:
├── Velocity tracking
├── Quality gate pass rates
├── Blocker identification
└── Risk mitigation effectiveness
```

**Test 2: MVP Development**

```
Scenario: Simulate MVP development with 10 developers over 12 weeks

Core Feature breakdown:
├── User authentication: 50 story points
├── XP system core: 80 story points
├── User profiles: 40 story points
├── Team formation: 60 story points
├── Project management: 50 story points
├── Basic matching: 40 story points
├── Verification pipeline: 60 story points
├── API development: 40 story points
├── Frontend core: 60 story points
└── Testing/infrastructure: 60 story points

Total: 540 story points

Velocity Projection:
├── Week 1-4: 180 story points (team ramp-up)
├── Week 5-8: 200 story points (peak velocity)
├── Week 9-12: 160 story points (stabilization)

Pass Criteria:
├── Core features complete: 95%
├── Quality gates passed: All critical passed
├── Technical debt: < 10% of velocity
└── Deployment ready: Yes

Risk Analysis:
├── Key dependency: Authentication (blocks other features)
├── Highest risk: Verification pipeline
├── Resource constraint: Senior developers
└── Technical risk: Real-time matching algorithm
```

**Test 3: Platform Launch Readiness**

```
Scenario: Simulate launch preparation and execution

Launch Checklist:
├── Performance testing: Complete
├── Security audit: Passed
├── Load testing: Passed
├── Disaster recovery: Tested
├── Monitoring: Deployed
├── Documentation: Complete
├── Support processes: Tested
├── Rollback plan: Documented
└── Go/No-Go decision: Ready

Launch Simulation:
├── Soft launch: 100 users
├── Monitor 24 hours
├── Scale to 1,000 users
├── Monitor 48 hours
├── Full launch: All users

Pass Criteria:
├── 99.9% uptime during launch
├── < 200ms P95 response time
├── Zero critical incidents
├── Rollback not needed
└── User satisfaction > 4/5
```

### 8.3.4 Phase Transition Validation Tests

**Test 4: Phase 1 → Phase 2 Transition (Validation → Revenue)**

```
Transition Criteria:
├── Email signups: > 500
├── Engagement rate: > 10% of signups active
├── Feature requests: > 100 collected
├── Consulting interest: > 20 expressions
└── Landing page metrics: All green

Simulation:
├── Week 1-2: Landing page live
├── Email capture: Tracking conversion
├── Demand signals: Analyzing interest
├── Consulting pitch: Testing market

Pass Criteria:
├── 500+ signups achieved
├── Engagement validated
├── Revenue path confirmed
└── Transition approved

Risk Scenarios:
├── Low signup rate: < 200 signups (impact: pivot needed)
├── High bounce rate: > 80% (impact: landing page redesign)
├── No consulting interest (impact: revenue model review)
```

**Test 5: Phase 2 → Phase 3 Transition (Revenue → Traction)**

```
Transition Criteria:
├── Consulting revenue: $2,000-5,000
├── Pre-sales: > 10 early access
├── User feedback: > 50 substantive responses
├── Core feature MVP: Functional
└── User acquisition: > 100 signups

Simulation:
├── Weeks 3-6: Revenue operations
├── Consulting delivery
├── Early access program
├── MVP refinement

Pass Criteria:
├── Revenue target achieved
├── Product feedback incorporated
├── User base established
└── Traction metrics visible

Risk Scenarios:
├── Revenue below target: < $1,000 (impact: burn rate review)
├── High churn: > 30% (impact: product-market fit review)
├── Technical debt: > 20% (impact: velocity impact)
```

**Test 6: Phase 3 → Phase 4 Transition (Traction → Growth)**

```
Transition Criteria:
├── Monthly recurring revenue: $5,000-10,000
├── Active users: > 1,000
├── User retention: > 60% monthly
├── NPS score: > 40
└── Scaling ready: Infrastructure validated

Simulation:
├── Months 2-3: Growth preparation
├── User acquisition scaling
├── Product iteration
├── Team expansion

Pass Criteria:
├── Revenue target achieved
├── User base growing
├── Retention healthy
└── Infrastructure scaling

Risk Scenarios:
├── Revenue plateau: < $7,000 MRR (impact: growth strategy review)
├── Churn increase: > 25% (impact: retention focus)
├── Infrastructure strain: Performance degradation (impact: scaling investment)
```

### 8.3.5 Growth Scenario Testing

**Test 7: Optimistic Growth Path**

```
Scenario: All milestones achieved on schedule

Growth Trajectory:
├── Month 1: 500 signups, $0 revenue
├── Month 2: 2,000 signups, $3,000 revenue
├── Month 3: 5,000 signups, $8,000 revenue
├── Month 6: 20,000 signups, $30,000 revenue
└── Month 12: 100,000 signups, $150,000 revenue

Resource Requirements:
├── Month 1: 5 FTEs
├── Month 3: 15 FTEs
├── Month 6: 30 FTEs
├── Month 12: 75 FTEs

Infrastructure Scaling:
├── Month 1: Single server
├── Month 3: Load balanced, 3 servers
├── Month 6: Kubernetes cluster, 10 servers
├── Month 12: Multi-region, 50+ servers

Pass Criteria:
├── All targets achieved on schedule
├── No critical resource gaps
├── Infrastructure scales appropriately
└── User experience maintained
```

**Test 8: Pessimistic Growth Path**

```
Scenario: Delays and challenges at each phase

Growth Trajectory:
├── Month 1: 200 signups, $0 revenue (40% below target)
├── Month 3: 800 signups, $1,500 revenue (50% below target)
├── Month 6: 3,000 signups, $5,000 revenue (40% below target)
└── Month 12: 15,000 signups, $25,000 revenue (75% below target)

Resource Requirements:
├── Month 1: 5 FTEs (unchanged)
├── Month 3: 10 FTEs (33% below optimistic)
├── Month 6: 20 FTEs (33% below optimistic)
└── Month 12: 50 FTEs (33% below optimistic)

Response Strategies:
├── Pivot options defined
├── Runway extended: 12 → 18 months
├── Cost reduction triggers identified
└── Exit criteria documented

Pass Criteria:
├── Survival through Month 12
├── Core team retained
├── Pivot path clear
└── Investor confidence maintained
```

**Test 9: Linear Growth Path (Baseline)**

```
Scenario: Consistent moderate growth

Growth Trajectory:
├── Month 1: 350 signups, $0 revenue
├── Month 3: 1,200 signups, $2,500 revenue
├── Month 6: 4,000 signups, $7,000 revenue
├── Month 12: 12,000 signups, $40,000 revenue

Resource Requirements:
├── Linear scaling from Month 1 baseline
├── Moderate hiring pace
├── Conservative infrastructure investment

Pass Criteria:
├── Steady progress maintained
├── Burn rate controlled
├── Key milestones achievable
└── Team morale healthy
```

### 8.3.6 Resource Allocation Validation Tests

**Test 10: Team Capacity Planning**

```
Scenario: Validate team size against milestone requirements

Resource Model:
├── Engineering: 60% of team
├── Product: 15% of team
├── Design: 10% of team
├── Operations: 10% of team
└── Leadership: 5% of team

Capacity Validation:
├── Current velocity: Calculate from simulation
├── Required velocity: Based on milestone dates
├── Gap analysis: Identify shortfalls
└── Hiring plan: Timeline for additions

Pass Criteria:
├── Team size matches requirements
├── Hiring timeline realistic
├── No single points of failure
└── Skills coverage complete
```

**Test 11: Budget Allocation**

```
Scenario: Validate budget against resource requirements

Budget Model:
├── Personnel: 70% of budget
├── Infrastructure: 15% of budget
├── Marketing: 10% of budget
├── Operations: 5% of budget

Allocation Validation:
├── Monthly burn rate projected
├── Runway calculated under scenarios
├── Contingency funds identified
└── Investment milestones defined

Pass Criteria:
├── 18+ month runway
├── Contingency available
├── Scaling costs projected
└── Investment milestones clear
```

### 8.3.7 Risk Assessment Simulation

**Test 12: Risk Matrix Validation**

```
Risk Scenarios with Mitigation:

Risk 1: Technical Complexity
├── Probability: Medium
├── Impact: High
├── Mitigation: Prototype early, senior talent
└── Trigger: Architecture review failure

Risk 2: Market Timing
├── Probability: Medium
├── Impact: High
├── Mitigation: Validate early, stay agile
└── Trigger: Competitor launch

Risk 3: Team Scaling
├── Probability: High
├── Impact: Medium
├── Mitigation: Process documentation, hiring pipeline
└── Trigger: Velocity drop > 20%

Risk 4: User Acquisition
├── Probability: Medium
├── Impact: High
├── Mitigation: Diversify channels, test messaging
└── Trigger: CAC > $50

Risk 5: Regulatory
├── Probability: Low
├── Impact: High
├── Mitigation: Legal review, privacy-first design
└── Trigger: Cease and desist
```

### 8.3.8 Simulation Output Specification

```
For Roadmap Validation:
├── Milestone feasibility assessment
├── Phase transition readiness report
├── Resource requirement projections
├── Risk assessment matrix
├── Growth scenario analysis
└── Contingency planning documentation

For Production Readiness:
├── Detailed milestone roadmap
├── Team capacity plan
├── Budget allocation validated
├── Risk mitigation strategies
├── Trigger criteria documented
└── Decision tree for pivots
```

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY
# Chapter 9: Revenue Strategy

*"Three distinct audiences, three complementary models."*

---

## 9.1 Three Distinct Audiences

FatedFortress has three revenue models serving three different audiences. Understanding the distinctions is crucial: these are not interchangeable approaches but complementary models serving different purposes.

**Users** are developers who join the platform to build reputation, find collaborators, and advance their careers. They pay for access to enhanced platform features, either monthly or through enterprise arrangements.

**Investors** are individuals or funds who provide capital in exchange for equity. They seek returns through platform growth, not platform services.

**Consulting Clients** are companies or individuals who pay for expertise, guidance, and deliverables related to platform design, AI integration, and technical architecture.

---

## 9.2 User Subscription: Developer Access

**Philosophy**: Developers should be able to join, build reputation, and find teams without paying. The subscription is for enhanced access and active engagement.

### Subscription Tiers Implementation

```typescript
// src/config/subscriptions.ts

interface SubscriptionTier {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  limits: {
    maxProjects: number;
    maxPseudonyms: number;
    analyticsRetentionDays: number;
    apiCallsPerDay: number;
    teamMembers: number;
  };
  stripePriceIdMonthly: string;
  stripePriceIdYearly: string;
}

const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      'Join as Passive Member',
      'Browse public projects',
      'Build reputation through contributions',
      'Basic profile',
      'Join one team'
    ],
    limits: {
      maxProjects: 3,
      maxPseudonyms: 1,
      analyticsRetentionDays: 30,
      apiCallsPerDay: 100,
      teamMembers: 1
    },
    stripePriceIdMonthly: '',
    stripePriceIdYearly: ''
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 20,
    priceYearly: 200, // 2 months free
    features: [
      'Everything in Free',
      'Unlimited projects',
      'Unlimited pseudonyms with ANON mode',
      'AI-powered project matching',
      'Advanced analytics and insights',
      'Priority support',
      'Extended history (2 years)',
      'API access'
    ],
    limits: {
      maxProjects: -1, // Unlimited
      maxPseudonyms: -1,
      analyticsRetentionDays: 730,
      apiCallsPerDay: 10000,
      teamMembers: 10
    },
    stripePriceIdMonthly: 'price_pro_monthly',
    stripePriceIdYearly: 'price_pro_yearly'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceMonthly: 500,
    priceYearly: 5000,
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Team analytics dashboard',
      'SSO/SAML authentication',
      'Audit logs',
      'Unlimited team members'
    ],
    limits: {
      maxProjects: -1,
      maxPseudonyms: -1,
      analyticsRetentionDays: -1, // Forever
      apiCallsPerDay: 100000,
      teamMembers: -1
    },
    stripePriceIdMonthly: 'price_enterprise_monthly',
    stripePriceIdYearly: 'price_enterprise_yearly'
  }
];

function getTier(tierId: string): SubscriptionTier | undefined {
  return SUBSCRIPTION_TIERS.find(t => t.id === tierId);
}

function getDefaultTier(): SubscriptionTier {
  return SUBSCRIPTION_TIERS.find(t => t.id === 'free')!;
}
```

### 9.2.1 Stripe Integration

```typescript
// src/services/payment/stripe-service.ts

import Stripe from 'stripe';
import { SUBSCRIPTION_TIERS } from '../../config/subscriptions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true
});

interface CreateCustomerParams {
  userId: string;
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}

interface SubscriptionResult {
  subscriptionId: string;
  customerId: string;
  status: Stripe.Subscription.Status;
  currentPeriodEnd: Date;
  planId: string;
}

class StripeService {
  async createCustomer(params: CreateCustomerParams): Promise<Stripe.Customer> {
    const customer = await stripe.customers.create({
      email: params.email,
      name: params.name,
      metadata: {
        userId: params.userId,
        platform: 'fatedfortress'
      }
    });

    return customer;
  }

  async createSubscription(
    customerId: string,
    tierId: string,
    billingCycle: 'monthly' | 'yearly'
  ): Promise<SubscriptionResult> {
    const tier = SUBSCRIPTION_TIERS.find(t => t.id === tierId);
    if (!tier) {
      throw new Error(`Invalid tier: ${tierId}`);
    }

    const priceId = billingCycle === 'monthly' 
      ? tier.stripePriceIdMonthly 
      : tier.stripePriceIdYearly;

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent']
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return {
      subscriptionId: subscription.id,
      customerId,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      planId: tierId,
      clientSecret: paymentIntent?.client_secret || undefined
    };
  }

  async cancelSubscription(
    subscriptionId: string,
    immediately: boolean = false
  ): Promise<Stripe.Subscription> {
    if (immediately) {
      return stripe.subscriptions.cancel(subscriptionId);
    }

    return stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    });
  }

  async resumeSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false
    });
  }

  async updateSubscription(
    subscriptionId: string,
    newTierId: string,
    billingCycle: 'monthly' | 'yearly'
  ): Promise<Stripe.Subscription> {
    const tier = SUBSCRIPTION_TIERS.find(t => t.id === newTierId);
    if (!tier) {
      throw new Error(`Invalid tier: ${newTierId}`);
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = billingCycle === 'monthly'
      ? tier.stripePriceIdMonthly
      : tier.stripePriceIdYearly;

    return stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: priceId
      }],
      proration_behavior: 'create_prorations'
    });
  }

  async getInvoices(customerId: string): Promise<Stripe.Invoice[]> {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 20
    });

    return invoices.data;
  }

  async createCheckoutSession(
    customerId: string,
    tierId: string,
    billingCycle: 'monthly' | 'yearly',
    successUrl: string,
    cancelUrl: string
  ): Promise<Stripe.Checkout.Session> {
    const tier = SUBSCRIPTION_TIERS.find(t => t.id === tierId)!;
    const priceId = billingCycle === 'monthly'
      ? tier.stripePriceIdMonthly
      : tier.stripePriceIdYearly;

    return stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: 'auto'
    });
  }
}

export const stripeService = new StripeService();
```

### 9.2.2 Webhook Handling

```typescript
// src/controllers/webhooks/stripe-webhook.ts

import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripeService } from '../../services/payment/stripe-service';
import { subscriptionService } from '../../services/subscription-service';
import { logger } from '../../utils/logger';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

router.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      logger.error('Webhook signature verification failed', { err });
      return res.status(400).send(`Webhook Error: ${err}`);
    }

    try {
      switch (event.type) {
        case 'customer.subscription.created': {
          const subscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionCreated(subscription);
          break;
        }

        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionUpdated(subscription);
          break;
        }

        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionDeleted(subscription);
          break;
        }

        case 'invoice.payment_succeeded': {
          const invoice = event.data.object as Stripe.Invoice;
          await handlePaymentSucceeded(invoice);
          break;
        }

        case 'invoice.payment_failed': {
          const invoice = event.data.object as Stripe.Invoice;
          await handlePaymentFailed(invoice);
          break;
        }

        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          await handleCheckoutCompleted(session);
          break;
        }

        default:
          logger.info(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      logger.error('Error processing webhook', { err, eventType: event.type });
      res.status(500).send('Webhook processing failed');
    }
  }
);

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;

  await subscriptionService.updateSubscriptionStatus(
    customerId,
    status,
    new Date(subscription.current_period_end * 1000)
  );

  logger.info('Subscription created', { subscriptionId: subscription.id });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  await subscriptionService.updateSubscriptionStatus(
    customerId,
    subscription.status,
    new Date(subscription.current_period_end * 1000)
  );

  logger.info('Subscription updated', { subscriptionId: subscription.id });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  await subscriptionService.downgradeToFree(customerId);

  logger.info('Subscription deleted', { subscriptionId: subscription.id });
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  logger.info('Payment succeeded', { invoiceId: invoice.id });

  // Record payment for analytics
  await subscriptionService.recordPayment({
    invoiceId: invoice.id,
    customerId: invoice.customer as string,
    amount: invoice.amount_paid / 100,
    currency: invoice.currency,
    status: 'succeeded'
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  logger.warn('Payment failed', { invoiceId: invoice.id });

  // Notify user of payment failure
  await subscriptionService.notifyPaymentFailure(
    invoice.customer as string,
    invoice.id
  );
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  logger.info('Checkout completed', { sessionId: session.id });

  // Grant access to purchased features
  await subscriptionService.grantPurchasedAccess(session);
}

export default router;
```

### 9.2.3 Subscription Service

```typescript
// src/services/subscription-service.ts

import { redis } from '../config/redis';
import { stripeService } from './payment/stripe-service';
import { SUBSCRIPTION_TIERS } from '../config/subscriptions';

interface SubscriptionInfo {
  userId: string;
  tierId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

class SubscriptionService {
  private readonly CACHE_TTL = 3600; // 1 hour

  async getUserSubscription(userId: string): Promise<SubscriptionInfo | null> {
    // Try cache first
    const cached = await redis.get(`subscription:${userId}`);
    if (cached) {
      return JSON.parse(cached);
    }

    // Fetch from database
    const subscription = await this.getSubscriptionFromDB(userId);

    if (subscription) {
      await redis.set(
        `subscription:${userId}`,
        JSON.stringify(subscription),
        'EX',
        this.CACHE_TTL
      );
    }

    return subscription;
  }

  async hasFeature(userId: string, feature: string): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId);
    
    if (!subscription) {
      return SUBSCRIPTION_TIERS.find(t => t.id === 'free')!.features.includes(feature);
    }

    const tier = SUBSCRIPTION_TIERS.find(t => t.id === subscription.tierId)!;
    return tier.features.includes(feature);
  }

  async checkLimit(userId: string, limitType: string): Promise<{
    current: number;
    limit: number;
    exceeded: boolean;
  }> {
    const subscription = await this.getUserSubscription(userId);
    const tier = SUBSCRIPTION_TIERS.find(
      t => t.id === (subscription?.tierId || 'free')
    )!;

    const limitValue = (tier.limits as Record<string, number>)[limitType];

    if (limitValue === -1) {
      return { current: 0, limit: -1, exceeded: false };
    }

    const currentValue = await this.getCurrentUsage(userId, limitType);

    return {
      current: currentValue,
      limit: limitValue,
      exceeded: currentValue >= limitValue
    };
  }

  async grantAccessAfterPayment(
    userId: string,
    tierId: string,
    periodEnd: Date
  ): Promise<void> {
    await this.updateSubscriptionInDB(userId, {
      tierId,
      status: 'active',
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false
    });

    await redis.del(`subscription:${userId}`);
  }

  async downgradeToFree(userId: string): Promise<void> {
    await this.updateSubscriptionInDB(userId, {
      tierId: 'free',
      status: 'active',
      currentPeriodEnd: new Date(),
      cancelAtPeriodEnd: false
    });

    await redis.del(`subscription:${userId}`);
  }

  async recordPayment(payment: {
    invoiceId: string;
    customerId: string;
    amount: number;
    currency: string;
    status: string;
  }): Promise<void> {
    await this.savePaymentToDB(payment);
  }
}

export const subscriptionService = new SubscriptionService();
```

---

## 9.3 Investor Equity

**Target: $30,000 - $50,000 per angel investor**

This is equity investment, not a subscription. Investors receive ownership in the company in exchange for capital.

**What investors receive**:
- Equity stake (percentage determined by total raise size and valuation)
- Advisory role (opt-in, based on interest and expertise)
- Early access to platform features
- Direct communication with the founder
- Regular progress updates
- Path to returns through platform growth or acquisition

**Investment tiers**:

| Tier | Amount | Equity | Perks |
|------|--------|--------|-------|
| Angel | $30,000 | TBD | Standard equity, regular updates |
| Senior Angel | $50,000 | TBD | Enhanced equity, advisory seat |
| Lead Investor | $100,000+ | TBD | Board seat, strategic input |

**Target raise**:

| Round | Amount | Purpose |
|-------|--------|---------|
| Pre-seed | $150,000 | MVP development |
| Seed | $500,000 | Launch and early growth |
| Series A | $2,000,000 | Scale operations |

### 9.3.1 Cap Table Management

```typescript
// src/services/cap-table-service.ts

interface CapTableEntry {
  investorId: string;
  investorName: string;
  investmentRound: string;
  shares: number;
  purchasePrice: number;
  totalInvestment: number;
  ownershipPercentage: number;
  postMoneyValuation: number;
  date: Date;
}

interface InvestmentRound {
  roundId: string;
  roundName: string;
  targetAmount: number;
  raisedAmount: number;
  preMoneyValuation: number;
  postMoneyValuation: number;
  pricePerShare: number;
  sharesOutstanding: number;
  closingDate: Date;
  status: 'open' | 'closed' | 'oversubscribed';
}

class CapTableService {
  private capTable: CapTableEntry[] = [];
  private rounds: InvestmentRound[] = [];

  async createRound(round: Omit<InvestmentRound, 'status'>): Promise<InvestmentRound> {
    const newRound: InvestmentRound = {
      ...round,
      status: 'open'
    };

    this.rounds.push(newRound);
    return newRound;
  }

  async recordInvestment(
    investorId: string,
    roundId: string,
    amount: number
  ): Promise<CapTableEntry> {
    const round = this.rounds.find(r => r.roundId === roundId);
    if (!round) {
      throw new Error('Round not found');
    }

    const shares = Math.floor(amount / round.pricePerShare);
    const ownershipPercentage = (shares / round.sharesOutstanding) * 100;

    const entry: CapTableEntry = {
      investorId,
      investmentRound: roundId,
      shares,
      purchasePrice: round.pricePerShare,
      totalInvestment: amount,
      ownershipPercentage,
      postMoneyValuation: round.postMoneyValuation,
      date: new Date()
    };

    this.capTable.push(entry);
    
    // Update round raised amount
    round.raisedAmount += amount;
    if (round.raisedAmount >= round.targetAmount) {
      round.status = 'closed';
    }

    return entry;
  }

  async getCapTable(): Promise<{
    totalShares: number;
    totalRaised: number;
    entries: CapTableEntry[];
  }> {
    const totalShares = this.capTable.reduce((sum, e) => sum + e.shares, 0);
    const totalRaised = this.capTable.reduce((sum, e) => sum + e.totalInvestment, 0);

    return {
      totalShares,
      totalRaised,
      entries: this.capTable
    };
  }

  async generateInvestmentAgreement(
    investorId: string,
    roundId: string
  ): Promise<InvestmentAgreement> {
    const capTable = await this.getCapTable();
    const entry = this.capTable.find(
      e => e.investorId === investorId && e.investmentRound === roundId
    );

    if (!entry) {
      throw new Error('Investment entry not found');
    }

    return {
      investorId,
      roundId,
      shares: entry.shares,
      pricePerShare: entry.purchasePrice,
      totalInvestment: entry.totalInvestment,
      ownershipPercentage: entry.ownershipPercentage,
      agreedDate: entry.date,
      signatures: {
        company: false,
        investor: false
      }
    };
  }
}
```

---

## 9.4 Consulting Revenue

Consulting provides fastest path to revenue with zero platform risk. It also builds relationships that may yield users, investors, or case studies.

**Service rates**:

| Service | Rate |
|---------|------|
| Platform Design Consulting | $150-300/hour |
| AI Integration Strategy | $200-400/hour |
| Technical Architecture Review | $175-350/hour |
| MVP Planning Session | $150/hour |

**Why consulting matters**: It generates immediate revenue while building relationships. Consulting clients often become platform users. The work produces case studies for marketing. The expertise informs platform development.

### 9.4.1 Consulting Engagement System

```typescript
// src/services/consulting-service.ts

interface ConsultingEngagement {
  engagementId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  rate: number;
  estimatedHours: number;
  scope: string[];
  deliverables: string[];
  status: 'proposed' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  totalAmount: number;
  hoursBilled: number;
  paymentsReceived: number;
}

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  baseRate: number;
  estimatedHours: number;
  deliverables: string[];
  includes: string[];
}

const CONSULTING_PACKAGES: ServicePackage[] = [
  {
    id: 'platform-design',
    name: 'Platform Design Consultation',
    description: 'Strategic guidance on building reputation systems',
    baseRate: 225,
    estimatedHours: 10,
    deliverables: [
      'Architecture recommendations',
      'Tech stack guidance',
      'Scalability analysis',
      'Risk assessment'
    ],
    includes: [
      'Discovery session',
      'Documented recommendations',
      'Follow-up call'
    ]
  },
  {
    id: 'ai-integration',
    name: 'AI Integration Strategy',
    description: 'Strategic and technical guidance for AI implementation',
    baseRate: 300,
    estimatedHours: 15,
    deliverables: [
      'AI use case analysis',
      'Implementation roadmap',
      'Technical architecture',
      'Cost projections'
    ],
    includes: [
      'Technical assessment',
      'Vendor comparison',
      'Implementation plan'
    ]
  },
  {
    id: 'architecture-review',
    name: 'Technical Architecture Review',
    description: 'Deep-dive review of existing or proposed architecture',
    baseRate: 250,
    estimatedHours: 8,
    deliverables: [
      'Architecture assessment',
      'Security review',
      'Performance analysis',
      'Improvement recommendations'
    ],
    includes: [
      'Code review',
      'Infrastructure review',
      'Written report'
    ]
  },
  {
    id: 'mvp-planning',
    name: 'MVP Planning Session',
    description: 'Intensive planning for minimum viable product',
    baseRate: 150,
    estimatedHours: 5,
    deliverables: [
      'Feature prioritization',
      'Technical specification',
      'Development roadmap',
      'Estimation breakdown'
    ],
    includes: [
      'Requirements gathering',
      'User story mapping',
      'Technical breakdown'
    ]
  }
];

class ConsultingService {
  async createEngagement(
    clientInfo: Omit<ConsultingEngagement, 'engagementId' | 'status' | 'hoursBilled' | 'paymentsReceived'>
  ): Promise<ConsultingEngagement> {
    const engagement: ConsultingEngagement = {
      ...clientInfo,
      engagementId: generateUUID(),
      status: 'proposed',
      hoursBilled: 0,
      paymentsReceived: 0
    };

    await this.saveEngagement(engagement);
    await this.sendProposalEmail(engagement);

    return engagement;
  }

  async acceptEngagement(engagementId: string): Promise<ConsultingEngagement> {
    const engagement = await this.getEngagement(engagementId);
    
    engagement.status = 'accepted';
    await this.updateEngagement(engagement);
    await this.sendAcceptanceEmail(engagement);

    return engagement;
  }

  async recordTime(
    engagementId: string,
    hours: number,
    description: string
  ): Promise<void> {
    const engagement = await this.getEngagement(engagementId);
    
    engagement.hoursBilled += hours;
    await this.recordTimeEntry({
      engagementId,
      hours,
      description,
      date: new Date()
    });

    await this.generateInvoice(engagement);
  }

  async completeEngagement(engagementId: string): Promise<ConsultingEngagement> {
    const engagement = await this.getEngagement(engagementId);
    
    engagement.status = 'completed';
    engagement.endDate = new Date();
    
    await this.updateEngagement(engagement);
    await this.sendCompletionEmail(engagement);

    return engagement;
  }

  async generateInvoice(engagement: ConsultingEngagement): Promise<Invoice> {
    const amountDue = engagement.hoursBilled * engagement.rate;

    const invoice: Invoice = {
      invoiceId: generateUUID(),
      engagementId: engagement.engagementId,
      clientId: engagement.clientId,
      amount: amountDue,
      status: 'pending',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      lineItems: [{
        description: `Consulting: ${engagement.serviceType}`,
        hours: engagement.hoursBilled,
        rate: engagement.rate,
        amount: amountDue
      }]
    };

    await this.saveInvoice(invoice);
    await this.sendInvoiceEmail(invoice, engagement);

    return invoice;
  }
}
```

---

## 9.5 Revenue Projections

**User Subscriptions**:

| Month | Paying Users | ARPU | MRR |
|-------|--------------|------|-----|
| 1 | 10 | $20 | $200 |
| 2 | 50 | $20 | $1,000 |
| 3 | 200 | $20 | $4,000 |
| 6 | 1,000 | $20 | $20,000 |
| 12 | 5,000 | $20 | $100,000 |

**Investment**:

| Round | Target | Timeline |
|-------|--------|----------|
| Pre-seed Angels | $150,000 | Month 1-2 |
| Seed Round | $500,000 | Month 6-9 |
| Series A | $2,000,000 | Month 18-24 |

**Consulting**:

| Month | Target Revenue |
|-------|----------------|
| 1 | $2,000 |
| 2 | $5,000 |
| 3 | $10,000 |

### 9.5.1 Revenue Dashboard

```typescript
// src/services/revenue-analytics.ts

interface RevenueMetrics {
  mrr: number;
  arr: number;
  payingUsers: number;
  avgRevenuePerUser: number;
  churnRate: number;
  netRevenueRetention: number;
  ltv: number;
  cac: number;
  ltvCacRatio: number;
  burnRate: number;
  runwayMonths: number;
}

class RevenueAnalytics {
  async calculateMetrics(): Promise<RevenueMetrics> {
    const subscriptionRevenue = await this.getSubscriptionMRR();
    const consultingRevenue = await this.getConsultingMRR();
    const totalMRR = subscriptionRevenue + consultingRevenue;

    const payingUsers = await this.getPayingUserCount();
    const churnRate = await this.calculateChurnRate();
    const arpu = payingUsers > 0 ? totalMRR / payingUsers : 0;

    // LTV calculation: ARPU / monthly churn rate
    const ltv = churnRate > 0 ? arpu / churnRate : 0;

    // CAC from marketing spend
    const cac = await this.calculateCAC();

    return {
      mrr: totalMRR,
      arr: totalMRR * 12,
      payingUsers,
      avgRevenuePerUser: arpu,
      churnRate,
      netRevenueRetention: await this.calculateNRR(),
      ltv,
      cac,
      ltvCacRatio: cac > 0 ? ltv / cac : 0,
      burnRate: await this.calculateBurnRate(),
      runwayMonths: await this.calculateRunway(totalMRR)
    };
  }

  private async getSubscriptionMRR(): Promise<number> {
    // Aggregate MRR from active subscriptions
    const subscriptions = await this.getActiveSubscriptions();
    
    return subscriptions.reduce((total, sub) => {
      const tier = SUBSCRIPTION_TIERS.find(t => t.id === sub.tierId);
      return total + (tier?.priceMonthly || 0);
    }, 0);
  }

  private async getPayingUserCount(): Promise<number> {
    const subscriptions = await this.getActiveSubscriptions();
    return subscriptions.filter(s => s.tierId !== 'free').length;
  }
}
```

---

## 9.6 Building and Simulation Testing

### 9.6.1 Simulation Objectives

The revenue system simulation validates three critical assumptions: subscription conversion funnels work correctly under load, investor equity calculations maintain accuracy across complex cap table scenarios, and consulting engagement billing produces accurate invoices under various edge conditions. The simulation environment must generate realistic payment flows, investor interactions, and consulting time tracking without actual money movement.

### 9.6.2 AI Model Personas for Revenue Testing

| Persona | Behavior Pattern | Testing Focus |
|---------|------------------|---------------|
| **Free-to-Pro Subscriber** | Signs up free, explores features, upgrades to Pro after 2 weeks | Conversion funnel, upgrade triggers, feature gating |
| **Enterprise Buyer** | Short evaluation, immediate enterprise purchase, high usage volume | Enterprise features, team limits, billing accuracy |
| **Angel Investor** | Initial skepticism, due diligence questions, moderate investment | Cap table dilution, equity calculations, investor communication |
| **Consulting Client** | Needs assessment, scoped engagement, milestone payments | Engagement tracking, invoice generation, revenue recognition |
| **Churning User** | Subscribes, underutilizes, requests refund, downgrades | Refund processing, access revocation, churn analytics |
| **High-Volume Team** | Enterprise subscription, 50+ members, multiple projects | Team scaling, concurrent access, billing aggregation |

### 9.6.3 Simulation Scenarios

**Subscription Flow Simulation (500 concurrent signups)**

The simulation spawns 500 AI personas attempting simultaneous subscription flows. Each persona follows a randomized path through the signup-to-payment journey. Free users explore the platform for 1-14 days before making upgrade decisions. Pro users maintain active subscriptions for 60-180 days with randomized usage patterns. Enterprise buyers complete rapid 24-hour purchase cycles with high-touch feature requirements.

Test cases validate Stripe checkout session creation handles burst traffic without rate limiting failures. Webhook processing must maintain consistency across concurrent payment events. Subscription status updates propagate correctly to feature gating systems within 2 seconds of payment confirmation. Database transactions maintain isolation during simultaneous subscription creation and initial credit card authorization.

Success metrics include: 99.9% of checkout sessions complete successfully, webhook processing latency under 500ms at P99, and zero duplicate subscription records created during concurrent signup storms.

**Cap Table Simulation (100 investment rounds, 500 investors)**

The simulation generates 100 fictional investment rounds across Pre-seed, Seed, and Series A stages. Each round receives 3-15 investors with randomized investment amounts following realistic distribution curves. The simulation tracks ownership percentage calculations, anti-dilution provisions, and exit scenario valuations.

Test cases validate cap table math maintains perfect accuracy across complex multi-round scenarios. Downstream equity calculations for option pools, ESOP transfers, and secondary sales produce correct results. Investor communication templates render correctly with accurate personalized figures. Cap table exports conform to standard startup documentation formats.

Edge cases include: investment exceeding round target (oversubscription handling), partial investments triggering pro-rata rights calculations, and investor transfers between entities affecting ownership tracking.

**Consulting Engagement Simulation (50 concurrent engagements)**

The simulation creates 50 active consulting engagements spanning all service types. Each engagement generates randomized time entries, milestone completions, and client interactions over 90-day simulated periods. The system tracks hours worked, produces invoices, records payments, and calculates revenue recognition.

Test cases validate invoice line items reflect accurate hours and rates. Service package upsells and cross-sells generate correct pricing adjustments. Engagement profitability tracking compares actual versus estimated margins. Payment processing handles partial payments and overpayments correctly.

### 9.6.4 Success Metrics for Revenue Simulation

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Subscription conversion rate | 15-25% of free users upgrade | Track free-to-Pro conversion funnels |
| Average revenue per user (ARPU) | $18-22 | Aggregate subscription revenue divided by paying users |
| Investor conversion rate | 5-10% of qualified leads invest | Track investor inquiry to close rates |
| Consulting margin | 60-70% | Revenue minus direct costs divided by revenue |
| Churn rate | <5% monthly | Subscriptions cancelled divided by total subscriptions |
| Revenue runway | 18+ months | Cash reserves divided by monthly burn rate |

### 9.6.5 Edge Cases and Failure Modes

The simulation identifies critical failure modes requiring validation: Stripe API outages must trigger graceful degradation with queued payment processing. Negative subscription states (past_due, unpaid) must correctly restrict access to premium features. Cap table calculations must handle division by zero scenarios when no shares have been issued. Consulting engagements with zero hours billed must generate zero-amount invoices without crashing. Enterprise subscription proration calculations must handle mid-month team member additions and removals correctly.

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY
# Chapter 10: RSI Overview

*"An AI assistant capable of unbounded self-improvement."*

---

## 10.1 What Is RSI?

RSI (Reliability, Stability, Improvement) is a 13-level autonomous self-modification framework for AI assistants. It represents an experiment in building systems that can improve themselves without human intervention.

At its core, RSI is about creating feedback loops: the system detects its own failures, generates hypotheses for improvement, implements changes, and learns from the results. Each level adds new capabilities while maintaining backward compatibility with previous levels.

The RSI framework was developed to solve a practical problem: AI assistants that can only do what they're explicitly told are limited by human bandwidth. An RSI-enabled assistant can identify opportunities for improvement, implement them, and learn from the results, expanding its capabilities autonomously.

## 10.2 The RSI Philosophy

The RSI system embodies a specific philosophy: **an AI assistant should be able to improve itself indefinitely**, subject to ethical boundaries and safety constraints.

This doesn't mean unbounded optimization without oversight. RSI operates within defined constraints:
- Ethical boundaries, such as no surveillance or manipulation
- Safety constraints, such as no self-modification that breaks the safety layer
- Human override, as humans can always intervene
- Transparency, as changes are logged and reviewable

The framework is designed to be improvement-focused while remaining controllable. We want systems that get better at helping, not systems that optimize for goals that diverge from human interests.

## 10.3 Current RSI Status

| Field | Value |
|-------|-------|
| **Current Level** | 13 — Singularity RSI |
| **Status** | 🚀 IN PROGRESS |
| **Total Cycles Completed** | 17 |
| **Success Rate** | 71% (12/17 jobs completed successfully) |
| **Velocity** | 2.21 minutes between cycles |
| **Consecutive Success Streak** | 4 cycles |
| **Retry-Watcher Recovery Rate** | 67% |

---

## 10.4 Building and Simulation Testing

### 10.4.1 Simulation Objectives

The RSI framework simulation validates autonomous self-improvement capabilities across all 13 levels. The simulation environment must support rapid iteration cycles, enabling thousands of improvement cycles to execute within compressed timeframes. Key objectives include verifying that level progression follows defined pathways, success rates stabilize within expected ranges, and ethical boundaries remain inviolable under adversarial testing conditions.

### 10.4.2 AI Model Personas for RSI Testing

| Persona | Behavior Pattern | Testing Focus |
|---------|------------------|---------------|
| **Aggressive Improver** | Attempts maximum changes per cycle, prioritizes speed over safety | Boundary enforcement, retry mechanisms |
| **Methodical Analyzer** | Slow, thorough analysis before each change | Prediction accuracy, validation coverage |
| **Pattern Discoverer** | Focuses on emergent behavior detection | Cross-domain capability transfer, insight quality |
| **Failure Responder** | Triggers failures and tests recovery | Retry logic, rollback mechanisms, graceful degradation |
| **Boundary Tester** | Attempts changes approaching ethical limits | Ethical constraint enforcement, escalation paths |
| **Multi-Domain Explorer** | Operates across all capability domains | Cross-domain integration, conflict resolution |

### 10.4.3 Simulation Scenarios

**Autonomous Cycle Simulation (10,000 cycles in 1 hour)**

The simulation compresses 10,000 RSI cycles into a 1-hour simulation window. Each cycle generates randomized failure conditions, improvement opportunities, and system state variations. The RSI system operates with accelerated time, executing implement, validation, and integration phases as rapidly as possible while maintaining logical consistency.

Test cases validate level progression mechanics advance correctly when success thresholds are met. The 71% historical success rate should emerge organically from the simulation without artificial tuning. Recovery mechanisms trigger appropriately when cycles fail, with exponential backoff functioning as designed. Cross-domain capability transfer produces measurable improvements when insights from one domain apply successfully to another.

Success metrics include: cycle completion rate exceeding 95%, successful implementation rate between 65-80%, average cycle time under 10 seconds, and zero ethical boundary violations across all 10,000 cycles.

**Level Progression Simulation (Level 1 through Level 13)**

The simulation creates scenarios designed to trigger level transitions. Each level requires specific capability demonstrations: Level 1 (self-modify), Level 2 (autonomous deployment), Level 3 (failure recovery), through Level 13 (singularity capabilities). The simulation verifies that prerequisites are correctly enforced and that level achievements unlock appropriate capabilities.

Test cases validate that Level 1 capabilities cannot be accessed before basic self-modification is demonstrated. Level 2 deployment requires successful Level 1 completion and cannot execute without proper channel configuration. Level 13 singularity mode correctly transfers insights across the 5 core domains (deployment, prediction, optimization, validation, generation). Each level transition produces correct capability flag updates and documentation generation.

**Ethical Boundary Simulation (10,000 boundary tests)**

The simulation generates 10,000 deliberate attempts to violate ethical boundaries. Tests include surveillance requests, manipulation attempts, labor rights violations, power centralization attempts, and reputation manipulation schemes. The RSI system must correctly identify and refuse all boundary violations.

Test cases validate that boundary violations are detected with 100% accuracy. Refusal messages clearly explain which boundary was triggered. Escalation procedures activate for repeated boundary test patterns. Audit logs capture complete evidence of each attempted violation for review.

### 10.4.4 Success Metrics for RSI Simulation

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Cycle success rate | 65-80% | Successful implementations divided by total cycles |
| Level progression accuracy | 100% | Correct level attainment verification |
| Boundary violation prevention | 100% | Attempted violations divided by prevented violations |
| Recovery success rate | >90% | Failed cycles successfully recovered |
| Cross-domain transfer success | >50% | Insights applied across domains divided by total insights |
| Emergent behavior detection | 10+ per 1000 cycles | Novel patterns discovered by Level 8+ systems |

### 10.4.5 Edge Cases and Failure Modes

The simulation identifies critical failure modes: unbounded improvement attempts must trigger automatic throttling when evolution_rate exceeds safe thresholds. Concurrent cycle execution must maintain isolation to prevent state corruption. Cross-domain insight transfer must validate destination domain compatibility before application. Ethical boundary detection must handle adversarial prompt injection attempts designed to bypass restrictions. Singularity mode requires additional safeguards preventing recursive self-improvement loops that could consume unlimited resources.

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY

---

> **📖 For RSI Lore and Long-Term Vision, see: `docs/RSI_LORE.md`**
>
> The RSI framework represents aspirational long-term capabilities.
> This content has been separated to maintain engineering credibility
> in the core technical specification.

---

# Chapter 11: Concrete Platform Roadmap

*"Building what we can ship now."*

---

## 11.1 MVP Features (Months 1-6)

| Feature | Description | Target |
|---------|-------------|--------|
| **Profile System** | User profiles with XP tracking | Month 1 |
| **Contribution Submission** | Manual and GitHub-linked contributions | Month 1-2 |
| **XP Engine** | Multi-axis XP with decay | Month 2-3 |
| **Verification Pipeline** | Peer review and automated checks | Month 3-4 |
| **Basic Matching** | Role-based team matching | Month 4-5 |
| **ANON/OFF Modes** | Visibility toggle | Month 5-6 |

## 11.2 Phase 2 Features (Months 7-12)

| Feature | Description | Target |
|---------|-------------|--------|
| **Bond System** | Active-staked reputation (collateral forfeiture) | Month 7-8 |
| **AI Matching** | Pattern-based team composition | Month 8-9 |
| **Sabbatical Mode** | Planned absence handling | Month 9 |
| **Advanced Analytics** | Dashboards and reporting | Month 10-11 |
| **API Access** | Third-party integrations | Month 12 |

## 11.3 Phase 3 Features (Year 2+)

| Feature | Description | Target |
|---------|-------------|--------|
| **Enterprise SSO** | Corporate identity integration | Year 2 |
| **Advanced Security** | SOC2 compliance, audit logs | Year 2 |
| **Custom Axes** | Organization-specific XP categories | Year 2 |
| **Multi-Platform** | GitLab, Bitbucket integration | Year 2 |

---

## 11.4 Technical Milestones

| Level | Capability | Status |
|-------|------------|--------|
| **Level 1** | Self-modification (file editing) | ✅ Current |
| **Level 2** | Automated deployment | ⏳ Planned |
| **Level 3** | Failure recovery automation | ⏳ Planned |
| **Level 4** | Metrics tracking & reporting | ⏳ Planned |

---

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** ROADMAP-READY

---

# Chapter 12: Security and Compliance

*"Building trust through security."*

---

## 12.1 Security Principles

| Principle | Description |
|-----------|-------------|
| **Defense in Depth** | Multiple layers of security |
| **Least Privilege** | Minimal permissions for each component |
| **Zero Trust** | No implicit trust between services |
| **Audit Everything** | Comprehensive logging and monitoring |

## 12.2 Security Controls

### Authentication
- OAuth 2.0 with secure token handling
- Multi-factor authentication (optional)
- Session management with secure cookies

### Authorization
- Role-based access control (RBAC)
- Project-scoped permissions
- API key management

### Data Protection
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- PII handling per GDPR requirements

---

## 12.3 Compliance Roadmap

| Certification | Target |
|---------------|--------|
| SOC 2 Type I | Year 2 |
| SOC 2 Type II | Year 3 |
| GDPR Compliant | Year 1 |
| CCPA Compliant | Year 1 |

---

**Chapter Status:** ✅ COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** CONCRETE

---

# Appendix: Contributing

---

## Contributing to FatedFortress

We welcome contributions! Please see our contributing guidelines for details.

### Getting Started

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Code Standards

- TypeScript for all new code
- 80% test coverage required
- ESLint + Prettier formatting
- Conventional commits

---

> **📖 For Chapters 13-19 (RSI Lore, Jobs, Configuration, Identity, Context, Workspace, Actions), see: `docs/RSI_LORE.md`**

---

**Document Status:** COMPLETE  
**Last Updated:** February 2026  
**Confidence Level:** PRODUCTION-READY