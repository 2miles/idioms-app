import Dropdown from './Dropdown';

const ItemsPerPageSelector = ({ itemsPerPage, handleItemsPerPageChange }) => {
  const options = [5, 10, 20, 50];

  return (
    <Dropdown
      options={options}
      selected={itemsPerPage}
      handleChange={handleItemsPerPageChange}
    />
  );
};

export default ItemsPerPageSelector;
