import { screen, waitFor } from '@testing-library/react';
import { vi, test, expect, beforeEach, Mock, describe } from 'vitest';

import { mockIdioms, setupIdiomTableView } from '../helpers/setupIdiomTableView';
import { publicIdiomFinder } from '@/apis/idiomFinder';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('IdiomTableView - Searching', () => {
  test('filters results based on search input', async () => {
    // Render the component with default idioms
    const { user } = setupIdiomTableView();

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
