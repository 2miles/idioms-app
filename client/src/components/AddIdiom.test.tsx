import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Swal from 'sweetalert2';
import { beforeEach, expect, test, vi } from 'vitest';
import AddIdiom from './AddIdiom';
import { IdiomsContext } from '@/context/idiomsContext';
import useAuthorizedIdiomFinder from '@/apis/useAuthorizedIdiomFinder';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({})),
  },
}));

vi.mock('@/apis/useAuthorizedIdiomFinder', () => ({
  default: vi.fn(),
}));

const mockAddIdioms = vi.fn();
const mockClose = vi.fn();
const mockPost = vi.fn(() =>
  Promise.resolve({
    data: {
      data: {
        idiom: { id: 1, title: 'Test Idiom' },
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
        addIdioms: mockAddIdioms,
        updateIdiom: vi.fn(),
        deleteIdiom: vi.fn(),
        updateExamples: vi.fn(),
        addExampleToIdiom: vi.fn(),
      }}
    >
      <AddIdiom onClose={mockClose} />
    </IdiomsContext.Provider>,
  );

test('submits form with valid data', async () => {
  renderComponent();

  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Idiom' } });

  fireEvent.click(screen.getByText(/add/i));

  await waitFor(() => {
    expect(mockPost).toHaveBeenCalledWith('/', expect.objectContaining({ title: 'Test Idiom' }));
    expect(mockAddIdioms).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Idiom Added!',
        text: 'The idiom has been successfully added.',
        icon: 'success',
      }),
    );
  });
});

test('does not submit if title is empty', async () => {
  renderComponent();

  fireEvent.click(screen.getByText(/add/i));

  await waitFor(() => {
    expect(mockPost).not.toHaveBeenCalled();
  });
});

test('includes a timestamp string when user does not edit timestamp', async () => {
  renderComponent();

  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Idiom' } });
  fireEvent.click(screen.getByText(/add/i));

  await waitFor(() => {
    expect(mockPost).toHaveBeenCalledWith(
      '/',
      expect.objectContaining({
        title: 'Test Idiom',
        timestamps: expect.any(String),
      }),
    );
  });
});

test('includes a timestamp string when user edits timestamp', async () => {
  renderComponent();

  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Idiom' } });

  const allTextboxes = screen.getAllByRole('textbox');
  const datetimeInput = allTextboxes[3];

  fireEvent.change(datetimeInput, { target: { value: '2025-01-01 12:00:00' } });

  fireEvent.click(screen.getByText(/add/i));

  await waitFor(() => {
    expect(mockPost).toHaveBeenCalledWith(
      '/',
      expect.objectContaining({
        timestamps: expect.any(String),
      }),
    );
  });
});

test('shows error alert when API request fails', async () => {
  (useAuthorizedIdiomFinder as unknown as { mockReturnValue: Function }).mockReturnValue(() => ({
    post: vi.fn(() => Promise.reject(new Error('API Failure'))), // Force error
  }));

  renderComponent();

  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Idiom' } });
  fireEvent.click(screen.getByText(/add/i));

  await waitFor(() => {
    // Check that SweetAlert2's fire method was called
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Error',
        text: 'There was a problem adding the idiom.',
        icon: 'error',
      }),
    );
  });
});
