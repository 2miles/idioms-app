import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Swal from 'sweetalert2';
import { describe, expect, test, vi } from 'vitest';
import UpdateIdiom from './UpdateIdiomForm';
import { IdiomsContext } from '@/context/idiomsContext';
import { suppressConsoleOutput } from '../../../../testUtils';

const DEBUG_ERRORS = false;
suppressConsoleOutput({ log: !DEBUG_ERRORS, error: !DEBUG_ERRORS });

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({})),
  },
}));

const mockUpdateIdiom = vi.fn().mockResolvedValue({ id: 1, title: 'Updated Title' });
const mockClose = vi.fn();
const mockDelete = vi.fn();

const dummyIdiom = {
  id: 1,
  title: 'Old Title',
  title_general: '',
  definition: '',
  contributor: '',
  timestamps: '2025-01-01T12:00:00Z',
  position: 0,
  examples: [],
};

function setup() {
  render(
    <IdiomsContext.Provider
      value={{
        idioms: [],
        setIdioms: vi.fn(),
        addIdioms: vi.fn(),
        updateIdiom: mockUpdateIdiom,
        deleteIdiom: vi.fn(),
        updateExamples: vi.fn(),
        addExampleToIdiom: vi.fn(),
        deleteExampleById: vi.fn(),
      }}
    >
      <UpdateIdiom idiom={dummyIdiom} onClose={mockClose} onDelete={mockDelete} />
    </IdiomsContext.Provider>,
  );

  return {
    mockUpdateIdiom,
    mockClose,
    mockDelete,
    titleInput: screen.getByLabelText('Title'),
    saveButton: screen.getByText(/save/i),
    deleteButton: screen.getByText(/delete/i),
  };
}

describe('UpdateIdiom', () => {
  describe('Form behavior', () => {
    test('pre-fills form fields with provided idiom data', () => {
      const { titleInput } = setup();
      expect(titleInput).toHaveValue('Old Title');
    });

    test('does not submit if title is empty', async () => {
      const { titleInput, saveButton } = setup();
      fireEvent.change(titleInput, { target: { value: '' } });

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateIdiom).not.toHaveBeenCalled();
      });
    });

    test('includes updated timestamp if user changes it', async () => {
      const { titleInput, saveButton } = setup();
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

      const allTextboxes = screen.getAllByRole('textbox');
      const datetimeInput = allTextboxes[3];

      fireEvent.change(datetimeInput, { target: { value: '2025-04-01 08:30:00' } });

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
  });

  describe('Submission', () => {
    test('submits updated data correctly', async () => {
      const { titleInput, saveButton } = setup();
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateIdiom).toHaveBeenCalledWith(
          1,
          expect.objectContaining({ title: 'Updated Title' }),
        );

        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Updated!',
            text: 'The idiom has been successfully updated.',
            icon: 'success',
          }),
        );

        expect(mockClose).toHaveBeenCalled();
      });
    });

    test('shows error alert if API call fails', async () => {
      mockUpdateIdiom.mockRejectedValueOnce(new Error('Update failed'));
      const { titleInput, saveButton } = setup();
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Error',
            text: 'There was a problem updating the idiom.',
            icon: 'error',
          }),
        );
      });

      await waitFor(() => {
        expect(mockUpdateIdiom).toHaveBeenCalled();
      });
    });
  });

  describe('Deletion', () => {
    test('calls onDelete when Delete button is clicked', () => {
      const { deleteButton } = setup();
      fireEvent.click(deleteButton);
      expect(mockDelete).toHaveBeenCalled();
    });
  });
});
