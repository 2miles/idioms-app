import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ColumnAccessors, Columns } from '@/types';

import TableHead from './TableHead';

describe('TableHead', () => {
  const visibleColumns = Columns.slice(0, 3); // e.g. position, title, definition
  const mockSort = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all column headers with correct labels', () => {
    render(
      <table>
        <TableHead
          columns={visibleColumns}
          handleSorting={mockSort}
          sortField='title'
          sortOrder='asc'
        />
      </table>,
    );
    visibleColumns.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('calls handleSorting with correct params on header click', () => {
    let currentSortField: ColumnAccessors = 'position'; // NOT 'title'
    let currentSortOrder: 'asc' | 'desc' = 'desc';

    const mockHandleSorting = vi.fn((field: ColumnAccessors, order: 'asc' | 'desc') => {
      currentSortField = field;
      currentSortOrder = order;
    });

    const { rerender } = render(
      <table>
        <TableHead
          columns={visibleColumns}
          handleSorting={mockHandleSorting}
          sortField={currentSortField}
          sortOrder={currentSortOrder}
        />
      </table>,
    );

    const idiomHeader = screen.getByText('Idiom');

    // Click once → now sortField !== title, so we expect first sort = asc
    fireEvent.click(idiomHeader);
    expect(mockHandleSorting).toHaveBeenCalledWith('title', 'asc');

    // Simulate state update and rerender with new props
    rerender(
      <table>
        <TableHead
          columns={visibleColumns}
          handleSorting={mockHandleSorting}
          sortField='title'
          sortOrder='asc'
        />
      </table>,
    );

    // Click again → flips to desc
    fireEvent.click(idiomHeader);
    expect(mockHandleSorting).toHaveBeenCalledWith('title', 'desc');
  });

  test('applies correct background image style for decending order', () => {
    render(
      <table>
        <TableHead
          columns={visibleColumns}
          handleSorting={mockSort}
          sortField='title'
          sortOrder='desc'
        />
      </table>,
    );
    const titleHeader = screen.getByTestId('table-header-title');
    expect(within(titleHeader).getByTestId('sort-icon-down')).toBeInTheDocument();
  });
});
