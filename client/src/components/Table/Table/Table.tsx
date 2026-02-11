import moment from 'moment';
import styled from 'styled-components';

import { getCoreRowModel, useReactTable, type SortingState } from '@tanstack/react-table';

import TableBody from '@/components/Table/TableBody/TableBody';
import TableHead from '@/components/Table/TableHead/TableHead';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ColumnAccessors, ColumnVisibility, Columns, Idiom, SearchColumnAccessors } from '@/types';
import { highlightTokens } from '@/utils/highlightSearchTokens';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden !important;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: var(--margin-md);
`;

type TableProps = {
  data: Idiom[];
  totalRows: number;
  pageIndex: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  sorting: SortingState;
  onSortingChange: (s: SortingState) => void;
  columnVisibility: ColumnVisibility;
  onColumnVisibilityChange: (v: ColumnVisibility) => void;
  searchTerm: string;
  searchColumn: SearchColumnAccessors;
};

const Table = ({
  data,
  totalRows,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
  sorting,
  onSortingChange,
  columnVisibility,
  onColumnVisibilityChange,
  searchTerm,
  searchColumn,
}: TableProps) => {
  const isSmall = useMediaQuery('(max-width: 770px)');

  const shouldHighlightColumn = (col: ColumnAccessors) => {
    if (!searchTerm?.trim()) return false;

    // In the backend, "keywords" means match can be in title/definition/origin_text.
    // In the table, we can only reasonably highlight visible text fields.
    if (searchColumn === 'keywords') return col === 'title' || col === 'definition';

    return searchColumn === col;
  };

  const columnDefs = Columns.map((c) => {
    const accessor = c.accessor as ColumnAccessors;

    const base = {
      id: c.accessor,
      header: c.label,
      accessorKey: accessor,
      enableSorting: true,
    };

    if (accessor === 'timestamps') {
      return {
        ...base,
        cell: (info: any) => moment(info.getValue()).format('MM-DD-YY'),
      };
    }

    if (accessor === 'definition') {
      return {
        ...base,
        cell: (info: any) => {
          const text = (info.getValue() as string) ?? '';
          const truncated = text.length > 150 ? text.slice(0, 150) + '…' : text;
          return shouldHighlightColumn('definition')
            ? highlightTokens(truncated, searchTerm)
            : truncated;
        },
      };
    }

    // default: only highlight where appropriate, otherwise behave like old default
    return {
      ...base,
      cell: (info: any) => {
        const value = info.getValue();
        if (!shouldHighlightColumn(accessor)) return value ?? '';
        return highlightTokens(String(value ?? ''), searchTerm);
      },
    };
  });

  const effectiveVisibility: ColumnVisibility = isSmall
    ? {
        position: true,
        title: true,
        definition: false,
        timestamps: false,
        contributor: false,
      }
    : columnVisibility;

  const handleSortingChange = (updater: any) => {
    const next = typeof updater === 'function' ? updater(sorting) : updater;
    onSortingChange(next);
  };

  const handleColumnVisibilityChange = (updater: any) => {
    const base = columnVisibility;
    const next = typeof updater === 'function' ? updater(base) : updater;
    onColumnVisibilityChange(next as ColumnVisibility);
  };

  const handlePaginationChange = (updater: any) => {
    const next = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
    if (next.pageSize !== pageSize) onPageSizeChange(next.pageSize);
    if (next.pageIndex !== pageIndex) onPageChange(next.pageIndex);
  };

  const table = useReactTable({
    data,
    columns: columnDefs,
    state: {
      sorting,
      columnVisibility: effectiveVisibility,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: handleSortingChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    manualSorting: true,
    manualPagination: true,
    pageCount: Math.max(0, Math.ceil(totalRows / pageSize)),
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <StyledTable>
        <TableHead table={table} />
        <TableBody table={table} />
      </StyledTable>
    </>
  );
};

export default Table;
