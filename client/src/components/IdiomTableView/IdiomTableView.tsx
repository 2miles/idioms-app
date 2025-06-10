import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { IdiomsContext } from '@/context/idiomsContext';
import { Idiom, ColumnVisibility, ColumnAccessors } from '@/types';
import SearchBar from '@/components/SearchBar/SearchBar';
import Table from '@/components/Table/Table/Table';
import Pagination from '@/components/Pagination/Pagination';
import ItemsPerPageDropdown from '@/components/Dropdown/ItemsPerPageDropdown/ItemsPerPageDropdown';
import ColumnDropdown from '@/components/Dropdown/ColumnDropdown/ColumnDropdown';

const TableSectionWrapper = styled.div`
  margin: var(--margin-md) auto var(--margin-xxl);
  background-color: var(--color-canvas);
  border-radius: var(--radius-sm);
`;

const TableControls = styled.div`
  display: flex;
  justify-content: right;
  align-items: end;
  flex-wrap: wrap;
  padding-bottom: var(--padding-sm);

  @media (max-width: 660px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const ShowingText = styled.p`
  margin-right: auto;
  white-space: nowrap;
  font-size: var(--font-md);
  margin-bottom: var(--margin-sm);
  padding-bottom: var(--padding-sm);
  color: var(--color-text-primary);
`;

const RightControls = styled.div`
  display: flex;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--margin-sm);
`;

const IdiomTableView = () => {
  const { idioms } = useContext(IdiomsContext);

  const [filteredIdioms, setFilteredIdioms] = useState(idioms);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    position: true,
    title: true,
    definition: true,
    timestamps: false,
    contributor: false,
  });

  useEffect(() => {
    setFilteredIdioms(idioms);
    setCurrentPage(1); // Reset to the first page when idioms change
  }, [idioms]);

  // Updates filtered idioms when the search changes
  const handleSearch = (filtered: Idiom[]) => {
    setFilteredIdioms(filtered);
    setCurrentPage(1);
  };

  /**
   * Modifies the `filteredIdioms` state.
   */
  const handleSorting = (sortField: ColumnAccessors, sortOrder: 'desc' | 'asc') => {
    if (!sortField) return; // Early return if no sort field is provided

    const sorted = [...filteredIdioms].sort((a, b) => {
      const aValue = a[sortField]?.toString() || ''; // Optional chaining and fallback to empty string
      const bValue = b[sortField]?.toString() || '';

      if (aValue === null || aValue === '') return 1; // Handle null and empty values
      if (bValue === null || bValue === '') return -1;

      return aValue.localeCompare(bValue, 'en', { numeric: true }) * (sortOrder === 'asc' ? 1 : -1);
    });

    setFilteredIdioms(sorted);
  };

  const handleColumnVisibilityChange = (accessor: ColumnAccessors) => {
    setColumnVisibility({
      ...columnVisibility,
      [accessor]: !columnVisibility[accessor],
    });
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIdioms.slice(indexOfFirstItem, indexOfLastItem);

  const idiomCount = filteredIdioms.length; // Derived value
  const showingText =
    idiomCount === 0
      ? ''
      : `Showing ${indexOfFirstItem + 1} - ${
          indexOfLastItem > idiomCount ? idiomCount : indexOfLastItem
        } of ${idiomCount} idioms`;

  return (
    <TableSectionWrapper>
      <SearchBarWrapper>
        <SearchBar handleSearch={handleSearch} idioms={idioms} />
      </SearchBarWrapper>
      <TableControls>
        <ShowingText>{showingText}</ShowingText>
        <RightControls>
          <ColumnDropdown
            columnVisibility={columnVisibility}
            handleColumnVisibilityChange={handleColumnVisibilityChange}
          />
          <ItemsPerPageDropdown handleItemsPerPageChange={handleItemsPerPageChange} />
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
        />
      </TableControls>
    </TableSectionWrapper>
  );
};

export default IdiomTableView;
