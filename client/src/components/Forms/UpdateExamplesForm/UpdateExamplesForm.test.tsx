import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Swal from 'sweetalert2';
import { vi, test, expect, beforeEach, describe } from 'vitest';
import UpdateExamplesForm from './UpdateExamplesForm';
import { IdiomsContext } from '@/context/idiomsContext';
import { suppressConsoleOutput } from '../../../../testUtils';
import { Idiom } from '@/types';

const DEBUG_ERRORS = false;
suppressConsoleOutput({ log: !DEBUG_ERRORS, error: !DEBUG_ERRORS });

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const dummyIdiomId = 123;

const dummyExamples = [
  { example_id: 1, idiom_id: dummyIdiomId, example: 'Original example 1' },
  { example_id: 2, idiom_id: dummyIdiomId, example: 'Original example 2' },
];

const dummyIdiom = {
  id: dummyIdiomId,
  title: 'Test Idiom',
  examples: dummyExamples,
} as Idiom;

const mockUpdateExamples = vi.fn();
const mockDeleteExampleById = vi.fn().mockResolvedValue(dummyExamples[0]);
const mockClose = vi.fn();

function setup() {
  render(
    <IdiomsContext.Provider
      value={{
        idioms: [dummyIdiom],
        setIdioms: vi.fn(),
        addIdioms: vi.fn(),
        updateIdiom: vi.fn(),
        deleteIdiom: vi.fn(),
        updateExamples: mockUpdateExamples,
        addExampleToIdiom: vi.fn(),
        deleteExampleById: mockDeleteExampleById,
      }}
    >
      <UpdateExamplesForm idiomId={dummyIdiomId} examples={dummyExamples} onClose={mockClose} />
    </IdiomsContext.Provider>,
  );

  return {
    mockUpdateExamples,
    mockClose,
    mockDeleteExampleById,
    exampleInput1: screen.getByRole('textbox', { name: /edit example 1/i }),
    saveButton: screen.getByText(/save/i),
    deleteButton1: screen.getAllByText(/delete/i)[0],
  };
}

// --- Tests ---
describe('UpdateExamples', () => {
  describe('Form behavior', () => {
    test('user can type in example field but it does not trigger context update until submit', async () => {
      const { exampleInput1, saveButton } = setup();

      fireEvent.change(exampleInput1, { target: { value: 'Updated example 1' } });
      expect(mockUpdateExamples).not.toHaveBeenCalled();

      fireEvent.click(saveButton);
      await waitFor(() => {
        expect(mockUpdateExamples).toHaveBeenCalled();
      });
    });

    test('does not persist example changes if modal is closed without saving', () => {
      const { exampleInput1 } = setup();
      fireEvent.change(exampleInput1, { target: { value: 'Temporary edit' } });

      mockClose();
      expect(mockUpdateExamples).not.toHaveBeenCalled();
    });

    test('shows warning and does not save if example is empty', async () => {
      const { exampleInput1, saveButton } = setup();
      fireEvent.change(exampleInput1, { target: { value: '' } });

      fireEvent.click(saveButton);
      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            text: 'All examples must have text.',
            icon: 'warning',
          }),
        );
        expect(mockUpdateExamples).not.toHaveBeenCalled();
      });
    });
  });

  describe('Submission', () => {
    test('submits examples and shows success alert', async () => {
      mockUpdateExamples.mockResolvedValueOnce({});
      const { saveButton } = setup();

      fireEvent.click(saveButton);
      await waitFor(() => {
        expect(mockUpdateExamples).toHaveBeenCalledWith(dummyIdiomId, dummyExamples);
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Updated!',
            icon: 'success',
          }),
        );
        expect(mockClose).toHaveBeenCalled();
      });
    });

    test('shows error alert on updateExamples failure', async () => {
      mockUpdateExamples.mockRejectedValueOnce(new Error('Update failed'));
      const { saveButton } = setup();

      fireEvent.click(saveButton);
      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Error',
            text: 'There was a problem updating the examples.',
            icon: 'error',
          }),
        );
      });
      expect(mockUpdateExamples).toHaveBeenCalled();
    });
  });

  describe('Deletion', () => {
    test('deletes example when confirmed', async () => {
      const { deleteButton1 } = setup();
      fireEvent.click(deleteButton1);

      await waitFor(() => {
        expect(mockDeleteExampleById).toHaveBeenCalledWith(dummyIdiom.examples[0].example_id);
        expect(mockUpdateExamples).toHaveBeenCalledWith(dummyIdiom.id, [dummyIdiom.examples[1]]);
      });
    });

    test('shows error alert on delete failure', async () => {
      mockDeleteExampleById.mockRejectedValueOnce(new Error('Delete failed'));
      const { deleteButton1 } = setup();

      fireEvent.click(deleteButton1);
      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Error',
            text: 'There was a problem deleting the example.',
            icon: 'error',
          }),
        );
      });
    });

    test('deletes example immediately after confirming delete prompt', async () => {
      const { deleteButton1 } = setup();
      fireEvent.click(deleteButton1);

      await waitFor(() => {
        expect(mockDeleteExampleById).toHaveBeenCalledWith(1);
        expect(mockUpdateExamples).toHaveBeenCalledWith(dummyIdiomId, [dummyExamples[1]]);
      });
    });
  });
});
