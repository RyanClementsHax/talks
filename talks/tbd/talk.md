# The $600K ETL: How We Cancelled a Contract by Building Less

**A Developer Meetup Talk (45 minutes)**

---

## Talk Summary

A commercial loan servicer was hemorrhaging $1M+/year on SaaS subscriptions for features they barely used. This is the story of how we saved them $600K annually by replacing a single, critical workflow—not with a better system, but with a simpler one. Along the way, we battled a disincentivized vendor, APIs that took 15 minutes to respond, and a document migration that nobody saw coming.

**Key Themes:**

- Constraint-driven design decisions
- Managing vendors who don't want you to succeed
- Local DX as a superpower
- When "good enough" is the right answer

---

## Narrative Arc

```
Setup (10 min)          → Conflict (8 min)       → Journey (17 min)      → Resolution (7 min)   → Takeaways (3 min)
"The $1M Problem"          "The Stakes"              "Building It"           "The Plot Twist"        "What You Can Steal"
```

---

## Part 1: The Setup — "The $1M Problem" (10 minutes)

### Opening Hook (2 min)
> "Raise your hand if you've ever paid for a gym membership you didn't use. Now keep your hand up if you've ever seen a company pay $50,000 a month for software features they never touched."

Start with the irony: sometimes the best software project is the one that *removes* software.

### The Client's Origin Story (3 min)

- Commercial loan servicer started scrappy, using off-the-shelf SaaS tools
- **Why this made sense:** Getting rated quickly was existential—viability depended on it
- The tools let them launch fast without building infrastructure

*Visual: Draw the "startup → scale → bloat" curve*

### The $1M Problem (3 min)

- As they scaled: subscriptions ballooned to **$1M+/year**
- They used maybe 20% of the features
- The tools didn't give them the data analysis they actually needed
- Classic enterprise trap: locked into contracts, paying for optionality they never exercise

*Quote to use:* "We were paying premium prices for a hammer when all we needed was a rock."

### The Specific Pain Point (2 min)
Introduce the Direct Certificate Holder (DCH) approval workflow:

- Servicer processes business plans and consents
- DCH (parent company) must approve within a time window
- They were using an expensive SaaS tool for this workflow
- But wait... the parent company already had an internal platform

**The insight:** This workflow didn't *need* to live in an external tool. It could be replicated in-house.

**The prize:** Cancel one contract. Save **$50K/month = $600K/year.**

---

## Part 2: The Conflict — "The Stakes" (8 minutes)

### The Deadline (2 min)

- Enterprise contracts don't forgive missed deadlines
- **4 months** to ship or eat the cost of another year
- This wasn't a "nice to have"—it was a business imperative with a hard stop

*Dramatic pause:* "Four months. Starting now."

### The Unknown Unknowns (3 min)
> "There are known knowns... and then there are the APIs you've never integrated with."

Two major risks:

1. **The SaaS provider's APIs were poorly documented**
   - We'd never integrated with them before
   - API documentation was sparse, outdated, or just wrong
   - No way to estimate effort accurately

2. **The vendor had no incentive to help us**
   - Think about it: we're calling them for help... so we can give them *less* money
   - Their engineering team's priority? Not us.

*Audience engagement:* "Who here has tried to get help from a vendor you're about to leave? Yeah."

### The Data Problem (3 min)
Before even touching code, we discovered:

- The existing workflow was a mess of data flowing between two accounts
- No clean unique identifiers in their system
- Data quality was... "creative"
- We couldn't trust what they told us about the data—we had to verify everything

*Principle introduced:* "Don't trust. Verify. Then verify again."

---

## Part 3: The Journey — "Building It" (17 minutes)

### Phase 1: Define Before You Build (4 min)

**Introduce ABDiff Framework:**

> "Projects fail when teams assume alignment. Define A, define B, ship the diff."

*Reference: bytebot.io/blog/stop-assuming-alignment-start-proving-it*

**Point A (Current State):**

- Two accounts in SaaS tool
- Servicer account → syncs data → DCH account
- DCH makes decisions → data syncs back
- Manual processes, poor visibility, expensive

