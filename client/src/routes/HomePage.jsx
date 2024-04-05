import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AddIdiom from '../components/AddIdiom';
import Table from '../components/Table_';
import IdiomFinder from '../apis/idiomFinder';

const HomePage = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [idiomCount, setIdiomCount] = useState(0); // State to store the count of filtered idioms

  // Will execute this code block only once, right after the component is initially rendered.
  // If the dependency array is empty, it won't run again on subsequent renders.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IdiomFinder.get('/');
        const data = response.data.data.idioms;
        setTableData(data);
        setFilteredData(data);
        setIdiomCount(data.length);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
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
    <div className="table_container">
      <Header />
      <AddIdiom />
      <Table
        tableData={filteredData}
        idiomCount={idiomCount}
        handleSearch={handleSearch}
        handleSorting={handleSorting}
      />
    </div>
  );
};

export default HomePage;
