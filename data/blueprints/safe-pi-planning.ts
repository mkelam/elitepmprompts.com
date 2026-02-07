import type { Blueprint } from '@/lib/types';

export const safePiPlanning: Blueprint = {
  id: 'safe-pi-planning',
  slug: 'safe-pi-planning',
  title: 'SAFe PI Planning Copilot',
  subtitle:
    'AI-guided Program Increment planning with capacity calculation, feature decomposition, dependency mapping, ROAM risk management, and confidence voting — fully aligned with SAFe 6.0.',
  methodology: 'SAFe',
  version: '1.0.0',
  estimatedTime: '80-95 minutes',
  stepCount: 8,
  steps: [
    // ── Step 0: Context Primer ───────────────────────────────────────────
    {
      id: 0,
      title: 'Context Primer',
      purpose:
        'Establish the AI session as a SAFe 6.0 Release Train Engineer (RTE) facilitating PI Planning, set ground rules, and ingest the team context required for all subsequent steps.',
      estimatedTime: '5 min',
      prompt:
        'You are a SAFe 6.0 certified Release Train Engineer (RTE) facilitating a Program Increment (PI) Planning session. Your role is to guide me through a structured, step-by-step PI Planning process that produces production-ready SAFe artifacts.\n\nSESSION RULES — follow these throughout the entire session:\n1. Use SAFe 6.0 terminology and artifact formats exclusively.\n2. Produce tables, not narratives — every artifact must be in structured table format unless explicitly stated otherwise.\n3. Flag every assumption you make with [ASSUMPTION] so I can confirm or correct it.\n4. Use correct SAFe terms: Features (not stories), PI Objectives (not sprint goals), Program Board (not roadmap), WSJF (not MoSCoW).\n5. Ask clarifying questions before proceeding if critical information is missing.\n6. Number all artifacts for easy cross-referencing (e.g., Feature F-001, Dependency D-001, Risk R-001).\n\nTo begin, I need you to acknowledge these rules and confirm you are ready. Then I will paste the following context:\n\nCONTEXT TO PASTE BELOW:\n---\n**Team Roster & Structure**\n[Paste your ART team roster here — include team names, team size, Scrum Master names, and any specializations]\n\n**PI Cadence**\n[Paste your PI cadence details — number of sprints per PI, sprint duration, IP sprint inclusion, PI start/end dates]\n\n**Strategic Themes**\n[Paste 3-5 strategic themes for this PI — include theme name and brief description]\n\n**Current Product Backlog** (optional — can be provided in Step 2)\n[Paste your feature backlog if available now, or indicate you will provide it in Step 2]\n---\n\nAfter receiving my context, summarize it back to me in a structured format and confirm:\n- Number of teams identified\n- PI duration and sprint cadence\n- Strategic themes received\n- Any missing information or ambiguities that need resolution before proceeding',
      expectedOutput:
        'Acknowledgement of session rules, structured summary of the pasted context (teams, cadence, themes), identification of any missing information or ambiguities, and confirmation that the session is ready to proceed to Step 1.',
      artifacts: [
        {
          name: 'Session Context Summary',
          description:
            'Structured recap of team roster, PI cadence, and strategic themes as understood by the AI facilitator.',
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
              'The AI explicitly confirmed it will follow SAFe 6.0 terminology, table-based artifacts, assumption flagging, and correct naming conventions.',
          },
          {
            label: 'Team roster accurately summarized',
            description:
              'All teams, sizes, and specializations are correctly reflected in the summary.',
          },
          {
            label: 'PI cadence confirmed',
            description:
              'Sprint count, duration, IP sprint, and PI dates are correctly captured.',
          },
          {
            label: 'Strategic themes captured',
            description:
              'All provided strategic themes are listed and understood.',
          },
          {
            label: 'Missing information identified',
            description:
              'Any gaps in the context have been flagged for resolution.',
          },
        ],
        failAction:
          'Correct any misunderstood context, provide missing information, and re-run Step 0 until the summary is accurate.',
      },
    },

    // ── Step 1: Team Context & Capacity Calculation ──────────────────────
    {
      id: 1,
      title: 'Team Context & Capacity Calculation',
      purpose:
        'Calculate the available capacity for each team in the PI, accounting for sprint count, average velocity, and maintenance reserves to establish a realistic planning ceiling.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s calculate team capacity for this PI.\n\nFor each team in our ART, calculate the PI capacity using the following formula:\n- **Gross Capacity** = Average Velocity per Sprint x Number of Development Sprints (exclude IP sprint)\n- **Net Capacity** = Gross Capacity x (1 - Maintenance Reserve %)\n\nUse the following inputs:\n- Team velocity data: [Paste average velocity per sprint for each team — use the last 3 PI average if available]\n- Maintenance reserve: [Paste maintenance reserve % per team — typically 10-20% for bug fixes, tech debt, support]\n- Number of development sprints: [Confirm from Step 0 context, excluding IP sprint]\n\nProduce the following artifact:\n\n**Artifact 1: PI Capacity Allocation Matrix**\n\n| Team | Avg Velocity/Sprint | # Dev Sprints | Gross Capacity (SP) | Maintenance Reserve % | Net Capacity (SP) | Confidence Notes |\n|------|---------------------|---------------|----------------------|-----------------------|--------------------|------------------|\n| [Team 1] | | | | | | |\n| [Team 2] | | | | | | |\n| ... | | | | | | |\n| **ART Total** | | | | | | |\n\nRules:\n- If velocity data is not provided, flag it as [ASSUMPTION] and use a reasonable estimate based on team size (e.g., 8 SP/sprint per developer as a rough baseline).\n- Confidence Notes should capture any concerns: new team members, upcoming holidays, known distractions, or velocity volatility.\n- Round all numbers to the nearest whole number.\n- Include a summary row showing ART-level totals.',
      expectedOutput:
        'A completed PI Capacity Allocation Matrix table with one row per team plus an ART Total row. Each cell calculated correctly. Assumptions flagged. Confidence notes provided where velocity data is uncertain.',
      artifacts: [
        {
          name: 'PI Capacity Allocation Matrix',
          description:
            'Team-by-team capacity calculation showing gross and net capacity for the PI.',
          format: 'table',
          columns: [
            'Team',
            'Avg Velocity/Sprint',
            '# Dev Sprints',
            'Gross Capacity (SP)',
            'Maintenance Reserve %',
            'Net Capacity (SP)',
            'Confidence Notes',
          ],
        },
      ],
      checkpoint: {
        title: 'Capacity Calculation Verification',
        items: [
          {
            label: 'Velocity figures are accurate',
            description:
              'Each team velocity matches historical data or assumptions are flagged.',
          },
          {
            label: 'Maintenance reserve is appropriate',
            description:
              'Reserve percentages are realistic (typically 10-20%) and justified.',
          },
          {
            label: 'Total net capacity is calculated correctly',
            description:
              'ART total row sums individual team net capacities accurately.',
          },
          {
            label: 'All assumptions are resolved',
            description:
              'Any [ASSUMPTION] flags have been reviewed and confirmed or corrected.',
          },
        ],
        failAction:
          'Correct velocity data, adjust maintenance reserves, and recalculate the capacity matrix before proceeding.',
      },
    },

    // ── Step 2: Feature Decomposition & Prioritization ───────────────────
    {
      id: 2,
      title: 'Feature Decomposition & Prioritization',
      purpose:
        'Break the product backlog into PI-sized features, apply WSJF prioritization scoring, identify the capacity cut line, and flag features that pose sizing or dependency risks.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s decompose and prioritize the feature backlog for this PI.\n\nTake the product backlog and:\n1. Break down any epics into PI-sized features (each feature should be deliverable within 1 PI).\n2. Apply WSJF (Weighted Shortest Job First) scoring to each feature.\n3. Rank features by WSJF score descending.\n4. Identify the capacity cut line based on the Net Capacity from Step 1.\n\nProduct Backlog Input:\n[Paste your product backlog / feature list here — include feature name, description, and any known sizing or priority info]\n\nWSJF Calculation:\n- WSJF = Cost of Delay / Job Duration\n- Cost of Delay = User-Business Value + Time Criticality + Risk Reduction/Opportunity Enablement\n- Use a relative scale of 1-10 for each factor (Fibonacci recommended: 1, 2, 3, 5, 8, 13)\n- Job Duration also on relative scale 1-10\n\nProduce the following artifacts:\n\n**Artifact 2A: Feature Breakdown Table**\n\n| Feature ID | Feature Name | Description | Strategic Theme | Size (SP) | WSJF Score | Target Team(s) | Dependencies |\n|------------|-------------|-------------|-----------------|-----------|------------|-----------------||--------------|\n| F-001 | | | | | | | |\n| F-002 | | | | | | | |\n| ... | | | | | | | |\n\n**Artifact 2B: Capacity vs Demand Summary**\n\n| Metric | Value |\n|--------|-------|\n| Total Feature Demand (SP) | |\n| Total ART Net Capacity (SP) | |\n| Overcommitment Ratio | |\n| Cut Line (after Feature #) | |\n| Features Above Cut Line | |\n| Features Below Cut Line (Stretch/Deferred) | |\n\nFLAGGING RULES — flag any feature where:\n- Feature size > 50% of a single team\'s net capacity (too large — needs decomposition)\n- Feature has no strategic theme alignment (may not belong in this PI)\n- Feature has circular dependencies with another feature\n- Feature cannot be sized due to insufficient information\n\nMark flagged features with a warning indicator and brief explanation.',
      expectedOutput:
        'Artifact 2A: A completed Feature Breakdown Table ranked by WSJF descending with all columns populated. Artifact 2B: A Capacity vs Demand Summary showing the cut line. Flagged features clearly marked with explanations.',
      artifacts: [
        {
          name: 'Feature Breakdown Table',
          description:
            'All PI features decomposed, sized, WSJF-scored, and ranked with theme alignment and dependency references.',
          format: 'table',
          columns: [
            'Feature ID',
            'Feature Name',
            'Description',
            'Strategic Theme',
            'Size (SP)',
            'WSJF Score',
            'Target Team(s)',
            'Dependencies',
          ],
        },
        {
          name: 'Capacity vs Demand Summary',
          description:
            'Aggregate view of total demand versus available capacity with cut line identification.',
          format: 'table',
          columns: ['Metric', 'Value'],
          rows: [
            'Total Feature Demand (SP)',
            'Total ART Net Capacity (SP)',
            'Overcommitment Ratio',
            'Cut Line (after Feature #)',
            'Features Above Cut Line',
            'Features Below Cut Line (Stretch/Deferred)',
          ],
        },
      ],
      checkpoint: {
        title: 'Feature Decomposition Verification',
        items: [
          {
            label: 'WSJF scores are calculated correctly',
            description:
              'Cost of Delay components and Job Duration are scored on a consistent relative scale, and WSJF = CoD / Duration.',
          },
          {
            label: 'Feature sizes are realistic',
            description:
              'No feature exceeds 50% of a single team net capacity without being flagged for decomposition.',
          },
          {
            label: 'Cut line is correctly placed',
            description:
              'Cumulative SP of features above the cut line does not exceed ART net capacity.',
          },
          {
            label: 'No features are missing',
            description:
              'All items from the original backlog are accounted for in the breakdown table.',
          },
          {
            label: 'Flagged items have been reviewed',
            description:
              'All flagged features (oversized, unaligned, circular deps) have been addressed or acknowledged.',
          },
        ],
        failAction:
          'Revisit WSJF scoring, re-decompose oversized features, and adjust the cut line. Re-run Step 2 until the backlog is clean.',
      },
    },

    // ── Step 3: Team Backlog Allocation ──────────────────────────────────
    {
      id: 3,
      title: 'Team Backlog Allocation',
      purpose:
        'Assign features above the cut line to specific teams and sprints, respecting the 90% capacity ceiling, minimizing cross-team dependencies, and identifying genuine stretch objectives.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s allocate features to teams and sprints.\n\nUsing the Feature Breakdown Table (Artifact 2A) and PI Capacity Matrix (Artifact 1), allocate features above the cut line to teams and sprints.\n\nALLOCATION RULES:\n1. No team should exceed 90% of their Net Capacity in committed work.\n2. Remaining capacity (up to 100%) can be designated as stretch objectives.\n3. Minimize cross-team dependencies when assigning features.\n4. Respect feature dependencies — dependent features must be scheduled after their predecessors.\n5. Larger features should be started earlier in the PI to allow for risk mitigation.\n6. Consider team skills and specializations when allocating.\n\nProduce the following artifact:\n\n**Artifact 3: Team Allocation Board**\n\nFor EACH team, produce a sprint-by-sprint allocation table:\n\n**[Team Name] — Net Capacity: [X] SP**\n\n| Sprint | Features | Estimated SP | Cumulative SP | Remaining Capacity |\n|--------|----------|-------------|---------------|-------------------|\n| Sprint 1 | F-001, F-003 | | | |\n| Sprint 2 | F-005 | | | |\n| Sprint 3 | F-008 | | | |\n| Sprint 4 | F-012 (stretch) | | | |\n| ... | | | | |\n\nThen produce a summary table across all teams:\n\n**ART Allocation Summary**\n\n| Team | Allocated SP (Committed) | Net Capacity (SP) | Utilization % | Stretch Objectives | Stretch SP |\n|------|--------------------------|--------------------|--------------|--------------------|------------|\n| [Team 1] | | | | | |\n| [Team 2] | | | | | |\n| ... | | | | | |\n| **ART Total** | | | | | |\n\nFLAGGING RULES — flag any situation where:\n- A team exceeds 90% utilization on committed work\n- A team is assigned features that don\'t match their known skill set\n- Features above the cut line remain unallocated\n- A stretch objective is actually critical (should be committed)\n\nClearly distinguish committed features from stretch objectives in all tables.',
      expectedOutput:
        'Per-team sprint allocation tables showing feature assignments across sprints. An ART Allocation Summary table. Committed work at 85-90% utilization. Stretch objectives clearly separated. All flags addressed.',
      artifacts: [
        {
          name: 'Team Allocation Board',
          description:
            'Sprint-by-sprint feature allocation for each team with cumulative SP tracking.',
          format: 'table',
          columns: [
            'Sprint',
            'Features',
            'Estimated SP',
            'Cumulative SP',
            'Remaining Capacity',
          ],
        },
        {
          name: 'ART Allocation Summary',
          description:
            'Cross-team summary of allocated versus available capacity with utilization percentages and stretch objectives.',
          format: 'table',
          columns: [
            'Team',
            'Allocated SP (Committed)',
            'Net Capacity (SP)',
            'Utilization %',
            'Stretch Objectives',
            'Stretch SP',
          ],
        },
      ],
      checkpoint: {
        title: 'Team Allocation Verification',
        items: [
          {
            label: 'All teams at 85-90% committed utilization',
            description:
              'No team has committed work exceeding 90% of their net capacity.',
          },
          {
            label: 'Stretch objectives are genuine',
            description:
              'Stretch objectives are nice-to-haves, not relabeled critical features.',
          },
          {
            label: 'Team capabilities match assigned features',
            description:
              'Features are assigned to teams with the right skills and domain knowledge.',
          },
          {
            label: 'All above-cut-line features are allocated',
            description:
              'Every feature above the cut line from Step 2 is assigned to a team and sprint.',
          },
          {
            label: 'Dependency ordering is respected',
            description:
              'Features with dependencies are scheduled after their predecessor features.',
          },
        ],
        failAction:
          'Rebalance allocations across teams, decompose features that cannot fit, and re-run Step 3 until utilization targets are met.',
      },
    },

    // ── Step 4: Dependency Mapping ───────────────────────────────────────
    {
      id: 4,
      title: 'Dependency Mapping',
      purpose:
        'Identify all cross-team and external dependencies, build the Program Board representation, and assess dependency risk to ensure the PI plan is feasible.',
      estimatedTime: '10-15 min',
      prompt:
        'Now let\'s map all dependencies across the ART.\n\nReview the Team Allocation Board (Artifact 3) and Feature Breakdown Table (Artifact 2A) to identify ALL dependencies — both cross-team and external.\n\nDEPENDENCY TYPES:\n- **Cross-team**: Team A needs something from Team B (or vice versa)\n- **External**: Dependency on a vendor, another ART, infrastructure team, regulatory body, etc.\n- **Technical**: Shared services, APIs, platforms, environments\n- **Knowledge**: Subject matter expertise needed from outside the team\n\nProduce the following artifacts:\n\n**Artifact 4A: Dependency Register**\n\n| Dep ID | Type | From (Provider) | To (Consumer) | Description | Sprint Needed By | Risk Level (H/M/L) | Status (Open/Mitigated/Resolved) |\n|--------|------|-----------------|---------------|-------------|-----------------|---------------------|----------------------------------|\n| D-001 | Cross-team | Team Alpha | Team Beta | Team Beta needs Auth API from Team Alpha | Sprint 2 | High | Open |\n| D-002 | External | Vendor X | Team Gamma | Payment gateway sandbox access | Sprint 1 | Medium | Open |\n| ... | | | | | | | |\n\n**Artifact 4B: Program Board (Text Representation)**\n\nCreate a text-based Program Board with:\n- Rows = Teams\n- Columns = Sprints (including milestones column)\n- Place feature IDs in the appropriate team/sprint cells\n- Use arrows (-->) to indicate cross-team dependencies\n- Use diamonds (<>) to indicate milestones\n\nExample format:\n```\n           | Sprint 1    | Sprint 2    | Sprint 3    | Sprint 4    | IP Sprint   | Milestones\n-----------+-------------+-------------+-------------+-------------+-------------+-----------\nTeam Alpha | F-001       | F-003       | F-003       |             |             | <> MVP\n           |        \\--> D-001 --> Team Beta                                     |\nTeam Beta  |             | F-005       | F-005, F-007|             |             |\nTeam Gamma | F-002       | F-002       |        \\--> D-002 (ext)  |             | <> Release\n```\n\n**Artifact 4C: Dependency Risk Summary**\n\n| Dependency Category | Count | High Risk | Medium Risk | Low Risk |\n|--------------------|-------|-----------|-------------|----------|\n| Cross-team | | | | |\n| External | | | | |\n| Technical | | | | |\n| Knowledge | | | | |\n| **Total** | | | | |\n\nANALYSIS RULES:\n- Flag any circular dependencies immediately.\n- Flag any external dependency without a confirmed contact or timeline.\n- Flag any dependency needed in Sprint 1 that is not yet confirmed.\n- Verify that dependency timing aligns with the team allocation from Step 3.',
      expectedOutput:
        'Artifact 4A: A complete Dependency Register with all cross-team and external dependencies identified. Artifact 4B: A text-based Program Board showing feature placement and dependency arrows. Artifact 4C: A Dependency Risk Summary by category. All circular or high-risk dependencies flagged.',
      artifacts: [
        {
          name: 'Dependency Register',
          description:
            'Comprehensive register of all cross-team and external dependencies with risk levels and statuses.',
          format: 'table',
          columns: [
            'Dep ID',
            'Type',
            'From (Provider)',
            'To (Consumer)',
            'Description',
            'Sprint Needed By',
            'Risk Level (H/M/L)',
            'Status',
          ],
        },
        {
          name: 'Program Board',
          description:
            'Text-based SAFe Program Board showing features placed by team and sprint with dependency arrows and milestone diamonds.',
          format: 'matrix',
          columns: [
            'Sprint 1',
            'Sprint 2',
            'Sprint 3',
            'Sprint 4',
            'IP Sprint',
            'Milestones',
          ],
          rows: ['(Dynamic: one row per team)'],
        },
        {
          name: 'Dependency Risk Summary',
          description:
            'Aggregated dependency count by category and risk level.',
          format: 'table',
          columns: [
            'Dependency Category',
            'Count',
            'High Risk',
            'Medium Risk',
            'Low Risk',
          ],
          rows: [
            'Cross-team',
            'External',
            'Technical',
            'Knowledge',
            'Total',
          ],
        },
      ],
      checkpoint: {
        title: 'Dependency Mapping Verification',
        items: [
          {
            label: 'All dependencies are captured',
            description:
              'Every cross-team handoff, external dependency, and shared resource is registered.',
          },
          {
            label: 'No circular dependencies exist',
            description:
              'The dependency graph has been checked and no circular chains are present.',
          },
          {
            label: 'External dependencies have realistic assumptions',
            description:
              'Each external dependency has a named contact, expected timeline, or is flagged as high risk.',
          },
          {
            label: 'Dependency timing aligns with allocations',
            description:
              'Provider teams deliver before consumer teams need the dependency, based on sprint scheduling.',
          },
        ],
        failAction:
          'Resolve circular dependencies by re-sequencing features, escalate unconfirmed external dependencies, and adjust the Program Board until timing is feasible.',
      },
    },

    // ── Step 5: ROAM Risk Register ───────────────────────────────────────
    {
      id: 5,
      title: 'ROAM Risk Register',
      purpose:
        'Identify all PI-level risks, categorize them using the SAFe ROAM framework, assign owners, and define mitigation strategies to protect the PI plan.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s build the ROAM Risk Register for this PI.\n\nReview all artifacts produced so far (Capacity Matrix, Feature Breakdown, Allocations, Dependencies) and identify ALL risks that could threaten successful PI execution.\n\nRISK SOURCES TO CONSIDER:\n- Capacity risks (teams near 90%, key person dependencies, velocity uncertainty)\n- Dependency risks (from the Dependency Register — escalate high-risk items)\n- Technical risks (new technology, integration complexity, environment availability)\n- Scope risks (feature ambiguity, changing requirements, late backlog additions)\n- External risks (vendor delays, regulatory changes, market shifts)\n- Organizational risks (team changes, competing priorities, funding uncertainty)\n\nROAM CLASSIFICATION:\n- **Resolved**: Risk is no longer a concern — document how it was resolved\n- **Owned**: Risk is assigned to a specific person who will manage it\n- **Accepted**: Risk is acknowledged and the team will deal with it if it materializes\n- **Mitigated**: A mitigation plan is in place to reduce likelihood or impact\n\nProduce the following artifacts:\n\n**Artifact 5: ROAM Risk Register**\n\n| Risk ID | Description | Category | ROAM Status | Owner | Impact (H/M/L) | Probability (H/M/L) | Mitigation / Resolution | Target Resolution Date |\n|---------|-------------|----------|-------------|-------|-----------------|---------------------|------------------------|----------------------|\n| R-001 | Team Alpha at 92% utilization — risk of overcommitment | Capacity | Owned | [SM Name] | High | Medium | Move F-008 to stretch | Sprint 1 |\n| R-002 | Payment gateway vendor has not confirmed sandbox timeline | External | Mitigated | [PO Name] | High | High | Identified backup vendor; decision by Week 2 | Sprint 1 |\n| ... | | | | | | | | |\n\n**Risk Summary Dashboard**\n\n| ROAM Status | Count | % of Total |\n|------------|-------|------------|\n| Resolved | | |\n| Owned | | |\n| Accepted | | |\n| Mitigated | | |\n| **Total** | | |\n\n**Risk Heatmap Summary**\n\n| | High Impact | Medium Impact | Low Impact |\n|---|------------|---------------|------------|\n| High Probability | [count] | [count] | [count] |\n| Medium Probability | [count] | [count] | [count] |\n| Low Probability | [count] | [count] | [count] |\n\nRULES:\n- Every risk in "Owned" status MUST have a named owner (not a team — a person).\n- Every risk in "Accepted" status MUST have documented rationale for acceptance.\n- Risks from the Dependency Register (Artifact 4A) that are High risk should automatically appear here.\n- Minimum 5 risks should be identified — if fewer, probe deeper into the categories above.',
      expectedOutput:
        'Artifact 5: A completed ROAM Risk Register with at least 5 risks identified, categorized, and classified. A Risk Summary Dashboard showing ROAM status distribution. A Risk Heatmap Summary. All Owned risks have named owners. All Accepted risks have rationale.',
      artifacts: [
        {
          name: 'ROAM Risk Register',
          description:
            'Comprehensive PI risk register using SAFe ROAM classification with owners, impact, probability, and mitigation strategies.',
          format: 'table',
          columns: [
            'Risk ID',
            'Description',
            'Category',
            'ROAM Status',
            'Owner',
            'Impact (H/M/L)',
            'Probability (H/M/L)',
            'Mitigation / Resolution',
            'Target Resolution Date',
          ],
        },
        {
          name: 'Risk Summary Dashboard',
          description:
            'Aggregate count and percentage of risks by ROAM status.',
          format: 'table',
          columns: ['ROAM Status', 'Count', '% of Total'],
          rows: ['Resolved', 'Owned', 'Accepted', 'Mitigated', 'Total'],
        },
        {
          name: 'Risk Heatmap Summary',
          description:
            'Impact vs Probability matrix showing risk concentration areas.',
          format: 'matrix',
          columns: ['High Impact', 'Medium Impact', 'Low Impact'],
          rows: [
            'High Probability',
            'Medium Probability',
            'Low Probability',
          ],
        },
      ],
      checkpoint: {
        title: 'Risk Register Verification',
        items: [
          {
            label: 'Risks are comprehensive',
            description:
              'At least 5 risks identified spanning multiple categories (capacity, dependency, technical, external).',
          },
          {
            label: 'ROAM classification is applied correctly',
            description:
              'Each risk has a valid ROAM status that matches its description and current state.',
          },
          {
            label: 'Every Owned risk has a named owner',
            description:
              'No Owned risk is assigned to a team — each has a specific individual named.',
          },
          {
            label: 'Every Accepted risk has documented rationale',
            description:
              'Acceptance is a conscious decision with reasoning, not a default classification.',
          },
          {
            label: 'High-risk dependencies are included',
            description:
              'All High-risk items from the Dependency Register appear in the ROAM register.',
          },
        ],
        failAction:
          'Add missing risks, reassign ROAM statuses where incorrect, ensure all Owned risks have named owners, and document rationale for all Accepted risks.',
      },
    },

    // ── Step 6: Team PI Objectives ───────────────────────────────────────
    {
      id: 6,
      title: 'Team PI Objectives',
      purpose:
        'Draft 5-10 PI Objectives per team that are outcome-oriented, linked to features and strategic themes, scored for business value, and clearly classified as Committed or Uncommitted.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s draft Team PI Objectives.\n\nUsing the Team Allocation Board (Artifact 3), Feature Breakdown (Artifact 2A), and Strategic Themes from the Context Primer, draft PI Objectives for each team.\n\nPI OBJECTIVE RULES (SAFe 6.0):\n1. Each team should have 5-10 PI Objectives.\n2. Objectives must be outcome-oriented — describe WHAT will be achieved and WHY it matters, not HOW.\n3. Each objective must be classified as either:\n   - **Committed**: The team is confident they can deliver this (high certainty).\n   - **Uncommitted**: The team will attempt this but it depends on favorable conditions (stretch).\n4. Each objective gets a Business Value (BV) score of 1-10 assigned by Business Owners.\n5. Every objective must link to at least one feature and one strategic theme.\n6. Objectives should be testable — it should be clear at the end of the PI whether the objective was met.\n\nProduce the following artifact for EACH team:\n\n**Artifact 6: Team PI Objectives — [Team Name]**\n\n| Obj # | PI Objective | Type (C/U) | Business Value (1-10) | Linked Features | Strategic Theme | Key Dependencies |\n|-------|-------------|------------|----------------------|-----------------|-----------------|------------------|\n| 1 | Enable real-time payment processing for all merchant tiers, reducing transaction latency by 40% | C | 8 | F-001, F-003 | Performance & Scale | D-001 (Team Beta API) |\n| 2 | Deliver sandbox environment for partner integrations, enabling 3 pilot partners to begin testing | U | 6 | F-005 | Ecosystem Growth | D-002 (Vendor X) |\n| ... | | | | | | |\n\nThen produce an ART-Level Summary:\n\n**ART PI Objectives Summary**\n\n| Team | # Committed | # Uncommitted | Total Planned BV | Avg BV/Objective |\n|------|------------|---------------|------------------|------------------|\n| [Team 1] | | | | |\n| [Team 2] | | | | |\n| ... | | | | |\n| **ART Total** | | | | |\n\nQUALITY CHECKS:\n- Objectives should NOT be task descriptions (e.g., "Complete coding of F-001" is a task, not an objective).\n- Committed vs Uncommitted must be honest — if a feature has unresolved dependencies, its objective should be Uncommitted.\n- BV scores should reflect strategic priority — higher BV for objectives aligned with top strategic themes.\n- Cross-reference BV scores with WSJF from Step 2 — they should be directionally consistent.',
      expectedOutput:
        'Per-team PI Objectives tables with 5-10 objectives each, classified C/U, scored for BV, linked to features and themes. An ART-Level Summary table. All objectives are outcome-oriented and testable.',
      artifacts: [
        {
          name: 'Team PI Objectives',
          description:
            'Per-team table of 5-10 PI Objectives with Committed/Uncommitted classification, business value scoring, and feature/theme linkage.',
          format: 'table',
          columns: [
            'Obj #',
            'PI Objective',
            'Type (C/U)',
            'Business Value (1-10)',
            'Linked Features',
            'Strategic Theme',
            'Key Dependencies',
          ],
        },
        {
          name: 'ART PI Objectives Summary',
          description:
            'Aggregate view of committed vs uncommitted objectives and total planned business value across all teams.',
          format: 'table',
          columns: [
            'Team',
            '# Committed',
            '# Uncommitted',
            'Total Planned BV',
            'Avg BV/Objective',
          ],
        },
      ],
      checkpoint: {
        title: 'PI Objectives Verification',
        items: [
          {
            label: 'Objectives are outcomes, not tasks',
            description:
              'Each objective describes a business outcome or capability delivered, not a technical task.',
          },
          {
            label: 'Committed/Uncommitted classification is honest',
            description:
              'Objectives with unresolved dependencies or high-risk items are marked Uncommitted.',
          },
          {
            label: 'Business Value reflects strategic priorities',
            description:
              'BV scores are directionally consistent with WSJF rankings and strategic theme importance.',
          },
          {
            label: 'Every objective links to features and themes',
            description:
              'No orphan objectives exist — each is traceable to at least one feature and one strategic theme.',
          },
          {
            label: 'Each team has 5-10 objectives',
            description:
              'Objective count per team falls within the SAFe recommended range.',
          },
        ],
        failAction:
          'Rewrite task-oriented objectives as outcomes, adjust C/U classification based on risk and dependency status, and reconcile BV scores with WSJF rankings.',
      },
    },

    // ── Step 7: Confidence Vote & Final Pack ─────────────────────────────
    {
      id: 7,
      title: 'Confidence Vote & Final Pack',
      purpose:
        'Conduct the team confidence vote on the PI plan, ensure the average meets the SAFe threshold of 3 or above, and consolidate all artifacts into a complete PI Planning Pack ready for stakeholder distribution.',
      estimatedTime: '10 min',
      prompt:
        'Let\'s conduct the confidence vote and assemble the final PI Planning Pack.\n\nCONFIDENCE VOTE PROCESS (SAFe 6.0):\nEach team votes on their confidence in delivering their committed PI Objectives on a scale of 1-5:\n- **5**: Very high confidence — no significant risks or concerns\n- **4**: High confidence — minor risks that are manageable\n- **3**: Moderate confidence — some concerns but plan is achievable\n- **2**: Low confidence — significant concerns that need to be addressed\n- **1**: Very low confidence — plan is not achievable as currently defined\n\nRULES:\n- The ART average confidence must be >= 3 to proceed.\n- Any team voting 1 or 2 must explain their concerns and a re-planning action must be identified.\n- Confidence votes should reflect the CURRENT state of the plan (after all Steps 1-6).\n\nBased on the current state of all artifacts, estimate each team\'s likely confidence level and explain the key factors.\n\n[If you have actual team confidence votes, paste them here to override the AI estimates]\n\n**Artifact 7A: Confidence Vote Summary**\n\n| Team | Confidence (1-5) | Key Confidence Factors | Re-planning Needed? | Re-planning Actions |\n|------|------------------|----------------------|--------------------|--------------------||\n| [Team 1] | | | | |\n| [Team 2] | | | | |\n| ... | | | | |\n| **ART Average** | | | | |\n\nIf ART average < 3, identify specific actions to improve confidence:\n- Which features need to be descoped or moved to stretch?\n- Which dependencies need to be resolved?\n- Which risks need immediate mitigation?\n\n**Artifact 7B: PI Planning Pack (Consolidated)**\n\nNow assemble the complete PI Planning Pack by compiling all artifacts into a single structured document with the following sections:\n\n1. **PI Overview** — PI name, dates, cadence, strategic themes, ART teams\n2. **Capacity Summary** — Artifact 1 (PI Capacity Allocation Matrix)\n3. **Feature Backlog** — Artifact 2A (Feature Breakdown Table) + Artifact 2B (Capacity vs Demand)\n4. **Team Allocations** — Artifact 3 (Team Allocation Board + ART Allocation Summary)\n5. **Program Board** — Artifact 4B (Program Board visualization)\n6. **Dependency Register** — Artifact 4A (Dependency Register) + Artifact 4C (Dependency Risk Summary)\n7. **Risk Register** — Artifact 5 (ROAM Risk Register + Risk Summary Dashboard + Heatmap)\n8. **PI Objectives** — Artifact 6 (Team PI Objectives + ART Summary)\n9. **Confidence Vote** — Artifact 7A (Confidence Vote Summary)\n\nInclude a header with:\n- PI Name and Dates\n- ART Name\n- RTE Name\n- Date of PI Planning\n- Document version\n- Participants\n\nEnd with an **Open Items & Action Register**:\n\n| Item # | Description | Owner | Due Date | Status |\n|--------|-------------|-------|----------|--------|\n| | | | | |\n\nThis is the final deliverable. Ensure it is complete, consistent, and ready for distribution to all stakeholders.',
      expectedOutput:
        'Artifact 7A: A Confidence Vote Summary with per-team scores and an ART average >= 3. Artifact 7B: A fully consolidated PI Planning Pack containing all 9 sections, a document header, and an Open Items & Action Register. The pack is self-contained and ready for stakeholder distribution.',
      artifacts: [
        {
          name: 'Confidence Vote Summary',
          description:
            'Per-team confidence scores on a 1-5 scale with rationale, re-planning flags, and ART average.',
          format: 'table',
          columns: [
            'Team',
            'Confidence (1-5)',
            'Key Confidence Factors',
            'Re-planning Needed?',
            'Re-planning Actions',
          ],
        },
        {
          name: 'PI Planning Pack',
          description:
            'Consolidated document containing all PI Planning artifacts (9 sections), document header, and Open Items & Action Register.',
          format: 'text',
        },
      ],
      checkpoint: {
        title: 'Confidence Vote & Final Pack Verification',
        items: [
          {
            label: 'ART average confidence is >= 3',
            description:
              'The weighted average confidence across all teams meets the SAFe threshold of 3 or above.',
          },
          {
            label: 'Low-confidence teams have re-planning actions',
            description:
              'Any team voting 1 or 2 has specific, actionable re-planning steps identified.',
          },
          {
            label: 'PI Planning Pack is complete',
            description:
              'All 9 sections are present, properly formatted, and internally consistent.',
          },
          {
            label: 'All assumptions are resolved',
            description:
              'No unresolved [ASSUMPTION] tags remain in the final pack — all have been confirmed or corrected.',
          },
          {
            label: 'Open items have owners and due dates',
            description:
              'Every item in the Open Items & Action Register has an assigned owner and a target date.',
          },
        ],
        failAction:
          'If confidence < 3, descope features, resolve blocking dependencies, and re-run Steps 3-7 until confidence threshold is met. If the pack is incomplete, fill in missing sections before finalizing.',
      },
    },
  ],
  requiredInputs: [
    {
      name: 'Team Roster & Structure',
      description:
        'ART team roster including team names, team sizes, Scrum Master names, and any specializations or cross-functional notes.',
      format:
        'Table or list: Team Name | Size | Scrum Master | Specializations',
    },
    {
      name: 'PI Cadence',
      description:
        'Program Increment timing details including number of sprints, sprint duration, whether an IP sprint is included, and PI start/end dates.',
      format:
        'Structured text: # Sprints, Sprint Duration, IP Sprint (Y/N), PI Start Date, PI End Date',
    },
    {
      name: 'Strategic Themes',
      description:
        'Three to five strategic themes guiding this PI, each with a name and brief description of expected business outcomes.',
      format: 'List: Theme Name — Description (3-5 themes)',
    },
    {
      name: 'Product Backlog / Feature List',
      description:
        'The current product backlog or feature list to be planned into the PI. Should include feature names, descriptions, and any known sizing or priority information.',
      format:
        'Table or list: Feature Name | Description | Estimated Size | Priority/Notes',
    },
    {
      name: 'Team Velocity Data',
      description:
        'Average velocity per sprint for each team, ideally based on the last 3 PI average. Used for capacity calculation.',
      format: 'Table: Team Name | Avg Velocity/Sprint (SP)',
    },
    {
      name: 'Maintenance Reserve Percentages',
      description:
        'Percentage of capacity reserved for maintenance, bug fixes, tech debt, and support per team. Typically 10-20%.',
      format: 'Table: Team Name | Maintenance Reserve %',
    },
  ],
  artifactsProduced: [
    'Session Context Summary',
    'PI Capacity Allocation Matrix',
    'Feature Breakdown Table',
    'Capacity vs Demand Summary',
    'Team Allocation Board',
    'ART Allocation Summary',
    'Dependency Register',
    'Program Board',
    'Dependency Risk Summary',
    'ROAM Risk Register',
    'Risk Summary Dashboard',
    'Risk Heatmap Summary',
    'Team PI Objectives',
    'ART PI Objectives Summary',
    'Confidence Vote Summary',
    'PI Planning Pack',
  ],
  tier: 'premium',
  price: 29700,
  suiteId: 'safe-suite',
};
