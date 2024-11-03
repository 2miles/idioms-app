import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import { Idiom, Column } from '@/types';

const truncateLength = 150;
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

type StyleProps = {
  $accessor: string;
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

const StyledTd = styled.td<StyleProps>`
  padding: var(--padding-lg) var(--padding-lg) !important;
  border-bottom: 1px solid var(--color-ui-border) !important;
  background: var(--color-ui-primary) !important;
  color: var(--color-text-primary) !important;

  ${(props) =>
    props.$accessor === 'title' &&
    `
      font-weight: 550;
  `}

  @media (max-width: 770px) {
    ${(props) =>
      ['definition', 'timestamps', 'contributor'].includes(props.$accessor) &&
      `
        display: none;
      `}
  }
`;

type TableBodyProps = {
  tableData: Idiom[];
  columns: Column[];
};

// Renders the rows of a table based on the provided data and column definitions.
// It uses the useNavigate hook to navigate to a detailed view of a selected idiom when a row is clicked.
const TableBody = ({ tableData, columns }: TableBodyProps) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/idioms/${id}`);
  };

  return (
    <tbody>
      {tableData && tableData.length > 0 ? (
        tableData.map((row) => {
          return (
            <StyledTr key={row.id} onClick={() => handleRowClick(row.id)}>
              {columns.map(({ accessor }) => {
                let cellData: string;
                if (accessor === 'timestamps') {
                  cellData = moment(row[accessor]).format('MM-DD-YY');
                } else {
                  cellData = String(row[accessor] ? row[accessor] : '——');
                }
                if (accessor === 'definition') {
                  cellData = truncateText(cellData, truncateLength);
                }
                return (
                  <StyledTd key={accessor} $accessor={accessor}>
                    {cellData}
                  </StyledTd>
                );
              })}
            </StyledTr>
          );
        })
      ) : (
        <tr>
          <StyledTd colSpan={columns.length} $accessor='default'>
            No data available
          </StyledTd>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
