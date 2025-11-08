import styled, { css } from 'styled-components';

import ArrowDownIcon from '@/images/arrow-down-sort.svg?react';
import ArrowNeutralIcon from '@/images/arrow-up-arrow-down.svg?react';
import ArrowUpIcon from '@/images/arrow-up-sort.svg?react';
import { Column, ColumnAccessors } from '@/types';

type TableHeadProps = {
  columns: Column[];
  handleSorting: (sortField: ColumnAccessors, sortOrder: 'asc' | 'desc') => void;
  sortField: ColumnAccessors;
  sortOrder: 'asc' | 'desc';
};

type StyledThProps = {
  $isSorted?: boolean;
  $accessor: ColumnAccessors;
  $sortOrder: 'asc' | 'desc' | 'default';
};

const StyledTh = styled.th<StyledThProps>`
  background-color: var(--bg-dark);
  border: 1px solid var(--color-border);
  border-left: none !important;
  border-right: none !important;
  color: var(--color-text-primary) !important;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 20px !important;
  padding-top: var(--padding-md);
  padding-bottom: var(--padding-md);
  background-size: 25px 25px;
  font-weight: 600;
  font-size: var(--font-md);

  &:hover {
    background-color: var(--bg-medium);
  }

  /* --- column-specific rules --- */
  ${(props) =>
    props.$accessor === 'position' &&
    css`
      text-align: center;
      white-space: nowrap;
      max-width: 100px;
      width: 1%; /* let browser auto-size minimally */
      padding-right: 12px;
    `}

  ${(props) =>
    props.$accessor === 'title' &&
    css`
      width: auto;
    `}
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
  fill: var(--color-text-dim) !important;
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
