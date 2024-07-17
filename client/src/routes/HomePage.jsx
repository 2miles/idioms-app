import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Table from '../components/Table_';
import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';
import AddIdiomCollapsible from '../components/AddIdiomCollapsible';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const { idioms, setIdioms } = useContext(IdiomsContext);
  const [filteredIdioms, setFilteredIdioms] = useState([]); // Holds the filtered set of idiom data based on search input.
  const [idiomCount, setIdiomCount] = useState(0); // State to store the count of filtered idioms
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Number of items per page
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    id: false,
    title: true,
    definition: true,
    timestamps: true,
    contributor: false,
  });
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

  // Handle search
  const handleSearch = (term) => {
    const filtered = idioms.filter((idiom) =>
      idiom.title.toLowerCase().includes(term.toLowerCase()),
    );
    setCurrentPage(1); // Reset to first page on search
    setFilteredIdioms(filtered);
    setIdiomCount(filtered.length);
  };

  // Syncs the local state (filteredData and idiomCount) with the global idioms state from the context.
  // Runs every time the idioms state changes.
  // Ensures that any updates to the idioms state (such as adding a new idiom) are reflected in the
  // local state used for filtering and displaying the idioms, ensuring the view stays up to date.
  useEffect(() => {
    setFilteredIdioms(idioms);
    setIdiomCount(idioms.length);
  }, [idioms]);

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
    <div>
      <Header />
      <div className="add-idiom-container">
        <AddIdiomCollapsible />
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className="table-container">
        <div className="pagination-controls">
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={idiomCount}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        <div className="flex-container">
          <div className="showing-text-container">
            <p className="showing-text">{showingText}</p>
          </div>
          <div className="dropdown-wrapper">
            <div
              id="list1"
              className={`dropdown-check-list ${
                showColumnSelector ? 'visible' : ''
              }`}
              onClick={(e) => {
                if (e.target.className.includes('anchor')) {
                  setShowColumnSelector(!showColumnSelector);
                }
              }}
            >
              <span className="anchor">Columns</span>
              <ul className="items" onClick={(e) => e.stopPropagation()}>
                {Object.keys(columnVisibility).map((column) => (
                  <li key={column}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={columnVisibility[column]}
                        onChange={() => handleColumnVisibilityChange(column)}
                      />
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
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
