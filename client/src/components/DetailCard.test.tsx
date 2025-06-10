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

const dummyIdiom: Idiom = {
  id: 1,
  title: 'Break the ice',
  title_general: null,
  definition: 'To initiate social interactions.',
  contributor: 'John Doe',
  timestamps: '2024-05-01T08:00:00Z',
  position: 42,
  examples: [{ example_id: 1, idiom_id: 1, example: 'He told a joke to break the ice.' }],
};

function setup(idiom: Idiom = dummyIdiom, roles: string[] = []) {
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
  return {
    idiom,
    mockOpenModal,
    mockOpenAddExampleModal,
    mockOpenExampleModal,
    editIdiomButton: screen.queryByRole('button', { name: /edit idiom/i }),
    addExampleButton: screen.queryByRole('button', { name: /add example/i }),
    editExampleButton: screen.queryByRole('button', { name: /edit example/i }),
    timestamp: screen.getByTestId('timestamp'),
    contributor: screen.getByTestId('contributor'),
    exampleList: screen.queryAllByRole('listitem'),
  };
}

describe('DetailCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Idiom content', () => {
    test('renders idiom.title when title_general is null or empty', () => {
      setup({ ...dummyIdiom, title_general: null });
      expect(screen.getByText(/"Break the ice"/)).toBeInTheDocument();
    });

    test('renders title_general if present and non-empty', () => {
      setup({ ...dummyIdiom, title_general: 'General Title' });
      expect(screen.getByText(/General Title/)).toBeInTheDocument();
    });

    test('renders formatted timestamp', () => {
      const { timestamp } = setup();
      expect(timestamp).toHaveTextContent('Added: 05-01-24');
    });

    test('renders contributor if available', () => {
      const { contributor } = setup();
      expect(contributor).toHaveTextContent('by John Doe');
    });

    test('renders definition if available', () => {
      setup();
      expect(screen.getByText(/To initiate social interactions./)).toBeInTheDocument();
    });

    test('renders all example sentences in a list', () => {
      const { exampleList } = setup({
        ...dummyIdiom,
        examples: [
          { example_id: 1, idiom_id: 1, example: 'The first example.' },
          { example_id: 2, idiom_id: 1, example: 'Another illustrative sentence.' },
        ],
      });

      expect(exampleList).toHaveLength(2);
      expect(exampleList[0]).toHaveTextContent('The first example.');
      expect(exampleList[1]).toHaveTextContent('Another illustrative sentence.');
    });

    test('handles non-array examples gracefully', () => {
      const { exampleList } = setup({
        ...dummyIdiom,
        examples: null as unknown as Idiom['examples'],
      });
      expect(exampleList).toHaveLength(0);
    });
  });

  describe('Buttons for admins', () => {
    test('renders "Edit Idiom" button if roles includes "Admin"', () => {
      const { editIdiomButton } = setup(dummyIdiom, ['Admin']);
      expect(editIdiomButton).toBeInTheDocument();
    });

    test('renders "Add Example" and "Edit Example" buttons for admin users', () => {
      const { addExampleButton, editExampleButton } = setup(dummyIdiom, ['Admin']);
      expect(addExampleButton).toBeInTheDocument();
      expect(editExampleButton).toBeInTheDocument();
    });

    test('hides admin buttons for non-admins', () => {
      const { editExampleButton, addExampleButton, editIdiomButton } = setup();
      expect(editIdiomButton).not.toBeInTheDocument();
      expect(addExampleButton).not.toBeInTheDocument();
      expect(editExampleButton).not.toBeInTheDocument();
    });

    test('hides "Edit Example" button if no examples exist', () => {
      const { editExampleButton } = setup({ ...dummyIdiom, examples: [] }, ['Admin']);
      expect(editExampleButton).not.toBeInTheDocument();
    });
  });

  describe('Buttons interaction', () => {
    test('clicking "Edit Idiom" calls openModal', () => {
      const { editIdiomButton } = setup(dummyIdiom, ['Admin']);
      fireEvent.click(editIdiomButton!);
      expect(mockOpenModal).toHaveBeenCalled();
    });

    test('clicking "Add Example" calls openAddExampleModal', () => {
      const { addExampleButton } = setup(dummyIdiom, ['Admin']);
      fireEvent.click(addExampleButton!);
      expect(mockOpenAddExampleModal).toHaveBeenCalled();
    });

    test('clicking "Edit Example" calls openExampleModal', () => {
      const { editExampleButton } = setup(dummyIdiom, ['Admin']);
      fireEvent.click(editExampleButton!);
      expect(mockOpenExampleModal).toHaveBeenCalled();
    });
  });
});
