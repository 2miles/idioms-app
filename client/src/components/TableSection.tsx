import { useState, useEffect, useContext } from 'react';
import { IdiomsContext } from '../context/idiomsContext';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import Table from './Table';
import Pagination from './Pagination';
import ItemsPerPageDropdown from './dropdowns/ItemsPerPageDropdown';
import ColumnDropdown from './dropdowns/ColumnDropdown';

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

const SearchAndFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--margin-sm);
`;

type ColumnVisibilityType = {
  position: boolean;
  title: boolean;
  definition: boolean;
  timestamps: boolean;
  contributor: boolean;
};

type ColumnValues = 'position' | 'title' | 'definition' | 'timestamps' | 'contributor';

type Idiom = {
  id: number;
  title: string;
  title_general: string | null;
  definition: string | null;
  timestamps: string;
  contributor: string | null;
  position: number | null;
};

const TableSection = () => {
  const { idioms } = useContext(IdiomsContext);

  const [filteredIdioms, setFilteredIdioms] = useState(idioms);
  const [idiomCount, setIdiomCount] = useState<number>(idioms.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [activeSearchColumn, setActiveSearchColumn] = useState<ColumnValues>('title'); // Default active column
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityType>({
    position: true,
    title: true,
    definition: true,
    timestamps: false,
    contributor: false,
  });

  // Updates filtered idioms when the search changes
  const handleSearch = (filtered: Idiom[]) => {
    setFilteredIdioms(filtered);
    setIdiomCount(filtered.length);
    setCurrentPage(1);
  };

  // Handle the search column change
  const handleSearchColumnChange = (column: ColumnValues) => {
    setActiveSearchColumn(column);
  };

  useEffect(() => {
    setFilteredIdioms(idioms);
    setIdiomCount(idioms.length);
  }, [idioms]);

  const handleSorting = (sortField: ColumnValues, sortOrder: 'desc' | 'asc') => {
    if (sortField) {
      const sorted = [...filteredIdioms].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setFilteredIdioms(sorted);
    }
  };

  const handleColumnVisibilityChange = (column: ColumnValues) => {
    setColumnVisibility({
      ...columnVisibility,
      [column]: !columnVisibility[column],
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIdioms.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const showingText = `Showing ${indexOfFirstItem + 1} - ${
    indexOfLastItem > idiomCount ? idiomCount : indexOfLastItem
  } of ${idiomCount} idioms`;

  return (
    <TableSectionWrapper>
      <SearchAndFilterWrapper>
        <SearchBar
          handleSearch={handleSearch}
          idioms={idioms}
          activeSearchColumn={activeSearchColumn}
          handleSearchColumnChange={handleSearchColumnChange}
        />
      </SearchAndFilterWrapper>
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

export default TableSection;
