import styled from 'styled-components';

// Base button styles
const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px !important;
  text-decoration: none;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    filter: grayscale(0.5);
  }
`;

// Success button
export const SuccessButton = styled(ButtonBase)`
  background-color: var(--button-success-bg);
  border: 1px solid;
  border-color: var(--button-success-border);
  padding-top: 6px;
  margin: 0px;
  &:hover {
    border-color: var(--button-success-border-hover);
    background-color: var(--button-success-bg-hover);
  }
  &:active {
    background-color: var(--button-success-bg-hover) !important;
    border-color: var(--button-success-border-hover) !important;
    transform: scale(0.99);
  }
  &:disabled {
    background-color: var(--button-success-bg);
    border-color: var(--button-success-border);
    opacity: 0.6;
    filter: grayscale(0.5);
  }
`;

export const WideSuccessButton = styled(SuccessButton)`
  width: 100%;
`;

// Primary button
export const PrimaryButton = styled(ButtonBase)`
  background-color: var(--button-primary-bg);
  border: 1px solid;
  border-color: var(--button-primary-border);
  &:hover {
    border-color: var(--button-primary-border-hover);
    background-color: var(--button-primary-bg-hover);
  }
  &:active {
    background-color: var(--button-primary-bg-hover) !important;
    border-color: var(--button-primary-border-hover) !important;
    transform: scale(0.99);
  }
  &:disabled {
    background-color: var(--button-primary-bg);
    border-color: var(--button-primary-border);
    opacity: 0.6;
    filter: grayscale(0.5);
  }
`;

// Danger button
export const DangerButton = styled(ButtonBase)`
  background-color: var(--button-danger-bg);
  border: 1px solid;
  border-color: var(--button-danger-border);
  &:hover {
    border-color: var(--button-danger-border-hover);
    background-color: var(--button-danger-bg-hover);
  }
  &:active {
    background-color: var(--button-danger-bg-hover) !important;
    border-color: var(--button-danger-border-hover) !important;
    transform: scale(0.99);
  }
  &:disabled {
    background-color: var(--button-danger-bg);
    border-color: var(--button-danger-border);
    opacity: 0.6;
    filter: grayscale(0.5);
  }
`;

// Secondary button
export const SecondaryButton = styled(ButtonBase)`
  background-color: var(--bg-dark) !important;
  border: 1px solid;
  color: var(--color-text-primary);
  border-color: var(--color-border) !important;

  &:hover {
    background-color: var(--bg-medium) !important;
    border-color: var(--color-border);
    color: var(--color-text-primary);
  }
  &:active {
    background-color: var(--bg-light) !important;
    border-color: var(--color-border) !important;
    color: var(--color-text-primary) !important;
    transform: scale(0.99);
  }
  &:disabled {
    background-color: var(--bg-dark);
    border-color: var(--color-border);
    opacity: 0.6;
    filter: grayscale(0.5);
  }
`;

export default {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  SuccessButton,
};
