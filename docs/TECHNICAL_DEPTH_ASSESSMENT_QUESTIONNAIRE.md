# FatedFortress Onboarding Questionnaire: Technical Depth Assessment

**Document Version:** 1.0
**Purpose:** Distinguish technical depth levels for appropriate team matching
**Integration:** XP Axis initialization, Trust Gradient seeding, Team matching algorithms

---

## 1. Questionnaire Overview

### 1.1 Purpose and Philosophy

The Technical Depth Assessment serves a critical function in the FatedFortress ecosystem: it respects the expertise of deep practitioners while acknowledging that modern AI-augmented development represents a legitimate and valuable approach to software creation.

This is not a gatekeeping exercise. It is a compatibility matching system.

**The Problem We Solve:**

When a Rust veteran who understands ownership semantics and lifetime analysis is matched with a developer who primarily prompts AI for code, both parties suffer:

- **The Veteran** experiences frustration at cleaning up AI-generated code that passes tests but contains subtle memory safety issues or race conditions
- **The AI-Augmented Developer** feels gatekept by arbitrary standards that don't reflect their actual shipping capability

**The Solution:**

By identifying and respecting both profiles, we enable:

- **Veterans** to curate teams of deep practitioners who share their standards
- **AI-Augmented Developers** to find teammates who value velocity and can mentor them in deeper understanding
- **Hybrid Teams** where roles are clearly defined and expectations are aligned

### 1.2 Assessment Philosophy

**We do not measure worth. We measure fit.**

A developer who ships products through AI assistance is not "less than" a systems programmer. They are different, with different strengths, different workflows, and different team requirements.

The assessment identifies:

1. **Technical Foundation Level**: Manual coding knowledge depth
2. **AI Augmentation Preference**: Comfort with AI-generated code
3. **Quality vs. Velocity Weighting**: Where on the spectrum they fall
4. **Team Composition Preference**: Who they work best with

### 1.3 Integration with Platform Systems

**XP Axis Initialization:**

The questionnaire results seed the following XP axes:

- **Technical Depth**: Weighted higher for demonstrated manual expertise
- **Execution Velocity**: Weighted higher for shipping-focused responses
- **System Architecture**: Weighted based on architectural awareness
- **AI Utilization**: New axis measuring AI integration approach

**Trust Gradient Seeding:**

Questionnaire performance provides initial trust signals:

- High technical depth scores seed higher initial ANON trust level (0-1)
- Consistent demonstration maintains elevation
- Contradictory behavior (claiming expertise, demonstrating dependence) triggers enhanced scrutiny

**Matching Algorithm Input:**

Results influence team matching through:

- **Profile Alignment**: Veterans matched with Veterans by default
- **Hybrid Team Formation**: Explicit opt-in for mixed teams
- **Role Clarity**: Clear designation of "architect" vs. "orchestrator" roles

---

## 2. Questionnaire Structure

### 2.1 Section Overview

| Section | Questions | Focus Area | Time Estimate |
|---------|-----------|------------|---------------|
| Section 1: The Foundation | 5 | Manual coding fundamentals | 5 minutes |
| Section 2: Architecture Mindset | 4 | Systems thinking and scalability | 4 minutes |
| Section 3: Debugging Philosophy | 4 | Problem-solving approach | 4 minutes |
| Section 4: AI Collaboration | 5 | AI usage patterns and comfort | 5 minutes |
| Section 5: Team Composition | 3 | Preferences and collaboration style | 2 minutes |
| Section 6: Code Challenge | 3 | Practical skills demonstration | 10 minutes |
| **Total** | **24** | | **30 minutes** |

### 2.2 Scoring Philosophy

Each question contributes to a **Technical Depth Score (TDS)** on a 0-100 scale:

- **Questions testing manual knowledge**: Higher weight (2x multiplier)
- **Questions testing AI comfort**: Standard weight
- **Questions testing preferences**: Lower weight (0.5x multiplier)

**Score Ranges:**

| TDS Range | Designation | Description |
|-----------|-------------|-------------|
| 0-30 | Orchestrator | AI-augmented developer, prioritizes velocity |
| 31-60 | Practitioner | Balanced approach, moderate AI usage |
| 61-85 | Specialist | Deep expertise in specific domains |
| 86-100 | Veteran | Comprehensive manual expertise across domains |

