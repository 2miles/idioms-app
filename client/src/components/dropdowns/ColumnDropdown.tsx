import styled from 'styled-components';
import Dropdown from './Dropdown';

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type='checkbox'] {
    margin-right: var(--margin-md);
  }
`;

type ColumnValues = 'position' | 'title' | 'definition' | 'timestamps' | 'contributor';

type ColumnVisibilityType = {
  position: boolean;
  title: boolean;
  definition: boolean;
  timestamps: boolean;
  contributor: boolean;
};

type ColumnDropdownProps = {
  columnVisibility: ColumnVisibilityType;
  handleColumnVisibilityChange: (column: ColumnValues) => void;
};

const ColumnDropdown = ({
  columnVisibility,
  handleColumnVisibilityChange,
}: ColumnDropdownProps) => {
  const columns = Object.keys(columnVisibility) as ColumnValues[];

  // Pass JSX directly into the options array
  const options = columns.map((column) => (
    <CheckboxLabel key={column}>
      <input
        type='checkbox'
        checked={columnVisibility[column]}
        onChange={() => handleColumnVisibilityChange(column)}
      />
      {column.charAt(0).toUpperCase() + column.slice(1)}
    </CheckboxLabel>
  ));

  return (
    <Dropdown label='Columns' options={options} closeOnSelect={false} hideOnSmallScreen={true} />
  );
};

export default ColumnDropdown;
