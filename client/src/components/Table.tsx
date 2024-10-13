import styled from 'styled-components';
import TableBody from './TableBody';
import TableHead from './TableHead';

export const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

type Idiom = {
  id: number;
  title: string;
  title_general: string | null;
  definition: string | null;
  timestamps: string;
  contributor: string | null;
  position: number | null;
};

type ColumnVisibility = {
  position: boolean;
  title: boolean;
  definition: boolean;
  timestamps: boolean;
  contributor: boolean;
};

type ColumnValues = 'position' | 'title' | 'definition' | 'timestamps' | 'contributor';

type TableProps = {
  tableData: Idiom[];
  handleSorting: (sortField: ColumnValues, sortOrder: 'asc' | 'desc') => void;
  columnVisibility: ColumnVisibility;
};

const Table = ({ tableData, handleSorting, columnVisibility }: TableProps) => {
  const columns: { label: string; accessor: keyof ColumnVisibility }[] = [
    { label: '#', accessor: 'position' },
    { label: 'Idiom', accessor: 'title' },
    { label: 'Definition', accessor: 'definition' },
    { label: 'Day', accessor: 'timestamps' },
    { label: 'Owner', accessor: 'contributor' },
  ];

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
