import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import ColumnDropdown from './ColumnDropdown';
import { ColumnAccessors, ColumnVisibility, Columns } from '@/types';

describe('ColumnDropdown', () => {
  const defaultVisibility: ColumnVisibility = Columns.reduce((acc, col) => {
    acc[col.accessor as ColumnAccessors] = true;
    return acc;
  }, {} as ColumnVisibility);

  const mockHandleChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all column toggles', () => {
    render(
      <ColumnDropdown
        columnVisibility={defaultVisibility}
        handleColumnVisibilityChange={mockHandleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
    const listbox = screen.getByRole('listbox');

    for (const col of Columns) {
      const matches = within(listbox).getAllByText(
        (_, el) => el?.textContent?.toLowerCase() === col.accessor.toLowerCase(),
      );
      expect(matches.length).toBeGreaterThan(0);
    }
  });

  test('calls handler when a checkbox is toggled', () => {
    render(
      <ColumnDropdown
        columnVisibility={defaultVisibility}
        handleColumnVisibilityChange={mockHandleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
    const listbox = screen.getByRole('listbox');

    const checkbox = within(listbox).getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    const firstAccessor = Columns[0].accessor as ColumnAccessors;
    expect(mockHandleChange).toHaveBeenCalledWith(firstAccessor);
  });

  test('dropdown stays open after toggling a checkbox', () => {
    render(
      <ColumnDropdown
        columnVisibility={defaultVisibility}
        handleColumnVisibilityChange={mockHandleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
    const listbox = screen.getByRole('listbox');

    const checkbox = within(listbox).getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    // Dropdown should still be visible
    expect(listbox).toBeVisible();
  });

  test('checkboxes reflect correct visibility state', () => {
    render(
      <ColumnDropdown
        columnVisibility={defaultVisibility}
        handleColumnVisibilityChange={mockHandleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
    const listbox = screen.getByRole('listbox');

    const checkboxes = within(listbox).getAllByRole('checkbox');
    expect(checkboxes.length).toBe(Columns.length);

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });
});
