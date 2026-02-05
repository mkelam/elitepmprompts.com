import { FrameworkDefinition } from '../lib/types';

export const frameworkDefinitions: FrameworkDefinition[] = [
  // PMBOK (absorbs Waterfall)
  // Source: PMI PMBOK Guide, 7th Edition
  {
    id: 'pmbok',
    name: 'PMBOK',
    phases: [
      { name: 'Initiating', canonicalPhase: 1, description: 'Formally authorize the project or phase' },
      { name: 'Planning', canonicalPhase: 2, description: 'Establish scope, objectives, and course of action' },
      { name: 'Executing', canonicalPhase: 3, description: 'Complete the work defined in the project management plan' },
      { name: 'Monitoring & Controlling', canonicalPhase: 4, description: 'Track, review, and regulate progress and performance' },
      { name: 'Closing', canonicalPhase: 5, description: 'Formally complete the project or phase' },
    ],
  },

  // PRINCE2
  // Source: AXELOS PRINCE2 Manual, 7th Edition
  {
    id: 'prince2',
    name: 'PRINCE2',
    phases: [
      { name: 'Starting Up', canonicalPhase: 1, description: 'Ensure prerequisites for initiating the project are in place' },
      { name: 'Initiating', canonicalPhase: 1, description: 'Establish solid foundations for the project' },
      { name: 'Stage Planning', canonicalPhase: 2, description: 'Plan the next management stage in detail' },
      { name: 'Managing Product Delivery', canonicalPhase: 3, description: 'Control the link between Project Manager and Team Manager' },
      { name: 'Controlling a Stage', canonicalPhase: 4, description: 'Assign work, monitor progress, deal with issues' },
      { name: 'Closing', canonicalPhase: 5, description: 'Confirm acceptance and controlled close' },
    ],
  },

  // Agile
  // Source: Agile Alliance, Agile Practice Guide (PMI)
  {
    id: 'agile',
    name: 'Agile',
    phases: [
      { name: 'Envisioning', canonicalPhase: 1, description: 'Establish product vision and initial scope' },
      { name: 'Roadmapping', canonicalPhase: 2, description: 'Plan releases and high-level feature timeline' },
      { name: 'Iteration Planning', canonicalPhase: 2, description: 'Plan work for the upcoming iteration' },
      { name: 'Iteration Execution', canonicalPhase: 3, description: 'Develop and deliver increment' },
      { name: 'Review & Retrospective', canonicalPhase: 4, description: 'Inspect deliverable and adapt process' },
      { name: 'Release', canonicalPhase: 5, description: 'Deploy value to users' },
    ],
  },

  // Scrum
  // Source: Scrum Guide 2020 (Scrum.org / Schwaber & Sutherland)
  {
    id: 'scrum',
    name: 'Scrum',
    phases: [
      { name: 'Product Backlog Creation', canonicalPhase: 1, description: 'Define and prioritize product requirements' },
      { name: 'Sprint Planning', canonicalPhase: 2, description: 'Plan the Sprint Goal and Sprint Backlog' },
      { name: 'Sprint Execution', canonicalPhase: 3, description: 'Daily Scrums and development work' },
      { name: 'Sprint Review', canonicalPhase: 4, description: 'Inspect the increment and adapt the backlog' },
      { name: 'Sprint Retrospective', canonicalPhase: 4, description: 'Inspect the process and plan improvements' },
      { name: 'Release', canonicalPhase: 5, description: 'Deliver the product increment to stakeholders' },
    ],
  },

  // Kanban
  // Source: Kanban University, David Anderson's Kanban Method
  {
    id: 'kanban',
    name: 'Kanban',
    phases: [
      { name: 'Demand Shaping', canonicalPhase: 1, description: 'Manage incoming work requests and priorities' },
      { name: 'Commitment Point', canonicalPhase: 2, description: 'Decide what work to pull into the system' },
      { name: 'Work In Progress', canonicalPhase: 3, description: 'Execute work within WIP limits' },
      { name: 'Flow Monitoring', canonicalPhase: 4, description: 'Track metrics, identify blockers, optimize flow' },
      { name: 'Delivery Point', canonicalPhase: 5, description: 'Complete and deliver work items' },
    ],
  },

  // SAFe
  // Source: Scaled Agile Framework 6.0 (scaledagileframework.com)
  {
    id: 'safe',
    name: 'SAFe',
    phases: [
      { name: 'Portfolio Discovery', canonicalPhase: 1, description: 'Identify and prioritize strategic initiatives' },
      { name: 'PI Planning', canonicalPhase: 2, description: 'Plan the Program Increment with all teams' },
      { name: 'Iteration Execution', canonicalPhase: 3, description: 'Execute iterations within the PI' },
      { name: 'Inspect & Adapt', canonicalPhase: 4, description: 'Review PI results and identify improvements' },
      { name: 'Release on Demand', canonicalPhase: 5, description: 'Deploy value when the business needs it' },
    ],
  },

  // Lean
  // Source: Lean Enterprise Institute, Womack & Jones
  {
    id: 'lean',
    name: 'Lean',
    phases: [
      { name: 'Identify Value', canonicalPhase: 1, description: 'Define value from the customer perspective' },
      { name: 'Map Value Stream', canonicalPhase: 2, description: 'Identify all steps and eliminate waste' },
      { name: 'Create Flow', canonicalPhase: 3, description: 'Make value-creating steps flow smoothly' },
      { name: 'Establish Pull', canonicalPhase: 4, description: 'Let customers pull value as needed' },
      { name: 'Pursue Perfection', canonicalPhase: 4, description: 'Continuously improve toward perfection' },
    ],
  },

  // Scrumban
  // Source: Corey Ladas, Scrumban (hybrid of Scrum + Kanban)
  {
    id: 'scrumban',
    name: 'Scrumban',
    phases: [
      { name: 'Backlog Prioritization', canonicalPhase: 1, description: 'Triage and prioritize work items' },
      { name: 'Planning on Demand', canonicalPhase: 2, description: 'Plan when capacity becomes available' },
      { name: 'Flow Execution', canonicalPhase: 3, description: 'Execute work with WIP limits' },
      { name: 'Metrics & Review', canonicalPhase: 4, description: 'Analyze flow metrics and review progress' },
      { name: 'Continuous Delivery', canonicalPhase: 5, description: 'Deliver work as it completes' },
    ],
  },

  // Six Sigma
  // Source: ASQ (American Society for Quality), DMAIC methodology
  {
    id: 'six-sigma',
    name: 'Six Sigma',
    phases: [
      { name: 'Define', canonicalPhase: 1, description: 'Define the problem and project goals' },
      { name: 'Measure', canonicalPhase: 2, description: 'Measure current performance' },
      { name: 'Analyze', canonicalPhase: 2, description: 'Analyze root causes of defects' },
      { name: 'Improve', canonicalPhase: 3, description: 'Implement solutions to address root causes' },
      { name: 'Control', canonicalPhase: 4, description: 'Sustain improvements with controls' },
    ],
  },

  // COBIT
  // Source: ISACA COBIT 2019 Framework
  {
    id: 'cobit',
    name: 'COBIT',
    phases: [
      { name: 'Evaluate', canonicalPhase: 1, description: 'Evaluate strategic options and direction' },
      { name: 'Direct', canonicalPhase: 2, description: 'Direct preparation and planning activities' },
      { name: 'Implement', canonicalPhase: 3, description: 'Implement the planned initiatives' },
      { name: 'Monitor', canonicalPhase: 4, description: 'Monitor performance against targets' },
      { name: 'Assure', canonicalPhase: 5, description: 'Assure outcomes meet stakeholder needs' },
    ],
  },

  // ITIL
  // Source: AXELOS ITIL 4 Foundation
  {
    id: 'itil',
    name: 'ITIL',
    phases: [
      { name: 'Strategy & Engage', canonicalPhase: 1, description: 'Understand stakeholders and strategic direction' },
      { name: 'Plan', canonicalPhase: 2, description: 'Plan for value delivery' },
      { name: 'Design & Transition', canonicalPhase: 3, description: 'Design and transition services' },
      { name: 'Build', canonicalPhase: 3, description: 'Build or obtain service components' },
      { name: 'Deliver & Support', canonicalPhase: 4, description: 'Deliver and support services' },
      { name: 'Improve', canonicalPhase: 4, description: 'Continually improve services and practices' },
    ],
  },

  // Hybrid
  // Source: PMI Agile Practice Guide, pragmatic combination models
  {
    id: 'hybrid',
    name: 'Hybrid',
    phases: [
      { name: 'Discovery', canonicalPhase: 1, description: 'Explore problem space and validate approach' },
      { name: 'Adaptive Planning', canonicalPhase: 2, description: 'Plan with flexibility for change' },
      { name: 'Iterative Delivery', canonicalPhase: 3, description: 'Deliver in increments with feedback loops' },
      { name: 'Governance', canonicalPhase: 4, description: 'Oversight, compliance, and decision-making' },
      { name: 'Transition & Closeout', canonicalPhase: 5, description: 'Transition deliverables and close formally' },
    ],
  },
];

// Helper function to get phases for a framework
export function getFrameworkPhases(frameworkId: string): FrameworkDefinition | undefined {
  return frameworkDefinitions.find((f) => f.id === frameworkId);
}

// Helper function to get all phase names for a framework
export function getPhaseNames(frameworkId: string): string[] {
  const framework = getFrameworkPhases(frameworkId);
  return framework ? framework.phases.map((p) => p.name) : [];
}

// Helper function to get canonical phase from framework-specific phase name
export function getCanonicalPhase(frameworkId: string, phaseName: string): number | undefined {
  const framework = getFrameworkPhases(frameworkId);
  if (!framework) return undefined;
  const phase = framework.phases.find((p) => p.name === phaseName);
  return phase?.canonicalPhase;
}