---

## 3. Questionnaire Sections

### Section 1: The Foundation

**Purpose:** Assess manual coding fundamentals without AI assistance

**Philosophy:** If someone has shipped real products, they understand basics. This section distinguishes those with working knowledge from those who rely entirely on AI for syntax and structure.

---

**Question 1.1: Error Message Interpretation**

You encounter this error in a compiled language (choose based on your primary language):

**For Rust Developers:**
```
error[E0502]: cannot borrow `counter` as immutable because it is also borrowed as mutable
```

**For Ruby/Python Developers:**
```
TypeError: 'int' object is not iterable
```

**For C/C++ Developers:**
```
 Segmentation fault (core dumped)
```

What is your first action?

- [ ] A. Copy the error into the AI assistant and ask "fix this"
- [ ] B. Read the error message carefully to understand which line and variable is involved
- [ ] C. Set a breakpoint or add debug output to trace the variable state before the error
- [ ] D. Check the language documentation for common causes of this error type

**Scoring:**
- A: 0 points (pure AI reliance)
- B: 5 points (basic error reading)
- C: 10 points (systematic debugging)
- D: 3 points (documentation reliance)

**Explanation:** The ideal response combines B and C—reading the error for information, then tracing the state. Pure documentation lookup (D) suggests limited hands-on experience with this error type.

---

**Question 1.2: Memory Management Understanding**

In a language of your choice, explain briefly: what happens to memory when a variable goes out of scope?

**Response Options:**

- [ ] A. "The language handles it automatically" (Go to 3 points)
- [ ] B. "The memory is freed/deallocated, preventing leaks" (Go to 5 points)
- [ ] C. "Describe the specific mechanism: stack pop, reference counting, garbage collection trigger, etc." (Go to 10 points)
- [ ] D. "I'm not sure, I usually don't worry about it" (0 points)

**Scoring:**
- A: 3 points (basic awareness)
- B: 5 points (correct understanding)
- C: 10 points (detailed mechanism knowledge)
- D: 0 points

**Explanation:** The distinction between A and B is awareness vs. understanding. C demonstrates deep knowledge of specific mechanisms, characteristic of systems programmers.

---

**Question 1.3: Type System Familiarity**

Which best describes your approach to type systems?

- [ ] A. "I let the AI choose the appropriate types based on the context"
- [ ] B. "I define types explicitly to make my intentions clear and catch errors at compile time"
- [ ] C. "I rely on dynamic typing for flexibility and speed"
- [ ] D. "I use TypeScript/Rust/etc. because the compiler catches mistakes I would miss"

**Scoring:**
- A: 0 points (AI-dependent)
- B: 10 points (explicit type discipline)
- C: 3 points (preference, not necessarily weakness)
- D: 7 points (compiler-assisted discipline)

**Explanation:** B demonstrates active type design thinking. D shows appreciation for type safety without mandating explicit discipline. A shows dependency on AI for what should be a design decision.

---

**Question 1.4: Version Control Confidence**

You need to revert a commit that broke production. What git command do you use first?

- [ ] A. "git revert [commit-hash]"
- [ ] B. "git reset --hard [commit-hash]"
- [ ] C. "git checkout [commit-hash]"
- [ ] D. Ask AI or look it up

**Scoring:**
- A: 7 points (correct production-safe approach)
- B: 5 points (works but destructive)
- C: 3 points (detached HEAD, not a fix)
- D: 0 points (no git fluency)

**Explanation:** git revert is the production-safe answer that preserves history. git reset is acceptable in certain contexts but risks losing work. The question tests whether the developer understands the difference between these operations.

---

**Question 1.5: Testing Philosophy**

When do you write tests for your code?

- [ ] A. "I write tests if the AI generates them, otherwise I ship"
- [ ] B. "I write tests for critical paths and user-facing features"
- [ ] C. "I follow TDD: Red, Green, Refactor"
- [ ] D. "I test thoroughly: unit tests, integration tests, and edge cases"

**Scoring:**
- A: 0 points (no testing discipline)
- B: 5 points (reasonable pragmatic approach)
- C: 7 points (methodological discipline)
- D: 10 points (comprehensive testing philosophy)

