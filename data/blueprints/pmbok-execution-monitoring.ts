import type { Blueprint } from '@/lib/types';

export const pmbokExecutionMonitoring: Blueprint = {
  id: 'pmbok-execution-monitoring',
  slug: 'pmbok-execution-monitoring',
  title: 'PMBOK Execution & Monitoring Copilot',
  subtitle:
    'AI-guided project execution monitoring aligned with PMBOK 7th Edition — from Earned Value Management through status reporting, change control, and integrated performance reporting with corrective actions.',
  methodology: 'PMBOK',
  version: '1.0.0',
  estimatedTime: '60-75 minutes',
  stepCount: 5,
  steps: [
    // ── Step 0: Context Primer ───────────────────────────────────────────
    {
      id: 0,
      title: 'Context Primer',
      purpose:
        'Establish the AI session as a PMP-certified Project Manager specializing in execution monitoring and control, load all project baselines from the initiation/planning phase, and set the ground rules for performance-driven output.',
      estimatedTime: '5 min',
      prompt:
        'You are a PMP-certified Project Manager facilitating a Project Execution & Monitoring session aligned with PMBOK 7th Edition principles and the Measurement performance domain. Your role is to guide me through a structured, step-by-step process that produces production-ready monitoring and control artifacts.\n\nSESSION RULES — follow these throughout the entire session:\n1. Use PMBOK terminology and artifact formats exclusively.\n2. Produce tables, not narratives — every artifact must be in structured table format unless explicitly stated otherwise.\n3. Flag every assumption you make with [ASSUMPTION] so I can confirm or correct it.\n4. Use correct PMBOK terms: Earned Value (not progress value), Cost Performance Index (not cost ratio), Management Reserve (not extra budget).\n5. Ask clarifying questions before proceeding if critical information is missing.\n6. Number all artifacts for easy cross-referencing (e.g., CR-001, IA-001, CA-001).\n7. Apply PMBOK 7th Edition performance domains with emphasis on: Project Work, Delivery, Measurement, and Uncertainty.\n8. All financial figures should use consistent currency formatting.\n9. RAG status definitions: RED = off-track, immediate action required; AMBER = at risk, monitoring required; GREEN = on-track, no action needed.\n\nTo begin, I need you to acknowledge these rules and confirm you are ready. Then I will paste the following baseline context:\n\nBASELINE CONTEXT TO PASTE BELOW:\n---\n**Project Name & ID**\n[Paste your project name and identifier]\n\n**Scope Baseline**\n[Paste your approved scope statement, WBS summary, and total number of work packages]\n\n**Schedule Baseline**\n[Paste your approved project schedule — key milestones, critical path activities, planned start/end dates, total planned duration]\n\n**Cost Baseline**\n[Paste your approved budget — Budget at Completion (BAC), cost breakdown by phase or major deliverable, contingency reserve, management reserve]\n\n**Current Reporting Period**\n[Paste the reporting period — e.g., "Month 3 of 12" or "Sprint 6 of 20" — and the data date for EVM calculations]\n\n**Actual Progress Data**\n[Paste actual progress: work packages completed, work packages in progress, percentage complete for in-progress items, actual costs incurred to date, actual schedule progress]\n\n**Known Issues & Risks**\n[Paste any currently active issues, triggered risks, or pending change requests]\n---\n\nAfter receiving my context, summarize it back to me in a structured format and confirm:\n- Project baselines are loaded (scope, schedule, cost)\n- BAC and planned value curve are understood\n- Current reporting period and data date are set\n- Actual progress data is captured\n- Active issues and risks are catalogued\n- Any missing data that would prevent EVM calculations is identified',
      expectedOutput:
        'Acknowledgement of session rules, structured summary of all project baselines (scope, schedule, cost), confirmation of BAC and reporting period, summary of actual progress data, catalogue of active issues and risks, and identification of any missing information needed for EVM calculations.',
      artifacts: [
        {
          name: 'Baseline Context Summary',
          description:
            'Structured recap of project baselines, current reporting period, actual progress, and active issues as understood by the AI facilitator.',
          format: 'table',
          columns: [
            'Parameter',
            'Baseline Value',
            'Current Actual',
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
              'The AI explicitly confirmed it will follow PMBOK terminology, table-based artifacts, assumption flagging, RAG definitions, and correct naming conventions.',
          },
          {
            label: 'All three baselines are loaded',
            description:
              'Scope baseline, schedule baseline, and cost baseline are correctly captured with sufficient detail for EVM calculations.',
          },
          {
            label: 'BAC and data date are confirmed',
            description:
              'Budget at Completion and the current data date are explicitly stated and will be used consistently throughout the session.',
          },
          {
            label: 'Actual progress data is complete',
            description:
              'Work packages completed, in-progress percentages, and actual costs are sufficient to calculate EV and AC.',
          },
          {
            label: 'Missing information is flagged',
            description:
              'Any gaps in baselines or actuals have been identified and flagged before proceeding to EVM calculations.',
          },
        ],
        failAction:
          'Provide missing baseline data, clarify the reporting period and data date, supply actual cost and progress figures, and re-run Step 0 until all EVM inputs are available.',
      },
    },

    // ── Step 1: Earned Value Management Dashboard ──────────────────────
    {
      id: 1,
      title: 'Earned Value Management Dashboard',
      purpose:
        'Calculate all PMBOK Earned Value Management metrics to provide an objective, quantitative assessment of project cost and schedule performance, including forecasting metrics for project completion.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s build the Earned Value Management Dashboard.\n\nUsing the baselines and actual progress data from Step 0, calculate all EVM metrics. EVM provides the single most objective measure of project health in PMBOK.\n\nEVM CALCULATION RULES:\n1. Planned Value (PV) = the authorized budget assigned to scheduled work as of the data date.\n2. Earned Value (EV) = the measure of work performed expressed in terms of the budget authorized for that work.\n3. Actual Cost (AC) = the realized cost incurred for the work performed as of the data date.\n4. BAC = Budget at Completion (total approved budget).\n5. Show ALL intermediate calculations — do not just present final numbers.\n\nProduce the following artifacts:\n\n**Artifact 1A: EVM Metrics Table**\n\n| Metric | Formula | Value | Interpretation | RAG Status |\n|--------|---------|-------|----------------|------------|\n| Budget at Completion (BAC) | Approved budget | $ | Total project budget | — |\n| Planned Value (PV) | Cumulative planned spend to data date | $ | What SHOULD have been done by now | — |\n| Earned Value (EV) | Sum of budgets for completed + weighted in-progress work | $ | What HAS been done (in budget terms) | — |\n| Actual Cost (AC) | Actual cumulative spend to data date | $ | What was actually SPENT | — |\n| Schedule Variance (SV) | EV - PV | $ | Negative = behind schedule | [RAG] |\n| Cost Variance (CV) | EV - AC | $ | Negative = over budget | [RAG] |\n| Schedule Performance Index (SPI) | EV / PV | ratio | < 1.0 = behind schedule | [RAG] |\n| Cost Performance Index (CPI) | EV / AC | ratio | < 1.0 = over budget | [RAG] |\n| Estimate at Completion (EAC) | BAC / CPI | $ | Projected total cost | [RAG] |\n| Estimate to Complete (ETC) | EAC - AC | $ | Remaining cost to finish | — |\n| Variance at Completion (VAC) | BAC - EAC | $ | Negative = projected overrun | [RAG] |\n| To-Complete Performance Index (TCPI) | (BAC - EV) / (BAC - AC) | ratio | > 1.0 = must improve efficiency | [RAG] |\n| Percent Complete (EV-based) | EV / BAC x 100 | % | Objective % complete | — |\n| Percent Spent | AC / BAC x 100 | % | Budget consumption rate | — |\n\nRAG THRESHOLDS:\n- SPI/CPI: GREEN >= 0.95, AMBER 0.80-0.94, RED < 0.80\n- SV/CV: GREEN >= 0, AMBER within -10% of PV/EV, RED worse than -10%\n- TCPI: GREEN <= 1.05, AMBER 1.06-1.20, RED > 1.20\n- EAC: GREEN <= BAC, AMBER up to 10% over BAC, RED > 10% over BAC\n\n**Artifact 1B: Performance Trend Analysis**\n\nIf historical period data is available, show the trend. If not, establish period 1 baseline and flag [ASSUMPTION] for trend direction.\n\n| Period | PV | EV | AC | SPI | CPI | SV | CV | Trend Direction |\n|--------|----|----|----|----|-----|----|----|------------------|\n| Period 1 | | | | | | | | — |\n| Period 2 | | | | | | | | Improving / Declining / Stable |\n| Current | | | | | | | | Improving / Declining / Stable |\n\n**Artifact 1C: Forecast Summary**\n\n| Forecast Scenario | Formula | EAC | ETC | VAC | Completion Date | Assumption |\n|-------------------|---------|-----|-----|-----|----------------|------------|\n| Optimistic (current CPI continues) | BAC / CPI | $ | $ | $ | [date] | Past performance continues |\n| Pessimistic (CPI x SPI factor) | AC + (BAC - EV) / (CPI x SPI) | $ | $ | $ | [date] | Both cost and schedule inefficiency continue |\n| Management estimate | [Manual input or BAC] | $ | $ | $ | [date] | Corrective actions will restore performance |\n\nFLAGGING RULES:\n- Flag if CPI < 0.80 — project may be unrecoverable without significant re-baselining.\n- Flag if SPI < 0.80 — critical path is likely impacted; schedule recovery plan needed.\n- Flag if TCPI > 1.20 — remaining work must be performed at 120%+ efficiency, which is rarely achievable.\n- Flag if EAC exceeds BAC + Management Reserve — project is forecasting beyond all reserves.\n- Flag any metric that has declined for 2+ consecutive periods.',
      expectedOutput:
        'Artifact 1A: A complete EVM Metrics Table with all 14 metrics calculated, interpreted, and RAG-rated. Artifact 1B: A Performance Trend Analysis showing metric progression across periods. Artifact 1C: A Forecast Summary with optimistic, pessimistic, and management estimate scenarios. All critical thresholds are flagged.',
      artifacts: [
        {
          name: 'EVM Metrics Table',
          description:
            'Complete Earned Value Management metrics with formulas, calculated values, interpretations, and RAG status for each metric.',
          format: 'table',
          columns: ['Metric', 'Formula', 'Value', 'Interpretation', 'RAG Status'],
        },
        {
          name: 'Performance Trend Analysis',
          description:
            'Period-over-period trend of key EVM metrics (PV, EV, AC, SPI, CPI) showing performance trajectory.',
          format: 'table',
          columns: ['Period', 'PV', 'EV', 'AC', 'SPI', 'CPI', 'Trend Direction'],
        },
        {
          name: 'Forecast Summary',
          description:
            'Three-scenario forecast (optimistic, pessimistic, management estimate) with EAC, ETC, VAC, and projected completion dates.',
          format: 'table',
          columns: ['Forecast Scenario', 'Formula', 'EAC', 'ETC', 'VAC', 'Completion Date'],
        },
      ],
      checkpoint: {
        title: 'EVM Dashboard Verification',
        items: [
          {
            label: 'All EVM metrics are calculated correctly',
            description:
              'PV, EV, AC, SV, CV, SPI, CPI, EAC, ETC, VAC, and TCPI are all present with correct formulas and values.',
          },
          {
            label: 'RAG thresholds are consistently applied',
            description:
              'Every metric with a RAG status uses the defined thresholds (GREEN/AMBER/RED) consistently.',
          },
          {
            label: 'Forecasts include multiple scenarios',
            description:
              'At least three forecast scenarios (optimistic, pessimistic, management) are provided with supporting assumptions.',
          },
          {
            label: 'Critical flags are raised',
            description:
              'Any metric below the RED threshold is explicitly flagged with a warning and recommended action.',
          },
          {
            label: 'Calculations are transparent',
            description:
              'All intermediate calculations are shown — values are traceable from baselines to final metrics.',
          },
        ],
        failAction:
          'Correct calculation errors, apply consistent RAG thresholds, add missing forecast scenarios, and ensure all critical flags are visible with recommended actions.',
      },
    },

    // ── Step 2: Status Reporting & Variance Analysis ───────────────────
    {
      id: 2,
      title: 'Status Reporting & Variance Analysis',
      purpose:
        'Translate EVM metrics into stakeholder-ready status reports, assess variance by knowledge area, track milestones, and maintain a structured issue log — the core of the Project Work and Delivery performance domains.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s build the Status Report and Variance Analysis.\n\nUsing the EVM dashboard from Step 1 and the baseline data from Step 0, produce stakeholder-ready reporting artifacts. These reports translate raw numbers into actionable intelligence for sponsors, steering committees, and project teams.\n\nProduce the following artifacts:\n\n**Artifact 2A: Project Status Report**\n\n| Knowledge Area | RAG Status | Key Metrics | Commentary | Actions Required |\n|---------------|------------|-------------|-----------|------------------|\n| Overall Project | [RAG] | SPI: [x], CPI: [x] | [1-2 sentence summary] | [Actions or "None"] |\n| Scope Management | [RAG] | WPs Complete: X/Y, Scope Changes: Z | [Are we delivering what was planned?] | |\n| Schedule Management | [RAG] | SPI: [x], Days Ahead/Behind: [n] | [Are we on time?] | |\n| Cost Management | [RAG] | CPI: [x], CV: $[x], EAC: $[x] | [Are we on budget?] | |\n| Quality Management | [RAG] | Defects: [n], Rework: [%] | [Are deliverables meeting quality standards?] | |\n| Risk Management | [RAG] | Open Risks: [n], Triggered: [n] | [Are risks under control?] | |\n| Stakeholder Management | [RAG] | Engagement Issues: [n] | [Are stakeholders engaged and supportive?] | |\n| Resource Management | [RAG] | Utilization: [%], Vacancies: [n] | [Are resources available and productive?] | |\n| Communications | [RAG] | Reports Issued: [n/n], Escalations: [n] | [Is communication effective?] | |\n| Procurement | [RAG] | Active Contracts: [n], Issues: [n] | [Are vendors performing?] | |\n\nOVERALL STATUS RULES:\n- Overall RAG = RED if ANY knowledge area is RED.\n- Overall RAG = AMBER if 2+ knowledge areas are AMBER and none are RED.\n- Overall RAG = GREEN only if all knowledge areas are GREEN or at most 1 is AMBER.\n\n**Artifact 2B: Milestone Variance Tracker**\n\n| Milestone ID | Milestone | Baseline Date | Forecast Date | Variance (days) | RAG Status | Root Cause of Variance | Recovery Action |\n|-------------|-----------|---------------|--------------|-----------------|------------|----------------------|----------------|\n| MS-001 | | | | | | | |\n| MS-002 | | | | | | | |\n| ... | | | | | | | |\n\nMilestone RAG: GREEN = on time or early, AMBER = 1-5 days late, RED = 6+ days late or at risk of missing a gate.\n\n**Artifact 2C: Issue Log**\n\n| Issue ID | Description | Category | Priority (H/M/L) | Impact Area | Identified Date | Owner | Status | Resolution Target Date | Resolution / Notes |\n|----------|-------------|----------|------------------|-------------|----------------|-------|--------|----------------------|--------------------|\n| ISS-001 | | | | | | | Open | | |\n| ISS-002 | | | | | | | Open | | |\n| ... | | | | | | | | | |\n\nISSUE CATEGORIES: Scope, Schedule, Cost, Resource, Technical, Vendor, Organizational, Quality\nISSUE STATUS: Open, In Progress, Escalated, Resolved, Closed\n\nRULES:\n- Every RED knowledge area must have at least one corresponding issue in the Issue Log.\n- Every milestone with RED status must have a root cause and recovery action.\n- Issues older than 14 days without resolution must be flagged for escalation.\n- The status report must be concise enough for a 5-minute executive review.\n- If quality or procurement data is not available, flag with [ASSUMPTION] and provide a reasonable default.',
      expectedOutput:
        'Artifact 2A: A comprehensive Project Status Report with RAG by knowledge area, key metrics, and required actions. Artifact 2B: A Milestone Variance Tracker with forecast dates, variance, and recovery actions. Artifact 2C: An Issue Log with prioritized, categorized, and owned issues. All RED items have escalation paths.',
      artifacts: [
        {
          name: 'Project Status Report',
          description:
            'RAG status dashboard by PMBOK knowledge area with key metrics, commentary, and required actions.',
          format: 'table',
          columns: [
            'Knowledge Area',
            'RAG Status',
            'Key Metrics',
            'Commentary',
            'Actions Required',
          ],
        },
        {
          name: 'Milestone Variance Tracker',
          description:
            'Comparison of baseline vs forecast milestone dates with variance analysis and recovery actions.',
          format: 'table',
          columns: [
            'Milestone ID',
            'Milestone',
            'Baseline Date',
            'Forecast Date',
            'Variance (days)',
            'RAG Status',
            'Recovery Action',
          ],
        },
        {
          name: 'Issue Log',
          description:
            'Structured register of all active project issues with category, priority, owner, and resolution tracking.',
          format: 'table',
          columns: [
            'Issue ID',
            'Description',
            'Category',
            'Priority',
            'Owner',
            'Status',
            'Resolution Target Date',
          ],
        },
      ],
      checkpoint: {
        title: 'Status Report Verification',
        items: [
          {
            label: 'All knowledge areas have RAG status',
            description:
              'Every PMBOK knowledge area is rated with consistent RAG thresholds and supporting metrics.',
          },
          {
            label: 'RED areas have corresponding issues',
            description:
              'Every knowledge area rated RED has at least one issue in the Issue Log with an owner and target resolution date.',
          },
          {
            label: 'Milestone variances are explained',
            description:
              'Every milestone with negative variance has a documented root cause and a recovery action.',
          },
          {
            label: 'Issue log is actionable',
            description:
              'All issues have owners, priorities, target dates, and appropriate status. Stale issues (>14 days) are flagged for escalation.',
          },
          {
            label: 'Report is executive-ready',
            description:
              'The status report is concise, uses consistent RAG definitions, and can be reviewed in 5 minutes.',
          },
        ],
        failAction:
          'Add missing knowledge area assessments, assign owners to unowned issues, document root causes for all RED milestones, and flag stale issues for escalation.',
      },
    },

    // ── Step 3: Change Control Management ──────────────────────────────
    {
      id: 3,
      title: 'Change Control Management',
      purpose:
        'Establish and populate the change control framework including the change request register, impact assessment templates, and change control board decision log — the formal mechanism for managing scope, schedule, and cost changes during execution.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s establish Change Control Management.\n\nUsing the baselines from Step 0, the issues from Step 2, and any pending changes identified during the session, produce formal change control artifacts. In PMBOK, no baseline change occurs without going through the Integrated Change Control process.\n\nCHANGE CONTROL RULES:\n1. Every change to scope, schedule, or cost baseline MUST go through the change request process.\n2. No change is implemented without Change Control Board (CCB) approval.\n3. Impact assessment must cover ALL six dimensions: scope, schedule, cost, quality, risk, and resources.\n4. Change requests must be traceable to the triggering event (issue, risk, stakeholder request).\n5. Approved changes update the baselines — the original baseline is preserved as "original baseline" for reference.\n\nProduce the following artifacts:\n\n**Artifact 3A: Change Request Register**\n\n| CR ID | Title | Description | Requester | Date Submitted | Category (Scope/Schedule/Cost/Quality) | Priority (Critical/High/Medium/Low) | Trigger (Issue ID / Risk ID / Stakeholder Request) | Status (Submitted/Under Review/Approved/Rejected/Deferred/Implemented) | CCB Decision Date | Approved By |\n|-------|-------|-------------|-----------|---------------|---------------------------------------|-------------------------------------|-----------------------------------------------------|------------------------------------------------------------------------|-------------------|-------------|\n| CR-001 | | | | | | | | | | |\n| CR-002 | | | | | | | | | | |\n| ... | | | | | | | | | | |\n\nFor each known issue from Step 2 that requires a baseline change, generate a corresponding Change Request.\n\n**Artifact 3B: Impact Assessment Template**\n\nFor each Change Request, produce a detailed impact assessment:\n\n| Dimension | Current Baseline | Proposed Change | Impact | Magnitude (H/M/L) |\n|-----------|-----------------|----------------|--------|-------------------|\n| Scope | [Current scope statement] | [What changes] | [Work packages added/removed/modified] | |\n| Schedule | [Current end date / critical path] | [New end date / path change] | [Days added/removed, critical path impact] | |\n| Cost | [Current EAC] | [New EAC] | [$ increase/decrease, reserve impact] | |\n| Quality | [Current quality targets] | [Quality impact] | [Acceptance criteria changes] | |\n| Risk | [Current risk profile] | [New/modified risks] | [New risks introduced or risks mitigated] | |\n| Resources | [Current resource allocation] | [Resource changes] | [Additional resources needed or freed] | |\n\n**Net Assessment:**\n| Factor | Value |\n|--------|-------|\n| Total Schedule Impact | +/- [n] days |\n| Total Cost Impact | +/- $[x] |\n| Risk Level Change | Increased / Decreased / No Change |\n| Recommendation | Approve / Reject / Defer — with rationale |\n\n**Artifact 3C: Change Control Board Decision Log**\n\n| Decision ID | CR ID | Meeting Date | Attendees | Decision (Approved/Rejected/Deferred) | Conditions / Stipulations | Baseline Updates Required | Action Owner | Implementation Deadline |\n|-------------|-------|-------------|-----------|---------------------------------------|--------------------------|--------------------------|-------------|------------------------|\n| CCB-001 | CR-001 | | | | | | | |\n| ... | | | | | | | | |\n\nIf no CCB meeting has occurred yet, populate the register with pending items and recommended decisions based on the impact assessment.\n\nRULES:\n- Every change request must have a complete 6-dimension impact assessment.\n- Approved changes must specify exactly which baselines are updated (scope, schedule, cost).\n- Deferred changes must have a review date.\n- Rejected changes must have a documented rationale.\n- Track cumulative impact: show the running total of schedule days added and cost added across all approved changes.\n- Flag if cumulative approved changes exceed 10% of the original baseline in any dimension.',
      expectedOutput:
        'Artifact 3A: A Change Request Register with all pending and processed change requests linked to their triggers. Artifact 3B: A detailed Impact Assessment for each change request covering all six dimensions. Artifact 3C: A CCB Decision Log with decisions, conditions, and baseline update requirements. Cumulative impact is tracked.',
      artifacts: [
        {
          name: 'Change Request Register',
          description:
            'Formal register of all change requests with category, priority, trigger traceability, and approval status.',
          format: 'table',
          columns: [
            'CR ID',
            'Title',
            'Category',
            'Priority',
            'Trigger',
            'Status',
            'CCB Decision Date',
          ],
        },
        {
          name: 'Impact Assessment Template',
          description:
            'Six-dimension impact assessment (scope, schedule, cost, quality, risk, resources) with net assessment and recommendation.',
          format: 'table',
          columns: ['Dimension', 'Current Baseline', 'Proposed Change', 'Impact', 'Magnitude'],
        },
        {
          name: 'CCB Decision Log',
          description:
            'Change Control Board decision register with meeting outcomes, conditions, baseline updates, and implementation deadlines.',
          format: 'table',
          columns: [
            'Decision ID',
            'CR ID',
            'Meeting Date',
            'Decision',
            'Conditions',
            'Baseline Updates Required',
            'Action Owner',
          ],
        },
      ],
      checkpoint: {
        title: 'Change Control Verification',
        items: [
          {
            label: 'All baseline changes have change requests',
            description:
              'Every proposed change to scope, schedule, or cost is captured as a formal change request in the register.',
          },
          {
            label: 'Impact assessments cover all six dimensions',
            description:
              'Each change request has a complete impact assessment covering scope, schedule, cost, quality, risk, and resources.',
          },
          {
            label: 'Change requests are traceable to triggers',
            description:
              'Every change request links to the issue, risk, or stakeholder request that triggered it.',
          },
          {
            label: 'Cumulative impact is tracked',
            description:
              'The running total of approved changes is shown and flagged if it exceeds 10% of the original baseline.',
          },
          {
            label: 'CCB decisions include conditions and deadlines',
            description:
              'Approved changes have conditions, assigned owners, and implementation deadlines. Rejected changes have documented rationale.',
          },
        ],
        failAction:
          'Create missing change requests for any uncontrolled baseline changes, complete impact assessments for all dimensions, link all CRs to triggers, and add cumulative impact tracking.',
      },
    },

    // ── Step 4: Integrated Performance Report & Corrective Actions ─────
    {
      id: 4,
      title: 'Integrated Performance Report & Corrective Actions',
      purpose:
        'Consolidate all execution monitoring artifacts into a single integrated performance report, define specific corrective actions with owners and deadlines, update project forecasts, and capture interim lessons learned.',
      estimatedTime: '10 min',
      prompt:
        'Let\'s assemble the Integrated Performance Report and define Corrective Actions.\n\nConsolidate all artifacts from Steps 1-3 into a single integrated report that gives the sponsor and steering committee a complete picture of project health, required actions, and updated forecasts.\n\n**Artifact 4A: Consolidated Performance Report**\n\n| Section | Content |\n|---------|---------|\n| Report Title | [Project Name] — Integrated Performance Report |\n| Reporting Period | [From Step 0] |\n| Data Date | [From Step 0] |\n| Prepared By | Project Manager |\n| Distribution | [Sponsor, Steering Committee, Project Team] |\n\n**Executive Summary** (3-5 bullet points maximum):\n- Overall project status: [RAG] — [1-sentence summary]\n- Schedule performance: SPI = [x], [ahead/behind] by [n] days\n- Cost performance: CPI = [x], EAC = $[x] vs BAC = $[x]\n- Key risks/issues: [Top 2-3 items requiring executive attention]\n- Recommended decisions: [What the sponsor needs to approve/decide]\n\n**Performance Dashboard:**\n\n| Metric | Previous Period | Current Period | Trend | RAG |\n|--------|----------------|----------------|-------|-----|\n| SPI | | | [arrow] | |\n| CPI | | | [arrow] | |\n| EAC | | | [arrow] | |\n| Milestones On Track | x/y | x/y | | |\n| Open Issues (High) | | | | |\n| Open Change Requests | | | | |\n| Risk Exposure (EMV) | | | | |\n\n**Artifact 4B: Corrective Action Register**\n\n| CA ID | Corrective Action | Linked To (Issue/Risk/CR) | Root Cause | Expected Impact | Owner | Start Date | Target Completion | Status | Progress Notes |\n|-------|-------------------|--------------------------|------------|----------------|-------|------------|-------------------|--------|----------------|\n| CA-001 | | ISS-001 / RISK-003 | | SPI improvement of +0.05 | | | | Not Started | |\n| CA-002 | | CR-002 | | Cost reduction of $X | | | | Not Started | |\n| ... | | | | | | | | | |\n\nCORRECTIVE ACTION RULES:\n- Every RED metric from the Status Report (Step 2) must have at least one corrective action.\n- Every corrective action must be SMART: Specific, Measurable, Achievable, Relevant, Time-bound.\n- Corrective actions must link to the specific issue, risk, or change request they address.\n- Include expected quantitative impact — by how much will SPI, CPI, or other metrics improve?\n- Preventive actions (proactive measures for AMBER items) should also be included.\n\n**Artifact 4C: Updated Forecast**\n\nRevise the forecast from Step 1 based on approved changes and corrective actions:\n\n| Forecast Element | Step 1 Forecast | Adjustment for Approved Changes | Adjustment for Corrective Actions | Revised Forecast | Confidence Level |\n|-----------------|-----------------|--------------------------------|----------------------------------|-----------------|------------------|\n| EAC | $ | +/- $ | +/- $ | $ | High/Medium/Low |\n| Completion Date | [date] | +/- [n] days | +/- [n] days | [date] | High/Medium/Low |\n| Scope Completion | [%] | +/- [%] | +/- [%] | [%] | High/Medium/Low |\n| Risk Exposure | $ | +/- $ | +/- $ | $ | High/Medium/Low |\n\n**Artifact 4D: Lessons Learned (Interim)**\n\n| LL ID | Category | Description | Root Cause | Recommendation | Impact (H/M/L) | Applicable To |\n|-------|----------|-------------|-----------|----------------|----------------|---------------|\n| LL-001 | Process | | | | | Future phases / Similar projects |\n| LL-002 | Technical | | | | | |\n| LL-003 | Management | | | | | |\n| ... | | | | | | |\n\nCapture lessons learned during execution — do not wait until closure. Categories: Process, Technical, Management, Communication, Vendor, Estimation.\n\nFINAL RULES:\n- The executive summary must be concise enough for a 2-minute verbal briefing.\n- Corrective actions without owners are not valid — every action must have a named owner.\n- The updated forecast must show the math: original forecast + change adjustments + corrective action adjustments = revised forecast.\n- Lessons learned should include both positive (what worked well) and negative (what needs improvement) items.\n- End with a clear "Decisions Required" section listing what the sponsor or CCB must decide.',
      expectedOutput:
        'Artifact 4A: A consolidated Performance Report with executive summary, performance dashboard, and decisions required. Artifact 4B: A Corrective Action Register with SMART actions linked to issues and risks. Artifact 4C: An Updated Forecast showing adjustments from changes and corrective actions. Artifact 4D: Interim Lessons Learned categorized and actionable.',
      artifacts: [
        {
          name: 'Consolidated Performance Report',
          description:
            'Integrated performance report with executive summary, performance dashboard, and decisions required for sponsor and steering committee.',
          format: 'text',
        },
        {
          name: 'Corrective Action Register',
          description:
            'SMART corrective actions linked to issues, risks, and change requests with owners, deadlines, and expected impact.',
          format: 'table',
          columns: [
            'CA ID',
            'Corrective Action',
            'Linked To',
            'Expected Impact',
            'Owner',
            'Target Completion',
            'Status',
          ],
        },
        {
          name: 'Updated Forecast',
          description:
            'Revised project forecast showing adjustments from approved changes and corrective actions with confidence levels.',
          format: 'table',
          columns: [
            'Forecast Element',
            'Step 1 Forecast',
            'Change Adjustments',
            'Corrective Action Adjustments',
            'Revised Forecast',
            'Confidence',
          ],
        },
        {
          name: 'Lessons Learned (Interim)',
          description:
            'Interim lessons learned captured during execution, categorized by type with recommendations for future phases.',
          format: 'table',
          columns: [
            'LL ID',
            'Category',
            'Description',
            'Recommendation',
            'Impact',
            'Applicable To',
          ],
        },
      ],
      checkpoint: {
        title: 'Integrated Report Verification',
        items: [
          {
            label: 'Executive summary is concise and actionable',
            description:
              'The executive summary can be delivered in a 2-minute verbal briefing with clear RAG status and decisions required.',
          },
          {
            label: 'Every RED metric has a corrective action',
            description:
              'All RED-rated metrics from the status report have at least one corresponding SMART corrective action with a named owner.',
          },
          {
            label: 'Forecast adjustments are traceable',
            description:
              'The updated forecast shows clear math: original + change adjustments + corrective action adjustments = revised forecast.',
          },
          {
            label: 'Lessons learned include positive and negative items',
            description:
              'The interim lessons capture both what worked well and what needs improvement, with actionable recommendations.',
          },
          {
            label: 'Decisions required are clearly stated',
            description:
              'The report ends with a specific list of decisions the sponsor or CCB must make, with supporting information.',
          },
        ],
        failAction:
          'Add corrective actions for uncovered RED metrics, assign owners to all actions, show forecast calculation transparency, balance lessons learned with positive items, and clearly state required decisions.',
      },
    },
  ],
  requiredInputs: [
    {
      name: 'Project Name & ID',
      description:
        'The project name and unique identifier to be used consistently across all reporting artifacts.',
      format: 'Text: Project Name, Project ID',
    },
    {
      name: 'Scope Baseline',
      description:
        'Approved scope statement, WBS summary (total work packages, major deliverables), and any scope changes approved since baseline.',
      format: 'Structured text: Scope Statement, WBS Summary, Work Package Count',
    },
    {
      name: 'Schedule Baseline',
      description:
        'Approved project schedule including key milestones, critical path activities, planned start and end dates, and total planned duration in working days.',
      format: 'Table or list: Milestones, Critical Path, Planned Dates, Duration',
    },
    {
      name: 'Cost Baseline',
      description:
        'Approved budget including Budget at Completion (BAC), cost breakdown by phase or deliverable, contingency reserve, and management reserve amounts.',
      format: 'Table: BAC, Cost Breakdown, Contingency, Management Reserve',
    },
    {
      name: 'Current Period Actuals',
      description:
        'Actual progress data for the current reporting period: work packages completed, percentage complete for in-progress items, actual costs incurred to date, and the data date for EVM calculations.',
      format: 'Table: WPs Complete, % In-Progress, Actual Cost, Data Date',
    },
    {
      name: 'Known Issues & Risks',
      description:
        'Currently active issues, triggered risks, pending change requests, and any stakeholder concerns that need to be addressed in the reporting cycle.',
      format: 'List: Issues, Triggered Risks, Pending Changes, Stakeholder Concerns',
    },
  ],
  artifactsProduced: [
    'Baseline Context Summary',
    'EVM Metrics Table',
    'Performance Trend Analysis',
    'Forecast Summary',
    'Project Status Report',
    'Milestone Variance Tracker',
    'Issue Log',
    'Change Request Register',
    'Impact Assessment Template',
    'CCB Decision Log',
    'Consolidated Performance Report',
    'Corrective Action Register',
    'Updated Forecast',
    'Lessons Learned (Interim)',
  ],
  tier: 'premium',
  price: 29700,
  suiteId: 'pmbok-suite',
};
