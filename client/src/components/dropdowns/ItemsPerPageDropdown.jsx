import React, { useState } from 'react';
import Dropdown from './Dropdown';

const ItemsPerPageDropdown = ({ handleItemsPerPageChange }) => {
  const [selectedOption, setSelectedOption] = useState(20);
  const options = [10, 20, 50, 100];

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Handle selection logic here
    handleItemsPerPageChange(option);
  };

  return (
    <Dropdown
      label={`${selectedOption}`}
      options={options}
      onOptionClick={handleOptionClick}
      closeOnSelect={true}
      $hideOnSmallScreen={false}
    />
  );
};

export default ItemsPerPageDropdown;
