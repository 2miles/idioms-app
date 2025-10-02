import { ReactNode, useEffect, useRef, useState } from 'react';

import ArrowDownIcon from '@/images/arrow-down.svg?react';
import ArrowUpIcon from '@/images/arrow-up.svg?react';
import { Anchor, DropdownContainer, IconWrapper, Option, Options } from './Dropdown.styles';

type DropdownVariantType = 'searchColumn' | 'avatar';

type DropdownProps = {
  label: ReactNode;
  hideOnSmallScreen?: boolean;
  hideOnSmallestScreen?: boolean;
  options: (string | JSX.Element)[];
  closeOnSelect?: boolean;
  onOptionClick?: (option: string | JSX.Element) => void;
  variant?: DropdownVariantType;
  ariaLabel?: string;
  hideCaret?: boolean;
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
  hideCaret = false,
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
        $variant={variant}
      >
        {label}
        <IconWrapper $hidden={hideCaret}>
          {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </IconWrapper>
      </Anchor>

      <Options $visible={isOpen}>
        {options.map((option, index) => {
          const isDim = option === 'Profile' || option === 'Settings';
          return (
            <Option key={index} $dim={isDim} onClick={() => handleOptionClick(option)}>
              {option}
            </Option>
          );
        })}
      </Options>
    </DropdownContainer>
  );
};

export default Dropdown;