**Point B (Target State):**

- Servicer account → ETL → Internal platform
- DCH makes decisions in familiar internal tools
- Data syncs back via ETL
- Cancel DCH account contract

**The Diff = The Backlog**

*Why this mattered:*

- Revealed integration points we hadn't considered
- Gave us specific questions for the vendor
- Aligned everyone on scope—no scope creep
- Created natural task breakdown

**Key decisions from the ABDiff process:**

| Decision | Rationale |
|----------|-----------|
| Low-volume ETL = simple tools | No need for Kafka, Airflow, etc. |
| Goal: cancel contract, not fix bugs | Don't add risk by changing behavior |
| Define sources of truth per data element | Handle sync failures gracefully |
| Idempotency requirements | At-least-once delivery semantics |
| Logging over metrics | Team hadn't invested in metrics yet |

*Quote:* "Don't try to solve every problem. We stayed focused."

### Phase 2: Managing the Disincentivized Vendor (4 min)

**The Communication Breakthrough:**

- Emails were going into a black hole
- We realized they used Microsoft Teams (just like our client!)
- Set up a shared Teams channel + weekly sync meeting
- Communication problems: **solved overnight**

**The "Ball in Their Court" Strategy:**

> "They had zero incentive to meet our deadline. So we made sure they were never waiting on us."

Tactics:

- Respond to requests within hours, not days
- Pre-answer questions they hadn't asked yet
- Document everything in the shared channel
- Make it obvious when delays were on their side

*Result:* When escalation conversations happened, the paper trail was clear.

**Security Early:**

- Got security team involved from day one
- Access provisioning, SFTP setup, credential exchange
- By the time engineering resources were available, we could hit the ground running

### Phase 3: Building for Reality (5 min)

**The 15-Minute API Problem:**

> "Their API took 15 minutes to respond. I wish I was joking."

This forced a decision: invest in local developer experience or lose weeks to slow iteration.

**Local DX Investment:**

```
Production:     API call → 15 min → response → process
Development:    Local file → instant → cached response → process
```

- Read test data from local files
- Cache API responses locally
- Same code path, switchable data source
- **This is still used today—not just for dev, but for production debugging**

*Industry validation:* API mocking is now considered essential for development with unreliable/slow external services. Tools like MSW, Mockoon, and WireMock exist precisely for this problem.

**Bare Bones First:**

> "Get the bones working before you add the muscle."

- Skeleton integration in test environment ASAP
- Integrated with (almost) all systems before features were complete
- Benefits:
  - Others could demo and test early
  - Engineers got real feedback on whether designs would work
  - Surfaced integration issues before they became blockers

**Design Principles That Saved Us:**

| Principle | Implementation |
|-----------|---------------|
| Data quality skepticism | Validate everything; trust nothing from third party |
| Swappable replacement | Match existing behavior exactly—easier rollback |
| Clear source of truth | Define which system owns which data |
| Observability first | Extensive logging, alerts on failures |
| Idempotent operations | Handle duplicates gracefully |

### Phase 4: The Data Reality Check (4 min)

> "We were 'told' many things about the data. Then we actually looked at it."

**The Verification Habit:**

- Check live data regularly, not just at milestone
- Edge cases nobody considered? Present.
- Things everyone swore were edge cases? Not actually present.
- Assumptions from stakeholders ≠ reality in the database

**The Launch:**

- Shipped **2 months early**
- Early production usage = early bug discovery
- Users could test real workflows while we iterated

*Transition:* "And then... the phone rang."

---

## Part 4: The Plot Twist — "The 380K Document Problem" (7 minutes)

### The Discovery (2 min)
> "Great news, we love the new system! Oh, by the way, we need our documents from the old system."

- **380,000 documents** in the legacy system
- No easy export
- No API for bulk retrieval
- The disincentivized vendor's help was required. Again.

### The Mapping Problem (2 min)

- Documents were attached to entities in the old system
- No intelligible IDs that mapped to our systems
- Had to build a separate mapping project using:
  - Addresses
  - Geo-coordinates  
  - Random property IDs
  - Fuzzy matching

