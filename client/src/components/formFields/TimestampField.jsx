// TimestampField.jsx
import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const TimestampField = ({ label, id, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <Datetime
        value={value}
        onChange={onChange}
        dateFormat="YYYY-MM-DD"
        timeFormat="HH:mm:ss"
        inputProps={{ className: 'form-control' }}
      />
    </div>
  );
};

export default TimestampField;
