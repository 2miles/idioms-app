// TimestampField.jsx
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment, { Moment } from 'moment';

type TimestampFieldProps = {
  id: string;
  label: string;
  value: Moment;
  required?: boolean;
  onChange: (value: Moment) => void;
};

// const TimestampField = ({ label, id, value, onChange }: TimestampFieldProps) => {
//   return (
//     <div className='form-group'>
//       <label htmlFor={id}>{label}</label>
//       <Datetime value={value} onChange={onChange} dateFormat='YYYY-MM-DD' timeFormat='HH:mm:ss' />
//     </div>
//   );
// };

const TimestampField = ({ label, id, value, onChange }: TimestampFieldProps) => {
  // Handle both Moment and string values from react-datetime
  const handleChange = (newValue: string | Moment) => {
    const momentValue = moment.isMoment(newValue) ? newValue : moment(newValue);
    if (momentValue.isValid()) {
      onChange(momentValue);
    }
  };

  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <Datetime
        value={value}
        onChange={handleChange}
        dateFormat='YYYY-MM-DD'
        timeFormat='HH:mm:ss'
      />
    </div>
  );
};
export default TimestampField;
