import { screen, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';

import { setupIdiomTableView } from '../helpers/setupIdiomTableView';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('IdiomTableView - Rendering', () => {
  test('renders idioms from the API into the table', async () => {
    // Render the component with default idioms
    setupIdiomTableView();

    // Wait for initial idioms to load
    await waitFor(() => {
      expect(screen.getByText('Break the ice')).toBeInTheDocument();
      expect(screen.getByText('Hit the sack')).toBeInTheDocument();
    });
  });
});
