import styled from 'styled-components';

import { ColumnAccessors, ColumnVisibility, Columns } from '@/types';
import Dropdown from '@/components/Dropdown/Dropdown/Dropdown';

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  .form-check-input {
    width: 2rem;
    height: 1rem;
    border-radius: 1rem;
    background-color: var(--color-ui-primary);
    border: 1px solid var(--color-ui-border);
    transition: background-color 0.2s, border-color 0.2s;

    &:checked {
      background-color: var(--color-brand-primary);
      border: 1px solid var(--color-brand-primary);
    }

    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(66, 153, 225, 0.5);
    }
  }

  .form-check-label {
    margin-left: var(--margin-sm);
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
  const accessors = Columns.map((column) => column.accessor);
  const options = accessors.map((accessor) => (
    <ToggleSwitch key={accessor} className='form-check form-switch'>
      <input
        type='checkbox'
        className='form-check-input'
        checked={columnVisibility[accessor]}
        onChange={() => handleColumnVisibilityChange(accessor)}
      />
      <span className='form-check-label'>
        {accessor.charAt(0).toUpperCase() + accessor.slice(1)}
      </span>
    </ToggleSwitch>
  ));

  return (
    <Dropdown
      label='Columns'
      options={options}
      closeOnSelect={false}
      hideOnSmallScreen={true}
      ariaLabel='Column Visibility'
    />
  );
};

export default ColumnDropdown;
