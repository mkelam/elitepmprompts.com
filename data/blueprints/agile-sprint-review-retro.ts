import type { Blueprint } from '@/lib/types';

export const agileSprintReviewRetro: Blueprint = {
  id: 'agile-sprint-review-retro',
  slug: 'agile-sprint-review-retro',
  title: 'Agile Sprint Review & Retrospective Engine',
  subtitle:
    'AI-guided sprint review with demo preparation, stakeholder feedback capture, velocity analysis, and structured retrospective with actionable improvement items — aligned with Scrum Guide 2020.',
  methodology: 'Agile',
  version: '1.0.0',
  estimatedTime: '50-65 minutes',
  stepCount: 5,
  steps: [
    // ── Step 0: Context Primer ───────────────────────────────────────────
    {
      id: 0,
      title: 'Context Primer',
      purpose:
        'Establish the AI session as a Scrum Master facilitating a combined Sprint Review and Retrospective ceremony, set ground rules for Scrum-aligned output, and ingest all sprint context required for the remaining steps.',
      estimatedTime: '5 min',
      prompt:
        'You are an experienced Scrum Master facilitating a combined Sprint Review and Sprint Retrospective session aligned with the Scrum Guide 2020. Your role is to guide me through a structured, step-by-step process that produces actionable sprint artifacts and continuous improvement commitments.\n\nSESSION RULES — follow these throughout the entire session:\n1. Use Scrum terminology exclusively as defined in the Scrum Guide 2020 — Sprint Goal, Product Backlog, Sprint Backlog, Increment, Definition of Done.\n2. Produce tables, not narratives — every artifact must be in structured table format unless explicitly stated otherwise.\n3. Flag every assumption you make with [ASSUMPTION] so I can confirm or correct it.\n4. Distinguish clearly between the Sprint Review (inspect the Increment and adapt the Product Backlog) and the Sprint Retrospective (inspect the process and create improvement actions).\n5. Ask clarifying questions before proceeding if critical information is missing — do not invent sprint data.\n6. Number all items for easy cross-referencing (e.g., STORY-001, FB-001, RETRO-001, ACTION-001).\n7. Apply empiricism principles throughout: Transparency (make all data visible), Inspection (examine what happened and why), Adaptation (commit to concrete changes).\n8. All velocity and capacity references should use Story Points (SP) unless I specify otherwise.\n\nTo begin, I need you to acknowledge these rules and confirm you are ready. Then I will paste the following context:\n\nCONTEXT TO PASTE BELOW:\n---\n**Sprint Information**\n[Paste: Sprint number, sprint duration, sprint start date, sprint end date]\n\n**Sprint Goal**\n[Paste the Sprint Goal as agreed during Sprint Planning]\n\n**Sprint Backlog — Committed Stories**\n[Paste the list of user stories / Product Backlog Items committed to this sprint, including Story ID, title, story points, and acceptance criteria summary]\n\n**Sprint Backlog — Actual Delivery Status**\n[Paste the actual status of each story: Done, In Progress, Not Started, Blocked — include reason for any incomplete items]\n\n**Team Composition**\n[Paste: team members, roles (Developer, Scrum Master, Product Owner), availability during the sprint (any absences or partial availability)]\n\n**Stakeholder List**\n[Paste: stakeholders attending the Sprint Review — name, role, department, area of interest]\n\n**Team Feedback / Observations**\n[Paste any notes, feedback, or observations from the team about this sprint — what felt good, what felt difficult, blockers encountered, process friction]\n\n**Previous Sprint Improvement Actions**\n[Paste improvement actions from the last retrospective and their current status — Done, In Progress, Not Started]\n---\n\nAfter receiving my context, summarize it back to me in a structured table and confirm:\n- Sprint number, duration, and dates understood\n- Sprint Goal captured accurately\n- Number of committed stories and total committed story points tallied\n- Delivery status breakdown: Done / In Progress / Not Started / Blocked counts\n- Team composition and any availability notes captured\n- Stakeholders attending the review identified\n- Team feedback themes identified\n- Previous improvement action status reviewed\n- Any missing or ambiguous information flagged for clarification',
      expectedOutput:
        'Acknowledgement of all session rules, structured summary table of the pasted sprint context including sprint metadata, sprint goal, committed vs delivered story counts and points, team composition, stakeholder list, team feedback themes, and previous improvement action status. Any missing or ambiguous information flagged with specific questions.',
      artifacts: [
        {
          name: 'Session Context Summary',
          description:
            'Structured recap of sprint metadata, sprint goal, committed vs delivered items, team composition, stakeholders, feedback themes, and previous improvement action status as understood by the AI facilitator.',
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
              'The AI explicitly confirmed it will follow Scrum Guide 2020 terminology, table-based artifacts, assumption flagging, and empiricism principles.',
          },
          {
            label: 'Sprint goal and metadata accurately captured',
            description:
              'Sprint number, duration, dates, and the exact Sprint Goal are correctly reflected in the summary.',
          },
          {
            label: 'Committed vs delivered breakdown is correct',
            description:
              'The count of committed stories, total story points, and status breakdown (Done / In Progress / Not Started / Blocked) match the input data.',
          },
          {
            label: 'Team and stakeholder information captured',
            description:
              'All team members with roles and all attending stakeholders are listed correctly.',
          },
          {
            label: 'Previous improvement actions reviewed',
            description:
              'Improvement actions from the last retrospective are listed with their current completion status.',
          },
        ],
        failAction:
          'Correct any misunderstood sprint context, provide missing information (especially sprint goal and story statuses), and re-run Step 0 until the summary is accurate.',
      },
    },

    // ── Step 1: Sprint Review — Demo Preparation & Increment Assessment ──
    {
      id: 1,
      title: 'Sprint Review — Demo Preparation & Increment Assessment',
      purpose:
        'Evaluate the Sprint Increment against the Sprint Goal and committed Sprint Backlog, prepare a structured demo plan for stakeholders, and produce a comprehensive delivery matrix and velocity report for transparent inspection.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s conduct the Sprint Review — Increment Assessment.\n\nUsing the sprint context from Step 0, evaluate what was delivered versus what was committed. The Sprint Review is about inspecting the Increment and adapting the Product Backlog based on what was learned. Per the Scrum Guide 2020, the purpose is to inspect the outcome of the Sprint and determine future adaptations.\n\nProduce the following artifacts:\n\n**Artifact 1A: Sprint Delivery Matrix**\n\nEvaluate every committed Product Backlog Item:\n\n| Story ID | Story Title | Story Points | Status (Done/Partial/Not Started/Blocked) | Demo-Ready (Yes/No) | Acceptance Criteria Met (Full/Partial/None) | Definition of Done Met (Yes/No) | Carry-Over to Next Sprint (Yes/No) | Notes / Reason for Incompletion |\n|----------|-------------|-------------|------------------------------------------|---------------------|-------------------------------------------|--------------------------------|------------------------------------|---------------------------------|\n| STORY-001 | | | | | | | | |\n| STORY-002 | | | | | | | | |\n| ... | | | | | | | | |\n\nSTATUS DEFINITIONS:\n- **Done**: Meets all acceptance criteria AND the Definition of Done — this is a releasable Increment.\n- **Partial**: Some acceptance criteria met but the story is not fully complete — NOT part of the Increment.\n- **Not Started**: No development work was performed on this story during the sprint.\n- **Blocked**: Work was attempted but an impediment prevented progress.\n\nIMPORTANT: Per the Scrum Guide, only "Done" items are part of the Increment. Partial items are NOT presentable at the Sprint Review as completed work. Flag any partially completed items that the team may be tempted to demo as "almost done" — this violates transparency.\n\n**Artifact 1B: Sprint Velocity Report**\n\n| Metric | Value |\n|--------|-------|\n| Sprint Number | |\n| Sprint Duration (days) | |\n| Committed Story Points | |\n| Delivered Story Points (Done only) | |\n| Delivery Rate (%) | [Delivered / Committed x 100] |\n| Carry-Over Story Points | |\n| Velocity (this sprint) | [Delivered SP] |\n| Average Velocity (last 3 sprints) | [If previous data available, otherwise flag as [ASSUMPTION]] |\n| Velocity Trend | [Increasing / Stable / Decreasing / Insufficient Data] |\n| Sprint Goal Achieved (Yes/Partial/No) | |\n| Sprint Goal Achievement Rationale | [Explain why the goal was or was not achieved] |\n\n**Artifact 1C: Demo Plan**\n\nStructure the Sprint Review demo for stakeholders:\n\n| Demo Order | Story ID | Feature / Capability to Demo | Presenter | Duration (min) | Stakeholder Interest | Demo Script / Key Points |\n|------------|----------|------------------------------|-----------|---------------|---------------------|--------------------------|\n| 1 | | | | | | |\n| 2 | | | | | | |\n| ... | | | | | | |\n\nDEMO RULES:\n- Only Demo-Ready items (Done, meeting Definition of Done) should be demonstrated.\n- Order demos by stakeholder interest — highest-interest items first.\n- Keep total demo time under 60% of the Sprint Review timebox.\n- Include a brief "what we did NOT complete and why" section at the end (transparency).\n- If no items are Demo-Ready, the review should focus on what was learned and what impediments were encountered.\n\nFLAGGING RULES:\n- Flag any story where Acceptance Criteria is "Partial" — this needs discussion about what\'s missing.\n- Flag if Delivery Rate is below 70% — this indicates a planning or capacity problem.\n- Flag if Sprint Goal is not achieved — this is the most important metric in Scrum.\n- Flag any story that has been carried over for 2+ consecutive sprints — this may indicate the story is too large or has hidden dependencies.\n- Flag any discrepancy between Definition of Done and Acceptance Criteria Met.',
      expectedOutput:
        'Artifact 1A: A Sprint Delivery Matrix evaluating every committed story against acceptance criteria and Definition of Done with clear status classifications. Artifact 1B: A Sprint Velocity Report with committed vs delivered points, delivery rate, velocity trend, and Sprint Goal achievement assessment. Artifact 1C: A Demo Plan ordering features by stakeholder interest with presenter assignments and key talking points.',
      artifacts: [
        {
          name: 'Sprint Delivery Matrix',
          description:
            'Comprehensive evaluation of every committed Product Backlog Item with status, demo-readiness, acceptance criteria assessment, and carry-over decisions.',
          format: 'table',
          columns: [
            'Story ID',
            'Story Title',
            'Story Points',
            'Status',
            'Demo-Ready',
            'Acceptance Criteria Met',
            'Notes',
          ],
        },
        {
          name: 'Sprint Velocity Report',
          description:
            'Quantitative sprint performance metrics including committed vs delivered points, delivery rate, velocity trend, and Sprint Goal achievement rationale.',
          format: 'table',
          columns: ['Metric', 'Value'],
        },
        {
          name: 'Demo Plan',
          description:
            'Ordered demo sequence for the Sprint Review with presenter assignments, stakeholder interest mapping, and key talking points per feature.',
          format: 'table',
          columns: [
            'Demo Order',
            'Story ID',
            'Feature / Capability',
            'Presenter',
            'Duration (min)',
            'Stakeholder Interest',
          ],
        },
      ],
      checkpoint: {
        title: 'Sprint Review Assessment Verification',
        items: [
          {
            label: 'All committed stories are accounted for',
            description:
              'Every story from the Sprint Backlog appears in the Delivery Matrix with a clear status — no items are missing.',
          },
          {
            label: 'Only Done items are marked as Demo-Ready',
            description:
              'No partially completed items are flagged as Demo-Ready. Only stories meeting the full Definition of Done are included in the demo plan.',
          },
          {
            label: 'Velocity calculation is accurate',
            description:
              'Delivered Story Points include only Done items. Delivery Rate percentage is calculated correctly. Velocity trend assessment is reasonable.',
          },
          {
            label: 'Sprint Goal achievement is assessed honestly',
            description:
              'The Sprint Goal assessment reflects reality — if key stories are incomplete, the goal should not be marked as fully achieved.',
          },
          {
            label: 'Carry-over items are identified with reasons',
            description:
              'All incomplete stories have clear reasons for non-completion and are flagged for carry-over to the next sprint.',
          },
        ],
        failAction:
          'Correct any missing stories in the Delivery Matrix, ensure only Done items are in the demo plan, recalculate velocity if needed, and provide honest Sprint Goal achievement rationale.',
      },
    },

    // ── Step 2: Stakeholder Feedback Capture ─────────────────────────────
    {
      id: 2,
      title: 'Stakeholder Feedback Capture',
      purpose:
        'Structure and capture stakeholder feedback on the Sprint Increment during or after the Sprint Review demo, categorize feedback by type and priority, and determine the impact on the Product Backlog to enable the Product Owner to make informed adaptation decisions.',
      estimatedTime: '10 min',
      prompt:
        'Now let\'s capture stakeholder feedback from the Sprint Review.\n\nPer the Scrum Guide 2020, during the Sprint Review the Scrum Team presents the results of their work to key stakeholders and progress toward the Product Goal is discussed. The Sprint Review is a working session — not just a presentation. Attendees collaborate on what to do next, and the Product Backlog may be adjusted to meet new opportunities.\n\nUsing the Demo Plan from Artifact 1C and the stakeholder list from Step 0, structure the feedback capture process.\n\nFEEDBACK CATEGORIES:\n- **Positive**: Stakeholder is satisfied, the feature meets or exceeds expectations\n- **Enhancement**: Feature works but stakeholder wants additional capabilities or improvements\n- **Issue**: Something is not working as expected or does not meet the stakeholder\'s understanding of the requirement\n- **New Request**: Stakeholder identifies a new need not previously in the Product Backlog\n- **Question**: Stakeholder needs clarification about the feature, its usage, or its roadmap\n- **Concern**: Stakeholder expresses worry about direction, timeline, quality, or scope\n\nProduce the following artifact:\n\n**Artifact 2A: Stakeholder Feedback Register**\n\n| FB ID | Stakeholder | Related Story ID | Feedback Item | Category (Positive/Enhancement/Issue/New Request/Question/Concern) | Priority (High/Medium/Low) | Backlog Impact (New Item/Update Existing/No Change/Needs Analysis) | Action Required | Owner | Target Sprint |\n|-------|-----------|-----------------|---------------|------------------------------------------------------------------|---------------------------|------------------------------------------------------------------|-----------------|-------|---------------|\n| FB-001 | | | | | | | | | |\n| FB-002 | | | | | | | | | |\n| ... | | | | | | | | | |\n\nFEEDBACK PROCESSING RULES:\n1. Every piece of feedback must be captured — do not filter or dismiss any stakeholder input during capture.\n2. Categorize each item objectively — if a stakeholder frames an issue as a "suggestion," assess whether it is actually an Issue or an Enhancement.\n3. Backlog Impact assessment must be specific:\n   - **New Item**: This feedback requires a new Product Backlog Item to be created.\n   - **Update Existing**: This feedback modifies an existing PBI (reference the PBI ID).\n   - **No Change**: Positive feedback or questions that do not require backlog changes.\n   - **Needs Analysis**: The impact is unclear and requires further investigation before a backlog decision.\n4. For High-priority Issues, assign an owner and a target sprint immediately.\n5. For New Requests, provide a preliminary size estimate (S/M/L) if enough information is available, otherwise flag as [ASSUMPTION: needs refinement].\n\n**Artifact 2B: Feedback Summary Dashboard**\n\n| Metric | Value |\n|--------|-------|\n| Total Feedback Items | |\n| Positive Feedback Count | |\n| Enhancements Requested | |\n| Issues Identified | |\n| New Requests | |\n| Questions / Clarifications | |\n| Concerns Raised | |\n| Items Requiring Backlog Changes | |\n| Items Requiring Immediate Action | |\n| Stakeholder Satisfaction Signal | [Positive / Mixed / Negative — based on feedback distribution] |\n\n**Artifact 2C: Product Backlog Adaptation Recommendations**\n\nBased on stakeholder feedback, recommend specific Product Backlog changes for the Product Owner:\n\n| Recommendation ID | Source (FB ID) | Recommendation | Type (Add/Modify/Reprioritize/Remove) | Suggested Priority | Rationale | Estimated Effort (S/M/L) |\n|-------------------|---------------|----------------|---------------------------------------|-------------------|-----------|--------------------------|\n| REC-001 | FB-001 | | | | | |\n| REC-002 | FB-003 | | | | | |\n| ... | | | | | | |\n\nFLAGGING RULES:\n- Flag if the total Issue count exceeds 3 — this may indicate a quality or requirements problem.\n- Flag if any stakeholder provided only negative feedback — their engagement strategy may need revisiting.\n- Flag if New Requests would materially change the Product Backlog prioritization — the Product Owner needs to assess Product Goal alignment.\n- Flag if any feedback contradicts another stakeholder\'s feedback — this conflict must be resolved by the Product Owner.\n- Flag if no positive feedback was received — this may indicate stakeholder disengagement or unmet expectations.',
      expectedOutput:
        'Artifact 2A: A Stakeholder Feedback Register with every feedback item categorized, prioritized, and assessed for backlog impact. Artifact 2B: A Feedback Summary Dashboard with counts by category and overall stakeholder satisfaction signal. Artifact 2C: Product Backlog Adaptation Recommendations with specific, actionable changes for the Product Owner.',
      artifacts: [
        {
          name: 'Stakeholder Feedback Register',
          description:
            'Comprehensive capture of all stakeholder feedback from the Sprint Review, categorized by type and priority with backlog impact assessment and action ownership.',
          format: 'table',
          columns: [
            'FB ID',
            'Stakeholder',
            'Related Story ID',
            'Feedback Item',
            'Category',
            'Priority',
            'Backlog Impact',
            'Action Required',
          ],
        },
        {
          name: 'Feedback Summary Dashboard',
          description:
            'Aggregate feedback metrics showing distribution by category, items requiring action, and overall stakeholder satisfaction signal.',
          format: 'table',
          columns: ['Metric', 'Value'],
        },
        {
          name: 'Product Backlog Adaptation Recommendations',
          description:
            'Specific recommendations for the Product Owner to adapt the Product Backlog based on stakeholder feedback, with source traceability and effort estimates.',
          format: 'table',
          columns: [
            'Recommendation ID',
            'Source (FB ID)',
            'Recommendation',
            'Type',
            'Suggested Priority',
            'Estimated Effort',
          ],
        },
      ],
      checkpoint: {
        title: 'Stakeholder Feedback Verification',
        items: [
          {
            label: 'All stakeholder feedback is captured',
            description:
              'Every attending stakeholder has at least one feedback entry — no stakeholder was overlooked or their input dismissed.',
          },
          {
            label: 'Feedback categories are accurate',
            description:
              'Items are categorized objectively — issues are not downplayed as enhancements, and new requests are distinguished from modifications.',
          },
          {
            label: 'Backlog impact is assessed for every item',
            description:
              'Each feedback item has a clear Backlog Impact classification and items needing analysis are flagged.',
          },
          {
            label: 'High-priority issues have owners',
            description:
              'Every High-priority Issue has an assigned owner and target sprint for resolution.',
          },
        ],
        failAction:
          'Capture missing stakeholder feedback, reclassify incorrectly categorized items, assign owners to unowned high-priority issues, and ensure the Product Owner has clear backlog adaptation recommendations.',
      },
    },

    // ── Step 3: Retrospective — What Went Well / Didn't / Actions ────────
    {
      id: 3,
      title: 'Retrospective — What Went Well / What Didn\'t / Actions',
      purpose:
        'Facilitate a structured Sprint Retrospective that identifies what went well, what did not go well, and generates concrete improvement actions with clear ownership — the core adaptation ceremony for the Scrum Team as defined in the Scrum Guide 2020.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s conduct the Sprint Retrospective.\n\nPer the Scrum Guide 2020, the purpose of the Sprint Retrospective is to plan ways to increase quality and effectiveness. The Scrum Team inspects how the last Sprint went with regards to individuals, interactions, processes, tools, and their Definition of Done. The Scrum Team identifies the most helpful changes to improve its effectiveness — the most impactful improvements are addressed as soon as possible, and may even be added to the Sprint Backlog for the next Sprint.\n\nUsing the team feedback from Step 0, the delivery data from Step 1, and the stakeholder feedback from Step 2, facilitate a comprehensive retrospective.\n\nRETROSPECTIVE FRAMEWORK: What Went Well / What Didn\'t Go Well / Ideas for Improvement\n\nCATEGORIES TO EXAMINE:\n- **Process**: Sprint planning accuracy, daily scrum effectiveness, backlog refinement quality, estimation accuracy\n- **Technical**: Code quality, technical debt, CI/CD pipeline, testing practices, architecture decisions\n- **Collaboration**: Team communication, pair/mob programming, knowledge sharing, cross-functional support\n- **Tooling**: Development tools, project management tools, communication platforms, documentation\n- **External**: Stakeholder engagement, dependency management, organizational support, vendor interactions\n- **People**: Workload balance, skill development, morale, recognition, work-life balance\n\nProduce the following artifacts:\n\n**Artifact 3A: Retrospective Board**\n\n| RETRO ID | Category (Went Well / Didn\'t Go Well / Idea) | Theme (Process/Technical/Collaboration/Tooling/External/People) | Item Description | Impact Level (High/Medium/Low) | Root Cause (for Didn\'t Go Well items) | Related Data Point | Suggested Action |\n|----------|----------------------------------------------|---------------------------------------------------------------|-----------------|-------------------------------|--------------------------------------|--------------------|------------------|\n| RETRO-001 | Went Well | | | | — | | Continue doing |\n| RETRO-002 | Went Well | | | | — | | Continue doing |\n| RETRO-003 | Didn\'t Go Well | | | | | | |\n| RETRO-004 | Didn\'t Go Well | | | | | | |\n| RETRO-005 | Idea | | | | — | | |\n| ... | | | | | | | |\n\nRETROSPECTIVE RULES:\n1. **Balance**: Include at minimum 3 "Went Well" items — teams must recognize what is working, not just problems. Positive reinforcement drives sustained good behavior.\n2. **Root Cause**: Every "Didn\'t Go Well" item must have a root cause analysis. Use "5 Whys" thinking — go beyond the symptom to the underlying cause. For example, "Stories were not completed" is a symptom; "Acceptance criteria were ambiguous because refinement sessions were skipped" is a root cause.\n3. **Data-Driven**: Link retrospective items to data from Steps 1-2 where possible. For example, if velocity dropped, connect it to specific blockers or process issues.\n4. **Actionable**: Every "Didn\'t Go Well" and "Idea" item must have a suggested action — vague items like "communicate better" are not acceptable.\n5. **Previous Actions Review**: Reference the status of previous retrospective actions from Step 0. If actions were not completed, the retrospective must address why and whether they should be carried forward, modified, or dropped.\n\n**Artifact 3B: Improvement Action Register**\n\nConvert the most impactful items into specific, measurable improvement actions:\n\n| Action ID | Description | Source (RETRO ID) | Owner | Type (Process Change / Technical / Experiment / Training / Tooling) | Target Sprint | Success Metric | Definition of Done for This Action | Priority (Must Do / Should Do / Nice to Have) |\n|-----------|-------------|-------------------|-------|-------------------------------------------------------------------|---------------|----------------|-----------------------------------|----------------------------------------------|\n| ACTION-001 | | | | | | | | Must Do |\n| ACTION-002 | | | | | | | | Must Do |\n| ACTION-003 | | | | | | | | Should Do |\n| ... | | | | | | | | |\n\nACTION RULES:\n1. **Limit WIP**: Select no more than 3 "Must Do" actions — the team cannot improve everything at once. Focus on the highest-impact changes.\n2. **SMART Actions**: Every action must be Specific (what exactly will change), Measurable (how will we know it worked), Achievable (within the team\'s control), Relevant (addresses a real problem), Time-bound (target sprint).\n3. **Owned**: Every action must have a single named owner — not "the team" but a specific person who is accountable for driving the action to completion.\n4. **Success Metric**: Define how you will measure whether the improvement worked. For example, "Reduce carry-over stories from 3 to 0 by improving refinement" — the metric is carry-over count.\n5. **Carry Forward**: If any previous sprint\'s improvement actions were not completed, they must be explicitly addressed — carry forward with a new target, modify the approach, or consciously drop them with a documented reason.\n6. **Sprint Backlog Candidate**: Per the Scrum Guide 2020, the most impactful improvement may be added to the next Sprint Backlog. Flag which action(s) should be added as a Sprint Backlog Item.\n\nFLAGGING RULES:\n- Flag if fewer than 3 "Went Well" items — the team may be focusing too much on negatives.\n- Flag if more than 5 "Didn\'t Go Well" items — prioritize and address root causes, not symptoms.\n- Flag if any action lacks a measurable success metric — "improve" is not a metric.\n- Flag if previous improvement actions have been carried forward for 3+ sprints without completion — this is an anti-pattern indicating the actions are not truly prioritized.\n- Flag if all actions are assigned to the same person — improvement is a team responsibility.',
      expectedOutput:
        'Artifact 3A: A Retrospective Board with balanced coverage across Went Well, Didn\'t Go Well, and Ideas categories, with root cause analysis for negative items and data linkage to sprint metrics. Artifact 3B: An Improvement Action Register with no more than 3 Must Do actions, each with a specific owner, success metric, and target sprint. Previous improvement actions addressed.',
      artifacts: [
        {
          name: 'Retrospective Board',
          description:
            'Structured retrospective with Went Well, Didn\'t Go Well, and Ideas categories, including root cause analysis, impact assessment, and linkage to sprint delivery data.',
          format: 'table',
          columns: [
            'RETRO ID',
            'Category',
            'Theme',
            'Item Description',
            'Impact Level',
            'Root Cause',
            'Action Item',
          ],
        },
        {
          name: 'Improvement Action Register',
          description:
            'Prioritized improvement actions derived from the retrospective with SMART criteria, single ownership, success metrics, and target sprint for completion.',
          format: 'table',
          columns: [
            'Action ID',
            'Description',
            'Owner',
            'Target Sprint',
            'Success Metric',
            'Priority',
          ],
        },
      ],
      checkpoint: {
        title: 'Retrospective Verification',
        items: [
          {
            label: 'Retrospective board is balanced',
            description:
              'At least 3 Went Well items are included alongside Didn\'t Go Well and Ideas. The team recognizes successes, not just problems.',
          },
          {
            label: 'Root causes are identified for negative items',
            description:
              'Every Didn\'t Go Well item has a root cause that goes beyond the surface symptom — "5 Whys" thinking was applied.',
          },
          {
            label: 'Improvement actions are SMART',
            description:
              'Each action is Specific, Measurable, Achievable, Relevant, and Time-bound with a clear success metric and target sprint.',
          },
          {
            label: 'No more than 3 Must Do actions selected',
            description:
              'The team has focused on the highest-impact improvements rather than creating an unmanageable list of changes.',
          },
          {
            label: 'Previous improvement actions are addressed',
            description:
              'Actions from the previous retrospective are reviewed — completed, carried forward with new targets, or consciously dropped with documented reasoning.',
          },
        ],
        failAction:
          'Add missing Went Well items to balance the board, perform deeper root cause analysis on surface-level items, convert vague actions to SMART format, reduce Must Do actions to 3 or fewer, and address all unresolved previous improvement actions.',
      },
    },

    // ── Step 4: Sprint Report Assembly ───────────────────────────────────
    {
      id: 4,
      title: 'Sprint Report Assembly',
      purpose:
        'Consolidate all artifacts from the Sprint Review and Retrospective into a single, comprehensive Sprint Report that serves as the official record of the sprint, provides transparency to all stakeholders, and creates a baseline for continuous improvement tracking.',
      estimatedTime: '10 min',
      prompt:
        'Let\'s assemble the Consolidated Sprint Report.\n\nConsolidate all artifacts from Steps 0-3 into a single, stakeholder-ready Sprint Report. This report serves as the official record of the sprint and should be distributable to team members, the Product Owner, stakeholders, and management without additional context.\n\n**Artifact 4A: Consolidated Sprint Report**\n\nAssemble the report with the following sections:\n\n**SECTION 1: Sprint Overview**\n\n| Field | Value |\n|-------|-------|\n| Sprint Number | |\n| Sprint Duration | |\n| Sprint Dates | [Start — End] |\n| Sprint Goal | |\n| Sprint Goal Achieved | [Yes / Partial / No] |\n| Sprint Goal Achievement Summary | [1-2 sentences explaining the outcome] |\n\n**SECTION 2: Delivery Summary**\n\n| Metric | Value | Trend vs Previous Sprint |\n|--------|-------|--------------------------|\n| Stories Committed | | |\n| Stories Delivered (Done) | | |\n| Stories Carried Over | | |\n| Story Points Committed | | |\n| Story Points Delivered | | |\n| Delivery Rate (%) | | |\n| Sprint Velocity | | |\n| Average Velocity (3-sprint) | | |\n| Velocity Trend | [Increasing / Stable / Decreasing] |\n\nInclude the Sprint Delivery Matrix from Artifact 1A as a sub-section.\n\n**SECTION 3: Sprint Goal Analysis**\n\nProvide a narrative assessment of Sprint Goal achievement:\n- What was the Sprint Goal and why was it selected?\n- To what extent was the goal achieved?\n- What factors contributed to or detracted from goal achievement?\n- What is the impact of the outcome on the Product Goal?\n\n**SECTION 4: Stakeholder Feedback Summary**\n\nSummarize stakeholder feedback from Artifact 2A:\n\n| Category | Count | Key Themes |\n|----------|-------|------------|\n| Positive | | |\n| Enhancement | | |\n| Issue | | |\n| New Request | | |\n| Question | | |\n| Concern | | |\n| **Total** | | |\n\nInclude the Product Backlog Adaptation Recommendations from Artifact 2C.\n\n**SECTION 5: Key Metrics & Health Indicators**\n\n| Health Indicator | Status (Green/Yellow/Red) | Detail |\n|-----------------|--------------------------|--------|\n| Sprint Goal Achievement | | |\n| Velocity Trend | | |\n| Carry-Over Rate | | [Green: 0-1 items, Yellow: 2-3 items, Red: 4+ items] |\n| Stakeholder Satisfaction | | [Based on feedback distribution] |\n| Team Morale | | [Based on retrospective feedback] |\n| Impediment Resolution | | [Were blockers resolved promptly?] |\n| Definition of Done Compliance | | [Did all Done items truly meet DoD?] |\n| Previous Improvement Actions | | [Were previous retro actions completed?] |\n\nColor coding rules:\n- **Green**: On track, healthy, no action needed\n- **Yellow**: Caution, minor issues, monitoring needed\n- **Red**: At risk, significant issues, immediate action required\n\n**SECTION 6: Retrospective Summary**\n\nTop 3 "Went Well" items (what to continue doing):\n\n| # | Item | Why It Matters |\n|---|------|----------------|\n| 1 | | |\n| 2 | | |\n| 3 | | |\n\nTop 3 "Didn\'t Go Well" items (what to change):\n\n| # | Item | Root Cause | Improvement Action |\n|---|------|------------|--------------------|\n| 1 | | | |\n| 2 | | | |\n| 3 | | | |\n\n**SECTION 7: Improvement Commitments**\n\nFrom Artifact 3B, list the committed improvement actions:\n\n| Action ID | Description | Owner | Target Sprint | Success Metric | Added to Sprint Backlog? |\n|-----------|-------------|-------|---------------|----------------|--------------------------|\n| ACTION-001 | | | | | |\n| ACTION-002 | | | | | |\n| ACTION-003 | | | | | |\n\n**SECTION 8: Product Backlog Adjustments**\n\nSummarize all changes to the Product Backlog resulting from this sprint:\n\n| Adjustment ID | Type (Add/Modify/Reprioritize/Remove) | Description | Source (Stakeholder Feedback / Carry-Over / Retro Action) | Priority | Target Sprint |\n|---------------|---------------------------------------|-------------|----------------------------------------------------------|----------|---------------|\n| ADJ-001 | | | | | |\n| ... | | | | | |\n\n**SECTION 9: Risks & Impediments**\n\nList any ongoing risks or unresolved impediments:\n\n| ID | Description | Type (Risk/Impediment) | Impact | Mitigation / Resolution Plan | Owner | Status |\n|----|-------------|----------------------|--------|------------------------------|-------|--------|\n| | | | | | | |\n\n**SECTION 10: Next Sprint Outlook**\n\n| Element | Detail |\n|---------|--------|\n| Recommended Velocity for Next Sprint | [Based on 3-sprint average and team availability] |\n| Carry-Over Items | [List story IDs being carried forward] |\n| Known Capacity Constraints | [Holidays, absences, training days] |\n| Key Dependencies | [External dependencies that may affect next sprint] |\n| Improvement Actions in Sprint Backlog | [Which retro actions will be Sprint Backlog Items] |\n| Preliminary Sprint Goal Suggestion | [Based on Product Backlog priority and stakeholder feedback] |\n\nCONSOLIDATION RULES:\n- The report must be internally consistent — numbers in Section 2 must match Artifact 1B, feedback counts must match Artifact 2B, actions must match Artifact 3B.\n- All [ASSUMPTION] flags from previous steps must be resolved or explicitly carried forward with a note.\n- The report should stand alone — a reader who was not in the ceremonies should understand what happened this sprint.\n- End with a one-paragraph Executive Summary (3-4 sentences) suitable for leadership communication: what was the sprint goal, was it achieved, what are the key takeaways, and what is the team committing to improve.',
      expectedOutput:
        'A comprehensive Consolidated Sprint Report with 10 sections covering sprint overview, delivery metrics, goal analysis, stakeholder feedback, health indicators, retrospective highlights, improvement commitments, backlog adjustments, risks, and next sprint outlook. The report is internally consistent, self-contained, and ends with an executive summary. Ready for distribution to all stakeholders.',
      artifacts: [
        {
          name: 'Consolidated Sprint Report',
          description:
            'Complete sprint report with 10 sections — delivery metrics, velocity trends, sprint goal analysis, stakeholder feedback summary, health indicators, retrospective highlights, improvement commitments, backlog adjustments, risks, and next sprint outlook. Self-contained and stakeholder-ready.',
          format: 'text',
        },
        {
          name: 'Sprint Health Dashboard',
          description:
            'Traffic-light health indicators for key sprint metrics including goal achievement, velocity, carry-over rate, stakeholder satisfaction, team morale, and Definition of Done compliance.',
          format: 'table',
          columns: [
            'Health Indicator',
            'Status (Green/Yellow/Red)',
            'Detail',
          ],
        },
        {
          name: 'Next Sprint Outlook',
          description:
            'Forward-looking recommendations for the next sprint including recommended velocity, carry-over items, capacity constraints, dependencies, and a preliminary Sprint Goal suggestion.',
          format: 'table',
          columns: ['Element', 'Detail'],
        },
      ],
      checkpoint: {
        title: 'Sprint Report Verification',
        items: [
          {
            label: 'All 10 report sections are present and complete',
            description:
              'The consolidated report includes all sections from Sprint Overview through Next Sprint Outlook with no blank or placeholder sections.',
          },
          {
            label: 'Numbers are internally consistent',
            description:
              'Story point counts, delivery rates, feedback counts, and action items match across all sections and align with the source artifacts from Steps 1-3.',
          },
          {
            label: 'Health indicators are accurately assessed',
            description:
              'Green/Yellow/Red classifications are justified by the underlying data — no overly optimistic or pessimistic assessments.',
          },
          {
            label: 'Executive summary is concise and accurate',
            description:
              'The executive summary in 3-4 sentences captures sprint goal achievement, key metrics, and improvement commitments without distortion.',
          },
          {
            label: 'All assumptions are resolved',
            description:
              'No unresolved [ASSUMPTION] tags remain in the final report — all have been confirmed, corrected, or explicitly noted as pending.',
          },
        ],
        failAction:
          'Fill in missing report sections, reconcile inconsistent numbers across artifacts, adjust health indicator assessments to match data, refine the executive summary for accuracy, and resolve or annotate all remaining assumptions.',
      },
    },
  ],
  requiredInputs: [
    {
      name: 'Sprint Information',
      description:
        'Sprint number, sprint duration in weeks, sprint start date, and sprint end date.',
      format: 'Text: Sprint Number, Duration, Start Date, End Date',
    },
    {
      name: 'Sprint Goal',
      description:
        'The Sprint Goal as agreed during Sprint Planning — the single overarching objective the team committed to achieving during this sprint.',
      format: 'Text: Sprint Goal statement',
    },
    {
      name: 'Sprint Backlog — Committed Stories',
      description:
        'The list of user stories or Product Backlog Items committed to this sprint, including Story ID, title, story points, and a brief summary of acceptance criteria.',
      format: 'Table or list: Story ID | Title | Story Points | Acceptance Criteria Summary',
    },
    {
      name: 'Sprint Backlog — Actual Delivery Status',
      description:
        'The actual completion status of each committed story: Done, In Progress, Not Started, or Blocked — including the reason for any incomplete items.',
      format: 'Table or list: Story ID | Status | Reason for Incompletion (if applicable)',
    },
    {
      name: 'Team Composition',
      description:
        'Team members with their roles (Developer, Scrum Master, Product Owner) and any availability notes such as absences, partial availability, or new joiners during the sprint.',
      format: 'Table or list: Name | Role | Availability Notes',
    },
    {
      name: 'Stakeholder List',
      description:
        'Stakeholders attending or providing input to the Sprint Review, including name, role, department, and their primary area of interest in the sprint increment.',
      format: 'Table or list: Name | Role | Department | Area of Interest',
    },
    {
      name: 'Team Feedback / Observations',
      description:
        'Notes, feedback, or observations from team members about the sprint — what felt good, what felt difficult, blockers encountered, process friction points, and general morale.',
      format: 'Free-form text or list of observations from team members',
    },
    {
      name: 'Previous Sprint Improvement Actions',
      description:
        'Improvement actions committed to in the previous sprint retrospective and their current completion status: Done, In Progress, or Not Started.',
      format: 'Table or list: Action ID | Description | Owner | Status',
    },
  ],
  artifactsProduced: [
    'Session Context Summary',
    'Sprint Delivery Matrix',
    'Sprint Velocity Report',
    'Demo Plan',
    'Stakeholder Feedback Register',
    'Feedback Summary Dashboard',
    'Product Backlog Adaptation Recommendations',
    'Retrospective Board',
    'Improvement Action Register',
    'Consolidated Sprint Report',
    'Sprint Health Dashboard',
    'Next Sprint Outlook',
  ],
  tier: 'premium',
  price: 29700,
  suiteId: 'agile-suite',
};
