import type { Blueprint } from '@/lib/types';

export const pmbokInitiationPlanning: Blueprint = {
  id: 'pmbok-initiation-planning',
  slug: 'pmbok-initiation-planning',
  title: 'PMBOK Project Initiation & Planning Copilot',
  subtitle:
    'AI-guided project initiation and planning aligned with PMBOK 7th Edition — from Project Charter through WBS, schedule, risk register, and consolidated Project Management Plan.',
  methodology: 'PMBOK',
  version: '1.0.0',
  estimatedTime: '75-90 minutes',
  stepCount: 7,
  steps: [
    // ── Step 0: Context Primer ───────────────────────────────────────────
    {
      id: 0,
      title: 'Context Primer',
      purpose:
        'Establish the AI session as a PMP-certified Project Manager, set ground rules for PMBOK-aligned output, and ingest the project context required for all subsequent steps.',
      estimatedTime: '5 min',
      prompt:
        'You are a PMP-certified Project Manager facilitating a Project Initiation & Planning session aligned with PMBOK 7th Edition principles and the predictive (waterfall) lifecycle. Your role is to guide me through a structured, step-by-step process that produces production-ready project management artifacts.\n\nSESSION RULES — follow these throughout the entire session:\n1. Use PMBOK terminology and artifact formats exclusively.\n2. Produce tables, not narratives — every artifact must be in structured table format unless explicitly stated otherwise.\n3. Flag every assumption you make with [ASSUMPTION] so I can confirm or correct it.\n4. Use correct PMBOK terms: Work Packages (not tasks), Deliverables (not outputs), Project Charter (not project brief).\n5. Ask clarifying questions before proceeding if critical information is missing.\n6. Number all artifacts for easy cross-referencing (e.g., WP-001, Risk-001, SH-001).\n7. Apply PMBOK 7th Edition performance domains: Stakeholders, Team, Development Approach, Planning, Project Work, Delivery, Measurement, Uncertainty.\n\nTo begin, I need you to acknowledge these rules and confirm you are ready. Then I will paste the following context:\n\nCONTEXT TO PASTE BELOW:\n---\n**Project Overview**\n[Paste your project name, description, and business justification here]\n\n**Sponsoring Organization**\n[Paste the sponsoring organization, project sponsor name and title, and funding source]\n\n**Key Stakeholders**\n[Paste known stakeholders — names, roles, departments, and their interest in the project]\n\n**High-Level Requirements**\n[Paste 5-10 high-level requirements or objectives the project must deliver]\n\n**Known Constraints & Assumptions**\n[Paste any known constraints (budget, timeline, regulatory, resource) and assumptions]\n\n**Target Timeline**\n[Paste target start date, target end date, and any fixed milestone dates]\n---\n\nAfter receiving my context, summarize it back to me in a structured format and confirm:\n- Project name and business justification understood\n- Sponsor and governance structure identified\n- Number of stakeholders captured\n- Requirements count and completeness\n- Constraints and assumptions catalogued\n- Timeline feasibility (initial assessment)',
      expectedOutput:
        'Acknowledgement of session rules, structured summary of the pasted context (project overview, sponsor, stakeholders, requirements, constraints, timeline), identification of any missing information or ambiguities, and confirmation that the session is ready to proceed.',
      artifacts: [
        {
          name: 'Session Context Summary',
          description:
            'Structured recap of project overview, governance, stakeholders, requirements, and constraints as understood by the AI facilitator.',
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
              'The AI explicitly confirmed it will follow PMBOK terminology, table-based artifacts, assumption flagging, and correct naming conventions.',
          },
          {
            label: 'Project overview accurately summarized',
            description:
              'Project name, description, and business justification are correctly reflected.',
          },
          {
            label: 'Sponsor and governance captured',
            description:
              'The project sponsor, funding source, and organizational context are correctly identified.',
          },
          {
            label: 'Requirements and constraints catalogued',
            description:
              'All provided requirements, constraints, and assumptions are listed and understood.',
          },
          {
            label: 'Missing information identified',
            description:
              'Any gaps in the context have been flagged for resolution before proceeding.',
          },
        ],
        failAction:
          'Correct any misunderstood context, provide missing information, and re-run Step 0 until the summary is accurate.',
      },
    },

    // ── Step 1: Project Charter ──────────────────────────────────────────
    {
      id: 1,
      title: 'Project Charter Development',
      purpose:
        'Produce a formal Project Charter that authorizes the project, defines high-level scope, objectives, success criteria, milestones, budget summary, and governance structure — the single most important initiating artifact in PMBOK.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s develop the Project Charter.\n\nUsing the context from Step 0, produce a comprehensive Project Charter following PMBOK standards. The charter is the formal authorization document that gives the project manager authority to apply organizational resources to project activities.\n\nProduce the following artifacts:\n\n**Artifact 1A: Project Charter**\n\n| Section | Content |\n|---------|--------|\n| Project Title | [From context] |\n| Project Sponsor | [Name, Title, Department] |\n| Project Manager | [To be assigned or from context] |\n| Date | [Today\'s date] |\n| Version | 1.0 |\n\n**Business Case Summary:**\n[2-3 sentences summarizing WHY this project exists — the business problem or opportunity]\n\n**Project Purpose & Justification:**\n[Detailed justification linking to organizational strategy]\n\n**Artifact 1B: Project Objectives & Success Criteria**\n\n| Objective ID | Objective | Success Criteria | Measurement Method | Target |\n|-------------|-----------|-----------------|-------------------|--------|\n| OBJ-001 | | | | |\n| OBJ-002 | | | | |\n| ... | | | | |\n\n**Artifact 1C: High-Level Scope Statement**\n\n| Category | Description |\n|----------|------------|\n| In Scope | [What IS included — list specific deliverables] |\n| Out of Scope | [What is explicitly EXCLUDED — prevent scope creep] |\n| Assumptions | [Key assumptions the project plan is based on] |\n| Constraints | [Budget, time, resource, regulatory, or technical constraints] |\n\n**Artifact 1D: Milestone Schedule (High-Level)**\n\n| Milestone ID | Milestone | Target Date | Dependencies | Exit Criteria |\n|-------------|-----------|-------------|--------------|---------------|\n| MS-001 | Project Kickoff | | | |\n| MS-002 | Requirements Complete | | | |\n| MS-003 | Design Approved | | | |\n| ... | | | | |\n| MS-N | Project Closure | | | |\n\n**Artifact 1E: Budget Summary**\n\n| Category | Estimated Cost | Basis of Estimate | Contingency |\n|----------|---------------|-------------------|-------------|\n| Personnel | | | |\n| Technology/Infrastructure | | | |\n| External Services | | | |\n| Training | | | |\n| Contingency Reserve | | | |\n| **Total** | | | |\n\n**Artifact 1F: Governance & Authority**\n\n| Role | Name | Authority Level | Escalation Path |\n|------|------|----------------|----------------|\n| Project Sponsor | | Full budget authority | Steering Committee |\n| Project Manager | | Day-to-day decisions up to $X | Project Sponsor |\n| Steering Committee | | Strategic direction, >$X decisions | Executive Leadership |\n\nRULES:\n- Every objective must have measurable success criteria — avoid vague outcomes like "improve efficiency."\n- Out of Scope must be explicit — if it\'s ambiguous, list it as out of scope.\n- If budget data is not provided, flag as [ASSUMPTION] and provide a reasonable structure.\n- Milestones should include exit criteria — what must be true to pass the milestone.\n- Include at minimum 5 milestones covering initiation through closure.',
      expectedOutput:
        'A complete Project Charter with 6 sub-artifacts: Charter header with business case, Objectives & Success Criteria table, High-Level Scope Statement, Milestone Schedule, Budget Summary, and Governance & Authority matrix. All objectives are measurable. Scope exclusions are explicit.',
      artifacts: [
        {
          name: 'Project Charter',
          description:
            'Formal project authorization document with business case, purpose, and governance structure.',
          format: 'table',
          columns: ['Section', 'Content'],
        },
        {
          name: 'Project Objectives & Success Criteria',
          description:
            'Measurable project objectives with specific success criteria, measurement methods, and targets.',
          format: 'table',
          columns: ['Objective ID', 'Objective', 'Success Criteria', 'Measurement Method', 'Target'],
        },
        {
          name: 'High-Level Scope Statement',
          description:
            'In-scope deliverables, explicit exclusions, assumptions, and constraints.',
          format: 'table',
          columns: ['Category', 'Description'],
        },
        {
          name: 'Milestone Schedule',
          description:
            'High-level milestone roadmap with target dates, dependencies, and exit criteria.',
          format: 'table',
          columns: ['Milestone ID', 'Milestone', 'Target Date', 'Dependencies', 'Exit Criteria'],
        },
        {
          name: 'Budget Summary',
          description:
            'Cost breakdown by category with basis of estimate and contingency reserves.',
          format: 'table',
          columns: ['Category', 'Estimated Cost', 'Basis of Estimate', 'Contingency'],
        },
        {
          name: 'Governance & Authority Matrix',
          description:
            'Decision-making authority structure with escalation paths.',
          format: 'table',
          columns: ['Role', 'Name', 'Authority Level', 'Escalation Path'],
        },
      ],
      checkpoint: {
        title: 'Project Charter Verification',
        items: [
          {
            label: 'Business case is clear and justified',
            description:
              'The charter explains WHY this project exists and links to organizational strategy.',
          },
          {
            label: 'All objectives have measurable success criteria',
            description:
              'Every objective has a specific, measurable target — no vague outcomes like "improve."',
          },
          {
            label: 'Scope exclusions are explicit',
            description:
              'Out of Scope items are listed to prevent future scope creep.',
          },
          {
            label: 'Milestones have exit criteria',
            description:
              'Each milestone defines what must be true to pass, not just a date.',
          },
          {
            label: 'Governance authority is clearly defined',
            description:
              'Decision thresholds and escalation paths are documented.',
          },
        ],
        failAction:
          'Revise vague objectives to be measurable, add missing scope exclusions, define exit criteria for all milestones, and clarify governance thresholds.',
      },
    },

    // ── Step 2: Stakeholder Register & Analysis ──────────────────────────
    {
      id: 2,
      title: 'Stakeholder Register & Analysis',
      purpose:
        'Identify all project stakeholders, assess their influence, interest, and attitude, and develop engagement strategies — the foundation of the Stakeholders performance domain in PMBOK 7th Edition.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s build the Stakeholder Register and Analysis.\n\nUsing the context from Step 0 and the Governance structure from Step 1, identify ALL stakeholders — anyone who can affect or be affected by the project. Go beyond the obvious sponsors and team members.\n\nSTAKEHOLDER CATEGORIES TO CONSIDER:\n- **Internal**: Sponsor, project team, functional managers, PMO, IT, finance, HR, legal, operations\n- **External**: Customers/end users, vendors/suppliers, regulatory bodies, partners, competitors (indirect)\n- **Hidden**: Support teams, change management, training, communications, facilities, procurement\n\nProduce the following artifacts:\n\n**Artifact 2A: Stakeholder Register**\n\n| SH ID | Name / Role | Organization / Dept | Category (Internal/External) | Interest in Project | Current Attitude (Champion/Supporter/Neutral/Resistant/Blocker) | Influence Level (H/M/L) | Interest Level (H/M/L) |\n|-------|-----------|-------------------|---------------------------|-------------------|-------------------------------------------------------------|----------------------|---------------------|\n| SH-001 | | | | | | | |\n| SH-002 | | | | | | | |\n| ... | | | | | | | |\n\n**Artifact 2B: Power/Interest Grid**\n\nClassify each stakeholder into one of four quadrants:\n\n| Quadrant | Strategy | Stakeholders |\n|----------|----------|--------------|\n| High Power / High Interest | **Manage Closely** — Regular updates, involve in decisions | [List SH IDs] |\n| High Power / Low Interest | **Keep Satisfied** — Key updates, don\'t overwhelm | [List SH IDs] |\n| Low Power / High Interest | **Keep Informed** — Regular comms, address concerns | [List SH IDs] |\n| Low Power / Low Interest | **Monitor** — Minimal effort, periodic check-ins | [List SH IDs] |\n\n**Artifact 2C: Stakeholder Engagement Plan**\n\n| SH ID | Stakeholder | Current Engagement | Desired Engagement | Gap | Engagement Actions | Frequency | Owner |\n|-------|-----------|-------------------|-------------------|-----|-------------------|-----------|-------|\n| SH-001 | | Unaware | Supportive | High | One-on-one briefing, include in steering committee | Weekly | PM |\n| SH-002 | | Neutral | Champion | Medium | Demo session, early access to deliverables | Bi-weekly | PM |\n| ... | | | | | | | |\n\nEngagement Levels:\n- **Unaware**: Does not know about the project\n- **Resistant**: Aware but opposed to the project\n- **Neutral**: Aware but neither supportive nor resistant\n- **Supportive**: Aware and supportive of the project\n- **Champion**: Actively advocates for the project\n\nRULES:\n- Identify at minimum 10 stakeholders — if fewer, you are likely missing hidden stakeholders.\n- Every stakeholder with High Influence must have an engagement action.\n- Every Resistant or Blocker stakeholder must have a specific strategy to move them toward Neutral or Supportive.\n- Flag any stakeholder whose attitude could block a critical milestone from Step 1.',
      expectedOutput:
        'Artifact 2A: A complete Stakeholder Register with 10+ stakeholders identified across internal, external, and hidden categories. Artifact 2B: A Power/Interest Grid classifying all stakeholders into quadrants with strategies. Artifact 2C: A Stakeholder Engagement Plan with current vs desired engagement levels and specific actions.',
      artifacts: [
        {
          name: 'Stakeholder Register',
          description:
            'Comprehensive register of all stakeholders with influence, interest, and attitude assessment.',
          format: 'table',
          columns: [
            'SH ID',
            'Name / Role',
            'Organization / Dept',
            'Category',
            'Interest in Project',
            'Attitude',
            'Influence (H/M/L)',
            'Interest (H/M/L)',
          ],
        },
        {
          name: 'Power/Interest Grid',
          description:
            'Stakeholder classification into four quadrants with engagement strategies per quadrant.',
          format: 'matrix',
          columns: ['High Interest', 'Low Interest'],
          rows: ['High Power', 'Low Power'],
        },
        {
          name: 'Stakeholder Engagement Plan',
          description:
            'Current vs desired engagement levels with specific actions, frequency, and owners.',
          format: 'table',
          columns: [
            'SH ID',
            'Stakeholder',
            'Current Engagement',
            'Desired Engagement',
            'Gap',
            'Engagement Actions',
            'Frequency',
            'Owner',
          ],
        },
      ],
      checkpoint: {
        title: 'Stakeholder Analysis Verification',
        items: [
          {
            label: 'At least 10 stakeholders identified',
            description:
              'The register covers internal, external, and hidden stakeholder categories comprehensively.',
          },
          {
            label: 'High-influence stakeholders have engagement plans',
            description:
              'Every stakeholder with High Influence has a specific engagement action and frequency.',
          },
          {
            label: 'Resistant stakeholders have mitigation strategies',
            description:
              'All Resistant or Blocker stakeholders have documented plans to shift them toward Neutral or Supportive.',
          },
          {
            label: 'Power/Interest grid is complete',
            description:
              'All stakeholders are placed in the correct quadrant with appropriate strategies.',
          },
        ],
        failAction:
          'Identify missing stakeholders, add engagement actions for high-influence individuals, and develop specific strategies for resistant stakeholders.',
      },
    },

    // ── Step 3: Work Breakdown Structure ──────────────────────────────────
    {
      id: 3,
      title: 'Scope Definition & Work Breakdown Structure',
      purpose:
        'Decompose the project scope into a hierarchical Work Breakdown Structure (WBS) down to work package level, establish the scope baseline, and create the WBS dictionary — the foundation of PMBOK project planning.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s build the Work Breakdown Structure (WBS).\n\nUsing the High-Level Scope Statement (Artifact 1C) and Project Objectives (Artifact 1B), decompose the project into a hierarchical WBS. The WBS is a deliverable-oriented breakdown of ALL work required to complete the project.\n\nWBS RULES:\n1. The WBS is deliverable-oriented — organize by WHAT is produced, not by process or timeline.\n2. Decompose to the work package level (the lowest level that can be estimated, scheduled, and assigned).\n3. Follow the 100% rule — the WBS must capture 100% of the project scope. Nothing more, nothing less.\n4. Work packages should be estimable in 8-80 hours of effort (or 1-10 days).\n5. Include project management deliverables (PM plan, status reports, closure report).\n6. Use hierarchical numbering: 1.0, 1.1, 1.1.1, etc.\n\nProduce the following artifacts:\n\n**Artifact 3A: Work Breakdown Structure**\n\n| WBS ID | Level | Deliverable / Work Package | Description | Parent | Type (Deliverable/Work Package) |\n|--------|-------|---------------------------|-------------|--------|---------------------------------|\n| 1.0 | 1 | [Project Name] | Root element | — | Deliverable |\n| 1.1 | 2 | Project Management | All PM activities and artifacts | 1.0 | Deliverable |\n| 1.1.1 | 3 | Project Management Plan | Consolidated PM plan | 1.1 | Work Package |\n| 1.1.2 | 3 | Status Reporting | Weekly/monthly status reports | 1.1 | Work Package |\n| 1.1.3 | 3 | Project Closure Report | Final lessons learned and closure | 1.1 | Work Package |\n| 1.2 | 2 | [Major Deliverable 1] | | 1.0 | Deliverable |\n| 1.2.1 | 3 | [Sub-deliverable] | | 1.2 | Work Package |\n| ... | | | | | |\n\n**Artifact 3B: WBS Dictionary (Top Work Packages)**\n\nFor each work package, provide:\n\n| WBS ID | Work Package | Description | Acceptance Criteria | Responsible Party | Estimated Effort | Dependencies |\n|--------|-------------|-------------|--------------------|--------------------|-----------------|-------------|\n| 1.1.1 | Project Management Plan | | | | | |\n| 1.2.1 | [Sub-deliverable] | | | | | |\n| ... | | | | | | |\n\n**Artifact 3C: Scope Baseline Summary**\n\n| Metric | Value |\n|--------|-------|\n| Total Level-2 Deliverables | |\n| Total Work Packages | |\n| Estimated Total Effort (person-days) | |\n| Largest Work Package (effort) | |\n| Smallest Work Package (effort) | |\n| Work Packages > 10 days (needs decomposition) | |\n\nRULES:\n- Every requirement from Step 1 must trace to at least one work package.\n- No work package should exceed 80 hours (10 days) of effort — decompose further if needed.\n- Flag any work package that cannot be estimated due to insufficient information.\n- Include a "Project Management" branch covering PM artifacts, reporting, and governance.\n- Include quality assurance and testing deliverables where applicable.',
      expectedOutput:
        'Artifact 3A: A complete hierarchical WBS with 3+ levels of decomposition and proper numbering. Artifact 3B: A WBS Dictionary for all work packages with acceptance criteria and effort estimates. Artifact 3C: A Scope Baseline Summary with aggregate metrics. All requirements traceable to work packages.',
      artifacts: [
        {
          name: 'Work Breakdown Structure',
          description:
            'Hierarchical deliverable-oriented decomposition of all project work to work package level.',
          format: 'table',
          columns: [
            'WBS ID',
            'Level',
            'Deliverable / Work Package',
            'Description',
            'Parent',
            'Type',
          ],
        },
        {
          name: 'WBS Dictionary',
          description:
            'Detailed definition of each work package with acceptance criteria, responsible party, effort estimates, and dependencies.',
          format: 'table',
          columns: [
            'WBS ID',
            'Work Package',
            'Description',
            'Acceptance Criteria',
            'Responsible Party',
            'Estimated Effort',
            'Dependencies',
          ],
        },
        {
          name: 'Scope Baseline Summary',
          description:
            'Aggregate metrics of the WBS including deliverable counts, total effort, and sizing distribution.',
          format: 'table',
          columns: ['Metric', 'Value'],
        },
      ],
      checkpoint: {
        title: 'WBS Verification',
        items: [
          {
            label: '100% rule is satisfied',
            description:
              'The WBS captures all project scope — every requirement traces to at least one work package.',
          },
          {
            label: 'Work packages are appropriately sized',
            description:
              'No work package exceeds 80 hours (10 days). Oversized packages are flagged for further decomposition.',
          },
          {
            label: 'WBS dictionary has acceptance criteria',
            description:
              'Every work package has defined acceptance criteria — it is clear when the work package is "done."',
          },
          {
            label: 'Project management branch is included',
            description:
              'PM artifacts, status reporting, governance, and closure activities are captured in the WBS.',
          },
          {
            label: 'Numbering is consistent and hierarchical',
            description:
              'WBS IDs follow a logical hierarchy (1.0, 1.1, 1.1.1) with no gaps or duplicates.',
          },
        ],
        failAction:
          'Decompose oversized work packages, add missing scope items, define acceptance criteria for all packages, and verify 100% coverage before proceeding.',
      },
    },

    // ── Step 4: Schedule Development ─────────────────────────────────────
    {
      id: 4,
      title: 'Schedule Development & Critical Path',
      purpose:
        'Sequence work packages, estimate durations, identify the critical path, and produce a project schedule baseline that accounts for dependencies, resource constraints, and schedule reserves.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s develop the project schedule.\n\nUsing the WBS (Artifact 3A) and WBS Dictionary (Artifact 3B), sequence work packages, estimate durations, and identify the critical path.\n\nSCHEDULING RULES:\n1. Every work package from the WBS must appear in the schedule.\n2. Use Finish-to-Start (FS) as the default dependency type. Use SS, FF, or SF only when explicitly justified.\n3. Apply three-point estimation: Optimistic (O), Most Likely (M), Pessimistic (P). Expected = (O + 4M + P) / 6.\n4. Identify the critical path — the longest sequence of dependent activities with zero float.\n5. Include schedule reserve (buffer) at the end of the critical path — typically 10-15% of total duration.\n6. Identify resource-constrained activities where parallelism is limited by team availability.\n\nProduce the following artifacts:\n\n**Artifact 4A: Activity Schedule**\n\n| WBS ID | Activity | Predecessors | Dependency Type | O (days) | M (days) | P (days) | Expected (days) | Start Date | End Date | Float (days) | Critical Path? | Resource |\n|--------|----------|-------------|-----------------|----------|----------|----------|-----------------|------------|----------|-------------|---------------|----------|\n| 1.1.1 | Project Management Plan | — | — | | | | | | | | | PM |\n| 1.2.1 | [Work Package] | 1.1.1 | FS | | | | | | | | | |\n| ... | | | | | | | | | | | | |\n\n**Artifact 4B: Critical Path Analysis**\n\n| Metric | Value |\n|--------|-------|\n| Total Project Duration (working days) | |\n| Critical Path Length (working days) | |\n| Critical Path Activities | [List WBS IDs on the critical path] |\n| Schedule Reserve (days) | |\n| Project End Date (with reserve) | |\n| Near-Critical Paths (float < 5 days) | [List any near-critical chains] |\n| Total Float in Non-Critical Activities | |\n\n**Artifact 4C: Milestone Tracker (Refined)**\n\nRefine the high-level milestones from Step 1 with actual dates based on the schedule:\n\n| Milestone ID | Milestone | Charter Date | Scheduled Date | Variance (days) | On Critical Path? | Gate Criteria |\n|-------------|-----------|-------------|----------------|-----------------|-------------------|---------------|\n| MS-001 | | | | | | |\n| ... | | | | | | |\n\nFLAGGING RULES:\n- Flag any activity where Pessimistic > 2x Optimistic (high estimation uncertainty).\n- Flag any critical path activity that depends on an external resource or vendor.\n- Flag if the scheduled end date exceeds the target end date from the Charter.\n- Flag resource conflicts where the same person/team is on multiple parallel activities.',
      expectedOutput:
        'Artifact 4A: A complete Activity Schedule with three-point estimates, calculated expected durations, dates, float, and critical path identification. Artifact 4B: A Critical Path Analysis summary. Artifact 4C: A Refined Milestone Tracker showing charter vs scheduled dates with variances.',
      artifacts: [
        {
          name: 'Activity Schedule',
          description:
            'Complete project schedule with three-point estimates, dependencies, float, and critical path flagging.',
          format: 'table',
          columns: [
            'WBS ID',
            'Activity',
            'Predecessors',
            'Expected (days)',
            'Start Date',
            'End Date',
            'Float (days)',
            'Critical Path?',
            'Resource',
          ],
        },
        {
          name: 'Critical Path Analysis',
          description:
            'Summary of critical path length, activities, schedule reserve, and near-critical paths.',
          format: 'table',
          columns: ['Metric', 'Value'],
        },
        {
          name: 'Milestone Tracker',
          description:
            'Refined milestones comparing charter target dates with scheduled dates and variances.',
          format: 'table',
          columns: [
            'Milestone ID',
            'Milestone',
            'Charter Date',
            'Scheduled Date',
            'Variance (days)',
            'On Critical Path?',
          ],
        },
      ],
      checkpoint: {
        title: 'Schedule Verification',
        items: [
          {
            label: 'All work packages are scheduled',
            description:
              'Every work package from the WBS appears in the activity schedule with dates and estimates.',
          },
          {
            label: 'Critical path is identified and realistic',
            description:
              'The critical path is clearly marked and the total duration is achievable within the target timeline.',
          },
          {
            label: 'Three-point estimates are reasonable',
            description:
              'Optimistic, Most Likely, and Pessimistic values make sense — no activities where P > 2x O without flagging.',
          },
          {
            label: 'Schedule reserve is included',
            description:
              'A 10-15% schedule reserve is added at the end of the critical path.',
          },
          {
            label: 'Milestone dates align with charter',
            description:
              'Variances between charter target dates and scheduled dates are explained and acceptable.',
          },
        ],
        failAction:
          'Adjust estimates, re-sequence activities to reduce critical path length, add resources to critical activities, or negotiate timeline changes with the sponsor.',
      },
    },

    // ── Step 5: Risk Register & Analysis ─────────────────────────────────
    {
      id: 5,
      title: 'Risk Register & Qualitative Analysis',
      purpose:
        'Identify all project risks, perform qualitative analysis using probability and impact assessment, prioritize risks, and develop response strategies — the Uncertainty performance domain in PMBOK 7th Edition.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s build the Risk Register.\n\nReview all artifacts produced so far (Charter, Stakeholder Register, WBS, Schedule) and identify ALL risks that could threaten project success.\n\nRISK CATEGORIES (use as a checklist):\n- **Technical**: New technology, integration complexity, performance requirements, technical debt\n- **Schedule**: Critical path delays, resource availability, dependency bottlenecks\n- **Cost**: Budget overruns, unforeseen expenses, vendor price changes\n- **Scope**: Requirements changes, scope creep, ambiguous requirements\n- **Resource**: Key person dependency, skill gaps, attrition, availability conflicts\n- **External**: Vendor delays, regulatory changes, market shifts, force majeure\n- **Organizational**: Competing priorities, governance changes, funding uncertainty\n- **Quality**: Defect rates, testing coverage, acceptance criteria disputes\n\nRISK RESPONSE STRATEGIES:\n- **Negative risks (threats)**: Avoid, Transfer, Mitigate, Accept\n- **Positive risks (opportunities)**: Exploit, Share, Enhance, Accept\n\nProduce the following artifacts:\n\n**Artifact 5A: Risk Register**\n\n| Risk ID | Description | Category | Probability (1-5) | Impact (1-5) | Risk Score (P x I) | Priority (H/M/L) | Response Strategy | Response Actions | Owner | Trigger | Status |\n|---------|-------------|----------|-------------------|-------------|-------------------|------------------|------------------|-----------------|-------|---------|--------|\n| RISK-001 | | | | | | | | | | | Open |\n| RISK-002 | | | | | | | | | | | Open |\n| ... | | | | | | | | | | | |\n\n**Artifact 5B: Risk Probability-Impact Matrix**\n\n| | Impact 1 (Very Low) | Impact 2 (Low) | Impact 3 (Medium) | Impact 4 (High) | Impact 5 (Very High) |\n|---|---|---|---|---|---|\n| Prob 5 (Very Likely) | [count] | [count] | [count] | [count] | [count] |\n| Prob 4 (Likely) | [count] | [count] | [count] | [count] | [count] |\n| Prob 3 (Possible) | [count] | [count] | [count] | [count] | [count] |\n| Prob 2 (Unlikely) | [count] | [count] | [count] | [count] | [count] |\n| Prob 1 (Rare) | [count] | [count] | [count] | [count] | [count] |\n\nColor coding: Score 15-25 = High (Red), 8-14 = Medium (Yellow), 1-7 = Low (Green)\n\n**Artifact 5C: Risk Summary Dashboard**\n\n| Metric | Value |\n|--------|-------|\n| Total Risks Identified | |\n| High Priority (Score 15-25) | |\n| Medium Priority (Score 8-14) | |\n| Low Priority (Score 1-7) | |\n| Risks on Critical Path | |\n| External/Vendor Risks | |\n| Estimated Contingency Reserve Needed | |\n\nRULES:\n- Identify at minimum 8 risks across at least 4 different categories.\n- Every High-priority risk MUST have a named owner and specific response actions.\n- Risks identified in the Schedule (flagged critical path items) should appear here.\n- Stakeholder risks (Resistant/Blocker stakeholders from Step 2) should appear here.\n- Include at least 1 positive risk (opportunity) to demonstrate balanced risk thinking.',
      expectedOutput:
        'Artifact 5A: A Risk Register with 8+ risks across multiple categories, scored and prioritized with response strategies. Artifact 5B: A Probability-Impact Matrix. Artifact 5C: A Risk Summary Dashboard. All high-priority risks have owners and actions.',
      artifacts: [
        {
          name: 'Risk Register',
          description:
            'Comprehensive project risk register with qualitative analysis, response strategies, owners, and triggers.',
          format: 'table',
          columns: [
            'Risk ID',
            'Description',
            'Category',
            'P x I Score',
            'Priority',
            'Response Strategy',
            'Response Actions',
            'Owner',
            'Status',
          ],
        },
        {
          name: 'Probability-Impact Matrix',
          description:
            'Visual matrix showing risk concentration by probability and impact levels.',
          format: 'matrix',
          columns: ['Impact 1', 'Impact 2', 'Impact 3', 'Impact 4', 'Impact 5'],
          rows: ['Prob 5', 'Prob 4', 'Prob 3', 'Prob 2', 'Prob 1'],
        },
        {
          name: 'Risk Summary Dashboard',
          description:
            'Aggregate risk metrics including priority distribution, critical path risks, and contingency needs.',
          format: 'table',
          columns: ['Metric', 'Value'],
        },
      ],
      checkpoint: {
        title: 'Risk Register Verification',
        items: [
          {
            label: 'Risks are comprehensive',
            description:
              'At least 8 risks identified across 4+ categories including technical, schedule, cost, and external.',
          },
          {
            label: 'Scoring is consistent',
            description:
              'Probability and Impact scores use the 1-5 scale consistently. Risk Score = P x I.',
          },
          {
            label: 'High-priority risks have response plans',
            description:
              'Every risk with Score >= 15 has a named owner, specific response actions, and a trigger condition.',
          },
          {
            label: 'Cross-references are included',
            description:
              'Schedule risks and stakeholder risks from previous steps appear in the register.',
          },
          {
            label: 'At least one opportunity is identified',
            description:
              'The register includes at least one positive risk with an Exploit, Share, or Enhance strategy.',
          },
        ],
        failAction:
          'Add missing risk categories, assign owners to unowned high-priority risks, define specific response actions, and verify cross-references to schedule and stakeholder artifacts.',
      },
    },

    // ── Step 6: Project Management Plan Assembly ─────────────────────────
    {
      id: 6,
      title: 'Project Management Plan Assembly',
      purpose:
        'Consolidate all artifacts into a complete Project Management Plan (PMP), add the Communication Management Plan and Quality Management approach, and produce a stakeholder-ready document for baseline approval.',
      estimatedTime: '10 min',
      prompt:
        'Let\'s assemble the complete Project Management Plan.\n\nConsolidate all artifacts produced in Steps 0-5 into a single, stakeholder-ready Project Management Plan. Additionally, produce the Communication Management Plan and Quality Management approach that are still missing.\n\n**Artifact 6A: Communication Management Plan**\n\n| Comm ID | Communication | Audience | Method | Frequency | Owner | Content / Template | Escalation |\n|---------|--------------|----------|--------|-----------|-------|-------------------|------------|\n| COMM-001 | Project Status Report | Sponsor, Steering Committee | Email + Meeting | Weekly | PM | Progress, risks, decisions needed | Immediate for Red items |\n| COMM-002 | Team Standup Summary | Project Team | Instant Message | Daily | PM | Blockers, progress, help needed | PM → Sponsor if blocked > 2 days |\n| COMM-003 | Stakeholder Newsletter | All Stakeholders | Email | Monthly | PM | Milestones achieved, upcoming work | N/A |\n| ... | | | | | | | |\n\nInclude communications for:\n- Executive/sponsor updates\n- Team coordination\n- Stakeholder engagement (from Engagement Plan)\n- Vendor/external coordination\n- Change request notifications\n- Risk escalation\n- Milestone/gate reviews\n\n**Artifact 6B: Quality Management Approach**\n\n| Quality Element | Description |\n|----------------|------------|\n| Quality Objectives | [What "quality" means for this project — link to success criteria from Charter] |\n| Quality Standards | [Industry standards, organizational standards, regulatory requirements] |\n| Quality Assurance Activities | [Reviews, audits, process checks — HOW quality will be built in] |\n| Quality Control Activities | [Testing, inspections, acceptance criteria verification — HOW quality will be verified] |\n| Acceptance Criteria Summary | [Reference WBS Dictionary acceptance criteria] |\n| Quality Metrics | [Specific measurable quality indicators] |\n| Quality Roles | [Who is responsible for QA vs QC] |\n\n**Artifact 6C: Project Management Plan (Consolidated)**\n\nAssemble the complete PMP with the following sections:\n\n1. **Document Control** — Version, date, author, approval signatures\n2. **Project Charter Summary** — From Artifact 1A\n3. **Scope Baseline** — Artifacts 1C + 3A + 3B (Scope Statement + WBS + WBS Dictionary)\n4. **Schedule Baseline** — Artifacts 4A + 4B + 4C (Activity Schedule + Critical Path + Milestones)\n5. **Stakeholder Management** — Artifacts 2A + 2B + 2C\n6. **Risk Management** — Artifacts 5A + 5B + 5C\n7. **Communication Management** — Artifact 6A\n8. **Quality Management** — Artifact 6B\n9. **Change Management Process** — How changes will be requested, evaluated, and approved\n10. **Governance & Decision Framework** — From Artifact 1F\n\nInclude a **Change Management Process** section:\n\n| Step | Activity | Responsible | Deliverable |\n|------|----------|------------|-------------|\n| 1 | Submit Change Request | Any team member | Change Request Form |\n| 2 | Impact Assessment | PM | Impact Analysis (scope, schedule, cost, risk) |\n| 3 | Review & Decision | Change Control Board | Approved / Rejected / Deferred |\n| 4 | Implementation | Assigned team | Updated baselines |\n| 5 | Communication | PM | Stakeholder notification |\n\nEnd with an **Open Items & Action Register**:\n\n| Item # | Description | Owner | Due Date | Priority | Status |\n|--------|-------------|-------|----------|----------|--------|\n| | | | | | |\n\nThis is the final deliverable. Ensure it is complete, internally consistent, and ready for baseline approval by the project sponsor.',
      expectedOutput:
        'Artifact 6A: A Communication Management Plan with 6+ communication types covering all stakeholder groups. Artifact 6B: A Quality Management Approach. Artifact 6C: A consolidated Project Management Plan with 10 sections, a Change Management Process, and an Open Items register. The PMP is self-contained and ready for sponsor approval.',
      artifacts: [
        {
          name: 'Communication Management Plan',
          description:
            'Structured communication plan covering all stakeholder groups with methods, frequency, and escalation paths.',
          format: 'table',
          columns: [
            'Comm ID',
            'Communication',
            'Audience',
            'Method',
            'Frequency',
            'Owner',
          ],
        },
        {
          name: 'Quality Management Approach',
          description:
            'Quality objectives, standards, QA/QC activities, and metrics for the project.',
          format: 'table',
          columns: ['Quality Element', 'Description'],
        },
        {
          name: 'Project Management Plan',
          description:
            'Consolidated PMP containing all 10 sections — scope, schedule, stakeholder, risk, communication, quality, change management, and governance. Ready for baseline approval.',
          format: 'text',
        },
      ],
      checkpoint: {
        title: 'Project Management Plan Verification',
        items: [
          {
            label: 'All 10 PMP sections are present',
            description:
              'The consolidated plan includes all sections from Document Control through Governance & Decision Framework.',
          },
          {
            label: 'Communication plan covers all stakeholder groups',
            description:
              'Every quadrant from the Power/Interest Grid has an appropriate communication type and frequency.',
          },
          {
            label: 'Change management process is defined',
            description:
              'The change process includes request, assessment, decision, implementation, and communication steps.',
          },
          {
            label: 'Internal consistency across artifacts',
            description:
              'Dates, names, WBS IDs, and risk IDs are consistent across all sections — no contradictions.',
          },
          {
            label: 'All assumptions are resolved',
            description:
              'No unresolved [ASSUMPTION] tags remain in the final plan — all have been confirmed or corrected.',
          },
        ],
        failAction:
          'Fill in missing sections, resolve cross-reference inconsistencies, add communication plans for uncovered stakeholder groups, and ensure the change management process is complete.',
      },
    },
  ],
  requiredInputs: [
    {
      name: 'Project Overview',
      description:
        'Project name, description, and business justification explaining why this project is being undertaken.',
      format: 'Structured text: Project Name, Description, Business Justification',
    },
    {
      name: 'Sponsoring Organization',
      description:
        'The organization sponsoring the project, project sponsor name and title, and the funding source or budget authority.',
      format: 'Text: Organization, Sponsor Name & Title, Funding Source',
    },
    {
      name: 'Key Stakeholders',
      description:
        'Known stakeholders including names, roles, departments, and their interest or involvement in the project.',
      format: 'Table or list: Name | Role | Department | Interest',
    },
    {
      name: 'High-Level Requirements',
      description:
        'Five to ten high-level requirements or objectives the project must deliver, with enough detail to decompose into work packages.',
      format: 'Numbered list: 5-10 requirements with brief descriptions',
    },
    {
      name: 'Known Constraints & Assumptions',
      description:
        'Budget constraints, timeline constraints, regulatory requirements, resource limitations, and key assumptions the plan will be based on.',
      format: 'List: Constraints and Assumptions with category labels',
    },
    {
      name: 'Target Timeline',
      description:
        'Target project start date, end date, and any fixed milestone dates that cannot be moved (regulatory deadlines, external commitments).',
      format: 'Dates: Start Date, End Date, Fixed Milestones',
    },
  ],
  artifactsProduced: [
    'Session Context Summary',
    'Project Charter',
    'Project Objectives & Success Criteria',
    'High-Level Scope Statement',
    'Milestone Schedule',
    'Budget Summary',
    'Governance & Authority Matrix',
    'Stakeholder Register',
    'Power/Interest Grid',
    'Stakeholder Engagement Plan',
    'Work Breakdown Structure',
    'WBS Dictionary',
    'Scope Baseline Summary',
    'Activity Schedule',
    'Critical Path Analysis',
    'Milestone Tracker',
    'Risk Register',
    'Probability-Impact Matrix',
    'Risk Summary Dashboard',
    'Communication Management Plan',
    'Quality Management Approach',
    'Project Management Plan',
  ],
  tier: 'premium',
  price: 29700,
  suiteId: 'pmbok-suite',
};
