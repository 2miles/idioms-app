import styled from 'styled-components';

import { Idiom, ColumnAccessors, ColumnVisibility, Columns } from '@/types';
import TableBody from '@/components/TableBody';
import TableHead from '@/components/TableHead';

export const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

type TableProps = {
  tableData: Idiom[];
  handleSorting: (sortField: ColumnAccessors, sortOrder: 'asc' | 'desc') => void;
  columnVisibility: ColumnVisibility;
};

const Table = ({ tableData, handleSorting, columnVisibility }: TableProps) => {
  const columns = Columns;
  const visibleColumns = columns.filter((col) => columnVisibility[col.accessor]);

  return (
    <>
      <StyledTable className='table'>
        <TableHead columns={visibleColumns} handleSorting={handleSorting} />
        {tableData && <TableBody columns={visibleColumns} tableData={tableData} />}
      </StyledTable>
    </>
  );
};

export default Table;
