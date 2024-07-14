import React from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';

const Table = ({
  tableData,
  idiomCount,
  handleSorting,
  currentPage,
  itemsPerPage,
}) => {
  const columns = [
    { label: 'ID', accessor: 'id', sortable: true },
    { label: 'Title', accessor: 'title', sortable: true },
    { label: 'Definition', accessor: 'definition', sortable: true },
    { label: 'Day', accessor: 'timestamps', sortable: true },
    { label: 'Owner', accessor: 'contributor', sortable: true },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const showingText = `Showing ${indexOfFirstItem + 1} - ${
    indexOfLastItem > idiomCount ? idiomCount : indexOfLastItem
  } of ${idiomCount} idioms`;

  return (
    <>
      <div>
        <p className="showing-text">{showingText}</p>
      </div>
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        {tableData && <TableBody columns={columns} tableData={tableData} />}
      </table>
    </>
  );
};

export default Table;
