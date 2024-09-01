import React, { useState, useRef, useEffect } from 'react';

const ItemsPerPageSelector = ({ itemsPerPage, handleItemsPerPageChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(itemsPerPage);
  const dropdownRef = useRef(null);

  const options = [5, 10, 20, 50];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    handleItemsPerPageChange(value);
    setShowOptions(false);
  };

  return (
    <div
      className="custom-dropdown"
      ref={dropdownRef}
      onClick={() => setShowOptions(!showOptions)}
    >
      <span className="selected">{selectedOption} </span>
      {showOptions && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemsPerPageSelector;
