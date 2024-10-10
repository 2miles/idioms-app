import React from 'react';
import styled from 'styled-components';
import TableBody from './TableBody';
import TableHead from './TableHead';

export const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const Table = ({ tableData, handleSorting, columnVisibility }) => {
  const columns = [
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
