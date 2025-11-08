import moment from 'moment';
import styled from 'styled-components';

import { getCoreRowModel, useReactTable, type SortingState } from '@tanstack/react-table';

import TableBody from '@/components/Table/TableBody/TableBody';
import TableHead from '@/components/Table/TableHead/TableHead';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ColumnAccessors, ColumnVisibility, Columns, Idiom } from '@/types';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-left: none !important;
  border-right: none !important;
  border-radius: var(--radius-md) !important;
  overflow: hidden !important;
  border-collapse: separate;
  border-spacing: 0;
  border-right: 1px solid var(--color-border) !important;
  border-left: 1px solid var(--color-border) !important;
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
}: TableProps) => {
  const isSmall = useMediaQuery('(max-width: 770px)');

  const columnDefs = Columns.map((c) => ({
    id: c.accessor,
    header: c.label,
    accessorKey: c.accessor as ColumnAccessors,
    enableSorting: true,
    ...(c.accessor === 'timestamps' && {
      cell: (info: any) => moment(info.getValue()).format('MM-DD-YY'),
    }),
    ...(c.accessor === 'definition' && {
      cell: (info: any) => {
        const text = info.getValue() as string;
        return text?.length > 150 ? text.slice(0, 150) + '…' : text;
      },
    }),
  }));

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
