// SearchColumnDropdown.js
import React from 'react';
import Dropdown from './Dropdown'; // Assuming this is your existing Dropdown component

const SearchColumnDropdown = ({ activeColumn, handleColumnChange }) => {
  const columns = [
    { value: 'title', label: 'Title' },
    { value: 'definition', label: 'Definition' },
    { value: 'contributor', label: 'Contributor' },
    { value: 'timestamps', label: 'Timestamp' },
    { value: 'position', label: 'Position' },
  ];

  const handleOptionClick = (selectedLabel) => {
    const selectedColumn = columns.find((col) => col.label === selectedLabel);
    if (selectedColumn) {
      handleColumnChange(selectedColumn.value); // Ensure the value is passed
    }
    // handleColumnChange(option.value);
  };

  return (
    <Dropdown
      label={columns.find((col) => col.value === activeColumn)?.label}
      options={columns.map((column) => column.label)}
      onOptionClick={handleOptionClick}
      closeOnSelect={true}
      variant="searchColumn"
    />
  );
};

export default SearchColumnDropdown;