**Explanation:** All non-A answers demonstrate testing awareness. The distinction is between pragmatic testing (B), disciplined testing (C), and comprehensive testing (D).

---

### Section 2: Architecture Mindset

**Purpose:** Assess systems thinking and long-term code health awareness

---

**Question 2.1: Technical Debt Orientation**

A feature needs to be shipped in 4 hours. The "clean" implementation will take 8 hours. The "quick" implementation will work but introduces technical debt.

What do you do?

- [ ] A. Ship the quick version and create a ticket to address it later
- [ ] B. Ship the clean version and explain to stakeholders why it took longer
- [ ] C. Ship the quick version and hope no one notices the debt
- [ ] D. Negotiate for more time to do it right

**Scoring:**
- A: 5 points (pragmatic, documented debt)
- B: 10 points (quality-first, stakeholder communication)
- C: 0 points (irresponsible debt)
- D: 7 points (negotiation approach)

**Explanation:** B represents ideal behavior but assumes stakeholder rapport. A represents responsible pragmatism. D shows stakeholder management skill.

---

**Question 2.2: Scalability Consideration**

You're building an API endpoint. At what point do you think about database indexing?

- [ ] A. "When the AI suggests it based on query patterns"
- [ ] B. "When I notice slow queries during testing"
- [ ] C. "During initial design, before writing the endpoint"
- [ ] D. "When users complain about performance"

**Scoring:**
- A: 0 points (AI-dependent)
- B: 3 points (reactive optimization)
- C: 10 points (proactive architecture)
- D: 2 points (complaint-driven)

**Explanation:** C demonstrates architectural thinking—considering performance implications before implementation.

---

**Question 2.3: Security Mindset**

Which concern is highest priority when writing user-facing code?

- [ ] A. Making the feature intuitive and easy to use
- [ ] B. Ensuring the code doesn't have obvious bugs
- [ ] C. Preventing security vulnerabilities (SQL injection, XSS, authentication flaws)
- [ ] D. Optimizing for performance

**Scoring:**
- A: 3 points (UX focus)
- B: 5 points (quality focus)
- C: 10 points (security-first mindset)
- D: 3 points (performance focus)

**Explanation:** Security awareness is a fundamental baseline for systems developers. The question tests whether security is top-of-mind or an afterthought.

---

**Question 2.4: API Design Philosophy**

When designing an API endpoint, what is your primary consideration?

- [ ] A. Making it easy to implement quickly
- [ ] B. Following REST/GraphQL best practices consistently
- [ ] C. Considering the consumer's perspective and developer experience
- [ ] D. Minimizing the number of endpoints

**Scoring:**
- A: 2 points (implementation-first)
- B: 7 points (architectural consistency)
- C: 10 points (consumer-centric design)
- D: 3 points (simplicity over completeness)

**Explanation:** C represents mature API design—considering how the API will be used by developers who consume it.

---

### Section 3: Debugging Philosophy

**Purpose:** Assess problem-solving approach and systematic debugging skills

---

**Question 3.1: Bug Investigation Approach**

A feature that "should work" isn't working. The AI says the code is correct. What do you do?

- [ ] A. Trust the AI and look for issues elsewhere
- [ ] B. Add console.log/print statements to trace execution
- [ ] C. Use a debugger to step through the code line by line
- [ ] D. Rewrite the feature from scratch

**Scoring:**
- A: 0 points (AI deference)
- B: 5 points (basic debugging)
- C: 10 points (systematic debugging)
- D: 2 points (nuclear option)

**Explanation:** C represents the ideal debugging approach—using tools to understand execution flow rather than relying on AI assessments or shooting from the hip.

---

**Question 3.2: Reproduction Case Development**

When debugging a reported bug, what do you do first?

- [ ] A. Ask the AI how to fix the bug
- [ ] B. Try to reproduce the bug in a minimal test case
- [ ] C. Look at the error logs
- [ ] D. Ask the reporter for more details

**Scoring:**
- A: 0 points (AI deference)
- B: 10 points (systematic debugging methodology)
- C: 5 points (log analysis)
- D: 3 points (investigation)

