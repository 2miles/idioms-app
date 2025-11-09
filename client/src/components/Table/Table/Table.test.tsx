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

describe('Table (TanStack)', () => {
  const mockOnSortingChange = vi.fn();
  const mockOnColumnVisibilityChange = vi.fn();
  const mockOnPageChange = vi.fn();
  const mockOnPageSizeChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders only visible columns', () => {
    const columnVisibility: ColumnVisibility = {
      position: true,
      title: false,
      definition: true,
      timestamps: false,
      contributor: true,
    };

    render(
      <MemoryRouter>
        <Table
          data={tableData}
          totalRows={1}
          pageIndex={0}
          pageSize={10}
          onPageChange={mockOnPageChange}
          onPageSizeChange={mockOnPageSizeChange}
          sorting={defaultSorting}
          onSortingChange={mockOnSortingChange}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={mockOnColumnVisibilityChange}
        />
      </MemoryRouter>,
    );

    // visible
    expect(screen.getByText('Order')).toBeInTheDocument();
    expect(screen.getByText('Definition')).toBeInTheDocument();
    expect(screen.getByText('Owner')).toBeInTheDocument();

    // hidden
    expect(screen.queryByText('Idiom')).not.toBeInTheDocument();
    expect(screen.queryByText('Day')).not.toBeInTheDocument();
  });

  test('renders data rows matching visible columns', () => {
    render(
      <MemoryRouter>
        <Table
          data={tableData}
          totalRows={1}
          pageIndex={0}
          pageSize={10}
          onPageChange={mockOnPageChange}
          onPageSizeChange={mockOnPageSizeChange}
          sorting={defaultSorting}
          onSortingChange={mockOnSortingChange}
          columnVisibility={defaultVisibility}
          onColumnVisibilityChange={mockOnColumnVisibilityChange}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Break the ice')).toBeInTheDocument();
    expect(screen.getByText('To initiate conversation in a social setting')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  test('renders fallback message when table is empty', () => {
    render(
      <MemoryRouter>
        <Table
          data={[]}
          totalRows={0}
          pageIndex={0}
          pageSize={10}
          onPageChange={mockOnPageChange}
          onPageSizeChange={mockOnPageSizeChange}
          sorting={defaultSorting}
          onSortingChange={mockOnSortingChange}
          columnVisibility={defaultVisibility}
          onColumnVisibilityChange={mockOnColumnVisibilityChange}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('No Idioms Found')).toBeInTheDocument();
  });
});
