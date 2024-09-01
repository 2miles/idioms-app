import React, { useState } from 'react';
import searchIcon from '../images/search-icon-png-24.png';
import Style from './SearchBar.module.css';

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
    <div className={Style.container}>
      <span className={Style.iconContainer}>
        <img src={searchIcon} alt="search" className={Style.icon} />
      </span>
      <input
        type="text"
        className={`${Style.input} form-control`}
        placeholder="Search..."
        value={searchTerm}
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchBar;
