// SearchColumnDropdown.js
import Dropdown from './Dropdown';

type ColumnValues = 'position' | 'title' | 'definition' | 'timestamps' | 'contributor';

type SearchColumnDropdownProps = {
  activeColumn: string;
  handleColumnChange: (columnValue: ColumnValues) => void;
};

const SearchColumnDropdown = ({ activeColumn, handleColumnChange }: SearchColumnDropdownProps) => {
  const columns = [
    { value: 'title', label: 'Title' },
    { value: 'definition', label: 'Definition' },
    { value: 'contributor', label: 'Contributor' },
    { value: 'timestamps', label: 'Timestamp' },
    { value: 'position', label: 'Position' },
  ];

  const handleOptionClick = (selectedLabel: string | JSX.Element) => {
    if (typeof selectedLabel === 'string') {
      const selectedColumn = columns.find((col) => col.label === selectedLabel);
      if (selectedColumn) {
        handleColumnChange(selectedColumn.value as ColumnValues);
      }
    }
  };

  return (
    <Dropdown
      label={columns.find((col) => col.value === activeColumn)?.label || 'Column'}
      options={columns.map((column) => column.label)}
      onOptionClick={handleOptionClick}
      closeOnSelect={true}
      variant='searchColumn'
    />
  );
};

export default SearchColumnDropdown;
