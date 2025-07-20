import { screen, waitFor } from '@testing-library/react';
import { vi, test, expect, beforeEach, Mock, describe } from 'vitest';

import { setupIdiomTableView } from '../helpers/setupIdiomTableView';
import { publicIdiomFinder } from '@/apis/idiomFinder';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('IdiomTableView - Sorting', () => {
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

    const { user } = setupIdiomTableView();

    // Render the component
    // render(
    //   <MemoryRouter>
    //     <IdiomTableView />
    //   </MemoryRouter>,
    // );

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
