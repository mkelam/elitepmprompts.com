import type { Blueprint } from '@/lib/types';

export const safeArtSync: Blueprint = {
  id: 'safe-art-sync',
  slug: 'safe-art-sync',
  title: 'SAFe ART Sync Orchestrator',
  subtitle:
    'Produce a structured ART Sync meeting output — dependency tracking, impediment management, PI objective progress measurement, and an escalation brief for leadership.',
  methodology: 'SAFe',
  version: '6.0',
  estimatedTime: '30-45 minutes',
  stepCount: 4,
  tier: 'premium',
  price: 29700,
  suiteId: 'safe-suite',
  requiredInputs: [
    {
      name: 'Dependency Register',
      description:
        'The current list of cross-team dependencies identified during PI Planning or previous ART Syncs, including status updates.',
      format: 'Table with Dep ID, From Team, To Team, Description, Status, Due Sprint',
    },
    {
      name: 'Impediment Log',
      description:
        'Active and recently resolved impediments reported by teams, including severity and current owners.',
      format: 'Table or list with ID, Description, Impacted Teams, Severity, Owner, Status',
    },
    {
      name: 'PI Objectives with Progress',
      description:
        'Each team\'s committed and uncommitted PI Objectives with current completion percentage and risk flags.',
      format: 'Table with Team, Objective, Type (C/U), Business Value, % Complete, Risk Flags',
    },
    {
      name: 'Previous ART Sync Actions',
      description:
        'Any open action items or decisions from the prior ART Sync meeting.',
      format: 'List with action description, owner, and status',
    },
  ],
  artifactsProduced: [
    'Dependency Status Board',
    'Impediment Register',
    'PI Objectives Progress Dashboard',
    'ART Sync Escalation Brief',
  ],
  steps: [
    {
      id: 1,
      title: 'Cross-Team Dependency Status',
      purpose:
        'Review all active dependencies across the ART to identify blockers, at-risk deliverables, and any new dependencies that have emerged since the last sync.',
      estimatedTime: '10 minutes',
      prompt: `You are a SAFe 6.0 Release Train Engineer (RTE) facilitating an ART Sync meeting. Your first task is to produce a comprehensive Dependency Status Board.

**Context:**
- ART Name: [ART_NAME]
- Current PI: [PI_NUMBER]
- Current Sprint: [CURRENT_SPRINT] of [TOTAL_SPRINTS]
- Number of Teams: [NUMBER_OF_TEAMS]

**Input Data — Dependency Register:**
[PASTE_DEPENDENCY_REGISTER_HERE]
Format: Dep ID | From Team | To Team | Description | Status | Due Sprint

**Input Data — Any new dependencies identified this sprint:**
[PASTE_NEW_DEPENDENCIES_OR_NONE]

**Instructions:**

1. **Dependency Status Board** — Produce a comprehensive table:
   | Dep ID | From Team | To Team | Description | Status | Due Sprint | Blocker? |
   |--------|-----------|---------|-------------|--------|------------|----------|

   For each dependency:
   - **Status**: Use one of: On Track, At Risk, Blocked, Completed, New.
   - **Due Sprint**: The sprint by which the dependency must be resolved.
   - **Blocker?**: Yes / No — mark "Yes" if this dependency is currently preventing a team from making progress.

   Rules for status determination:
   - If due sprint is the current sprint or earlier and status is not "Completed", mark as "At Risk" or "Blocked".
   - If a dependency was not in the original register, mark status as "New".
   - If a dependency has been delivered, mark as "Completed" and note the sprint it was resolved.

2. **Dependency Risk Summary** — Below the board, provide:
   - **Total Active Dependencies**: [count]
   - **Blocked**: [count] — list the Dep IDs
   - **At Risk**: [count] — list the Dep IDs
   - **On Track**: [count]
   - **Completed This Sprint**: [count]
   - **New This Sprint**: [count]

3. **Dependency Heat Map** — Produce a team-by-team matrix showing dependency density:
   | From \\ To | Team A | Team B | Team C | ... |
   |-----------|--------|--------|--------|-----|
   | Team A    | -      | [count]| [count]| ... |
   | Team B    | [count]| -      | [count]| ... |

   Each cell shows the number of active (non-completed) dependencies from the row team to the column team. Highlight any cell with 3+ dependencies as a concentration risk.

Produce all outputs in clean markdown. Flag any dependency that is both "Blocked" and due in the current or next sprint as requiring immediate escalation.`,
      expectedOutput:
        'A fully populated Dependency Status Board with status classification for every dependency, a Dependency Risk Summary with counts by status category, and a Dependency Heat Map showing cross-team dependency density with concentration risk flags.',
      artifacts: [
        {
          name: 'Dependency Status Board',
          description:
            'Complete status tracker for all cross-team dependencies with blocker identification.',
          format: 'table',
          columns: [
            'Dep ID',
            'From Team',
            'To Team',
            'Description',
            'Status',
            'Due Sprint',
            'Blocker?',
          ],
        },
      ],
      checkpoint: {
        title: 'Dependency Status Validation',
        items: [
          {
            label: 'Every dependency from the input register has a row in the board',
            description:
              'No dependency from the original register is missing. Any new dependencies are also included with "New" status.',
          },
          {
            label: 'Status classifications are logically consistent',
            description:
              'Dependencies past their due sprint are marked At Risk or Blocked, not On Track. Completed dependencies have a resolution sprint noted.',
          },
          {
            label: 'Blocker flags are applied to all blocking dependencies',
            description:
              'Any dependency preventing a team from progressing is marked Blocker? = Yes.',
          },
          {
            label: 'Dependency Heat Map accounts for all active dependencies',
            description:
              'The sum of all cells in the heat map equals the total active (non-completed) dependency count.',
          },
        ],
        failAction:
          'Reconcile the Dependency Status Board against the input register to find missing entries. Review status logic for any dependency past its due date that is still marked On Track. Verify the heat map cell counts against the board data.',
      },
    },
    {
      id: 2,
      title: 'Impediment Tracker',
      purpose:
        'Identify, categorize, and escalate impediments across the ART, ensuring each has a clear owner, resolution plan, and expected timeline.',
      estimatedTime: '10 minutes',
      prompt: `You are continuing the ART Sync for [ART_NAME], PI [PI_NUMBER], Sprint [CURRENT_SPRINT].

**Input — Current Impediment Log:**
[PASTE_IMPEDIMENT_LOG_HERE]
Format: ID | Description | Impacted Teams | Severity | Owner | Status

**Input — New impediments raised this sprint:**
[PASTE_NEW_IMPEDIMENTS_OR_NONE]

**Input — Blocked dependencies from Step 1 (reference):**
[PASTE_BLOCKED_DEPENDENCIES_FROM_STEP_1]

**Instructions:**

1. **Impediment Register** — Produce a comprehensive register:
   | ID | Description | Impacted Teams | Severity | Owner | Escalation Level | Resolution Plan | ETA |
   |----|-------------|---------------|----------|-------|-----------------|-----------------|-----|

   For each impediment:
   - **Severity**: Critical (blocking multiple teams), High (blocking one team), Medium (slowing progress), Low (minor friction).
   - **Owner**: The specific person or role responsible for driving resolution.
   - **Escalation Level**: Team (can be resolved within a team), ART (needs RTE or cross-team coordination), Portfolio (needs management intervention), External (depends on vendor/org outside the ART).
   - **Resolution Plan**: A 1-2 sentence description of the planned resolution approach.
   - **ETA**: Expected resolution date or sprint.

   Rules:
   - Any blocked dependency from Step 1 that does not already appear as an impediment should be added as a new entry.
   - Impediments marked "Resolved" in the input should be moved to a separate "Recently Resolved" section below the active register.
   - New impediments should be assigned IDs following the existing numbering sequence.

2. **Impediment Aging Analysis** — For each active impediment, calculate the age (number of sprints since first reported). Flag any impediment older than 2 sprints as "Aging" and recommend escalation if not already escalated.

3. **Escalation Summary** — Group impediments by escalation level:
   - **Portfolio-Level Escalations**: [list impediment IDs and one-line descriptions]
   - **ART-Level Actions**: [list impediment IDs and one-line descriptions]
   - **Team-Level Actions**: [list impediment IDs and one-line descriptions]
   - **External Dependencies**: [list impediment IDs and one-line descriptions]

Produce all outputs in clean markdown.`,
      expectedOutput:
        'A comprehensive Impediment Register with severity, ownership, escalation level, resolution plans, and ETAs for every active impediment. Includes an aging analysis flagging stale impediments and an escalation summary grouped by resolution level.',
      artifacts: [
        {
          name: 'Impediment Register',
          description:
            'Full impediment tracker with severity classification, ownership, escalation levels, resolution plans, and ETAs.',
          format: 'table',
          columns: [
            'ID',
            'Description',
            'Impacted Teams',
            'Severity',
            'Owner',
            'Escalation Level',
            'Resolution Plan',
            'ETA',
          ],
        },
      ],
      checkpoint: {
        title: 'Impediment Tracker Validation',
        items: [
          {
            label: 'All input impediments are accounted for',
            description:
              'Every impediment from the input log appears in either the active register or the "Recently Resolved" section.',
          },
          {
            label: 'Blocked dependencies from Step 1 are cross-referenced',
            description:
              'Any blocked dependency that was not already tracked as an impediment has been added to the register.',
          },
          {
            label: 'Every active impediment has an owner and resolution plan',
            description:
              'No active impediment has blank Owner, Resolution Plan, or ETA fields.',
          },
          {
            label: 'Aging impediments are flagged',
            description:
              'Any impediment older than 2 sprints is explicitly flagged with an escalation recommendation.',
          },
          {
            label: 'Escalation Summary groups are complete',
            description:
              'Every active impediment appears in exactly one escalation group (Portfolio, ART, Team, or External).',
          },
        ],
        failAction:
          'Cross-reference the input impediment log and Step 1 blocked dependencies against the register to find gaps. Populate missing Owner, Resolution Plan, and ETA fields. Calculate ages for any impediment missing an aging flag. Verify escalation groupings cover all active impediments.',
      },
    },
    {
      id: 3,
      title: 'Progress Toward PI Objectives',
      purpose:
        'Measure and visualize each team\'s progress against their committed and uncommitted PI Objectives to assess whether the ART is on track to meet its PI goals.',
      estimatedTime: '10 minutes',
      prompt: `You are continuing the ART Sync for [ART_NAME], PI [PI_NUMBER], Sprint [CURRENT_SPRINT] of [TOTAL_SPRINTS].

**Input — PI Objectives with Progress:**
[PASTE_PI_OBJECTIVES_PROGRESS_HERE]
Format: Team | Objective | Type (C/U) | Business Value | % Complete | Risk Flags

**Input — Reference impediments and dependencies from Steps 1-2:**
- Blocked dependencies: [LIST_BLOCKED_DEP_IDS]
- Critical/High impediments: [LIST_CRITICAL_HIGH_IMPEDIMENT_IDS]

**Instructions:**

1. **PI Objectives Progress Dashboard** — Produce a comprehensive progress table:
   | Team | Objective | Type (C/U) | Business Value | % Complete | On Track? | Risk Flags |
   |------|-----------|-----------|----------------|------------|-----------|------------|

   For each objective:
   - **% Complete**: Use the provided value.
   - **On Track?**: Calculate expected progress based on sprint position. If current sprint is 3 of 5, expected progress is ~60%. Apply these rules:
     - On Track: Actual % >= Expected % - 10%
     - At Risk: Actual % is between Expected % - 10% and Expected % - 25%
     - Off Track: Actual % < Expected % - 25%
   - **Risk Flags**: Carry forward any flags from the input. Add new flags if:
     - The objective depends on a blocked dependency (reference Step 1 Dep ID).
     - The objective is impacted by a Critical/High impediment (reference Step 2 Impediment ID).

2. **Team-Level Summary** — For each team, produce a rollup:
   | Team | Committed Obj. Count | Committed On Track | Committed At Risk | Committed Off Track | Uncommitted On Track | Overall Health |
   |------|--------------------|--------------------|-------------------|--------------------|--------------------|----------------|

   **Overall Health**: Green (all committed On Track), Amber (any committed At Risk), Red (any committed Off Track).

3. **ART-Level Predictability Forecast** — Based on current progress:
   - **Projected PI Predictability**: Estimate the likely PI Predictability Measure if current trends continue.
   - **Objectives at Greatest Risk**: List the top 3 objectives most likely to be missed, with reasoning.
   - **Recommended Interventions**: For each at-risk or off-track committed objective, suggest a specific intervention (e.g., "Reassign 2 story points from Team B to unblock DEP-007").

Produce all outputs in clean markdown.`,
      expectedOutput:
        'A PI Objectives Progress Dashboard showing every objective with completion percentage and on-track assessment, a Team-Level Summary with health indicators, and an ART-Level Predictability Forecast identifying at-risk objectives and recommending specific interventions.',
      artifacts: [
        {
          name: 'PI Objectives Progress Dashboard',
          description:
            'Objective-by-objective progress tracker with on-track assessments and risk flags cross-referenced against dependencies and impediments.',
          format: 'table',
          columns: [
            'Team',
            'Objective',
            'Type C/U',
            'Business Value',
            '% Complete',
            'On Track?',
            'Risk Flags',
          ],
        },
      ],
      checkpoint: {
        title: 'PI Objectives Progress Validation',
        items: [
          {
            label: 'Every PI Objective from the input is represented',
            description:
              'No committed or uncommitted objective is missing from the Progress Dashboard.',
          },
          {
            label: 'On Track? assessments use the sprint-position formula',
            description:
              'The expected progress percentage is calculated from (Current Sprint / Total Sprints) and the 10%/25% thresholds are applied correctly.',
          },
          {
            label: 'Risk flags cross-reference Steps 1 and 2',
            description:
              'Objectives impacted by blocked dependencies or critical impediments have explicit risk flag references (e.g., "Blocked by DEP-003").',
          },
          {
            label: 'Team-Level Summary health colors are consistent with objective data',
            description:
              'A team is not marked Green if any committed objective is At Risk or Off Track.',
          },
        ],
        failAction:
          'Verify all objectives from the input appear in the dashboard. Recalculate expected progress using the sprint-position formula and reapply On Track/At Risk/Off Track thresholds. Cross-reference the blocked dependency and critical impediment lists from Steps 1-2 to add missing risk flags.',
      },
    },
    {
      id: 4,
      title: 'Escalation Brief',
      purpose:
        'Prepare a concise, action-oriented summary for leadership and management that highlights key risks, blockers requiring intervention, and decision points.',
      estimatedTime: '10 minutes',
      prompt: `You are completing the ART Sync for [ART_NAME], PI [PI_NUMBER], Sprint [CURRENT_SPRINT]. This is the final step: preparing the Escalation Brief for leadership.

**Input — Reference all outputs from prior steps:**
- Dependency Status Board (Step 1): [PASTE_OR_REFERENCE_KEY_FINDINGS]
- Impediment Register escalation summary (Step 2): [PASTE_OR_REFERENCE_ESCALATION_SUMMARY]
- PI Objectives Progress — at-risk/off-track items (Step 3): [PASTE_OR_REFERENCE_AT_RISK_OBJECTIVES]
- Recommended Interventions (Step 3): [PASTE_OR_REFERENCE_INTERVENTIONS]

**Input — Additional context:**
- Previous ART Sync open actions: [PASTE_PREVIOUS_ACTIONS_OR_NONE]
- Upcoming milestones or releases: [UPCOMING_MILESTONES_OR_NONE]

**Instructions:**

1. **ART Sync Escalation Brief** — Produce a structured one-page brief:

   **Executive Summary** (3-5 sentences):
   - Overall ART health (Green/Amber/Red) with one-sentence justification.
   - Number of teams on track vs. at risk vs. off track.
   - Most critical issue requiring immediate attention.

   **Key Risks** — Table format:
   | Risk ID | Description | Likelihood (H/M/L) | Impact (H/M/L) | Mitigation | Owner |
   |---------|-------------|--------------------|-----------------|-----------:|-------|
   Include only risks that could impact PI delivery. Draw from dependency blockers, critical impediments, and off-track objectives.

   **Blockers Requiring Management Action** — For each:
   | Blocker | Impacted Teams | Current Status | Action Requested | Urgency |
   |---------|---------------|----------------|-----------------|---------|
   Only include items that cannot be resolved at the ART level and require portfolio or organizational intervention.

   **Resource Requests** — If any interventions from Step 3 require additional resources:
   | Request | Justification | Impact if Not Fulfilled | Requesting Team |
   |---------|--------------|------------------------|-----------------|

   **Decision Points** — Any decisions that leadership must make:
   | Decision Needed | Context | Options | Recommended Option | Deadline |
   |----------------|---------|---------|-------------------|----------|

2. **Action Items from This ART Sync** — Compile all action items generated across Steps 1-4:
   | Action ID | Action | Owner | Due Date | Priority |
   |-----------|--------|-------|----------|----------|

   Assign sequential IDs (AS-[PI]-[Sprint]-001, AS-[PI]-[Sprint]-002, etc.). Include actions for:
   - Resolving blocked dependencies
   - Driving impediment resolution plans
   - Implementing recommended interventions for at-risk objectives
   - Any new actions identified during brief preparation

Produce all outputs in clean markdown. The brief should be concise enough to present in a 5-minute leadership review.`,
      expectedOutput:
        'A structured Escalation Brief containing an executive summary with ART health assessment, a key risks table, blockers requiring management action, resource requests, and decision points. Plus a compiled action items list from the entire ART Sync with ownership and deadlines.',
      artifacts: [
        {
          name: 'ART Sync Escalation Brief',
          description:
            'Concise leadership-ready brief covering executive summary, key risks, management-level blockers, resource requests, and decision points.',
          format: 'text',
        },
      ],
      checkpoint: {
        title: 'Escalation Brief Validation',
        items: [
          {
            label: 'Executive Summary accurately reflects the data from Steps 1-3',
            description:
              'The overall health rating, team counts, and critical issue cited in the summary are consistent with the detailed findings.',
          },
          {
            label: 'Only true management-level blockers are escalated',
            description:
              'Items in the "Blockers Requiring Management Action" section cannot be resolved by the RTE or within the ART. Team-level issues are not over-escalated.',
          },
          {
            label: 'All action items have owners and due dates',
            description:
              'Every row in the Action Items table has a specific owner and a concrete due date (not just "ASAP" or "next sprint").',
          },
          {
            label: 'Decision Points have clear options and recommendations',
            description:
              'Each decision point presents at least two options with a recommended choice and a deadline for the decision.',
          },
          {
            label: 'Brief is concise enough for a 5-minute review',
            description:
              'The total brief fits on approximately one page and uses tables rather than lengthy prose.',
          },
        ],
        failAction:
          'Cross-check the executive summary against Steps 1-3 outputs for accuracy. Review escalated blockers to ensure they truly require management intervention — demote any that can be resolved at ART level. Add missing owners and due dates to action items. Ensure each decision point has concrete options, not open-ended questions.',
      },
    },
  ],
};
