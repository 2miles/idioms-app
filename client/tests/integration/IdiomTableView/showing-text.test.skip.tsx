import { screen, waitFor, within } from '@testing-library/react';
import { vi, test, expect, beforeEach, Mock, describe } from 'vitest';

import { mockIdioms, setupIdiomTableView } from '../helpers/setupIdiomTableView';
import { publicIdiomFinder } from '@/apis/idiomFinder';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('IdiomTableView - Showing-text', () => {
  // TODO: Convert to e2e test
  test.skip('updates showing text when items per page changes', async () => {
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
    const { user } = setupIdiomTableView({
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
  test.skip('updates showing text when navigating to next page', async () => {
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
    const { user } = setupIdiomTableView({
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

  // TODO: Convert to e2e test
  // FIXME: This test checks that the showing text is hidden. False Positive.
  test.skip('hides showing text when no idioms match the search', async () => {
    // Render component and grab user + searchBar utilities
    const { user, searchBar } = setupIdiomTableView();

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
    const { user, searchBar } = setupIdiomTableView({
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
