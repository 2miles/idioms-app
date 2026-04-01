import { useEffect, useState } from 'react';

import SearchColumnDropdown from '@/components/Dropdown/SearchColumnDropdown/SearchColumnDropdown';
import { SearchColumnAccessors } from '@/types';
import { Container, DropdownWrapper, IconContainer, Input } from './SearchBar.styles';

type SearchBarProps = {
  searchTerm: string;
  searchColumn: SearchColumnAccessors;
  onSearchTermChange: (term: string) => void;
  onSearchColumnChange: (column: SearchColumnAccessors) => void;
  onImmediateSearch?: (term: string) => void;
};

const SearchBar = ({
  searchTerm,
  searchColumn,
  onSearchTermChange,
  onSearchColumnChange,
  onImmediateSearch,
}: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(searchTerm);

  useEffect(() => {
    setLocalValue(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onSearchTermChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onImmediateSearch?.(localValue);
    }
  };

  return (
    <Container>
      <IconContainer></IconContainer>
      <Input
        type='text'
        className='form-control'
        placeholder='Search...'
        value={localValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <DropdownWrapper>
        <SearchColumnDropdown
          activeColumn={searchColumn}
          handleColumnChange={onSearchColumnChange}
        />
      </DropdownWrapper>
    </Container>
  );
};

export default SearchBar;
