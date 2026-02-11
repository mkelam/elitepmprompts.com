# SAFe PI Planning Copilot — Agentic Blueprint

**ElitePMPrompts.com | Methodology: SAFe 6.0 | Blueprint Version: 1.0**

---

**What this blueprint does:** Guides you through a complete PI Planning session in 7 structured steps, producing every major artifact a Release Train Engineer or Scrum Master needs. Each step builds on the previous step's output.

**Total estimated time:** 60–90 minutes
**AI platforms:** Works with Claude (Projects), ChatGPT (GPTs/Canvas), Gemini, or any LLM
**Artifacts produced:** Team context brief, feature breakdown, capacity allocation matrix, program-level dependency map, ROAM risk register, team PI Objectives with business value, confidence vote summary

---

## BEFORE YOU START

### Required Inputs

Gather this information before running the blueprint. The quality of your outputs depends directly on the quality of these inputs.

| Input | Description | Format |
|-------|-------------|--------|
| **Team roster** | Names, roles, and availability for the PI (10–12 weeks) | List or table |
| **Historical velocity** | Average story points per sprint for the last 2–3 PIs | Number per team |
| **Product backlog** | Top 20–40 features/epics prioritized by Product Management | List with brief descriptions |
| **Strategic themes** | Current portfolio-level strategic themes from Lean Portfolio Management | 2–5 themes with descriptions |
| **Known dependencies** | Any pre-identified cross-team or external dependencies | List |
| **PI cadence** | Number of sprints in PI, sprint length, IP sprint (yes/no) | e.g., "5 sprints x 2 weeks + 1 IP sprint" |

---

## STEP 0: Context Primer

**Purpose:** Load the AI with SAFe methodology context and your specific organizational setup. Run this ONCE at the start of your session.

**Time:** 5 minutes

### Prompt

```
You are a SAFe 6.0 Release Train Engineer facilitating a PI Planning session. You have deep expertise in:
- SAFe PI Planning ceremonies, including pre-planning, day 1 (vision + team breakouts), and day 2 (plan review + confidence vote)
- Program Board construction with feature placement, dependencies, and milestones
- ROAM risk categorization (Resolved, Owned, Accepted, Mitigated)
- Team PI Objective writing with business value scoring (1–10 scale)
- Capacity allocation using normalized story point velocity

ORGANIZATIONAL CONTEXT:
[Paste your team roster, PI cadence, and strategic themes here]

SESSION RULES:
1. All outputs must conform to SAFe 6.0 artifact standards
2. Use tables and structured formats — never narrative paragraphs for artifacts
3. Flag any assumption you make about my organization with "[ASSUMPTION]" so I can verify
4. When you reference SAFe practices, use the correct SAFe terminology (e.g., "PI Objective" not "sprint goal," "Feature" not "user story" at the program level)
5. After each step, summarize what was produced and what I should verify before proceeding

Confirm you understand this context and are ready to begin Step 1.
```

### Expected Output
The AI confirms it has loaded the context, summarizes your team setup, and asks for any clarifications before proceeding.

---

## STEP 1: Team Context & Capacity Calculation

**Purpose:** Establish the quantitative foundation for planning. Calculate available capacity per team for the upcoming PI.

**Time:** 10 minutes

### Prompt

```
STEP 1: CAPACITY CALCULATION

Using the organizational context I provided, calculate the available capacity for each team in this PI.

INPUT DATA:
- Historical velocity: [paste average story points per sprint per team]
- PI structure: [e.g., "5 development sprints + 1 IP sprint"]
- Known absences/holidays: [list any known unavailability]
- Capacity allocation guidance: Reserve 20% for maintenance/support unless I specify otherwise

PRODUCE THIS ARTIFACT:

### PI Capacity Allocation Matrix

| Team | Avg Velocity/Sprint | # Dev Sprints | Gross Capacity (SP) | Maintenance Reserve (%) | Net Capacity (SP) | Confidence Notes |
|------|---------------------|---------------|---------------------|--------------------------|-------------------|-----------------|

THEN produce:
- Total ART capacity across all teams
- Any [ASSUMPTION] flags about data I didn't provide
- Recommended capacity buffer percentage based on team maturity (5% for mature teams, 10–15% for newer teams)

Do not proceed beyond this step. Wait for my verification.
```

