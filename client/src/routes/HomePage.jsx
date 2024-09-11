import React, { useState, useEffect, useContext } from 'react';

import { IdiomsContext } from '../context/idiomsContext';

import Header from '../components/Header';
import Table from '../components/Table_';
import AddIdiomCollapsible from '../components/AddIdiomCollapsible';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import ItemsPerPageDropdown from '../components/ItemsPerPageDropdown';
import ColumnDropdown from '../components/ColumnDropdown';

const HomePage = () => {
  const { idioms } = useContext(IdiomsContext);
  const [filteredIdioms, setFilteredIdioms] = useState([]); // Holds the filtered set of idiom data based on search input.
  const [idiomCount, setIdiomCount] = useState(0); // State to store the count of filtered idioms
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Number of items per page
  const [columnVisibility, setColumnVisibility] = useState({
    position: true,
    // id: false,
    title: true,
    definition: true,
    timestamps: false,
    contributor: false,
  });
  // Fetches idioms from an API.
  // Runs only once when the component mounts (or if setIdioms were to change).
  // Sets both the global idioms state (via context) and local state (filteredData and idiomCount).
  // crucial for initially loading data from the server when the component mounts.
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await IdiomFinder.get('/');
  //       const data = response.data.data.idioms;
  //       setIdioms(data);
  //       setFilteredIdioms(data);
  //       setIdiomCount(data.length);
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Syncs the local state (filteredData and idiomCount) with the global idioms state from the context.
  // Runs every time the idioms state changes.
  // Ensures that any updates to the idioms state (such as adding a new idiom) are reflected in the
  // local state used for filtering and displaying the idioms, ensuring the view stays up to date.
  useEffect(() => {
    setFilteredIdioms(idioms);
    setIdiomCount(idioms.length);
  }, [idioms]);

  const handleSearch = (filtered) => {
    setCurrentPage(1);
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

  const handleColumnVisibilityChange = (column) => {
    setColumnVisibility({
      ...columnVisibility,
      [column]: !columnVisibility[column],
    });
  };
  // Calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIdioms.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const showingText = `Showing ${indexOfFirstItem + 1} - ${
    indexOfLastItem > idiomCount ? idiomCount : indexOfLastItem
  } of ${idiomCount} idioms`;

  return (
    <div className="page-container">
      <Header />
      <AddIdiomCollapsible />
      <div className="table-container">
        <SearchBar handleSearch={handleSearch} idioms={idioms} />
        <div className="table-controls">
          <p className="showing-text">{showingText}</p>
          <div className="right-controls">
            <ColumnDropdown
              columnVisibility={columnVisibility}
              handleColumnVisibilityChange={handleColumnVisibilityChange}
            />
            <ItemsPerPageDropdown
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={idiomCount}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>

        <Table
          tableData={currentItems}
          handleSorting={handleSorting}
          columnVisibility={columnVisibility}
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={idiomCount}
          paginate={paginate}
          currentPage={currentPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default HomePage;
