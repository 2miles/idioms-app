import { useState, useEffect } from 'react';
// import tableData1 from "../tableData1.json";
import TableBody from './TableBody';
import TableHead from './TableHead';
import IdiomFinder from '../apis/idiomFinder';

const Table = () => {
  const [tableData, setTableData] = useState();

  // Will execute this code block only once, right after the component is initially rendered.
  // If the dependency array is empty, it won't run again on subsequent renders.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IdiomFinder.get('/');
        setTableData(response.data.data.idioms);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const columns = [
    { label: 'ID', accessor: 'id', sortable: true },
    { label: 'Title', accessor: 'title_old', sortable: true },
    { label: 'Definition', accessor: 'definition', sortable: true },
    { label: 'Day', accessor: 'day', sortable: true },
    { label: 'Owner', accessor: 'owner', sortable: true },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  return (
    <>
      <table className="table">
        <caption>All my friends love idioms</caption>
        <TableHead columns={columns} handleSorting={handleSorting} />
        {tableData && <TableBody columns={columns} tableData={tableData} />}
      </table>
    </>
  );
};

export default Table;
