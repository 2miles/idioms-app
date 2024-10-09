import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled components

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  user-select: none;
  border: 1px solid var(--color-ui-border);
  background-color: var(--color-ui-primary);
  border-radius: var(--radius-sm);
  margin-right: var(--margin-lg);
  margin-bottom: var(--margin-md);
  padding: 0px var(--padding-ms);
  align-items: center;

  /* Media query for small screens */
  @media (max-width: 780px) {
    display: ${(props) => (props.$hideOnSmallScreen ? 'none' : 'flex')};
  }

  ${(props) =>
    props.$variant === 'searchColumn' &&
    `
      border: 1px solid var(--color-ui-border) !important;
      border-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
      border-top-right-radius: var(--radius-xl);
      border-bottom-right-radius: var(--radius-xl);
      background-color: var(--color-ui-primary);
      height: 100%;
      margin-right: 0px;
      border-top: none !important;
      border-right: none !important;
      border-bottom: none !important;
      border-left: 2px solid var(--color-ui-border);
    `}
  &:active {
    background-color: var(--hilite-ui-primary); // Customize this color
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
    border-top: 6px solid var(--color-text-primary);
    margin-left: var(--margin-ms);
    transition: border-top 0.3s ease, border-bottom 0.3s ease;
  }

  ${(props) =>
    props.$visible &&
    `
    &::after {
      border-top: none;
      border-bottom: 6px solid var(--color-text-primary);
    }
  `}
`;

const Options = styled.ul`
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: var(--color-ui-primary);
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 4;
  padding: 0;
  list-style: none;
`;

const Option = styled.li`
  padding: var(--padding-sm) var(--padding-sm);
  cursor: pointer;

  &:hover {
    background-color: var(--hilite-ui-primary);
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
      $hideOnSmallScreen={hideOnSmallScreen}
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
      $variant={variant}
    >
      <Anchor $visible={isOpen}>{label}</Anchor>
      <Options $visible={isOpen}>
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
