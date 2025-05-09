import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import TableSection from './TableSection';
import { IdiomsContext } from '@/context/idiomsContext';
import { Idiom } from '@/types';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const setIdiomsMock = vi.fn();
const addIdiomsMock = vi.fn();
const updateIdiomMock = vi.fn();
const deleteIdiomMock = vi.fn();
const addExampleToIdiomMock = vi.fn();
const updateExamplesMock = vi.fn();
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

const contextValue = {
  idioms: mockIdioms,
  setIdioms: setIdiomsMock,
  addIdioms: addIdiomsMock,
  updateIdiom: updateIdiomMock,
  deleteIdiom: deleteIdiomMock,
  addExampleToIdiom: addExampleToIdiomMock,
  updateExamples: updateExamplesMock,
};

function renderComponent(overrideIdioms = mockIdioms) {
  render(
    <MemoryRouter>
      <IdiomsContext.Provider value={{ ...contextValue, idioms: overrideIdioms }}>
        <TableSection />
      </IdiomsContext.Provider>
    </MemoryRouter>,
  );
}

describe('TableSection', () => {
  describe('Rendering', () => {
    test('renders idioms from context into the table', () => {
      renderComponent();

      // Check that both idioms render
      expect(screen.getByText('Break the ice')).toBeInTheDocument();
      expect(screen.getByText('Hit the sack')).toBeInTheDocument();
    });
  });
  describe('Search Functionality', () => {
    test('filters results based on search input', () => {
      render(
        <MemoryRouter>
          <IdiomsContext.Provider value={contextValue}>
            <TableSection />
          </IdiomsContext.Provider>
        </MemoryRouter>,
      );

      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'Break' } });

      expect(screen.getByText('Break the ice')).toBeInTheDocument();
      expect(screen.queryByText('Hit the sack')).not.toBeInTheDocument();
    });
  });

  describe('Column Visibility', () => {
    test('toggles column visibility using the column dropdown', async () => {
      const user = userEvent.setup();

      renderComponent();

      const columnDropdownButton = screen.getByRole('button', { name: /columns/i });
      await user.click(columnDropdownButton);

      const definitionCheckbox = screen.getByLabelText(/definition/i);
      await user.click(definitionCheckbox);

      expect(screen.queryByText(/To initiate conversation/i)).not.toBeInTheDocument();

      await user.click(definitionCheckbox);

      expect(screen.getByText(/To initiate conversation/i)).toBeInTheDocument();
    });
  });
  describe('Sorting', () => {
    test('sorts idioms when clicking the table header', async () => {
      const user = userEvent.setup();
      renderComponent();

      // Click the "Idiom" column header to sort ascending (default)
      const idiomHeader = screen.getByTestId('table-header-title');
      await user.click(idiomHeader);

      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Break the ice');
      expect(rows[2]).toHaveTextContent('Hit the sack');

      // Click again to sort descending
      await user.click(idiomHeader);

      const updatedRows = screen.getAllByRole('row');
      expect(updatedRows[1]).toHaveTextContent('Hit the sack');
      expect(updatedRows[2]).toHaveTextContent('Break the ice');
    });
  });

  describe('Pagination Functionality', () => {
    test('pagination updates items when changing pages', () => {
      const largeMockIdioms = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        title: `Idiom ${i + 1}`,
        position: i + 1,
        definition: `Definition ${i + 1}`,
        timestamps: '2023-12-01',
        title_general: null,
        contributor: null,
        examples: [],
      }));

      renderComponent(largeMockIdioms);

      expect(screen.getByText('Idiom 1')).toBeInTheDocument();

      const nextButton = screen.getAllByText('>')[0];
      fireEvent.click(nextButton);

      expect(screen.getByText('Idiom 21')).toBeInTheDocument();
    });
    test('updates pagination when items per page is changed', async () => {
      const user = userEvent.setup();

      // Provide enough idioms to trigger pagination
      const manyIdioms = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        title: `Idiom ${i + 1}`,
        position: i + 1,
        definition: `Definition ${i + 1}`,
        timestamps: '2023-12-01',
        title_general: null,
        contributor: null,
        examples: [],
      }));

      renderComponent(manyIdioms);

      // Expect first page showing 20 idioms by default
      expect(screen.getByText('Idiom 1')).toBeInTheDocument();
      expect(screen.getByText('Idiom 20')).toBeInTheDocument();
      expect(screen.queryByText('Idiom 21')).not.toBeInTheDocument();

      // Open items per page dropdown and change to 10
      const itemsPerPageButton = screen.getByRole('button', { name: /20/i });
      await user.click(itemsPerPageButton);

      const tenOption = screen.getByRole('option', { name: '10' });
      await user.click(tenOption);

      // Now only 10 items should be shown
      expect(screen.getByText('Idiom 1')).toBeInTheDocument();
      expect(screen.getByText('Idiom 10')).toBeInTheDocument();
      expect(screen.queryByText('Idiom 11')).not.toBeInTheDocument();
    });
  });
  describe('Showing Text', () => {
    test('updates showing text when items per page changes', async () => {
      const user = userEvent.setup();
      const manyIdioms = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        title: `Idiom ${i + 1}`,
        position: i + 1,
        definition: `Definition ${i + 1}`,
        timestamps: '2023-12-01',
        title_general: null,
        contributor: null,
        examples: [],
      }));

      renderComponent(manyIdioms);

      // Confirm initial showing text shows 1 - 20 of 30
      expect(screen.getByText(/showing 1 - 20 of 30 idioms/i)).toBeInTheDocument();

      // Open items per page dropdown and change to 10
      const itemsPerPageButton = screen.getByRole('button', { name: /20/i });
      await user.click(itemsPerPageButton);

      const tenOption = screen.getByRole('option', { name: '10' });
      await user.click(tenOption);

      // Expect showing text to update to "Showing 1 - 10 of 30 idioms"
      expect(screen.getByText(/showing 1 - 10 of 30 idioms/i)).toBeInTheDocument();
    });

    test('updates showing text when navigating to next page', async () => {
      const user = userEvent.setup();
      const manyIdioms = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        title: `Idiom ${i + 1}`,
        position: i + 1,
        definition: `Definition ${i + 1}`,
        timestamps: '2023-12-01',
        title_general: null,
        contributor: null,
        examples: [],
      }));

      renderComponent(manyIdioms);

      // Confirm initial showing text shows 1 - 20 of 30
      expect(screen.getByText(/showing 1 - 20 of 30 idioms/i)).toBeInTheDocument();

      // Go to the next page
      const nextButton = screen.getAllByText('>')[0];
      await user.click(nextButton);

      // Expect showing text to update to "Showing 21 - 30 of 30 idioms"
      expect(screen.getByText(/showing 21 - 30 of 30 idioms/i)).toBeInTheDocument();
    });

    test('hides showing text when no idioms match the search', async () => {
      const user = userEvent.setup();
      renderComponent();

      // Type something that does not match any idioms
      const searchInput = screen.getByPlaceholderText(/search.../i);
      await user.type(searchInput, 'No Match');

      // Assert that showing text is not present
      expect(screen.queryByText(/showing/i)).not.toBeInTheDocument();
    });
    test('updates showing text when search filters results', async () => {
      const user = userEvent.setup();
      renderComponent();

      // Ensure initial showing text displays full range
      expect(screen.getByText(/showing 1 - 2 of 2 idioms/i)).toBeInTheDocument();

      // Type in search bar to filter
      const searchInput = screen.getByPlaceholderText(/search.../i);
      await user.type(searchInput, 'Break the ice');

      // Expect showing text to update to "Showing 1 - 1 of 1 idioms"
      expect(screen.getByText(/showing 1 - 1 of 1 idioms/i)).toBeInTheDocument();
    });
  });
});
