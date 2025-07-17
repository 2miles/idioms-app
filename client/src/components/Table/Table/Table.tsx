import styled from 'styled-components';

import { Idiom, ColumnAccessors, ColumnVisibility, Columns } from '@/types';
import TableBody from '@/components/Table/TableBody/TableBody';
import TableHead from '@/components/Table/TableHead/TableHead';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-left: none !important;
  border-right: none !important;

  border-radius: var(--radius-md) !important;
  overflow: hidden !important;
  border-collapse: separate;
  border-spacing: 0;
  border-right: 1px solid var(--color-ui-border) !important;
  border-left: 1px solid var(--color-ui-border) !important;
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
  const visibleColumns = columns.filter((col) => columnVisibility[col.accessor]);

  return (
    <>
      <StyledTable>
        <TableHead
          columns={visibleColumns}
          handleSorting={handleSorting}
          sortField={sortField}
          sortOrder={sortOrder}
        />
        {tableData && <TableBody columns={visibleColumns} tableData={tableData} />}
      </StyledTable>
    </>
  );
};

export default Table;
