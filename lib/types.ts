export interface PromptVariable {
  name: string;
  description: string;
  example: string;
  required: boolean;
}

export type PromptCategory =
  | 'agile'
  | 'scrum'
  | 'kanban'
  | 'hybrid'
  | 'safe'
  | 'lean'
  | 'waterfall'
  | 'scrumban'
  | 'prince2'
  | 'six-sigma'
  | 'pmbok'
  | 'itil'
  | 'cobit';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  template: string;
  variables: PromptVariable[];
  category: PromptCategory;
  frameworks: string[];
  tier: 'free' | 'premium';
  tags: string[];
  estimatedTimeSaved: string;
}
