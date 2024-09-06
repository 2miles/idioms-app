import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ItemsPerPageDropdown = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  user-select: none;
  border: 1px solid #e9ecef;
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-right: 20px;
  margin-bottom: 1rem;
  padding: 0px 10px;
  height: 35px;
`;

const Selected = styled.span`
  display: flex;
  align-items: center;

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid black;
    margin-left: 10px;
  }
  .visible &::after {
    border-top: none;
    border-bottom: 6px solid black;
  }
`;

const Options = styled.div`
  display: block;
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.div`
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

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
    <ItemsPerPageDropdown
      className={showOptions ? 'visible' : ''}
      ref={dropdownRef}
      onClick={() => setShowOptions(!showOptions)}
    >
      <Selected>{selectedOption} </Selected>
      {showOptions && (
        <Options>
          {options.map((option) => (
            <Option key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </Option>
          ))}
        </Options>
      )}
    </ItemsPerPageDropdown>
  );
};

export default ItemsPerPageSelector;
