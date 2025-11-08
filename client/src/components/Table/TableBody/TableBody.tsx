import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Column, Idiom } from '@/types';

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
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover > td {
      background-color: var(--bg-medium);
    }
  }
`;

const StyledTd = styled.td<StyleProps>`
  padding: var(--padding-lg) var(--padding-lg) !important;
  border-bottom: 1px solid var(--color-border) !important;
  border-left: none !important;
  border-right: none !important;
  background: var(--bg-dark);
  color: var(--color-text-primary) !important;

  ${(props) =>
    props.$accessor === 'title' &&
    `
      font-weight: 550;
      font-size: var(--font-md);
  `}

  ${(props) =>
    props.$accessor === 'default' &&
    `
      text-align: center;
      font-size: var(--font-lg);
      color: var(--color-ui-border) !important;
  `}
`;

type TableBodyProps = {
  tableData: Idiom[];
  columns: Column[];
};

const TableBody = ({ tableData, columns }: TableBodyProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRowClick = (id: number) => {
    navigate({
      pathname: `/idioms/${id}`,
      search: location.search,
    });
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
                  cellData = String(row[accessor] ? row[accessor] : ' ');
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
            No Idioms Found
          </StyledTd>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
