import { render, screen, waitFor, within } from '@testing-library/react';
import { vi, type Mock, describe, test, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import IdiomTableView from './IdiomTableView';
import { Idiom } from '@/types';
import { publicIdiomFinder } from '@/apis/idiomFinder';

vi.mock('@/apis/idiomFinder', () => {
  return {
    publicIdiomFinder: {
      get: vi.fn(),
    },
  };
});

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

function setup({
  overrideIdioms = mockIdioms,
  initialEntries = ['/?page=1&limit=20&sortField=timestamps&sortOrder=desc'],
}: {
  overrideIdioms?: Idiom[];
  initialEntries?: string[];
} = {}) {
  const mock = publicIdiomFinder.get as Mock;
  if (!mock.getMockImplementation()) {
    mock.mockResolvedValue({
      data: {
        data: {
          idioms: overrideIdioms,
          totalCount: overrideIdioms.length,
        },
      },
    });
  }

  render(
    <MemoryRouter initialEntries={initialEntries}>
      <IdiomTableView />
    </MemoryRouter>,
  );

  const user = userEvent.setup();
  const searchBar = screen.getByPlaceholderText(/search/i);

  return { user, searchBar };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('IdiomTableView', () => {
  describe('Rendering', () => {
    test('renders idioms from the API into the table', async () => {
      // Render the component with default idioms
      setup();

      // Wait for initial idioms to load
      await waitFor(() => {
        expect(screen.getByText('Break the ice')).toBeInTheDocument();
        expect(screen.getByText('Hit the sack')).toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    test('filters results based on search input', async () => {
      const user = userEvent.setup();

      // Render the component with default idioms
      setup();

      // Wait for initial idioms to load
      await waitFor(() => {
        expect(screen.getByText('Break the ice')).toBeInTheDocument();
        expect(screen.queryByText('Hit the sack')).toBeInTheDocument();
      });

      // Mock the filtered API response for search input "Break the ice"
      (publicIdiomFinder.get as Mock).mockResolvedValue({
        data: {
          data: {
            idioms: [mockIdioms[0]],
            totalCount: 1,
          },
        },
      });

      // Type into the search input
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.clear(searchInput);
      await user.type(searchInput, 'Break the ice');

      // Wait for filtered idioms to appear
      await waitFor(() => {
        expect(screen.getByText('Break the ice')).toBeInTheDocument();
        expect(screen.queryByText('Hit the sack')).not.toBeInTheDocument();
      });
    });
  });

  describe('Column Visibility', () => {
    test('toggles column visibility using the column dropdown', async () => {
      const user = userEvent.setup();

      setup();

      // Wait for idioms to load
      await waitFor(() => {
        expect(
          screen.getByText((content) => content.includes('To initiate conversation')),
        ).toBeInTheDocument();
      });

      // Open the Columns dropdown
      await user.click(screen.getByLabelText(/column visibility/i));

      // Hide the Definition column
      const definitionCheckbox = screen.getByLabelText(/definition/i);
      await user.click(definitionCheckbox);

      // Confirm the column content is hidden
      expect(screen.queryByText('To initiate conversation')).not.toBeInTheDocument();

      // Show the Definition column again
      await user.click(definitionCheckbox);

      await waitFor(() => {
        expect(
          screen.getByText((content) => content.includes('To initiate conversation')),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Sorting', () => {
    test('sorts idioms when clicking the table header', async () => {
      // Mock initial idioms sorted by timestamps descending (default)
      (publicIdiomFinder.get as Mock).mockResolvedValue({
        data: {
          data: {
            idioms: [
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
            ],
            totalCount: 2,
          },
        },
      });

      const user = userEvent.setup();

      // Render the component
      render(
        <MemoryRouter>
          <IdiomTableView />
        </MemoryRouter>,
      );

      // Wait for initial idioms to appear
      await screen.findByText('Break the ice');

      // Get the header element that triggers sort
      const header = screen.getByTestId('table-header-title');

      // Mock the updated idioms after sorting by title ascending
      (publicIdiomFinder.get as Mock).mockResolvedValue({
        data: {
          data: {
            idioms: [
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
            ],
            totalCount: 2,
          },
        },
      });

      // Click the header to trigger sorting
      await user.click(header);

      // Wait for re-render and verify the new order
      await waitFor(() => {
        expect(screen.getAllByRole('row')[1]).toHaveTextContent('Hit the sack');
      });
    });
  });

  describe('Pagination Functionality', () => {
    test('pagination updates idioms when navigating pages', async () => {
      // Define idioms for page 1 and page 2
      const page1Idioms = [
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
      ];

      const page2Idioms = [
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

      // Mock initial response for page 1
      (publicIdiomFinder.get as Mock).mockResolvedValueOnce({
        data: { data: { idioms: page1Idioms, totalCount: 2 } },
      });

      // Render with pagination set to 1 item per page
      const { user } = setup({
        initialEntries: ['/?page=1&limit=1&sortField=timestamps&sortOrder=desc'],
      });

      // Wait for page 1 to load
      await waitFor(() => {
        expect(screen.getByText('Break the ice')).toBeInTheDocument();
        expect(screen.queryByText('Hit the sack')).not.toBeInTheDocument();
      });

      // Mock response for page 2
      (publicIdiomFinder.get as Mock).mockResolvedValueOnce({
        data: { data: { idioms: page2Idioms, totalCount: 2 } },
      });

      // Navigate to page 2 using top pagination control
      const topPagination = within(screen.getAllByLabelText('Pagination')[0]);
      await user.click(topPagination.getByText('2'));

      // Wait for page 2 idiom to load
      await waitFor(() => {
        expect(screen.getByText('Hit the sack')).toBeInTheDocument();
        expect(screen.queryByText('Break the ice')).not.toBeInTheDocument();
      });
    });

    test('updates pagination when items per page is changed', async () => {
      // Define initial page 1 idioms (limit=1)
      const page1Idioms = [
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
      ];

      // Define data returned when limit is increased to 2
      const twoPerPageIdioms = [
        ...page1Idioms,
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

      // Mock initial response for limit=1
      (publicIdiomFinder.get as Mock).mockResolvedValueOnce({
        data: { data: { idioms: page1Idioms, totalCount: 2 } },
      });

      // Render with pagination limit=1
      const { user } = setup({
        initialEntries: ['/?page=1&limit=1&sortField=timestamps&sortOrder=desc'],
      });

      // Wait for only first idiom to appear
      await waitFor(() => {
        expect(screen.getByText('Break the ice')).toBeInTheDocument();
        expect(screen.queryByText('Hit the sack')).not.toBeInTheDocument();
      });

      // Mock response when limit is changed to 10 (expecting both idioms)
      (publicIdiomFinder.get as Mock).mockResolvedValueOnce({
        data: { data: { idioms: twoPerPageIdioms, totalCount: 2 } },
      });

      // Open the items-per-page dropdown
      // The dropdown is rendered twice (once for desktop, once for mobile) and hidden via CSS media queries.
      // We interact with the first instance since only one is visible at a time in test environments.
      const triggers = screen.getAllByLabelText(/items per page/i);
      await user.click(triggers[0]); // or [1] depending on layout

      // Likewise, '10' appears in both dropdowns. Click the first instance.
      await user.click(screen.getAllByText('10')[0]);

      // Wait for both idioms to be visible
      await waitFor(() => {
        expect(screen.getByText('Break the ice')).toBeInTheDocument();
        expect(screen.getByText('Hit the sack')).toBeInTheDocument();
      });
    });
  });

  describe('Showing Text', () => {
    test('updates showing text when items per page changes', async () => {
      // Define mock idioms
      const idioms = [
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

      // Initial mock: limit=1, only show first idiom
      (publicIdiomFinder.get as Mock).mockResolvedValueOnce({
        data: { data: { idioms: [idioms[0]], totalCount: 2 } },
      });

      // Render component with URL limit=1
      const { user } = setup({
        initialEntries: ['/?page=1&limit=1&sortField=timestamps&sortOrder=desc'],
      });

      // Wait for showing text to match first page of 1 result
      await waitFor(() => {
        //en-dash instead of hyphen
        expect(screen.getByText('1–1 of 2 idioms')).toBeInTheDocument();
      });

      // Update mock: limit=10, show both idioms
      (publicIdiomFinder.get as Mock).mockResolvedValueOnce({
        data: { data: { idioms, totalCount: 2 } },
      });

      // Open the items-per-page dropdown
      // The dropdown is rendered twice (once for desktop, once for mobile) and hidden via CSS media queries.
      // We interact with the first instance since only one is visible at a time in test environments.
      const triggers = screen.getAllByLabelText(/items per page/i);
      await user.click(triggers[0]);

      // Likewise, '10' appears in both dropdowns. Click the first instance.
      await user.click(screen.getAllByText('10')[0]);

      // Wait for updated showing text to reflect 2 results
      await waitFor(() => {
        //en-dash instead of hyphen
        expect(screen.getByText('1–2 of 2 idioms')).toBeInTheDocument();
      });
    });

    // Define mock idioms
    test('updates showing text when navigating to next page', async () => {
      // Define mock idioms for page 1 and page 2
      const idioms = [
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

      // Page 1: return only the first idiom
      (publicIdiomFinder.get as Mock).mockResolvedValueOnce({
        data: { data: { idioms: [idioms[0]], totalCount: 2 } },
      });

      // Render component with page=1 and limit=1 (one idiom per page)
      const { user } = setup({
        initialEntries: ['/?page=1&limit=1&sortField=timestamps&sortOrder=desc'],
      });

      // Wait for showing text on page 1 to appear
      await waitFor(() => {
        //en-dash instead of hyphen
        expect(screen.getByText('1–1 of 2 idioms')).toBeInTheDocument();
      });

      // Page 2: return the second idiom
      (publicIdiomFinder.get as Mock).mockResolvedValueOnce({
        data: { data: { idioms: [idioms[1]], totalCount: 2 } },
      });

      // Click ">" to go to page 2 using the top pagination component
      const paginationNavs = screen.getAllByRole('navigation');
      const topPagination = within(paginationNavs[0]);
      await user.click(topPagination.getByText('>'));

      // Wait for showing text on page 2 to appear
      await waitFor(() => {
        //en-dash instead of hyphen
        expect(screen.getByText('2–2 of 2 idioms')).toBeInTheDocument();
      });
    });

    // FIXME: This test checks that the showing text is hidden. False Positive.
    test('hides showing text when no idioms match the search', async () => {
      // Render component and grab user + searchBar utilities
      const { user, searchBar } = setup();

      // Clear the search bar and type a query that yields no results
      await user.clear(searchBar);
      await user.type(searchBar, 'No Match');

      // Wait for the initial search-triggering axios call to happen
      await waitFor(() => {
        expect(publicIdiomFinder.get).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            params: expect.objectContaining({ search: 'No Match' }),
          }),
        );
      });

      // Mock a follow-up response from the backend with no matching idioms
      (publicIdiomFinder.get as Mock).mockResolvedValueOnce({
        data: {
          data: {
            idioms: [],
            totalCount: 0,
          },
        },
      });

      // Trigger another backend call by typing one more character
      await user.type(searchBar, '!');

      // Expect both idioms to disappear and the showing text to be hidden
      await waitFor(() => {
        expect(screen.queryByText('Break the ice')).not.toBeInTheDocument();
        expect(screen.queryByText('Hit the sack')).not.toBeInTheDocument();
        expect(screen.queryByText(/showing/i)).not.toBeInTheDocument();
      });
    });

    test('updates showing text when search filters results', async () => {
      // Mock the API to return filtered results based on the search term
      (publicIdiomFinder.get as Mock).mockImplementation((_, config) => {
        const search = config?.params?.search?.toLowerCase() ?? '';
        const idioms = search.includes('break') ? [mockIdioms[0]] : search ? [] : mockIdioms;

        return Promise.resolve({
          data: { data: { idioms, totalCount: idioms.length } },
        });
      });

      // Render the component with URL search params for sorting/pagination
      const { user, searchBar } = setup({
        initialEntries: ['/?page=1&limit=10&sortField=timestamps&sortOrder=desc'],
      });

      // Wait for initial render showing the full idiom list
      await waitFor(() => {
        expect(screen.getByText('Break the ice')).toBeInTheDocument();
        expect(screen.getByText('Hit the sack')).toBeInTheDocument();
        //en-dash instead of hyphen
        expect(screen.getByText('1–2 of 2 idioms')).toBeInTheDocument();
      });

      // Simulate search input that triggers a backend filter
      await user.clear(searchBar);
      await user.type(searchBar, 'Break');

      // Wait for updated results to render after filtering
      await waitFor(() => {
        expect(screen.getByText('Break the ice')).toBeInTheDocument();
        expect(screen.queryByText('Hit the sack')).not.toBeInTheDocument();
        //en-dash instead of hyphen
        expect(screen.getByText('1–1 of 1 idioms')).toBeInTheDocument();
      });
    });
  });
});
