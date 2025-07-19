import { SearchColumnAccessors, SearchColumns } from '@/types';
import Dropdown from '@/components/Dropdown/Dropdown/Dropdown';

type SearchColumnDropdownProps = {
  activeColumn: string;
  handleColumnChange: (columnValue: SearchColumnAccessors) => void;
};

const SearchColumnDropdown = ({ activeColumn, handleColumnChange }: SearchColumnDropdownProps) => {
  const handleOptionClick = (selectedLabel: string | JSX.Element) => {
    if (typeof selectedLabel === 'string') {
      const selectedColumn = SearchColumns.find((col) => col.label === selectedLabel);
      if (selectedColumn) {
        handleColumnChange(selectedColumn.accessor);
      }
    }
  };

  return (
    <Dropdown
      label={SearchColumns.find((col) => col.accessor === activeColumn)?.label || 'Column'}
      options={SearchColumns.map((column) => column.label)}
      onOptionClick={handleOptionClick}
      closeOnSelect={true}
      variant='searchColumn'
      ariaLabel='Search Column'
    />
  );
};

export default SearchColumnDropdown;