**Explanation:** Creating a reproduction case is the gold standard of debugging—it isolates the issue and provides a test environment for the fix.

---

**Question 3.3: Third-Party Code Debugging**

An integration with a third-party library is failing. The library code is opaque and undocumented. What do you do?

- [ ] A. Ask the AI to explain the library's behavior
- [ ] B. Add extensive logging to understand the execution path
- [ ] C. Read the library's source code directly
- [ ] D. Find an alternative library

**Scoring:**
- A: 2 points (AI assistance)
- B: 7 points (logging approach)
- C: 10 points (direct source analysis)
- D: 3 points (escape strategy)

**Explanation:** C demonstrates comfort with reading raw code—the fundamental skill of a systems developer.

---

**Question 3.4: Performance Debugging**

An API endpoint is slow. Where do you start?

- [ ] A. Ask the AI how to optimize it
- [ ] B. Check the database queries for missing indexes
- [ ] C. Profile the code to identify the bottleneck
- [ ] D. Add caching everywhere

**Scoring:**
- A: 0 points (AI deference)
- B: 5 points (common issue)
- C: 10 points (systematic optimization)
- D: 1 point (shotgun approach)

**Explanation:** C represents the correct performance debugging methodology—measure before optimizing.

---

### Section 4: AI Collaboration

**Purpose:** Assess relationship with AI assistance tools

---

**Question 4.1: AI Trust Level**

When the AI generates code, how often do you verify it works before committing?

- [ ] A. I trust it and commit directly
- [ ] B. I test the happy path
- [ ] C. I test edge cases and error conditions
- [ ] D. I manually review every line before committing

**Scoring:**
- A: 0 points (unconditional trust)
- B: 3 points (basic verification)
- C: 7 points (thorough verification)
- D: 10 points (manual review discipline)

**Explanation:** The scale represents increasing rigor in AI output verification. B-D all demonstrate appropriate caution; D represents the veteran approach of manual review.

---

**Question 4.2: AI Output Critique**

The AI just generated a solution that works but uses an approach you wouldn't have chosen. Do you:

- [ ] A. Accept it if it works
- [ ] B. Refactor it to match your standards
- [ ] C. Ask the AI to regenerate with different constraints
- [ ] D. Accept it but add comments explaining the approach

**Scoring:**
- A: 2 points (acceptance)
- B: 10 points (refactoring discipline)
- C: 5 points (regeneration attempt)
- D: 7 points (documentation approach)

**Explanation:** B demonstrates active code ownership—ensuring the codebase reflects the developer's standards, not the AI's preferences.

---

**Question 4.3: AI Limitations Recognition**

Which type of problem is AI LEAST capable of solving correctly?

- [ ] A. Standard CRUD operations
- [ ] B. Novel architectural decisions requiring domain knowledge
- [ ] C. Debugging complex race conditions
- [ ] D. Writing boilerplate code

**Scoring:**
- A: 0 points (AI handles this well)
- B: 7 points (domain-specific nuance)
- C: 10 points (hardest category for AI)
- D: 0 points (AI handles this well)

**Explanation:** C represents the hardest category—race conditions require understanding subtle timing and state interactions that AI frequently gets wrong.

---

**Question 4.4: AI Learning Orientation**

When the AI makes a mistake, what do you do?

- [ ] A. Ignore it and move on
- [ ] B. Correct the code and continue
- [ ] C. Study why it made the mistake to avoid similar issues
- [ ] D. Report it to the AI platform

**Scoring:**
- A: 0 points (no learning)
- B: 5 points (correction without reflection)
- C: 10 points (learning orientation)
- D: 2 points (feedback submission)

**Explanation:** C represents the learning mindset—using AI mistakes as opportunities to deepen understanding.

---

**Question 4.5: AI Workflow Integration**

What percentage of your coding time involves directly typing code vs. reviewing/AI-generated code?

- [ ] A. 100% direct typing, 0% AI
- [ ] B. 70% direct, 30% AI review
- [ ] C. 50% direct, 50% AI review
- [ ] D. 30% direct, 70% AI review
- [ ] E. 0% direct, 100% AI review

**Scoring:**
- A: 10 points (pure manual)
- B: 8 points (AI-assisted)
- C: 5 points (balanced)
- D: 2 points (AI-dependent)
- E: 0 points (AI-dependent)

