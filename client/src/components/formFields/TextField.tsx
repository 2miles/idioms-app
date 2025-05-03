import styled from 'styled-components';

const StyledInput = styled.input`
  &::placeholder {
    color: var(--dim-text-secondary);
  }
`;

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ id, label, value, onChange, required, ...props }: TextFieldProps) => {
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <StyledInput
        type='text'
        className='form-control'
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
      {required && <div className='invalid-feedback'>Please enter {label.toLowerCase()}.</div>}
    </div>
  );
};

export default TextField;
