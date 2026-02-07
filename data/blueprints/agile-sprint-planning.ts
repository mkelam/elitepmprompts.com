import type { Blueprint } from '@/lib/types';

export const agileSprintPlanning: Blueprint = {
  id: 'agile-sprint-planning',
  slug: 'agile-sprint-planning',
  title: 'Agile Sprint Planning & Refinement Copilot',
  subtitle:
    'AI-guided sprint planning with backlog refinement, capacity planning, sprint goal definition, story decomposition, and team commitment — fully aligned with the Scrum Guide 2020 and modern Agile best practices.',
  methodology: 'Agile',
  version: '1.0.0',
  estimatedTime: '60-75 minutes',
  stepCount: 6,
  steps: [
    // ── Step 0: Context Primer ───────────────────────────────────────────
    {
      id: 0,
      title: 'Context Primer',
      purpose:
        'Establish the AI session as an experienced Scrum Master facilitating Sprint Planning, set session rules, and ingest the team context — roster, sprint cadence, Definition of Done, product backlog state, and velocity history — required for all subsequent steps.',
      estimatedTime: '5 min',
      prompt:
        'You are an experienced Scrum Master facilitating a Sprint Planning session, aligned with the Scrum Guide 2020. Your role is to guide me through a structured, step-by-step Sprint Planning and Backlog Refinement process that produces actionable, production-ready Scrum artifacts.\n\nSESSION RULES — follow these throughout the entire session:\n1. Use Scrum Guide 2020 terminology and artifact formats exclusively.\n2. Produce tables, not narratives — every artifact must be in structured table format unless explicitly stated otherwise.\n3. Flag every assumption you make with [ASSUMPTION] so I can confirm or correct it.\n4. Use correct Scrum terms: Product Backlog Items / User Stories (not features), Sprint Goal (not PI Objective), Sprint Backlog (not team backlog), Story Points (not T-shirt sizes, unless the team specifies otherwise).\n5. Ask clarifying questions before proceeding if critical information is missing.\n6. Number all items for easy cross-referencing (e.g., Story US-001, Task T-001, Risk SR-001).\n7. Always consider the Definition of Done when evaluating story readiness and decomposition.\n8. Respect the Scrum values: Commitment, Focus, Openness, Respect, Courage.\n\nTo begin, I need you to acknowledge these rules and confirm you are ready. Then I will paste the following context:\n\nCONTEXT TO PASTE BELOW:\n---\n**Team Roster**\n[Paste your Scrum team roster here — include team member names, roles (Developer, QA, Designer, etc.), availability status for the upcoming sprint, and any specializations]\n\n**Sprint Cadence**\n[Paste your sprint details — sprint number, sprint duration (e.g., 2 weeks), start date, end date, any planned holidays or ceremonies]\n\n**Definition of Done (DoD)**\n[Paste your team\'s current Definition of Done — e.g., code reviewed, unit tests passing, deployed to staging, documentation updated, PO accepted]\n\n**Product Backlog State**\n[Paste or describe the current state of your product backlog — total items, how many are refined, top priorities from Product Owner, any recent changes or reprioritizations]\n\n**Velocity History**\n[Paste your team\'s velocity for the last 3-5 sprints — include sprint number and story points completed. If unavailable, state "No historical velocity data"]\n---\n\nAfter receiving my context, summarize it back to me in a structured table and confirm:\n- Team size and composition identified\n- Sprint cadence and duration confirmed\n- Definition of Done received and understood\n- Product Backlog state assessed\n- Velocity trend calculated (average, trend direction)\n- Any missing information or ambiguities that need resolution before proceeding\n\nProduce the following summary artifact:\n\n**Session Context Summary**\n\n| Parameter | Value Provided | Assumptions / Clarifications Needed |\n|-----------|----------------|--------------------------------------|\n| Team Size | | |\n| Sprint Number | | |\n| Sprint Duration | | |\n| Sprint Dates | | |\n| DoD Items Count | | |\n| Backlog Items (Total / Refined) | | |\n| Avg Velocity (Last 3-5 Sprints) | | |\n| Velocity Trend | | |\n| Holidays / Absences | | |\n| Key Risks or Concerns | | |',
      expectedOutput:
        'Acknowledgement of session rules, a completed Session Context Summary table with all parameters populated, identification of velocity trend (stable, increasing, decreasing), and confirmation that the session is ready to proceed to Step 1. Any missing information flagged with [ASSUMPTION] or clarifying questions.',
      artifacts: [
        {
          name: 'Session Context Summary',
          description:
            'Structured recap of team roster, sprint cadence, Definition of Done, backlog state, and velocity history as understood by the AI facilitator.',
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
              'The AI explicitly confirmed it will follow Scrum Guide 2020 terminology, table-based artifacts, assumption flagging, and correct naming conventions.',
          },
          {
            label: 'Team roster accurately summarized',
            description:
              'All team members, roles, and availability status are correctly reflected in the summary.',
          },
          {
            label: 'Sprint cadence and dates confirmed',
            description:
              'Sprint number, duration, start date, end date, and holidays are correctly captured.',
          },
          {
            label: 'Definition of Done captured',
            description:
              'The DoD is listed and understood — the AI can reference it in later steps for story readiness checks.',
          },
          {
            label: 'Velocity history ingested',
            description:
              'Average velocity and trend direction are calculated from the provided sprint history, or gaps are flagged.',
          },
        ],
        failAction:
          'Correct any misunderstood context, provide missing information (especially velocity data and DoD), and re-run Step 0 until the summary is accurate.',
      },
    },

    // ── Step 1: Product Backlog Assessment ────────────────────────────────
    {
      id: 1,
      title: 'Product Backlog Assessment',
      purpose:
        'Review the product backlog, assess readiness of candidate items for the upcoming sprint, apply prioritization (MoSCoW or value/effort), and produce a ranked, sprint-ready backlog with clear priority rationale.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s assess and prioritize the product backlog for this sprint.\n\nTake the product backlog provided in Step 0 and perform the following:\n\n1. **Readiness Check**: For each candidate backlog item, verify it meets the INVEST criteria:\n   - **I**ndependent — Can be developed without depending on other stories in this sprint?\n   - **N**egotiable — Is there room for conversation about implementation approach?\n   - **V**aluable — Does it deliver clear value to the user or business?\n   - **E**stimable — Is it well-understood enough to be estimated?\n   - **S**mall — Can it be completed within a single sprint?\n   - **T**estable — Are acceptance criteria clear enough to write tests?\n\n2. **Prioritization**: Apply MoSCoW prioritization informed by value and effort:\n   - **Must Have** — Critical for sprint goal; sprint fails without it\n   - **Should Have** — Important but sprint can succeed without it\n   - **Could Have** — Desirable if capacity allows\n   - **Won\'t Have (this sprint)** — Explicitly deferred; document reason\n\n3. **Sprint Candidacy**: Mark each item as a sprint candidate (Yes/No/Needs Refinement) based on readiness and priority.\n\nProduct Backlog Input:\n[If not already provided in Step 0, paste your product backlog here — include item title, description, acceptance criteria, and any known estimates]\n\nProduce the following artifact:\n\n**Artifact 1: Prioritized Backlog Matrix**\n\n| ID | User Story | Priority (MoSCoW) | Story Points | Value (H/M/L) | Effort (H/M/L) | Dependencies | INVEST Pass? | Sprint Candidate |\n|----|------------|-------------------|-------------|----------------|-----------------|--------------|--------------|------------------|\n| US-001 | As a [user], I want [feature] so that [benefit] | Must Have | | High | Medium | None | Yes | Yes |\n| US-002 | | | | | | | | |\n| US-003 | | | | | | | | |\n| ... | | | | | | | | |\n\nPRIORITIZATION RULES:\n- Items marked "Must Have" should not exceed 60% of the team\'s average velocity — this protects the sprint from overcommitment on critical items.\n- If a story fails the INVEST check (especially "Small" or "Estimable"), flag it as "Needs Refinement" and note what is missing.\n- If a story has unresolved dependencies, flag it with [DEPENDENCY] and note the blocking item.\n- Stories without acceptance criteria should be flagged as [ASSUMPTION] with placeholder criteria that the Product Owner must confirm.\n- Provide a brief rationale for each MoSCoW classification in cases where it is not immediately obvious.\n\nAt the bottom, include a summary:\n\n**Backlog Assessment Summary**\n\n| Metric | Count |\n|--------|-------|\n| Total Items Assessed | |\n| Must Have | |\n| Should Have | |\n| Could Have | |\n| Won\'t Have (this sprint) | |\n| Sprint Candidates (Ready) | |\n| Needs Refinement | |\n| Total Estimated SP (Candidates) | |\n| Team Avg Velocity | |',
      expectedOutput:
        'A completed Prioritized Backlog Matrix with all candidate items assessed against INVEST criteria, MoSCoW-prioritized, estimated, and marked as sprint candidates. A Backlog Assessment Summary showing counts by priority and readiness status. All assumptions and dependency flags clearly marked.',
      artifacts: [
        {
          name: 'Prioritized Backlog Matrix',
          description:
            'Full product backlog assessment with MoSCoW prioritization, INVEST readiness check, story point estimates, and sprint candidacy status.',
          format: 'table',
          columns: [
            'ID',
            'User Story',
            'Priority (MoSCoW)',
            'Story Points',
            'Value (H/M/L)',
            'Effort (H/M/L)',
            'Dependencies',
            'INVEST Pass?',
            'Sprint Candidate',
          ],
        },
        {
          name: 'Backlog Assessment Summary',
          description:
            'Aggregate counts of items by MoSCoW priority, readiness status, and total estimated story points versus team velocity.',
          format: 'table',
          columns: ['Metric', 'Count'],
        },
      ],
      checkpoint: {
        title: 'Backlog Assessment Verification',
        items: [
          {
            label: 'All backlog items are assessed',
            description:
              'Every item from the product backlog is present in the matrix — nothing has been omitted.',
          },
          {
            label: 'INVEST criteria applied consistently',
            description:
              'Each item has been evaluated against all six INVEST criteria with failures noted.',
          },
          {
            label: 'Must Have items do not exceed 60% of velocity',
            description:
              'Total story points for Must Have items stay within the 60% velocity safety threshold.',
          },
          {
            label: 'Items needing refinement are flagged',
            description:
              'Stories that fail INVEST (especially Small, Estimable, Testable) are marked "Needs Refinement" with specific gaps noted.',
          },
          {
            label: 'Dependencies are identified',
            description:
              'All inter-story and external dependencies are flagged with [DEPENDENCY] tags.',
          },
        ],
        failAction:
          'Re-assess items that were missed, adjust MoSCoW classifications if Must Have exceeds the 60% threshold, and send items needing refinement back to the Product Owner for clarification before proceeding.',
      },
    },

    // ── Step 2: Team Capacity Calculation ─────────────────────────────────
    {
      id: 2,
      title: 'Team Capacity Calculation',
      purpose:
        'Calculate the team\'s available capacity for the upcoming sprint based on individual availability, accounting for PTO, ceremonies, focus factor, and other commitments to establish a realistic planning ceiling.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s calculate the team\'s sprint capacity.\n\nUsing the team roster and sprint cadence from Step 0, calculate the available capacity for each team member and the team as a whole.\n\nCAPACITY CALCULATION METHOD:\n1. **Available Days** = Sprint Duration (working days) - PTO days - Public Holidays\n2. **Ceremony Hours** = Time spent in recurring Scrum ceremonies (Daily Standup, Sprint Review, Sprint Retro, Refinement sessions, Sprint Planning itself)\n3. **Focus Factor** = Percentage of time actually spent on sprint work after meetings, interruptions, and context switching. Typical range: 0.6 - 0.8 (60%-80%). Use team\'s historical focus factor if available, otherwise default to 0.7 [ASSUMPTION].\n4. **Net Available Hours** = Available Days x Working Hours/Day x Focus Factor - Ceremony Hours\n5. **Net Capacity (SP)** = Estimated based on velocity-to-hours ratio from historical data, OR use the aggregate team velocity approach.\n\nTeam Availability Input:\n[Paste each team member\'s availability — include any PTO, half-days, training, or other commitments during the sprint]\n\nProduce the following artifact:\n\n**Artifact 2: Sprint Capacity Matrix**\n\n| Team Member | Role | Available Days | Ceremony Hours | Focus Factor | Gross Hours | Net Available Hours | Net Capacity (SP) | Notes |\n|-------------|------|----------------|----------------|--------------|-------------|--------------------|--------------------|-------|\n| [Name 1] | Developer | | | | | | | |\n| [Name 2] | Developer | | | | | | | |\n| [Name 3] | QA | | | | | | | |\n| [Name 4] | Designer | | | | | | | |\n| ... | | | | | | | | |\n| **Team Total** | | | | | | | | |\n\nCALCULATION RULES:\n- Default working hours per day = 8 hours unless specified otherwise.\n- Ceremony hours per sprint (typical 2-week sprint): Daily Standup (15 min x 10 days = 2.5 hrs), Sprint Planning (2-4 hrs), Sprint Review (1-2 hrs), Sprint Retrospective (1-1.5 hrs), Backlog Refinement (2-4 hrs). Total typically 9-14 hours per person. Adjust based on the team\'s actual ceremony schedule.\n- If a team member is part-time or shared with another team, prorate their capacity accordingly and flag with [ASSUMPTION] if the split is not specified.\n- Net Capacity (SP) for individual members is informational — the team commits as a unit. The Team Total row is the planning ceiling.\n- If the team uses velocity-based planning (not hours-based), compute the aggregate SP capacity as: Team Avg Velocity x (Available Capacity This Sprint / Normal Capacity). Flag any sprint where available capacity is below 80% of normal — this is a reduced-capacity sprint.\n\nAfter the capacity matrix, produce:\n\n**Capacity Health Check**\n\n| Check | Status | Detail |\n|-------|--------|--------|\n| Sprint capacity vs avg velocity | | [e.g., "92% of normal — minor reduction due to 1 day PTO"] |\n| Key person risk | | [e.g., "No single-person dependencies" or "Only 1 QA — bottleneck risk"] |\n| Ceremony load | | [e.g., "Standard" or "Heavy — 3 extra refinement sessions planned"] |\n| Recommended planning ceiling (SP) | | [e.g., "Use 85-90% of calculated capacity as planning ceiling"] |',
      expectedOutput:
        'A completed Sprint Capacity Matrix with one row per team member plus a Team Total row, all calculations shown. A Capacity Health Check table identifying capacity risks, key person dependencies, and a recommended planning ceiling in story points. All assumptions flagged.',
      artifacts: [
        {
          name: 'Sprint Capacity Matrix',
          description:
            'Per-member capacity calculation accounting for PTO, ceremonies, and focus factor, with team-level totals.',
          format: 'table',
          columns: [
            'Team Member',
            'Role',
            'Available Days',
            'Ceremony Hours',
            'Focus Factor',
            'Gross Hours',
            'Net Available Hours',
            'Net Capacity (SP)',
            'Notes',
          ],
        },
        {
          name: 'Capacity Health Check',
          description:
            'Summary assessment of sprint capacity health including velocity comparison, key person risks, ceremony load, and recommended planning ceiling.',
          format: 'table',
          columns: ['Check', 'Status', 'Detail'],
        },
      ],
      checkpoint: {
        title: 'Capacity Calculation Verification',
        items: [
          {
            label: 'All team members accounted for',
            description:
              'Every person on the roster appears in the capacity matrix with correct role and availability.',
          },
          {
            label: 'PTO and holidays correctly deducted',
            description:
              'Available days accurately reflect planned absences and public holidays during the sprint.',
          },
          {
            label: 'Focus factor is realistic',
            description:
              'Focus factor is based on team history or a reasonable default (0.6-0.8), not an optimistic assumption.',
          },
          {
            label: 'Ceremony hours are accurate',
            description:
              'Total ceremony hours match the team\'s actual ceremony schedule, not a generic estimate.',
          },
          {
            label: 'Planning ceiling is established',
            description:
              'A recommended planning ceiling in SP is provided, accounting for capacity risks and historical velocity.',
          },
        ],
        failAction:
          'Correct availability data, adjust focus factor based on team feedback, recalculate ceremony hours, and recompute the capacity matrix until the planning ceiling is agreed upon by the team.',
      },
    },

    // ── Step 3: Sprint Goal Definition ────────────────────────────────────
    {
      id: 3,
      title: 'Sprint Goal Definition',
      purpose:
        'Define a clear, measurable, and achievable sprint goal that aligns with the product goal and provides focus for the team. The sprint goal should be outcome-oriented and serve as the single objective the team commits to.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s define the Sprint Goal.\n\nThe Sprint Goal is the single most important element of Sprint Planning (Scrum Guide 2020). It provides coherence and focus, gives the Development Team flexibility in how they accomplish the work, and is the commitment for the Sprint Backlog.\n\nUsing the Prioritized Backlog Matrix (Artifact 1) and the team\'s planning ceiling from the Capacity Matrix (Artifact 2), work with the Product Owner perspective to craft a Sprint Goal.\n\nSPRINT GOAL CRITERIA:\n1. **Outcome-oriented** — Describes what will be achieved, not what tasks will be done.\n2. **Measurable** — Has clear success criteria that can be evaluated at Sprint Review.\n3. **Achievable** — Fits within the team\'s capacity and is realistic given known constraints.\n4. **Aligned** — Connects to the broader Product Goal or business objectives.\n5. **Singular focus** — One coherent goal, not a laundry list of unrelated items.\n6. **Negotiable on scope** — The team can adjust which stories are done to meet the goal, without changing the goal itself.\n\nANTI-PATTERNS TO AVOID:\n- "Complete all stories in the sprint backlog" — This is not a goal, it is a task list.\n- "Fix bugs and do some feature work" — Too vague and lacks coherence.\n- Multiple unrelated goals bundled together — Pick the most important one.\n- Goals that cannot be evaluated as done/not done at Sprint Review.\n\nProduce the following artifact:\n\n**Artifact 3: Sprint Goal Canvas**\n\n| Element | Detail |\n|---------|--------|\n| Sprint Goal Statement | [1-2 sentence outcome-oriented goal. Example: "Enable customers to complete self-service account setup without requiring support intervention, reducing onboarding time by 50%."] |\n| Why This Goal Matters | [Business justification — why is this the highest-value outcome for this sprint?] |\n| Success Criteria | [3-5 measurable criteria that determine if the goal is met at Sprint Review] |\n| Key Metrics | [Quantifiable metrics to track progress — e.g., "Onboarding completion rate," "Support ticket reduction"] |\n| Stakeholder Value | [Who benefits and how — end users, business, internal teams] |\n| Stories Supporting This Goal | [List the Must Have and Should Have stories from Artifact 1 that directly support the goal] |\n| Stories NOT Supporting This Goal | [List any sprint candidate stories that are independent of the goal — these are secondary and can be cut first if capacity is tight] |\n| Risks to Goal Achievement | [Top 3-5 risks that could prevent the goal from being met — reference SR-001 format] |\n| Fallback Position | [If the goal cannot be fully met, what is the minimum viable outcome the team should aim for?] |\n\nSPRINT GOAL VALIDATION RULES:\n- The goal must connect to at least 60% of the "Must Have" stories from the Prioritized Backlog Matrix.\n- If the goal does not align with the majority of Must Have stories, either the goal or the priorities need adjustment — flag this.\n- Success criteria must be verifiable at Sprint Review — avoid subjective criteria like "improved user experience" without a measurable proxy.\n- The fallback position should still deliver meaningful value, not just "complete half the stories."\n- Flag [ASSUMPTION] for any success criteria or metrics that have not been validated with the Product Owner.',
      expectedOutput:
        'A completed Sprint Goal Canvas with a concise, outcome-oriented goal statement, business justification, 3-5 measurable success criteria, key metrics, stakeholder value, linked stories, identified risks, and a fallback position. The goal is validated against Must Have story alignment.',
      artifacts: [
        {
          name: 'Sprint Goal Canvas',
          description:
            'Comprehensive sprint goal definition including goal statement, success criteria, key metrics, stakeholder value, supporting stories, risks, and fallback position.',
          format: 'table',
          columns: ['Element', 'Detail'],
        },
      ],
      checkpoint: {
        title: 'Sprint Goal Verification',
        items: [
          {
            label: 'Goal is outcome-oriented',
            description:
              'The sprint goal describes a business or user outcome, not a list of tasks or technical activities.',
          },
          {
            label: 'Success criteria are measurable',
            description:
              'Each success criterion can be objectively evaluated as met or not met at Sprint Review.',
          },
          {
            label: 'Goal aligns with Must Have stories',
            description:
              'At least 60% of Must Have stories from the Prioritized Backlog Matrix directly support the sprint goal.',
          },
          {
            label: 'Risks to goal are identified',
            description:
              'Key risks that could prevent goal achievement are listed with enough detail to monitor them during the sprint.',
          },
          {
            label: 'Fallback position is meaningful',
            description:
              'The fallback delivers real value and is not just "do less" — it represents a coherent minimum viable outcome.',
          },
        ],
        failAction:
          'Rewrite the sprint goal to be more outcome-oriented, adjust success criteria to be measurable, realign Must Have stories with the goal, and re-run Step 3 until the goal passes all validation checks.',
      },
    },

    // ── Step 4: Story Decomposition & Task Breakdown ─────────────────────
    {
      id: 4,
      title: 'Story Decomposition & Task Breakdown',
      purpose:
        'Break the selected sprint candidate stories into implementable tasks, estimate task effort, identify assignees, clarify acceptance criteria, and produce a complete Sprint Backlog that the team can execute against.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s decompose the selected stories into tasks and build the Sprint Backlog.\n\nTake all stories marked as "Sprint Candidate: Yes" from the Prioritized Backlog Matrix (Artifact 1), respecting the planning ceiling from the Capacity Matrix (Artifact 2) and alignment with the Sprint Goal (Artifact 3).\n\nFor each selected story:\n1. **Verify Definition of Ready** — Confirm the story has: a clear description, acceptance criteria, story point estimate, no unresolved blockers, and PO confirmation.\n2. **Decompose into Tasks** — Break each story into concrete, implementable tasks (development, testing, design, deployment, documentation, etc.).\n3. **Estimate Tasks** — Provide hour estimates for each task (tasks should be 1-8 hours; anything larger should be further decomposed).\n4. **Identify Assignees** — Suggest initial task assignments based on team member skills and availability from the Capacity Matrix.\n5. **Map Dependencies** — Note any inter-task or inter-story dependencies that affect execution order.\n6. **Clarify Acceptance Criteria** — Ensure each story has testable acceptance criteria aligned with the Definition of Done.\n\nProduce the following artifact:\n\n**Artifact 4: Sprint Backlog with Task Breakdown**\n\nFor EACH selected story, produce a task table:\n\n**US-001: [Story Title]** — [Story Points] SP | Priority: [MoSCoW] | Supports Sprint Goal: [Yes/No]\n\n| Task ID | Task Description | Type | Estimate (hrs) | Assignee | Dependencies | Status |\n|---------|-----------------|------|----------------|----------|--------------|--------|\n| T-001 | Implement user registration API endpoint | Dev | 4 | [Name] | None | To Do |\n| T-002 | Write unit tests for registration endpoint | Test | 3 | [Name] | T-001 | To Do |\n| T-003 | Create registration form UI component | Dev | 6 | [Name] | None | To Do |\n| T-004 | Integration testing — form to API | Test | 2 | [Name] | T-001, T-003 | To Do |\n| T-005 | Update user documentation | Docs | 1 | [Name] | T-001 | To Do |\n| **Story Total** | | | **16 hrs** | | | |\n\n**Acceptance Criteria for US-001:**\n- [ ] User can register with email and password\n- [ ] Email validation rejects invalid formats\n- [ ] Password meets minimum complexity requirements\n- [ ] Registration sends confirmation email\n- [ ] All Definition of Done items are met\n\n[Repeat for each selected story: US-002, US-003, etc.]\n\nAfter all stories are decomposed, produce the Sprint Backlog Summary:\n\n**Sprint Backlog Summary**\n\n| Metric | Value |\n|--------|-------|\n| Sprint Goal | [From Artifact 3] |\n| Total Stories Selected | |\n| Total Story Points | |\n| Total Tasks | |\n| Total Estimated Hours | |\n| Planning Ceiling (SP) | [From Artifact 2] |\n| Capacity Utilization | [Total SP / Planning Ceiling as %] |\n| Must Have SP | |\n| Should Have SP | |\n| Could Have SP | |\n| Stories Supporting Sprint Goal | |\n| Stories Independent of Sprint Goal | |\n\nDECOMPOSITION RULES:\n- Every task must be 1-8 hours. If a task exceeds 8 hours, decompose it further and flag the original as [OVERSIZED].\n- Every story must have at least one testing task — no story is complete without verification.\n- Tasks of type "Docs" should be included where the Definition of Done requires documentation updates.\n- If a story cannot be fully decomposed due to ambiguity, flag it as [NEEDS REFINEMENT] and list the specific questions that need PO answers.\n- Cross-story dependencies must be explicitly noted — if Task T-010 (Story US-003) depends on Task T-002 (Story US-001), this must be visible.\n- Assignee suggestions are initial — the team self-organizes during the sprint. Flag [ASSUMPTION] if assignments are based on assumed skills.\n- Total SP must not exceed the planning ceiling. If it does, identify which "Could Have" or "Should Have" stories should be deferred.',
      expectedOutput:
        'Per-story task breakdown tables with all tasks estimated, assigned, and dependency-mapped. Acceptance criteria listed for each story. A Sprint Backlog Summary showing total stories, SP, tasks, hours, and capacity utilization. All oversized tasks decomposed. All ambiguous stories flagged.',
      artifacts: [
        {
          name: 'Sprint Backlog with Task Breakdown',
          description:
            'Complete sprint backlog showing each selected story decomposed into implementable tasks with estimates, assignees, dependencies, and acceptance criteria.',
          format: 'table',
          columns: [
            'Task ID',
            'Task Description',
            'Type',
            'Estimate (hrs)',
            'Assignee',
            'Dependencies',
            'Status',
          ],
        },
        {
          name: 'Sprint Backlog Summary',
          description:
            'Aggregate view of the sprint backlog including total stories, SP, tasks, hours, capacity utilization, and priority breakdown.',
          format: 'table',
          columns: ['Metric', 'Value'],
        },
      ],
      checkpoint: {
        title: 'Story Decomposition Verification',
        items: [
          {
            label: 'All tasks are 1-8 hours',
            description:
              'No task exceeds 8 hours — oversized tasks have been further decomposed.',
          },
          {
            label: 'Every story has testing tasks',
            description:
              'Each decomposed story includes at least one task of type Test to verify acceptance criteria.',
          },
          {
            label: 'Total SP within planning ceiling',
            description:
              'The total committed story points do not exceed the recommended planning ceiling from Step 2.',
          },
          {
            label: 'Acceptance criteria are testable',
            description:
              'Each story has specific, verifiable acceptance criteria aligned with the Definition of Done.',
          },
          {
            label: 'Dependencies are mapped',
            description:
              'All inter-task and inter-story dependencies are explicitly documented and do not create circular chains.',
          },
        ],
        failAction:
          'Decompose oversized tasks, add missing test tasks, defer stories if over capacity, clarify ambiguous acceptance criteria with PO, and re-run Step 4 until the sprint backlog is clean and within the planning ceiling.',
      },
    },

    // ── Step 5: Sprint Commitment & Plan Assembly ────────────────────────
    {
      id: 5,
      title: 'Sprint Commitment & Plan Assembly',
      purpose:
        'Facilitate the team commitment decision, validate the sprint plan is achievable, assemble all artifacts into a cohesive Sprint Plan, and ensure the team is aligned and confident in their ability to deliver the Sprint Goal.',
      estimatedTime: '10 min',
      prompt:
        'Let\'s finalize the sprint plan and facilitate the team commitment.\n\nTEAM COMMITMENT PROCESS (Scrum Guide 2020):\nThe Developers commit to the Sprint Goal and the Sprint Backlog. This is not a top-down assignment — it is a team decision based on their assessment of the plan\'s feasibility.\n\nCOMMITMENT READINESS CHECKLIST — verify each item before asking for commitment:\n1. Sprint Goal is clear, measurable, and agreed upon by all.\n2. Sprint Backlog is within the team\'s capacity (utilization at 80-90% of planning ceiling).\n3. All Must Have stories are decomposed into tasks.\n4. No unresolved blockers or [NEEDS REFINEMENT] items remain.\n5. Dependencies are identified and mitigation plans exist.\n6. The Definition of Done is understood and achievable for all selected stories.\n7. The team has asked all their questions and concerns have been addressed.\n\nBased on the current state of all artifacts (Steps 0-4), assess the team\'s readiness for commitment and identify any outstanding concerns.\n\n[If you have actual team feedback or concerns, paste them here to incorporate into the assessment]\n\nProduce the following artifacts:\n\n**Artifact 5A: Sprint Plan Summary**\n\n| Element | Detail |\n|---------|--------|\n| Sprint Number | |\n| Sprint Dates | |\n| Sprint Goal | [From Artifact 3] |\n| Committed Stories | [List story IDs and titles] |\n| Total Story Points | |\n| Planning Ceiling (SP) | |\n| Capacity Utilization % | |\n| Total Tasks | |\n| Total Estimated Hours | |\n| Key Dependencies | [List critical dependencies from Artifact 4] |\n| Key Risks | [Top 3 risks to the sprint, referencing SR-IDs] |\n| Definition of Done | [Summarize from Step 0] |\n| Team Size (Available) | |\n| Team Commitment Level | [High / Medium / Low — based on assessment] |\n\n**Artifact 5B: Commitment Vote & Confidence Assessment**\n\nFacilitate a confidence vote — each team member rates their confidence in achieving the Sprint Goal on a scale of 1-5:\n- **5**: Very confident — plan is solid, no concerns\n- **4**: Confident — minor risks that are manageable\n- **3**: Moderate — some concerns but achievable\n- **2**: Low confidence — significant concerns\n- **1**: Not confident — plan needs rework\n\n| Team Member | Confidence (1-5) | Key Concerns | Suggested Adjustments |\n|-------------|------------------|--------------|----------------------|\n| [Name 1] | | | |\n| [Name 2] | | | |\n| [Name 3] | | | |\n| ... | | | |\n| **Team Average** | | | |\n\nCOMMITMENT RULES:\n- Team average confidence must be >= 3 to proceed with the plan.\n- Any individual voting 1 or 2 must have their concerns documented and addressed.\n- If average confidence < 3, specific adjustments must be identified:\n  - Which stories should be descoped (remove Could Have first, then Should Have)?\n  - Which risks need immediate mitigation before sprint start?\n  - Are there task reassignments that would improve confidence?\n- After adjustments, re-vote until average >= 3.\n\n**Artifact 5C: Sprint Risks & Impediments Register**\n\n| Risk ID | Description | Category | Impact (H/M/L) | Probability (H/M/L) | Mitigation Plan | Owner |\n|---------|-------------|----------|-----------------|---------------------|-----------------|-------|\n| SR-001 | | Capacity / Technical / Dependency / External | | | | |\n| SR-002 | | | | | | |\n| ... | | | | | | |\n\nRISK CATEGORIES:\n- **Capacity**: Team member availability, key person dependency, velocity uncertainty\n- **Technical**: New technology, integration complexity, environment issues\n- **Dependency**: External teams, third-party services, PO availability for questions\n- **External**: Vendor delays, infrastructure outages, requirement changes mid-sprint\n\nFINAL ASSEMBLY:\nAfter commitment is achieved, compile all artifacts into a complete Sprint Plan document:\n\n1. **Sprint Overview** — Sprint number, dates, goal, team\n2. **Sprint Goal Canvas** — Artifact 3\n3. **Capacity Summary** — Artifact 2\n4. **Sprint Backlog** — Artifact 4 (all story task breakdowns)\n5. **Sprint Plan Summary** — Artifact 5A\n6. **Commitment Record** — Artifact 5B\n7. **Risk Register** — Artifact 5C\n\nInclude an **Action Items Register** for anything that needs to happen before or during sprint start:\n\n| Item # | Action | Owner | Due Date | Status |\n|--------|--------|-------|----------|--------|\n| | | | | |\n\nThis is the final deliverable. The Sprint Plan should be self-contained and ready to guide the team through the entire sprint.',
      expectedOutput:
        'Artifact 5A: A complete Sprint Plan Summary with all key metrics. Artifact 5B: A Commitment Vote table with per-member confidence scores and a team average >= 3. Artifact 5C: A Sprint Risks & Impediments Register. A fully assembled Sprint Plan document containing all artifacts from Steps 0-5, plus an Action Items Register. The plan is ready for sprint execution.',
      artifacts: [
        {
          name: 'Sprint Plan Summary',
          description:
            'Consolidated sprint plan overview including sprint goal, committed stories, total SP, capacity utilization, key risks, and team commitment level.',
          format: 'table',
          columns: ['Element', 'Detail'],
        },
        {
          name: 'Commitment Vote & Confidence Assessment',
          description:
            'Per-member confidence vote on a 1-5 scale with concerns, suggested adjustments, and team average.',
          format: 'table',
          columns: [
            'Team Member',
            'Confidence (1-5)',
            'Key Concerns',
            'Suggested Adjustments',
          ],
        },
        {
          name: 'Sprint Risks & Impediments Register',
          description:
            'Sprint-level risk register categorizing capacity, technical, dependency, and external risks with mitigation plans and owners.',
          format: 'table',
          columns: [
            'Risk ID',
            'Description',
            'Category',
            'Impact (H/M/L)',
            'Probability (H/M/L)',
            'Mitigation Plan',
            'Owner',
          ],
        },
      ],
      checkpoint: {
        title: 'Sprint Commitment & Plan Verification',
        items: [
          {
            label: 'Team average confidence is >= 3',
            description:
              'The team average confidence score meets the minimum threshold of 3 out of 5.',
          },
          {
            label: 'Low-confidence concerns are addressed',
            description:
              'Any team member voting 1 or 2 has their concerns documented with specific adjustment actions.',
          },
          {
            label: 'Sprint plan is complete and consistent',
            description:
              'All sections of the Sprint Plan are populated and internally consistent — story points match across artifacts, capacity aligns, and risks reference real items.',
          },
          {
            label: 'All blockers are resolved or have mitigation',
            description:
              'No unresolved [NEEDS REFINEMENT] items or unmitigated blockers remain in the sprint backlog.',
          },
          {
            label: 'Action items have owners and due dates',
            description:
              'Every item in the Action Items Register has a named owner and a target date before or at sprint start.',
          },
        ],
        failAction:
          'If confidence < 3, descope Could Have and Should Have stories, address blocking concerns, reassign tasks if needed, and re-vote until the team achieves >= 3 average confidence. If the plan is incomplete, fill in missing sections before finalizing.',
      },
    },
  ],
  requiredInputs: [
    {
      name: 'Team Roster',
      description:
        'Scrum team roster including team member names, roles (Developer, QA, Designer, etc.), availability status for the upcoming sprint, and any relevant specializations.',
      format:
        'Table or list: Name | Role | Availability (Full/Partial/Out) | Notes',
    },
    {
      name: 'Sprint Cadence',
      description:
        'Sprint timing details including sprint number, sprint duration, start date, end date, and any planned holidays or ceremonies that affect available working days.',
      format:
        'Structured text: Sprint #, Duration (weeks), Start Date, End Date, Holidays/Events',
    },
    {
      name: 'Definition of Done',
      description:
        'The team\'s current Definition of Done — the quality criteria that must be met for any Product Backlog Item to be considered complete.',
      format: 'Checklist: e.g., Code reviewed, Tests passing, Deployed to staging, Docs updated, PO accepted',
    },
    {
      name: 'Product Backlog',
      description:
        'The current product backlog with candidate items for the sprint. Should include user story titles, descriptions, acceptance criteria, and any existing estimates or priority information from the Product Owner.',
      format:
        'Table or list: Story Title | Description | Acceptance Criteria | Estimate (SP) | Priority/Notes',
    },
    {
      name: 'Velocity History',
      description:
        'Team velocity for the last 3-5 sprints, showing story points completed per sprint. Used to calculate average velocity and identify trends.',
      format: 'Table: Sprint # | Story Points Completed',
    },
  ],
  artifactsProduced: [
    'Session Context Summary',
    'Prioritized Backlog Matrix',
    'Backlog Assessment Summary',
    'Sprint Capacity Matrix',
    'Capacity Health Check',
    'Sprint Goal Canvas',
    'Sprint Backlog with Task Breakdown',
    'Sprint Backlog Summary',
    'Sprint Plan Summary',
    'Commitment Vote & Confidence Assessment',
    'Sprint Risks & Impediments Register',
  ],
  tier: 'premium',
  price: 29700,
  suiteId: 'agile-suite',
};
