import { useState } from 'react';

import Dropdown from 'components/dropdowns/Dropdown';

type ItemsPerPageDropdownProps = {
  handleItemsPerPageChange: (itemsPerPage: number) => void;
};

const ItemsPerPageDropdown = ({ handleItemsPerPageChange }: ItemsPerPageDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState('20');
  const options = ['10', '20', '50', '100'];

  const handleOptionClick = (option: string | JSX.Element) => {
    if (typeof option !== 'object') {
      setSelectedOption(option);
      handleItemsPerPageChange(Number(option));
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
