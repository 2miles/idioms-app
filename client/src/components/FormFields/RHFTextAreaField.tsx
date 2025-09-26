import { useFormContext, useFormState } from 'react-hook-form';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  border-color: var(--color-border) !important;
  background-color: var(--bg-medium) !important;
  color: var(--color-text-primary) !important;
  &::placeholder {
    color: var(--color-text-dim) !important;
  }
`;

type RHFTextAreaFieldProps = {
  id: string;
  label: string;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaField = ({ id, label, rows = 4, ...props }: RHFTextAreaFieldProps) => {
  const { register, control } = useFormContext();
  const { errors, isSubmitted, touchedFields } = useFormState({ control });

  const error = errors[id];
  const isTouched = touchedFields[id];
  const validationClass = error ? 'is-invalid' : isTouched || isSubmitted ? 'is-valid' : '';

  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <StyledTextArea
        id={id}
        className={`form-control ${validationClass}`}
        rows={rows}
        {...register(id)}
        {...props}
      />
    </div>
  );
};

export default TextAreaField;
