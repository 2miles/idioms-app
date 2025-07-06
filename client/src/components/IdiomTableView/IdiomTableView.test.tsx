import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import TableSection from './IdiomTableView';
import { IdiomsContext } from '@/context/idiomsContext';
import { Idiom } from '@/types';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockIdioms: Idiom[] = [
  {
    id: 1,
    title: 'Break the ice',
    position: 1,
    definition: 'To initiate conversation in a social setting',
    timestamps: '2023-12-01',
    title_general: null,
    contributor: null,
    examples: [],
  },
  {
    id: 2,
    title: 'Hit the sack',
    position: 2,
    definition: 'To go to bed',
    timestamps: '2023-12-02',
    title_general: null,
    contributor: null,
    examples: [],
  },
];

function createIdiom(i: number): Idiom {
  return {
    id: i + 1,
    title: `Idiom ${i + 1}`,
    position: i + 1,
    definition: `Definition ${i + 1}`,
    timestamps: '2023-12-01',
    title_general: null,
    contributor: null,
    examples: [],
  };
}

function setup(overrideIdioms = mockIdioms) {
  const contextValue = {
    idioms: overrideIdioms,
    setIdioms: vi.fn(),
    addIdiom: vi.fn(),
    updateIdiom: vi.fn(),
    deleteIdiom: vi.fn(),
    addExampleToIdiom: vi.fn(),
    updateExamples: vi.fn(),
    deleteExampleById: vi.fn(),
    isLoading: false,
    hasFetched: true,
  };

  render(
    <MemoryRouter>
      <IdiomsContext.Provider value={contextValue}>
        <TableSection />
      </IdiomsContext.Provider>
    </MemoryRouter>,
  );
  const expectShowingText = (range: string) =>
    expect(screen.getByText(new RegExp(`showing ${range} idioms`, 'i'))).toBeInTheDocument();

  return {
    contextValue,
    user: userEvent.setup(),
    searchBar: screen.getByPlaceholderText('Search...'),
    expectShowingText,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('TableSection', () => {
  describe('Rendering', () => {
    test('renders idioms from context into the table', () => {
      setup();
      expect(screen.getByText('Break the ice')).toBeInTheDocument();
      expect(screen.getByText('Hit the sack')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    test('filters results based on search input', () => {
      const { searchBar } = setup();
      fireEvent.change(searchBar, { target: { value: 'Break' } });

      expect(screen.getByText('Break the ice')).toBeInTheDocument();
      expect(screen.queryByText('Hit the sack')).not.toBeInTheDocument();
    });
  });

  describe('Column Visibility', () => {
    test('toggles column visibility using the column dropdown', async () => {
      const { user } = setup();

      await user.click(screen.getByRole('button', { name: /columns/i }));
      const checkbox = screen.getByLabelText(/definition/i);

      await user.click(checkbox);
      expect(screen.queryByText(/To initiate conversation/i)).not.toBeInTheDocument();

      await user.click(checkbox);
      expect(screen.queryByText(/To initiate conversation/i)).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    test('sorts idioms when clicking the table header', async () => {
      const { user } = setup();

      const header = screen.getByTestId('table-header-title');
      await user.click(header);
      expect(screen.getAllByRole('row')[1]).toHaveTextContent('Break the ice');

      await user.click(header);
      expect(screen.getAllByRole('row')[1]).toHaveTextContent('Hit the sack');
    });
  });

  describe('Pagination Functionality', () => {
    test('pagination updates items when changing pages', () => {
      const idioms = Array.from({ length: 25 }, (_, i) => createIdiom(i));
      setup(idioms);

      expect(screen.getByText('Idiom 1')).toBeInTheDocument();
      fireEvent.click(screen.getAllByText('>')[0]);
      expect(screen.getByText('Idiom 21')).toBeInTheDocument();
    });

    test('updates pagination when items per page is changed', async () => {
      const idioms = Array.from({ length: 30 }, (_, i) => createIdiom(i));
      const { user } = setup(idioms);

      expect(screen.getByText('Idiom 1')).toBeInTheDocument();
      expect(screen.getByText('Idiom 20')).toBeInTheDocument();
      expect(screen.queryByText('Idiom 21')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /20/i }));
      await user.click(screen.getByRole('option', { name: '10' }));

      expect(screen.getByText('Idiom 10')).toBeInTheDocument();
      expect(screen.queryByText('Idiom 11')).not.toBeInTheDocument();
    });
  });

  describe('Showing Text', () => {
    test('updates showing text when items per page changes', async () => {
      const idioms = Array.from({ length: 30 }, (_, i) => createIdiom(i));
      const { user, expectShowingText } = setup(idioms);

      expectShowingText('1 - 20 of 30');

      await user.click(screen.getByRole('button', { name: /20/i }));
      await user.click(screen.getByRole('option', { name: '10' }));

      expectShowingText('1 - 10 of 30');
    });

    test('updates showing text when navigating to next page', async () => {
      const idioms = Array.from({ length: 30 }, (_, i) => createIdiom(i));
      const { user, expectShowingText } = setup(idioms);

      expectShowingText('1 - 20 of 30');

      await user.click(screen.getAllByText('>')[0]);
      expectShowingText('21 - 30 of 30');
    });

    test('hides showing text when no idioms match the search', async () => {
      const { user, searchBar } = setup();
      await user.type(searchBar, 'No Match');
      expect(screen.queryByText(/showing/i)).not.toBeInTheDocument();
    });

    test('updates showing text when search filters results', async () => {
      const { user, searchBar, expectShowingText } = setup();
      expectShowingText('1 - 2 of 2');

      await user.type(searchBar, 'Break the ice');
      expectShowingText('1 - 1 of 1');
    });
  });
});
