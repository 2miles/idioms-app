import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Swal from 'sweetalert2';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import UpdateIdiom from './UpdateIdiom';
import { IdiomsContext } from '@/context/idiomsContext';
import useAuthorizedIdiomFinder from '@/apis/useAuthorizedIdiomFinder';
import { suppressConsoleOutput } from '../../testUtils';

const DEBUG_ERRORS = false; // toggle this to `true` to see errors in this file

suppressConsoleOutput({ log: !DEBUG_ERRORS, error: !DEBUG_ERRORS });

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({})),
  },
}));

vi.mock('@/apis/useAuthorizedIdiomFinder', () => ({
  default: vi.fn(),
}));

const mockUpdateIdiom = vi.fn();
const mockClose = vi.fn();
const mockDelete = vi.fn();

const mockPut = vi.fn(() =>
  Promise.resolve({
    data: {
      data: {
        idiom: { id: 1, title: 'Dummy Idiom Title' },
      },
    },
  }),
);

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

beforeEach(() => {
  vi.clearAllMocks();
  (useAuthorizedIdiomFinder as unknown as { mockReturnValue: Function }).mockReturnValue(() => ({
    put: mockPut,
  }));
});

const renderComponent = () =>
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
      }}
    >
      <UpdateIdiom idiom={dummyIdiom} onClose={mockClose} onDelete={mockDelete} />
    </IdiomsContext.Provider>,
  );

describe('UpdateIdiom', () => {
  describe('Form behavior', () => {
    test('pre-fills form fields with provided idiom data', () => {
      renderComponent();
      expect(screen.getByLabelText('Title')).toHaveValue('Old Title');
    });

    test('does not submit if title is empty', async () => {
      renderComponent();
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: '' },
      });
      fireEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(mockPut).not.toHaveBeenCalled();
      });
    });

    test('includes updated timestamp if user changes it', async () => {
      renderComponent();
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'Updated Title' },
      });
      const allTextboxes = screen.getAllByRole('textbox');
      const datetimeInput = allTextboxes[3];
      fireEvent.change(datetimeInput, { target: { value: '2025-04-01 08:30:00' } });
      fireEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(mockPut).toHaveBeenCalledWith(
          '/1',
          expect.objectContaining({
            timestamps: expect.any(String),
          }),
        );
      });
    });
  });

  describe('Submission', () => {
    test('submits updated data correctly', async () => {
      renderComponent();
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'Updated Title' },
      });
      fireEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(mockPut).toHaveBeenCalledWith(
          '/1',
          expect.objectContaining({ title: 'Updated Title' }),
        );
        expect(mockUpdateIdiom).toHaveBeenCalled();
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
      (useAuthorizedIdiomFinder as unknown as { mockReturnValue: Function }).mockReturnValue(
        () => ({
          put: vi.fn(() => Promise.reject(new Error('Update failed'))),
        }),
      );

      renderComponent();
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'Updated Title' },
      });
      fireEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Error',
            text: 'There was a problem updating the idiom.',
            icon: 'error',
          }),
        );
      });
    });
  });

  describe('Deletion', () => {
    test('calls onDelete when Delete button is clicked', () => {
      renderComponent();
      fireEvent.click(screen.getByText(/delete/i));
      expect(mockDelete).toHaveBeenCalled();
    });
  });
});
