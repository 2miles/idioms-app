import { screen, waitFor } from '@testing-library/react';
import { vi, test, expect, beforeEach, Mock, describe } from 'vitest';

import { mockIdioms, setupIdiomTableView } from '../helpers/setupIdiomTableView';
import { publicIdiomFinder } from '@/apis/idiomFinder';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('IdiomTableView - Showing-text', () => {
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
