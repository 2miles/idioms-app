import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ColumnSelectDropdown = styled.div`
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

  @media (max-width: 770px) {
    display: none;
  }

  .items {
    display: none;
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1;
    padding: 0;
    list-style: none;
  }

  &.visible .items {
    display: block;
  }
`;

const Anchor = styled.span`
  display: flex;
  align-items: center;

  &::after {
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;

  input[type='checkbox'] {
    margin-right: 10px; /* Add margin to the checkbox */
  }
`;

const ListItem = styled.li`
  padding: 5px 10px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ColumnSelector = ({ columnVisibility, handleColumnVisibilityChange }) => {
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowColumnSelector(false);
      }
    };
    if (showColumnSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColumnSelector]);

  return (
    <ColumnSelectDropdown
      className={showColumnSelector ? 'visible' : ''}
      ref={dropdownRef}
      onClick={() => setShowColumnSelector(!showColumnSelector)}
    >
      <Anchor>Columns</Anchor>
      <ul className="items" onClick={(e) => e.stopPropagation()}>
        {Object.keys(columnVisibility).map((column) => (
          <ListItem key={column}>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={columnVisibility[column]}
                onChange={() => handleColumnVisibilityChange(column)}
              />
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </CheckboxLabel>
          </ListItem>
        ))}
      </ul>
    </ColumnSelectDropdown>
  );
};

export default ColumnSelector;
