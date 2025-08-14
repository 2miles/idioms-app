import { useState, useRef, useEffect, ReactNode } from 'react';
import styled, { css } from 'styled-components';

import ArrowUpIcon from '@/images/arrow-up.svg?react';
import ArrowDownIcon from '@/images/arrow-down.svg?react';

type DropdownVariantType = 'searchColumn';

type StyleProps = {
  $hideOnSmallScreen?: boolean;
  $hideOnSmallestScreen?: boolean;
  $variant?: DropdownVariantType;
  $visible?: boolean;
};

const DropdownContainer = styled.div<StyleProps>`
  position: relative;
  // display: flex;
  display: inline-flex;
  user-select: none;
  border: 1px solid var(--color-border);
  background-color: var(--bg-dark);
  border-radius: var(--radius-sm);
  margin-left: var(--margin-md);
  margin-bottom: var(--margin-md);
  padding: 0px var(--padding-ms);
  padding-right: var(--padding-sm);
  align-items: center;
  height: 41px;

  @media (max-width: 780px) {
    display: ${(props) => (props.$hideOnSmallScreen ? 'none' : 'inline-flex')};
  }
  @media (max-width: 390px) {
    display: ${(props) => (props.$hideOnSmallestScreen ? 'none' : 'inline-flex')};
  }

  ${(props) =>
    props.$variant === 'searchColumn' &&
    css`
      border: 1px solid var(--color-border) !important;
      border-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
      border-top-right-radius: var(--radius-xl);
      border-bottom-right-radius: var(--radius-xl);
      background-color: var(--bg-dark);
      height: 100%;
      margin-right: 0px;
      border-top: none !important;
      border-right: none !important;
      border-bottom: none !important;
      border-left: 2px solid var(--color-border);
    `}
  &:active {
    background-color: var(--bg-light);
  }
`;

const Anchor = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 38px;
`;

// const Options = styled.ul.attrs({ role: 'listbox' })<StyleProps>`
//   border: 1px solid var(--color-ui-border) !important;
//   display: ${(props) => (props.$visible ? 'block' : 'none')};
//   position: absolute;
//   top: calc(100% + 5px);
//   right: 0;
//   background-color: var(--color-ui-primary);
//   border-radius: var(--radius-sm);
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25), 0 4px 10px rgba(0, 0, 0, 0.12);
//   z-index: 4;
//   padding: 0;
//   list-style: none;
// `;
const Options = styled.ul.attrs({ role: 'listbox' })<StyleProps>`
  border: 1px solid var(--color-border) !important;
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: var(--bg-medium);
  border-radius: var(--radius-sm);

  /* Default light mode shadow */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.156), 0 2px 5px rgba(0, 0, 0, 0.101);

  z-index: 4;
  padding: 0;
  list-style: none;

  /* Dark mode override */
  .theme-dark & {
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.06), /* light glow */ 0 2px 4px rgba(0, 0, 0, 0.3); /* deeper dark edge */
  }
`;

const Option = styled.li.attrs({ role: 'option' })`
  padding: var(--padding-sm) var(--padding-md);
  cursor: pointer;

  &:hover {
    background-color: var(--bg-light);
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--margin-sm);

  svg {
    width: 20px;
    height: 20px;
    color: var(--color-text-primary);
  }
`;

type DropdownProps = {
  label: ReactNode;
  hideOnSmallScreen?: boolean;
  hideOnSmallestScreen?: boolean;
  options: (string | JSX.Element)[];
  closeOnSelect?: boolean;
  onOptionClick?: (option: string | JSX.Element) => void;
  variant?: DropdownVariantType;
  ariaLabel?: string;
};

const Dropdown = ({
  label,
  hideOnSmallScreen = false,
  hideOnSmallestScreen = false,
  options,
  closeOnSelect = false,
  onOptionClick,
  variant,
  ariaLabel,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleOptionClick = (option: string | JSX.Element) => {
    if (onOptionClick) onOptionClick(option);
    if (closeOnSelect) setIsOpen(false);
  };

  const handleLabelClick = () => setIsOpen((prev) => !prev);

  return (
    <DropdownContainer
      $hideOnSmallScreen={hideOnSmallScreen}
      $hideOnSmallestScreen={hideOnSmallestScreen}
      ref={dropdownRef}
      $variant={variant}
    >
      <Anchor
        onClick={handleLabelClick}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        aria-label={ariaLabel}
      >
        {label}
        <IconWrapper>{isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}</IconWrapper>
      </Anchor>
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
