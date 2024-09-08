import Dropdown from './Dropdown';

const ItemsPerPageSelector = ({ itemsPerPage, handleItemsPerPageChange }) => {
  const options = [5, 10, 20, 50];

  return (
    <Dropdown
      options={options}
      selectedOption={itemsPerPage}
      handleOptionChange={handleItemsPerPageChange}
    />
  );
};

export default ItemsPerPageSelector;
