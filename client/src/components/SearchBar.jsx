import React, { useState } from 'react';
import styled from 'styled-components';
import searchIcon from '../images/search-icon-png-24.png';

const Container = styled.div`
  position: relative;
  max-width: 600px;
  margin: auto;
  margin-bottom: 40px;
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
  border-radius: 20px;
`;

const SearchBar = ({ handleSearch, idioms }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = idioms.filter((idiom) =>
      idiom.title.toLowerCase().includes(e.target.value.toLowerCase()),
    );
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
