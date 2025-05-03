import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  &::placeholder {
    color: var(--dim-text-secondary);
  }
`;
type TextAreaFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
const TextAreaField = ({ id, label, value, onChange, rows = 4, ...props }: TextAreaFieldProps) => {
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <StyledTextArea
        id={id}
        className='form-control'
        value={value}
        onChange={onChange}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default TextAreaField;
