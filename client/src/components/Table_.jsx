import React from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';

const Table = ({ tableData, handleSorting, columnVisibility }) => {
  const columns = [
    { label: 'Position', accessor: 'position', sortable: true },
    { label: 'ID', accessor: 'id', sortable: true },
    { label: 'Title', accessor: 'title', sortable: true },
    { label: 'Definition', accessor: 'definition', sortable: true },
    { label: 'Day', accessor: 'timestamps', sortable: true },
    { label: 'Owner', accessor: 'contributor', sortable: true },
  ];
  const visibleColumns = columns.filter(
    (col) => columnVisibility[col.accessor],
  );

  return (
    <>
      <table className="table">
        <TableHead columns={visibleColumns} handleSorting={handleSorting} />
        {tableData && (
          <TableBody columns={visibleColumns} tableData={tableData} />
        )}
      </table>
    </>
  );
};

export default Table;
