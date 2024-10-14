// SearchColumnDropdown.js
import { ColumnAccessors, Columns } from 'types';
import Dropdown from './Dropdown';

type SearchColumnDropdownProps = {
  activeColumn: string;
  handleColumnChange: (columnValue: ColumnAccessors) => void;
};

const SearchColumnDropdown = ({ activeColumn, handleColumnChange }: SearchColumnDropdownProps) => {
  // const columns = [
  //   { value: 'title', label: 'Title' },
  //   { value: 'definition', label: 'Definition' },
  //   { value: 'contributor', label: 'Contributor' },
  //   { value: 'timestamps', label: 'Timestamp' },
  //   { value: 'position', label: 'Position' },
  // ];
  const columns = Columns;

  const handleOptionClick = (selectedLabel: string | JSX.Element) => {
    if (typeof selectedLabel === 'string') {
      const selectedColumn = columns.find((col) => col.label === selectedLabel);
      if (selectedColumn) {
        handleColumnChange(selectedColumn.accessor as ColumnAccessors);
      }
    }
  };

  return (
    <Dropdown
      label={columns.find((col) => col.accessor === activeColumn)?.label || 'Column'}
      options={columns.map((column) => column.label)}
      onOptionClick={handleOptionClick}
      closeOnSelect={true}
      variant='searchColumn'
    />
  );
};

export default SearchColumnDropdown;
