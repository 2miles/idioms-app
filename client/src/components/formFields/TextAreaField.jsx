// TextAreaField.jsx
import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  &::placeholder {
    color: #adb5bd;
  }
`;

const TextAreaField = ({ label, value, onChange, placeholder = '', rows = 4 }) => {
  return (
    <div className='form-group'>
      <label>{label}</label>
      <StyledTextArea
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
