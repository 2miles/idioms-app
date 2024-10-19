import styled from 'styled-components';

// Customized Bootstrap pagination
const PageItem = styled.li`
  .page-link {
    padding: var(--padding-sm) var(--padding-xs);
    background-color: var(--color-ui-primary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-ui-border) !important;
    cursor: pointer;
    width: var(--space-xxxl);
    text-align: center;
    border: none;

    &:hover {
      background-color: var(--hilite-ui-primary);
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  &.disabled .page-link {
    color: var(--dim-text-primary);
  }

  &.active .page-link {
    background-color: var(--color-brand-secondary);
    color: var(--color-text-primary);
  }

  &.active .page-link:hover {
    background-color: var(--color-brand-secondary);
  }
`;

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }: PaginationProps) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumbersToShow = 3;
  const halfMaxPages = Math.floor(maxPageNumbersToShow / 2);

  const addPageNumber = (page: number) => {
    const isActive = currentPage === page;
    pageNumbers.push(
      <PageItem key={page} className={`page-item ${isActive ? 'active' : ''}`}>
        <a onClick={() => paginate(page)} href='#' className='page-link'>
          {page}
        </a>
      </PageItem>,
    );
  };

  if (totalPages <= maxPageNumbersToShow) {
    for (let i = 1; i <= totalPages; i++) {
      addPageNumber(i);
    }
  } else {
    let startPage = Math.max(currentPage - halfMaxPages, 1);
    let endPage = Math.min(currentPage + halfMaxPages, totalPages);

    if (currentPage - 1 <= halfMaxPages) {
      endPage = maxPageNumbersToShow;
    }
    if (totalPages - currentPage <= halfMaxPages) {
      startPage = totalPages - maxPageNumbersToShow + 1;
    }

    if (startPage > 1) {
      addPageNumber(1);
      if (startPage > 2) {
        pageNumbers.push(
          <PageItem key='start-ellipsis' className='page-item disabled'>
            <span className='page-link'>...</span>
          </PageItem>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      addPageNumber(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <PageItem key='end-ellipsis' className='page-item disabled'>
            <span className='page-link'>...</span>
          </PageItem>,
        );
      }
      addPageNumber(totalPages);
    }
  }

  return (
    <nav>
      <ul className='pagination'>
        <PageItem className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage - 1)} href='#' className='page-link'>
            &lt;
          </a>
        </PageItem>
        {pageNumbers}
        <PageItem className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage + 1)} href='#' className='page-link'>
            &gt;
          </a>
        </PageItem>
      </ul>
    </nav>
  );
};

export default Pagination;
