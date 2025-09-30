import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { styled } from 'styled-components';

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

  .rdtPicker td.rdtActive,
  .rdtPicker td.rdtActive:hover {
    background-color: var(--color-brand-primary);
    color: var(--color-text-primary);
  }

  .rdtPicker td:hover:not(.rdtActive),
  .rdtPicker .rdtSwitch:hover,
  .rdtPicker .rdtNext:hover,
  .rdtPicker .rdtPrev:hover {
    background-color: var(--bg-light);
    color: var(--color-text-primary);
  }
`;

type RHFTimestampFieldProps = {
  id: string;
  label: string;
};

const RHFTimestampField = ({ id, label }: RHFTimestampFieldProps) => {
  const { control } = useFormContext();
  const { errors, isSubmitted, touchedFields } = useFormState({ control });

  const error = errors[id];
  const isTouched = touchedFields[id];
  const validationClass = error ? 'is-invalid' : isTouched || isSubmitted ? 'is-valid' : '';

  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <StyledDatetime
            value={field.value ? moment(field.value) : ''}
            onChange={(newValue) => {
              const momentValue = moment.isMoment(newValue) ? newValue : moment(newValue);
              if (momentValue.isValid()) {
                field.onChange(momentValue.toDate()); // Store Date in RHF
              }
            }}
            dateFormat='YYYY-MM-DD'
            timeFormat='HH:mm:ss'
            inputProps={{
              id,
              className: `form-control ${validationClass}`,
            }}
          />
        )}
      />
      {error && <div className='invalid-feedback d-block'>{(error as any).message}</div>}
    </div>
  );
};

export default RHFTimestampField;
