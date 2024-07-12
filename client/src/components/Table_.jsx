import React from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import SearchBar from './SearchBar';

const Table = ({ tableData, idiomCount, handleSorting }) => {
  const columns = [
    { label: 'ID', accessor: 'id', sortable: true },
    { label: 'Title', accessor: 'title', sortable: true },
    { label: 'Definition', accessor: 'definition', sortable: true },
    { label: 'Day', accessor: 'timestamps', sortable: true },
    { label: 'Owner', accessor: 'contributor', sortable: true },
  ];

  return (
    <>
      {/* <SearchBar handleSearch={handleSearch} /> */}
      <div>
        <p>{idiomCount} Idioms found</p>
      </div>
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        {tableData && <TableBody columns={columns} tableData={tableData} />}
      </table>
    </>
  );
};

export default Table;
