import styled from 'styled-components';
import { useEffect, useState } from 'react';

import searchIcon from '@/images/search.svg?react';
import SearchColumnDropdown from '@/components/Dropdown/SearchColumnDropdown/SearchColumnDropdown';
import { SearchColumnAccessors } from '@/types';

const Container = styled.div`
  position: relative;
  margin: var(--margin-md);
  width: 60%;
  @media (max-width: 660px) {
    width: 100%;
  }
`;

const IconContainer = styled.span`
  position: absolute;
  left: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Icon = styled(searchIcon)`
  width: 16px;
  height: 16px;
  color: var(--color-test-primary);
`;

const Input = styled.input`
  position: relative;
  padding-left: var(--padding-xxl);
  width: 100%;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-ui-border) !important;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 9px;
  right: 1px;
  height: 95%;
  display: flex;
  align-items: center;
`;

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
      <IconContainer>
        <Icon />
      </IconContainer>
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
