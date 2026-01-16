import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

import { screen, waitFor } from '@testing-library/react';

import { publicIdiomFinder } from '@/apis/idiomFinder';

import { mockIdioms, setupIdiomTableView } from '../helpers/setupIdiomTableView';

beforeEach(() => {
  vi.clearAllMocks();
});

const getByTextContent = (text: string) => screen.getByText((_, el) => el?.textContent === text);

const queryByTextContent = (text: string) =>
  screen.queryByText((_, el) => el?.textContent === text);

describe('IdiomTableView - Searching', () => {
  test('filters results based on search input', async () => {
    // Render the component with default idioms
    const { user } = setupIdiomTableView();

    // Wait for initial idioms to load
    await waitFor(() => {
      expect(getByTextContent('Break the ice')).toBeInTheDocument();
      expect(queryByTextContent('Hit the sack')).toBeInTheDocument();
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
      expect(getByTextContent('Break the ice')).toBeInTheDocument();
      expect(queryByTextContent('Hit the sack')).not.toBeInTheDocument();
    });
  });
});
