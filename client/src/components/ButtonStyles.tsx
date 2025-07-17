import styled from 'styled-components';

// Base button styles
const ButtonBase = styled.button`
  max-height: 40px;
  display: flex;
  align-items: center;
  gap: 6px; // spacing between icon and text
  padding: 6px 12px; // optional: define consistent padding
`;

// Success button
export const SuccessButton = styled(ButtonBase)`
  background-color: var(--button-success-bg);
  border: 1.5px solid;
  border-color: var(--button-success-border);
  padding-top: 6px;
  margin: 0px;
  &:hover {
    border-color: var(--button-success-border-hover);
    background-color: var(--button-success-bg-hover);
  }
  &:active {
  }
`;

// Primary button
export const PrimaryButton = styled(ButtonBase)`
  background-color: var(--button-primary-bg);
  border: 1.5px solid;
  border-color: var(--button-primary-border);
  &:hover {
    border-color: var(--button-primary-border-hover);
    background-color: var(--button-primary-bg-hover);
  }
  &:active {
  }
`;

// Danger button
export const DangerButton = styled(ButtonBase)`
  background-color: var(--button-danger-bg);
  border: 1.5px solid;
  border-color: var(--button-danger-border);
  &:hover {
    border-color: var(--button-danger-border-hover);
    background-color: var(--button-danger-bg-hover);
  }
  &:active {
  }
`;

// Secondary button
export const SecondaryButton = styled(ButtonBase)`
  background-color: var(--color-ui-primary);
  color: var(--color-text-primary);
  border-color: var(--color-ui-border);

  &:hover {
    background-color: var(--hilite-ui-primary);
    border-color: var(--color-ui-border);
    color: var(--color-text-primary);
  }
  &:active {
    background-color: var(--hilite-ui-primary) !important;
    border-color: var(--color-ui-border) !important;
    color: var(--color-text-primary) !important;
  }
`;

export default {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
};