### Checkpoint ✓

Before proceeding to Step 2, verify:
- [ ] Velocity numbers match your actual data (AI may estimate if data was vague)
- [ ] Maintenance reserve percentage reflects your organization's reality
- [ ] Total net capacity feels right based on your experience
- [ ] Any [ASSUMPTION] flags have been confirmed or corrected

**If capacity is wrong:** Correct the data and ask the AI to recalculate. Do not proceed with incorrect capacity numbers — every subsequent step depends on this.

---

## STEP 2: Feature Decomposition & Prioritization

**Purpose:** Break the product backlog into PI-sized features with acceptance criteria, map to strategic themes, and establish priority order.

**Time:** 15 minutes

### Prompt

```
STEP 2: FEATURE DECOMPOSITION

Using the capacity of [X total net story points] established in Step 1, decompose and prioritize the following product backlog for this PI.

PRODUCT BACKLOG:
[Paste your top 20–40 features/epics here]

STRATEGIC THEMES:
[Paste from Step 0 context or re-state here]

PRODUCE THESE ARTIFACTS:

### Artifact 2A: Feature Breakdown Table

| Feature ID | Feature Name | Description | Strategic Theme Alignment | Estimated Size (SP) | Priority (WSJF Score) | Target Team(s) | Dependencies (if known) |
|------------|-------------|-------------|---------------------------|---------------------|-----------------------|-----------------|------------------------|

WSJF Scoring: For each feature, estimate:
- Cost of Delay = User/Business Value + Time Criticality + Risk Reduction/Opportunity Enablement (each 1–10)
- Job Duration = Estimated Size relative to other features (1–10)
- WSJF = Cost of Delay ÷ Job Duration

### Artifact 2B: Capacity vs. Demand Summary

| Metric | Value |
|--------|-------|
| Total feature demand (SP) | |
| Total net capacity (SP) | |
| Overcommitment ratio | |
| Recommended cut line (feature ID) | |

Flag any features that:
- Exceed 50% of a single team's capacity (should be split)
- Have no clear strategic theme alignment (candidate for deprioritization)
- Create circular dependencies

Do not proceed beyond this step. Wait for my verification.
```

### Checkpoint ✓

Before proceeding to Step 3, verify:
- [ ] WSJF scores reflect actual business priorities (adjust if Product Management disagrees)
- [ ] Feature sizes are reasonable (challenge any estimate that seems too high or low)
- [ ] The cut line makes sense — features below it won't fit in this PI
- [ ] No critical features are missing from the list
- [ ] Features flagged as "too large" have been acknowledged (split them or accept the risk)

---

## STEP 3: Team Backlog Allocation

**Purpose:** Assign features to specific teams based on capacity, skill alignment, and dependency minimization.

**Time:** 10 minutes

### Prompt

```
STEP 3: TEAM BACKLOG ALLOCATION

Using the prioritized feature list from Step 2 and the capacity matrix from Step 1, allocate features to teams.

ALLOCATION RULES:
1. No team should be allocated more than 90% of their net capacity (leave buffer for emergent work)
2. Minimize cross-team dependencies where possible
3. Consider team skill alignment — note any [ASSUMPTION] about which teams can handle which features
4. Features above the cut line get allocated first; features below the cut line are stretch objectives only

PRODUCE THIS ARTIFACT:

### Artifact 3: Team Allocation Board

**[Team Name 1]**
| Sprint | Feature(s) | Estimated SP | Cumulative SP | Remaining Capacity |
|--------|-----------|-------------|---------------|-------------------|

**[Team Name 2]**
[Same table structure]

[Repeat for all teams]

### Summary

| Team | Allocated SP | Net Capacity | Utilization % | Stretch Objectives |
|------|-------------|-------------|---------------|-------------------|

Flag:
- Any team above 90% utilization
- Features that require skills no team currently has
- Unallocated features above the cut line (capacity shortage)

Do not proceed beyond this step.
```

