import { render, screen, fireEvent } from '@testing-library/react';
import { vi, test, expect, beforeEach, describe } from 'vitest';
import DetailCard from '@/components/DetailCard';
import { Idiom } from '@/types';
import { UserContext } from '@/context/userContext';
import { suppressConsoleOutput } from '../../testUtils';

const DEBUG_ERRORS = false;
suppressConsoleOutput({ log: !DEBUG_ERRORS, error: !DEBUG_ERRORS });

const mockOpenModal = vi.fn();
const mockOpenExampleModal = vi.fn();
const mockOpenAddExampleModal = vi.fn();

const getDummyIdiom = (overrides: Partial<Idiom> = {}): Idiom => ({
  id: 1,
  title: 'Break the ice',
  title_general: null,
  definition: 'To initiate social interactions.',
  contributor: 'John Doe',
  timestamps: '2024-05-01T08:00:00Z',
  position: 42,
  examples: [
    {
      example_id: 1,
      idiom_id: 1,
      example: 'He told a joke to break the ice.',
    },
  ],
  ...overrides,
});

console.log('UserContext:', UserContext);

const renderComponent = (idiom = getDummyIdiom(), roles: string[] = []) =>
  render(
    <UserContext.Provider value={{ roles, isAuthenticated: true }}>
      <DetailCard
        idiom={idiom}
        openModal={mockOpenModal}
        openExampleModal={mockOpenExampleModal}
        openAddExampleModal={mockOpenAddExampleModal}
      />
    </UserContext.Provider>,
  );

describe('DetailCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Idiom content', () => {
    test('renders idiom.title when title_general is null or empty', () => {
      renderComponent(getDummyIdiom({ title_general: null }));

      expect(screen.getByText(/"Break the ice"/)).toBeInTheDocument();
    });

    test('renders title_general if present and non-empty', () => {
      renderComponent(getDummyIdiom({ title_general: 'General Title' }));

      expect(screen.getByText(/General Title/)).toBeInTheDocument();
    });

    test('renders formatted timestamp', () => {
      renderComponent();

      expect(screen.getByTestId('timestamp')).toHaveTextContent('Added: 05-01-24');
    });

    test('renders contributor if available', () => {
      renderComponent();

      expect(screen.getByTestId('contributor')).toHaveTextContent('by John Doe');
    });

    test('renders definition if available', () => {
      renderComponent();

      expect(screen.getByText(/To initiate social interactions./)).toBeInTheDocument();
    });

    test('renders all example sentences in a list', () => {
      const idiomWithExamples = getDummyIdiom({
        examples: [
          { example_id: 1, idiom_id: 1, example: 'The first example.' },
          { example_id: 2, idiom_id: 1, example: 'Another illustrative sentence.' },
        ],
      });
      renderComponent(idiomWithExamples);

      const listItems = screen.getAllByRole('listitem');

      expect(listItems).toHaveLength(2);
      expect(listItems[0]).toHaveTextContent('The first example.');
      expect(listItems[1]).toHaveTextContent('Another illustrative sentence.');
    });
    test('handles non-array examples gracefully', () => {
      const idiomWithBadExamples = getDummyIdiom({
        examples: null as unknown as Idiom['examples'],
      });

      renderComponent(idiomWithBadExamples);

      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
  });

  describe('Buttons for admins', () => {
    test('renders "Edit Idiom" button if roles includes "Admin"', () => {
      renderComponent(getDummyIdiom(), ['Admin']);

      expect(screen.getByRole('button', { name: /edit idiom/i })).toBeInTheDocument();
    });

    test('renders "Add Example" and "Edit Example" buttons if user is admin and examples exist', () => {
      renderComponent(getDummyIdiom(), ['Admin']);

      expect(screen.getByRole('button', { name: /add example/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /edit example/i })).toBeInTheDocument();
    });

    test('hides edit buttons if user is not an admin', () => {
      renderComponent(getDummyIdiom());

      expect(screen.queryByRole('button', { name: /edit idiom/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /add example/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /edit example/i })).not.toBeInTheDocument();
    });

    test('hides "Edit Example" button if no examples exist', () => {
      const idiomWithNoExamples = getDummyIdiom({
        examples: [],
      });
      renderComponent(idiomWithNoExamples);

      expect(screen.queryByRole('button', { name: /edit example/i })).not.toBeInTheDocument();
    });
  });

  describe('Buttons interaction', () => {
    test('clicking "Edit Idiom" calls openModal', () => {
      renderComponent(getDummyIdiom(), ['Admin']);

      fireEvent.click(screen.getByRole('button', { name: /edit idiom/i }));

      expect(mockOpenModal).toHaveBeenCalled();
    });

    test('clicking "Add Example" calls openAddExampleModal', () => {
      renderComponent(getDummyIdiom(), ['Admin']);

      fireEvent.click(screen.getByRole('button', { name: /add example/i }));

      expect(mockOpenAddExampleModal).toHaveBeenCalled();
    });

    test('clicking "Edit Example" calls openExampleModal', () => {
      renderComponent(getDummyIdiom(), ['Admin']);

      fireEvent.click(screen.getByRole('button', { name: /edit example/i }));

      expect(mockOpenExampleModal).toHaveBeenCalled();
    });
  });
});
