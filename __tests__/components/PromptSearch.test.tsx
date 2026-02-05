import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PromptSearch } from '@/app/components/features/PromptSearch';
import { Prompt } from '@/lib/types';

const mockPrompts: Prompt[] = [
  {
    id: '1',
    title: 'SWOT Analysis',
    framework: 'pmbok',
    phase: 'Planning',
    canonicalPhase: 2,
    description: 'Strategic planning framework',
    template: 'Analyze {{company}} strengths, weaknesses, opportunities, threats',
    variables: [{ name: 'company', example: 'Acme Corp', description: 'Company name', required: true }],
    estimatedTimeSaved: '30 min',
    tier: 'free',
    tags: ['SWOT', 'strategy'],
  },
  {
    id: '2',
    title: 'Project Charter',
    framework: 'pmbok',
    phase: 'Initiating',
    canonicalPhase: 1,
    description: 'Project initialization document',
    template: 'Create a project charter for {{project_name}}',
    variables: [{ name: 'project_name', example: 'New Website', description: 'Project name', required: true }],
    estimatedTimeSaved: '45 min',
    tier: 'free',
    tags: ['PMI', 'charter'],
  },
  {
    id: '3',
    title: 'Balanced Scorecard',
    framework: 'agile',
    phase: 'Review & Retrospective',
    canonicalPhase: 4,
    description: 'Performance management framework',
    template: 'Build a balanced scorecard for {{department}}',
    variables: [{ name: 'department', example: 'Sales', description: 'Department', required: true }],
    estimatedTimeSaved: '1 hour',
    tier: 'premium',
    tags: ['BSC', 'metrics'],
  },
  {
    id: '4',
    title: 'Process Mapping',
    framework: 'lean',
    phase: 'Map Value Stream',
    canonicalPhase: 2,
    description: 'Visualize business processes',
    template: 'Map the {{process_name}} process',
    variables: [{ name: 'process_name', example: 'Order fulfillment', description: 'Process name', required: true }],
    estimatedTimeSaved: '2 hours',
    tier: 'free',
    tags: ['BPMN', 'process'],
  },
];

describe('PromptSearch', () => {
  const mockOnFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render search input', () => {
      render(<PromptSearch prompts={mockPrompts} onFilter={mockOnFilter} />);

      expect(screen.getByRole('searchbox')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/search prompts/i)).toBeInTheDocument();
    });

    it('should render framework filter buttons', () => {
      render(<PromptSearch prompts={mockPrompts} onFilter={mockOnFilter} />);

      expect(screen.getByText('all')).toBeInTheDocument();
      expect(screen.getByText('pmbok')).toBeInTheDocument();
      expect(screen.getByText('agile')).toBeInTheDocument();
    });

    it('should have proper ARIA attributes for accessibility', () => {
      render(<PromptSearch prompts={mockPrompts} onFilter={mockOnFilter} />);

      expect(screen.getByRole('search')).toHaveAttribute('aria-label', 'Search prompts');
      expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'Filter by framework');
    });
  });

  describe('search functionality', () => {
    it('should call onFilter with all prompts initially', () => {
      render(<PromptSearch prompts={mockPrompts} onFilter={mockOnFilter} />);

      expect(mockOnFilter).toHaveBeenCalledWith(mockPrompts);
    });

    it('should filter prompts by search query', async () => {
      render(<PromptSearch prompts={mockPrompts} onFilter={mockOnFilter} />);

      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: 'SWOT' } });

      await waitFor(() => {
        const lastCall = mockOnFilter.mock.calls.slice(-1)[0][0];
        expect(lastCall.some((p: Prompt) => p.title === 'SWOT Analysis')).toBe(true);
      });
    });

    it('should filter prompts by description', async () => {
      render(<PromptSearch prompts={mockPrompts} onFilter={mockOnFilter} />);

      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: 'initialization' } });

      await waitFor(() => {
        const lastCall = mockOnFilter.mock.calls.slice(-1)[0][0];
        expect(lastCall.some((p: Prompt) => p.title === 'Project Charter')).toBe(true);
      });
    });
  });

  describe('framework filtering', () => {
    it('should filter by framework when framework button is clicked', async () => {
      render(<PromptSearch prompts={mockPrompts} onFilter={mockOnFilter} />);

      const pmbokButton = screen.getByText('pmbok');
      fireEvent.click(pmbokButton);

      await waitFor(() => {
        const lastCall = mockOnFilter.mock.calls.slice(-1)[0][0];
        expect(lastCall.every((p: Prompt) => p.framework === 'pmbok')).toBe(true);
        expect(lastCall.length).toBe(2); // SWOT and Project Charter
      });
    });

    it('should show all prompts when "all" framework is selected', async () => {
      render(<PromptSearch prompts={mockPrompts} onFilter={mockOnFilter} />);

      // First click pmbok
      fireEvent.click(screen.getByText('pmbok'));

      // Then click all
      fireEvent.click(screen.getByText('all'));

      await waitFor(() => {
        const lastCall = mockOnFilter.mock.calls.slice(-1)[0][0];
        expect(lastCall.length).toBe(4);
      });
    });

    it('should apply aria-pressed attribute to active framework', () => {
      render(<PromptSearch prompts={mockPrompts} onFilter={mockOnFilter} />);

      const allButton = screen.getByText('all');
      expect(allButton).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(screen.getByText('pmbok'));

      expect(screen.getByText('pmbok')).toHaveAttribute('aria-pressed', 'true');
      expect(allButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('combined search and framework filtering', () => {
    it('should combine search query and framework filter', async () => {
      render(<PromptSearch prompts={mockPrompts} onFilter={mockOnFilter} />);

      // Select pmbok framework
      fireEvent.click(screen.getByText('pmbok'));

      // Search for "charter"
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: 'charter' } });

      await waitFor(() => {
        const lastCall = mockOnFilter.mock.calls.slice(-1)[0][0];
        expect(lastCall.length).toBe(1);
        expect(lastCall[0].title).toBe('Project Charter');
      });
    });
  });
});
