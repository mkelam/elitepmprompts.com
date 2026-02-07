import type { Blueprint } from '@/lib/types';

export const safeInspectAdapt: Blueprint = {
  id: 'safe-inspect-adapt',
  slug: 'safe-inspect-adapt',
  title: 'SAFe Inspect & Adapt Engine',
  subtitle:
    'Generate a complete Inspect & Adapt workshop output — from PI metrics analysis through root cause problem-solving to a prioritized improvement backlog for the next PI.',
  methodology: 'SAFe',
  version: '6.0',
  estimatedTime: '45-60 minutes',
  stepCount: 5,
  tier: 'premium',
  price: 29700,
  suiteId: 'safe-suite',
  requiredInputs: [
    {
      name: 'PI Objectives & Results',
      description:
        'The committed and uncommitted PI Objectives for each team, along with actual delivery results and business value achieved.',
      format: 'Table or list with Team, Objective, Type (Committed/Uncommitted), Planned BV, Actual BV',
    },
    {
      name: 'Team Velocity Data',
      description:
        'Sprint-by-sprint velocity for each team across the PI, including planned vs. delivered story points.',
      format: 'Table with Team, Sprint 1-5 planned/actual velocity',
    },
    {
      name: 'Qualitative Feedback',
      description:
        'Raw retrospective notes, survey results, or team sentiment data collected during the PI.',
      format: 'Free-text notes, survey scores, or structured feedback forms per team',
    },
    {
      name: 'Top Problems Identified',
      description:
        'The 2-3 highest-priority problems voted on by the ART for the problem-solving workshop.',
      format: 'Ranked list with problem description and impacted teams',
    },
  ],
  artifactsProduced: [
    'PI Metrics Table',
    'Velocity Trend by Team',
    'Variance Analysis Report',
    'Statistical Trend Analysis',
    'Team Satisfaction Matrix',
    'Qualitative Themes Register',
    'Root Cause Analysis (5 Whys + Fishbone)',
    'Problem-Solution Matrix',
    'Improvement Backlog',
    'I&A Action Plan',
  ],
  steps: [
    {
      id: 1,
      title: 'PI Metrics Dashboard',
      purpose:
        'Collect and display quantitative PI performance data so the ART has a shared, objective view of how the PI performed against targets.',
      estimatedTime: '10 minutes',
      prompt: `You are a SAFe 6.0 Program Consultant helping an Agile Release Train run their Inspect & Adapt workshop. Your task is to build a comprehensive PI Metrics Dashboard.

**Context:**
- ART Name: [ART_NAME]
- PI Number: [PI_NUMBER] (e.g., PI 24.3)
- Number of Teams: [NUMBER_OF_TEAMS]
- PI Duration: [NUMBER_OF_SPRINTS] sprints

**Input Data — PI Objectives & Results:**
[PASTE_PI_OBJECTIVES_TABLE_HERE]
Format: Team | Objective | Type (C/U) | Planned BV | Actual BV

**Input Data — Team Velocity (Story Points):**
[PASTE_VELOCITY_DATA_HERE]
Format: Team | Sprint 1 Plan/Actual | Sprint 2 Plan/Actual | ... | Sprint N Plan/Actual

**Instructions:**

1. **PI Metrics Table** — Produce a table with these columns:
   | Metric | Target | Actual | Variance | Trend |
   |--------|--------|--------|----------|-------|
   Include at minimum these metrics:
   - PI Predictability Measure (% of planned BV achieved)
   - Committed Objectives Met (%)
   - Uncommitted Objectives Met (%)
   - Average Team Velocity (story points / sprint)
   - Velocity Variance (standard deviation across teams)
   - Defect Escape Rate (if data provided, otherwise note "Data not provided")
   - Feature Cycle Time (if data provided, otherwise note "Data not provided")

   For the Trend column, indicate whether each metric is Improving, Stable, or Declining compared to prior PIs (if historical data is available; otherwise mark "Baseline").

2. **Velocity Trend by Team** — Produce a sprint-by-sprint table:
   | Team | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Sprint 5 | PI Average | Trend |
   |------|----------|----------|----------|----------|----------|------------|-------|
   Show actual velocity per sprint. In the Trend column indicate the trajectory (Improving / Stable / Declining).

3. For each metric in the PI Metrics Table where Variance exceeds +/- 10%, add a brief note flagging it for deeper analysis in the next step.

Produce both tables in clean markdown. Do not skip any metrics — if data is missing, explicitly state "Data not provided" rather than omitting the row.`,
      expectedOutput:
        'Two fully populated tables: the PI Metrics Table showing all key performance indicators with targets, actuals, variances, and trends; and the Velocity Trend by Team table showing sprint-by-sprint velocity for every team with trajectory indicators.',
      artifacts: [
        {
          name: 'PI Metrics Table',
          description:
            'Comprehensive table of quantitative PI performance metrics with target vs. actual comparisons.',
          format: 'table',
          columns: ['Metric', 'Target', 'Actual', 'Variance', 'Trend'],
        },
        {
          name: 'Velocity Trend by Team',
          description:
            'Sprint-by-sprint velocity data for each team showing trajectory across the PI.',
          format: 'table',
          columns: [
            'Team',
            'Sprint 1',
            'Sprint 2',
            'Sprint 3',
            'Sprint 4',
            'Sprint 5',
            'PI Average',
            'Trend',
          ],
        },
      ],
      checkpoint: {
        title: 'PI Metrics Dashboard Validation',
        items: [
          {
            label: 'All teams are represented in both tables',
            description:
              'Every team in the ART has a row in the Velocity Trend table and their objectives are reflected in the PI Metrics Table.',
          },
          {
            label: 'PI Predictability Measure is calculated correctly',
            description:
              'The predictability measure equals (Actual Business Value / Planned Business Value) x 100, calculated from committed objectives only.',
          },
          {
            label: 'Variance flags are present for metrics exceeding +/- 10%',
            description:
              'Any metric with a variance beyond the 10% threshold has an explicit flag for deeper analysis.',
          },
          {
            label: 'Trend indicators are present and justified',
            description:
              'Each metric and team velocity row has a Trend value (Improving, Stable, Declining, or Baseline) that is consistent with the data shown.',
          },
        ],
        failAction:
          'Return to the input data and verify all teams and objectives are included. Recalculate the PI Predictability Measure using only committed objectives. Ensure every metric row has a variance value and trend indicator before proceeding.',
      },
    },
    {
      id: 2,
      title: 'Quantitative Analysis',
      purpose:
        'Analyze the metrics from Step 1 for patterns, correlations, and root causes to surface the most meaningful performance insights.',
      estimatedTime: '10 minutes',
      prompt: `You are continuing the SAFe 6.0 Inspect & Adapt workshop for [ART_NAME], PI [PI_NUMBER].

**Input — Use the PI Metrics Dashboard produced in Step 1:**
[PASTE_PI_METRICS_TABLE_HERE]
[PASTE_VELOCITY_TREND_TABLE_HERE]

**Additional Context (if available):**
- Historical PI Predictability Measures: [PREVIOUS_PI_PREDICTABILITY_VALUES]
- Known external disruptions during this PI: [DISRUPTIONS_OR_NONE]

**Instructions:**

1. **Variance Analysis Report** — For every metric where the variance exceeds +/- 10%, produce a structured analysis:
   | Metric | Variance | Direction | Likely Root Cause | Contributing Factors | Recommended Investigation |
   |--------|----------|-----------|-------------------|---------------------|--------------------------|

   For each row:
   - State whether the variance is positive (over-delivery) or negative (under-delivery).
   - Hypothesize the most likely root cause based on the data patterns.
   - List 2-3 contributing factors that may have amplified the variance.
   - Recommend a specific investigation action (e.g., "Interview Team X about Sprint 3 drop-off").

2. **Statistical Trend Analysis** — Produce a summary covering:
   | Analysis Area | Finding | Confidence | Implication |
   |--------------|---------|------------|-------------|

   Cover these analysis areas at minimum:
   - **Velocity Stability**: Are teams converging toward predictable velocity, or is variance increasing?
   - **Cross-Team Correlation**: Do teams tend to dip or spike together (indicating systemic issues) or independently (indicating team-specific issues)?
   - **PI Objective Achievement Pattern**: Is there a pattern in which types of objectives (committed vs. uncommitted) are missed?
   - **Sprint-over-Sprint Trend**: Is there a consistent pattern within the PI (e.g., velocity dip in Sprint 1, spike in final sprint)?
   - **Predictability Trajectory**: Is the ART's PI Predictability Measure improving, stable, or declining across PIs?

   Rate confidence as High, Medium, or Low based on data availability.

3. Conclude with a **Top 3 Quantitative Insights** summary — three bullet points identifying the most actionable findings that should be explored in the qualitative feedback and problem-solving steps.

Produce all tables and the summary in clean markdown.`,
      expectedOutput:
        'A Variance Analysis Report table detailing every metric that deviated beyond 10% with root cause hypotheses, plus a Statistical Trend Analysis table covering velocity stability, cross-team correlation, objective achievement patterns, sprint trends, and predictability trajectory. Concludes with three prioritized quantitative insights.',
      artifacts: [
        {
          name: 'Variance Analysis Report',
          description:
            'Structured breakdown of every significant metric variance with root cause hypotheses and recommended investigations.',
          format: 'table',
          columns: [
            'Metric',
            'Variance',
            'Direction',
            'Likely Root Cause',
            'Contributing Factors',
            'Recommended Investigation',
          ],
        },
        {
          name: 'Statistical Trend Analysis',
          description:
            'Multi-dimensional trend analysis covering velocity stability, cross-team correlation, objective patterns, and predictability trajectory.',
          format: 'table',
          columns: ['Analysis Area', 'Finding', 'Confidence', 'Implication'],
        },
      ],
      checkpoint: {
        title: 'Quantitative Analysis Validation',
        items: [
          {
            label: 'Every flagged metric from Step 1 has a corresponding variance analysis row',
            description:
              'No metric that exceeded the +/- 10% threshold in the PI Metrics Table is missing from the Variance Analysis Report.',
          },
          {
            label: 'Root causes are data-backed, not speculative',
            description:
              'Each hypothesized root cause references specific data points from the metrics (e.g., "Team X velocity dropped 40% in Sprint 3").',
          },
          {
            label: 'All five analysis areas are covered in the Trend Analysis',
            description:
              'Velocity Stability, Cross-Team Correlation, PI Objective Achievement Pattern, Sprint-over-Sprint Trend, and Predictability Trajectory are all present.',
          },
          {
            label: 'Top 3 Insights are specific and actionable',
            description:
              'Each insight points to a concrete finding (not a vague observation) and implies a clear next step.',
          },
        ],
        failAction:
          'Cross-reference the Variance Analysis Report against the Step 1 metrics to fill any gaps. Ensure root cause hypotheses cite specific data. Add missing analysis areas to the Trend Analysis table. Refine insights to be concrete and actionable.',
      },
    },
    {
      id: 3,
      title: 'Qualitative Feedback Collection',
      purpose:
        'Collect and synthesize structured retrospective feedback from across all teams to surface themes that the quantitative data alone cannot reveal.',
      estimatedTime: '10 minutes',
      prompt: `You are continuing the SAFe 6.0 Inspect & Adapt workshop for [ART_NAME], PI [PI_NUMBER].

**Input — Qualitative Feedback from Teams:**
[PASTE_TEAM_FEEDBACK_HERE]
Format: Include team name, feedback category (What Went Well / What Didn't / Ideas for Improvement), and the feedback text.

**Input — Reference the Top 3 Quantitative Insights from Step 2:**
[PASTE_TOP_3_INSIGHTS_HERE]

**Instructions:**

1. **Team Satisfaction Matrix** — Produce a matrix showing each team's self-assessed satisfaction across key dimensions:
   | Team | Delivery Confidence | Technical Health | Collaboration | Process Efficiency | Morale | Overall |
   |------|--------------------|-----------------|--------------|--------------------|--------|---------|

   Rate each dimension on a 1-5 scale based on the qualitative feedback provided. If explicit ratings were given, use those. If only narrative feedback is available, infer the rating and mark it with "(inferred)" next to the score.

   Below the matrix, add a row for "ART Average" showing the mean score per dimension.

2. **Qualitative Themes Register** — Analyze all feedback and extract recurring themes:
   | Theme | Frequency | Impact (H/M/L) | Source Teams | Corroborates Quantitative Finding? |
   |-------|-----------|-----------------|--------------|-----------------------------------|

   For each theme:
   - **Frequency**: How many teams raised this theme (e.g., "4 of 6 teams").
   - **Impact**: High / Medium / Low based on severity and breadth.
   - **Source Teams**: List which teams mentioned it.
   - **Corroborates Quantitative Finding?**: Yes/No — if Yes, reference which quantitative insight from Step 2 it supports.

   Sort themes by Impact (High first), then by Frequency (most frequent first).

3. **Convergence Summary** — Write a 3-5 sentence paragraph identifying where the qualitative themes converge with or diverge from the quantitative analysis. Highlight any "blind spots" — issues that appeared in qualitative feedback but were invisible in the metrics, or vice versa.

Produce all outputs in clean markdown.`,
      expectedOutput:
        'A Team Satisfaction Matrix scoring each team across six dimensions, a Qualitative Themes Register ranking recurring feedback themes by impact and frequency with cross-references to quantitative findings, and a Convergence Summary highlighting alignment and blind spots between qualitative and quantitative data.',
      artifacts: [
        {
          name: 'Team Satisfaction Matrix',
          description:
            'Team-by-team satisfaction scores across key dimensions derived from qualitative feedback.',
          format: 'matrix',
          columns: [
            'Team',
            'Delivery Confidence',
            'Technical Health',
            'Collaboration',
            'Process Efficiency',
            'Morale',
            'Overall',
          ],
        },
        {
          name: 'Qualitative Themes Register',
          description:
            'Ranked register of recurring themes from team feedback, cross-referenced with quantitative findings.',
          format: 'table',
          columns: [
            'Theme',
            'Frequency',
            'Impact',
            'Source Teams',
            'Corroborates Quantitative Finding?',
          ],
        },
      ],
      checkpoint: {
        title: 'Qualitative Feedback Validation',
        items: [
          {
            label: 'Every team has a row in the Satisfaction Matrix',
            description:
              'No team is missing from the matrix. Each dimension has a score (actual or inferred).',
          },
          {
            label: 'Themes Register contains at least 5 themes',
            description:
              'A meaningful I&A workshop typically surfaces at least 5 distinct themes across all teams.',
          },
          {
            label: 'Cross-reference to quantitative insights is present',
            description:
              'The "Corroborates Quantitative Finding?" column is populated for every theme, with explicit references to Step 2 insights where applicable.',
          },
          {
            label: 'Convergence Summary identifies at least one blind spot',
            description:
              'The summary explicitly calls out at least one issue that appeared in only one data source (qualitative or quantitative) but not both.',
          },
        ],
        failAction:
          'Review the raw feedback to ensure all teams are captured in the Satisfaction Matrix. Add additional themes if fewer than 5 were identified — look for implicit themes in the narrative. Verify cross-references against the Step 2 Top 3 Insights. Revise the Convergence Summary to explicitly note blind spots.',
      },
    },
    {
      id: 4,
      title: 'Problem-Solving Workshop',
      purpose:
        'Facilitate structured root cause analysis on the top-voted problems using 5 Whys and Fishbone techniques, then map problems to potential solutions.',
      estimatedTime: '15 minutes',
      prompt: `You are continuing the SAFe 6.0 Inspect & Adapt workshop for [ART_NAME], PI [PI_NUMBER]. You are now facilitating the Problem-Solving Workshop segment.

**Input — Top Problems Voted by the ART:**
[PASTE_TOP_PROBLEMS_HERE]
Format: Rank | Problem Description | Impacted Teams | Votes

**Input — Reference supporting data from prior steps:**
- Variance Analysis (Step 2): [PASTE_KEY_VARIANCE_FINDINGS]
- Qualitative Themes (Step 3): [PASTE_KEY_THEMES]

**Instructions:**

For EACH of the top problems (up to 3), produce the following:

1. **Root Cause Analysis — 5 Whys** — Walk through a rigorous 5 Whys analysis:

   **Problem: [Problem Title]**
   | Why # | Question | Answer | Evidence |
   |-------|----------|--------|----------|
   | Why 1 | Why does [problem] occur? | [Answer] | [Data point or team feedback] |
   | Why 2 | Why does [Why 1 answer] happen? | [Answer] | [Evidence] |
   | Why 3 | Why does [Why 2 answer] happen? | [Answer] | [Evidence] |
   | Why 4 | Why does [Why 3 answer] happen? | [Answer] | [Evidence] |
   | Why 5 | Why does [Why 4 answer] happen? | [Answer] — ROOT CAUSE | [Evidence] |

   Each "Why" must reference evidence from the metrics (Step 1-2) or qualitative feedback (Step 3) where possible.

2. **Fishbone Diagram (Ishikawa)** — For each problem, categorize contributing factors:
   | Category | Contributing Factors |
   |----------|---------------------|
   | People | [factors] |
   | Process | [factors] |
   | Technology | [factors] |
   | Environment | [factors] |
   | Dependencies | [factors] |
   | Information | [factors] |

3. **Problem-Solution Matrix** — After analyzing all problems, produce a consolidated matrix:
   | Problem | Root Cause | Proposed Solution | Effort (S/M/L) | Impact (H/M/L) | Quick Win? | Owner Suggestion |
   |---------|-----------|-------------------|----------------|-----------------|------------|-----------------|

   For each problem:
   - Propose 1-2 solutions that address the identified root cause (not the symptom).
   - Estimate effort (Small / Medium / Large) and impact (High / Medium / Low).
   - Flag solutions that are Quick Wins (Low effort + High impact).
   - Suggest a logical owner role (e.g., "Scrum Master CoP", "System Architect", "RTE").

Produce all analyses in clean markdown. Ensure every root cause and solution is traceable back to evidence from the prior steps.`,
      expectedOutput:
        'For each top problem: a complete 5 Whys table with evidence citations and a Fishbone categorization of contributing factors. Plus a consolidated Problem-Solution Matrix mapping root causes to proposed solutions with effort/impact ratings and quick-win flags.',
      artifacts: [
        {
          name: 'Root Cause Analysis (5 Whys + Fishbone)',
          description:
            'Structured 5 Whys analysis with evidence and Fishbone (Ishikawa) categorization for each top problem.',
          format: 'table',
          columns: ['Why #', 'Question', 'Answer', 'Evidence'],
        },
        {
          name: 'Problem-Solution Matrix',
          description:
            'Consolidated matrix mapping each problem to its root cause, proposed solutions, effort/impact estimates, and ownership.',
          format: 'table',
          columns: [
            'Problem',
            'Root Cause',
            'Proposed Solution',
            'Effort (S/M/L)',
            'Impact (H/M/L)',
            'Quick Win?',
            'Owner Suggestion',
          ],
        },
      ],
      checkpoint: {
        title: 'Problem-Solving Workshop Validation',
        items: [
          {
            label: 'Each problem has a complete 5 Whys chain reaching a true root cause',
            description:
              'All 5 levels are populated. The final "Why" identifies a systemic root cause, not a surface-level symptom.',
          },
          {
            label: 'Evidence citations reference prior step outputs',
            description:
              'At least 3 of the 5 Whys per problem cite specific data from the PI Metrics, Variance Analysis, or Qualitative Themes.',
          },
          {
            label: 'Fishbone covers at least 4 of 6 categories per problem',
            description:
              'Contributing factors are spread across multiple categories, not concentrated in just one or two.',
          },
          {
            label: 'Problem-Solution Matrix has at least one solution per problem',
            description:
              'Every problem row in the matrix has a proposed solution with effort, impact, and owner populated.',
          },
          {
            label: 'At least one Quick Win is identified',
            description:
              'The matrix flags at least one low-effort, high-impact solution as a Quick Win for immediate action.',
          },
        ],
        failAction:
          'Deepen any incomplete 5 Whys chains by asking further "why" until a systemic root cause is reached. Add evidence citations from Steps 1-3. Expand Fishbone categories with at least one factor each. Ensure every problem has a solution row in the matrix and reassess effort/impact ratings.',
      },
    },
    {
      id: 5,
      title: 'Improvement Backlog',
      purpose:
        'Create a prioritized, actionable list of improvements for the next PI with clear ownership, success criteria, and a concrete action plan.',
      estimatedTime: '10 minutes',
      prompt: `You are completing the SAFe 6.0 Inspect & Adapt workshop for [ART_NAME], PI [PI_NUMBER]. This is the final step: building the Improvement Backlog and Action Plan.

**Input — Problem-Solution Matrix from Step 4:**
[PASTE_PROBLEM_SOLUTION_MATRIX_HERE]

**Input — Additional improvement ideas from the workshop:**
[PASTE_ADDITIONAL_IMPROVEMENT_IDEAS_OR_NONE]

**Input — ART context:**
- Next PI: [NEXT_PI_NUMBER]
- Number of sprints in next PI: [NUMBER_OF_SPRINTS]
- Known capacity constraints: [CONSTRAINTS_OR_NONE]

**Instructions:**

1. **Improvement Backlog** — Consolidate all solutions from the Problem-Solution Matrix plus any additional improvement ideas into a single prioritized backlog:
   | ID | Improvement | Category | Priority (WSJF) | Owner | Target PI | Success Criteria |
   |----|-------------|----------|-----------------|-------|-----------|-----------------|
   | IMP-001 | [Improvement description] | [Process/Technical/People/Tooling] | [WSJF score] | [Specific role or name] | [PI number] | [Measurable success criteria] |

   For WSJF prioritization, estimate:
   - **Business Value**: How much does this improvement benefit the ART? (1-10)
   - **Time Criticality**: How urgent is this? (1-10)
   - **Risk Reduction**: Does this reduce risk or enable other improvements? (1-10)
   - **Job Size**: How large is the effort? (1-10, where 10 = very small)
   - **WSJF** = (Business Value + Time Criticality + Risk Reduction) / Job Size

   Sort the backlog by WSJF score (highest first). Include the WSJF breakdown in a note below the table.

2. **I&A Action Plan** — For the top 5 improvements (or all if fewer than 5), create a detailed action plan:
   | ID | Improvement | Action Steps | Responsible | Sprint Target | Dependencies | Status |
   |----|-------------|-------------|-------------|---------------|--------------|--------|

   For each improvement:
   - Break it into 2-4 concrete action steps.
   - Assign a specific responsible party (not just a role — suggest who should own it).
   - Set a sprint target within the next PI for completion.
   - Note any dependencies on other improvements or external factors.
   - Set initial status to "Not Started".

3. **Carryover Check** — List any improvements from the PREVIOUS PI's improvement backlog that were not completed, with a recommendation to either:
   - Carry forward (re-prioritize with WSJF)
   - Drop (with justification)
   - Merge into a current improvement item

   If no previous backlog data is available, note: "No prior improvement backlog provided — recommend establishing baseline tracking."

Produce all outputs in clean markdown. The Improvement Backlog is the primary artifact that the RTE will track through the next PI.`,
      expectedOutput:
        'A WSJF-prioritized Improvement Backlog with clear ownership and measurable success criteria, a detailed I&A Action Plan breaking top improvements into sprint-targeted action steps, and a Carryover Check addressing any incomplete improvements from the previous PI.',
      artifacts: [
        {
          name: 'Improvement Backlog',
          description:
            'WSJF-prioritized list of all improvements with ownership, target PI, and measurable success criteria.',
          format: 'table',
          columns: [
            'ID',
            'Improvement',
            'Category',
            'Priority WSJF',
            'Owner',
            'Target PI',
            'Success Criteria',
          ],
        },
        {
          name: 'I&A Action Plan',
          description:
            'Detailed action plan for top improvements with concrete steps, responsibilities, sprint targets, and dependencies.',
          format: 'table',
          columns: [
            'ID',
            'Improvement',
            'Action Steps',
            'Responsible',
            'Sprint Target',
            'Dependencies',
            'Status',
          ],
        },
      ],
      checkpoint: {
        title: 'Improvement Backlog Validation',
        items: [
          {
            label: 'Every solution from the Problem-Solution Matrix is represented',
            description:
              'All proposed solutions from Step 4 appear in the Improvement Backlog — none were lost in translation.',
          },
          {
            label: 'WSJF scores are calculated and backlog is sorted correctly',
            description:
              'Each improvement has a WSJF score with the breakdown visible, and the backlog is sorted highest WSJF first.',
          },
          {
            label: 'Success criteria are measurable',
            description:
              'Each success criterion contains a specific, quantifiable measure (e.g., "Reduce dependency wait time by 30%"), not vague outcomes.',
          },
          {
            label: 'Action Plan has sprint-level targets within the next PI',
            description:
              'Each action step in the plan targets a specific sprint, not just "next PI" generically.',
          },
          {
            label: 'Carryover Check is addressed',
            description:
              'Either prior incomplete improvements are listed with carry-forward/drop decisions, or the absence of prior data is explicitly noted.',
          },
        ],
        failAction:
          'Cross-reference the Improvement Backlog against the Step 4 Problem-Solution Matrix to find any missing items. Recalculate WSJF scores if the sort order appears incorrect. Revise vague success criteria to include specific metrics. Add sprint-level targets to any action steps that only reference the PI generically.',
      },
    },
  ],
};
