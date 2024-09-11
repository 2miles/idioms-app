import React from 'react';
import Dropdown from './Dropdown';
import styled from 'styled-components';

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type='checkbox'] {
    margin-right: 10px;
  }
`;

const ColumnDropdown = ({ columnVisibility, handleColumnVisibilityChange }) => {
  const columns = Object.keys(columnVisibility);

  // Pass JSX directly into the options array
  const options = columns.map((column) => (
    <CheckboxLabel key={column}>
      <input
        type="checkbox"
        checked={columnVisibility[column]}
        onChange={() => handleColumnVisibilityChange(column)}
      />
      {column.charAt(0).toUpperCase() + column.slice(1)}
    </CheckboxLabel>
  ));

  return (
    <Dropdown
      label="Columns"
      options={options}
      closeOnSelect={false}
      hideOnSmallScreen={true}
    />
  );
};

export default ColumnDropdown;
