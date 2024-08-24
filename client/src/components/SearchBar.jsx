import React, { useState } from 'react';

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
    <div className="input-group search-bar">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={searchTerm}
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchBar;
