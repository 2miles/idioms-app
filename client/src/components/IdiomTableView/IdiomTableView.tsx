import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Idiom, ColumnVisibility, ColumnAccessors, SearchColumnAccessors } from '@/types';
import SearchBar from '@/components/SearchBar/SearchBar';
import Table from '@/components/Table/Table/Table';
import Pagination from '@/components/Pagination/Pagination';
import RestoreIcon from '@/images/arrow-restore.svg?react';
import ItemsPerPageDropdown from '@/components/Dropdown/ItemsPerPageDropdown/ItemsPerPageDropdown';
import ColumnDropdown from '@/components/Dropdown/ColumnDropdown/ColumnDropdown';
import { publicIdiomFinder } from '@/apis/idiomFinder';
import { SecondaryButton } from '../ButtonStyles';
import { useDebounce } from '@/hooks/useDebounce';

// TODO:
// Make searchParams setup fully cleaned and abstracted
//   — it might be worth extracting into a useQueryDefaults() hook eventually.

const StyledRestoreIcon = styled(RestoreIcon)`
  width: 22px;
  height: 22px;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 0px;
  margin-right: 0px;
`;

const TableSectionWrapper = styled.div`
  margin: var(--margin-md) auto var(--margin-xxl);
  background-color: transparent;

  border-radius: var(--radius-sm);
`;

const TableControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .bottom-row {
    display: flex;
    align-items: center;
    gap: var(--gap-sm);
    flex-wrap: wrap;
  }

  .spacer {
    flex: 1 1 auto;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: var(--space-md) !important;

  @media (min-width: 661px) {
    width: auto;
  }
`;
const ShowingText = styled.p`
  margin-right: auto;
  white-space: nowrap;
  font-size: var(--font-md);
  font-weight: 500;
  margin-bottom: var(--margin-sm);
  padding-bottom: var(--padding-sm);
  color: var(--color-text-primary);
  opacity: 0.8;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--margin-sm);
`;

const RightGroup = styled.div`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: var(--gap-sm);
  margin-left: 'auto';
`;

const LeftGroup = styled.div`
  display: 'inline-flex';
  gap: 'var(--gap-sm)';
`;

const IdiomTableView = () => {
  // Hook for URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();

  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // --- Initial state from URL (one-time only) ---
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialLimit = parseInt(searchParams.get('limit') || '20', 10);
  const initialSearch = searchParams.get('search') || '';
  const initialSearchColumn =
    (searchParams.get('searchColumn') as SearchColumnAccessors) || 'title';
  const initialSortField = (searchParams.get('sortField') as ColumnAccessors) || 'timestamps';
  const initialSortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [searchColumn, setSearchColumn] = useState<SearchColumnAccessors>(initialSearchColumn);
  const [sortField, setSortField] = useState<ColumnAccessors>(initialSortField);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);

  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const isSmallScreen = window.innerWidth < 660;

  // State: column visibility
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    position: true,
    title: true,
    definition: true,
    timestamps: false,
    contributor: false,
  });

  useEffect(() => {
    onSearchTermChange(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const hasPage = searchParams.has('page');
    const hasLimit = searchParams.has('limit');
    const hasSortField = searchParams.has('sortField');
    const hasSortOrder = searchParams.has('sortOrder');

    if (!hasPage || !hasLimit || !hasSortField || !hasSortOrder) {
      const params = new URLSearchParams(searchParams);
      if (!hasPage) params.set('page', '1');
      if (!hasLimit) params.set('limit', '20');
      if (!hasSortField) params.set('sortField', 'timestamps');
      if (!hasSortOrder) params.set('sortOrder', 'desc');
      setSearchParams(params);
    }
  }, []);

  useEffect(() => {
    const paramColumn = searchParams.get('searchColumn') as SearchColumnAccessors;
    const paramField = searchParams.get('sortField') as ColumnAccessors;
    const paramOrder = searchParams.get('sortOrder') as 'asc' | 'desc';
    const paramPage = parseInt(searchParams.get('page') || '1', 10);

    if (paramColumn && paramColumn !== searchColumn) {
      setSearchColumn(paramColumn);
    }
    if (paramField && paramField !== sortField) {
      setSortField(paramField);
    }
    if (paramOrder && paramOrder !== sortOrder) {
      setSortOrder(paramOrder);
    }
    if (!Number.isNaN(paramPage)) {
      setCurrentPage(paramPage);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await publicIdiomFinder.get('/', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: searchTerm,
            searchColumn: searchColumn,
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
  }, [currentPage, itemsPerPage, searchTerm, searchColumn, sortField, sortOrder, searchParams]);

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

  const onSearchColumnChange = (column: SearchColumnAccessors) => {
    setSearchColumn(column);
    setCurrentPage(1);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('searchColumn', column);
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
    setCurrentPage(1);
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
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('sortField', field);
      params.set('sortOrder', order);
      return params;
    });
  };

  const restoreTable = () => {
    setSearchParams({
      page: '1',
      limit: '20',
      search: '',
      searchColumn: 'title',
      sortField: 'timestamps',
      sortOrder: 'desc',
    });
    setCurrentPage(1);
    setItemsPerPage(20);
    setSearchTerm('');
    setSearchColumn('title');
    setSortField('timestamps');
    setSortOrder('desc');
    setInputValue('');
  };

  const showingStart = (currentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(currentPage * itemsPerPage, totalCount);
  const showingText =
    totalCount === 0 ? '' : `${showingStart}\u2013${showingEnd} of ${totalCount} idioms`;

  return (
    <TableSectionWrapper>
      <SearchBarWrapper>
        <SearchBar
          searchTerm={inputValue}
          searchColumn={searchColumn}
          onSearchTermChange={setInputValue}
          onSearchColumnChange={onSearchColumnChange}
          onImmediateSearch={(term) => {
            setInputValue(term);
            onSearchTermChange(term);
          }}
        />
      </SearchBarWrapper>

      <TableControls>
        <div className='top-row'>
          <ShowingText>{showingText}</ShowingText>
        </div>
        <div className='bottom-row'>
          <LeftGroup>
            <div className='reset-wrapper'>
              <SecondaryButton onClick={restoreTable} className='btn btn-secondary'>
                <StyledRestoreIcon />
              </SecondaryButton>
            </div>
          </LeftGroup>
          <div className='spacer' />
          <RightGroup>
            <ColumnDropdown
              columnVisibility={columnVisibility}
              handleColumnVisibilityChange={handleColumnVisibilityChange}
            />
            <ItemsPerPageDropdown handleItemsPerPageChange={handleLimitChange} />
            <PaginationWrapper>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalCount}
                paginate={handlePageChange}
                currentPage={currentPage}
                isCompact={isSmallScreen}
              />
            </PaginationWrapper>
          </RightGroup>
        </div>
      </TableControls>
      <Table
        tableData={idioms}
        handleSorting={handleSorting}
        columnVisibility={columnVisibility}
        sortField={sortField}
        sortOrder={sortOrder}
      />
      <TableControls>
        <PaginationWrapper>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={totalCount}
            paginate={handlePageChange}
            currentPage={currentPage}
            isCompact={isSmallScreen}
          />
        </PaginationWrapper>
      </TableControls>
    </TableSectionWrapper>
  );
};

export default IdiomTableView;
