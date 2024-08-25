import React, { useState } from 'react';
import searchIcon from '../images/search-icon-png-24.png';

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
    <div className="search-bar-container">
      <span className="search-icon-container">
        <img src={searchIcon} alt="search" className="search-icon" />
      </span>
      <input
        type="text"
        className="form-control search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchBar;
