import React from 'react';
import styled from 'styled-components';

// Customized Bootstrap pagination
const PageItem = styled.li`
  .page-link {
    padding: 8px 5px;
    background-color: #f8f9fa;
    color: black;
    cursor: pointer;
    width: 40px;
    text-align: center;
    border: none;

    &:hover {
      background-color: #e9ecef;
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  &.disabled .page-link {
    color: #9ca5ae;
  }

  &.active .page-link {
    background-color: lightgray;
    color: black;
  }

  &.active .page-link:hover {
    background-color: lightgray;
  }
`;

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumbersToShow = 3;
  const halfMaxPages = Math.floor(maxPageNumbersToShow / 2);

  const addPageNumber = (number) => {
    const isActive = currentPage === number;
    pageNumbers.push(
      <PageItem
        key={number}
        className={`page-item ${isActive ? 'active' : ''}`}
      >
        <a onClick={() => paginate(number)} href="#" className="page-link">
          {number}
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
          <PageItem key="start-ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
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
          <PageItem key="end-ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </PageItem>,
        );
      }
      addPageNumber(totalPages);
    }
  }

  return (
    <nav>
      <ul className="pagination">
        <PageItem
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
        >
          <a
            onClick={() => paginate(currentPage - 1)}
            href="#"
            className="page-link"
          >
            &lt;
          </a>
        </PageItem>
        {pageNumbers}
        <PageItem
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <a
            onClick={() => paginate(currentPage + 1)}
            href="#"
            className="page-link"
          >
            &gt;
          </a>
        </PageItem>
      </ul>
    </nav>
  );
};

export default Pagination;
