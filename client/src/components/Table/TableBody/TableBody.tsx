import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { flexRender, type Table as TanTable } from '@tanstack/react-table';

import { Idiom } from '@/types';

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
  table: TanTable<Idiom>;
};

const TableBody = ({ table }: TableBodyProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const rows = table.getRowModel().rows;

  const handleRowClick = (id: number) => {
    navigate({ pathname: `/idioms/${id}`, search: location.search });
  };

  return (
    <tbody>
      {rows.length > 0 ? (
        rows.map((row) => (
          <StyledTr
            key={row.id}
            onClick={() => handleRowClick(row.original.id)}
            data-testid={`table-row-${row.original.id}`}
          >
            {row.getVisibleCells().map((cell) => (
              <StyledTd key={cell.id} $accessor={cell.column.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </StyledTd>
            ))}
          </StyledTr>
        ))
      ) : (
        <tr>
          <StyledTd colSpan={table.getVisibleLeafColumns().length} $accessor='default'>
            No Idioms Found
          </StyledTd>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
