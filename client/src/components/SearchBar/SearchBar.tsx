import styled from 'styled-components';

import { ColumnAccessors } from '@/types';
import searchIcon from '@/images/search-icon-png-24.png';
import SearchColumnDropdown from '@/components/Dropdown/SearchColumnDropdown/SearchColumnDropdown';

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

const Icon = styled.img`
  width: 16px;
  height: 16px;
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
  searchColumn: ColumnAccessors;
  onSearchTermChange: (term: string) => void;
  onSearchColumnChange: (column: ColumnAccessors) => void;
};

const SearchBar = ({
  searchTerm,
  searchColumn,
  onSearchTermChange,
  onSearchColumnChange,
}: SearchBarProps) => {
  return (
    <Container>
      <IconContainer>
        <Icon src={searchIcon} alt='search' />
      </IconContainer>
      <Input
        type='text'
        className='form-control'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
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
