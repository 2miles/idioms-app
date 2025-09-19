import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import { Columns } from '@/types';

import TableBody from './TableBody';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('TableBody', () => {
  const visibleColumns = Columns.filter((c) =>
    ['position', 'title', 'definition', 'timestamps'].includes(c.accessor),
  );
  const mockData = [
    {
      id: 1,
      title: 'Break the ice',
      position: 1,
      definition: 'To make people feel more comfortable',
      timestamps: '2023-12-01',
      title_general: null,
      contributor: null,
      examples: [],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correct number of rows and columns', () => {
    render(
      <MemoryRouter>
        <table>
          <TableBody tableData={mockData} columns={visibleColumns} />
        </table>
      </MemoryRouter>,
    );

    expect(screen.getByText('Break the ice')).toBeInTheDocument();
    expect(screen.getByText('12-01-23')).toBeInTheDocument(); // formatted timestamp
    expect(screen.queryByText('No Idioms Found')).not.toBeInTheDocument();
  });

  test('renders fallback when tableData is empty', () => {
    render(
      <MemoryRouter>
        <table>
          <TableBody tableData={[]} columns={visibleColumns} />
        </table>
      </MemoryRouter>,
    );

    expect(screen.getByText('No Idioms Found')).toBeInTheDocument();
  });

  test('clicking a row navigates to idiom detail page', () => {
    render(
      <MemoryRouter>
        <table>
          <TableBody tableData={mockData} columns={visibleColumns} />
        </table>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Break the ice'));

    expect(mockNavigate).toHaveBeenCalledWith(expect.objectContaining({ pathname: '/idioms/1' }));
  });
});
