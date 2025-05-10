import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import ItemsPerPageDropdown from './ItemsPerPageDropdown';

describe('ItemsPerPageDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with default selected value', () => {
    render(<ItemsPerPageDropdown handleItemsPerPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument();
  });

  test('selecting option updates label and calls handler', () => {
    const handler = vi.fn();
    render(<ItemsPerPageDropdown handleItemsPerPageChange={handler} />);

    fireEvent.click(screen.getByRole('button', { name: '20' }));
    fireEvent.click(within(screen.getByRole('listbox')).getByText('50'));

    expect(handler).toHaveBeenCalledWith(50);
    expect(screen.getByRole('button', { name: '50' })).toBeInTheDocument();
  });

  test('closes dropdown after selecting an option', () => {
    render(<ItemsPerPageDropdown handleItemsPerPageChange={vi.fn()} />);

    const button = screen.getByRole('button', { name: '20' });
    fireEvent.click(button);

    const listbox = screen.getByRole('listbox');
    const option = within(listbox).getByText('50');
    fireEvent.click(option);

    expect(listbox).not.toBeVisible();
  });
});
