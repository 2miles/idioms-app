import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Table from './Table';
import { ColumnVisibility, Idiom } from '@/types';
import { MemoryRouter } from 'react-router-dom';

const tableData: Idiom[] = [
  {
    id: 1,
    title: 'Break the ice',
    timestamps: '2023-01-01T00:00:00Z',
    title_general: null,
    definition: 'To initiate conversation in a social setting',
    contributor: 'Alice',
    position: 1,
    examples: [],
  },
];

describe('Table', () => {
  const handleSorting = vi.fn();

  const defaultSortField = 'position';
  const defaultSortOrder = 'asc';

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
          tableData={tableData}
          handleSorting={handleSorting}
          columnVisibility={columnVisibility}
          sortField={defaultSortField}
          sortOrder={defaultSortOrder}
        />
      </MemoryRouter>,
    );

    // Check visible column headers
    expect(screen.getByText('Order')).toBeInTheDocument();
    expect(screen.queryByText('Idiom')).not.toBeInTheDocument();
    expect(screen.getByText('Definition')).toBeInTheDocument();
    expect(screen.queryByText('Day')).not.toBeInTheDocument();
    expect(screen.getByText('Owner')).toBeInTheDocument();
  });

  test('renders data rows matching visible columns', () => {
    const columnVisibility: ColumnVisibility = {
      position: true,
      title: true,
      definition: true,
      timestamps: true,
      contributor: true,
    };

    render(
      <MemoryRouter>
        <Table
          tableData={tableData}
          handleSorting={handleSorting}
          columnVisibility={columnVisibility}
          sortField={defaultSortField}
          sortOrder={defaultSortOrder}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Break the ice')).toBeInTheDocument();
    expect(screen.getByText('To initiate conversation in a social setting')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  test('renders empty table gracefully', () => {
    const columnVisibility: ColumnVisibility = {
      position: true,
      title: true,
      definition: true,
      timestamps: true,
      contributor: true,
    };

    render(
      <MemoryRouter>
        <Table
          tableData={[]}
          handleSorting={handleSorting}
          columnVisibility={columnVisibility}
          sortField={defaultSortField}
          sortOrder={defaultSortOrder}
        />
        ,
      </MemoryRouter>,
    );

    // Only header should exist
    expect(screen.getByText('Idiom')).toBeInTheDocument();
    expect(screen.queryByText('Break the ice')).not.toBeInTheDocument();
  });
});
