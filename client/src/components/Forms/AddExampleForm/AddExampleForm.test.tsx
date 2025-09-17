import Swal from 'sweetalert2';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { IdiomsContext } from '@/context/idiomsContext';
import { suppressConsoleOutput } from '@/utils/testUtils';

import AddExampleForm from './AddExampleForm';

const DEBUG_ERRORS = false;
suppressConsoleOutput({ log: !DEBUG_ERRORS, error: !DEBUG_ERRORS });

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({})),
  },
}));

const mockAddExampleToIdiom = vi.fn();
const mockClose = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  mockAddExampleToIdiom.mockResolvedValue({
    example_id: 1,
    idiom_id: 1,
    example: 'Another example',
  });
});

function setup() {
  render(
    <IdiomsContext.Provider
      value={{
        idioms: [],
        setIdioms: vi.fn(),
        addIdiom: vi.fn(),
        updateIdiom: vi.fn(),
        deleteIdiom: vi.fn(),
        updateExamples: vi.fn(),
        addExampleToIdiom: mockAddExampleToIdiom,
        deleteExampleById: vi.fn(),
        isLoading: false,
        hasFetched: true, // Set hasFetched to true so the form renders
      }}
    >
      <AddExampleForm idiomId={1} idiomTitle='Break the ice' onClose={mockClose} />
    </IdiomsContext.Provider>,
  );

  return {
    exampleInput: screen.getByLabelText(/new example/i),
    addButton: screen.getByText(/add/i),
    keepOpenCheckbox: screen.getByLabelText(/keep open/i),
  };
}

describe('AddExample', () => {
  describe('Form behavior', () => {
    test('does not submit if example is empty', async () => {
      const { addButton } = setup();

      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mockAddExampleToIdiom).not.toHaveBeenCalled();
      });
    });

    test('clears input after successful submission', async () => {
      const { addButton, exampleInput } = setup();

      fireEvent.change(exampleInput, { target: { value: 'This is a test example.' } });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(exampleInput).toHaveValue('');
      });
    });

    test('does not close modal if Keep Open is checked', async () => {
      const { addButton, exampleInput, keepOpenCheckbox } = setup();

      fireEvent.change(exampleInput, { target: { value: 'This is an example.' } });
      fireEvent.click(keepOpenCheckbox);
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mockAddExampleToIdiom).toHaveBeenCalledWith(1, 'This is an example.');
        expect(mockClose).not.toHaveBeenCalled();
      });
    });

    test('does not submit if example is only whitespace', async () => {
      const { addButton, exampleInput } = setup();

      fireEvent.change(exampleInput, { target: { value: '   ' } });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mockAddExampleToIdiom).not.toHaveBeenCalled();
        expect(mockClose).not.toHaveBeenCalled();
      });
    });
  });

  describe('Submission', () => {
    test('submits form with valid data', async () => {
      const { addButton, exampleInput } = setup();

      fireEvent.change(exampleInput, { target: { value: 'This is a test example.' } });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mockAddExampleToIdiom).toHaveBeenCalledWith(1, 'This is a test example.');
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Example Added!',
            text: 'The example has been successfully added.',
            icon: 'success',
          }),
        );
        expect(exampleInput).toHaveValue('');
      });
    });
  });

  describe('Error handling', () => {
    test('shows error alert when addExampleToIdiom fails', async () => {
      mockAddExampleToIdiom.mockImplementation(() => Promise.resolve(null)); // Simulate failure

      const { addButton, exampleInput } = setup();

      fireEvent.change(exampleInput, { target: { value: 'This is an example.' } });
      fireEvent.click(addButton);

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
      vi.useFakeTimers();

      const { addButton, exampleInput } = setup();

      fireEvent.change(exampleInput, { target: { value: 'Another example' } });
      fireEvent.click(addButton);

      await vi.runAllTimersAsync();

      expect(mockClose).toHaveBeenCalled();

      vi.useRealTimers();
    });
  });
});