**Explanation:** This is self-assessment data. The platform doesn't penalize AI usage but needs to understand team composition implications.

---

### Section 5: Team Composition Preferences

**Purpose:** Understand collaboration style and matching preferences

---

**Question 5.1: Team Profile Preference**

Who do you prefer to work with?

- [ ] A. Other AI-augmented developers—we ship fast together
- [ ] B. A mix of approaches—varied perspectives are valuable
- [ ] C. Deep technical experts who can mentor me
- [ ] D. Deep technical experts who share my standards

**Scoring:**
- A: 0 points (Orchestrator preference)
- B: 5 points (Versatile preference)
- C: 7 points (Learning orientation)
- D: 10 points (Veteran preference)

**Explanation:** D explicitly identifies the "Rust/Ruby veteran" who wants to curate teams of equals.

---

**Question 5.2: Role Preference**

In a team project, what role do you naturally gravitate toward?

- [ ] A. Product/Feature Owner—defining what to build
- [ ] B. Architect—designing how it works
- [ ] C. Implementer—building the features
- [ ] D. DevOps/Infra—keeping systems running

**Scoring:**
- A: 5 points (product orientation)
- B: 10 points (architectural orientation)
- C: 7 points (implementation orientation)
- D: 7 points (infrastructure orientation)

**Explanation:** B identifies the architect mindset—the "curator" role that wants to design systems properly.

---

**Question 5.3: Communication Preference**

How do you prefer to resolve technical disagreements?

- [ ] A. Let the most senior person decide
- [ ] B. Prototype both approaches and measure
- [ ] C. Debate until consensus
- [ ] D. Defer to the person who will implement it

**Scoring:**
- A: 3 points (hierarchy deference)
- B: 10 points (empirical resolution)
- C: 5 points (consensus building)
- D: 5 points (implementation ownership)

**Explanation:** B represents the engineering ideal—letting data resolve disagreements rather than politics or seniority.

---

### Section 6: Code Challenge

**Purpose:** Practical demonstration of debugging and analysis skills

**Instructions:** Review the following code snippets. Identify any bugs, issues, or areas of concern. This is not about whether the code "works"—it's about whether you can see what the code might be doing wrong.

---

**Challenge 6.1: Race Condition Detection**

**Language:** JavaScript/Node.js

```javascript
async function processPayment(userId, amount) {
    const user = await db.users.findOne({ id: userId });

    if (user.balance >= amount) {
        // AI generated this delay to simulate processing
        await new Promise(r => setTimeout(r, 100));

        await db.users.update(
            { id: userId },
            { $inc: { balance: -amount } }
        );

        await db.orders.create({ userId, amount, status: 'completed' });
        return { success: true };
    } else {
        return { success: false, reason: 'Insufficient funds' };
    }
}
```

**Question:** What is wrong with this code, and how would you fix it?

**Scoring Rubric:**

| Response | Points |
|----------|--------|
| Identifies race condition (concurrent requests can both pass balance check) | 15 points |
| Suggests database transaction or row-level locking | 10 points |
| Mentions idempotency or request deduplication | 5 points |
| Says "it looks fine" or only suggests error handling | 0 points |

**Explanation:** This is the classic "check-then-act" race condition. Two concurrent requests can both see sufficient balance, both pass the check, and both deduct funds, resulting in overspending.

---

**Challenge 6.2: Memory Safety Issue**

**Language:** Rust

```rust
fn main() {
    let mut values = vec![1, 2, 3];
    let first = values[0];

    values.push(4);

    println!("First value: {}", first);
}
```

**Question:** Will this code compile and run? If so, what does it print? If not, why?

**Scoring Rubric:**

| Response | Points |
|----------|--------|
| Identifies that Rust's Vec may reallocate on push, invalidating the reference | 15 points |
| Understands Rust ownership rules | 10 points |
| Knows this will panic (in debug) or succeed (in release with specific conditions) | 5 points |
| Says it will always work fine | 0 points |

**Explanation:** This is a trick question. In Rust, `values[0]` creates a copy of the integer (Copy trait), not a reference. The code will compile and print "First value: 1". However, if it were a non-Copy type like a String, it would fail to compile because moving `values` would invalidate the reference.

