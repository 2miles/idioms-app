import Dropdown from './Dropdown';
const ColumnSelector = ({ columnVisibility, handleColumnVisibilityChange }) => {
  return (
    <Dropdown
      options={Object.keys(columnVisibility)}
      selected={columnVisibility}
      handleChange={handleColumnVisibilityChange}
      label="Columns"
      isCheckbox={true}
      hideOnSmallScreen={true}
    />
  );
};

export default ColumnSelector;
