import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

import ArrowUpIcon from '@/images/arrow-up.svg?react';
import ArrowDownIcon from '@/images/arrow-down.svg?react';

type DropdownVariantType = 'searchColumn';

type StyleProps = {
  $hideOnSmallScreen?: boolean;
  $variant?: DropdownVariantType;
  $visible?: boolean;
};

const DropdownContainer = styled.div<StyleProps>`
  position: relative;
  display: flex;
  user-select: none;
  border: 1px solid var(--color-ui-border);
  background-color: var(--color-ui-primary);
  border-radius: var(--radius-sm);
  margin-left: var(--margin-md);
  margin-bottom: var(--margin-md);
  padding: 0px var(--padding-ms);
  padding-right: var(--padding-sm);
  align-items: center;

  @media (max-width: 780px) {
    display: ${(props) => (props.$hideOnSmallScreen ? 'none' : 'flex')};
  }

  ${(props) =>
    props.$variant === 'searchColumn' &&
    css`
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
    background-color: var(--hilite-ui-primary);
  }
`;

const Anchor = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 38px;
`;

const Options = styled.ul.attrs({ role: 'listbox' })<StyleProps>`
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

const Option = styled.li.attrs({ role: 'option' })`
  padding: var(--padding-sm) var(--padding-md);
  cursor: pointer;

  &:hover {
    background-color: var(--hilite-ui-primary);
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
  label: string;
  hideOnSmallScreen?: boolean;
  options: (string | JSX.Element)[];
  closeOnSelect?: boolean;
  onOptionClick?: (option: string | JSX.Element) => void;
  variant?: DropdownVariantType;
  ariaLabel?: string;
};

const Dropdown = ({
  label,
  hideOnSmallScreen,
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
    <DropdownContainer $hideOnSmallScreen={hideOnSmallScreen} ref={dropdownRef} $variant={variant}>
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
