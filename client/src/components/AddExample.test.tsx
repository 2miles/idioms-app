import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Swal from 'sweetalert2';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import AddExample from './AddExample';
import { IdiomsContext } from '@/context/idiomsContext';
import useAuthorizedIdiomFinder from '@/apis/useAuthorizedIdiomFinder';
import { suppressConsoleOutput } from '../../testUtils';

const DEBUG_ERRORS = false;
suppressConsoleOutput({ log: !DEBUG_ERRORS, error: !DEBUG_ERRORS });

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({})),
  },
}));

vi.mock('@/apis/useAuthorizedIdiomFinder', () => ({
  default: vi.fn(),
}));

const mockAddExampleToIdiom = vi.fn();
const mockClose = vi.fn();
const mockPost = vi.fn(() =>
  Promise.resolve({
    data: {
      data: {
        example: { example_id: 1, example: 'New example sentence.' },
      },
    },
  }),
);

beforeEach(() => {
  vi.clearAllMocks();
  (useAuthorizedIdiomFinder as unknown as { mockReturnValue: Function }).mockReturnValue(() => ({
    post: mockPost,
  }));
});

const renderComponent = () =>
  render(
    <IdiomsContext.Provider
      value={{
        idioms: [],
        setIdioms: vi.fn(),
        addIdioms: vi.fn(),
        updateIdiom: vi.fn(),
        deleteIdiom: vi.fn(),
        updateExamples: vi.fn(),
        addExampleToIdiom: mockAddExampleToIdiom,
      }}
    >
      <AddExample idiomId={1} idiomTitle='Break the ice' onClose={mockClose} />
    </IdiomsContext.Provider>,
  );

describe('AddExample', () => {
  describe('Form behavior', () => {
    test('does not submit if example is empty', async () => {
      renderComponent();

      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(mockPost).not.toHaveBeenCalled();
      });
    });
    test('clears input after successful submission', async () => {
      renderComponent();

      const input = screen.getByLabelText(/new example/i);

      fireEvent.change(input, { target: { value: 'This is a test example.' } });
      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });
    test('does not close modal if Keep Open is checked', async () => {
      renderComponent();

      fireEvent.change(screen.getByLabelText(/new example/i), {
        target: { value: 'This is an example.' },
      });

      fireEvent.click(screen.getByLabelText(/keep open/i));

      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(mockPost).toHaveBeenCalled();
        expect(mockAddExampleToIdiom).toHaveBeenCalled();
        expect(mockClose).not.toHaveBeenCalled();
      });
    });

    test('does not submit if example is only whitespace', async () => {
      renderComponent();

      fireEvent.change(screen.getByLabelText(/new example/i), {
        target: { value: '   ' },
      });

      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(mockPost).not.toHaveBeenCalled();
      });
    });
  });

  describe('Submission', () => {
    test('submits form with valid data', async () => {
      renderComponent();

      fireEvent.change(screen.getByLabelText(/new example/i), {
        target: { value: 'This is a test example.' },
      });

      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith(
          '/1/examples',
          expect.objectContaining({
            example: 'This is a test example.',
          }),
        );

        expect(mockAddExampleToIdiom).toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Example Added!',
            text: 'The example has been successfully added.',
            icon: 'success',
          }),
        );
      });
    });
  });

  describe('Error handling', () => {
    test('shows error alert when API request fails', async () => {
      (useAuthorizedIdiomFinder as unknown as { mockReturnValue: Function }).mockReturnValue(
        () => ({
          post: vi.fn(() => Promise.reject(new Error('API Failure'))), // Force error
        }),
      );

      renderComponent(); // your helper that wraps in context, etc.

      fireEvent.change(screen.getByLabelText(/new example/i), {
        target: { value: 'This is an example.' },
      });

      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Error',
            text: 'There was a problem adding the example.',
            icon: 'error',
          }),
        );
      });
    });
    test('closes modal if Keep Open is not checked', async () => {
      renderComponent();

      fireEvent.change(screen.getByLabelText(/new example/i), {
        target: { value: 'Another example' },
      });

      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(mockClose).toHaveBeenCalled();
      });
    });
  });
});
