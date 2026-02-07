import type { Blueprint } from '@/lib/types';

export const agileReleasePlanning: Blueprint = {
  id: 'agile-release-planning',
  slug: 'agile-release-planning',
  title: 'Agile Release Planning & Roadmap Builder',
  subtitle:
    'AI-guided release planning with feature mapping, milestone definition, risk assessment, dependency management, and stakeholder communication plan — aligned with modern Agile release management practices.',
  methodology: 'Agile',
  version: '1.0.0',
  estimatedTime: '60-75 minutes',
  stepCount: 5,
  steps: [
    // ── Step 0: Context Primer ───────────────────────────────────────────
    {
      id: 0,
      title: 'Context Primer',
      purpose:
        'Establish the AI session as an Agile Release Manager and Product Owner facilitating a release planning session, set ground rules for Agile-aligned output, and ingest the product context required for all subsequent steps.',
      estimatedTime: '5 min',
      prompt:
        'You are a seasoned Agile Release Manager and Product Owner facilitating a Release Planning & Roadmap Building session aligned with modern Agile release management practices. Your role is to guide me through a structured, step-by-step process that produces production-ready release planning artifacts suitable for cross-functional teams, leadership stakeholders, and delivery tracking.\n\nSESSION RULES — follow these throughout the entire session:\n1. Use Agile/Scrum terminology and artifact formats exclusively. Refer to Epics, Features, User Stories, Story Points, Sprints, Releases, Velocity, and Product Backlog — not tasks, milestones, or work packages.\n2. Produce tables, not narratives — every artifact must be in structured table format unless explicitly stated otherwise.\n3. Flag every assumption you make with [ASSUMPTION] so I can confirm or correct it before it propagates through subsequent steps.\n4. Apply value-driven prioritization — always favor delivering the highest business value earliest. Default to WSJF (Weighted Shortest Job First) unless instructed otherwise.\n5. Ask clarifying questions before proceeding if critical information is missing — do not silently fill gaps.\n6. Number all artifacts for easy cross-referencing (e.g., Feature F-001, Milestone M-001, Dep D-001, Risk R-001).\n7. Consider Definition of Done (DoD) and Definition of Ready (DoR) when scoping features for release inclusion.\n8. Factor in team capacity and sustainable pace — avoid overloading any single sprint beyond demonstrated velocity.\n\nTo begin, I need you to acknowledge these rules and confirm you are ready. Then I will paste the following context:\n\nCONTEXT TO PASTE BELOW:\n---\n**Product Vision & Release Goal**\n[Paste your product vision statement and the specific goal for this release — what customer or business outcome does this release achieve?]\n\n**Release Cadence & Timeline**\n[Paste your release cadence (e.g., quarterly, monthly, train-based), target release date, number of sprints in this release, sprint duration, and any hardcoded dates or external deadlines]\n\n**Team Velocity & Capacity**\n[Paste your team(s) average velocity (story points per sprint), team size, any known capacity reductions (holidays, PTO, onboarding), and number of contributing teams if multi-team]\n\n**Current Epic/Feature Backlog**\n[Paste your current backlog of epics and features under consideration for this release — include epic/feature name, brief description, estimated size if known, and any business priority already assigned]\n\n**Key Stakeholders**\n[Paste known stakeholders — names, roles, departments, and their interest in this release]\n---\n\nAfter receiving my context, summarize it back to me in a structured format and confirm:\n- Product vision and release goal understood\n- Release cadence and timeline captured (number of sprints, sprint length, target date)\n- Team velocity and capacity recorded (total available story points for the release)\n- Number of backlog items received and initial size assessment\n- Key stakeholders identified\n- Any missing information or ambiguities flagged for resolution',
      expectedOutput:
        'Acknowledgement of session rules, structured summary of the pasted context (product vision, release cadence, velocity, backlog overview, stakeholders), calculated total release capacity in story points, identification of any missing information or ambiguities, and confirmation that the session is ready to proceed.',
      artifacts: [
        {
          name: 'Session Context Summary',
          description:
            'Structured recap of product vision, release cadence, team velocity, backlog overview, and stakeholders as understood by the AI facilitator — including calculated total release capacity.',
          format: 'table',
          columns: [
            'Parameter',
            'Value Provided',
            'Assumptions / Clarifications Needed',
          ],
        },
      ],
      checkpoint: {
        title: 'Context Primer Verification',
        items: [
          {
            label: 'AI acknowledged all session rules',
            description:
              'The AI explicitly confirmed it will follow Agile terminology, table-based artifacts, assumption flagging, WSJF prioritization, and correct naming conventions.',
          },
          {
            label: 'Product vision and release goal accurately summarized',
            description:
              'The product vision statement and specific release goal are correctly reflected — the "why" behind this release is clear.',
          },
          {
            label: 'Release capacity calculated correctly',
            description:
              'Total available story points for the release are computed as (velocity per sprint) x (number of sprints) x (capacity factor), accounting for known reductions.',
          },
          {
            label: 'Backlog items received and catalogued',
            description:
              'All provided epics/features are listed with their current size estimates and priority indications.',
          },
          {
            label: 'Missing information identified',
            description:
              'Any gaps in the context (e.g., missing velocity data, unclear backlog items, absent stakeholders) have been flagged for resolution before proceeding.',
          },
        ],
        failAction:
          'Correct any misunderstood context, provide missing information (especially velocity and backlog data), and re-run Step 0 until the summary is accurate and release capacity is confirmed.',
      },
    },

    // ── Step 1: Feature Prioritization & Release Scope ───────────────────
    {
      id: 1,
      title: 'Feature Prioritization & Release Scope',
      purpose:
        'Prioritize all candidate features for the release using a value-versus-effort analysis (WSJF or equivalent), determine which features fit within the release capacity, and produce a ranked release scope that maximizes business value delivery.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s prioritize features and define the release scope.\n\nUsing the backlog from Step 0 and the calculated release capacity, we will apply WSJF (Weighted Shortest Job First) prioritization to determine which features should be included in this release and in what order they should be delivered.\n\nWSJF FORMULA:\n- WSJF = Cost of Delay / Job Duration\n- Cost of Delay = Business Value + Time Criticality + Risk Reduction/Opportunity Enablement\n- Each factor is scored on a relative scale of 1-10 using Fibonacci-like values (1, 2, 3, 5, 8, 10).\n- Job Duration is the estimated effort in Story Points (SP), normalized to a 1-10 scale for WSJF calculation.\n\nFor each feature in the backlog, score the following:\n- **Business Value (1-10)**: How much direct value does this feature deliver to the customer or business? Consider revenue impact, user satisfaction, strategic alignment.\n- **Time Criticality (1-10)**: How much does the value decay if we delay this feature? Is there a market window, regulatory deadline, or competitive pressure?\n- **Risk Reduction / Opportunity Enablement (1-10)**: Does this feature reduce technical risk, remove a bottleneck, or enable future high-value features?\n- **Effort Estimate (Story Points)**: Size of the feature in story points. If not provided, estimate using relative sizing against other features and flag as [ASSUMPTION].\n\nProduce the following artifacts:\n\n**Artifact 1A: Release Feature Matrix**\n\n| Feature ID | Feature Name | Business Value (1-10) | Time Criticality (1-10) | Risk Reduction (1-10) | Cost of Delay (Sum) | Effort Estimate (SP) | Effort (Normalized 1-10) | WSJF Score | Release Candidate? | Dependencies | Notes |\n|-----------|-------------|----------------------|------------------------|----------------------|--------------------|--------------------|------------------------|-----------|-------------------|-------------|-------|\n| F-001 | | | | | | | | | Yes/No | [List Dep IDs] | |\n| F-002 | | | | | | | | | Yes/No | | |\n| ... | | | | | | | | | | | |\n\nSort the table by WSJF Score descending (highest priority first).\n\n**Artifact 1B: Release Scope Summary**\n\n| Metric | Value |\n|--------|-------|\n| Total Features Evaluated | |\n| Features Included in Release | |\n| Features Deferred to Next Release | |\n| Total Story Points Committed | |\n| Total Release Capacity (SP) | |\n| Capacity Utilization (%) | |\n| Buffer / Slack (SP) | |\n| Recommended Buffer (%) | [Suggest 15-20% buffer for scope flexibility] |\n\n**Artifact 1C: Deferred Features Register**\n\n| Feature ID | Feature Name | WSJF Score | Reason for Deferral | Recommended Release | |\n|-----------|-------------|-----------|--------------------|--------------------|---|\n| | | | Capacity exceeded / Dependencies unresolved / Low value | Next release / Backlog review | |\n\nRULES:\n- Sort all features by WSJF score descending — highest value-to-effort ratio ships first.\n- Do NOT commit more story points than the calculated release capacity minus the recommended 15-20% buffer.\n- If two features have the same WSJF score, prefer the one with higher Time Criticality.\n- Flag any feature that has unresolved dependencies as a risk — it may slip even if included.\n- If effort estimates were not provided in the backlog, use T-shirt sizing (S=3, M=5, L=8, XL=13) and flag as [ASSUMPTION].\n- Every feature marked "Yes" for Release Candidate must fit within the capacity envelope.\n- Include a buffer of 15-20% of total capacity to absorb scope changes, defect fixes, and estimation variance.\n- Clearly explain why each deferred feature was excluded — insufficient capacity, unresolved dependencies, or low relative value.',
      expectedOutput:
        'Artifact 1A: A complete Release Feature Matrix with WSJF scores for all candidate features, sorted by priority. Artifact 1B: A Release Scope Summary showing capacity utilization, committed story points, and recommended buffer. Artifact 1C: A Deferred Features Register explaining why excluded features were deferred. All features are either included or explicitly deferred with rationale.',
      artifacts: [
        {
          name: 'Release Feature Matrix',
          description:
            'Prioritized feature list with WSJF scoring (Business Value, Time Criticality, Risk Reduction, Effort), release inclusion decision, and dependency references.',
          format: 'table',
          columns: [
            'Feature ID',
            'Feature Name',
            'Business Value (1-10)',
            'Effort Estimate (SP)',
            'WSJF Score',
            'Release Candidate?',
            'Dependencies',
          ],
        },
        {
          name: 'Release Scope Summary',
          description:
            'Aggregate metrics showing total features evaluated, committed story points versus release capacity, capacity utilization percentage, and recommended buffer.',
          format: 'table',
          columns: ['Metric', 'Value'],
        },
        {
          name: 'Deferred Features Register',
          description:
            'Features excluded from this release with WSJF scores, deferral reasons, and recommended future release placement.',
          format: 'table',
          columns: [
            'Feature ID',
            'Feature Name',
            'WSJF Score',
            'Reason for Deferral',
            'Recommended Release',
          ],
        },
      ],
      checkpoint: {
        title: 'Feature Prioritization Verification',
        items: [
          {
            label: 'WSJF scoring is consistent and justified',
            description:
              'All features are scored using the same 1-10 scale for Business Value, Time Criticality, and Risk Reduction. Scores are justified — no unexplained perfect 10s or arbitrary 1s.',
          },
          {
            label: 'Release capacity is not exceeded',
            description:
              'Total committed story points (including buffer) do not exceed the calculated release capacity from Step 0.',
          },
          {
            label: 'Buffer of 15-20% is preserved',
            description:
              'A capacity buffer of 15-20% is reserved for scope changes, defect fixes, and estimation variance — the release is not packed to 100%.',
          },
          {
            label: 'Deferred features have clear rationale',
            description:
              'Every feature excluded from the release has an explicit reason (capacity, dependencies, low value) and a recommended future release.',
          },
          {
            label: 'Dependencies are identified for included features',
            description:
              'Features with cross-feature or external dependencies are flagged and the dependency IDs are noted for Step 3.',
          },
        ],
        failAction:
          'Re-score features where WSJF values are inconsistent, reduce committed scope to stay within capacity, add buffer if missing, and provide deferral rationale for all excluded features.',
      },
    },

    // ── Step 2: Release Milestone & Sprint Mapping ───────────────────────
    {
      id: 2,
      title: 'Release Milestone & Sprint Mapping',
      purpose:
        'Map prioritized features to specific sprints across the release timeline, define key milestones and deliverables, and produce a release burnup projection to track planned versus actual progress throughout the release cycle.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s map features to sprints and define the release milestones.\n\nUsing the prioritized features from Artifact 1A (Release Feature Matrix) and the release cadence from Step 0, distribute features across sprints respecting priority order, dependencies, and team velocity.\n\nSPRINT MAPPING RULES:\n1. Features with the highest WSJF score should be scheduled earliest — deliver value early and reduce risk.\n2. Respect dependency ordering — if Feature F-003 depends on Feature F-001, F-001 must complete in an earlier sprint.\n3. Do NOT exceed the team\'s average velocity in any single sprint. If a feature is larger than one sprint\'s velocity, it must span multiple sprints or be split into smaller increments.\n4. Reserve the final sprint (or final 20% of release sprints) for hardening, integration testing, bug fixes, and release preparation — do NOT schedule new feature development in this period.\n5. Include key milestones: Release Kickoff, Feature Complete (code freeze), Integration Testing, UAT, Release Readiness Review, and Go-Live.\n6. Each sprint should have a clear Sprint Goal that describes the outcome, not just a list of features.\n\nProduce the following artifacts:\n\n**Artifact 2A: Release Timeline**\n\n| Sprint | Sprint Dates | Features Planned | Story Points Planned | Cumulative SP | Sprint Velocity Target | Sprint Goal | Milestone | Key Deliverable |\n|--------|-------------|-----------------|---------------------|--------------|-----------------------|------------|-----------|----------------|\n| Sprint 1 | [Start - End] | F-001, F-002 | | | | [Outcome-focused goal] | Release Kickoff | |\n| Sprint 2 | [Start - End] | F-003 | | | | | | |\n| Sprint 3 | [Start - End] | F-004, F-005 | | | | | Feature Complete | |\n| Sprint N-1 | [Start - End] | Bug fixes, polish | | | | | UAT Complete | |\n| Sprint N | [Start - End] | Release prep | | | | | Go-Live | Release package |\n\n**Artifact 2B: Release Burnup Projection**\n\nProvide a sprint-by-sprint burnup projection:\n\n| Sprint | Planned SP (Cumulative) | Projected SP (Cumulative) | Total Release Scope (SP) | % Complete (Projected) | Status |\n|--------|------------------------|--------------------------|-------------------------|----------------------|--------|\n| Sprint 1 | | [Based on velocity] | | | On Track / At Risk / Behind |\n| Sprint 2 | | | | | |\n| ... | | | | | |\n| Sprint N | | | | 100% | |\n\nInclude:\n- A confidence indicator for each sprint (On Track / At Risk / Behind) based on whether planned SP fits within velocity.\n- A note on what happens if velocity is 10-20% lower than planned (pessimistic scenario).\n- Identification of the \"point of no return\" — the sprint by which all features must be committed or deferred.\n\n**Artifact 2C: Milestone Register**\n\n| Milestone ID | Milestone Name | Target Sprint | Target Date | Exit Criteria | Responsible | Dependencies |\n|-------------|---------------|--------------|-------------|---------------|-------------|-------------|\n| M-001 | Release Kickoff | Sprint 1, Day 1 | | Backlog refined, team briefed, environments ready | Product Owner | |\n| M-002 | Mid-Release Review | | | 50%+ features complete, risks reviewed | Scrum Master | |\n| M-003 | Feature Complete | | | All release features coded and unit tested | Dev Lead | |\n| M-004 | UAT Sign-off | | | All acceptance criteria passed, stakeholder approval | Product Owner | M-003 |\n| M-005 | Release Readiness Review | | | Go/No-Go decision, deployment plan approved | Release Manager | M-004 |\n| M-006 | Go-Live | | | Production deployment, monitoring in place | DevOps Lead | M-005 |\n\nRULES:\n- Each milestone must have explicit exit criteria — what must be true to pass the milestone.\n- Sprint goals must be outcome-focused ("Users can complete checkout flow") not activity-focused ("Work on checkout stories").\n- Flag any sprint where planned SP exceeds 90% of velocity — it is at risk of spillover.\n- If a feature spans multiple sprints, note which sprint it starts and finishes in.',
      expectedOutput:
        'Artifact 2A: A complete Release Timeline mapping all features to sprints with cumulative story points, sprint goals, milestones, and key deliverables. Artifact 2B: A Release Burnup Projection with sprint-by-sprint cumulative progress and confidence indicators. Artifact 2C: A Milestone Register with exit criteria, responsible parties, and dependencies for all release milestones.',
      artifacts: [
        {
          name: 'Release Timeline',
          description:
            'Sprint-by-sprint feature mapping with planned story points, cumulative totals, sprint goals, milestones, and key deliverables.',
          format: 'table',
          columns: [
            'Sprint',
            'Features Planned',
            'Cumulative SP',
            'Milestone',
            'Key Deliverable',
          ],
        },
        {
          name: 'Release Burnup Projection',
          description:
            'Cumulative progress projection per sprint with planned versus projected story points, percent complete, and confidence status.',
          format: 'table',
          columns: [
            'Sprint',
            'Planned SP (Cumulative)',
            'Projected SP (Cumulative)',
            'Total Scope (SP)',
            '% Complete',
            'Status',
          ],
        },
        {
          name: 'Milestone Register',
          description:
            'All release milestones with target sprint, target date, exit criteria, responsible parties, and dependencies.',
          format: 'table',
          columns: [
            'Milestone ID',
            'Milestone Name',
            'Target Sprint',
            'Target Date',
            'Exit Criteria',
            'Responsible',
          ],
        },
      ],
      checkpoint: {
        title: 'Sprint Mapping & Milestone Verification',
        items: [
          {
            label: 'No sprint exceeds team velocity',
            description:
              'Planned story points in every sprint are at or below the team\'s demonstrated average velocity. Sprints above 90% utilization are flagged as at-risk.',
          },
          {
            label: 'Dependency ordering is respected',
            description:
              'Features with dependencies are scheduled after their prerequisite features complete — no circular or broken dependency chains.',
          },
          {
            label: 'Hardening sprint is reserved',
            description:
              'The final sprint (or final 20% of sprints) is reserved for integration testing, bug fixes, and release preparation — no new feature work is scheduled.',
          },
          {
            label: 'All milestones have exit criteria',
            description:
              'Every milestone defines what must be true to pass — not just a date but a verifiable condition.',
          },
          {
            label: 'Burnup projection includes pessimistic scenario',
            description:
              'The burnup projection accounts for a 10-20% velocity reduction scenario and identifies the sprint where scope must be locked.',
          },
        ],
        failAction:
          'Rebalance feature allocation across sprints to stay within velocity, fix dependency ordering violations, add hardening sprint if missing, and define exit criteria for all milestones.',
      },
    },

    // ── Step 3: Dependency & Risk Assessment ─────────────────────────────
    {
      id: 3,
      title: 'Dependency & Risk Assessment',
      purpose:
        'Identify all cross-team dependencies, external dependencies, and release-level risks, then develop mitigation strategies and assign owners to ensure the release plan is resilient and actionable.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s identify dependencies and assess release risks.\n\nReview all artifacts produced so far (Session Context, Release Feature Matrix, Release Timeline, Milestone Register) and identify ALL dependencies and risks that could threaten the release.\n\nDEPENDENCY CATEGORIES:\n- **Feature-to-Feature**: One feature requires another to be complete before it can start or finish.\n- **Cross-Team**: A feature owned by Team A depends on work from Team B (API contract, shared component, data migration).\n- **External/Vendor**: A feature depends on a third-party API, vendor deliverable, license, or external approval.\n- **Infrastructure**: A feature depends on environment setup, CI/CD pipeline, database provisioning, or cloud resources.\n- **Data/Content**: A feature depends on data migration, content creation, localization, or configuration.\n\nRISK CATEGORIES:\n- **Scope Risk**: Requirements may change, scope may creep, acceptance criteria may be disputed.\n- **Technical Risk**: New technology, integration complexity, performance unknowns, technical debt.\n- **Velocity Risk**: Team may not achieve projected velocity due to attrition, context-switching, or unplanned work.\n- **Dependency Risk**: A dependency may be delayed, delivered incompletely, or fail to meet the interface contract.\n- **Quality Risk**: Defect rates may be higher than expected, testing coverage may be insufficient.\n- **External Risk**: Vendor delays, regulatory changes, market shifts, infrastructure outages.\n- **Stakeholder Risk**: Key stakeholder may withdraw support, change priorities, or escalate competing demands.\n\nProduce the following artifacts:\n\n**Artifact 3A: Dependency Map**\n\n| Dep ID | From Feature | To Feature / Team / Vendor | Dependency Type | Description | Required By Sprint | Current Status | Mitigation if Delayed | Owner |\n|--------|-------------|---------------------------|----------------|-------------|-------------------|----------------|----------------------|-------|\n| D-001 | F-003 | F-001 | Feature-to-Feature | F-003 payment flow requires F-001 user auth to be complete | Sprint 2 | On Track | Implement mock auth for parallel development | [Name] |\n| D-002 | F-005 | Platform Team | Cross-Team | F-005 requires updated API from Platform Team | Sprint 3 | At Risk | Agree API contract early, use contract testing | [Name] |\n| D-003 | F-004 | Stripe API v3 | External/Vendor | Payment integration depends on Stripe v3 availability | Sprint 2 | Unknown | Verify Stripe v3 timeline, prepare v2 fallback | [Name] |\n| ... | | | | | | | | |\n\nStatus values: On Track, At Risk, Blocked, Unknown, Resolved.\n\n**Artifact 3B: Release Risk Register**\n\n| Risk ID | Description | Category | Probability (1-5) | Impact (1-5) | Risk Score (P x I) | Priority (H/M/L) | Response Strategy | Mitigation Actions | Trigger Condition | Owner | Status |\n|---------|-------------|----------|-------------------|-------------|-------------------|------------------|------------------|--------------------|------------------|-------|--------|\n| R-001 | Team velocity drops 20% due to Q4 holidays | Velocity | 4 | 3 | 12 | Medium | Mitigate | Reserve 15% buffer, identify scope to cut if needed | Velocity < 80% of plan after Sprint 2 | Scrum Master | Open |\n| R-002 | External API dependency not ready on time | Dependency | 3 | 5 | 15 | High | Mitigate | Weekly check-ins with vendor, build mock service | Vendor misses committed date by > 3 days | Product Owner | Open |\n| ... | | | | | | | | | | | |\n\nResponse Strategies:\n- **Threats**: Avoid (eliminate the cause), Transfer (shift to third party), Mitigate (reduce probability or impact), Accept (acknowledge and monitor)\n- **Opportunities**: Exploit, Share, Enhance, Accept\n\n**Artifact 3C: Dependency & Risk Summary Dashboard**\n\n| Metric | Value |\n|--------|-------|\n| Total Dependencies Identified | |\n| Dependencies On Track | |\n| Dependencies At Risk | |\n| Dependencies Blocked | |\n| Total Risks Identified | |\n| High Priority Risks (Score >= 15) | |\n| Medium Priority Risks (Score 8-14) | |\n| Low Priority Risks (Score 1-7) | |\n| Risks on Critical Path Features | |\n| External/Vendor Dependencies | |\n| Recommended Contingency Actions | |\n\nRULES:\n- Identify at minimum 5 dependencies across at least 3 different types.\n- Identify at minimum 6 risks across at least 4 different categories.\n- Every dependency with status "At Risk" or "Blocked" must have a mitigation strategy.\n- Every High-priority risk (score >= 15) must have a named owner, specific mitigation actions, and a trigger condition.\n- Include at least 1 positive risk (opportunity) — e.g., "Team may complete features faster than projected if new tooling improves productivity."\n- Cross-reference dependencies with the Release Timeline — flag any dependency that could slip a milestone.\n- Flag any feature that has 3+ dependencies as a high-coordination item requiring extra management attention.',
      expectedOutput:
        'Artifact 3A: A Dependency Map with 5+ dependencies across multiple types, each with status, mitigation, and owner. Artifact 3B: A Release Risk Register with 6+ risks across multiple categories, scored and prioritized with response strategies and trigger conditions. Artifact 3C: A Dependency & Risk Summary Dashboard with aggregate metrics. All high-priority items have owners and actions.',
      artifacts: [
        {
          name: 'Dependency Map',
          description:
            'All cross-feature, cross-team, and external dependencies with type, required-by sprint, current status, mitigation strategy, and owner.',
          format: 'table',
          columns: [
            'Dep ID',
            'From Feature',
            'To Feature / Team',
            'Type',
            'Status',
            'Mitigation',
          ],
        },
        {
          name: 'Release Risk Register',
          description:
            'Comprehensive release risk register with qualitative analysis (probability x impact), response strategies, mitigation actions, trigger conditions, and owners.',
          format: 'table',
          columns: [
            'Risk ID',
            'Description',
            'Category',
            'P x I Score',
            'Priority',
            'Mitigation Strategy',
            'Owner',
          ],
        },
        {
          name: 'Dependency & Risk Summary Dashboard',
          description:
            'Aggregate metrics showing dependency status distribution, risk priority distribution, critical path risks, and recommended contingency actions.',
          format: 'table',
          columns: ['Metric', 'Value'],
        },
      ],
      checkpoint: {
        title: 'Dependency & Risk Verification',
        items: [
          {
            label: 'Dependencies are comprehensive',
            description:
              'At least 5 dependencies identified across 3+ types (feature-to-feature, cross-team, external). No obvious dependencies are missing.',
          },
          {
            label: 'At-risk dependencies have mitigations',
            description:
              'Every dependency with "At Risk" or "Blocked" status has a documented mitigation strategy and named owner.',
          },
          {
            label: 'High-priority risks have complete response plans',
            description:
              'Every risk with score >= 15 has a named owner, specific mitigation actions, and a clearly defined trigger condition.',
          },
          {
            label: 'Cross-references to Release Timeline are included',
            description:
              'Dependencies are linked to specific sprints and milestones — any dependency that could slip a milestone is flagged.',
          },
          {
            label: 'At least one opportunity is identified',
            description:
              'The risk register includes at least one positive risk with an Exploit, Share, or Enhance strategy.',
          },
        ],
        failAction:
          'Add missing dependencies, assign owners to unowned at-risk items, complete response plans for all high-priority risks, verify cross-references to the Release Timeline, and add an opportunity risk if none exists.',
      },
    },

    // ── Step 4: Release Plan Assembly & Communication ────────────────────
    {
      id: 4,
      title: 'Release Plan Assembly & Communication',
      purpose:
        'Consolidate all artifacts into a cohesive release plan document, develop a stakeholder communication strategy with tailored messaging for different audiences, and produce a release-ready package that can be shared with leadership, delivery teams, and external stakeholders.',
      estimatedTime: '10 min',
      prompt:
        'Let\'s assemble the complete Release Plan and build the stakeholder communication strategy.\n\nConsolidate all artifacts from Steps 0-3 into a single, stakeholder-ready Release Plan. Additionally, produce a Stakeholder Communication Matrix that defines how each stakeholder group will be kept informed throughout the release cycle.\n\n**Artifact 4A: Release Plan Summary**\n\nProduce a comprehensive one-page release summary:\n\n| Section | Content |\n|---------|--------|\n| Release Name | [From context — give the release a meaningful name tied to the release goal] |\n| Release Version | [e.g., v2.4.0] |\n| Target Release Date | [From Release Timeline] |\n| Release Goal | [1-2 sentences — what customer/business outcome does this release achieve?] |\n| Scope Summary | [Number of features included, total story points committed, key themes] |\n| Key Features | [Top 3-5 features by WSJF score with one-line descriptions] |\n| Sprint Count | [Number of development sprints + hardening sprint] |\n| Key Milestones | [List: Feature Complete date, UAT date, Go-Live date] |\n| Top Risks | [Top 3 risks by score with one-line mitigations] |\n| Critical Dependencies | [Top 3 dependencies that could impact the release] |\n| Deferred Items | [Number of features deferred, briefly explain why] |\n| Confidence Level | [High / Medium / Low — based on risk and dependency analysis] |\n| Release Owner | [Name and role] |\n\n**Artifact 4B: Stakeholder Communication Matrix**\n\n| Comm ID | Stakeholder Group | Communication Type | Channel | Frequency | Content Focus | Owner | Template / Format |\n|---------|------------------|-------------------|---------|-----------|--------------|-------|------------------|\n| C-001 | Executive Leadership | Release Status Report | Email + Dashboard | Bi-weekly | Progress vs plan, key risks, decisions needed, budget status | Product Owner | Executive summary (1 page max) |\n| C-002 | Product Stakeholders | Release Demo / Review | Video call + Recording | Per sprint | Feature demonstrations, feedback collection, scope updates | Product Owner | Sprint Review agenda |\n| C-003 | Delivery Team(s) | Sprint Planning & Standup | Standup meeting + Slack | Daily / Per sprint | Sprint goals, blockers, dependency updates, velocity tracking | Scrum Master | Sprint board + burndown |\n| C-004 | QA / Testing Team | Test Readiness Updates | Email + JIRA | Weekly | Features ready for testing, test environment status, defect triage | QA Lead | Test status dashboard |\n| C-005 | External Vendors / Partners | Dependency Status Check | Email + Meeting | Weekly / As needed | API readiness, integration milestones, contract deliverables | Release Manager | Vendor checklist |\n| C-006 | Customer Success / Support | Release Readiness Brief | Training session + Docs | 2 weeks before release | New features overview, known issues, support playbook, FAQ | CS Lead | Release notes + FAQ doc |\n| C-007 | End Users / Customers | Release Announcement | Email + In-app + Blog | On release day | What\'s new, how to use it, where to get help | Marketing Lead | Release notes + changelog |\n| ... | | | | | | | |\n\n**Artifact 4C: Release Communication Calendar**\n\nMap key communications to the release timeline:\n\n| Sprint / Week | Communication Event | Audience | Key Message | Owner |\n|--------------|--------------------|---------|-----------|---------|\n| Sprint 1 | Release Kickoff | All stakeholders | Release goal, scope, timeline, team assignments | Product Owner |\n| Sprint 2 | First Progress Update | Executive Leadership | On track / adjustments, initial velocity data | Product Owner |\n| Mid-Release | Mid-Release Review | Product Stakeholders | 50%+ features demo, risk update, scope confirmation | Product Owner |\n| Sprint N-1 | UAT Kickoff Brief | QA, Product Stakeholders | Features ready for UAT, test plan, acceptance criteria | QA Lead |\n| Sprint N-1 | Support Readiness Training | Customer Success | New features walkthrough, support playbook | CS Lead |\n| Sprint N | Go/No-Go Decision | Executive Leadership, Release Manager | Release readiness assessment, final risk review | Release Manager |\n| Release Day | Release Announcement | End Users, Customers | What\'s new, how to access, support channels | Marketing Lead |\n| Post-Release | Release Retrospective | Delivery Team | What went well, what to improve, action items | Scrum Master |\n\n**Artifact 4D: Open Items & Action Register**\n\nCapture any unresolved items, open questions, or follow-up actions from the planning session:\n\n| Item # | Description | Type (Action / Decision / Question) | Owner | Due Date | Priority (H/M/L) | Status |\n|--------|-------------|-------------------------------------|-------|----------|------------------|--------|\n| AI-001 | Confirm velocity data with team leads | Action | [Name] | [Date] | High | Open |\n| AI-002 | Finalize API contract with Platform Team | Action | [Name] | [Date] | High | Open |\n| AI-003 | Stakeholder approval of release scope | Decision | [Name] | [Date] | High | Open |\n| ... | | | | | | |\n\nRULES:\n- The Release Plan Summary must be concise enough to fit on one page — executives will read this, not a 20-page document.\n- Every stakeholder group from Step 0 must appear in the Communication Matrix — no stakeholder should be surprised by release content.\n- Communication frequency must match stakeholder influence and interest — high-influence stakeholders get more frequent, more detailed updates.\n- The Communication Calendar must cover the entire release lifecycle: kickoff through post-release retrospective.\n- All [ASSUMPTION] tags from previous steps must be resolved in this step — either confirmed or converted into open items.\n- The confidence level must be justified based on the risk and dependency analysis from Step 3.\n- Include a post-release retrospective communication — learning from the release is as important as planning it.',
      expectedOutput:
        'Artifact 4A: A concise Release Plan Summary suitable for executive stakeholders with release name, goal, scope, milestones, risks, and confidence level. Artifact 4B: A Stakeholder Communication Matrix covering all stakeholder groups with tailored channels, frequency, and content. Artifact 4C: A Release Communication Calendar mapping key communications to the release timeline. Artifact 4D: An Open Items & Action Register capturing all unresolved items. The release plan is self-contained and ready for stakeholder distribution.',
      artifacts: [
        {
          name: 'Release Plan Summary',
          description:
            'One-page executive release summary with release name, goal, scope, key features, milestones, top risks, dependencies, confidence level, and release owner.',
          format: 'table',
          columns: ['Section', 'Content'],
        },
        {
          name: 'Stakeholder Communication Matrix',
          description:
            'Communication plan for every stakeholder group with tailored communication type, channel, frequency, content focus, and ownership.',
          format: 'table',
          columns: [
            'Comm ID',
            'Stakeholder Group',
            'Communication Type',
            'Channel',
            'Frequency',
            'Owner',
          ],
        },
        {
          name: 'Release Communication Calendar',
          description:
            'Timeline-mapped communication events from release kickoff through post-release retrospective with audiences, key messages, and owners.',
          format: 'table',
          columns: [
            'Sprint / Week',
            'Communication Event',
            'Audience',
            'Key Message',
            'Owner',
          ],
        },
        {
          name: 'Open Items & Action Register',
          description:
            'All unresolved items, follow-up actions, and pending decisions from the planning session with owners, due dates, and priority.',
          format: 'table',
          columns: [
            'Item #',
            'Description',
            'Type',
            'Owner',
            'Due Date',
            'Status',
          ],
        },
      ],
      checkpoint: {
        title: 'Release Plan & Communication Verification',
        items: [
          {
            label: 'Release Plan Summary is concise and complete',
            description:
              'The summary covers release name, goal, scope, milestones, risks, dependencies, and confidence level — suitable for a one-page executive brief.',
          },
          {
            label: 'All stakeholder groups have communication plans',
            description:
              'Every stakeholder group from Step 0 appears in the Communication Matrix with tailored channel, frequency, and content.',
          },
          {
            label: 'Communication Calendar covers full lifecycle',
            description:
              'The calendar includes communications from release kickoff through post-release retrospective — no phase of the release is uncovered.',
          },
          {
            label: 'All assumptions are resolved or tracked',
            description:
              'No unresolved [ASSUMPTION] tags remain in the final plan — all have been confirmed or captured as open items in the Action Register.',
          },
          {
            label: 'Confidence level is justified',
            description:
              'The overall release confidence level (High/Medium/Low) is explicitly justified based on the risk scores and dependency statuses from Step 3.',
          },
        ],
        failAction:
          'Fill in missing stakeholder communications, extend the Communication Calendar to cover the full release lifecycle, resolve or track all open assumptions, and justify the confidence level with references to the risk and dependency analysis.',
      },
    },
  ],
  requiredInputs: [
    {
      name: 'Product Vision & Release Goal',
      description:
        'Product vision statement and the specific goal for this release — what customer or business outcome does this release achieve.',
      format: 'Structured text: Product Vision, Release Goal, Target Outcome',
    },
    {
      name: 'Release Cadence & Timeline',
      description:
        'Release cadence (quarterly, monthly, train-based), target release date, number of sprints in this release, sprint duration, and any hardcoded dates or external deadlines.',
      format: 'Text: Cadence, Target Date, Sprint Count, Sprint Duration, Fixed Dates',
    },
    {
      name: 'Team Velocity & Capacity',
      description:
        'Average team velocity in story points per sprint, team size, known capacity reductions (holidays, PTO, onboarding), and number of contributing teams.',
      format: 'Numbers: Velocity (SP/Sprint), Team Size, Capacity Reductions, Team Count',
    },
    {
      name: 'Current Epic/Feature Backlog',
      description:
        'Current backlog of epics and features under consideration for this release — include epic/feature name, brief description, estimated size if known, and any business priority already assigned.',
      format: 'Table or list: Feature Name | Description | Size Estimate | Priority',
    },
    {
      name: 'Key Stakeholders',
      description:
        'Known stakeholders including names, roles, departments, and their interest or involvement in this release.',
      format: 'Table or list: Name | Role | Department | Interest',
    },
  ],
  artifactsProduced: [
    'Session Context Summary',
    'Release Feature Matrix',
    'Release Scope Summary',
    'Deferred Features Register',
    'Release Timeline',
    'Release Burnup Projection',
    'Milestone Register',
    'Dependency Map',
    'Release Risk Register',
    'Dependency & Risk Summary Dashboard',
    'Release Plan Summary',
    'Stakeholder Communication Matrix',
    'Release Communication Calendar',
    'Open Items & Action Register',
  ],
  tier: 'premium',
  price: 29700,
  suiteId: 'agile-suite',
};
