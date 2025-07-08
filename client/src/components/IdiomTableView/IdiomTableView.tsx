import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Idiom, ColumnVisibility, ColumnAccessors } from '@/types';
import SearchBar from '@/components/SearchBar/SearchBar';
import Table from '@/components/Table/Table/Table';
import Pagination from '@/components/Pagination/Pagination';
import ItemsPerPageDropdown from '@/components/Dropdown/ItemsPerPageDropdown/ItemsPerPageDropdown';
import ColumnDropdown from '@/components/Dropdown/ColumnDropdown/ColumnDropdown';

const TableSectionWrapper = styled.div`
  margin: var(--margin-md) auto var(--margin-xxl);
  background-color: transparent;

  border-radius: var(--radius-sm);
`;

const TableControls = styled.div`
  display: flex;
  justify-content: right;
  align-items: end;
  flex-wrap: wrap;

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
  // Hook for URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // State: idioms and total count
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // State: pagination
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialLimit = parseInt(searchParams.get('limit') || '20', 10);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // State: search input and search column
  const initialSearch = searchParams.get('search') || '';
  const initialColumn = (searchParams.get('column') as ColumnAccessors) || 'title';
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [searchColumn, setSearchColumn] = useState<ColumnAccessors>(initialColumn);

  // State: column visibility
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    position: true,
    title: true,
    definition: true,
    timestamps: false,
    contributor: false,
  });

  useEffect(() => {
    const hasPage = searchParams.has('page');
    const hasLimit = searchParams.has('limit');

    if (!hasPage || !hasLimit) {
      const params = new URLSearchParams(searchParams);
      if (!hasPage) params.set('page', '1');
      if (!hasLimit) params.set('limit', '20');
      setSearchParams(params);
    }
  }, []);

  useEffect(() => {
    const paramColumn = searchParams.get('column') as ColumnAccessors;
    if (paramColumn && paramColumn !== searchColumn) {
      setSearchColumn(paramColumn);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`/api/v1/idioms`, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: searchTerm,
            column: searchColumn,
          },
        });

        setIdioms(res.data.data.idioms);
        setTotalCount(res.data.data.totalCount);
      } catch (err) {
        console.error('Failed to fetch idioms:', err);
      }
    };
    fetchPage();
  }, [currentPage, itemsPerPage, searchTerm, searchColumn]);

  const onSearchTermChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('search', term);
      params.set('page', '1');
      return params;
    });
  };

  const onSearchColumnChange = (column: ColumnAccessors) => {
    setSearchColumn(column);
    setCurrentPage(1);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('column', column);
      params.set('page', '1');
      return params;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(page));
      return params;
    });
  };

  const handleLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to first page when limit changes
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', '1');
      params.set('limit', String(newLimit));
      return params;
    });
  };

  const handleColumnVisibilityChange = (accessor: ColumnAccessors) => {
    setColumnVisibility({
      ...columnVisibility,
      [accessor]: !columnVisibility[accessor],
    });
  };

  const handleSorting = (sortField: ColumnAccessors, sortOrder: 'desc' | 'asc') => {
    console.log(`Sort by ${sortField} ${sortOrder}`);
  };

  const showingStart = (currentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(currentPage * itemsPerPage, totalCount);
  const showingText =
    totalCount === 0 ? '' : `Showing ${showingStart} - ${showingEnd} of ${totalCount} idioms`;

  return (
    <TableSectionWrapper>
      <SearchBarWrapper>
        <SearchBar
          searchTerm={searchTerm}
          searchColumn={searchColumn}
          onSearchTermChange={onSearchTermChange}
          onSearchColumnChange={onSearchColumnChange}
        />
      </SearchBarWrapper>
      <TableControls>
        <ShowingText>{showingText}</ShowingText>
        <RightControls>
          <ColumnDropdown
            columnVisibility={columnVisibility}
            handleColumnVisibilityChange={handleColumnVisibilityChange}
          />
          <ItemsPerPageDropdown handleItemsPerPageChange={handleLimitChange} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={totalCount}
            paginate={handlePageChange}
            currentPage={currentPage}
          />
        </RightControls>
      </TableControls>
      <Table tableData={idioms} handleSorting={handleSorting} columnVisibility={columnVisibility} />
      <TableControls>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalCount}
          paginate={handlePageChange}
          currentPage={currentPage}
        />
      </TableControls>
    </TableSectionWrapper>
  );
};

export default IdiomTableView;
