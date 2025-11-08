import styled from 'styled-components';

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
  tableData: Idiom[];
  handleSorting: (sortField: ColumnAccessors, sortOrder: 'asc' | 'desc') => void;
  columnVisibility: ColumnVisibility;
  sortField: ColumnAccessors;
  sortOrder: 'asc' | 'desc';
};

const Table = ({
  tableData,
  handleSorting,
  columnVisibility,
  sortField,
  sortOrder,
}: TableProps) => {
  const columns = Columns;
  const isSmall = useMediaQuery('(max-width: 770px)');
  const smallOnly = new Set<ColumnAccessors>(['position', 'title']);
  let effectiveColumns;
  if (isSmall) {
    effectiveColumns = columns.filter((c) => smallOnly.has(c.accessor));
  } else {
    effectiveColumns = columns.filter((c) => columnVisibility[c.accessor] !== false);
  }

  return (
    <>
      <StyledTable>
        <TableHead
          columns={effectiveColumns}
          handleSorting={handleSorting}
          sortField={sortField}
          sortOrder={sortOrder}
        />
        {tableData && <TableBody columns={effectiveColumns} tableData={tableData} />}
      </StyledTable>
    </>
  );
};

export default Table;
