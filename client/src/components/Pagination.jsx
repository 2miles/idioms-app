// const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumbers.map((number) => (
//           <li
//             key={number}
//             className={`page-item ${currentPage === number ? 'active' : ''}`}
//           >
//             <a onClick={() => paginate(number)} href="#" className="page-link">
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };
import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumbersToShow = 3; // Maximum number of page numbers to show
  const halfMaxPages = Math.floor(maxPageNumbersToShow / 2);

  // Helper function to add page numbers
  const addPageNumber = (number) => {
    pageNumbers.push(
      <li
        key={number}
        className={`page-item ${currentPage === number ? 'active' : ''}`}
      >
        <a onClick={() => paginate(number)} href="#" className="page-link">
          {number}
        </a>
      </li>,
    );
  };

  if (totalPages <= maxPageNumbersToShow) {
    // If the total number of pages is less than or equal to maxPageNumbersToShow, show all pages
    for (let i = 1; i <= totalPages; i++) {
      addPageNumber(i);
    }
  } else {
    // If there are more pages than maxPageNumbersToShow, show the first, last, and relevant middle pages
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
          <li key="start-ellipsis" className="page-item">
            <span className="page-link">...</span>
          </li>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      addPageNumber(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <li key="end-ellipsis" className="page-item">
            <span className="page-link">...</span>
          </li>,
        );
      }
      addPageNumber(totalPages);
    }
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            onClick={() => paginate(currentPage - 1)}
            href="#"
            className="page-link"
          >
            &lt;
          </a>
        </li>
        {pageNumbers}
        <li
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
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
