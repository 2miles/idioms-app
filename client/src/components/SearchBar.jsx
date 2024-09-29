import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import searchIcon from '../images/search-icon-png-24.png';
import SearchColumnDropdown from './SearchColumnDropdown';

const Container = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 60%;
  @media (max-width: 660px) {
    width: 100%;
  }
`;

const IconContainer = styled.span`
  position: absolute;
  left: 10px;
  height: 100%;
  padding: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 1;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const Input = styled.input`
  position: relative;
  padding-left: 30px;
  padding-right: 120px; /* Reserve space for the dropdown */
  width: 100%;
  border-radius: 20px;
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

const SearchBar = ({
  handleSearch,
  idioms,
  activeSearchColumn,
  handleSearchColumnChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Effect to update search results whenever the column changes
  useEffect(() => {
    if (searchTerm === '') {
      handleSearch(idioms); // Show all idioms if search is empty
    } else {
      const filtered = idioms.filter((idiom) => {
        const columnData = idiom[activeSearchColumn];
        if (typeof columnData === 'number') {
          return columnData === Number(searchTerm);
        }
        return columnData
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      handleSearch(filtered);
    }
  }, [searchTerm, activeSearchColumn, idioms]);

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <IconContainer>
        <Icon src={searchIcon} alt="search" />
      </IconContainer>
      <Input
        type="text"
        className="form-control"
        placeholder="Search..."
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
