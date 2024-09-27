import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  user-select: none;
  border: 1px solid #e9ecef;
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-right: 20px;
  margin-bottom: 1rem;
  padding: 0px 10px;
  align-items: center;
  height: 100%
    ${(props) =>
      props.variant === 'searchColumn' &&
      `
    border-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: white;
    height: 100%;
    margin-right: 0px;
    border-top: none;
    border-right: none;
    border-bottom: none;
    border-left: 2px solid #e9ecef;
  `}
    @media (max-width: 770px) {
    display: ${(props) => (props.hideOnSmallScreen ? 'none' : 'flex')};
  }
`;

const Anchor = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid black;
    margin-left: 10px;
    transition: border-top 0.3s ease, border-bottom 0.3s ease;
  }

  ${(props) =>
    props.visible &&
    `
    &::after {
      border-top: none;
      border-bottom: 6px solid black;
    }
  `}
`;

const Options = styled.ul`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 4;
  padding: 0;
  list-style: none;
`;

const Option = styled.li`
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

// Dropdown component
const Dropdown = ({
  label,
  hideOnSmallScreen,
  options,
  closeOnSelect,
  onOptionClick,
  variant,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (option) => {
    if (onOptionClick) {
      onOptionClick(option);
    }
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  return (
    <DropdownContainer
      hideOnSmallScreen={hideOnSmallScreen}
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
      variant={variant}
    >
      <Anchor visible={isOpen}>{label}</Anchor>
      <Options visible={isOpen}>
        {options.map((option, index) => (
          <Option key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </Option>
        ))}
      </Options>
    </DropdownContainer>
  );
};

export default Dropdown;