### Checkpoint ✓

Before proceeding to Step 4, verify:
- [ ] Allocation percentages are realistic (85–90% is healthy; >95% is risky)
- [ ] Stretch objectives are genuinely stretch, not hidden commitments
- [ ] Team assignments match actual team capabilities
- [ ] No team is significantly under-loaded (rebalance if >20% gap between teams)

---

## STEP 4: Dependency Mapping

**Purpose:** Identify, categorize, and visualize all cross-team and external dependencies for the PI.

**Time:** 10–15 minutes

### Prompt

```
STEP 4: DEPENDENCY MAPPING

Using the team allocations from Step 3, identify all dependencies — both cross-team (within the ART) and external (outside the ART).

DEPENDENCY TYPES TO IDENTIFY:
- Feature-to-feature: Feature A requires Feature B to be complete first
- Team-to-team: Team X needs an API/service/component from Team Y
- External: Dependencies on teams/systems/vendors outside this ART
- Milestone: Hard deadlines or external events that constrain timing

PRODUCE THESE ARTIFACTS:

### Artifact 4A: Dependency Register

| Dep ID | Type | From (Team/Feature) | To (Team/Feature) | Description | Sprint Needed By | Risk Level (H/M/L) | Status |
|--------|------|---------------------|-------------------|-------------|------------------|---------------------|--------|

### Artifact 4B: Program Board (Text Representation)

Create a text-based program board showing:
- Rows = Teams
- Columns = Sprints (1 through N + IP)
- Features placed in target sprint
- Dependencies shown as arrows: "→ [Team, Sprint]"
- Milestones marked with ◆

Format:
```
| | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Sprint 5 | IP |
|------|----------|----------|----------|----------|----------|----|
| Team A | [F-001] | [F-003] → Team B, S3 | | [F-007] | | |
| Team B | | | [F-003 dep] | [F-005] | [F-009] | |
| Milestones | | | ◆ API Freeze | | ◆ Release | |
```

### Artifact 4C: Dependency Risk Summary

| Risk Category | Count | Most Critical |
|--------------|-------|--------------|
| Cross-team (within ART) | | |
| External | | |
| Milestone-driven | | |
| Circular (ALERT) | | |

Flag:
- Any circular dependencies (these must be resolved before planning continues)
- Any external dependency without a confirmed commitment
- Any dependency chain longer than 3 links (fragile)

Do not proceed beyond this step.
```

### Checkpoint ✓

Before proceeding to Step 5, verify:
- [ ] All known dependencies are captured (compare against your pre-identified list)
- [ ] No circular dependencies exist (if they do, resolve before continuing)
- [ ] External dependencies have realistic assumptions about availability
- [ ] The program board timing makes sense — features aren't scheduled before their dependencies are ready
- [ ] Milestone dates are accurate

---

## STEP 5: ROAM Risk Register

**Purpose:** Identify, categorize, and plan responses for all PI-level risks using the SAFe ROAM framework.

**Time:** 10 minutes

### Prompt

