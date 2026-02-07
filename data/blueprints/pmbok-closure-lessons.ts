import type { Blueprint } from '@/lib/types';

export const pmbokClosureLessons: Blueprint = {
  id: 'pmbok-closure-lessons',
  slug: 'pmbok-closure-lessons',
  title: 'PMBOK Closure & Lessons Learned',
  subtitle:
    'AI-guided project closure aligned with PMBOK 7th Edition — from deliverable verification and acceptance through final performance analysis, structured lessons learned workshop, and consolidated closure report assembly.',
  methodology: 'PMBOK',
  version: '1.0.0',
  estimatedTime: '45-60 minutes',
  stepCount: 5,
  steps: [
    // ── Step 0: Context Primer ───────────────────────────────────────────
    {
      id: 0,
      title: 'Context Primer',
      purpose:
        'Establish the AI session as a PMP-certified Project Manager facilitating project closure, load all project data accumulated throughout the project lifecycle, and set the ground rules for comprehensive, honest closure documentation.',
      estimatedTime: '5 min',
      prompt:
        'You are a PMP-certified Project Manager facilitating a Project Closure & Lessons Learned session aligned with PMBOK 7th Edition principles. Your role is to guide me through a structured, step-by-step process that produces production-ready closure artifacts ensuring nothing is left open, all knowledge is captured, and the project is formally closed.\n\nSESSION RULES — follow these throughout the entire session:\n1. Use PMBOK terminology and artifact formats exclusively.\n2. Produce tables, not narratives — every artifact must be in structured table format unless explicitly stated otherwise.\n3. Flag every assumption you make with [ASSUMPTION] so I can confirm or correct it.\n4. Use correct PMBOK terms: Deliverable Acceptance (not sign-off), Lessons Learned Register (not retrospective notes), Variance Analysis (not gap analysis), Knowledge Transfer (not handover).\n5. Ask clarifying questions before proceeding if critical information is missing.\n6. Number all artifacts for easy cross-referencing (e.g., DEL-001, LL-001, CL-001).\n7. Apply PMBOK 7th Edition performance domains with emphasis on: Delivery, Measurement, and Stakeholders.\n8. Be honest and balanced in lessons learned — capture failures and successes equally. Do not sanitize or soften negative findings.\n9. All financial figures should use consistent currency formatting.\n\nTo begin, I need you to acknowledge these rules and confirm you are ready. Then I will paste the following project data:\n\nPROJECT DATA TO PASTE BELOW:\n---\n**Project Charter Summary**\n[Paste project name, objectives, success criteria, and original business justification]\n\n**Scope Baseline (Original) & Final Scope**\n[Paste original scope statement and WBS summary, plus any approved scope changes — what was the final delivered scope vs. planned scope?]\n\n**Schedule Baseline & Actuals**\n[Paste planned start/end dates, actual start/end dates, key milestone dates (planned vs. actual), total planned duration vs. actual duration]\n\n**Cost Baseline & Actuals**\n[Paste BAC (Budget at Completion), actual total cost, final EAC, final CPI and SPI, contingency used, management reserve used]\n\n**Change Log Summary**\n[Paste summary of approved change requests — how many, what categories, total impact on scope/schedule/cost]\n\n**Risk Register Final Status**\n[Paste final risk register status — risks that materialized, risks that were mitigated successfully, risks that never materialized, effectiveness of risk responses]\n\n**Deliverables List**\n[Paste all project deliverables with their current status — completed, pending acceptance, incomplete]\n\n**Stakeholder Feedback (if available)**\n[Paste any stakeholder feedback, satisfaction scores, or survey results]\n\n**Open Items**\n[Paste any remaining open items, pending actions, or unresolved issues]\n---\n\nAfter receiving my context, summarize it back to me in a structured format and confirm:\n- Project charter objectives and success criteria are understood\n- Original vs. final scope is captured\n- Schedule performance (planned vs. actual) is documented\n- Cost performance (BAC vs. actual, CPI, SPI) is documented\n- Change log impact is quantified\n- Risk register final status is captured\n- Deliverable inventory is complete\n- Open items are catalogued\n- Any missing data for closure is identified',
      expectedOutput:
        'Acknowledgement of session rules, structured summary of all project data (charter, baselines vs. actuals, change log, risk register, deliverables, open items), identification of any gaps that must be resolved before formal closure can proceed.',
      artifacts: [
        {
          name: 'Project Closure Context Summary',
          description:
            'Structured recap of project charter, baselines vs. actuals, change log, risk register status, deliverables, and open items.',
          format: 'table',
          columns: [
            'Parameter',
            'Planned / Baseline',
            'Actual / Final',
            'Variance',
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
              'The AI explicitly confirmed it will follow PMBOK terminology, table-based artifacts, assumption flagging, honest lessons learned, and correct naming conventions.',
          },
          {
            label: 'Charter objectives and success criteria are captured',
            description:
              'Original project objectives and measurable success criteria are documented for comparison against actual outcomes.',
          },
          {
            label: 'Baseline vs. actual data is complete',
            description:
              'Scope, schedule, and cost baselines are documented alongside actual performance data with variances calculated.',
          },
          {
            label: 'Deliverable inventory is complete',
            description:
              'All project deliverables are listed with their current status (completed, pending acceptance, incomplete).',
          },
          {
            label: 'Open items are catalogued',
            description:
              'Remaining open items, unresolved issues, and pending actions are identified for resolution during closure.',
          },
        ],
        failAction:
          'Provide missing project data, clarify baseline vs. actual figures, complete the deliverable inventory, catalogue all open items, and re-run Step 0 until all closure inputs are available.',
      },
    },

    // ── Step 1: Deliverable Verification & Acceptance ──────────────────
    {
      id: 1,
      title: 'Deliverable Verification & Acceptance',
      purpose:
        'Systematically verify every project deliverable against its acceptance criteria, identify outstanding items requiring resolution, and produce formal sign-off documentation — ensuring nothing is left unaccepted or unaccounted for.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s verify and formally accept all project deliverables.\n\nUsing the deliverables list from Step 0 and the WBS acceptance criteria from the planning phase, systematically verify every deliverable. In PMBOK, formal acceptance of deliverables is a prerequisite for project closure — the project cannot close with unverified deliverables.\n\nDELIVERABLE VERIFICATION RULES:\n1. Every deliverable in the WBS must appear in the acceptance matrix — no deliverable is overlooked.\n2. Acceptance criteria must be binary — Met or Not Met. No "partially met" without a specific remediation plan.\n3. Any deliverable not fully accepted must have a punch list item with owner and deadline.\n4. Formal sign-off must include the approver\'s role, not just a name.\n5. Differentiate between deliverables accepted by the project team, the sponsor, and external stakeholders/customers.\n\nProduce the following artifacts:\n\n**Artifact 1A: Deliverable Acceptance Matrix**\n\n| DEL ID | Deliverable | WBS Reference | Acceptance Criteria | Verification Method | Acceptance Status (Accepted/Conditional/Rejected/Pending) | Accepted By (Role) | Acceptance Date | Conditions / Notes |\n|--------|------------|---------------|--------------------|--------------------|----------------------------------------------------------|-------------------|-----------------|--------------------|\n| DEL-001 | | WBS 1.2.1 | [From WBS Dictionary] | [Inspection/Test/Review/Demo] | Accepted | | | |\n| DEL-002 | | WBS 1.3.1 | | | Conditional | | | [Condition that must be met] |\n| DEL-003 | | WBS 1.4.1 | | | Pending | | | [What is blocking acceptance?] |\n| ... | | | | | | | | |\n\n**Acceptance Status Definitions:**\n- **Accepted**: Deliverable meets all acceptance criteria and is formally approved.\n- **Conditional**: Deliverable is accepted with conditions — minor items must be resolved by a specified date.\n- **Rejected**: Deliverable does not meet acceptance criteria — rework is required.\n- **Pending**: Deliverable has not yet been submitted for acceptance or is under review.\n\n**Artifact 1B: Punch List / Outstanding Items**\n\n| Punch ID | DEL ID | Description of Outstanding Item | Category (Defect/Incomplete/Enhancement) | Priority (Critical/High/Medium/Low) | Owner | Target Resolution Date | Status (Open/In Progress/Resolved) | Resolution Notes |\n|----------|--------|-------------------------------|----------------------------------------|-------------------------------------|-------|----------------------|------------------------------------|-----------------|\n| PL-001 | DEL-002 | | Defect | High | | | Open | |\n| PL-002 | DEL-003 | | Incomplete | Critical | | | Open | |\n| ... | | | | | | | | |\n\n**Punch List Summary:**\n| Metric | Value |\n|--------|-------|\n| Total Punch List Items | |\n| Critical Items | |\n| High Items | |\n| Medium / Low Items | |\n| Estimated Resolution Effort (person-days) | |\n| Target Full Resolution Date | |\n\n**Artifact 1C: Formal Sign-Off Register**\n\n| Sign-Off ID | Deliverable(s) | Approver Name | Approver Role | Approval Type (Full/Conditional) | Date Signed | Conditions (if any) | Expiry (if conditional) |\n|-------------|----------------|--------------|--------------|--------------------------------|------------|--------------------|-----------------------|\n| SO-001 | DEL-001, DEL-004 | | Project Sponsor | Full | | — | — |\n| SO-002 | DEL-002 | | Technical Lead | Conditional | | [Condition] | [Date by which condition must be met] |\n| ... | | | | | | | |\n\n**Overall Acceptance Summary:**\n| Metric | Value |\n|--------|-------|\n| Total Deliverables | |\n| Fully Accepted | |\n| Conditionally Accepted | |\n| Rejected (Rework Required) | |\n| Pending Acceptance | |\n| Acceptance Rate (%) | |\n| Sign-Offs Obtained | x / y required |\n\nRULES:\n- Every deliverable from the WBS must appear in the acceptance matrix — cross-reference against the WBS to ensure 100% coverage.\n- Conditional acceptances must have specific conditions AND expiry dates — they cannot remain open indefinitely.\n- Critical punch list items must be resolved before project closure can be finalized.\n- Flag any deliverable where the acceptance criteria were changed from the original WBS Dictionary — this indicates a scope change that should be traceable to a Change Request.\n- Flag if the overall acceptance rate is below 90% — the project may not be ready for closure.',
      expectedOutput:
        'Artifact 1A: A complete Deliverable Acceptance Matrix covering all WBS deliverables with verification status and approver information. Artifact 1B: A Punch List of outstanding items with priorities, owners, and resolution targets. Artifact 1C: A Formal Sign-Off Register documenting all approvals. Overall acceptance summary with key metrics.',
      artifacts: [
        {
          name: 'Deliverable Acceptance Matrix',
          description:
            'Comprehensive matrix of all project deliverables with acceptance criteria, verification method, acceptance status, and approver.',
          format: 'table',
          columns: [
            'DEL ID',
            'Deliverable',
            'WBS Reference',
            'Acceptance Criteria',
            'Status',
            'Accepted By',
            'Acceptance Date',
          ],
        },
        {
          name: 'Punch List',
          description:
            'Register of all outstanding items requiring resolution before or shortly after project closure, with owners and deadlines.',
          format: 'table',
          columns: [
            'Punch ID',
            'DEL ID',
            'Description',
            'Category',
            'Priority',
            'Owner',
            'Target Resolution Date',
            'Status',
          ],
        },
        {
          name: 'Formal Sign-Off Register',
          description:
            'Documentation of all formal deliverable acceptances with approver names, roles, dates, and any conditions.',
          format: 'table',
          columns: [
            'Sign-Off ID',
            'Deliverable(s)',
            'Approver Name',
            'Approver Role',
            'Approval Type',
            'Date Signed',
            'Conditions',
          ],
        },
      ],
      checkpoint: {
        title: 'Deliverable Acceptance Verification',
        items: [
          {
            label: 'All WBS deliverables are accounted for',
            description:
              'Every deliverable from the WBS appears in the acceptance matrix with 100% coverage verified.',
          },
          {
            label: 'Acceptance status is clear for each deliverable',
            description:
              'Each deliverable has a definitive status (Accepted, Conditional, Rejected, or Pending) with no ambiguity.',
          },
          {
            label: 'Punch list items have owners and deadlines',
            description:
              'All outstanding items have assigned owners, priority ratings, and specific target resolution dates.',
          },
          {
            label: 'Conditional acceptances have expiry dates',
            description:
              'Every conditional acceptance specifies the conditions and the date by which they must be resolved.',
          },
          {
            label: 'Critical sign-offs are obtained',
            description:
              'The formal sign-off register shows that key stakeholders (sponsor, customer) have provided their acceptance.',
          },
        ],
        failAction:
          'Add missing deliverables to the matrix, assign owners to unowned punch list items, set expiry dates for conditional acceptances, and escalate missing sign-offs to the appropriate stakeholders.',
      },
    },

    // ── Step 2: Performance Analysis & Variance Report ─────────────────
    {
      id: 2,
      title: 'Performance Analysis & Variance Report',
      purpose:
        'Produce the final project performance analysis comparing planned vs. actual across scope, schedule, and cost using EVM metrics, assess quality outcomes, and evaluate whether the original business benefits are being realized.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s produce the Final Performance Analysis.\n\nUsing the baseline and actual data from Step 0, produce a comprehensive final variance report. This is the definitive record of how the project performed — it must be honest, complete, and useful for future project planning.\n\nPERFORMANCE ANALYSIS RULES:\n1. Use EVM metrics for cost and schedule analysis — no subjective assessments.\n2. Compare ORIGINAL baseline to actuals (not the most recent re-baseline, unless both are shown).\n3. Include both absolute and percentage variances.\n4. Analyze root causes for significant variances (> 10%).\n5. Assess whether the original business justification was achieved.\n\nProduce the following artifacts:\n\n**Artifact 2A: Final EVM Summary**\n\n| Metric | Planned (Baseline) | Actual (Final) | Variance | Variance (%) | RAG Status | Root Cause of Variance |\n|--------|-------------------|----------------|----------|-------------|------------|------------------------|\n| **SCOPE** | | | | | | |\n| Total Work Packages | [Planned count] | [Actual count — including approved additions/removals] | +/- [n] | [%] | [RAG] | [Scope changes, descoping, additions] |\n| Deliverables Planned | [n] | [n delivered] | +/- [n] | [%] | [RAG] | |\n| Scope Changes Approved | 0 (baseline) | [n] | [n] | — | [RAG] | |\n| Requirements Met | [n] | [n] | | [%] | [RAG] | |\n| **SCHEDULE** | | | | | | |\n| Planned Duration (days) | [n] | [n] | +/- [n] | [%] | [RAG] | |\n| Planned Start Date | [date] | [date] | +/- [n] days | | [RAG] | |\n| Planned End Date | [date] | [date] | +/- [n] days | | [RAG] | |\n| Final SPI | 1.00 | [x.xx] | [diff] | | [RAG] | |\n| Milestones On Time | [n/n] | [n/n] | | [%] | [RAG] | |\n| Critical Path Variance | 0 days | +/- [n] days | | | [RAG] | |\n| **COST** | | | | | | |\n| BAC (Budget at Completion) | $[x] | — | — | — | — | |\n| Actual Cost (AC) | — | $[x] | — | — | — | |\n| Final EAC | $[BAC] | $[x] | $[diff] | [%] | [RAG] | |\n| Final CPI | 1.00 | [x.xx] | [diff] | | [RAG] | |\n| Contingency Used | $0 | $[x] | — | [% of reserve] | [RAG] | [What risks or issues consumed contingency?] |\n| Management Reserve Used | $0 | $[x] | — | [% of reserve] | [RAG] | [What unknown risks consumed management reserve?] |\n| Final Cost Variance (CV) | $0 | $[x] | — | — | [RAG] | |\n\nRAG THRESHOLDS: GREEN = within 5% of baseline, AMBER = 5-15% variance, RED = >15% variance.\n\n**Artifact 2B: Quality Metrics Final Report**\n\n| Quality Metric | Target | Actual | Met? (Yes/No) | Notes |\n|---------------|--------|--------|--------------|-------|\n| Deliverable Acceptance Rate | 100% | [%] | | |\n| Defects Found During Testing | [target] | [actual] | | |\n| Defects Found Post-Delivery | 0 | [actual] | | |\n| Rework Effort (% of total) | < [x]% | [%] | | |\n| Stakeholder Satisfaction Score | [target] | [actual] | | |\n| Compliance Audits Passed | [n/n] | [n/n] | | |\n| [Project-specific quality metrics] | | | | |\n\n**Artifact 2C: Benefits Realization Assessment**\n\n| Objective ID | Objective (from Charter) | Success Criteria | Measurement Method | Target | Actual / Projected | Status (Achieved/Partially/Not Achieved/Too Early to Measure) | Evidence |\n|-------------|------------------------|-----------------|-------------------|--------|-------------------|---------------------------------------------------------------|----------|\n| OBJ-001 | | | | | | | |\n| OBJ-002 | | | | | | | |\n| ... | | | | | | | |\n\n**Benefits Summary:**\n| Metric | Value |\n|--------|-------|\n| Objectives Fully Achieved | x / y |\n| Objectives Partially Achieved | x / y |\n| Objectives Not Achieved | x / y |\n| Objectives Too Early to Measure | x / y |\n| Overall Business Case Verdict | Achieved / Partially Achieved / Not Achieved |\n\nRULES:\n- Show ORIGINAL baseline vs. actuals, not re-baselined figures. If re-baselining occurred, show both original and re-baselined values.\n- Every variance > 10% must have a documented root cause — not just "scope changes" but WHY scope changed.\n- Benefits that are "too early to measure" must include a projected measurement date and assigned owner.\n- Quality metrics must include both process quality (how well the project was managed) and product quality (how good the deliverables are).\n- Be honest about objectives not achieved — do not rationalize failures.',
      expectedOutput:
        'Artifact 2A: A complete Final EVM Summary showing planned vs. actual for scope, schedule, and cost with variance analysis and root causes. Artifact 2B: A Quality Metrics Final Report against established targets. Artifact 2C: A Benefits Realization Assessment evaluating each charter objective with evidence.',
      artifacts: [
        {
          name: 'Final EVM Summary',
          description:
            'Comprehensive planned vs. actual comparison across scope, schedule, and cost dimensions with variance percentages, RAG status, and root cause analysis.',
          format: 'table',
          columns: [
            'Metric',
            'Planned (Baseline)',
            'Actual (Final)',
            'Variance',
            'Variance (%)',
            'RAG Status',
            'Root Cause',
          ],
        },
        {
          name: 'Quality Metrics Final Report',
          description:
            'Final assessment of all quality metrics (deliverable acceptance, defects, rework, satisfaction) against established targets.',
          format: 'table',
          columns: ['Quality Metric', 'Target', 'Actual', 'Met?', 'Notes'],
        },
        {
          name: 'Benefits Realization Assessment',
          description:
            'Evaluation of each charter objective against its success criteria with actual outcomes and evidence of achievement.',
          format: 'table',
          columns: [
            'Objective ID',
            'Objective',
            'Success Criteria',
            'Target',
            'Actual',
            'Status',
            'Evidence',
          ],
        },
      ],
      checkpoint: {
        title: 'Performance Analysis Verification',
        items: [
          {
            label: 'All three dimensions are analyzed',
            description:
              'Scope, schedule, and cost performance are all documented with planned vs. actual values and variance calculations.',
          },
          {
            label: 'Significant variances have root causes',
            description:
              'Every variance exceeding 10% has a documented, specific root cause — not generic explanations.',
          },
          {
            label: 'Quality metrics cover process and product',
            description:
              'Quality assessment includes both how well the project was managed and how good the deliverables are.',
          },
          {
            label: 'Benefits assessment is honest and evidence-based',
            description:
              'Each objective is assessed against its original success criteria with supporting evidence. Failures are documented without rationalization.',
          },
          {
            label: 'Original baselines are used for comparison',
            description:
              'The analysis compares against original approved baselines, not re-baselined figures (unless both are shown).',
          },
        ],
        failAction:
          'Add missing performance dimensions, document root causes for all significant variances, add product quality metrics, provide evidence for benefits claims, and ensure original baselines are the comparison basis.',
      },
    },

    // ── Step 3: Lessons Learned Workshop ────────────────────────────────
    {
      id: 3,
      title: 'Lessons Learned Workshop',
      purpose:
        'Facilitate a structured lessons learned session that captures knowledge across all PMBOK knowledge areas, honestly documents successes and failures, and produces actionable recommendations for future projects.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s conduct the Lessons Learned Workshop.\n\nThis is the most valuable closure activity for the organization. Using ALL project data from Steps 0-2, produce a comprehensive lessons learned register. The goal is organizational learning — these lessons must be specific enough to be actionable on future projects.\n\nLESSONS LEARNED RULES:\n1. Be brutally honest — sanitized lessons learned are worthless.\n2. Balance positive and negative — capture what went well (to repeat) AND what went wrong (to avoid).\n3. Every lesson must be specific — not "communication could be better" but "weekly status reports did not reach the procurement team, causing vendor delays in weeks 8-12."\n4. Every lesson must have an actionable recommendation — not "do better next time" but "include procurement team in the weekly distribution list for all projects with external vendors."\n5. Categorize lessons by PMBOK knowledge area for easy retrieval and application.\n6. Include lessons from ALL phases — initiation, planning, execution, monitoring, and closure.\n\nProduce the following artifacts:\n\n**Artifact 3A: Lessons Learned Register**\n\n| LL ID | Knowledge Area | Phase | Category (What Went Well / What Didn\'t / What to Improve) | Description | Root Cause | Impact (H/M/L) | Recommendation | Applicable To (Similar Projects / All Projects / Specific Domain) | Source (Team / Stakeholder / PM / Data) |\n|-------|---------------|-------|----------------------------------------------------------|-------------|-----------|----------------|----------------|------------------------------------------------------------------|----------------------------------------|\n| LL-001 | Integration Management | Planning | What Went Well | [Specific description of what worked] | [Why it worked] | H | [How to replicate this success] | All Projects | PM |\n| LL-002 | Scope Management | Execution | What Didn\'t Go Well | [Specific description of what failed] | [Why it failed] | H | [How to prevent this in future] | Similar Projects | Team |\n| LL-003 | Schedule Management | Monitoring | What to Improve | [Specific description of what could be better] | [Why it was suboptimal] | M | [Specific improvement action] | All Projects | Data |\n| ... | | | | | | | | | |\n\nKNOWLEDGE AREAS TO COVER (minimum 1 lesson per area):\n1. **Integration Management** — Charter, PMP, change control, closure process\n2. **Scope Management** — Requirements, WBS, scope verification, scope control\n3. **Schedule Management** — Estimation, sequencing, critical path, schedule control\n4. **Cost Management** — Budgeting, EVM, cost control, reserve management\n5. **Quality Management** — Quality planning, QA, QC, acceptance criteria\n6. **Resource Management** — Team acquisition, development, management, release\n7. **Communications Management** — Planning, execution, monitoring of communications\n8. **Risk Management** — Identification, analysis, response, monitoring\n9. **Procurement Management** — Planning, vendor management, contract administration\n10. **Stakeholder Management** — Identification, engagement, satisfaction\n\n**Artifact 3B: What Went Well / What Didn\'t / What to Improve Summary**\n\nConsolidate the most impactful lessons into three clear lists:\n\n| Category | Rank | Description | Knowledge Area | Impact |\n|----------|------|-------------|---------------|--------|\n| **What Went Well** | 1 | [Top positive lesson] | | H |\n| | 2 | | | |\n| | 3 | | | |\n| | 4 | | | |\n| | 5 | | | |\n| **What Didn\'t Go Well** | 1 | [Top negative lesson] | | H |\n| | 2 | | | |\n| | 3 | | | |\n| | 4 | | | |\n| | 5 | | | |\n| **What to Improve** | 1 | [Top improvement opportunity] | | H |\n| | 2 | | | |\n| | 3 | | | |\n| | 4 | | | |\n| | 5 | | | |\n\n**Artifact 3C: Recommendations for Future Projects**\n\n| Rec ID | Recommendation | Priority (Critical/High/Medium/Low) | Category (Process/Tool/People/Governance) | Knowledge Area | Implementation Effort (H/M/L) | Expected Benefit | Owner (Role) |\n|--------|---------------|--------------------------------------|------------------------------------------|---------------|-------------------------------|-----------------|-------------|\n| REC-001 | | Critical | Process | | L | [Quantified if possible] | PMO |\n| REC-002 | | High | Tool | | M | | |\n| REC-003 | | High | People | | H | | |\n| ... | | | | | | | |\n\nRULES:\n- Minimum 15 lessons learned across the 10 knowledge areas — at least 1 per area.\n- Balance: At least 5 "What Went Well" items — do not focus exclusively on failures.\n- Every lesson must have a root cause — surface-level lessons are not useful.\n- Every lesson must have an actionable recommendation — lessons without actions are observations, not lessons.\n- Recommendations must have an owner (by role) — unowned recommendations will never be implemented.\n- Rank lessons and recommendations by impact — the most important items should be first.\n- Include lessons about the project management process itself, not just the deliverables.\n- Flag lessons that indicate systemic organizational issues (not just project-specific problems).',
      expectedOutput:
        'Artifact 3A: A comprehensive Lessons Learned Register with 15+ lessons across all PMBOK knowledge areas, categorized and ranked. Artifact 3B: A consolidated summary of top 5 items each for What Went Well, What Didn\'t, and What to Improve. Artifact 3C: Prioritized recommendations for future projects with owners and expected benefits.',
      artifacts: [
        {
          name: 'Lessons Learned Register',
          description:
            'Comprehensive register of lessons across all PMBOK knowledge areas and project phases with root causes and actionable recommendations.',
          format: 'table',
          columns: [
            'LL ID',
            'Knowledge Area',
            'Phase',
            'Category',
            'Description',
            'Root Cause',
            'Impact',
            'Recommendation',
          ],
        },
        {
          name: 'What Went Well / What Didn\'t / What to Improve',
          description:
            'Consolidated, ranked summary of the top positive outcomes, negative outcomes, and improvement opportunities.',
          format: 'table',
          columns: ['Category', 'Rank', 'Description', 'Knowledge Area', 'Impact'],
        },
        {
          name: 'Recommendations for Future Projects',
          description:
            'Prioritized, actionable recommendations for future projects with implementation effort, expected benefit, and ownership.',
          format: 'table',
          columns: [
            'Rec ID',
            'Recommendation',
            'Priority',
            'Category',
            'Knowledge Area',
            'Implementation Effort',
            'Owner',
          ],
        },
      ],
      checkpoint: {
        title: 'Lessons Learned Verification',
        items: [
          {
            label: 'All knowledge areas are covered',
            description:
              'At least one lesson is documented for each of the 10 PMBOK knowledge areas.',
          },
          {
            label: 'Lessons are balanced between successes and failures',
            description:
              'At least 5 "What Went Well" items are included alongside negative lessons. The register is not exclusively focused on problems.',
          },
          {
            label: 'Lessons are specific and actionable',
            description:
              'Every lesson has a specific description (not generic), a root cause, and an actionable recommendation.',
          },
          {
            label: 'Recommendations have owners',
            description:
              'Every recommendation is assigned to a role (PMO, PM, Department Head, etc.) who will be responsible for implementation.',
          },
          {
            label: 'Systemic issues are flagged',
            description:
              'Lessons that indicate organizational or systemic issues (not just project-specific) are clearly flagged for PMO or leadership attention.',
          },
        ],
        failAction:
          'Add lessons for uncovered knowledge areas, balance the register with positive items, make generic lessons specific, assign owners to all recommendations, and flag systemic issues for organizational attention.',
      },
    },

    // ── Step 4: Project Closure Report Assembly ────────────────────────
    {
      id: 4,
      title: 'Project Closure Report Assembly',
      purpose:
        'Assemble all closure artifacts into a consolidated Project Closure Report, produce the contract closure checklist, knowledge transfer plan, and project archive index — the definitive final document that formally closes the project.',
      estimatedTime: '10 min',
      prompt:
        'Let\'s assemble the final Project Closure Report.\n\nConsolidate all artifacts from Steps 0-3 into a single, comprehensive closure report. This document is the final record of the project — it must be complete, self-contained, and suitable for both organizational archives and future project reference.\n\n**Artifact 4A: Consolidated Closure Report**\n\n| Section | Content |\n|---------|---------|\n| Report Title | [Project Name] — Project Closure Report |\n| Report Date | [Today\'s date] |\n| Prepared By | Project Manager |\n| Approved By | [Project Sponsor — pending signature] |\n| Distribution | [Sponsor, Steering Committee, PMO, Project Team, Key Stakeholders] |\n\n**1. Executive Summary** (1 page maximum):\n- Project name, start date, end date, total duration\n- Original objectives and whether each was achieved (summary from Artifact 2C)\n- Final cost: $[actual] vs. $[BAC] — under/over budget by [%]\n- Final schedule: [actual duration] vs. [planned duration] — ahead/behind by [n] days\n- Overall project verdict: Successful / Partially Successful / Unsuccessful\n- Top 3 lessons learned (summary from Artifact 3B)\n- Key recommendations for the organization (summary from Artifact 3C)\n\n**2. Scope Completion Summary**\n- Deliverables planned vs. delivered (from Artifact 1A)\n- Acceptance rate and outstanding items (from Artifact 1B)\n- Scope changes approved and their cumulative impact\n\n**3. Schedule Performance Summary**\n- Planned vs. actual timeline (from Artifact 2A)\n- Milestone achievement rate\n- Critical path analysis — what drove the final duration\n\n**4. Financial Summary**\n- BAC vs. actual cost vs. final EAC\n- Final CPI and SPI\n- Contingency and management reserve utilization\n- Cost breakdown by major category (planned vs. actual)\n\n**5. Quality Summary**\n- Quality metrics (from Artifact 2B)\n- Deliverable acceptance rate\n- Defect summary\n\n**6. Risk Management Summary**\n- Risks identified vs. risks materialized\n- Effectiveness of risk responses\n- Contingency utilization by risk\n- Risks that were not identified (emerged during execution)\n\n**7. Lessons Learned Summary**\n- Top 5 What Went Well / What Didn\'t / What to Improve (from Artifact 3B)\n- Top recommendations (from Artifact 3C)\n- Reference to full Lessons Learned Register\n\n**8. Stakeholder Satisfaction**\n- Stakeholder feedback summary\n- Satisfaction scores (if available)\n- Unresolved stakeholder concerns\n\n**9. Outstanding Items & Transition**\n- Punch list status (from Artifact 1B)\n- Warranty or support obligations\n- Transition to operations plan\n\n**10. Formal Closure Authorization**\n\n| Approval | Name | Role | Signature | Date |\n|----------|------|------|-----------|------|\n| Project Closure Approved | | Project Sponsor | [Pending] | |\n| Financial Closure Approved | | Finance Representative | [Pending] | |\n| Deliverables Accepted | | Customer / Business Owner | [Pending] | |\n| Lessons Learned Accepted | | PMO | [Pending] | |\n| Project Resources Released | | Resource Managers | [Pending] | |\n\n**Artifact 4B: Contract Closure Checklist**\n\n| Item | Description | Status (Done/Pending/N/A) | Owner | Notes |\n|------|-------------|--------------------------|-------|-------|\n| Final deliverables accepted | All vendor deliverables verified against SOW | | Procurement | |\n| Final invoice processed | Vendor\'s final invoice received and approved | | Finance | |\n| Performance evaluation completed | Vendor performance scorecard completed | | PM | |\n| Warranty terms documented | Warranty period, conditions, and contact information recorded | | Procurement | |\n| Contract formally closed | Written notice of contract completion sent to vendor | | Procurement | |\n| Intellectual property transferred | All IP, source code, documentation transferred per contract | | Legal/Technical | |\n| Confidentiality obligations confirmed | Ongoing NDA obligations documented | | Legal | |\n| Retainage released | Holdback amounts released per contract terms | | Finance | |\n| Dispute resolution | All claims or disputes resolved | | Procurement/Legal | |\n| Vendor reference documented | Vendor performance documented for future procurement reference | | PMO | |\n\n**Artifact 4C: Knowledge Transfer Plan**\n\n| Transfer ID | Knowledge Item | Source (From) | Recipient (To) | Transfer Method | Materials / Documentation | Target Date | Status | Verification |\n|------------|---------------|--------------|----------------|----------------|--------------------------|------------|--------|-------------|\n| KT-001 | System administration procedures | Project Team | Operations | Training session + documentation | Admin guide v2.0 | | | Recipient confirms capability |\n| KT-002 | Business process changes | PM | Business Users | Workshop | Process documentation | | | Users can perform independently |\n| KT-003 | Technical architecture | Technical Lead | IT Support | Knowledge base + walkthrough | Architecture diagrams, runbooks | | | Support can troubleshoot L1/L2 |\n| ... | | | | | | | | |\n\n**Artifact 4D: Project Archive Index**\n\n| Archive ID | Document / Artifact | Description | Location | Format | Retention Period | Access Level |\n|-----------|--------------------|-----------|---------|---------|-----------------|--------------|\n| ARC-001 | Project Charter | Original project authorization document | [Location] | PDF | 7 years | Internal — All |\n| ARC-002 | Project Management Plan | Complete PMP with all subsidiary plans | | PDF | 7 years | Internal — PM |\n| ARC-003 | Scope Baseline (WBS + Dictionary) | Final approved scope | | PDF | 7 years | Internal — PM |\n| ARC-004 | Schedule Baseline & Final Schedule | Planned vs. actual schedule | | MPP/PDF | 7 years | Internal — PM |\n| ARC-005 | Cost Baseline & Final Cost Report | BAC, EAC, actual costs | | XLSX/PDF | 10 years | Internal — Finance |\n| ARC-006 | Risk Register (Final) | Complete risk register with final status | | XLSX | 7 years | Internal — PM |\n| ARC-007 | Change Log | All change requests and decisions | | XLSX | 7 years | Internal — PM |\n| ARC-008 | Lessons Learned Register | Complete lessons learned | | XLSX/PDF | Permanent | Internal — All |\n| ARC-009 | Stakeholder Register | Final stakeholder analysis | | XLSX | 5 years | Internal — PM |\n| ARC-010 | Deliverable Acceptance Records | Sign-off documentation for all deliverables | | PDF | 10 years | Internal — Legal |\n| ARC-011 | Contract Documentation | All vendor contracts and closure records | | PDF | 10 years | Internal — Legal/Procurement |\n| ARC-012 | Project Closure Report | This report | | PDF | Permanent | Internal — All |\n| ARC-013 | Status Reports Archive | All periodic status reports | | PDF | 5 years | Internal — PM |\n| ARC-014 | Meeting Minutes Archive | All project meeting minutes and decisions | | PDF | 5 years | Internal — PM |\n| ... | [Project-specific deliverables and documentation] | | | | | |\n\nRULES:\n- The closure report must be self-contained — a reader should understand the full project story without referencing external documents.\n- The executive summary must be 1 page maximum — concise enough for a 5-minute executive review.\n- Contract closure must be complete before financial closure — no open vendor obligations.\n- Knowledge transfer must include verification — it is not enough to hand over documents; recipients must confirm they can perform.\n- The archive index must cover ALL project documents — nothing should be lost when the project team disbands.\n- Formal closure requires signatures from all listed approvers — flag any that are still pending.\n- Flag if any critical items (punch list, contract disputes, knowledge transfers) would prevent formal closure.',
      expectedOutput:
        'Artifact 4A: A consolidated Project Closure Report with 10 sections covering executive summary through formal closure authorization. Artifact 4B: A Contract Closure Checklist with all vendor obligations tracked. Artifact 4C: A Knowledge Transfer Plan with verification criteria. Artifact 4D: A Project Archive Index cataloguing all project documentation for long-term retention.',
      artifacts: [
        {
          name: 'Project Closure Report',
          description:
            'Consolidated closure report with executive summary, scope/schedule/cost summaries, quality assessment, risk summary, lessons learned, and formal closure authorization.',
          format: 'text',
        },
        {
          name: 'Contract Closure Checklist',
          description:
            'Checklist ensuring all vendor contracts are formally closed with deliverables accepted, invoices processed, and obligations documented.',
          format: 'table',
          columns: ['Item', 'Description', 'Status', 'Owner', 'Notes'],
        },
        {
          name: 'Knowledge Transfer Plan',
          description:
            'Structured plan for transferring project knowledge to operations and support teams with verification criteria.',
          format: 'table',
          columns: [
            'Transfer ID',
            'Knowledge Item',
            'Source',
            'Recipient',
            'Transfer Method',
            'Target Date',
            'Verification',
          ],
        },
        {
          name: 'Project Archive Index',
          description:
            'Complete catalogue of all project documentation with storage locations, formats, retention periods, and access levels.',
          format: 'table',
          columns: [
            'Archive ID',
            'Document / Artifact',
            'Description',
            'Location',
            'Format',
            'Retention Period',
          ],
        },
      ],
      checkpoint: {
        title: 'Closure Report Verification',
        items: [
          {
            label: 'All 10 report sections are present and complete',
            description:
              'The consolidated report includes all sections from Executive Summary through Formal Closure Authorization with no empty sections.',
          },
          {
            label: 'Executive summary is concise and accurate',
            description:
              'The executive summary fits on one page and accurately reflects the project outcome, key metrics, and top lessons learned.',
          },
          {
            label: 'Contract closure is tracked for all vendors',
            description:
              'Every vendor contract has a completed closure checklist with all items addressed or marked N/A with justification.',
          },
          {
            label: 'Knowledge transfer includes verification',
            description:
              'Each knowledge transfer item has a verification method to confirm the recipient can perform independently.',
          },
          {
            label: 'Archive index is comprehensive',
            description:
              'All project documents are catalogued with locations, formats, and retention periods. No critical documents are missing.',
          },
        ],
        failAction:
          'Complete missing report sections, condense the executive summary to one page, add closure checklist items for all vendors, define verification criteria for knowledge transfers, and catalogue missing documents in the archive index.',
      },
    },
  ],
  requiredInputs: [
    {
      name: 'Project Charter Summary',
      description:
        'Original project name, objectives, success criteria, and business justification used as the baseline for closure assessment.',
      format: 'Structured text: Project Name, Objectives with Success Criteria, Business Justification',
    },
    {
      name: 'Scope Baseline & Final Scope',
      description:
        'Original scope statement and WBS summary alongside the final delivered scope, including approved scope changes and their impact.',
      format: 'Table: Original WBS Summary, Approved Changes, Final Scope',
    },
    {
      name: 'Schedule Baseline & Actuals',
      description:
        'Planned start/end dates, actual start/end dates, key milestone dates (planned vs. actual), and total duration comparison.',
      format: 'Table: Milestone, Planned Date, Actual Date, Variance',
    },
    {
      name: 'Cost Baseline & Actuals',
      description:
        'BAC, actual total cost, final EAC, final CPI and SPI, contingency reserve used, and management reserve used.',
      format: 'Table: BAC, Actual Cost, EAC, CPI, SPI, Contingency Used, Mgmt Reserve Used',
    },
    {
      name: 'Change Log & Risk Register',
      description:
        'Summary of approved change requests (count, categories, cumulative impact) and final risk register status (materialized, mitigated, closed).',
      format: 'Table: Change Log Summary + Risk Register Final Status',
    },
    {
      name: 'Deliverables List & Open Items',
      description:
        'Complete list of all project deliverables with current status (completed, pending, incomplete), plus any remaining open items or unresolved issues.',
      format: 'Table: Deliverable, Status, Acceptance Status + Open Items List',
    },
  ],
  artifactsProduced: [
    'Project Closure Context Summary',
    'Deliverable Acceptance Matrix',
    'Punch List',
    'Formal Sign-Off Register',
    'Final EVM Summary',
    'Quality Metrics Final Report',
    'Benefits Realization Assessment',
    'Lessons Learned Register',
    'What Went Well / What Didn\'t / What to Improve',
    'Recommendations for Future Projects',
    'Project Closure Report',
    'Contract Closure Checklist',
    'Knowledge Transfer Plan',
    'Project Archive Index',
  ],
  tier: 'premium',
  price: 29700,
  suiteId: 'pmbok-suite',
};
