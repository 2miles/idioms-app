import styled, { css } from 'styled-components';

import { Column, ColumnAccessors } from '@/types';
import ArrowUpIcon from '@/images/arrow-up-sort.svg?react';
import ArrowDownIcon from '@/images/arrow-down-sort.svg?react';
import ArrowNeutralIcon from '@/images/arrow-up-arrow-down.svg?react';

type TableHeadProps = {
  columns: Column[];
  handleSorting: (sortField: ColumnAccessors, sortOrder: 'asc' | 'desc') => void;
  sortField: ColumnAccessors;
  sortOrder: 'asc' | 'desc'; // Use 'default
};

type StyledThProps = {
  $isSorted?: boolean;
  $accessor: ColumnAccessors;
  $sortOrder: 'asc' | 'desc' | 'default';
};

const StyledTh = styled.th<StyledThProps>`
  background-color: var(--color-ui-primary);
  border: 1px solid var(--color-ui-border);
  border-left: none !important;
  border-right: none !important;
  color: var(--color-text-primary) !important;
  cursor: pointer;
  background-repeat: no-repeat;
  /* background-position: right; */
  background-position: left center;
  padding-left: 20px !important; /* prevent text from overlapping the icon */
  padding-top: var(--padding-sm);
  padding-bottom: var(--padding-sm);
  background-size: 25px 25px;
  font-weight: 600;
  font-size: var(--font-md);

  &:hover {
    background-color: var(--hilite-ui-primary);
  }

  width: ${(props) => {
    const widths: Record<StyledThProps['$accessor'], string> = {
      position: '10%',
      definition: '70%',
      title: '30%',
      timestamps: '20%',
      contributor: '20%',
    };
    return widths[props.$accessor] || 'auto';
  }};

  ${(props) =>
    props.$accessor === 'position' &&
    css`
      width: auto;
      white-space: nowrap;
      max-width: none;
      padding-right: 12px; /* tweak if needed */
    `}

  @media (max-width: 770px) {
    width: ${(props) => {
      const widths: Record<StyledThProps['$accessor'], string> = {
        position: '20%',
        definition: '0%',
        title: '80%',
        timestamps: '0%',
        contributor: '0%',
      };
      return widths[props.$accessor] || 'auto';
    }};
    ${(props) =>
      ['definition', 'timestamps', 'contributor'].includes(props.$accessor) &&
      css`
        display: none;
      `}
  }
`;

const SortIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;

  svg {
    width: 18px;
    height: 18px;
    color: var(--color-text-primary);
  }
`;

const StyledArrowUp = styled(ArrowUpIcon)`
  width: 18px;
  height: 18px;
  fill: var(--color-text-primary);
`;

const StyledArrowDown = styled(ArrowDownIcon)`
  width: 18px;
  height: 18px;
  fill: var(--color-text-primary);
`;

const StyledArrowNeutral = styled(ArrowNeutralIcon)`
  width: 18px;
  height: 18px;
  fill: var(--color-ui-border) !important;
`;

const TableHead = ({ columns, handleSorting, sortField, sortOrder }: TableHeadProps) => {
  const handleSortingChange = (accessor: ColumnAccessors) => {
    const newSortOrder = accessor === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    handleSorting(accessor, newSortOrder);
  };
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => {
          const currentSortOrder = sortField === accessor ? sortOrder : 'default';
          const isSorted = sortField === accessor;

          return (
            <StyledTh
              key={accessor}
              onClick={() => handleSortingChange(accessor)}
              $accessor={accessor}
              $sortOrder={currentSortOrder}
              $isSorted={isSorted}
              data-testid={`table-header-${accessor}`}
            >
              {label}
              <SortIconWrapper>
                {isSorted ? (
                  currentSortOrder === 'asc' ? (
                    <StyledArrowUp data-testid='sort-icon-up' />
                  ) : (
                    <StyledArrowDown data-testid='sort-icon-down' />
                  )
                ) : (
                  <StyledArrowNeutral data-testid='sort-icon-neutral' />
                )}
              </SortIconWrapper>
            </StyledTh>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
