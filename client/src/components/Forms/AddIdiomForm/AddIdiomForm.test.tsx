import { beforeEach, describe, expect, test, vi } from 'vitest'; // Core Vitest tools for running, organizing, and mocking tests

import { fireEvent, render, screen, waitFor } from '@testing-library/react'; // Simulate and interact with the React component like a user would

import useAuthorizedIdiomFinder from '@/apis/useAuthorizedIdiomFinder'; // Cusotm hook used inside AddIdiom to call the API. We need to control it
import { IdiomsContext } from '@/context/idiomsContext'; // AddIdiom uses it (via useContext) and needs it for testing
import { showError, showSuccess } from '@/utils/alerts';
import { suppressConsoleOutput } from '@/utils/testUtils';

import AddIdiomForm from './AddIdiomForm'; // The component your testing

const DEBUG_ERRORS = false; // toggle this to `true` to see errors in this file

suppressConsoleOutput({ log: !DEBUG_ERRORS, error: !DEBUG_ERRORS });

// Mocks
// We dont want real popups or API calls in tests, we want to spy on Swal.fire and API calls.
// Replace Swal.fire with a vi.fn() spy
// Replace API calls with a vi.fn() that returns a fake post() function

vi.mock('@/utils/alerts', () => ({
  showSuccess: vi.fn(),
  showError: vi.fn(),
}));

vi.mock('@/apis/useAuthorizedIdiomFinder', () => ({
  default: vi.fn(),
}));

const mockAddIdiom = vi.fn(); // Fake function to simulate the context addIdiom()
const mockClose = vi.fn(); // Fake onClose callback passed into AddIdiom props
const mockPost = vi.fn(() =>
  // Fake API call that succeeds by default (but we can override it to fail)
  Promise.resolve({
    data: {
      data: {
        idiom: { id: 1, title: 'Dummy Idiom Title' },
      },
    },
  }),
);

beforeEach(() => {
  vi.clearAllMocks(); // Reset spy call history between tests so tests dont affect each other
  (useAuthorizedIdiomFinder as unknown as { mockReturnValue: Function }).mockReturnValue(() => ({
    post: mockPost,
  })); // Every time you render, make sure the fake API returns mockPost
});

// Render AddIdiom inside a fake IdiomsContext.Provider
// Give it mock functions for everything it expects
// This simulates what your real app would do — without needing the whole app running
// The render() gives you a real DOM to interact with inside the test.
const renderComponent = () =>
  render(
    <IdiomsContext.Provider
      value={{
        idioms: [],
        setIdioms: vi.fn(),
        addIdiom: mockAddIdiom,
        updateIdiom: vi.fn(),
        deleteIdiom: vi.fn(),
        updateExamples: vi.fn(),
        addExampleToIdiom: vi.fn(),
        deleteExampleById: vi.fn(),
        isLoading: false,
        hasFetched: true, // Set hasFetched to true so the form renders
      }}
    >
      <AddIdiomForm onClose={mockClose} />
    </IdiomsContext.Provider>,
  );

describe('AddIdiom', () => {
  describe('Form behavior', () => {
    test('does not submit if title is empty', async () => {
      renderComponent();
      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(mockPost).not.toHaveBeenCalled();
      });
    });

    test('includes a timestamp string when user edits timestamp', async () => {
      mockAddIdiom.mockResolvedValue({ id: 1, title: 'Test Idiom' });
      renderComponent();

      fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Idiom' } });

      const allTextboxes = screen.getAllByRole('textbox');
      const datetimeInput = allTextboxes[3]; // Index depends on your form layout
      fireEvent.change(datetimeInput, { target: { value: '2025-01-01 12:00:00' } });

      fireEvent.click(screen.getByText(/add/i));

      const expectedTimestamp = new Date('2025-01-01T12:00:00').toISOString().split('.')[0] + 'Z';
      await waitFor(() => {
        expect(mockAddIdiom).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Test Idiom',
            timestamps: expectedTimestamp,
          }),
        );
      });
    });

    test('includes a timestamp string when user does not edit timestamp', async () => {
      mockAddIdiom.mockResolvedValue({ id: 1, title: 'Test Idiom' });
      renderComponent();
      fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Idiom' } });
      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(mockAddIdiom).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Test Idiom',
            timestamps: expect.any(String),
          }),
        );
      });
    });

    test('does not close modal if Keep Open is checked', async () => {
      mockAddIdiom.mockResolvedValue({ id: 1, title: 'This is a test idiom.' });
      renderComponent();

      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'This is a test idiom.' },
      });

      fireEvent.click(screen.getByLabelText(/keep open/i)); // Check the "Keep Open" box
      fireEvent.click(screen.getByText(/add/i)); // Submit the form

      await waitFor(() => {
        expect(mockAddIdiom).toHaveBeenCalled();
        expect(mockClose).not.toHaveBeenCalled(); // Should not close modal
      });
    });

    test('does not submit if idiom title is only whitespace', async () => {
      renderComponent();

      fireEvent.change(screen.getByLabelText('Title'), { target: { value: '   ' } });

      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(mockPost).not.toHaveBeenCalled();
      });
    });
  });

  describe('Submission', () => {
    test('submits form with valid data', async () => {
      mockAddIdiom.mockResolvedValue({ id: 1, title: 'Test idiom' });
      renderComponent();
      fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test idiom' } });
      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(mockAddIdiom).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test idiom' }));
        expect(showSuccess).toHaveBeenCalled();
      });
    });

    test('shows error alert when API request fails', async () => {
      mockAddIdiom.mockResolvedValue(null);
      renderComponent();
      fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Idiom' } });
      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(showError).toHaveBeenCalled();
      });
    });

    test('closes modal if Keep Open is not checked', async () => {
      mockAddIdiom.mockResolvedValue({ id: 1, title: 'This is a test idiom.' });
      renderComponent();

      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'This is a test idiom.' },
      });

      fireEvent.click(screen.getByText(/add/i));

      await waitFor(() => {
        expect(mockClose).toHaveBeenCalled();
      });
    });
  });
});
