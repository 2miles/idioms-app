// InputField.jsx
import React from 'react';

const TextField = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {required && (
        <div className="invalid-feedback">
          Please enter {label.toLowerCase()}.
        </div>
      )}
    </div>
  );
};

export default TextField;
