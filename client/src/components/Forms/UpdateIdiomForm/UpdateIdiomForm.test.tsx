import { beforeEach, describe, expect, test, vi } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { IdiomsContext } from '@/context/idiomsContext';
import { showError, showSuccess } from '@/utils/alerts';
import { suppressConsoleOutput } from '@/utils/testUtils';

import UpdateIdiom from './UpdateIdiomForm';

const DEBUG_ERRORS = false;
suppressConsoleOutput({ log: !DEBUG_ERRORS, error: !DEBUG_ERRORS });

vi.mock('@/utils/alerts', () => ({
  showSuccess: vi.fn(),
  showError: vi.fn(),
}));

const mockUpdateIdiom = vi.fn().mockResolvedValue({ id: 1, title: 'Updated Title' });
const mockClose = vi.fn();
const mockDelete = vi.fn();
const mockUpsertOrigin = vi.fn();
const mockDeleteOrigin = vi.fn();
const mockOpenAddExampleModal = vi.fn();
const mockOpenExampleModal = vi.fn();

const dummyIdiom = {
  id: 1,
  title: 'Old Title',
  title_general: '',
  definition: '',
  contributor: '',
  timestamps: '2025-01-01T12:00:00Z',
  position: 0,
  examples: [] as { example_id: number; idiom_id: number; example: string }[],
  origin: null as {
    id: number;
    idiom_id: number;
    origin_text: string;
    model: string;
    updated_at: string;
  } | null,
};

type DummyIdiom = typeof dummyIdiom;

function renderWithContext(idiomOverrides: Partial<DummyIdiom> = {}) {
  const idiom = { ...dummyIdiom, ...idiomOverrides };

  render(
    <IdiomsContext.Provider
      value={{
        idioms: [],
        setIdioms: vi.fn(),
        addIdiom: vi.fn(),
        updateIdiom: mockUpdateIdiom,
        deleteIdiom: vi.fn(),
        updateExamples: vi.fn(),
        addExampleToIdiom: vi.fn(),
        deleteExampleById: vi.fn(),
        upsertOrigin: mockUpsertOrigin,
        deleteOrigin: mockDeleteOrigin,
        isLoading: false,
        hasFetched: true,
      }}
    >
      <UpdateIdiom
        idiom={idiom}
        onClose={mockClose}
        onDelete={mockDelete}
        onOpenAddExample={mockOpenAddExampleModal}
        onOpenEditExamples={mockOpenExampleModal}
      />
    </IdiomsContext.Provider>,
  );

  return {
    idiom,
    titleInput: screen.getByLabelText('Title'),
    saveButton: screen.getByText(/save/i),
    deleteButton: screen.getByText(/delete/i),
    //saveButton: screen.getByRole('button', { name: /save/i }),
    //deleteButton: screen.getByRole('button', { name: /delete/i }),
  };
}

