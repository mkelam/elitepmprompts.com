import type { Blueprint } from '@/lib/types';

export const safePortfolioKanban: Blueprint = {
  id: 'safe-portfolio-kanban',
  slug: 'safe-portfolio-kanban',
  title: 'SAFe Portfolio Kanban Builder',
  subtitle:
    'Build a complete Portfolio Kanban system — from epic hypothesis statements and lean business cases through board setup, WIP limit optimization, and strategic theme alignment.',
  methodology: 'SAFe',
  version: '6.0',
  estimatedTime: '45-60 minutes',
  stepCount: 5,
  tier: 'premium',
  price: 29700,
  suiteId: 'safe-suite',
  requiredInputs: [
    {
      name: 'Portfolio Epics List',
      description:
        'The current list of portfolio epics under consideration, including brief descriptions and any existing prioritization.',
      format: 'Table or list with Epic ID, Name, Brief Description, Current State (if known)',
    },
    {
      name: 'Strategic Themes',
      description:
        'The organization\'s strategic themes with target investment percentages for portfolio balance.',
      format: 'List with Theme Name, Description, Target Investment %',
    },
    {
      name: 'Historical Throughput Data',
      description:
        'If available, historical data on epic flow through the portfolio Kanban (cycle times, throughput, current WIP).',
      format: 'Table with column, average cycle time, current WIP count, throughput per quarter',
    },
    {
      name: 'Budget and Capacity Constraints',
      description:
        'Available budget, ART capacity, and any organizational constraints that affect portfolio decisions.',
      format: 'Free text or table with constraint type and details',
    },
  ],
  artifactsProduced: [
    'Epic Hypothesis Canvas',
    'Lean Business Case per Epic',
    'Portfolio Kanban Board',
    'WIP Limits per Column',
    'WIP Limit Recommendation Table',
    'Flow Metrics Summary',
    'Strategic Theme Alignment Matrix',
    'Portfolio Balance Summary',
  ],
  steps: [
    {
      id: 1,
      title: 'Epic Hypothesis Statements',
      purpose:
        'Write structured hypothesis statements for each portfolio epic, transforming vague ideas into testable propositions with clear expected outcomes and leading indicators.',
      estimatedTime: '10 minutes',
      prompt: `You are a SAFe 6.0 Lean Portfolio Management (LPM) consultant. Your task is to create Epic Hypothesis Statements for portfolio epics.

**Context:**
- Organization/Portfolio Name: [ORGANIZATION_NAME]
- Number of ARTs: [NUMBER_OF_ARTS]
- Planning Horizon: [PLANNING_HORIZON] (e.g., "Next 2 PIs" or "FY 2025")

**Input Data — Portfolio Epics:**
[PASTE_EPIC_LIST_HERE]
Format: Epic ID | Name | Brief Description | Current State (Funnel/Reviewing/Analyzing/etc.)

**Input Data — Strategic Themes:**
[PASTE_STRATEGIC_THEMES_HERE]
Format: Theme Name | Description | Target Investment %

**Instructions:**

1. **Epic Hypothesis Canvas** — For each epic, produce a structured hypothesis:
   | Field | Content |
   |-------|---------|
   | Epic ID | [ID] |
   | Epic Name | [Name] |
   | Hypothesis Statement | "We believe that [this capability/initiative] will result in [this expected benefit] for [this target user/customer segment]. We will know we are successful when we see [these measurable outcomes]." |
   | Expected Outcome | [Specific, measurable business outcome] |
   | Leading Indicators | [2-3 early signals that the hypothesis is proving true/false] |
   | MVP Definition | [Minimum Viable Product — the smallest deliverable that can test the hypothesis] |
   | Strategic Theme Alignment | [Which strategic theme(s) this epic supports] |

   Produce one canvas per epic. Ensure:
   - The hypothesis follows the SAFe structured format: "We believe... will result in... We will know when..."
   - Expected outcomes are quantifiable (e.g., "Increase customer retention by 15%" not "Improve customer experience").
   - Leading indicators are measurable and observable within 1-2 sprints of MVP delivery.
   - MVP definition is genuinely minimal — not the full epic scope.

2. **Hypothesis Quality Checklist** — After all canvases, produce a summary:
   | Epic ID | Hypothesis Testable? | Outcome Measurable? | MVP Defined? | Theme Aligned? | Ready for Lean Business Case? |
   |---------|---------------------|--------------------:|-------------|---------------|-------------------------------|

   Mark each as Yes/No. Any epic with a "No" in any column needs revision before proceeding to Step 2.

Produce all outputs in clean markdown.`,
      expectedOutput:
        'An Epic Hypothesis Canvas for each portfolio epic with a structured hypothesis statement, measurable expected outcomes, leading indicators, MVP definition, and strategic theme alignment. Plus a quality checklist summarizing readiness for lean business case development.',
      artifacts: [
        {
          name: 'Epic Hypothesis Canvas',
          description:
            'Structured hypothesis statement for each epic with expected outcomes, leading indicators, MVP definition, and theme alignment.',
          format: 'table',
          columns: [
            'Epic ID',
            'Name',
            'Hypothesis Statement',
            'Expected Outcome',
            'Leading Indicators',
            'MVP Definition',
          ],
        },
      ],
      checkpoint: {
        title: 'Epic Hypothesis Validation',
        items: [
          {
            label: 'Every epic has a complete hypothesis canvas',
            description:
              'No epic from the input list is missing. Each has all fields populated (Hypothesis, Expected Outcome, Leading Indicators, MVP, Theme Alignment).',
          },
          {
            label: 'Hypotheses follow the SAFe structured format',
            description:
              'Each hypothesis uses the "We believe... will result in... We will know when..." structure.',
          },
          {
            label: 'Expected outcomes are quantifiable',
            description:
              'Every expected outcome contains a specific metric or percentage, not a vague qualitative statement.',
          },
          {
            label: 'MVPs are genuinely minimal',
            description:
              'Each MVP describes the smallest possible deliverable that tests the hypothesis, not a full feature set.',
          },
          {
            label: 'Quality checklist shows all epics ready for Step 2',
            description:
              'All epics have "Yes" across all quality columns. If any show "No", revisions are noted.',
          },
        ],
        failAction:
          'Revisit any epic with missing fields and complete the canvas. Rewrite hypotheses that do not follow the structured format. Replace vague outcomes with specific, quantifiable metrics. Reduce MVP scope if it describes more than the minimum testable increment.',
      },
    },
    {
      id: 2,
      title: 'Lean Business Cases',
      purpose:
        'Create lightweight business cases for the top-priority epics, providing just enough economic analysis to make informed go/no-go decisions without heavyweight documentation.',
      estimatedTime: '15 minutes',
      prompt: `You are continuing the Portfolio Kanban build for [ORGANIZATION_NAME].

**Input — Epic Hypothesis Canvases from Step 1:**
[PASTE_EPIC_HYPOTHESIS_CANVASES_HERE]

**Input — Budget and Capacity Constraints:**
[PASTE_BUDGET_CAPACITY_CONSTRAINTS_HERE]

**Input — Additional financial/market data (if available):**
- Market size or addressable revenue: [MARKET_DATA_OR_NONE]
- Cost benchmarks: [COST_BENCHMARKS_OR_NONE]
- Competitive timeline pressures: [COMPETITIVE_PRESSURES_OR_NONE]

**Instructions:**

For each epic that passed the Step 1 quality checklist, produce a **Lean Business Case**:

| Field | Content |
|-------|---------|
| Epic ID | [ID] |
| Epic Name | [Name] |
| Solution Description | [2-3 sentences describing the proposed solution approach] |
| Revenue/Cost Impact | [Quantified impact: revenue increase, cost reduction, or cost avoidance — use ranges if uncertain] |
| NPV/ROI Estimate | [Net Present Value or ROI estimate with assumptions stated. If insufficient data, provide a range with stated assumptions] |
| Implementation Cost Estimate | [Estimated effort in PI-sprints or team-sprints, plus any direct costs] |
| Time-to-Market | [Expected duration from start to MVP delivery] |
| Go/No-Go Recommendation | [Go / No-Go / Needs More Analysis — with 1-sentence justification] |
| Sequencing Priority | [Suggested order relative to other epics, with rationale] |

Produce one business case per epic.

After all business cases, produce a **Portfolio Investment Summary**:
| Epic ID | Name | Revenue/Cost Impact | Implementation Cost | ROI Estimate | Go/No-Go | Sequence |
|---------|------|--------------------|--------------------|-------------|----------|----------|

Sort by recommended sequence order.

Finally, produce a **Decision Log** noting any epics recommended for "No-Go" or "Needs More Analysis" with specific information gaps that must be resolved.

Produce all outputs in clean markdown.`,
      expectedOutput:
        'A Lean Business Case for each qualifying epic with solution description, financial impact, ROI estimate, go/no-go recommendation, and sequencing priority. Plus a Portfolio Investment Summary table sorted by sequence and a Decision Log for epics needing further analysis.',
      artifacts: [
        {
          name: 'Lean Business Case per Epic',
          description:
            'Lightweight business case with solution description, financial impact, ROI, go/no-go recommendation, and sequencing priority.',
          format: 'table',
          columns: [
            'Solution Description',
            'Revenue/Cost Impact',
            'NPV/ROI Estimate',
            'Go/No-Go Recommendation',
            'Sequencing Priority',
          ],
        },
      ],
      checkpoint: {
        title: 'Lean Business Case Validation',
        items: [
          {
            label: 'Every qualifying epic has a lean business case',
            description:
              'All epics that passed the Step 1 quality checklist have a complete business case. No qualifying epic is skipped.',
          },
          {
            label: 'Financial estimates include assumptions',
            description:
              'Every NPV/ROI estimate explicitly states the assumptions used. Ranges are provided where data is uncertain.',
          },
          {
            label: 'Go/No-Go recommendations are justified',
            description:
              'Each recommendation has a clear one-sentence rationale tied to the financial analysis or strategic alignment.',
          },
          {
            label: 'Sequencing rationale considers dependencies and value',
            description:
              'The recommended sequence accounts for inter-epic dependencies, time criticality, and value delivery timing, not just ROI alone.',
          },
        ],
        failAction:
          'Add business cases for any qualifying epics that were missed. Ensure financial estimates include explicit assumptions — add "Assumption:" notes where missing. Strengthen go/no-go justifications to reference specific data points. Review sequencing to account for dependencies between epics.',
      },
    },
    {
      id: 3,
      title: 'Portfolio Kanban Board',
      purpose:
        'Set up the visual Portfolio Kanban board with correct SAFe states, placing each epic in its appropriate column based on current status and business case outcomes.',
      estimatedTime: '10 minutes',
      prompt: `You are continuing the Portfolio Kanban build for [ORGANIZATION_NAME].

**Input — Lean Business Cases and Go/No-Go Decisions from Step 2:**
[PASTE_PORTFOLIO_INVESTMENT_SUMMARY_HERE]

**Input — Current epic states (if migrating from existing system):**
[PASTE_CURRENT_EPIC_STATES_OR_NONE]

**Instructions:**

1. **Portfolio Kanban Board** — Produce the board as a table showing epics placed in the correct SAFe Portfolio Kanban columns:

   | Funnel | Reviewing | Analyzing | Portfolio Backlog | Implementing | Done |
   |--------|-----------|-----------|-------------------|--------------|------|
   | [Epic IDs/Names] | [Epic IDs/Names] | [Epic IDs/Names] | [Epic IDs/Names] | [Epic IDs/Names] | [Epic IDs/Names] |

   Placement rules:
   - **Funnel**: New epics with no hypothesis statement yet.
   - **Reviewing**: Epics with hypothesis statements (Step 1 complete) but no business case.
   - **Analyzing**: Epics currently undergoing lean business case analysis (Step 2 "Needs More Analysis").
   - **Portfolio Backlog**: Epics with approved business cases (Step 2 "Go") awaiting implementation capacity.
   - **Implementing**: Epics actively being worked on by one or more ARTs.
   - **Done**: Completed epics (MVPs delivered and hypothesis validated or invalidated).

   For each epic, show: [Epic ID] - [Epic Name] ([Business Value or ROI indicator]).

2. **Column Policies** — Define entry and exit criteria for each column:
   | Column | Entry Criteria | Exit Criteria | WIP Limit |
   |--------|---------------|---------------|-----------|
   | Funnel | Epic idea submitted | Hypothesis statement approved | No limit |
   | Reviewing | Hypothesis canvas complete | LPM review scheduled | [SUGGESTED_WIP] |
   | Analyzing | LPM review passed | Lean Business Case complete with Go/No-Go | [SUGGESTED_WIP] |
   | Portfolio Backlog | Go decision + approved budget | ART capacity allocated | [SUGGESTED_WIP] |
   | Implementing | ART capacity confirmed, PI commitment | MVP delivered, hypothesis tested | [SUGGESTED_WIP] |
   | Done | Hypothesis validated/invalidated | N/A (terminal state) | No limit |

   Suggest initial WIP limits based on: number of ARTs, typical epic size, and the principle that WIP limits should be low enough to ensure flow but high enough to keep ARTs utilized.

3. **Board Health Snapshot** — Provide current board statistics:
   - Epics per column (count)
   - Any columns currently exceeding suggested WIP limits
   - Bottleneck identification (which column has the most epics or longest average cycle time)

Produce all outputs in clean markdown.`,
      expectedOutput:
        'A Portfolio Kanban Board with all epics placed in the correct SAFe columns based on their current state, column policies defining entry/exit criteria and suggested WIP limits, and a board health snapshot identifying current bottlenecks.',
      artifacts: [
        {
          name: 'Portfolio Kanban Board',
          description:
            'Visual board representation with epics placed in SAFe Portfolio Kanban columns based on current state.',
          format: 'table',
          columns: [
            'Funnel',
            'Reviewing',
            'Analyzing',
            'Portfolio Backlog',
            'Implementing',
            'Done',
          ],
        },
        {
          name: 'WIP Limits per Column',
          description:
            'Column policies with entry/exit criteria and initial WIP limit suggestions.',
          format: 'table',
          columns: ['Column', 'Entry Criteria', 'Exit Criteria', 'WIP Limit'],
        },
      ],
      checkpoint: {
        title: 'Portfolio Kanban Board Validation',
        items: [
          {
            label: 'Every epic is placed in exactly one column',
            description:
              'No epic appears in multiple columns and no epic from the portfolio is missing from the board.',
          },
          {
            label: 'Column placement is consistent with Step 1-2 outputs',
            description:
              'Epics with "Go" decisions are in Portfolio Backlog or Implementing, not still in Analyzing. "No-Go" epics are removed or in Funnel for re-evaluation.',
          },
          {
            label: 'WIP limits are defined for all active columns',
            description:
              'Every column except Funnel and Done has a numeric WIP limit with a brief rationale.',
          },
          {
            label: 'Board health snapshot identifies any WIP violations',
            description:
              'If any column currently exceeds its suggested WIP limit, this is explicitly flagged.',
          },
        ],
        failAction:
          'Reconcile the board against the full epic list to ensure every epic is placed. Cross-reference Go/No-Go decisions from Step 2 against column placement. Add WIP limits for any column missing them. Calculate current counts per column and flag any WIP violations.',
      },
    },
    {
      id: 4,
      title: 'WIP Limit Analysis',
      purpose:
        'Analyze and optimize WIP limits based on throughput data, Little\'s Law, and flow principles to maximize portfolio throughput and minimize cycle time.',
      estimatedTime: '10 minutes',
      prompt: `You are continuing the Portfolio Kanban build for [ORGANIZATION_NAME].

**Input — Portfolio Kanban Board and initial WIP limits from Step 3:**
[PASTE_KANBAN_BOARD_WITH_WIP_LIMITS_HERE]

**Input — Historical Throughput Data (if available):**
[PASTE_HISTORICAL_THROUGHPUT_DATA_HERE]
Format: Column | Average Cycle Time (days) | Current WIP | Throughput (epics/quarter)

If no historical data is available, state: "No historical throughput data available — recommendations will be based on SAFe defaults and team capacity."

**Input — ART capacity:**
- Number of ARTs: [NUMBER_OF_ARTS]
- Average ART capacity (teams per ART): [TEAMS_PER_ART]
- Typical epic size: [TYPICAL_EPIC_SIZE] (e.g., "1-2 PIs" or "3-6 months")

**Instructions:**

1. **WIP Limit Recommendation Table** — For each Kanban column, produce an optimized WIP limit recommendation:
   | Column | Current WIP | Recommended WIP | Throughput Impact | Rationale |
   |--------|------------|-----------------|-------------------|-----------|

   For each column:
   - **Current WIP**: How many epics are currently in this column (from Step 3).
   - **Recommended WIP**: The optimal WIP limit based on analysis.
   - **Throughput Impact**: Expected effect on flow (e.g., "Reduces average cycle time by ~20%" or "Prevents bottleneck buildup").
   - **Rationale**: Cite the reasoning — Little's Law (Cycle Time = WIP / Throughput), historical data patterns, or SAFe recommended practices.

   Apply these principles:
   - **Little's Law**: If throughput data is available, use CT = WIP / Throughput to calculate optimal WIP for target cycle times.
   - **Capacity-based**: WIP in Implementing should not exceed the number of ARTs times their capacity to actively work epics.
   - **Bottleneck management**: The column before a known bottleneck should have a lower WIP limit to prevent queue buildup.
   - **SAFe defaults**: If no data is available, use Number of ARTs + 1 for Implementing, and Number of ARTs for Analyzing and Portfolio Backlog.

2. **Flow Metrics Summary** — Produce a current-state and target-state comparison:
   | Metric | Current State | Target State | Improvement |
   |--------|--------------|-------------|-------------|
   | Total Portfolio WIP | [count] | [target count] | [% reduction] |
   | Average Epic Cycle Time | [current or estimated] | [target] | [% improvement] |
   | Portfolio Throughput | [current or estimated] | [target] | [% increase] |
   | Bottleneck Column | [column name] | [target: no single bottleneck] | [action needed] |
   | WIP-to-Throughput Ratio | [current] | [target] | [improvement] |

3. **WIP Limit Implementation Plan** — Recommend how to roll out the new WIP limits:
   - Which limits to implement immediately vs. gradually.
   - How to handle columns currently exceeding the new limits (pull vs. stop-start).
   - Cadence for reviewing and adjusting WIP limits (e.g., quarterly or per PI).

Produce all outputs in clean markdown.`,
      expectedOutput:
        'A WIP Limit Recommendation Table with optimized limits per column backed by Little\'s Law analysis or SAFe defaults, a Flow Metrics Summary comparing current and target states, and a WIP Limit Implementation Plan for rollout.',
      artifacts: [
        {
          name: 'WIP Limit Recommendation Table',
          description:
            'Optimized WIP limits per Kanban column with throughput impact analysis and rationale grounded in flow principles.',
          format: 'table',
          columns: [
            'Column',
            'Current WIP',
            'Recommended WIP',
            'Throughput Impact',
            'Rationale',
          ],
        },
        {
          name: 'Flow Metrics Summary',
          description:
            'Current-state vs. target-state comparison of portfolio flow metrics including cycle time, throughput, and bottleneck analysis.',
          format: 'table',
          columns: ['Metric', 'Current State', 'Target State', 'Improvement'],
        },
      ],
      checkpoint: {
        title: 'WIP Limit Analysis Validation',
        items: [
          {
            label: 'Every active column has a WIP limit recommendation',
            description:
              'Reviewing, Analyzing, Portfolio Backlog, and Implementing all have recommended WIP limits with rationale.',
          },
          {
            label: 'Recommendations are grounded in data or principles',
            description:
              'Each WIP limit cites either Little\'s Law calculations, historical throughput data, or SAFe recommended defaults — not arbitrary numbers.',
          },
          {
            label: 'Flow Metrics Summary covers all five metrics',
            description:
              'Total WIP, Average Cycle Time, Throughput, Bottleneck Column, and WIP-to-Throughput Ratio are all present.',
          },
          {
            label: 'Implementation plan addresses current WIP violations',
            description:
              'If any column currently exceeds the recommended limit, the plan specifies how to bring it into compliance.',
          },
        ],
        failAction:
          'Add recommendations for any column missing a WIP limit. Strengthen rationale by citing specific data points or Little\'s Law formula. Complete any missing rows in the Flow Metrics Summary. Add handling instructions for columns currently exceeding limits.',
      },
    },
    {
      id: 5,
      title: 'Strategic Theme Alignment',
      purpose:
        'Map all portfolio epics to strategic themes and validate that the portfolio investment balance matches the organization\'s strategic intent.',
      estimatedTime: '10 minutes',
      prompt: `You are completing the Portfolio Kanban build for [ORGANIZATION_NAME]. This is the final step: ensuring the portfolio is aligned with strategic themes.

**Input — Strategic Themes:**
[PASTE_STRATEGIC_THEMES_HERE]
Format: Theme Name | Description | Target Investment %

**Input — Epic Hypothesis Canvases from Step 1 (for theme alignment):**
[PASTE_EPIC_THEME_ALIGNMENTS_FROM_STEP_1]

**Input — Lean Business Cases from Step 2 (for investment sizing):**
[PASTE_PORTFOLIO_INVESTMENT_SUMMARY_FROM_STEP_2]

**Input — Portfolio Kanban Board from Step 3 (for current state):**
[PASTE_KANBAN_BOARD_FROM_STEP_3]

**Instructions:**

1. **Strategic Theme Alignment Matrix** — Produce a matrix mapping epics to themes:
   | Epic ID | Epic Name | Theme 1: [NAME] | Theme 2: [NAME] | Theme 3: [NAME] | ... | Primary Theme | Investment Estimate |
   |---------|-----------|-----------------|-----------------|-----------------|-----|--------------|-------------------|

   For each epic:
   - Show the percentage of the epic's value or effort that aligns to each theme (values in cells should sum to 100% per row).
   - **Primary Theme**: The theme receiving the largest share.
   - **Investment Estimate**: The implementation cost from the lean business case (Step 2).

   Rules:
   - An epic can align to multiple themes (e.g., 60% Growth, 40% Operational Excellence).
   - If an epic does not clearly align to any theme, flag it as "Unaligned" and recommend reassessment.

2. **Portfolio Balance Summary** — Calculate the actual vs. target investment per theme:
   | Theme | Target Investment % | Actual Investment % | Variance | Status |
   |-------|--------------------|--------------------|----------|--------|

   For each theme:
   - **Actual Investment %**: Sum of (each epic's theme allocation x its investment estimate) / total portfolio investment.
   - **Variance**: Actual - Target.
   - **Status**: Balanced (variance within +/- 5%), Over-invested (variance > +5%), Under-invested (variance < -5%).

3. **Portfolio Balance Recommendations** — Based on the variance analysis:
   - Identify themes that are significantly over- or under-invested.
   - Recommend specific actions:
     - Epics to accelerate (to increase investment in under-invested themes).
     - Epics to defer or descope (to reduce investment in over-invested themes).
     - New epic ideas to fill gaps in under-invested themes.
   - Provide a **Rebalanced Investment Projection** showing what the portfolio balance would look like after implementing recommendations.

4. **Guardrails Check** — Validate the portfolio against SAFe Lean Portfolio Management guardrails:
   | Guardrail | Status | Finding |
   |-----------|--------|---------|
   | Strategic Theme Alignment | [Pass/Fail] | [Finding] |
   | Portfolio WIP within limits | [Pass/Fail] | [Finding — reference Step 4 WIP analysis] |
   | Lean Business Cases approved for all Implementing epics | [Pass/Fail] | [Finding] |
   | Epic MVPs defined | [Pass/Fail] | [Finding — reference Step 1 canvases] |
   | Investment balanced within guardrails | [Pass/Fail] | [Finding] |

Produce all outputs in clean markdown.`,
      expectedOutput:
        'A Strategic Theme Alignment Matrix showing each epic\'s investment allocation across themes, a Portfolio Balance Summary comparing actual vs. target investment per theme with variance analysis, portfolio balance recommendations with specific actions, and a guardrails check validating LPM compliance.',
      artifacts: [
        {
          name: 'Strategic Theme Alignment Matrix',
          description:
            'Epic-to-theme mapping showing investment percentage allocation per theme for each epic.',
          format: 'matrix',
          rows: ['Epics (one row per epic)'],
          columns: ['Epic ID', 'Epic Name', 'Theme columns (% allocation)', 'Primary Theme', 'Investment Estimate'],
        },
        {
          name: 'Portfolio Balance Summary',
          description:
            'Actual vs. target investment comparison per strategic theme with variance analysis and balance status.',
          format: 'table',
          columns: [
            'Theme',
            'Target Investment %',
            'Actual Investment %',
            'Variance',
            'Status',
          ],
        },
      ],
      checkpoint: {
        title: 'Strategic Theme Alignment Validation',
        items: [
          {
            label: 'Every epic maps to at least one strategic theme',
            description:
              'No epic has 0% allocation across all themes. Any unaligned epic is explicitly flagged for reassessment.',
          },
          {
            label: 'Theme allocation percentages sum to 100% per epic',
            description:
              'Each row in the alignment matrix sums to exactly 100% across all theme columns.',
          },
          {
            label: 'Portfolio Balance Summary uses correct investment calculations',
            description:
              'Actual investment percentages are weighted by epic implementation cost, not simply by epic count.',
          },
          {
            label: 'Recommendations are specific and actionable',
            description:
              'Each rebalancing recommendation names specific epics to accelerate, defer, or create, with expected impact on theme balance.',
          },
          {
            label: 'Guardrails check covers all five areas',
            description:
              'All five guardrails (theme alignment, WIP limits, business cases, MVPs, investment balance) are evaluated with clear Pass/Fail verdicts.',
          },
        ],
        failAction:
          'Review any epics with 0% theme allocation and either assign them to a theme or flag them for removal. Verify that each row sums to 100%. Recalculate actual investment percentages using cost-weighted allocation rather than simple counts. Make rebalancing recommendations specific by naming epics. Add any missing guardrail rows.',
      },
    },
  ],
};
