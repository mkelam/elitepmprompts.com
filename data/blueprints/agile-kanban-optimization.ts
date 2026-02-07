import type { Blueprint } from '@/lib/types';

export const agileKanbanOptimization: Blueprint = {
  id: 'agile-kanban-optimization',
  slug: 'agile-kanban-optimization',
  title: 'Agile Kanban Flow Optimizer',
  subtitle:
    'AI-guided Kanban board optimization with WIP limit analysis, flow metrics, bottleneck identification, cycle time reduction strategies, and continuous improvement planning — aligned with Kanban Method principles.',
  methodology: 'Agile',
  version: '1.0',
  estimatedTime: '45-60 minutes',
  stepCount: 5,
  tier: 'premium',
  price: 29700,
  suiteId: 'agile-suite',
  requiredInputs: [
    {
      name: 'Current Board Structure',
      description:
        'The current Kanban board layout including all columns/stages, any sub-columns (e.g., Doing/Done splits), and swimlanes if applicable.',
      format: 'Table or list with Column Name, Sub-columns (if any), Swimlane (if any), Current Item Count',
    },
    {
      name: 'WIP Limits',
      description:
        'Existing WIP limits per column (if any are set). Include whether limits are enforced or advisory.',
      format: 'Table with Column Name, Current WIP Limit, Enforcement (Hard/Soft/None)',
    },
    {
      name: 'Team Composition',
      description:
        'Team size, roles, specializations, and any shared resources across teams or columns.',
      format: 'Table with Team Member/Role, Specialization, Columns They Work In, Availability %',
    },
    {
      name: 'Work Item Types',
      description:
        'The types of work items flowing through the board (e.g., features, bugs, tech debt, expedite) with relative proportions.',
      format: 'Table with Work Item Type, Approximate % of Total Work, Average Size/Effort, Priority Class',
    },
    {
      name: 'Flow Data',
      description:
        'Historical cycle time, lead time, and throughput data for the past 4-12 weeks. Include any available data on blocked items, wait times, and rework rates.',
      format: 'Table with Week/Period, Items Started, Items Completed, Avg Cycle Time (days), Avg Lead Time (days), Blocked Items Count',
    },
  ],
  artifactsProduced: [
    'Session Context Summary',
    'Flow Metrics Dashboard',
    'Cumulative Flow Diagram Analysis',
    'Bottleneck Analysis Matrix',
    'WIP Limit Recommendation Table',
    'Process Policy Register',
    'Service Level Expectation Matrix',
    'Improvement Experiment Board',
    'Kanban Optimization Summary',
  ],
  steps: [
    {
      id: 0,
      title: 'Context Primer',
      purpose:
        'Establish the AI as a Kanban Coach and Flow Advisor, ingest all current board data, team context, and flow metrics to build a comprehensive baseline understanding before analysis begins.',
      estimatedTime: '5 minutes',
      prompt: `You are now operating as a **Kanban Coach and Flow Advisor** — an expert in the Kanban Method (as defined by David J. Anderson), Lean flow principles, and continuous improvement practices. You specialize in optimizing knowledge work systems through visualization, WIP limitation, flow management, and evolutionary change.

Your role in this session is to:
- Analyze the team's current Kanban system and identify optimization opportunities.
- Apply flow-based thinking grounded in queueing theory and Little's Law.
- Provide actionable, data-driven recommendations — never generic advice.
- Flag assumptions clearly using [ASSUMPTION] tags whenever data is incomplete.

**Context — Current Board Structure:**
[PASTE_BOARD_STRUCTURE_HERE]
Format: Column Name | Sub-columns | Swimlane | Current Item Count

**Context — Current WIP Limits:**
[PASTE_WIP_LIMITS_HERE]
Format: Column Name | Current WIP Limit | Enforcement (Hard/Soft/None)

**Context — Team Composition:**
[PASTE_TEAM_COMPOSITION_HERE]
Format: Team Member/Role | Specialization | Columns They Work In | Availability %

**Context — Work Item Types:**
[PASTE_WORK_ITEM_TYPES_HERE]
Format: Work Item Type | Approximate % of Total Work | Average Size/Effort | Priority Class

**Context — Flow Data (last 4-12 weeks):**
[PASTE_FLOW_DATA_HERE]
Format: Week/Period | Items Started | Items Completed | Avg Cycle Time (days) | Avg Lead Time (days) | Blocked Items Count

**Additional Context:**
- Industry/Domain: [INDUSTRY_OR_DOMAIN]
- Team maturity with Kanban: [BEGINNER / INTERMEDIATE / ADVANCED]
- Primary pain points: [DESCRIBE_TOP_3_PAIN_POINTS]
- Any upcoming changes (team size, product pivot, etc.): [UPCOMING_CHANGES_OR_NONE]

**Instructions:**

Produce a **Session Context Summary** that includes:

1. **System Overview** — A 3-5 sentence summary of the Kanban system being analyzed: board structure, team size, work item mix, and current flow health at a glance.

2. **Data Completeness Assessment** — Rate the quality and completeness of the provided data:
   | Data Category | Status | Notes |
   |---------------|--------|-------|
   | Board Structure | Complete / Partial / Missing | [Notes on any gaps] |
   | WIP Limits | Complete / Partial / Missing | [Notes] |
   | Team Composition | Complete / Partial / Missing | [Notes] |
   | Work Item Types | Complete / Partial / Missing | [Notes] |
   | Flow Data | Complete / Partial / Missing | [Notes — specify timeframe coverage] |

   For any category marked "Partial" or "Missing", note the specific data gaps and state what assumptions will be made using [ASSUMPTION] tags.

3. **Initial Observations** — List 3-5 preliminary observations based on the raw data before deep analysis. These should be factual observations, not recommendations (e.g., "The Development column has 12 items against a WIP limit of 5" rather than "You should lower WIP").

4. **Analysis Roadmap** — Confirm the four analysis steps that will follow:
   - Step 1: Flow Metrics Analysis
   - Step 2: Bottleneck Identification & WIP Analysis
   - Step 3: Process Policy & SLE Definition
   - Step 4: Continuous Improvement Plan

Produce all outputs in clean markdown.`,
      expectedOutput:
        'A Session Context Summary containing a system overview, data completeness assessment table with gap identification and assumption flags, 3-5 initial factual observations, and a confirmed analysis roadmap for the remaining steps.',
      artifacts: [
        {
          name: 'Session Context Summary',
          description:
            'Comprehensive baseline summary of the Kanban system including data completeness assessment, initial observations, and analysis roadmap.',
          format: 'text',
        },
      ],
      checkpoint: {
        title: 'Context Primer Validation',
        items: [
          {
            label: 'All five input data categories are acknowledged',
            description:
              'The summary explicitly addresses board structure, WIP limits, team composition, work item types, and flow data — even if some are missing.',
          },
          {
            label: 'Data gaps are identified with [ASSUMPTION] tags',
            description:
              'Any missing or partial data is flagged, and the assumptions that will be made in subsequent steps are clearly stated.',
          },
          {
            label: 'Initial observations are factual, not prescriptive',
            description:
              'Observations describe what is seen in the data (e.g., "WIP exceeds limits in 3 columns") rather than jumping to recommendations.',
          },
          {
            label: 'Analysis roadmap confirms all four remaining steps',
            description:
              'The roadmap lists Steps 1-4 with brief descriptions, confirming the full analysis scope.',
          },
        ],
        failAction:
          'Review the five input data categories and add any that were overlooked in the summary. Add [ASSUMPTION] tags for any data gaps that were not flagged. Rewrite any observations that contain recommendations — they should be purely factual at this stage. Ensure the roadmap lists all four analysis steps.',
      },
    },
    {
      id: 1,
      title: 'Flow Metrics Analysis',
      purpose:
        'Analyze the current state of flow across the Kanban system by calculating key flow metrics — cycle time, lead time, throughput, and WIP — to establish a quantitative baseline for optimization.',
      estimatedTime: '10 minutes',
      prompt: `You are continuing the Kanban Flow Optimization session as a Kanban Coach and Flow Advisor.

**Input — Session Context Summary from Step 0:**
[PASTE_SESSION_CONTEXT_SUMMARY_HERE]

**Input — Raw Flow Data:**
[PASTE_FLOW_DATA_HERE]
Format: Week/Period | Items Started | Items Completed | Avg Cycle Time (days) | Avg Lead Time (days) | Blocked Items Count

**Input — Current Board Snapshot:**
[PASTE_CURRENT_BOARD_WITH_ITEM_COUNTS_PER_COLUMN]

**Instructions:**

1. **Flow Metrics Dashboard** — Calculate and present the following metrics in a comprehensive dashboard table:

   | Metric | Current Value | Target Value | Trend (Last 4 Weeks) | Health Status |
   |--------|---------------|--------------|----------------------|---------------|
   | Average Cycle Time | [X days] | [Target based on analysis] | [Improving / Stable / Degrading] | [Healthy / At Risk / Critical] |
   | Cycle Time 85th Percentile | [X days] | [Target] | [Trend] | [Status] |
   | Average Lead Time | [X days] | [Target] | [Trend] | [Status] |
   | Throughput (items/week) | [X items] | [Target] | [Trend] | [Status] |
   | Throughput Variability (Std Dev) | [X] | [Target < 20% of mean] | [Trend] | [Status] |
   | Total WIP | [X items] | [Target based on Little's Law] | [Trend] | [Status] |
   | WIP-to-Throughput Ratio | [X] | [Target] | [Trend] | [Status] |
   | Flow Efficiency | [X%] | [Target > 40%] | [Trend] | [Status] |
   | Blocked Items Rate | [X%] | [Target < 10%] | [Trend] | [Status] |
   | Rework Rate | [X% or N/A] | [Target < 5%] | [Trend] | [Status] |

   Calculation notes:
   - **Flow Efficiency** = Active Work Time / Total Cycle Time x 100. If active vs. wait time is not directly available, estimate based on column structure (active columns vs. queue/buffer columns) and flag with [ASSUMPTION].
   - **WIP-to-Throughput Ratio**: Use Little's Law — Avg Cycle Time = WIP / Throughput. If the ratio does not match reported cycle time, flag the discrepancy.
   - **Health Status**: Healthy = within target range, At Risk = within 20% of critical threshold, Critical = exceeding critical threshold.
   - **Target Values**: Derive targets from the data trends, team capacity, and Kanban Method benchmarks. State the rationale for each target briefly.

2. **Cumulative Flow Diagram (CFD) Analysis** — Since we cannot render a visual chart, produce the data analysis that a CFD would reveal:

   | Week | Backlog (Cumulative In) | [Column 1] | [Column 2] | ... | Done (Cumulative Out) |
   |------|------------------------|------------|------------|-----|----------------------|

   Then analyze the CFD data for:
   - **Band width trends**: Are any column bands widening over time? (Indicates WIP accumulation.)
   - **Arrival vs. departure rate**: Is the team completing work at the rate it arrives? (Parallel bands = stable; diverging = unsustainable.)
   - **Staircase patterns**: Are there periods of no completions followed by batch completions? (Indicates batch-and-queue behavior.)
   - **Flat lines**: Are there periods where no new work enters? (Indicates starved columns.)

   Summarize CFD findings in 3-5 bullet points.

3. **Little's Law Validation** — Apply Little's Law (Avg Cycle Time = Avg WIP / Avg Throughput) to validate data consistency:
   - Calculate the expected cycle time from WIP and throughput data.
   - Compare against reported/measured cycle time.
   - If there is a significant discrepancy (>15%), explain possible causes (e.g., items aging in the system, inconsistent tracking, batch arrivals).

4. **Flow Health Summary** — Provide an overall flow health rating:
   - **Overall Rating**: Healthy / Needs Attention / Critical
   - **Top 3 Flow Issues**: Ranked by impact on cycle time and predictability.
   - **Quick Wins**: 1-2 improvements that can be made immediately based on the metrics alone (before deeper bottleneck analysis in Step 2).

Produce all outputs in clean markdown. Flag any metric that relies on estimated or incomplete data with [ASSUMPTION].`,
      expectedOutput:
        'A Flow Metrics Dashboard table with 10 key metrics including current values, targets, trends, and health status. A Cumulative Flow Diagram data analysis with band width, arrival/departure rate, and pattern observations. A Little\'s Law validation check. And a Flow Health Summary with overall rating, top 3 issues, and quick wins.',
      artifacts: [
        {
          name: 'Flow Metrics Dashboard',
          description:
            'Comprehensive dashboard of key Kanban flow metrics with current values, data-driven targets, trend indicators, and health status ratings.',
          format: 'table',
          columns: [
            'Metric',
            'Current Value',
            'Target Value',
            'Trend',
            'Health Status',
          ],
        },
        {
          name: 'Cumulative Flow Diagram Analysis',
          description:
            'Data-driven analysis of cumulative flow patterns including band width trends, arrival vs. departure rates, and batch behavior identification.',
          format: 'text',
        },
      ],
      checkpoint: {
        title: 'Flow Metrics Validation',
        items: [
          {
            label: 'All 10 dashboard metrics are calculated and presented',
            description:
              'The Flow Metrics Dashboard includes all 10 rows: Avg Cycle Time, 85th Percentile Cycle Time, Avg Lead Time, Throughput, Throughput Variability, Total WIP, WIP-to-Throughput Ratio, Flow Efficiency, Blocked Items Rate, and Rework Rate.',
          },
          {
            label: 'Target values have stated rationale',
            description:
              'Each target value in the dashboard is accompanied by a brief rationale explaining how it was derived (benchmarks, Little\'s Law, capacity analysis, or trend projection).',
          },
          {
            label: 'Little\'s Law validation is performed',
            description:
              'The analysis explicitly calculates expected cycle time from WIP/Throughput and compares it to the reported cycle time, noting any discrepancy.',
          },
          {
            label: 'CFD analysis identifies at least 3 patterns',
            description:
              'The Cumulative Flow Diagram analysis discusses band width trends, arrival vs. departure rates, and at least one additional pattern (staircase, flat lines, or other anomaly).',
          },
          {
            label: 'Assumptions are flagged with [ASSUMPTION] tags',
            description:
              'Any metric calculated from estimated or incomplete data is marked with [ASSUMPTION] and the estimation method is stated.',
          },
        ],
        failAction:
          'Add any missing metrics to the dashboard — all 10 rows are required. Provide rationale for any target values listed without justification. Perform the Little\'s Law validation if it was skipped. Expand the CFD analysis to cover at least 3 distinct patterns. Add [ASSUMPTION] tags to any metrics based on estimated data.',
      },
    },
    {
      id: 2,
      title: 'Bottleneck Identification & WIP Analysis',
      purpose:
        'Identify systemic bottlenecks, blocked item patterns, and WIP limit violations across the board to pinpoint the primary constraints limiting flow and predictability.',
      estimatedTime: '10 minutes',
      prompt: `You are continuing the Kanban Flow Optimization session as a Kanban Coach and Flow Advisor.

**Input — Flow Metrics Dashboard and CFD Analysis from Step 1:**
[PASTE_FLOW_METRICS_DASHBOARD_HERE]
[PASTE_CFD_ANALYSIS_HERE]

**Input — Current Board Structure with Item Counts:**
[PASTE_BOARD_STRUCTURE_WITH_COUNTS_HERE]
Format: Column Name | Sub-columns | Current Item Count | WIP Limit | Items Blocked

**Input — Team Composition (from Step 0):**
[PASTE_TEAM_COMPOSITION_HERE]

**Input — Work Item Type Breakdown (from Step 0):**
[PASTE_WORK_ITEM_TYPES_HERE]

**Instructions:**

1. **Bottleneck Analysis Matrix** — For each column/stage on the board, produce a detailed bottleneck analysis:

   | Column/Stage | Avg Items in Column | WIP Limit | Violation % (weeks over limit) | Avg Wait Time (days) | Root Cause | Recommended Action |
   |-------------|--------------------:|-----------|-------------------------------|--------------------:|------------|-------------------|
   | [Column 1]  | [X]                 | [Y or None] | [Z%]                        | [W days]            | [Root cause analysis] | [Specific action] |
   | [Column 2]  | [X]                 | [Y or None] | [Z%]                        | [W days]            | [Root cause analysis] | [Specific action] |
   | ...         | ...                 | ...       | ...                           | ...                 | ...        | ...               |

   For each column, analyze:
   - **Avg Items in Column**: Mean number of items residing in this column over the measurement period.
   - **WIP Limit**: Current limit (or "None" if no limit is set).
   - **Violation %**: What percentage of the measurement period was the WIP limit exceeded? If no limit is set, calculate what a reasonable limit would be and show the theoretical violation rate.
   - **Avg Wait Time**: Average time items spend waiting (not being actively worked) in this column. If not directly available, estimate from cycle time vs. active time and mark with [ASSUMPTION].
   - **Root Cause**: Identify the most likely root cause for any bottleneck (e.g., "Specialist constraint — only 1 QA engineer for 6 developers", "Batch handoffs from upstream", "External dependency delays", "No WIP limit — work accumulates without signal").
   - **Recommended Action**: Specific, actionable recommendation to address the root cause.

   Identify the **primary bottleneck** (the single column most constraining overall throughput) and the **secondary bottleneck** (the column that would become the constraint if the primary were resolved).

2. **Blocked Items Analysis** — Analyze patterns in blocked work:

   | Block Category | Frequency (% of blocks) | Avg Block Duration (days) | Most Affected Column | Recommended Mitigation |
   |---------------|------------------------:|------------------------:|---------------------|----------------------|
   | External Dependencies | [X%] | [Y days] | [Column] | [Mitigation] |
   | Missing Requirements | [X%] | [Y days] | [Column] | [Mitigation] |
   | Environment/Tooling | [X%] | [Y days] | [Column] | [Mitigation] |
   | Review/Approval Delays | [X%] | [Y days] | [Column] | [Mitigation] |
   | Specialist Unavailability | [X%] | [Y days] | [Column] | [Mitigation] |
   | [Other categories as needed] | ... | ... | ... | ... |

   If detailed block categorization data is not available, infer the most likely block categories from the board structure, team composition, and flow data. Flag inferences with [ASSUMPTION].

3. **WIP Limit Recommendation Table** — Based on the bottleneck analysis, recommend optimized WIP limits:

   | Column | Current WIP Limit | Current Avg WIP | Recommended WIP Limit | Rationale | Expected Impact |
   |--------|------------------:|----------------:|----------------------:|-----------|----------------|
   | [Column 1] | [X or None] | [Y] | [Z] | [Why this number] | [Expected cycle time or throughput improvement] |
   | ...    | ...               | ...             | ...                   | ...       | ...            |

   Apply these principles when setting recommendations:
   - **Little's Law**: Target WIP = Target Throughput x Target Cycle Time. If target throughput is 5 items/week and target cycle time per column is 2 days, then WIP limit = 5 x (2/5) = 2 items.
   - **Team capacity**: WIP should not exceed the number of people who can actively work items in that column (with a small buffer for handoff overlap).
   - **Bottleneck protection**: The column immediately upstream of the primary bottleneck should have a tight WIP limit to prevent queue buildup.
   - **Start with conservative limits**: It is better to start too tight and loosen than too loose and tighten. Recommend limits that will surface problems quickly.

4. **Constraint Theory Application** — Apply the Theory of Constraints (TOC) five focusing steps to the primary bottleneck:
   - **Identify**: [State the primary constraint]
   - **Exploit**: [How to maximize throughput at the constraint without adding resources]
   - **Subordinate**: [How to adjust upstream and downstream processes to support the constraint]
   - **Elevate**: [Investment options to increase the constraint's capacity]
   - **Repeat**: [What the next constraint would likely be after this one is resolved]

Produce all outputs in clean markdown. Flag any analysis based on estimated data with [ASSUMPTION].`,
      expectedOutput:
        'A Bottleneck Analysis Matrix identifying root causes and actions for every board column, a Blocked Items Analysis categorizing block patterns with mitigations, a WIP Limit Recommendation Table with data-driven limits and expected impact, and a Theory of Constraints application to the primary bottleneck.',
      artifacts: [
        {
          name: 'Bottleneck Analysis Matrix',
          description:
            'Column-by-column bottleneck analysis with average WIP, WIP limit violation rates, wait times, root causes, and recommended actions.',
          format: 'table',
          columns: [
            'Column/Stage',
            'Avg Items',
            'WIP Limit',
            'Violation %',
            'Avg Wait Time',
            'Root Cause',
            'Recommended Action',
          ],
        },
        {
          name: 'WIP Limit Recommendation Table',
          description:
            'Optimized WIP limit recommendations per column with current state comparison, rationale grounded in Little\'s Law and capacity analysis, and expected flow impact.',
          format: 'table',
          columns: [
            'Column',
            'Current WIP Limit',
            'Current Avg WIP',
            'Recommended WIP Limit',
            'Rationale',
            'Expected Impact',
          ],
        },
      ],
      checkpoint: {
        title: 'Bottleneck & WIP Analysis Validation',
        items: [
          {
            label: 'Every board column appears in the Bottleneck Analysis Matrix',
            description:
              'No column from the board structure is missing. Each column has values for all seven fields (Avg Items, WIP Limit, Violation %, Avg Wait Time, Root Cause, Recommended Action).',
          },
          {
            label: 'Primary and secondary bottlenecks are explicitly identified',
            description:
              'The analysis names the single primary bottleneck column and the secondary bottleneck, with reasoning for each designation.',
          },
          {
            label: 'WIP limit recommendations use quantitative rationale',
            description:
              'Each recommended WIP limit cites a specific calculation (Little\'s Law, team capacity, or bottleneck protection) — not just "lower is better" or arbitrary numbers.',
          },
          {
            label: 'Theory of Constraints five steps are applied',
            description:
              'All five TOC focusing steps (Identify, Exploit, Subordinate, Elevate, Repeat) are addressed for the primary bottleneck with specific, actionable content.',
          },
          {
            label: 'Blocked items analysis covers at least 3 categories',
            description:
              'The Blocked Items Analysis includes at least 3 distinct block categories with frequency, duration, affected column, and mitigation strategy.',
          },
        ],
        failAction:
          'Add any missing columns to the Bottleneck Analysis Matrix. Explicitly name the primary and secondary bottlenecks if not stated. Replace vague WIP limit rationale with specific calculations showing the formula and inputs used. Complete all five TOC focusing steps if any are missing. Expand the Blocked Items Analysis to cover at least 3 categories, using [ASSUMPTION]-flagged inferences if direct data is unavailable.',
      },
    },
    {
      id: 3,
      title: 'Process Policy & SLE Definition',
      purpose:
        'Define explicit process policies for each board column and establish Service Level Expectations (SLEs) for each work item type to create shared understanding and predictable delivery commitments.',
      estimatedTime: '10 minutes',
      prompt: `You are continuing the Kanban Flow Optimization session as a Kanban Coach and Flow Advisor.

**Input — Bottleneck Analysis Matrix and WIP Recommendations from Step 2:**
[PASTE_BOTTLENECK_ANALYSIS_MATRIX_HERE]
[PASTE_WIP_LIMIT_RECOMMENDATIONS_HERE]

**Input — Current Board Structure (from Step 0):**
[PASTE_BOARD_STRUCTURE_HERE]

**Input — Work Item Types (from Step 0):**
[PASTE_WORK_ITEM_TYPES_HERE]

**Input — Flow Metrics Dashboard (from Step 1):**
[PASTE_FLOW_METRICS_DASHBOARD_HERE]

**Instructions:**

1. **Process Policy Register** — For each column/stage on the Kanban board, define explicit process policies:

   | Stage | Policy Description | Entry Criteria | Exit Criteria | WIP Limit | SLE Target |
   |-------|-------------------|----------------|---------------|-----------|------------|
   | Backlog / To Do | [Clear policy on how items enter this column] | [What qualifies an item to enter] | [What must be true before pulling to next column] | [Recommended WIP limit from Step 2] | [Target time in column] |
   | [Next Column] | [Policy] | [Entry Criteria] | [Exit Criteria] | [WIP Limit] | [SLE Target] |
   | ... | ... | ... | ... | ... | ... |

   For each column, ensure:
   - **Policy Description**: A concise statement (1-2 sentences) describing the purpose and rules for this column. This should be specific enough that a new team member could understand what happens here.
   - **Entry Criteria**: Explicit conditions that must be met before an item can be pulled into this column. Use a checklist format (e.g., "Requirements documented, Acceptance criteria defined, Dependencies identified").
   - **Exit Criteria**: Conditions that must be met before an item can move to the next column. These should be objective and verifiable (e.g., "All unit tests passing, Code review approved, No known defects").
   - **WIP Limit**: Use the recommended WIP limit from Step 2. If Step 2 suggested "None", recommend an initial limit with rationale.
   - **SLE Target**: The target time an item should spend in this column. Derive from the overall cycle time target divided proportionally across columns based on the nature of work in each.

   Additionally, define these cross-cutting policies:
   - **Pull Policy**: Items are pulled (not pushed). Describe who pulls, when, and the priority order for pulling (e.g., "Pull blocked items first, then oldest items, then highest priority").
   - **Blocked Item Policy**: When an item is blocked, what happens? (e.g., "Flag immediately, notify team lead, swarm within 4 hours, escalate after 24 hours").
   - **Expedite Policy**: How are urgent/expedite items handled? (e.g., "Expedite lane with WIP limit of 1, bypasses normal queue, requires manager approval").
   - **Discard Policy**: When is it acceptable to discard or return items? (e.g., "Items blocked for >5 days are reviewed for discard. Items in backlog >30 days without activity are archived").

2. **Service Level Expectation (SLE) Matrix** — Define SLEs for each work item type:

   | Work Item Type | Target Cycle Time | 85th Percentile Cycle Time | SLE Met % (Current) | SLE Met % (Target) | Confidence Level |
   |---------------|------------------:|---------------------------:|--------------------:|-------------------:|-----------------|
   | Feature | [X days] | [Y days] | [Current % of features completed within SLE] | [Target %: 85%+] | [High/Medium/Low — based on data quality] |
   | Bug Fix | [X days] | [Y days] | [Current %] | [Target %] | [Confidence] |
   | Tech Debt | [X days] | [Y days] | [Current %] | [Target %] | [Confidence] |
   | Expedite | [X days] | [Y days] | [Current %] | [Target %] | [Confidence] |
   | [Other types from input] | ... | ... | ... | ... | ... |

   SLE calculation guidance:
   - **Target Cycle Time**: The median (50th percentile) cycle time that the team commits to as a planning target.
   - **85th Percentile**: The cycle time within which 85% of items of this type should be completed. This is the SLE commitment to stakeholders.
   - **SLE Met %**: What percentage of historical items were completed within the 85th percentile target. If historical data is insufficient, estimate and flag with [ASSUMPTION].
   - **Confidence Level**: Based on sample size and data quality — High (>30 data points), Medium (10-30), Low (<10 or estimated).

3. **SLE Communication Template** — Provide a stakeholder-ready statement for each work item type:
   "For [Work Item Type] items, we expect to deliver within [85th percentile] days. Based on our current data, we meet this expectation [SLE Met %] of the time. Our target is to meet this [Target %] of the time."

4. **Policy Visualization Recommendations** — Suggest how to make these policies visible on the physical or digital board:
   - Where to display entry/exit criteria (e.g., column headers, tooltips, reference cards).
   - How to signal WIP limit violations (e.g., color changes, alerts, blocked column).
   - How to track SLE compliance visually (e.g., aging indicators, color-coded dots by age).

Produce all outputs in clean markdown. Flag any SLE based on limited data with [ASSUMPTION] and the sample size used.`,
      expectedOutput:
        'A Process Policy Register with explicit policies, entry/exit criteria, WIP limits, and SLE targets for every board column, plus cross-cutting policies for pull, blocked items, expedite, and discard. A Service Level Expectation Matrix with cycle time targets, 85th percentile commitments, and current compliance rates per work item type. Stakeholder-ready SLE communication templates and policy visualization recommendations.',
      artifacts: [
        {
          name: 'Process Policy Register',
          description:
            'Comprehensive register of explicit process policies for each Kanban board stage including entry/exit criteria, WIP limits, and SLE targets.',
          format: 'table',
          columns: [
            'Stage',
            'Policy',
            'Entry Criteria',
            'Exit Criteria',
            'WIP Limit',
            'SLE Target',
          ],
        },
        {
          name: 'Service Level Expectation Matrix',
          description:
            'SLE definitions per work item type with target and 85th percentile cycle times, current compliance rates, and confidence levels.',
          format: 'table',
          columns: [
            'Work Item Type',
            'Target Cycle Time',
            '85th Percentile',
            'SLE Met %',
            'Confidence Level',
          ],
        },
      ],
      checkpoint: {
        title: 'Process Policy & SLE Validation',
        items: [
          {
            label: 'Every board column has a complete policy entry',
            description:
              'Each column in the Process Policy Register has all six fields populated: Policy Description, Entry Criteria, Exit Criteria, WIP Limit, and SLE Target.',
          },
          {
            label: 'Cross-cutting policies are defined',
            description:
              'Pull Policy, Blocked Item Policy, Expedite Policy, and Discard Policy are all explicitly defined with actionable rules.',
          },
          {
            label: 'SLEs cover all work item types from the input data',
            description:
              'Every work item type listed in the Step 0 input appears in the SLE Matrix with target cycle time, 85th percentile, and compliance data.',
          },
          {
            label: 'SLE confidence levels reflect data quality honestly',
            description:
              'Confidence levels are consistent with the data completeness assessment from Step 0. Low-confidence SLEs are flagged with [ASSUMPTION] and sample sizes.',
          },
          {
            label: 'Entry and exit criteria are objective and verifiable',
            description:
              'Criteria use concrete, checkable conditions (e.g., "Code review approved") rather than subjective judgments (e.g., "Code is good enough").',
          },
        ],
        failAction:
          'Complete any missing fields in the Process Policy Register — every column needs all six fields. Add any missing cross-cutting policies. Add SLE rows for any work item types not covered. Adjust confidence levels to honestly reflect available data quality. Rewrite any subjective entry/exit criteria to be objective and verifiable.',
      },
    },
    {
      id: 4,
      title: 'Continuous Improvement Plan',
      purpose:
        'Synthesize all analysis into a prioritized, actionable continuous improvement plan with measurable experiments, clear ownership, and a cadence for review — ensuring the optimization effort delivers sustained results.',
      estimatedTime: '10 minutes',
      prompt: `You are completing the Kanban Flow Optimization session as a Kanban Coach and Flow Advisor. This is the final step: translating analysis into action.

**Input — All Previous Step Outputs:**
- Session Context Summary (Step 0): [PASTE_OR_REFERENCE]
- Flow Metrics Dashboard (Step 1): [PASTE_OR_REFERENCE]
- Bottleneck Analysis Matrix (Step 2): [PASTE_OR_REFERENCE]
- WIP Limit Recommendations (Step 2): [PASTE_OR_REFERENCE]
- Process Policy Register (Step 3): [PASTE_OR_REFERENCE]
- Service Level Expectations (Step 3): [PASTE_OR_REFERENCE]

**Input — Team Preferences and Constraints:**
- Improvement appetite: [CONSERVATIVE / MODERATE / AGGRESSIVE]
- Budget for tooling changes: [YES_WITH_AMOUNT / NO]
- Upcoming PI or sprint boundaries: [NEXT_BOUNDARY_DATE]

**Instructions:**

1. **Improvement Experiment Board** — Design 5-8 improvement experiments prioritized by expected impact on flow metrics:

   | Experiment ID | Hypothesis | Metric to Improve | Current Baseline | Target | Duration | Owner Role |
   |--------------|-----------|-------------------|-----------------|--------|----------|------------|
   | IMP-001 | "If we [change X], then [metric Y] will improve by [Z%] because [rationale]" | [Specific metric from Step 1 dashboard] | [Current value] | [Target value] | [2-4 weeks typical] | [Role, not person name] |
   | IMP-002 | "If we..." | ... | ... | ... | ... | ... |
   | ... | ... | ... | ... | ... | ... | ... |

   For each experiment:
   - **Hypothesis**: Follow the structured format: "If we [specific change], then [specific metric] will improve by [quantified amount] because [causal reasoning]."
   - **Metric to Improve**: Must reference a specific metric from the Step 1 Flow Metrics Dashboard (e.g., "Average Cycle Time", "Blocked Items Rate", "Flow Efficiency").
   - **Current Baseline**: The current value of that metric from Step 1.
   - **Target**: A realistic improvement target with the percentage or absolute change expected.
   - **Duration**: How long to run the experiment before evaluating results. Typically 2-4 weeks (2-4 sprints) for meaningful data.
   - **Owner Role**: The role responsible for driving this experiment (e.g., "Scrum Master", "Tech Lead", "Team Lead") — never assign to named individuals.

   Prioritization criteria:
   - **Impact**: How much will this improve the primary bottleneck or overall cycle time?
   - **Effort**: How much team effort is required to implement the change?
   - **Risk**: What is the risk of negative side effects?
   - Rank experiments by Impact / (Effort x Risk) — highest ratio first.

   Experiment categories should include at least one from each:
   - WIP limit adjustment (from Step 2 recommendations)
   - Process policy implementation (from Step 3 definitions)
   - Bottleneck resolution (from Step 2 TOC analysis)
   - Flow visualization improvement
   - Feedback loop enhancement

2. **Implementation Roadmap** — Sequence the experiments into a phased rollout:

   | Phase | Timeline | Experiments | Success Criteria | Review Date |
   |-------|----------|-------------|-----------------|-------------|
   | Phase 1: Quick Wins | Weeks 1-2 | [IMP-001, IMP-002] | [What success looks like] | [Date] |
   | Phase 2: Core Changes | Weeks 3-6 | [IMP-003, IMP-004, IMP-005] | [Success criteria] | [Date] |
   | Phase 3: Advanced Optimization | Weeks 7-10 | [IMP-006, IMP-007, IMP-008] | [Success criteria] | [Date] |

   Sequencing rules:
   - Phase 1 should contain low-effort, high-impact changes that build momentum and team confidence.
   - Phase 2 should address the primary bottleneck and core WIP limit changes.
   - Phase 3 should focus on advanced optimizations that build on Phase 1-2 improvements.
   - No phase should introduce more than 3 changes simultaneously to avoid confounding results.

3. **Measurement Framework** — Define how to track improvement:

   | Metric | Measurement Method | Frequency | Data Source | Dashboard Location |
   |--------|-------------------|-----------|-------------|-------------------|
   | Cycle Time | [How to measure] | [Daily/Weekly] | [Tool or manual] | [Where to display] |
   | Throughput | [How to measure] | [Weekly] | [Tool or manual] | [Where to display] |
   | WIP Compliance | [How to measure] | [Daily] | [Tool or manual] | [Where to display] |
   | SLE Compliance | [How to measure] | [Weekly] | [Tool or manual] | [Where to display] |
   | Blocked Items | [How to measure] | [Daily] | [Tool or manual] | [Where to display] |

4. **Kanban Cadences** — Recommend the Kanban Method cadences (feedback loops) for sustaining improvement:

   | Cadence | Frequency | Duration | Participants | Purpose |
   |---------|-----------|----------|-------------|---------|
   | Daily Standup (Kanban Meeting) | Daily | 15 min | Delivery team | Review board, identify blocks, manage flow |
   | Replenishment Meeting | [Recommend frequency] | [Duration] | [Participants] | [Purpose] |
   | Delivery Planning | [Recommend] | [Duration] | [Participants] | [Purpose] |
   | Service Delivery Review | [Recommend] | [Duration] | [Participants] | [Purpose] |
   | Operations Review | [Recommend] | [Duration] | [Participants] | [Purpose] |
   | Risk Review | [Recommend] | [Duration] | [Participants] | [Purpose] |
   | Strategy Review | [Recommend] | [Duration] | [Participants] | [Purpose] |

   Tailor the cadence recommendations to the team's maturity level (from Step 0 context). For beginner teams, focus on the first 3-4 cadences. For advanced teams, include all seven.

5. **Kanban Optimization Summary** — Provide an executive summary of the entire optimization session:
   - **Current State**: 2-3 sentences summarizing the current flow health.
   - **Key Findings**: Top 3 findings from the analysis (bottlenecks, WIP issues, policy gaps).
   - **Recommended Changes**: Top 5 changes ranked by priority.
   - **Expected Outcomes**: Quantified expected improvements (e.g., "Cycle time reduction of 25-35%", "Throughput increase of 15-20%").
   - **Investment Required**: Team effort needed to implement (e.g., "~2 hours/week for 10 weeks").
   - **Risk Assessment**: Key risks to the improvement plan and mitigations.
   - **Next Review Date**: When to reassess and adjust the plan.

Produce all outputs in clean markdown.`,
      expectedOutput:
        'An Improvement Experiment Board with 5-8 structured experiments including hypotheses, metrics, baselines, targets, and ownership. A phased Implementation Roadmap sequencing experiments into quick wins, core changes, and advanced optimizations. A Measurement Framework for tracking progress. Kanban cadence recommendations tailored to team maturity. And a comprehensive Kanban Optimization Summary with quantified expected outcomes.',
      artifacts: [
        {
          name: 'Improvement Experiment Board',
          description:
            'Prioritized set of 5-8 improvement experiments with structured hypotheses, target metrics, baselines, targets, durations, and owner roles.',
          format: 'table',
          columns: [
            'Experiment ID',
            'Hypothesis',
            'Metric to Improve',
            'Current Baseline',
            'Target',
            'Duration',
            'Owner',
          ],
        },
        {
          name: 'Kanban Optimization Summary',
          description:
            'Executive summary of the full optimization session including current state assessment, key findings, prioritized recommendations, quantified expected outcomes, and next review date.',
          format: 'text',
        },
      ],
      checkpoint: {
        title: 'Continuous Improvement Plan Validation',
        items: [
          {
            label: 'Experiment Board contains 5-8 well-structured experiments',
            description:
              'Each experiment has a structured hypothesis ("If we... then... because..."), references a specific metric from Step 1, includes a current baseline and quantified target, and has a defined duration and owner role.',
          },
          {
            label: 'Experiments cover all five required categories',
            description:
              'At least one experiment addresses each of: WIP limit adjustment, process policy implementation, bottleneck resolution, flow visualization improvement, and feedback loop enhancement.',
          },
          {
            label: 'Implementation roadmap has 3 phases with no more than 3 changes per phase',
            description:
              'The roadmap sequences experiments into Quick Wins, Core Changes, and Advanced Optimization phases, with each phase containing a maximum of 3 simultaneous changes.',
          },
          {
            label: 'Kanban cadences are tailored to team maturity',
            description:
              'The cadence recommendations reference the team maturity level from Step 0 and adjust the number and depth of recommended cadences accordingly.',
          },
          {
            label: 'Optimization Summary includes quantified expected outcomes',
            description:
              'The executive summary contains specific, quantified improvement expectations (e.g., "25% cycle time reduction") tied to the experiments and analysis, not vague statements like "things will improve".',
          },
        ],
        failAction:
          'Add experiments to reach the 5-8 range if fewer were provided. Ensure each experiment follows the structured hypothesis format and references a specific Step 1 metric. Add missing experiment categories. Limit each roadmap phase to 3 simultaneous changes. Tailor cadence recommendations to the stated team maturity level. Quantify all expected outcomes in the summary with specific percentages or absolute numbers.',
      },
    },
  ],
};
