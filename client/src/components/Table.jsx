import { useState, useEffect } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import IdiomFinder from '../apis/idiomFinder';
import SearchBar from './SearchBar';

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [idiomCount, setIdiomCount] = useState(0); // State to store the count of filtered idioms

  // Will execute this code block only once, right after the component is initially rendered.
  // If the dependency array is empty, it won't run again on subsequent renders.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IdiomFinder.get('/');
        setTableData(response.data.data.idioms);
        setFilteredData(response.data.data.idioms);
        setIdiomCount(response.data.data.idioms.length);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = tableData.filter((item) =>
      item.title_old.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredData(filtered);
    setIdiomCount(filtered.length);
  };

  const columns = [
    { label: 'ID', accessor: 'id', sortable: true },
    { label: 'Title', accessor: 'title_old', sortable: true },
    { label: 'Definition', accessor: 'definition', sortable: true },
    { label: 'Day', accessor: 'day', sortable: true },
    { label: 'Owner', accessor: 'owner', sortable: true },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...filteredData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setFilteredData(sorted);
    }
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <div>
        <p>{idiomCount} Idioms found</p>
      </div>
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        {tableData && <TableBody columns={columns} tableData={filteredData} />}
      </table>
    </>
  );
};

export default Table;
