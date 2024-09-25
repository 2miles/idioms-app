import React, { useState } from 'react';
import styled from 'styled-components';
import searchIcon from '../images/search-icon-png-24.png';

const Container = styled.div`
  position: relative;
  max-width: 600px;
  margin-bottom: 20px;
  margin-right: 3px;
`;

const IconContainer = styled.span`
  position: absolute;
  left: 0;
  height: 100%;
  /* background-color: #dddddd;  */
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const Input = styled.input`
  padding-left: 30px;
  width: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const SearchBar = ({ handleSearch, idioms, activeSearchColumn }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // const onSearch = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);
  //   if (value.trim() === '') {
  //     handleSearch(idioms);
  //   } else {
  //     const filtered = idioms.filter((idiom) =>
  //       idiom[activeSearchColumn]
  //         ?.toLowerCase()
  //         .includes(e.target.value.toLowerCase()),
  //     );
  //     handleSearch(filtered);
  //   }
  // };
  const onSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    // If searchTerm is empty, reset to full idiom list
    if (searchTerm === '') {
      handleSearch(idioms);
      return;
    }
    const filtered = idioms.filter((idiom) => {
      const columnData = idiom[activeSearchColumn];
      // Check if column data is a number
      if (typeof columnData === 'number') {
        return columnData === Number(searchTerm); // Compare for equality if searching in a number field
      }
      // Otherwise, handle it as a string comparison using .includes()
      return columnData
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    handleSearch(filtered);
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
    </Container>
  );
};

export default SearchBar;
