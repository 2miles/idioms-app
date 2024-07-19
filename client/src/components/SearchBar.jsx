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
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control m-3"
        placeholder="Search..."
        value={searchTerm}
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchBar;