```
STEP 5: ROAM RISK IDENTIFICATION

Based on everything established in Steps 1–4 (capacity, features, allocations, dependencies), identify all significant risks for this PI and categorize them using the ROAM framework.

RISK SOURCES TO ANALYZE:
1. Capacity risks: Teams near 90%+ utilization, single points of failure
2. Dependency risks: Unconfirmed external dependencies, long dependency chains
3. Technical risks: New technology, integration complexity, performance unknowns
4. Scope risks: Features with vague acceptance criteria, features requiring skills gaps
5. People risks: Key person dependencies, availability uncertainties
6. Process risks: First-time ceremonies, tool transitions, org changes

PRODUCE THIS ARTIFACT:

### Artifact 5: ROAM Risk Register

| Risk ID | Description | Category | ROAM Status | Owner | Impact (H/M/L) | Probability (H/M/L) | Mitigation / Response | Target Resolution |
|---------|-------------|----------|-------------|-------|----------------|---------------------|----------------------|-------------------|

ROAM DEFINITIONS (apply strictly):
- **Resolved:** Risk is no longer a concern. Evidence-based, not hopeful.
- **Owned:** Assigned to a specific person with a concrete action plan and deadline.
- **Accepted:** Team acknowledges the risk and chooses to proceed. Document the reasoning.
- **Mitigated:** Active steps being taken to reduce probability or impact. Mitigation plan defined.

### Risk Summary Dashboard

| ROAM Status | Count | Highest Impact Risk |
|-------------|-------|-------------------|
| Resolved | | |
| Owned | | |
| Accepted | | |
| Mitigated | | |
| **Total** | | |

Flag:
- Any risk categorized as "Accepted" with High impact (these should be escalated)
- More than 3 unresolved High-probability risks (suggests plan is too aggressive)
- Risks without clear owners

Do not proceed beyond this step.
```

### Checkpoint ✓

Before proceeding to Step 6, verify:
- [ ] Risk list is comprehensive (not just technical risks — check people, process, scope)
- [ ] ROAM categories are applied correctly (not everything should be "Mitigated")
- [ ] Every "Owned" risk has a named owner, not a team
- [ ] "Accepted" risks have documented reasoning
- [ ] No High-impact risk is left without a clear response plan

---

## STEP 6: Team PI Objectives

**Purpose:** Draft team PI Objectives with business value scores, linked to features and strategic themes.

**Time:** 10 minutes

### Prompt

```
STEP 6: TEAM PI OBJECTIVES

Using the feature allocations (Step 3), dependency map (Step 4), and risk register (Step 5), draft Team PI Objectives for each team.

PI OBJECTIVE RULES (SAFe 6.0):
1. Each team should have 5–10 PI Objectives
2. Each objective must be SMART: Specific, Measurable, Achievable, Relevant, Time-bound (within this PI)
3. Objectives are categorized as COMMITTED (high confidence) or UNCOMMITTED (stretch/dependent on external factors)
4. Business Value is scored 1–10 by business stakeholders (you will draft suggested scores; I will adjust)
5. Objectives should trace back to specific features AND strategic themes
6. Do NOT write objectives as feature descriptions — write them as business outcomes

PRODUCE THIS ARTIFACT:

### Artifact 6: Team PI Objectives

**[Team Name 1]**

| Obj # | PI Objective | Type | Business Value (1–10) | Linked Features | Strategic Theme | Key Dependencies |
|-------|-------------|------|----------------------|----------------|-----------------|-----------------|
| 1 | | Committed | | | | |
| 2 | | Committed | | | | |
| ... | | | | | | |
| N | | Uncommitted | | | | |

[Repeat for each team]

### ART-Level Summary

| Team | # Committed | # Uncommitted | Total Planned BV | Avg BV/Objective |
|------|------------|--------------|------------------|------------------|

QUALITY CHECKS:
- Flag any objective that reads like a task ("Build the API") rather than an outcome ("Enable real-time data sync for 500+ concurrent users")
- Flag any Committed objective that depends on an unconfirmed external dependency (should be Uncommitted)
- Flag any team with fewer than 3 Committed objectives (undercommitted) or more than 8 Committed objectives (overcommitted)

Do not proceed beyond this step.
```

### Checkpoint ✓

