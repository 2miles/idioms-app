import { useState } from 'react';
import Dropdown from './Dropdown';

type ItemsPerPageDropdownProps = {
  handleItemsPerPageChange: (itemsPerPage: number) => void;
};

const ItemsPerPageDropdown = ({ handleItemsPerPageChange }: ItemsPerPageDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(20);
  const options = [10, 20, 50, 100];

  // const handleOptionClick = (option: number) => {
  //   setSelectedOption(option); // Handle selection logic here
  //   handleItemsPerPageChange(option);
  // };
  const handleOptionClick = (option: string | number | JSX.Element) => {
    if (typeof option === 'number') {
      setSelectedOption(option); // Handle selection logic here
      handleItemsPerPageChange(option);
    }
  };

  return (
    <Dropdown
      label={`${selectedOption}`}
      options={options}
      onOptionClick={handleOptionClick}
      closeOnSelect={true}
      hideOnSmallScreen={false}
    />
  );
};

export default ItemsPerPageDropdown;
