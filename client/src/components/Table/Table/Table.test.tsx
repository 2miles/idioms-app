import { type SortingState } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ColumnVisibility, Idiom } from '@/types';
import Table from './Table';

const tableData: Idiom[] = [
  {
    id: 1,
    title: 'Break the ice',
    definition: 'To initiate conversation in a social setting',
    timestamps: '2023-01-01T00:00:00Z',
    contributor: 'Alice',
    position: 1,
    title_general: '',
    examples: [],
  },
];

const defaultSorting: SortingState = [{ id: 'position', desc: false }];
const defaultVisibility: ColumnVisibility = {
  position: true,
  title: true,
  definition: true,
  timestamps: true,
  contributor: true,
};

const mockOnSortingChange = vi.fn();
const mockOnColumnVisibilityChange = vi.fn();
const mockOnPageChange = vi.fn();
const mockOnPageSizeChange = vi.fn();

const defaultProps = {
  data: tableData,
  totalRows: tableData.length,
  pageIndex: 0,
  pageSize: 10,
  sorting: defaultSorting,
  columnVisibility: defaultVisibility,
  onSortingChange: mockOnSortingChange,
  onColumnVisibilityChange: mockOnColumnVisibilityChange,
  onPageChange: mockOnPageChange,
  onPageSizeChange: mockOnPageSizeChange,
};

function renderTable(overrides: Partial<typeof defaultProps> = {}) {
  const props = { ...defaultProps, ...overrides };
  return render(
    <MemoryRouter>
      <Table {...props} />
    </MemoryRouter>,
  );
}

describe('Table (TanStack)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders only visible columns', () => {
    renderTable({
      columnVisibility: {
        position: true,
        title: false,
        definition: true,
        timestamps: false,
        contributor: true,
      },
    });

    expect(screen.getByText('Order')).toBeInTheDocument();
    expect(screen.getByText('Definition')).toBeInTheDocument();
    expect(screen.getByText('Owner')).toBeInTheDocument();

    expect(screen.queryByText('Idiom')).not.toBeInTheDocument();
    expect(screen.queryByText('Day')).not.toBeInTheDocument();
  });

  test('renders data rows matching visible columns', () => {
    renderTable();

    expect(screen.getByText('Break the ice')).toBeInTheDocument();
    expect(screen.getByText('To initiate conversation in a social setting')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  test('renders fallback message when table is empty', () => {
    renderTable({ data: [], totalRows: 0 });

    expect(screen.getByText('No Idioms Found')).toBeInTheDocument();
  });
});
