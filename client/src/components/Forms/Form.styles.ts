import { styled } from 'styled-components';

export const FormContainer = styled.div`
  background-color: var(--bg-dark);
  border-radius: var(--radius-sm);
  font-size: var(--font-md);
  padding-left: var(--padding-lg);
  padding-right: var(--padding-lg);
  padding-bottom: var(--padding-lg);
  @media (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }

  .form-group {
    padding: var(--padding-md);
  }

  label {
    font-weight: 600;
    padding-bottom: var(--padding-xs);
  }
`;

export const FormControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  .form-check {
    margin: var(--margin-lg);
  }
  .button {
    margin: var(--margin-lg);
  }
  label {
    font-weight: normal;
  }
`;

export const SubmitButtonWrapper = styled.div`
  margin-left: var(--margin-md);
  margin-right: var(--margin-md);
  margin-top: var(--margin-xl);
  margin-bottom: var(--margin-lg);
  align-items: center;
`;

export const HalfButtonsWrapper = styled.div`
  display: flex;
  margin-top: var(--margin-lg);
  padding-left: var(--padding-lg);
  padding-right: var(--padding-lg);
  padding-bottom: var(--padding-lg);
  gap: var(--margin-lg);
  width: 100%;
`;

export const HalfButton = styled.button`
  flex: 1; /* take equal space */
  text-align: center; /* center label */
`;

export const TitleArea = styled.div`
  text-align: center;
  font-size: var(--font-xl);
  margin: 0;
  font-style: italic;
  font-weight: normal;
`;
