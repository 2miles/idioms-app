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
    { label: 'ID', accessor: 'id' },
    { label: 'Title', accessor: 'title_old' },
    { label: 'Definition', accessor: 'definition' },
    { label: 'Day', accessor: 'day' },
    { label: 'Owner', accessor: 'owner' },
  ];

  return (
    <>
      <table className="table">
        <caption>All my homies love idoims</caption>
        <tbody>
          <TableHead columns={columns} />
          {tableData && <TableBody columns={columns} tableData={tableData} />}
        </tbody>
      </table>
    </>
  );
};

export default Table;