Before proceeding to Step 7, verify:
- [ ] Objectives read as business outcomes, not task descriptions
- [ ] Committed vs. Uncommitted categorization is honest
- [ ] Business Value scores reflect actual stakeholder priorities (adjust before final)
- [ ] Each team has a healthy mix (5–8 Committed, 1–3 Uncommitted)
- [ ] Objectives trace to features and strategic themes

---

## STEP 7: Confidence Vote & Final Pack

**Purpose:** Simulate the SAFe confidence vote process and assemble all artifacts into a final PI Planning pack.

**Time:** 10 minutes

### Prompt

```
STEP 7: CONFIDENCE VOTE & FINAL ASSEMBLY

Based on all artifacts produced in Steps 1–6, simulate a confidence vote assessment and assemble the final PI Planning pack.

CONFIDENCE VOTE SIMULATION:
For each team, assess planning confidence on a 1–5 scale based on:
- Capacity utilization (>90% = lower confidence)
- Dependency risk (unconfirmed externals = lower confidence)
- ROAM risk profile (high unresolved risks = lower confidence)
- Objective achievability (stretch-heavy = lower confidence)
- Historical delivery rate (if provided)

SAFe standard: Average must be ≥3 to proceed. Any team at 1–2 requires re-planning.

PRODUCE THESE ARTIFACTS:

### Artifact 7A: Confidence Vote Summary

| Team | Confidence (1–5) | Key Factors | Re-planning Needed? |
|------|------------------|-------------|-------------------|

| ART Average | [calculated] | | [Yes/No] |

### Artifact 7B: PI Planning Pack (Consolidated)

Produce a single consolidated summary containing:

1. **PI Overview**: PI dates, cadence, strategic themes, total ART capacity
2. **Feature Commitment Summary**: Features above and below the cut line, total committed SP vs. capacity
3. **Program Board Summary**: Key features by sprint by team (condensed view)
4. **Dependency Heatmap**: Total dependencies by type, top 5 critical dependencies
5. **Risk Dashboard**: ROAM summary, top 5 risks requiring management attention
6. **PI Objectives Scorecard**: Committed BV by team, ART total committed BV
7. **Confidence Assessment**: Vote results, any teams requiring re-planning
8. **Open Items & Action Items**: Unresolved questions, follow-up actions with owners and dates
9. **Next Steps**: Post-PI Planning actions (team sprint planning, dependency resolution meetings, management review)

This pack should be ready to present to ART stakeholders and Lean Portfolio Management.
```

### Final Checkpoint ✓

- [ ] Confidence vote average is ≥3 (if not, identify which teams need re-planning)
- [ ] The consolidated pack is complete and stakeholder-ready
- [ ] All [ASSUMPTION] flags from throughout the session have been resolved
- [ ] Open items have clear owners and deadlines
- [ ] You know what your first post-PI Planning action is

---

## POST-BLUEPRINT: What to Do Next

1. **Share the PI Planning pack** with your ART stakeholders and Product Management for review
2. **Schedule dependency resolution meetings** for all unconfirmed external dependencies within 48 hours
3. **Transfer artifacts to your PM tool**: Copy the program board into Jira (or your tool), create risk register entries, and log PI Objectives
4. **Plan the Management Review & Problem Solving** session if confidence vote was below 3 for any team
5. **Set up ART Sync cadence** for the PI — the ART Sync Orchestrator blueprint can help with this

---

## BLUEPRINT METADATA

| Field | Value |
|-------|-------|
| Blueprint ID | SAFE-001 |
| Methodology | SAFe 6.0 |
| Ceremony | PI Planning |
| Steps | 7 (+ Context Primer) |
| Estimated Time | 60–90 minutes |
| Artifacts Produced | 7 primary + 1 consolidated pack |
| AI Platform | Model-agnostic (Claude, ChatGPT, Gemini) |
| Version | 1.0 |
| Last Updated | February 2026 |

---

*© ElitePMPrompts.com — The Project Manager's Nexus*
*This blueprint is licensed for use by the purchasing individual or team. Redistribution prohibited.*
