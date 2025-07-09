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

// TODO:
// Make searchParams setup fully cleaned and abstracted
//   — it might be worth extracting into a useQueryDefaults() hook eventually.

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

  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState<ColumnAccessors>('title');

  const [sortField, setSortField] = useState<ColumnAccessors>('timestamps');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // State: column visibility
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    position: true,
    title: true,
    definition: true,
    timestamps: false,
    contributor: false,
  });

  // Set defaults in URL if missing
  // useEffect(() => {
  //   const requiredParams = ['page', 'limit', 'sortField', 'sortOrder', 'column'];
  //   const hasAll = requiredParams.every((key) => searchParams.has(key));

  //   if (!hasAll) {
  //     const params = new URLSearchParams(searchParams);

  //     if (!params.has('page')) params.set('page', '1');
  //     if (!params.has('limit')) params.set('limit', '20');
  //     if (!params.has('sortField')) params.set('sortField', 'timestamps');
  //     if (!params.has('sortOrder')) params.set('sortOrder', 'desc');
  //     if (!params.has('column')) params.set('column', 'title');
  //     setSearchParams(params);
  //   }
  // }, [searchParams]);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let updated = false;

    if (!params.has('page')) {
      params.set('page', '1');
      updated = true;
    }
    if (!params.has('limit')) {
      params.set('limit', '20');
      updated = true;
    }
    if (!params.has('sortField')) {
      params.set('sortField', 'timestamps');
      updated = true;
    }
    if (!params.has('sortOrder')) {
      params.set('sortOrder', 'desc');
      updated = true;
    }
    if (!params.has('column')) {
      params.set('column', 'title');
      updated = true;
    }

    if (updated) {
      setSearchParams(params, { replace: true }); // ✅ avoid pushing to history stack
    }
    // ✅ only run once, not when searchParams changes
  }, []);

  // Sync local state from URL
  // useEffect(() => {
  //   setCurrentPage(parseInt(searchParams.get('page') || '1', 10));
  //   setItemsPerPage(parseInt(searchParams.get('limit') || '20', 10));
  //   setSearchTerm(searchParams.get('search') || '');
  //   setSearchColumn((searchParams.get('column') as ColumnAccessors) || 'title');
  //   setSortField((searchParams.get('sortField') as ColumnAccessors) || 'timestamps');
  //   setSortOrder((searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc');
  // }, [searchParams]);

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get('page') || '1', 10));
    setItemsPerPage(parseInt(searchParams.get('limit') || '20', 10));
    setSearchTerm(searchParams.get('search') || '');
    setSearchColumn((searchParams.get('column') as ColumnAccessors) || 'title');
    setSortField((searchParams.get('sortField') as ColumnAccessors) || 'timestamps');
    setSortOrder((searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc');
  }, [searchParams.toString()]); // ✅ force re-run when URL actually changes

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`/api/v1/idioms`, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: searchTerm,
            column: searchColumn,
            sortField,
            sortOrder,
          },
        });

        setIdioms(res.data.data.idioms);
        setTotalCount(res.data.data.totalCount);
      } catch (err) {
        console.error('Failed to fetch idioms:', err);
      }
    };
    fetchPage();
  }, [currentPage, itemsPerPage, searchTerm, searchColumn, sortField, sortOrder]);

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

  const handleSorting = (field: ColumnAccessors, order: 'desc' | 'asc') => {
    setSortField(field);
    setSortOrder(order);
    setCurrentPage(1);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('sortField', field);
      params.set('sortOrder', order);
      params.set('page', '1');
      return params;
    });
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
