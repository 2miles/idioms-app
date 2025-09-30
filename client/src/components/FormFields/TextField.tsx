import { useFormContext, useFormState } from 'react-hook-form';
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
} & React.InputHTMLAttributes<HTMLInputElement>;

const RHFTextField = ({ id, label, ...props }: RHFTextFieldProps) => {
  const { register, control } = useFormContext();
  const { errors, isSubmitted, touchedFields } = useFormState({ control });

  const error = errors[id];
  const isTouched = touchedFields[id];
  const validationClass = error ? 'is-invalid' : isTouched || isSubmitted ? 'is-valid' : '';

  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <StyledInput
        id={id}
        type='text'
        className={`form-control ${validationClass}`}
        {...register(id)}
        {...props}
      />
      {error && <div className='invalid-feedback d-block'>{(error as any).message}</div>}
    </div>
  );
};

export default RHFTextField;
