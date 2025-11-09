import moment from 'moment';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { getCoreRowModel, useReactTable, type TableOptions } from '@tanstack/react-table';
import { fireEvent, render, screen } from '@testing-library/react';

import { Columns, Idiom } from '@/types';

import TableBody from './TableBody';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useNavigate: () => mockNavigate };
});

const defaultColumns = Columns.filter((c) =>
  ['position', 'title', 'definition', 'timestamps'].includes(c.accessor),
).map((c) => {
  if (c.accessor === 'timestamps') {
    return {
      id: c.accessor,
      header: c.label,
      accessorKey: c.accessor,
      enableSorting: true,
      cell: ({ getValue }: any) => moment.utc(getValue()).format('MM-DD-YY'),
    };
  }
  return {
    id: c.accessor,
    header: c.label,
    accessorKey: c.accessor,
    enableSorting: true,
  };
});

const row: Idiom = {
  id: 1,
  position: 1,
  title: 'Break the ice',
  title_general: '',
  definition: 'To make people feel more comfortable',
  timestamps: '2023-12-01T00:00:00.000Z',
  contributor: '',
};
const defaultData: Idiom[] = [row];

const makeTable = (options?: Partial<TableOptions<Idiom>>) =>
  useReactTable({
    data: defaultData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    ...options,
  });

const BodyWrapper = ({ data = defaultData }: { data?: Idiom[] }) => {
  const table = makeTable({ data });
  return (
    <table>
      <TableBody table={table} />
    </table>
  );
};

describe('TableBody (TanStack)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders row cells and formatted timestamp', () => {
    render(
      <MemoryRouter>
        <BodyWrapper />
      </MemoryRouter>,
    );

    expect(screen.getByText('Break the ice')).toBeInTheDocument();
    expect(screen.getByText('12-01-23')).toBeInTheDocument();
    expect(screen.queryByText('No Idioms Found')).not.toBeInTheDocument();
  });

  test('renders fallback when there are no rows', () => {
    render(
      <MemoryRouter>
        <BodyWrapper data={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText('No Idioms Found')).toBeInTheDocument();
  });

  test('clicking a row navigates to the idiom detail page', () => {
    render(
      <MemoryRouter>
        <BodyWrapper />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Break the ice'));
    expect(mockNavigate).toHaveBeenCalledWith(expect.objectContaining({ pathname: '/idioms/1' }));
  });
});
