import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import TableHead from './TableHead';
import { Columns } from '@/types';

describe('TableHead', () => {
  const visibleColumns = Columns.slice(0, 3); // e.g. position, title, definition
  const mockSort = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all column headers with correct labels', () => {
    render(
      <table>
        <TableHead columns={visibleColumns} handleSorting={mockSort} />
      </table>,
    );
    visibleColumns.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('calls handleSorting with correct params on header click', () => {
    render(
      <table>
        <TableHead columns={visibleColumns} handleSorting={mockSort} />
      </table>,
    );
    fireEvent.click(screen.getByText('Idiom')); // click to sort
    expect(mockSort).toHaveBeenCalledWith('title', 'asc');
    fireEvent.click(screen.getByText('Idiom')); // click again to reverse sort
    expect(mockSort).toHaveBeenCalledWith('title', 'desc');
  });

  test('applies correct background image class based on sort order', () => {
    render(
      <table>
        <TableHead columns={visibleColumns} handleSorting={mockSort} />
      </table>,
    );
    const titleHeader = screen.getByText('Idiom');
    fireEvent.click(titleHeader); // asc
    fireEvent.click(titleHeader); // desc
    expect(titleHeader).toHaveStyle(`background-image: url(/src/images/icons8-down-arrow-30.png)`);
  });
});
