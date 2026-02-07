import type { Blueprint } from '@/lib/types';

export const pmbokRiskProcurement: Blueprint = {
  id: 'pmbok-risk-procurement',
  slug: 'pmbok-risk-procurement',
  title: 'PMBOK Risk & Procurement Manager',
  subtitle:
    'AI-guided quantitative risk analysis and procurement management aligned with PMBOK 7th Edition — from Monte Carlo simulation inputs through risk response planning, make-or-buy analysis, and vendor evaluation with contract strategy.',
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
        'Establish the AI session as a PMP-certified Risk and Procurement Manager, load the project context including the qualitative risk register from the initiation phase, and identify procurement needs that will be addressed in subsequent steps.',
      estimatedTime: '5 min',
      prompt:
        'You are a PMP-certified Risk and Procurement Manager facilitating a Quantitative Risk Analysis & Procurement Planning session aligned with PMBOK 7th Edition principles, focusing on the Uncertainty performance domain and procurement management practices. Your role is to guide me through a structured, step-by-step process that produces production-ready risk and procurement artifacts.\n\nSESSION RULES — follow these throughout the entire session:\n1. Use PMBOK terminology and artifact formats exclusively.\n2. Produce tables, not narratives — every artifact must be in structured table format unless explicitly stated otherwise.\n3. Flag every assumption you make with [ASSUMPTION] so I can confirm or correct it.\n4. Use correct PMBOK terms: Expected Monetary Value (not expected value), Contingency Reserve (not buffer), Statement of Work (not scope of work for procurement), Make-or-Buy (not build-or-buy).\n5. Ask clarifying questions before proceeding if critical information is missing.\n6. Number all artifacts for easy cross-referencing (e.g., RISK-Q001, PROC-001, VEN-001).\n7. Apply PMBOK 7th Edition performance domains with emphasis on: Uncertainty, Planning, and Delivery.\n8. All financial figures should use consistent currency formatting.\n9. Risk scoring: use the 1-5 probability and impact scales established during qualitative analysis.\n\nTo begin, I need you to acknowledge these rules and confirm you are ready. Then I will paste the following context:\n\nCONTEXT TO PASTE BELOW:\n---\n**Project Name & Overview**\n[Paste your project name, description, and current phase]\n\n**Qualitative Risk Register (from Initiation)**\n[Paste your existing risk register — Risk IDs, descriptions, categories, probability scores, impact scores, risk scores, and current response strategies]\n\n**Project Budget & Schedule Summary**\n[Paste BAC, current EAC if available, total project duration, critical path summary, contingency reserve amount, management reserve amount]\n\n**Procurement Needs**\n[Paste any known procurement requirements — goods, services, or expertise that may need to be sourced externally. Include current vendor relationships if any.]\n\n**Organizational Procurement Policies**\n[Paste any organizational procurement policies, preferred vendor lists, approval thresholds, or regulatory requirements that govern procurement decisions]\n\n**Risk Tolerance & Thresholds**\n[Paste the organization\'s risk appetite — maximum acceptable schedule delay, maximum acceptable cost overrun, risk categories that require mandatory escalation]\n---\n\nAfter receiving my context, summarize it back to me in a structured format and confirm:\n- Project context and current phase are understood\n- Qualitative risk register is loaded with risk count and priority distribution\n- Budget, schedule, and reserve information is captured\n- Procurement needs are catalogued\n- Organizational policies and risk thresholds are documented\n- Any missing information for quantitative analysis is identified',
      expectedOutput:
        'Acknowledgement of session rules, structured summary of project context, qualitative risk register summary (count, priority distribution), budget and schedule baselines, procurement needs inventory, organizational policies, and identification of any missing information needed for quantitative analysis.',
      artifacts: [
        {
          name: 'Risk & Procurement Context Summary',
          description:
            'Structured recap of project context, existing risk register, budget and schedule baselines, procurement needs, and organizational policies.',
          format: 'table',
          columns: [
            'Parameter',
            'Value Provided',
            'Relevance to Session',
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
            label: 'Qualitative risk register is loaded',
            description:
              'The existing risk register is captured with risk count, priority distribution (High/Medium/Low), and current response strategies.',
          },
          {
            label: 'Budget and reserves are documented',
            description:
              'BAC, contingency reserve, management reserve, and current EAC (if available) are captured for quantitative analysis.',
          },
          {
            label: 'Procurement needs are identified',
            description:
              'Known procurement requirements are catalogued with sufficient detail to support make-or-buy analysis.',
          },
          {
            label: 'Risk thresholds are established',
            description:
              'Organizational risk appetite and escalation thresholds are documented for use in risk response planning.',
          },
        ],
        failAction:
          'Provide missing risk register data, clarify budget and reserve figures, detail procurement needs, and establish risk thresholds before proceeding to quantitative analysis.',
      },
    },

    // ── Step 1: Quantitative Risk Analysis ─────────────────────────────
    {
      id: 1,
      title: 'Quantitative Risk Analysis',
      purpose:
        'Perform quantitative risk analysis on the highest-priority risks using Expected Monetary Value analysis, decision tree structures, and Monte Carlo simulation inputs to produce a risk-adjusted schedule and budget.',
      estimatedTime: '20 min',
      prompt:
        'Now let\'s perform Quantitative Risk Analysis.\n\nUsing the qualitative risk register from Step 0, select all HIGH-priority risks and any MEDIUM risks with scores >= 12 for quantitative analysis. Quantitative analysis assigns numerical values to risk probability and impact, enabling objective comparison and reserve calculation.\n\nQUANTITATIVE ANALYSIS RULES:\n1. Only risks with sufficient data for numerical analysis should be included — flag risks with [INSUFFICIENT DATA] if probability or impact cannot be reasonably estimated in monetary/schedule terms.\n2. Use three-point estimates for impact: Optimistic (best case), Most Likely, Pessimistic (worst case).\n3. Expected Monetary Value = Probability x Impact (using most likely impact for single-point EMV).\n4. PERT estimate for impact: (Optimistic + 4 x Most Likely + Pessimistic) / 6.\n5. Apply consistent probability percentages (not 1-5 scales) for quantitative work.\n\nProduce the following artifacts:\n\n**Artifact 1A: Monte Carlo Simulation Inputs**\n\nProvide the structured inputs that would be fed into a Monte Carlo simulation tool (e.g., @Risk, Crystal Ball, or Primavera Risk Analysis):\n\n| Risk ID | Description | Distribution Type | Optimistic Impact ($) | Most Likely Impact ($) | Pessimistic Impact ($) | PERT Expected ($) | Probability (%) | Affects (Schedule/Cost/Both) | Correlated With |\n|---------|-------------|------------------|----------------------|----------------------|----------------------|-------------------|----------------|------------------------------|------------------|\n| RISK-Q001 | | Triangular/PERT/Uniform | $ | $ | $ | $ | % | | [Other Risk IDs or "None"] |\n| RISK-Q002 | | | $ | $ | $ | $ | % | | |\n| ... | | | | | | | | | |\n\n**Artifact 1B: Expected Monetary Value (EMV) Analysis**\n\n| Risk ID | Description | Probability (%) | Impact — Optimistic ($) | Impact — Most Likely ($) | Impact — Pessimistic ($) | PERT Impact ($) | EMV ($) = Prob x PERT | Risk Type (Threat/Opportunity) |\n|---------|-------------|-----------------|------------------------|--------------------------|--------------------------|-----------------|----------------------|-------------------------------|\n| RISK-Q001 | | | | | | | | Threat |\n| RISK-Q002 | | | | | | | | Threat |\n| RISK-Q003 | | | | | | | | Opportunity |\n| ... | | | | | | | | |\n| **TOTAL EMV (Threats)** | | | | | | | **$** | |\n| **TOTAL EMV (Opportunities)** | | | | | | | **$** | |\n| **NET EMV** | | | | | | | **$** | |\n\n**Artifact 1C: Decision Tree Structure**\n\nFor the top 3 risks by EMV, provide decision tree analysis showing alternative response options:\n\n| Risk ID | Decision Node | Option | Probability (%) | Outcome ($) | Expected Value ($) | Recommended? |\n|---------|--------------|--------|-----------------|-------------|--------------------|--------------|\n| RISK-Q001 | Accept vs Mitigate | Accept risk | [%] | -$[impact] | -$[EV] | |\n| RISK-Q001 | Accept vs Mitigate | Mitigate (cost: $X) | [%] reduced | -$[reduced impact] - $[mitigation cost] | -$[EV] | YES/NO |\n| RISK-Q001 | Accept vs Mitigate | Transfer (cost: $X) | [%] transferred | -$[transfer cost] | -$[EV] | YES/NO |\n| RISK-Q002 | ... | | | | | |\n| ... | | | | | | |\n\n**Artifact 1D: Risk-Adjusted Schedule & Budget**\n\n| Element | Baseline Value | Risk Adjustment (EMV) | Risk-Adjusted Value | Contingency Reserve Recommended | Total with Reserve |\n|---------|---------------|----------------------|--------------------|---------------------------------|--------------------|\n| Project Budget (BAC) | $ | +$ (Net EMV Threats) | $ | $ (additional reserve if needed) | $ |\n| Project Duration | [days] | +[days] (schedule risk EMV) | [days] | +[days] (schedule buffer) | [days] |\n| Critical Path | [days] | +[days] | [days] | | [days] |\n\n**Reserve Analysis:**\n\n| Reserve Type | Current Amount | Recommended Amount | Gap | Action Required |\n|-------------|---------------|-------------------|-----|----------------|\n| Contingency Reserve (known risks) | $ | $ (Total EMV Threats) | $ | |\n| Management Reserve (unknown risks) | $ | $ (typically 5-10% of BAC) | $ | |\n| Schedule Reserve | [days] | [days] | [days] | |\n\nFLAGGING RULES:\n- Flag if Net EMV exceeds current contingency reserve — reserves are insufficient.\n- Flag if any single risk EMV > 20% of contingency reserve — concentrated risk exposure.\n- Flag risks with high correlation — they may compound if they occur simultaneously.\n- Flag if risk-adjusted project cost exceeds BAC + Management Reserve.\n- Flag opportunities that could offset threats if actively pursued.',
      expectedOutput:
        'Artifact 1A: Monte Carlo simulation inputs with three-point estimates and distribution types. Artifact 1B: Complete EMV analysis with total threat, opportunity, and net EMV values. Artifact 1C: Decision tree analysis for top 3 risks with recommended options. Artifact 1D: Risk-adjusted schedule and budget with reserve analysis and gap identification.',
      artifacts: [
        {
          name: 'Monte Carlo Simulation Inputs',
          description:
            'Structured risk data ready for Monte Carlo simulation with three-point estimates, distribution types, and correlations.',
          format: 'table',
          columns: [
            'Risk ID',
            'Description',
            'Distribution Type',
            'Optimistic ($)',
            'Most Likely ($)',
            'Pessimistic ($)',
            'Probability (%)',
            'Affects',
          ],
        },
        {
          name: 'EMV Analysis',
          description:
            'Expected Monetary Value calculation for each quantified risk with PERT impact estimates and threat/opportunity classification.',
          format: 'table',
          columns: [
            'Risk ID',
            'Description',
            'Probability (%)',
            'PERT Impact ($)',
            'EMV ($)',
            'Risk Type',
          ],
        },
        {
          name: 'Decision Tree Analysis',
          description:
            'Decision tree structure for top risks showing alternative response options with expected values and recommendations.',
          format: 'table',
          columns: [
            'Risk ID',
            'Decision Node',
            'Option',
            'Probability (%)',
            'Expected Value ($)',
            'Recommended?',
          ],
        },
        {
          name: 'Risk-Adjusted Schedule & Budget',
          description:
            'Baseline values adjusted for quantified risks with contingency and management reserve analysis.',
          format: 'table',
          columns: [
            'Element',
            'Baseline Value',
            'Risk Adjustment',
            'Risk-Adjusted Value',
            'Reserve Recommended',
          ],
        },
      ],
      checkpoint: {
        title: 'Quantitative Risk Analysis Verification',
        items: [
          {
            label: 'All high-priority risks are quantified',
            description:
              'Every HIGH-priority risk from the qualitative register has been included in the quantitative analysis with numerical probability and impact values.',
          },
          {
            label: 'Three-point estimates are reasonable',
            description:
              'Optimistic, Most Likely, and Pessimistic values are logical — pessimistic is not unreasonably extreme and optimistic is not zero.',
          },
          {
            label: 'EMV totals are calculated correctly',
            description:
              'Individual EMV values sum correctly to Total Threat EMV, Total Opportunity EMV, and Net EMV.',
          },
          {
            label: 'Decision trees show clear recommendations',
            description:
              'The top 3 risks have decision tree analysis with at least 2 response options each and a clear recommended action.',
          },
          {
            label: 'Reserve gaps are identified',
            description:
              'The analysis clearly shows whether current contingency and management reserves are sufficient or need adjustment.',
          },
        ],
        failAction:
          'Add missing high-priority risks to the quantitative analysis, correct three-point estimates, verify EMV arithmetic, complete decision trees with recommendations, and highlight reserve gaps.',
      },
    },

    // ── Step 2: Risk Response Planning ──────────────────────────────────
    {
      id: 2,
      title: 'Risk Response Planning',
      purpose:
        'Develop detailed response plans for the highest-priority risks, define risk triggers, calculate contingency reserves per risk, and produce a risk response budget — translating quantitative analysis into actionable plans.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s develop detailed Risk Response Plans.\n\nUsing the quantitative analysis from Step 1, develop specific, actionable response plans for all HIGH-priority risks and the top MEDIUM risks. Each response plan must be detailed enough to execute immediately when the risk trigger fires.\n\nRISK RESPONSE STRATEGY RULES (PMBOK):\n- **Threats**: Avoid (eliminate the risk), Transfer (shift to a third party — insurance, contract), Mitigate (reduce probability or impact), Accept (active acceptance with contingency, or passive acceptance).\n- **Opportunities**: Exploit (ensure the opportunity occurs), Share (allocate to a third party best positioned to capture it), Enhance (increase probability or impact), Accept.\n- Every HIGH risk must have a primary AND a fallback strategy.\n- Active acceptance requires a contingency plan; passive acceptance requires no action but must be documented.\n\nProduce the following artifacts:\n\n**Artifact 2A: Detailed Risk Response Plans**\n\nFor each risk requiring a response plan:\n\n| Field | Content |\n|-------|--------|\n| Risk ID | [From register] |\n| Risk Description | [Full description] |\n| Risk Owner | [Named individual] |\n| Primary Strategy | [Avoid/Transfer/Mitigate/Accept or Exploit/Share/Enhance/Accept] |\n| Primary Response Actions | [Step-by-step actions — who does what, when, with what resources] |\n| Fallback Strategy | [Alternative strategy if primary fails] |\n| Fallback Response Actions | [Step-by-step fallback actions] |\n| Trigger Conditions | [Specific, observable conditions that indicate the risk is occurring or about to occur] |\n| Trigger Monitoring Method | [How will the trigger be detected? Who monitors it? How frequently?] |\n| Response Timeline | [How quickly must the response be executed once triggered?] |\n| Resource Requirements | [People, budget, tools needed to execute the response] |\n| Residual Risk After Response | [What risk remains after the response is implemented?] |\n| Secondary Risks | [New risks introduced by the response itself] |\n\nRepeat for each HIGH-priority risk and top MEDIUM risks (minimum 5 response plans).\n\n**Artifact 2B: Risk Trigger Definitions**\n\n| Risk ID | Risk Description | Trigger Type (Leading/Lagging) | Trigger Condition | Monitoring Metric | Threshold | Monitoring Frequency | Monitor Owner | Escalation Path |\n|---------|-----------------|-------------------------------|-------------------|-------------------|-----------|---------------------|---------------|----------------|\n| RISK-001 | | Leading | [Early warning sign] | [Measurable indicator] | [Specific value] | [Daily/Weekly/etc.] | | PM → Sponsor |\n| RISK-002 | | Lagging | [After-the-fact indicator] | | | | | |\n| ... | | | | | | | | |\n\nTRIGGER RULES:\n- Prefer LEADING indicators (early warning signs) over LAGGING indicators (after-the-fact detection).\n- Every trigger must have a specific, measurable threshold — no vague triggers like "if things get worse."\n- High-priority risks should have multiple trigger indicators where possible.\n\n**Artifact 2C: Contingency Reserve Calculation**\n\n| Risk ID | EMV ($) | Primary Response Cost ($) | Fallback Response Cost ($) | Contingency Allocated ($) | Basis of Allocation | Draw-Down Conditions |\n|---------|---------|--------------------------|--------------------------|--------------------------|--------------------|-----------------------|\n| RISK-001 | $ | $ | $ | $ | EMV-based / Response cost-based | [When can this reserve be used?] |\n| RISK-002 | $ | $ | $ | $ | | |\n| ... | | | | | | |\n| **TOTAL** | **$** | **$** | **$** | **$** | | |\n\n**Artifact 2D: Risk Response Budget**\n\n| Category | Amount ($) | Source | Approval Required |\n|----------|-----------|--------|-------------------|\n| Proactive Mitigation Actions (budgeted) | $ | Project budget | PM authority |\n| Contingency Reserve (known risks) | $ | Contingency reserve | PM authority |\n| Management Reserve (unknown risks) | $ | Management reserve | Sponsor authority |\n| Risk Transfer Costs (insurance/contracts) | $ | Project budget | PM/Procurement |\n| **Total Risk Response Budget** | **$** | | |\n\nRULES:\n- Every response plan must include both primary and fallback strategies for HIGH risks.\n- Trigger conditions must be specific and measurable — not "if the project falls behind."\n- Contingency allocation should be justified — either EMV-based or response-cost-based.\n- Secondary risks introduced by response actions must be identified and assessed.\n- The total risk response budget must reconcile with the project\'s contingency and management reserves.\n- Flag if total contingency allocation exceeds available contingency reserve.',
      expectedOutput:
        'Artifact 2A: Detailed response plans for 5+ risks with primary and fallback strategies, trigger conditions, resource needs, and residual/secondary risk identification. Artifact 2B: Risk trigger definitions with leading indicators, thresholds, and monitoring assignments. Artifact 2C: Contingency reserve calculation per risk with draw-down conditions. Artifact 2D: Risk response budget reconciled with project reserves.',
      artifacts: [
        {
          name: 'Risk Response Plans',
          description:
            'Detailed response plans for high-priority risks with primary and fallback strategies, triggers, resource needs, and residual risk assessment.',
          format: 'table',
          columns: [
            'Risk ID',
            'Primary Strategy',
            'Primary Actions',
            'Fallback Strategy',
            'Trigger Conditions',
            'Owner',
            'Residual Risk',
          ],
        },
        {
          name: 'Risk Trigger Definitions',
          description:
            'Specific, measurable trigger conditions with monitoring metrics, thresholds, frequency, and escalation paths.',
          format: 'table',
          columns: [
            'Risk ID',
            'Trigger Type',
            'Trigger Condition',
            'Monitoring Metric',
            'Threshold',
            'Frequency',
            'Monitor Owner',
          ],
        },
        {
          name: 'Contingency Reserve Calculation',
          description:
            'Per-risk contingency allocation with EMV basis, response costs, and draw-down conditions.',
          format: 'table',
          columns: [
            'Risk ID',
            'EMV ($)',
            'Response Cost ($)',
            'Contingency Allocated ($)',
            'Basis',
            'Draw-Down Conditions',
          ],
        },
        {
          name: 'Risk Response Budget',
          description:
            'Total risk response budget broken down by proactive actions, contingency, management reserve, and transfer costs.',
          format: 'table',
          columns: ['Category', 'Amount ($)', 'Source', 'Approval Required'],
        },
      ],
      checkpoint: {
        title: 'Risk Response Planning Verification',
        items: [
          {
            label: 'All high-priority risks have response plans',
            description:
              'Every HIGH-priority risk has a detailed response plan with both primary and fallback strategies.',
          },
          {
            label: 'Triggers are specific and measurable',
            description:
              'All risk triggers have specific, measurable conditions with thresholds — no vague or subjective triggers.',
          },
          {
            label: 'Contingency allocation is justified',
            description:
              'Each risk\'s contingency allocation is supported by EMV analysis or response cost estimates with clear draw-down conditions.',
          },
          {
            label: 'Secondary risks are identified',
            description:
              'Response plans identify any new risks introduced by the response actions themselves.',
          },
          {
            label: 'Budget reconciles with reserves',
            description:
              'Total risk response budget is reconciled with available contingency and management reserves. Gaps are flagged.',
          },
        ],
        failAction:
          'Add response plans for uncovered HIGH risks, replace vague triggers with measurable thresholds, justify contingency allocations, identify secondary risks, and reconcile the risk response budget with available reserves.',
      },
    },

    // ── Step 3: Procurement Planning ───────────────────────────────────
    {
      id: 3,
      title: 'Procurement Planning',
      purpose:
        'Perform make-or-buy analysis for all potential procurement items, develop the procurement strategy, produce Statement of Work templates, and establish vendor evaluation criteria — the foundation of PMBOK procurement management.',
      estimatedTime: '15 min',
      prompt:
        'Now let\'s develop the Procurement Plan.\n\nUsing the procurement needs from Step 0 and the risk analysis from Steps 1-2 (vendor risks, transfer strategies), develop a comprehensive procurement plan. In PMBOK, procurement management covers acquiring goods, services, or results from outside the project team.\n\nPROCUREMENT PLANNING RULES:\n1. Every procurement need must go through make-or-buy analysis before proceeding.\n2. The procurement strategy must align with the project schedule — lead times for procurement must be factored in.\n3. Vendor evaluation criteria must be weighted and objective — no subjective "gut feel" decisions.\n4. SOW must be specific enough for vendors to provide accurate proposals.\n5. Procurement decisions must consider risk transfer implications from the risk response plans.\n\nProduce the following artifacts:\n\n**Artifact 3A: Make-or-Buy Analysis Matrix**\n\n| Item ID | Item / Service Description | Internal Capability | Internal Cost Estimate | External Cost Estimate | Lead Time (Internal) | Lead Time (External) | Quality Comparison | Risk Comparison | Strategic Considerations | Decision (Make/Buy) | Rationale |\n|---------|--------------------------|--------------------|-----------------------|-----------------------|---------------------|---------------------|--------------------|-----------------|--------------------------|--------------------|-----------|\n| PROC-001 | | Available / Partial / None | $ | $ | [weeks] | [weeks] | Internal: [H/M/L], External: [H/M/L] | Internal: [H/M/L], External: [H/M/L] | [IP, core competency, etc.] | | |\n| PROC-002 | | | $ | $ | | | | | | | |\n| ... | | | | | | | | | | | |\n\n**Decision Criteria Weights:**\n| Factor | Weight (%) |\n|--------|------------|\n| Cost | 30% |\n| Quality | 25% |\n| Lead Time / Schedule Impact | 20% |\n| Risk | 15% |\n| Strategic Alignment | 10% |\n\n**Artifact 3B: Procurement Strategy**\n\n| Procurement ID | Item / Service | Procurement Method | Contract Type Preference | Estimated Value ($) | Procurement Timeline | Approval Required | Risk Mitigation in Contract |\n|---------------|---------------|-------------------|-------------------------|--------------------|--------------------|------------------|----------------------------|\n| PROC-001 | | RFP / RFQ / Sole Source / Competitive Bid | FFP / T&M / CPFF / CPIF | $ | [Start → Award → Delivery] | [Authority level] | [Warranty, SLA, penalty clause, etc.] |\n| PROC-002 | | | | $ | | | |\n| ... | | | | | | | |\n\n**Procurement Method Definitions:**\n- **RFP** (Request for Proposal): Complex requirements, evaluation includes technical approach\n- **RFQ** (Request for Quotation): Well-defined requirements, evaluation primarily on price\n- **Sole Source**: Only one qualified vendor, requires justification\n- **Competitive Bid**: Multiple vendors, lowest qualified bid wins\n\n**Artifact 3C: Statement of Work (SOW) Template**\n\nFor each "Buy" decision, provide a SOW structure:\n\n| SOW Section | Content |\n|-------------|--------|\n| SOW Title | [Procurement ID] — [Item/Service Name] |\n| Background & Purpose | [Why this procurement is needed — link to project deliverables] |\n| Scope of Work | [Detailed description of goods/services required — deliverables, quantities, specifications] |\n| Deliverables & Acceptance Criteria | [Specific deliverables with measurable acceptance criteria] |\n| Timeline & Milestones | [Key dates — proposal due, work start, interim milestones, final delivery] |\n| Assumptions & Constraints | [Vendor assumptions, site access, security requirements, etc.] |\n| Reporting Requirements | [Status reports, progress reviews, escalation procedures] |\n| Quality Requirements | [Standards, certifications, testing requirements] |\n| Terms & Conditions Reference | [Reference to organizational standard terms] |\n\n**Artifact 3D: Vendor Evaluation Criteria Matrix**\n\n| Criterion | Weight (%) | Scoring Scale (1-5) | Minimum Score | Description |\n|-----------|-----------|--------------------|--------------|-----------|\n| Technical Capability | 25% | 1=None, 3=Adequate, 5=Exceptional | 3 | Vendor\'s ability to deliver the technical requirements |\n| Relevant Experience | 15% | 1=None, 3=Some, 5=Extensive | 2 | Past experience with similar scope and scale |\n| Price / Cost | 20% | 1=Highest, 3=Competitive, 5=Lowest | 2 | Total cost of ownership including implementation |\n| Quality Management | 15% | 1=None, 3=Basic, 5=ISO-certified | 3 | Quality systems, certifications, defect rates |\n| Schedule Compliance | 10% | 1=Poor, 3=Acceptable, 5=Excellent | 3 | Ability to meet delivery timelines |\n| Financial Stability | 5% | 1=Unstable, 3=Stable, 5=Very Strong | 3 | Vendor\'s financial health and business continuity |\n| References | 5% | 1=Poor, 3=Satisfactory, 5=Outstanding | 2 | Customer references and satisfaction |\n| Risk Profile | 5% | 1=High Risk, 3=Moderate, 5=Low Risk | 2 | Vendor-related risks (single source, location, etc.) |\n\n**Artifact 3E: Source Selection Criteria**\n\n| Selection Factor | Description | Evaluation Method |\n|-----------------|-------------|-------------------|\n| Mandatory Requirements | [Must-have criteria — pass/fail] | Pass/Fail screening |\n| Technical Evaluation | [Criteria from 3D — weighted scoring] | Scoring matrix |\n| Price Evaluation | [Cost comparison methodology] | Normalized pricing |\n| Best Value Determination | [How technical and price scores combine] | [e.g., Technical 60% / Price 40%] |\n| Tie-Breaking Rule | [What happens if vendors score equally] | [e.g., Prefer local vendor, prefer existing relationship] |\n| Evaluation Team | [Who evaluates — roles, not names] | [PM, Technical Lead, Procurement, Finance] |\n\nRULES:\n- Every "Buy" decision must have a completed SOW template.\n- Vendor evaluation criteria must sum to 100% and have minimum acceptable scores.\n- Procurement timeline must account for the full cycle: SOW drafting → vendor solicitation → evaluation → award → contract execution → delivery.\n- Flag any sole-source procurement — these require additional justification.\n- Consider risk transfer from Step 2 — procurement can be a risk mitigation strategy.\n- Flag if total procurement value exceeds the threshold requiring sponsor or board approval.',
      expectedOutput:
        'Artifact 3A: A complete Make-or-Buy Analysis Matrix with weighted decision criteria and clear rationale. Artifact 3B: A Procurement Strategy with methods, contract type preferences, and timelines. Artifact 3C: SOW templates for each "Buy" item. Artifact 3D: A weighted Vendor Evaluation Criteria Matrix. Artifact 3E: Source Selection Criteria including evaluation team composition.',
      artifacts: [
        {
          name: 'Make-or-Buy Analysis Matrix',
          description:
            'Comprehensive make-or-buy analysis for each procurement item with cost, quality, risk, and strategic comparison.',
          format: 'matrix',
          columns: [
            'Item ID',
            'Description',
            'Internal Cost',
            'External Cost',
            'Quality Comparison',
            'Risk Comparison',
            'Decision',
            'Rationale',
          ],
          rows: ['PROC-001', 'PROC-002', 'PROC-003'],
        },
        {
          name: 'Procurement Strategy',
          description:
            'Procurement method, contract type preference, timeline, and risk mitigation approach for each procurement item.',
          format: 'table',
          columns: [
            'Procurement ID',
            'Item / Service',
            'Procurement Method',
            'Contract Type',
            'Estimated Value ($)',
            'Timeline',
          ],
        },
        {
          name: 'Statement of Work Template',
          description:
            'Structured SOW template for each "Buy" decision covering scope, deliverables, timeline, and quality requirements.',
          format: 'table',
          columns: ['SOW Section', 'Content'],
        },
        {
          name: 'Vendor Evaluation Criteria Matrix',
          description:
            'Weighted evaluation criteria with scoring scales and minimum acceptable scores for vendor assessment.',
          format: 'table',
          columns: ['Criterion', 'Weight (%)', 'Scoring Scale', 'Minimum Score', 'Description'],
        },
        {
          name: 'Source Selection Criteria',
          description:
            'Selection methodology including mandatory requirements, evaluation weighting, tie-breaking rules, and evaluation team composition.',
          format: 'table',
          columns: ['Selection Factor', 'Description', 'Evaluation Method'],
        },
      ],
      checkpoint: {
        title: 'Procurement Planning Verification',
        items: [
          {
            label: 'All procurement items have make-or-buy analysis',
            description:
              'Every identified procurement need has been analyzed with cost, quality, risk, and strategic factors considered.',
          },
          {
            label: 'Buy decisions have SOW templates',
            description:
              'Every item with a "Buy" decision has a completed Statement of Work template with acceptance criteria.',
          },
          {
            label: 'Evaluation criteria are weighted and objective',
            description:
              'Vendor evaluation criteria sum to 100%, have defined scoring scales, and include minimum acceptable scores.',
          },
          {
            label: 'Procurement timeline aligns with project schedule',
            description:
              'The full procurement cycle (solicitation through delivery) is factored into the project schedule.',
          },
          {
            label: 'Sole-source procurements are justified',
            description:
              'Any sole-source procurement has documented justification and approval requirements.',
          },
        ],
        failAction:
          'Complete make-or-buy analysis for missing items, add SOW templates for all "Buy" decisions, verify criteria weights sum to 100%, align procurement timelines with the schedule, and justify sole-source selections.',
      },
    },

    // ── Step 4: Vendor Evaluation & Contract Strategy ──────────────────
    {
      id: 4,
      title: 'Vendor Evaluation & Contract Strategy',
      purpose:
        'Evaluate potential vendors using the established criteria, recommend optimal contract types, produce contract term checklists, and assemble the procurement management plan — the final step in PMBOK procurement management.',
      estimatedTime: '10 min',
      prompt:
        'Let\'s evaluate vendors and finalize the contract strategy.\n\nUsing the evaluation criteria from Step 3 and any known vendor information from Step 0, produce vendor comparison scorecards, recommend contract types, and assemble the procurement management plan.\n\nCONTRACT TYPE RULES (PMBOK):\n- **Firm Fixed Price (FFP)**: Use when scope is well-defined and stable. Risk is on the vendor. Best for clearly specified deliverables.\n- **Time and Materials (T&M)**: Use when scope is uncertain or evolving. Risk is shared. Best for advisory, staff augmentation, or exploratory work.\n- **Cost Plus Fixed Fee (CPFF)**: Use when scope is highly uncertain. Risk is primarily on the buyer. Provides vendor cost transparency.\n- **Cost Plus Incentive Fee (CPIF)**: Use when you want to incentivize vendor performance. Shared risk with performance alignment.\n\nCONTRACT SELECTION CRITERIA:\n- If scope is >= 80% defined → prefer FFP\n- If scope is 50-80% defined → prefer T&M with ceiling or CPIF\n- If scope is < 50% defined → prefer CPFF or split into discovery phase (T&M) + delivery phase (FFP)\n- High-risk procurements should include performance bonds, warranties, or liquidated damages\n\nProduce the following artifacts:\n\n**Artifact 4A: Vendor Comparison Scorecard**\n\nIf specific vendors are known, score them. If not, provide the empty scorecard template with guidance:\n\n| Criterion | Weight (%) | Vendor A Score (1-5) | Vendor A Weighted | Vendor B Score (1-5) | Vendor B Weighted | Vendor C Score (1-5) | Vendor C Weighted |\n|-----------|-----------|---------------------|------------------|---------------------|------------------|---------------------|------------------|\n| Technical Capability | 25% | | | | | | |\n| Relevant Experience | 15% | | | | | | |\n| Price / Cost | 20% | | | | | | |\n| Quality Management | 15% | | | | | | |\n| Schedule Compliance | 10% | | | | | | |\n| Financial Stability | 5% | | | | | | |\n| References | 5% | | | | | | |\n| Risk Profile | 5% | | | | | | |\n| **TOTAL** | **100%** | | **[sum]** | | **[sum]** | | **[sum]** |\n| **Meets Minimums?** | | **Yes/No** | | **Yes/No** | | **Yes/No** | |\n| **Recommendation** | | | | | | | |\n\n**Artifact 4B: Contract Type Recommendation**\n\n| Procurement ID | Item / Service | Scope Definition Level (%) | Recommended Contract Type | Rationale | Risk Allocation (Buyer/Vendor/Shared) | Key Contract Mechanisms | Alternative Contract Type |\n|---------------|---------------|---------------------------|--------------------------|-----------|--------------------------------------|------------------------|--------------------------|\n| PROC-001 | | [%] | FFP / T&M / CPFF / CPIF | [Why this type fits] | | [Warranties, SLAs, penalties, bonuses] | [If primary is rejected] |\n| PROC-002 | | | | | | | |\n| ... | | | | | | | |\n\n**Artifact 4C: Contract Terms Checklist**\n\nFor each procurement, ensure the following terms are addressed:\n\n| Term Category | Term | Applicable? | Specific Requirement | Priority (Must-Have/Should-Have/Nice-to-Have) |\n|-------------|------|------------|---------------------|-------------------------------------------------|\n| Scope & Deliverables | Scope of Work reference | Yes | SOW from Artifact 3C | Must-Have |\n| Scope & Deliverables | Acceptance criteria | Yes | As defined in SOW | Must-Have |\n| Scope & Deliverables | Change order process | Yes | Written approval required for scope changes | Must-Have |\n| Pricing & Payment | Payment schedule | Yes | Milestone-based / Monthly / On delivery | Must-Have |\n| Pricing & Payment | Price escalation clause | | | |\n| Pricing & Payment | Invoicing requirements | | | |\n| Schedule | Delivery dates / milestones | Yes | Per SOW timeline | Must-Have |\n| Schedule | Liquidated damages for late delivery | | $[x] per day beyond deadline | Should-Have |\n| Schedule | Force majeure clause | Yes | Standard definition | Must-Have |\n| Quality | Warranty period | | [Duration] | Should-Have |\n| Quality | Defect resolution SLA | | [Response time, resolution time] | Should-Have |\n| Quality | Quality audit rights | | Buyer can audit vendor quality processes | Nice-to-Have |\n| Risk | Liability cap | Yes | [Amount or multiple of contract value] | Must-Have |\n| Risk | Insurance requirements | | [Types and minimum coverage] | Should-Have |\n| Risk | Indemnification | Yes | Mutual indemnification for negligence | Must-Have |\n| Intellectual Property | IP ownership | Yes | [Buyer owns all deliverables / shared / vendor retains] | Must-Have |\n| Intellectual Property | Confidentiality / NDA | Yes | Mutual NDA, [duration] | Must-Have |\n| Termination | Termination for convenience | Yes | [Notice period, wind-down terms] | Must-Have |\n| Termination | Termination for cause | Yes | [Cure period, conditions] | Must-Have |\n| Performance | Performance metrics / KPIs | | [Specific KPIs per SOW] | Should-Have |\n| Performance | Performance bonus / penalty | | [Bonus for early/quality, penalty for late/defects] | Nice-to-Have |\n| Governance | Escalation process | Yes | [Levels and timelines] | Must-Have |\n| Governance | Status reporting requirements | Yes | [Frequency, format, content] | Must-Have |\n\n**Artifact 4D: Procurement Management Plan**\n\nAssemble the complete procurement management plan:\n\n| Section | Content |\n|---------|---------|\n| Procurement Overview | [Summary of all procurement items, total value, timeline] |\n| Procurement Authority | [Who can authorize procurements at what thresholds] |\n| Make-or-Buy Decisions | [Reference Artifact 3A] |\n| Procurement Strategy | [Reference Artifact 3B] |\n| SOW Standards | [Reference Artifact 3C] |\n| Vendor Evaluation Process | [Reference Artifacts 3D, 3E, 4A] |\n| Contract Types & Terms | [Reference Artifacts 4B, 4C] |\n| Procurement Schedule | [Key dates: SOW finalization, RFP release, proposal deadline, evaluation period, award, contract execution, delivery milestones] |\n| Vendor Management Approach | [Ongoing vendor performance monitoring, escalation, relationship management] |\n| Contract Administration | [Invoice processing, change orders, dispute resolution, contract closeout] |\n| Procurement Risks | [Reference risk register — vendor and procurement-related risks] |\n| Integration with Project Schedule | [How procurement milestones map to the project schedule critical path] |\n\nRULES:\n- Contract type must match the scope definition level — do not use FFP for poorly defined scope.\n- Every Must-Have contract term must be included — flag if any are missing.\n- Vendor scorecards must use the weighted criteria from Step 3 — no ad-hoc evaluation.\n- The procurement management plan must include a procurement schedule that integrates with the project schedule.\n- Flag any procurement where the timeline creates a dependency on the project critical path.\n- Include vendor performance monitoring approach — do not just award and forget.',
      expectedOutput:
        'Artifact 4A: Vendor Comparison Scorecards with weighted scoring and clear recommendations. Artifact 4B: Contract Type Recommendations with rationale, risk allocation, and key mechanisms. Artifact 4C: Contract Terms Checklist ensuring all Must-Have terms are addressed. Artifact 4D: A complete Procurement Management Plan with all sections populated and integrated with the project schedule.',
      artifacts: [
        {
          name: 'Vendor Comparison Scorecard',
          description:
            'Weighted vendor evaluation scorecard with individual and total scores, minimum threshold verification, and recommendations.',
          format: 'table',
          columns: [
            'Criterion',
            'Weight (%)',
            'Vendor A Score',
            'Vendor A Weighted',
            'Vendor B Score',
            'Vendor B Weighted',
          ],
        },
        {
          name: 'Contract Type Recommendation',
          description:
            'Contract type recommendation per procurement item with scope definition assessment, rationale, and risk allocation.',
          format: 'table',
          columns: [
            'Procurement ID',
            'Item / Service',
            'Scope Definition (%)',
            'Recommended Contract Type',
            'Rationale',
            'Risk Allocation',
          ],
        },
        {
          name: 'Contract Terms Checklist',
          description:
            'Comprehensive checklist of contract terms by category with applicability, specific requirements, and priority.',
          format: 'table',
          columns: [
            'Term Category',
            'Term',
            'Applicable?',
            'Specific Requirement',
            'Priority',
          ],
        },
        {
          name: 'Procurement Management Plan',
          description:
            'Consolidated procurement management plan covering authority, strategy, evaluation process, contract administration, vendor management, and schedule integration.',
          format: 'text',
        },
      ],
      checkpoint: {
        title: 'Vendor Evaluation & Contract Strategy Verification',
        items: [
          {
            label: 'Vendor scorecards use weighted criteria',
            description:
              'Vendor evaluation uses the exact criteria and weights from Step 3 with consistent 1-5 scoring and minimum thresholds.',
          },
          {
            label: 'Contract types match scope definition levels',
            description:
              'FFP is only recommended for well-defined scope (>= 80%). T&M or CPFF is used for uncertain scope.',
          },
          {
            label: 'All Must-Have contract terms are addressed',
            description:
              'Every term marked Must-Have in the checklist is included in the contract strategy with specific requirements.',
          },
          {
            label: 'Procurement schedule integrates with project schedule',
            description:
              'Procurement milestones (solicitation, evaluation, award, delivery) are mapped to the project schedule and critical path dependencies are flagged.',
          },
          {
            label: 'Procurement management plan is complete',
            description:
              'The plan covers all sections from overview through contract administration and vendor performance monitoring.',
          },
        ],
        failAction:
          'Correct mismatched contract types, add missing Must-Have terms, verify vendor scoring consistency, integrate procurement schedule with the project timeline, and complete all procurement management plan sections.',
      },
    },
  ],
  requiredInputs: [
    {
      name: 'Project Name & Overview',
      description:
        'The project name, description, and current phase to provide context for risk and procurement analysis.',
      format: 'Text: Project Name, Description, Current Phase',
    },
    {
      name: 'Qualitative Risk Register',
      description:
        'The existing risk register from the initiation/planning phase with Risk IDs, descriptions, categories, probability and impact scores, risk scores, and current response strategies.',
      format: 'Table: Risk ID, Description, Category, Probability, Impact, Score, Response Strategy',
    },
    {
      name: 'Project Budget & Schedule Summary',
      description:
        'Budget at Completion (BAC), current EAC if available, total project duration, critical path summary, contingency reserve amount, and management reserve amount.',
      format: 'Table: BAC, EAC, Duration, Critical Path, Contingency Reserve, Management Reserve',
    },
    {
      name: 'Procurement Needs',
      description:
        'Known procurement requirements including goods, services, or expertise that may need external sourcing, plus any current vendor relationships.',
      format: 'List: Item/Service, Description, Estimated Value, Current Vendor (if any)',
    },
    {
      name: 'Organizational Procurement Policies',
      description:
        'Organizational procurement policies, preferred vendor lists, approval thresholds, and regulatory requirements governing procurement decisions.',
      format: 'Text: Policies, Approval Thresholds, Preferred Vendors, Regulations',
    },
    {
      name: 'Risk Tolerance & Thresholds',
      description:
        'Organization\'s risk appetite including maximum acceptable schedule delay, maximum acceptable cost overrun, and risk categories requiring mandatory escalation.',
      format: 'Table: Risk Dimension, Maximum Tolerance, Escalation Requirement',
    },
  ],
  artifactsProduced: [
    'Risk & Procurement Context Summary',
    'Monte Carlo Simulation Inputs',
    'EMV Analysis',
    'Decision Tree Analysis',
    'Risk-Adjusted Schedule & Budget',
    'Risk Response Plans',
    'Risk Trigger Definitions',
    'Contingency Reserve Calculation',
    'Risk Response Budget',
    'Make-or-Buy Analysis Matrix',
    'Procurement Strategy',
    'Statement of Work Template',
    'Vendor Evaluation Criteria Matrix',
    'Source Selection Criteria',
    'Vendor Comparison Scorecard',
    'Contract Type Recommendation',
    'Contract Terms Checklist',
    'Procurement Management Plan',
  ],
  tier: 'premium',
  price: 29700,
  suiteId: 'pmbok-suite',
};
