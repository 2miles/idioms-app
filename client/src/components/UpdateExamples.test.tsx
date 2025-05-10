import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Swal from 'sweetalert2';
import { vi, test, expect, beforeEach, describe } from 'vitest';
import UpdateExamples from './UpdateExamples';
import { IdiomsContext } from '@/context/idiomsContext';
import useAuthorizedIdiomFinder from '@/apis/useAuthorizedIdiomFinder';
import { suppressConsoleOutput } from '../../testUtils';

const DEBUG_ERRORS = false; // toggle this to `true` to see errors in this file

suppressConsoleOutput({ log: !DEBUG_ERRORS, error: !DEBUG_ERRORS });

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
  },
}));

vi.mock('@/apis/useAuthorizedIdiomFinder', () => ({
  default: vi.fn(),
}));

const mockUpdateExamples = vi.fn();
const mockClose = vi.fn();
const mockPut = vi.fn();
const mockDelete = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  (useAuthorizedIdiomFinder as unknown as { mockReturnValue: Function }).mockReturnValue(() => ({
    put: mockPut.mockResolvedValue({
      data: {
        status: 'success',
        examples: dummyExamples,
      },
    }),
    delete: mockDelete.mockResolvedValue({}),
  }));
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
  timestamps: '',
  title_general: null,
  definition: null,
  contributor: null,
  position: null,
};

const renderComponent = () =>
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
      }}
    >
      <UpdateExamples idiomId={dummyIdiomId} examples={dummyExamples} onClose={mockClose} />
    </IdiomsContext.Provider>,
  );
describe('UpdateExamples', () => {
  describe('Form behavior', () => {
    test('user can type in example field but it does not trigger context update until submit', async () => {
      renderComponent();

      const textarea = screen.getByRole('textbox', { name: /edit example 1/i });

      fireEvent.change(textarea, { target: { value: 'Updated example 1' } });

      expect(mockUpdateExamples).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(mockUpdateExamples).toHaveBeenCalled();
      });
    });

    test('does not persist example changes if modal is closed without saving', () => {
      renderComponent();

      const textarea = screen.getByRole('textbox', { name: /edit example 1/i });

      fireEvent.change(textarea, { target: { value: 'Temporary edit' } });
      mockClose();

      expect(mockPut).not.toHaveBeenCalled();
      expect(mockUpdateExamples).not.toHaveBeenCalled();
    });

    test('shows warning if any example is empty', async () => {
      renderComponent();

      const textarea = screen.getByRole('textbox', { name: /edit example 1/i });

      fireEvent.change(textarea, { target: { value: '' } });
      fireEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            text: 'All examples must have text.',
            icon: 'warning',
          }),
        );
        expect(mockPut).not.toHaveBeenCalled();
      });
    });

    test('shows warning and does not save if example is empty', async () => {
      renderComponent();

      const textarea = screen.getByRole('textbox', { name: /edit example 1/i });

      fireEvent.change(textarea, { target: { value: '' } });
      fireEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            text: 'All examples must have text.',
            icon: 'warning',
          }),
        );
        expect(mockPut).not.toHaveBeenCalled();
      });
    });
  });
  describe('Submission', () => {
    test('submits examples and shows success alert', async () => {
      renderComponent();

      fireEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(mockPut).toHaveBeenCalledWith(`/${dummyIdiomId}/examples`, {
          examples: dummyExamples,
        });
        expect(mockUpdateExamples).toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Updated!',
            icon: 'success',
          }),
        );
        expect(mockClose).toHaveBeenCalled();
      });
    });
    test('shows error alert on API failure', async () => {
      mockPut.mockRejectedValueOnce(new Error('Update failed'));
      renderComponent();

      fireEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Error',
            text: 'There was a problem updating the examples.',
            icon: 'error',
          }),
        );
      });
    });
  });
  describe('Deletion', () => {
    test('deletes example when confirmed', async () => {
      renderComponent();

      fireEvent.click(screen.getAllByText(/delete/i)[0]);

      await waitFor(() => {
        expect(mockDelete).toHaveBeenCalledWith('/examples/1');
        expect(mockUpdateExamples).toHaveBeenCalledWith(dummyIdiomId, [
          { example_id: 2, idiom_id: dummyIdiomId, example: 'Original example 2' },
        ]);
      });
    });

    test('shows error alert on delete failure', async () => {
      mockDelete.mockRejectedValueOnce(new Error('Delete failed'));
      renderComponent();

      fireEvent.click(screen.getAllByText(/delete/i)[0]);

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
      renderComponent();

      fireEvent.click(screen.getAllByText(/delete/i)[0]);

      await waitFor(() => {
        expect(mockDelete).toHaveBeenCalledWith('/examples/1');
        expect(mockUpdateExamples).toHaveBeenCalled();
      });
    });
  });
});
