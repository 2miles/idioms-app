import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import AddIdiom from '../components/AddIdiom';
import Table from '../components/Table_';
import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';

const HomePage = () => {
  const { idioms, setIdioms } = useContext(IdiomsContext);
  const [filteredIdioms, setFilteredIdioms] = useState([]); // Holds the filtered set of idiom data based on search input.
  const [idiomCount, setIdiomCount] = useState(0); // State to store the count of filtered idioms

  // Fetches idioms from an API.
  // Runs only once when the component mounts (or if setIdioms were to change).
  // Sets both the global idioms state (via context) and local state (filteredData and idiomCount).
  // crucial for initially loading data from the server when the component mounts.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IdiomFinder.get('/');
        const data = response.data.data.idioms;
        setIdioms(data);
        setFilteredIdioms(data);
        setIdiomCount(data.length);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  // Syncs the local state (filteredData and idiomCount) with the global idioms state from the context.
  // Runs every time the idioms state changes.
  // Ensures that any updates to the idioms state (such as adding a new idiom) are reflected in the
  // local state used for filtering and displaying the idioms, ensuring the view stays up to date.
  useEffect(() => {
    setFilteredIdioms(idioms);
    setIdiomCount(idioms.length);
  }, [idioms]);

  // Filters the idioms based on the search term by updating the filteredData and idiomCount state variables
  const handleSearch = (searchTerm) => {
    const filtered = idioms.filter((idiom) =>
      idiom.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredIdioms(filtered);
    setIdiomCount(filtered.length);
  };

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...filteredIdioms].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setFilteredIdioms(sorted);
    }
  };

  return (
    <div className="table_container">
      <Header />
      <AddIdiom />
      <Table
        tableData={filteredIdioms}
        idiomCount={idiomCount}
        handleSearch={handleSearch}
        handleSorting={handleSorting}
      />
    </div>
  );
};

export default HomePage;