describe('UpdateIdiomForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Form behavior', () => {
    test('pre-fills form fields with provided idiom data', () => {
      const { titleInput } = renderWithContext();
      expect(titleInput).toHaveValue('Old Title');
    });
    test('pre-fills origin field when origin_text is provided', () => {
      renderWithContext({
        origin: {
          id: 666,
          idiom_id: 1,
          origin_text: 'Existing origin text',
          model: 'gpt-5.1', // or 'manual' if you prefer
          updated_at: '2025-01-01T00:00:00Z', // any ISO string is fine
        },
      });

      // adjust label text to whatever you used in the component
      const originInput = screen.getByLabelText(/origin/i);
      expect(originInput).toHaveValue('Existing origin text');
    });

    test('does not submit if title is empty', async () => {
      const { titleInput, saveButton } = renderWithContext();
      fireEvent.change(titleInput, { target: { value: '' } });

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateIdiom).not.toHaveBeenCalled();
      });
    });

    test('includes updated timestamp if user changes it', async () => {
      const { titleInput, saveButton } = renderWithContext();
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

      const allTextboxes = screen.getAllByRole('textbox');
      const datetimeInput = allTextboxes[3];

      fireEvent.change(datetimeInput, { target: { value: '2025-04-01 08:30:00' } });

      // // This assumes you give the datetime input a test id like data-testid="timestamp-input"
      // const datetimeInput = screen.getByTestId('timestamp-input');
      // fireEvent.change(datetimeInput, { target: { value: '2025-04-01 08:30:00' } });

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateIdiom).toHaveBeenCalledWith(
          1,
          expect.objectContaining({
            timestamps: expect.any(String),
          }),
        );
      });
    });

    test('includes updated origin_text when user edits the origin field', async () => {
      renderWithContext({
        origin: {
          id: 123,
          idiom_id: 1,
          origin_text: 'Old origin',
          model: 'manual',
          updated_at: '2024-01-01T00:00:00Z',
        },
      });

      const originInput = screen.getByLabelText(/origin/i);
      fireEvent.change(originInput, { target: { value: 'Updated origin text' } });

      fireEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(mockUpdateIdiom).toHaveBeenCalled();
        expect(mockUpsertOrigin).toHaveBeenCalledWith(1, {
          origin_text: 'Updated origin text',
          model: 'manual',
        });
      });
    });
  });

  describe('Submission', () => {
    test('submits updated data correctly', async () => {
      const { titleInput, saveButton } = renderWithContext();
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateIdiom).toHaveBeenCalledWith(
          1,
          expect.objectContaining({ title: 'Updated Title' }),
        );

        expect(showSuccess).toHaveBeenCalled();
        expect(mockClose).toHaveBeenCalled();
      });
    });

    test('shows error alert if API call fails', async () => {
      mockUpdateIdiom.mockRejectedValueOnce(new Error('Update failed'));
      const { titleInput, saveButton } = renderWithContext();
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(showError).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockUpdateIdiom).toHaveBeenCalled();
      });
    });
  });

  // describe('Examples buttons', () => {
  //   test('shows "Add Example" button when no examples exist', () => {
  //     renderWithContext({ examples: [] });

  //     // match whatever label you’re using, e.g. "Add Ex." / "Add Example"
  //     const addExampleButton = screen.getByRole('button', { name: /add ex/i });
  //     expect(addExampleButton).toBeInTheDocument();

  //     // if "Edit Example(s)" is hidden in this case:
  //     const editExampleButton = screen.queryByRole('button', { name: /edit ex/i });
  //     expect(editExampleButton).not.toBeInTheDocument();
  //   });

  //   test('shows "Edit Example" button when examples exist', () => {
  //     renderWithContext({
  //       examples: [{ example_id: 1, idiom_id: 1, example: 'An example sentence.' }],
  //     });

  //     const editExampleButton = screen.getByRole('button', { name: /edit ex/i });
  //     expect(editExampleButton).toBeInTheDocument();
  //   });

  //   test('clicking "Add Example" calls onOpenAddExample', () => {
  //     renderWithContext({ examples: [] });

  //     const addExampleButton = screen.getByRole('button', { name: /add ex/i });
  //     fireEvent.click(addExampleButton);

  //     expect(mockOpenAddExampleModal).toHaveBeenCalled();
  //   });

  //   test('clicking "Edit Example" calls onOpenEditExamples', () => {
  //     renderWithContext({
  //       examples: [{ example_id: 1, idiom_id: 1, example: 'An example sentence.' }],
  //     });

  //     const editExampleButton = screen.getByRole('button', { name: /edit ex/i });
  //     fireEvent.click(editExampleButton);

  //     expect(mockOpenExampleModal).toHaveBeenCalled();
  //   });
  // });

  describe('Deletion', () => {
    test('calls onDelete when Delete button is clicked', () => {
      const { deleteButton } = renderWithContext();
      fireEvent.click(deleteButton);
      expect(mockDelete).toHaveBeenCalled();
    });
  });
});
