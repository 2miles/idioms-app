import React, { useState, useEffect, useContext } from 'react';
import { IdiomsContext } from '../context/idiomsContext';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Header from '../components/Header';
import Table from '../components/Table_';
import AddIdiomCollapsible from '../components/AddIdiomCollapsible';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import ItemsPerPageDropdown from '../components/ItemsPerPageDropdown';
import ColumnDropdown from '../components/ColumnDropdown';

const TableSection = styled.div`
  margin: 16px auto 40px;
  padding: 20px 20px 40px;
  background-color: #efefea;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableControls = styled.div`
  display: flex;
  justify-content: right !important;
  align-items: center;

  @media (max-width: 660px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const ShowingText = styled.p`
  margin-right: auto;
  font-size: 18px;
  margin-bottom: 0px;
  color: #383f4d;
`;

const RightControls = styled.div`
  display: flex;
  margin-top: 10px;
`;

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
    <PageContainer>
      <Header />
      <AddIdiomCollapsible />
      <TableSection>
        <SearchBar handleSearch={handleSearch} idioms={idioms} />
        <TableControls>
          <ShowingText>{showingText}</ShowingText>
          <RightControls>
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
          </RightControls>
        </TableControls>
        <Table
          tableData={currentItems}
          handleSorting={handleSorting}
          columnVisibility={columnVisibility}
        />
        <TableControls>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={idiomCount}
            paginate={paginate}
            currentPage={currentPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
          />
        </TableControls>
      </TableSection>
    </PageContainer>
  );
};

export default HomePage;
