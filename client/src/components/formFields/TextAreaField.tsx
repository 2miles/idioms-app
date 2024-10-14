// TextAreaField.jsx
import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  &::placeholder {
    color: var(--dim-text-primary);
  }
`;
type TextAreaFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
};
const TextAreaField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: TextAreaFieldProps) => {
  return (
    <div className='form-group'>
      <label>{label}</label>
      <StyledTextArea
        id={id}
        className='form-control'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
};

export default TextAreaField;
