import styled from 'styled-components';

import { ColumnAccessors, ColumnVisibility, Columns } from 'types';
import Dropdown from 'components/dropdowns/Dropdown';

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type='checkbox'] {
    margin-right: var(--margin-md);
  }
`;

type ColumnDropdownProps = {
  columnVisibility: ColumnVisibility;
  handleColumnVisibilityChange: (accessor: ColumnAccessors) => void;
};

const ColumnDropdown = ({
  columnVisibility,
  handleColumnVisibilityChange,
}: ColumnDropdownProps) => {
  // const accessors = Object.keys(columnVisibility) as ColumnAccessors[];
  const accessors = Columns.map((column) => column.accessor);

  // Pass JSX directly into the options array
  const options = accessors.map((accessor) => (
    <CheckboxLabel key={accessor}>
      <input
        type='checkbox'
        checked={columnVisibility[accessor]}
        onChange={() => handleColumnVisibilityChange(accessor)}
      />
      {accessor.charAt(0).toUpperCase() + accessor.slice(1)}
    </CheckboxLabel>
  ));

  return (
    <Dropdown label='Columns' options={options} closeOnSelect={false} hideOnSmallScreen={true} />
  );
};

export default ColumnDropdown;
