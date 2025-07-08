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
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialLimit = parseInt(searchParams.get('limit') || '20', 10);

  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    position: true,
    title: true,
    definition: true,
    timestamps: false,
    contributor: false,
  });

  const handleSearch = () => {};

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`/api/v1/idioms?page=${currentPage}&limit=${itemsPerPage}`);
        setIdioms(res.data.data.idioms); // remove `.data`
        setTotalCount(res.data.data.totalCount); // remove `.data`
      } catch (err) {
        console.error('Failed to fetch idioms:', err);
      }
    };
    fetchPage();
  }, [currentPage, itemsPerPage]);

  const handleColumnVisibilityChange = (accessor: ColumnAccessors) => {
    setColumnVisibility({
      ...columnVisibility,
      [accessor]: !columnVisibility[accessor],
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

  const handleSorting = (sortField: ColumnAccessors, sortOrder: 'desc' | 'asc') => {
    console.log(`Sort by ${sortField} ${sortOrder}`);
  };

  const showingStart = (currentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(currentPage * itemsPerPage, totalCount);
  const showingText =
    totalCount === 0 ? '' : `Showing ${showingStart} - ${showingEnd} of ${totalCount} idioms`;

  return (
    <TableSectionWrapper>
      {/* <SearchBarWrapper>
        <SearchBar handleSearch={handleSearch} idioms={idioms} />
      </SearchBarWrapper> */}
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
