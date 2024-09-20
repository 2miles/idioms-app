// TextAreaField.jsx
import React from 'react';

const TextAreaField = ({
  label,
  value,
  onChange,
  placeholder = '',
  rows = 4,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="form-control"
      />
    </div>
  );
};

export default TextAreaField;
