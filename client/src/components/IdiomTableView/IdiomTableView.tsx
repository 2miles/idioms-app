import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { publicIdiomFinder } from '@/apis/idiomFinder';
import ColumnDropdown from '@/components/Dropdown/ColumnDropdown/ColumnDropdown';
import ItemsPerPageDropdown from '@/components/Dropdown/ItemsPerPageDropdown/ItemsPerPageDropdown';
import Pagination from '@/components/Pagination/Pagination';
import SearchBar from '@/components/SearchBar/SearchBar';
import Table from '@/components/Table/Table/Table';
import { useDebounce } from '@/hooks/useDebounce';
import { ColumnAccessors, ColumnVisibility, Idiom, SearchColumnAccessors } from '@/types';
import { getListStateFromURL } from '@/utils/listParams';
import { getShowingText } from '@/utils/pagination';

import AzLetterDropdown from '../Dropdown/AzLetterDropdown';
import {
  LeftGroup,
  PaginationWrapper,
  ResetButton,
  RightGroup,
  SearchBarWrapper,
  ShowingText,
  StyledRestoreIcon,
  TableControls,
  TableSectionWrapper,
} from './IdiomTableView.styles';

// TODO:
// Make searchParams setup fully cleaned and abstracted
//   — it might be worth extracting into a useQueryDefaults() hook eventually.

const IdiomTableView = () => {
  // Hook for URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // initial state from URL
  const init = getListStateFromURL(searchParams);
  const [currentPage, setCurrentPage] = useState(init.page);
  const [itemsPerPage, setItemsPerPage] = useState(init.limit);
  const [searchTerm, setSearchTerm] = useState(init.search);
  const [searchColumn, setSearchColumn] = useState(init.searchColumn);
  const [sortField, setSortField] = useState(init.sortField);
  const [sortOrder, setSortOrder] = useState(init.sortOrder);

  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const isSmallScreen = window.innerWidth < 660;

  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    position: true,
    title: true,
    definition: true,
    timestamps: false,
    contributor: false,
  });

  // Ensure required params exist in URL (once on mount)
  useEffect(() => {
    const defaultParams = getListStateFromURL(searchParams);
    const updatedParams = new URLSearchParams(searchParams);

    // If URL already has values, this won’t change them; otherwise it sets defaults.
    updatedParams.set('page', String(defaultParams.page));
    updatedParams.set('limit', String(defaultParams.limit));
    updatedParams.set('sortField', defaultParams.sortField);
    updatedParams.set('sortOrder', defaultParams.sortOrder);
    updatedParams.set('searchColumn', defaultParams.searchColumn);
    updatedParams.set('search', defaultParams.search);

    if (updatedParams.toString() !== searchParams.toString()) {
      setSearchParams(updatedParams, { replace: true });
    }
  }, []);

  useEffect(() => {
    const state = getListStateFromURL(searchParams);
    setCurrentPage(state.page);
    setItemsPerPage(state.limit);
    setSearchTerm(state.search);
    setSearchColumn(state.searchColumn);
    setSortField(state.sortField);
    setSortOrder(state.sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    handleSearchTermChange(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

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

  const handleSearchTermChange = (term: string) => {
    const normalizedSearchTerm = term ?? '';
    if (normalizedSearchTerm === searchTerm) {
      // Keep URL in sync without resetting page
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('search', normalizedSearchTerm);
        return params;
      });
      return;
    }
    setSearchTerm(normalizedSearchTerm);
    setCurrentPage(1);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('search', normalizedSearchTerm);
      params.set('page', '1');
      return params;
    });
  };

  const handleSearchColumnChange = (column: SearchColumnAccessors) => {
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

  const handleRestoreTable = () => {
    const defaultParams = new URLSearchParams();
    defaultParams.set('page', '1');
    defaultParams.set('limit', '20');
    defaultParams.set('search', '');
    defaultParams.set('searchColumn', 'title');
    defaultParams.set('sortField', 'timestamps');
    defaultParams.set('sortOrder', 'desc');
    setSearchParams(defaultParams);

    setCurrentPage(1);
    setItemsPerPage(20);
    setSearchTerm('');
    setSearchColumn('title');
    setSortField('timestamps');
    setSortOrder('desc');
    setInputValue('');
  };

  const showingText = getShowingText(currentPage, itemsPerPage, totalCount);

  return (
    <TableSectionWrapper>
      <SearchBarWrapper>
        <SearchBar
          searchTerm={inputValue}
          searchColumn={searchColumn}
          onSearchTermChange={setInputValue}
          onSearchColumnChange={handleSearchColumnChange}
          onImmediateSearch={(term) => {
            setInputValue(term);
            handleSearchTermChange(term);
          }}
        />
      </SearchBarWrapper>

      <TableControls>
        <div className='top-row'>
          <ShowingText>{showingText}</ShowingText>
          <AzLetterDropdown />
        </div>
        <div className='bottom-row'>
          <LeftGroup>
            <div className='reset-wrapper'>
              <ResetButton onClick={handleRestoreTable} className='btn btn-secondary'>
                <StyledRestoreIcon />
              </ResetButton>
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
