// TimestampField.jsx
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

type TimestampFieldProps = {
  id: string;
  label: string;
  value: moment.Moment;
  required?: boolean;
  onChange: (value: moment.Moment | string) => void;
};

const TimestampField = ({ label, id, value, onChange }: TimestampFieldProps) => {
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <Datetime value={value} onChange={onChange} dateFormat='YYYY-MM-DD' timeFormat='HH:mm:ss' />
    </div>
  );
};

export default TimestampField;
