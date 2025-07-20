import { screen, waitFor } from '@testing-library/react';
import { vi, test, expect, beforeEach, describe } from 'vitest';

import { setupIdiomTableView } from '../helpers/setupIdiomTableView';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('IdiomTableView - Column visibility', () => {
  test('toggles column visibility using the column dropdown', async () => {
    const { user } = setupIdiomTableView();

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
