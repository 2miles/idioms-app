import { describe, expect, test, vi } from 'vitest';

import { getCoreRowModel, TableOptions, useReactTable } from '@tanstack/react-table';
import { fireEvent, render, screen, within } from '@testing-library/react';

import { Columns, Idiom } from '@/types';

import TableHead from './TableHead';

const makeTable = (options?: Partial<TableOptions<Idiom>>) =>
  useReactTable({
    data: defaultData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    ...options,
  });

const defaultColumns = Columns.slice(0, 3).map((c) => ({
  id: c.accessor,
  header: c.label,
  accessorKey: c.accessor,
  enableSorting: true,
}));

const defaultData: Idiom[] = [
  {
    id: 1,
    position: 1,
    title: 'Break the ice',
    title_general: '',
    definition: 'Start a conversation',
    timestamps: '',
    contributor: '',
  },
];

describe('TableHead', () => {
  const BasicWrapper = () => {
    const table = makeTable();
    return (
      <table>
        <TableHead table={table} />
      </table>
    );
  };

  test('renders all column headers with correct labels', () => {
    render(<BasicWrapper />);
    defaultColumns.forEach(({ header }) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('calls onSortingChange when clicking sortable header', () => {
    const mockOnSortingChange = vi.fn();

    const Wrapper = ({ sorting = [] }: { sorting?: any[] }) => {
      const table = makeTable({ state: { sorting }, onSortingChange: mockOnSortingChange });
      return (
        <table>
          <TableHead table={table} />
        </table>
      );
    };

    const { rerender } = render(<Wrapper sorting={[]} />);

    const idiomHeader = screen.getByText('Idiom');
    fireEvent.click(idiomHeader);

    const firstArg = mockOnSortingChange.mock.calls[0][0];
    const firstValue = typeof firstArg === 'function' ? firstArg([]) : firstArg;
    expect(firstValue).toEqual([{ id: 'title', desc: false }]);

    rerender(<Wrapper sorting={[{ id: 'title', desc: false }]} />);
    fireEvent.click(idiomHeader);

    const secondArg = mockOnSortingChange.mock.calls[1][0];
    const secondValue = typeof secondArg === 'function' ? secondArg(firstValue) : secondArg;
    expect(secondValue).toEqual([{ id: 'title', desc: true }]);
  });

  test('renders descending sort icon when column is sorted descending', () => {
    const Wrapper = () => {
      const table = makeTable({
        state: { sorting: [{ id: 'title', desc: true }] },
      });

      return (
        <table>
          <TableHead table={table} />
        </table>
      );
    };

    render(<Wrapper />);

    const titleHeader = screen.getByTestId('table-header-title');

    const downIcon = within(titleHeader).getByTestId('sort-icon-down');
    expect(downIcon).toBeInTheDocument();
  });
});
