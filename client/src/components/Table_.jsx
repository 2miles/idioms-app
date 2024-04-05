import React from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import SearchBar from './SearchBar';

const Table = ({ tableData, idiomCount, handleSearch, handleSorting }) => {
  const columns = [
    { label: 'ID', accessor: 'id', sortable: true },
    { label: 'Title', accessor: 'title_old', sortable: true },
    { label: 'Definition', accessor: 'definition', sortable: true },
    { label: 'Day', accessor: 'day', sortable: true },
    { label: 'Owner', accessor: 'owner', sortable: true },
  ];

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
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
