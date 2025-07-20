import { act, screen, waitFor, within } from '@testing-library/react';
import { vi, test, expect, beforeEach, describe, Mock, afterEach } from 'vitest';

import { setupIdiomTableView } from '../helpers/setupIdiomTableView';
import { publicIdiomFinder } from '@/apis/idiomFinder';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('IdiomTableView - Pagination', () => {
  //TODO: Convert to e2e test
  test.skip('pagination updates idioms when navigating pages', async () => {
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

    const mock = publicIdiomFinder.get as Mock;

    // First call (page 1)
    mock.mockResolvedValueOnce({
      data: { data: { idioms: page1Idioms, totalCount: 2 } },
    });

    // Second call (page 2)
    mock.mockResolvedValueOnce({
      data: { data: { idioms: page2Idioms, totalCount: 2 } },
    });

    // Catch-all fallback
    mock.mockResolvedValue({
      data: { data: { idioms: [], totalCount: 0 } },
    });

    const { user } = setupIdiomTableView({
      initialEntries: ['/?page=1&limit=1&sortField=timestamps&sortOrder=desc'],
    });

    // Wait for page 1 to show
    await waitFor(() => {
      expect(screen.getByText('Break the ice')).toBeInTheDocument();
      expect(screen.queryByText('Hit the sack')).not.toBeInTheDocument();
    });

    // Click page 2
    const topPagination = within(screen.getAllByLabelText('Pagination')[0]);
    await user.click(topPagination.getByText('2'));

    // Wait for page 2 to show
    await waitFor(() => {
      expect(screen.getByText('Hit the sack')).toBeInTheDocument();
      expect(screen.queryByText('Break the ice')).not.toBeInTheDocument();
    });
  });

  //TODO: Convert to e2e test
  test.skip('updates pagination when items per page is changed', async () => {
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
    const mock = publicIdiomFinder.get as Mock;

    // Mock initial response for limit=1
    mock.mockResolvedValueOnce({
      data: { data: { idioms: page1Idioms, totalCount: 2 } },
    });

    // Mock response when limit is changed to 10 (expecting both idioms)
    mock.mockResolvedValueOnce({
      data: { data: { idioms: twoPerPageIdioms, totalCount: 2 } },
    });

    // Catch-all fallback
    mock.mockResolvedValue({
      data: { data: { idioms: [], totalCount: 0 } },
    });

    // Render with pagination limit=1
    const { user } = setupIdiomTableView({
      initialEntries: ['/?page=1&limit=1&sortField=timestamps&sortOrder=desc'],
    });

    // Wait for only first idiom to appear
    await waitFor(() => {
      expect(screen.getByText('Break the ice')).toBeInTheDocument();
      expect(screen.queryByText('Hit the sack')).not.toBeInTheDocument();
    });

    // // Mock response when limit is changed to 10 (expecting both idioms)
    // (publicIdiomFinder.get as Mock).mockResolvedValueOnce({
    //   data: { data: { idioms: twoPerPageIdioms, totalCount: 2 } },
    // });

    // Open the items-per-page dropdown
    // The dropdown is rendered twice (once for desktop, once for mobile) and hidden via CSS media queries.
    // We interact with the first instance since only one is visible at a time in test environments.
    const triggers = screen.getAllByLabelText(/items per page/i);
    await user.click(triggers[0]); // or [1] depending on layout

    // Likewise, '10' appears in both dropdowns. Click the first instance.
    await user.click(screen.getAllByText('10')[0]);

    // Wait for both idioms to appear after debouncing
    await waitFor(() => {
      expect(screen.getByText('Break the ice')).toBeInTheDocument();
      expect(screen.getByText('Hit the sack')).toBeInTheDocument();
    });
  });
});