---

**Challenge 6.3: SQL Injection Vulnerability**

**Language:** Python with SQLite

```python
def get_user_by_name(username):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return db.execute(query).fetchone()
```

**Question:** What is wrong with this code, and why is it dangerous?

**Scoring Rubric:**

| Response | Points |
|----------|--------|
| Identifies SQL injection vulnerability | 10 points |
| Explains how an attacker could exploit it (input like "'; DROP TABLE users; --") | 10 points |
| Suggests parameterized queries as the fix | 5 points |
| Says "it looks fine" or doesn't identify the issue | 0 points |

**Explanation:** This is the canonical SQL injection vulnerability. String interpolation into SQL queries allows attackers to manipulate query structure.

---

## 4. Scoring and Profile Generation

### 4.1 Technical Depth Score Calculation

**Formula:**

```
TDS = (Foundation_Section × 2) + (Architecture_Section × 1.5) +
      (Debugging_Section × 1.5) + (AI_Collaboration_Section × 1) +
      (Team_Preference_Section × 0.5) + (Code_Challenge × 2)
```

**Normalization:**

Raw scores are normalized to a 0-100 scale for profile generation.

### 4.2 Profile Generation

**Profile Components:**

1. **Technical Depth Score**: 0-100
2. **AI Augmentation Index**: 0-100 (based on Section 4 responses)
3. **Quality-Velocity Weighting**: 0-100 (quality-first to velocity-first)
4. **Team Composition Preference**: Categorical (Orchestrator, Practitioner, Specialist, Veteran)
5. **Role Orientation**: Categorical (Architect, Implementer, Product, DevOps)

**Example Profiles:**

**Profile A: The Veteran**
```
TDS: 87
AI Index: 25 (low AI reliance)
Quality-Velocity: 95 (strongly quality-first)
Preference: Veteran
Role: Architect
Matching Priority: Other Veterans
```

**Profile B: The Orchestrator**
```
TDS: 32
AI Index: 80 (high AI reliance)
Quality-Velocity: 35 (velocity-first)
Preference: Orchestrator
Role: Product
Matching Priority: Other Orchestrators or Mentorship pairing
```

**Profile C: The Hybrid**
```
TDS: 68
AI Index: 55 (balanced usage)
Quality-Velocity: 55 (balanced)
Preference: Practitioner
Role: Implementer
Matching Priority: Flexible, with role clarity
```

### 4.3 Trust Gradient Seeding

**Initial Trust Assignment:**

| TDS Range | Initial ANON Trust Level | Scrutiny Level |
|-----------|-------------------------|----------------|
| 0-30 | 0 | Standard |
| 31-60 | 0 | Standard |
| 61-85 | 1 | Enhanced (demonstrated expertise) |
| 86-100 | 1 | Moderate (veteran status) |

**Trust Level Progression:**

Veterans with TDS 86+ who consistently demonstrate high-quality contributions may progress to ANON-2 status faster than others due to demonstrated expertise.

---

## 5. Integration with Matching System

### 5.1 Matching Algorithm Input

The questionnaire results feed into matching through:

**Default Matching:**

- Veterans (TDS 86+) matched with Veterans by default
- Orchestrators (TDS 0-30) matched with Orchestrators by default
- Practitioners (TDS 31-85) matched with similar profiles

**Hybrid Team Formation:**

Hybrid teams require explicit opt-in from all members. The questionnaire identifies:

- Who is open to hybrid teams
- What roles hybrid members prefer (architect vs. implementer)
- What expectations hybrid members have for teammates

**Role Clarity:**

On hybrid teams, roles are clearly designated:

- **Architect**: Makes design decisions, reviews critical code, ensures system integrity
- **Implementer**: Builds features within architectural boundaries, respects architect decisions
- **Orchestrator**: Defines scope, coordinates execution, defers technical decisions to specialists

### 5.2 Team Formation Protocols

**Same-Profile Teams:**

When two Veterans match:
- Both receive notification of team composition
- Both see team member profiles (respecting visibility mode)
- Both confirm participation
- Team operates with shared quality standards

**Hybrid Teams:**

