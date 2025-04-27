import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest'; // 👈 Import vi
import AddIdiom from './AddIdiom';
import { IdiomsContext } from '@/context/idiomsContext';
import useAuthorizedIdiomFinder from '@/apis/useAuthorizedIdiomFinder';

//Mocks
// First, mock sweetalert2 to avoid modal issues
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({})),
  },
}));

// Then, mock your authorized API function
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
  });
});

test('does not submit if title is empty', async () => {
  renderComponent();

  fireEvent.click(screen.getByText(/add/i));

  await waitFor(() => {
    expect(mockPost).not.toHaveBeenCalled();
  });
});