*The save:* Because we had thorough ABDiff documentation, we could pull an engineer from another project. The scope was clear.

### The Performance Problem (3 min)

**Naive approach:**

- Single-threaded upload
- Estimated time: **1 week**
- We didn't have 1 week.

**First optimization:** Multi-threading

- Hit rate limits immediately
- Document service wasn't built for this scale

**The breakthrough:** S3-to-S3 copy

> "Wait. The documents are already in S3. Our service stores to S3. Why are we downloading and uploading?"

- Vendor staged documents in their S3 bucket
- Modified our service (temporarily) to use S3 copy command
- Full ingest: **hours instead of a week**

*Key insight:* This was a one-time ingest. We could cut corners on maintainability because this code would never run again.

**What we built into the ingest:**

- Full retryability (resume from any point)
- Automatic verification (validate what we ingested)
- Pierced the veil—checked S3 directly, bypassed API
- Extensive logging for debugging

*Quote:* "Ditching maintainability for a one-time script was liberating. We safely cut tons of corners."

### The Victory (30 sec)

- Documents ingested and verified **1 week early**
- Zero hitches
- Contract cancelled on schedule
- $600K/year saved

---

## Part 5: The Takeaways — "What You Can Steal" (3 minutes)

### The Principles (2 min)

**1. Define A and B Before Writing Code**

- ABDiff framework: Current state → Target state → The diff is your backlog
- Surfaces hidden work, aligns stakeholders, prevents scope creep

**2. Constraint-Driven Design**

- Low volume? Use simple tools.
- Goal is contract cancellation? Don't add features.
- One-time script? Skip the maintainability.

**3. Manage Disincentivized Vendors**

- Ball always in their court
- Over-communicate, over-document
- Get security involved early

**4. Invest in Local DX**

- Slow APIs? Mock locally.
- It's not just for development—it's for production debugging too.

**5. Trust Data You've Seen, Not Data You've Heard About**

- Verify early, verify often
- Edge cases are different than you think

**6. Bare Bones Before Bells and Whistles**

- Skeleton first, features second
- Early integration surfaces real problems

### Closing (1 min)
> "The most valuable software we shipped that year wasn't a new feature. It was the ability to delete an entire system."

Sometimes engineering excellence isn't about building more. It's about understanding exactly what you need, building exactly that, and having the discipline to stop there.

**Questions?**

---

## Speaker Notes & Timing Guide

| Section | Duration | Cumulative |
|---------|----------|------------|
| Part 1: Setup | 10 min | 10 min |
| Part 2: Conflict | 8 min | 18 min |
| Part 3: Journey | 17 min | 35 min |
| Part 4: Plot Twist | 7 min | 42 min |
| Part 5: Takeaways | 3 min | 45 min |

### Audience Engagement Points

- Opening: "Raise your hand" gym membership question
- Part 2: "Who's tried to get help from a vendor you're leaving?"
- Part 3: Pause after "15 minutes" API reveal for reaction
- Part 4: Dramatic "the phone rang" transition

### Potential Questions to Prepare For

1. "What tools did you use for the ETL?"
2. "How did you handle rollback if the migration failed?"
3. "What was the vendor's reaction when you finally cancelled?"
4. "How did you get buy-in for the local DX investment?"
5. "What would you do differently?"

### Slides Suggestion

- Minimal text, heavy on diagrams
- Architecture diagrams for before/after
- Timeline showing the 4-month journey
- Code snippets for local DX pattern (but keep brief)
- The "$600K" number featured prominently

---

## Resources to Reference

- **ABDiff Framework:** https://bytebot.io/blog/stop-assuming-alignment-start-proving-it
- **API Mocking Tools:** MSW (mswjs.io), Mockoon, WireMock
- **Industry Stats:** 38% of data migration projects run over time or budget (Bloor Research)

---

## One-Liner Summary

"We saved a company $600K/year by replacing a complex SaaS workflow with a simple ETL—and learned that the hardest part wasn't the code, it was managing a vendor who didn't want us to succeed."
