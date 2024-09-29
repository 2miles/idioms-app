import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

// Utility function to truncate text and add "..."
const truncateLength = 150;

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

const StyledTr = styled.tr`
  border-left: 1px solid var(--color-ui-border) !important;
  border-right: 1px solid var(--color-ui-border) !important;
  cursor: pointer;

  &:hover {
    td {
      background-color: var(--hilite-ui-primary) !important;
    }
  }
`;

const StyledTd = styled.td`
  padding: 20px 20px !important;
  border-bottom: 1px solid var(--color-ui-border) !important;
  background: var(--color-ui-primary) !important;
  color: var(--color-text-primary) !important;

  ${(props) =>
    props.accessor === 'title' &&
    `
      font-weight: 550;
  `}

  @media (max-width: 770px) {
    ${(props) =>
      ['definition', 'timestamps', 'contributor'].includes(props.accessor) &&
      `
        display: none;
      `}
  }
`;

// Renders the rows of a table based on the provided data and column definitions.
// It uses the useNavigate hook to navigate to a detailed view of a selected idiom when a row is clicked.
// Dynamically creates rows and cells based on the provided data and column definitions.
const TableBody = ({ tableData, columns }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/idioms/${id}`);
  };

  return (
    <tbody>
      {tableData && tableData.length > 0 ? (
        // Iterates over each item in tableData. Each data item represents a row in the table.
        tableData.map((row) => {
          return (
            <StyledTr key={row.id} onClick={() => handleRowClick(row.id)}>
              {columns.map(({ accessor }) => {
                let cellData;
                if (accessor === 'timestamps') {
                  cellData = moment(row[accessor]).format('MM-DD-YY'); // Format the date as MM-DD-YY
                } else {
                  cellData = row[accessor] ? row[accessor] : '——';
                }
                if (accessor === 'definition') {
                  cellData = truncateText(cellData, truncateLength);
                }
                return (
                  <StyledTd key={accessor} accessor={accessor}>
                    {cellData}
                  </StyledTd>
                );
              })}
            </StyledTr>
          );
        })
      ) : (
        <tr>
          <StyledTd colSpan={columns.length}>No data available</StyledTd>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
