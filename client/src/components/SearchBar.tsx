import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Idiom, ColumnAccessors } from '../types';
import searchIcon from '../images/search-icon-png-24.png';
import SearchColumnDropdown from './dropdowns/SearchColumnDropdown';

const Container = styled.div`
  position: relative;
  margin: var(--margin-xxl);
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
  idioms: Idiom[];
  activeSearchColumn: ColumnAccessors;
  handleSearch: (filtered: Idiom[]) => void;
  handleSearchColumnChange: (column: ColumnAccessors) => void;
};

const SearchBar = ({
  idioms,
  activeSearchColumn,
  handleSearch,
  handleSearchColumnChange,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Effect to update search results whenever the search column changes
  useEffect(() => {
    if (searchTerm === '') {
      handleSearch(idioms); // Show all idioms if search is empty
    } else {
      const filtered = idioms.filter((idiom) => {
        const columnData = idiom[activeSearchColumn];
        if (typeof columnData === 'number') {
          return columnData === Number(searchTerm);
        }
        return columnData?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
      handleSearch(filtered);
    }
  }, [searchTerm, activeSearchColumn, idioms]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
        onChange={onSearch}
      />
      <DropdownWrapper>
        <SearchColumnDropdown
          activeColumn={activeSearchColumn}
          handleColumnChange={handleSearchColumnChange}
        />
      </DropdownWrapper>
    </Container>
  );
};

export default SearchBar;
