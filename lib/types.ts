export interface PromptVariable {
  name: string;
  description: string;
  example: string;
  required: boolean;
}

export type Framework =
  | 'agile'
  | 'scrum'
  | 'kanban'
  | 'hybrid'
  | 'safe'
  | 'lean'
  | 'scrumban'
  | 'prince2'
  | 'six-sigma'
  | 'pmbok'
  | 'itil'
  | 'cobit';

export type CanonicalPhase = 1 | 2 | 3 | 4 | 5;

export interface Prompt {
  id: string;
  title: string;
  description: string;
  template: string;
  variables: PromptVariable[];
  framework: Framework;
  phase: string;
  canonicalPhase: CanonicalPhase;
  tier: 'free' | 'premium';
  tags: string[];
  estimatedTimeSaved: string;
}

export interface FrameworkPhase {
  name: string;
  canonicalPhase: CanonicalPhase;
  description?: string;
}

export interface FrameworkDefinition {
  id: Framework;
  name: string;
  phases: FrameworkPhase[];
}

// Backward compatibility - will remove after migration
export type PromptCategory = Framework;

// === BLUEPRINT TYPES ===

export interface ArtifactTemplate {
  name: string;
  description: string;
  format: 'table' | 'list' | 'text' | 'matrix';
  columns?: string[];
  rows?: string[];
}

export interface CheckpointItem {
  label: string;
  description?: string;
}

export interface BlueprintStep {
  id: number;
  title: string;
  purpose: string;
  estimatedTime: string;
  prompt: string;
  expectedOutput: string;
  artifacts: ArtifactTemplate[];
  checkpoint: {
    title: string;
    items: CheckpointItem[];
    failAction: string;
  };
}

export interface Blueprint {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  methodology: 'SAFe' | 'PRINCE2' | 'PMBOK' | 'COBIT';
  version: string;
  estimatedTime: string;
  stepCount: number;
  steps: BlueprintStep[];
  requiredInputs: {
    name: string;
    description: string;
    format: string;
  }[];
  artifactsProduced: string[];
  tier: 'free' | 'premium';
  price: number;
  suiteId: string;
}

export interface BlueprintSuite {
  id: string;
  name: string;
  methodology: string;
  description: string;
  blueprints: string[];
  price: number;
}

export interface PurchaseRecord {
  blueprintId: string;
  paymentRef: string;
  purchasedAt: string;
  email: string;
}

export interface BlueprintProgress {
  blueprintId: string;
  currentStep: number;
  completedSteps: number[];
  checkpointResults: Record<number, boolean[]>;
  startedAt: string;
  lastUpdatedAt: string;
}
