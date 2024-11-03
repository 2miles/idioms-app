import styled from 'styled-components';

const StyledInput = styled.input`
  &::placeholder {
    color: var(--dim-text-primary);
  }
`;

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField = ({ id, label, value, placeholder, required, onChange }: TextFieldProps) => {
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <StyledInput
        type='text'
        className='form-control'
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {required && <div className='invalid-feedback'>Please enter {label.toLowerCase()}.</div>}
    </div>
  );
};

export default TextField;