When an Architect and Orchestrator match:
- Architect receives Orchestrator profile with explicit role designation
- Orchestrator receives Architect profile with explicit role designation
- Both must explicitly consent to role assignment
- Conflict resolution protocols available if roles are disputed

---

## 6. Privacy and Data Use

### 6.1 Questionnaire Data Storage

**Storage:**

- Questionnaire responses stored encrypted
- Only aggregate insights used for matching
- Individual responses not visible to other users
- Users can delete questionnaire data (affects matching quality)

**Data Retention:**

- Responses retained while account is active
- Soft delete available (data hidden, not destroyed)
- Hard delete available on request (data permanently removed)

### 6.2 Visibility Interaction

**ANON Mode:**

- Questionnaire results affect matching regardless of visibility
- Other users cannot see questionnaire responses
- Other users can see team member designation (Architect/Implementer/etc.)
- Designation is coarse-grained (no TDS scores visible)

**OFF Mode:**

- Same visibility rules apply
- Real name visible, questionnaire results still private

---

## 7. Continuous Assessment

### 7.1 Ongoing Validation

The initial questionnaire is validated through:

**Behavioral Correlation:**

- Do high-TDS users demonstrate lower bug rates?
- Do low-TDS users demonstrate higher velocity?
- Do team compositions correlate with project success?

**Question Refinement:**

Questions that don't predict behavior are removed or modified. Questions that strongly predict success are weighted higher.

### 7.2 Re-Assessment Option

**Voluntary Re-Assessment:**

Users may retake the questionnaire if:
- They believe their skills have changed significantly
- They disagree with their initial profile
- They want to update their AI usage patterns

**Involuntary Re-Assessment:**

The system may flag users for re-assessment if:
- Behavioral telemetry contradicts questionnaire responses
- Team feedback suggests significant capability mismatch
- Repeated performance issues suggest overestimation

---

## 8. Glossary

| Term | Definition |
|------|------------|
| Technical Depth Score (TDS) | Numerical score (0-100) representing manual coding expertise |
| AI Augmentation Index | Score representing reliance on AI assistance |
| Quality-Velocity Weighting | Preference indicator between code quality and shipping speed |
| Orchestrator | Developer with TDS 0-30, prioritizes velocity and AI augmentation |
| Practitioner | Developer with TDS 31-85, balanced approach |
| Veteran | Developer with TDS 86-100, deep manual expertise |
| Architect | Role focused on system design and code quality |
| Implementer | Role focused on feature development within architectural boundaries |
| Hybrid Team | Team with mixed profiles (Veterans + Orchestrators) |
| Same-Profile Team | Team with similar profiles (all Veterans or all Orchestrators) |

---

## 9. Appendix: Question Rationale Matrix

| Question | Tests For | Why It Matters |
|----------|-----------|----------------|
| 1.1 Error Messages | Basic debugging awareness | Demonstrates hands-on experience |
| 1.2 Memory Management | Systems knowledge | Separates systems programmers from abstraction users |
| 1.3 Type Systems | Design discipline | Tests proactive vs. reactive coding |
| 1.4 Git Commands | Version control fluency | Essential collaboration skill |
| 1.5 Testing Philosophy | Quality orientation | Predicts code quality |
| 2.1 Technical Debt | Pragmatism vs. perfectionism | Team compatibility factor |
| 2.2 Scalability | Proactive architecture | Long-term codebase health |
| 2.3 Security | Security awareness | Baseline for safety-critical code |
| 2.4 API Design | Consumer-centric thinking | Team collaboration quality |
| 3.1-3.4 Debugging | Problem-solving methodology | Bug fix capability |
| 4.1-4.5 AI Usage | AI relationship | Team dynamic compatibility |
| 5.1-5.3 Preferences | Collaboration style | Team formation compatibility |
| 6.1-6.3 Code Challenge | Practical skills demonstration | Objective capability validation |

---

## 10. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | February 2026 | Platform Architecture | Initial specification |

---

**End of Document**

This questionnaire enables the FatedFortress platform to respect veteran expertise while acknowledging that AI-augmented development represents a legitimate and valuable approach. The key is matching—Veterans with Veterans, Orchestrators with Orchestrators, and clear role definitions for hybrid teams.
