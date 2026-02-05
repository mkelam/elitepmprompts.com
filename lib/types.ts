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
