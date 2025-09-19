import { beforeEach, describe, expect, test, vi } from 'vitest';

import { fireEvent, render, screen, within } from '@testing-library/react';

import ItemsPerPageDropdown from './ItemsPerPageDropdown';

describe('ItemsPerPageDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with default selected value', () => {
    render(<ItemsPerPageDropdown handleItemsPerPageChange={vi.fn()} />);

    const button = screen.getByLabelText('Items per page');
    expect(button).toHaveTextContent('20');
  });

  test('selecting option updates label and calls handler', () => {
    const handler = vi.fn();
    render(<ItemsPerPageDropdown handleItemsPerPageChange={handler} />);

    const button = screen.getByLabelText('Items per page');
    fireEvent.click(button);
    fireEvent.click(within(screen.getByRole('listbox')).getByText('50'));

    expect(handler).toHaveBeenCalledWith(50);
    expect(button).toHaveTextContent('50');
  });

  test('closes dropdown after selecting an option', () => {
    render(<ItemsPerPageDropdown handleItemsPerPageChange={vi.fn()} />);

    const button = screen.getByLabelText('Items per page');
    fireEvent.click(button);

    const listbox = screen.getByRole('listbox');
    const option = within(listbox).getByText('50');
    fireEvent.click(option);

    expect(listbox).not.toBeVisible(); // ← requires jest-dom + assumes display: none works in jsdom
  });
});
