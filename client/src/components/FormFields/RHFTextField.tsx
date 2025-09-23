import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

const StyledInput = styled.input`
  border-color: var(--color-border) !important;
  background-color: var(--bg-medium) !important;
  color: var(--color-text-primary) !important;
  &::placeholder {
    color: var(--color-text-dim);
  }
`;

type RHFTextFieldProps = {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  isSubmitted?: boolean;
  isTouched?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const RHFTextField = ({
  id,
  label,
  registration,
  error,
  isSubmitted,
  isTouched,
  ...props
}: RHFTextFieldProps) => {
  const validationClass = error ? 'is-invalid' : isTouched || isSubmitted ? 'is-valid' : '';
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <StyledInput
        id={id}
        type='text'
        className={`form-control ${validationClass}`}
        {...registration}
        {...props}
      />
      {error && <div className='invalid-feedback d-block'>{error.message}</div>}
    </div>
  );
};

export default RHFTextField;
