import styled from 'styled-components';

// Base button styles
const ButtonBase = styled.button`
  max-height: 40px;
  /* padding: var(--padding-md) var(--padding-lg);
  font-size: var(--font-md);
  font-weight: 500;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  } */
`;

// // Primary button
// export const PrimaryButton = styled(ButtonBase)`
//   background-color: var(--color-brand-primary);
//   color: var(--color-text-on-primary);
//   border-color: var(--color-brand-primary);

//   &:hover {
//     background-color: var(--color-brand-primary-hover);
//   }

//   &:active {
//     background-color: var(--color-brand-primary-active);
//   }
// `;

// Secondary button
// Changes the color of the Bootstrap btn
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

// // Outline button
// export const OutlineButton = styled(ButtonBase)`
//   background-color: transparent;
//   color: var(--color-brand-primary);
//   border-color: var(--color-brand-primary);

//   &:hover {
//     background-color: var(--color-brand-primary-hover);
//     color: var(--color-text-on-primary);
//   }

//   &:active {
//     background-color: var(--color-brand-primary-active);
//   }
// `;

// // Danger button
// export const DangerButton = styled(ButtonBase)`
//   background-color: var(--color-danger);
//   color: var(--color-text-on-danger);
//   border-color: var(--color-danger);

//   &:hover {
//     background-color: var(--color-danger-hover);
//   }

//   &:active {
//     background-color: var(--color-danger-active);
//   }
// `;

// // Utility: Small button size
// export const SmallButton = styled(ButtonBase)`
//   padding: var(--padding-sm) var(--padding-md);
//   font-size: var(--font-sm);
// `;

export default {
  // PrimaryButton,
  SecondaryButton,
  // OutlineButton,
  // DangerButton,
  // SmallButton,
};
