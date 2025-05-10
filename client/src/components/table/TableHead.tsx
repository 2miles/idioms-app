import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { Column, ColumnAccessors } from '@/types';
import arrowUp from '@/images/icons8-arrow-up-30.png';
import arrowDown from '@/images/icons8-down-arrow-30.png';

type TableHeadProps = {
  columns: Column[];
  handleSorting: (sortField: ColumnAccessors, sortOrder: 'asc' | 'desc') => void;
};

type StyledThProps = {
  $isSorted?: boolean;
  $accessor: ColumnAccessors;
  $sortOrder: 'asc' | 'desc' | 'default';
};

const StyledTh = styled.th<StyledThProps>`
  background-color: ${(props) =>
    props.$isSorted
      ? 'var(--color-brand-secondary) !important'
      : 'var(--color-ui-primary) !important'};
  border: 1px solid var(--color-ui-border) !important;
  color: var(--color-text-primary) !important;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: right;
  background-size: 25px 25px;
  font-weight: normal;
  font-size: var(--font-md);

  width: ${(props) => {
    const widths: Record<StyledThProps['$accessor'], string> = {
      position: '10%',
      definition: '50%',
      title: '30%',
      timestamps: '20%',
      contributor: '20%',
    };
    return widths[props.$accessor] || 'auto';
  }};

  ${(props) =>
    props.$sortOrder === 'asc' &&
    css`
      background-image: url(${arrowUp});
    `}

  ${(props) =>
    props.$sortOrder === 'desc' &&
    css`
      background-image: url(${arrowDown});
    `}

  &:hover {
    background-color: ${(props) =>
      props.$isSorted
        ? 'var(--color-brand-secondary) !important'
        : 'var(--hilite-ui-primary) !important'};
  }

  @media (max-width: 770px) {
    ${(props) =>
      ['definition', 'timestamps', 'contributor'].includes(props.$accessor) &&
      css`
        display: none;
      `}
  }
`;

const TableHead = ({ columns, handleSorting }: TableHeadProps) => {
  const [sortField, setSortField] = useState<ColumnAccessors>('position');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Call handleSorting initially to apply the default sorting
  useEffect(() => {
    handleSorting(sortField, sortOrder);
  }, []);

  const handleSortingChange = (accessor: ColumnAccessors) => {
    const newSortOrder = accessor === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setSortOrder(newSortOrder);
    handleSorting(accessor, newSortOrder);
  };
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => {
          const currentSortOrder = sortField === accessor ? sortOrder : 'default'; // Use 'none' for non-sorted columns
          const isSorted = sortField === accessor; // Check if this is the active column

          return (
            <StyledTh
              key={accessor}
              onClick={() => handleSortingChange(accessor)}
              $accessor={accessor}
              $sortOrder={currentSortOrder} // Pass sortOrder only for the sorted column
              $isSorted={isSorted}
              data-testid={`table-header-${accessor}`}
            >
              {label}
            </StyledTh>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
