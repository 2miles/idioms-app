import { useState, useEffect } from 'react';
import styled from 'styled-components';
import arrowUp from '../images/icons8-arrow-up-30.png';
import arrowDown from '../images/icons8-down-arrow-30.png';

const StyledTh = styled.th`
  background-color: ${(props) =>
    props.isSorted
      ? 'var(--hilite-ui-primary)'
      : 'var(--color-ui-primary)'} !important; // Conditionally apply background color
  border: 1px solid var(--color-ui-border) !important; //override bootstrap
  font-weight: 800;
  color: var(--color-text-primary) !important;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: right;
  background-size: 25px 25px;

  width: ${(props) => {
    const widths = {
      position: '10%',
      definition: '50%',
      title: '30%',
      timestamps: '20%',
      contributor: '20%',
    };
    return widths[props.accessor] || 'auto';
  }};

  ${(props) =>
    props.sortOrder === 'asc' &&
    `
      background-image: url('../images/icons8-arrow-up-30.png');
      background-image: url(${arrowUp});
    `}

  ${(props) =>
    props.sortOrder === 'desc' &&
    `
      background-image: url('../images/icons8-down-arrow-30.png');
      background-image: url(${arrowDown});
    `}

  @media (max-width: 770px) {
    ${(props) =>
      ['definition', 'timestamps', 'contributor'].includes(props.accessor) &&
      `
        display: none;
      `}
  }
`;

const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState('position');
  const [sortOrder, setSortOrder] = useState('asc');

  // Call handleSorting initially to apply the default sorting
  useEffect(() => {
    handleSorting(sortField, sortOrder);
  }, []);

  const handleSortingChange = (accessor) => {
    const newSortOrder =
      accessor === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setSortOrder(newSortOrder);
    handleSorting(accessor, newSortOrder);
  };
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => {
          const currentSortOrder =
            sortField === accessor ? sortOrder : 'default'; // Use 'none' for non-sorted columns
          const isSorted = sortField === accessor; // Check if this is the active column

          return (
            <StyledTh
              key={accessor}
              accessor={accessor}
              sortOrder={currentSortOrder} // Pass sortOrder only for the sorted column
              onClick={() => handleSortingChange(accessor)}
              isSorted={isSorted}
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
