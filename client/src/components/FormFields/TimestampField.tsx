import moment, { Moment } from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { styled } from 'styled-components';

type TimestampFieldProps = {
  id: string;
  label: string;
  value: Moment;
  required?: boolean;
  onChange: (value: Moment) => void;
};

const StyledDatetime = styled(Datetime)`
  input {
    border-color: var(--color-border);
    background-color: var(--bg-medium);
    color: var(--color-text-primary);

    &::placeholder {
      color: var(--dim-text-secondary);
    }
    &:focus {
      background-color: var(--bg-medium);
      border-color: var(--color-border);
      color: var(--color-text-primary);
      outline: none;
      box-shadow: none;
    }
  }

  .rdtPicker {
    background-color: var(--bg-medium);
    border: 1px solid var(--color-border);
  }

  .rdtPicker td {
    color: var(--color-text-primary);
  }

  /* active selected day */
  .rdtPicker td.rdtActive,
  .rdtPicker td.rdtActive:hover {
    background-color: var(--color-brand-primary);
    color: var(--color-text-primary);
  }

  /* HOVER: use a darker/lighter surface than the picker bg */
  .rdtPicker td:hover:not(.rdtActive),
  .rdtPicker .rdtSwitch:hover,
  .rdtPicker .rdtNext:hover,
  .rdtPicker .rdtPrev:hover {
    background-color: var(--bg-light);
    color: var(--color-text-primary);
  }
`;

const TimestampField = ({ label, id, value, onChange }: TimestampFieldProps) => {
  const handleChange = (newValue: string | Moment) => {
    const momentValue = moment.isMoment(newValue) ? newValue : moment(newValue);
    if (momentValue.isValid()) {
      onChange(momentValue);
    }
  };

  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <StyledDatetime
        value={value}
        onChange={handleChange}
        dateFormat='YYYY-MM-DD'
        timeFormat='HH:mm:ss'
        inputProps={{ id, className: 'form-control' }}
      />
    </div>
  );
};
export default TimestampField;
