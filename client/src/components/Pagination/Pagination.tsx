import styled from 'styled-components';

// Customized Bootstrap pagination
const PageItem = styled.li`
  .page-link {
    padding: var(--padding-sm) var(--padding-xs);
    margin-top: 4px;

    background-color: var(--bg-dark);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border) !important;
    cursor: pointer;
    width: var(--space-xxxl);
    text-align: center;
    border: none;

    &:hover {
      background-color: var(--bg-medium);
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
    background-color: var(--color-active-pagination-bg) !important;
    border-color: var(--color-active-pagination-border) !important;
    color: var(--color-text-primary);
  }

  &.active .page-link:hover {
    background-color: var(--bg-lightest);
  }
  /* 👇 First and last child selectors */
  &:first-child .page-link {
    border-top-left-radius: var(--radius-sm) !important;
    border-bottom-left-radius: var(--radius-sm) !important;
  }

  &:last-child .page-link {
    border-top-right-radius: var(--radius-sm) !important;
    border-bottom-right-radius: var(--radius-sm) !important;
  }
  &.thin-gap .page-link {
    width: 10px;
    height: 41px; /* Match the height of regular pagination */
    display: inline-block;
    background-color: var(--bg-dark);
    border: 1px solid var(--color-border);
    pointer-events: none;
    padding: 0;
    margin: 0;
    margin-top: 4px;
    border-left: none !important;
    border-right: none !important;
  }
`;

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  isCompact: boolean;
};

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  isCompact,
}: PaginationProps) => {
  const pageNumbers: JSX.Element[] = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumbersToShow = isCompact ? 1 : 3;
  let actualMax = maxPageNumbersToShow;

  if (currentPage === 1 || currentPage === totalPages) {
    actualMax += 1;
  } else if (currentPage === 2 || currentPage === totalPages - 1) {
    actualMax += 1;
  } else if (currentPage === 3 || currentPage === totalPages - 2) {
    actualMax += 0;
  }

  const halfMaxPages = Math.floor(actualMax / 2);

  const addPageNumber = (page: number) => {
    const isActive = currentPage === page;
    pageNumbers.push(
      <PageItem key={page} className={`page-item ${isActive ? 'active' : ''}`}>
        <a
          onClick={() => paginate(page)}
          href='#'
          className='page-link'
          aria-label={`Go to page ${page}`}
        >
          {page}
        </a>
      </PageItem>,
    );
  };

  let spacerCount = 0;
  const addSpacer = () => {
    pageNumbers.push(
      <PageItem key={`spacer-${spacerCount++}`} className='page-item thin-gap disabled'>
        <span className='page-link' aria-hidden='true'></span>
      </PageItem>,
    );
  };

  if (totalPages <= actualMax) {
    for (let i = 1; i <= totalPages; i++) {
      addPageNumber(i);
    }
  } else {
    let startPage = Math.max(currentPage - halfMaxPages, 1);
    let endPage = Math.min(currentPage + halfMaxPages, totalPages);

    if (currentPage - 1 <= halfMaxPages) {
      endPage = actualMax;
    }
    if (totalPages - currentPage <= halfMaxPages) {
      startPage = totalPages - actualMax + 1;
    }

    if (startPage > 1) {
      addPageNumber(1);
      if (startPage > 2) {
        addSpacer();
      }
      if (startPage > totalPages - actualMax - 1) {
        addSpacer();
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      addPageNumber(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        addSpacer();
      }
      if (currentPage < actualMax + 1) {
        addSpacer();
      }
      addPageNumber(totalPages);
    }
  }

  return (
    <nav aria-label='Pagination'>
      <ul className='pagination'>
        <PageItem className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            onClick={() => paginate(currentPage - 1)}
            href='#'
            className='page-link'
            aria-label='Previous page'
          >
            &lt;
          </a>
        </PageItem>
        {pageNumbers}
        <PageItem className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
          <a
            onClick={() => paginate(currentPage + 1)}
            href='#'
            className='page-link'
            aria-label='Next page'
          >
            &gt;
          </a>
        </PageItem>
      </ul>
    </nav>
  );
};

export default Pagination;
