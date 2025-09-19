// src/components/Dropdown/ThemeDropdown.tsx
import styled from 'styled-components';

import Dropdown from '@/components/Dropdown/Dropdown/Dropdown';
import { useUser } from '@/context/userContext';
import ThemeIcon from '@/images/dark-mode.svg?react';
import type { Theme } from '@/utils/theme';

const Icon = styled.span`
  inline-size: 24px;
  block-size: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Row = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-primary);
`;

const OPTIONS: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

const ThemeDropdown = () => {
  const { setTheme } = useUser();

  const options = OPTIONS.map((opt) => (
    <Row key={opt.value} data-theme={opt.value}>
      {opt.label}
    </Row>
  ));

  const onOptionClick = (opt: string | JSX.Element) => {
    if (typeof opt !== 'string') {
      const value = (opt as any)?.props?.['data-theme'] as Theme | undefined;
      if (value) setTheme(value);
    }
  };

  return (
    <Dropdown
      label={
        <Icon>
          <ThemeIcon />
        </Icon>
      }
      options={options}
      hideOnSmallestScreen={false}
      hideOnSmallScreen={false}
      onOptionClick={onOptionClick}
      closeOnSelect
      ariaLabel='Theme'
    />
  );
};

export default ThemeDropdown;
