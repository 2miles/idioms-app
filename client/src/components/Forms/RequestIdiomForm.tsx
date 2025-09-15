import { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import TextField from '@/components/FormFields/TextField';
import { SuccessButton } from '@/components/ButtonStyles';
import useAuthorizedRequestFinder from '@/apis/useAuthorizedRequestFinder';

const FormContainer = styled.div`
  background-color: var(--bg-dark);
  border-radius: var(--radius-sm);
  font-size: var(--font-md);
  padding-left: var(--padding-lg);
  padding-right: var(--padding-lg);
  padding-bottom: var(--padding-sm);
  @media (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }

  .form-group {
    padding: var(--padding-md);
  }

  label {
    font-weight: 600;
    padding-bottom: var(--padding-xs);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin-left: var(--margin-lg);
  margin-top: var(--margin-lg);
  margin-bottom: var(--margin-md);
  align-items: center;
`;

type RequestIdiomFormProps = {
  onClose: () => void;
};

const RequestIdiomForm = ({ onClose }: RequestIdiomFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    contributor: '',
  });

  const [validated, setValidated] = useState(false);
  const getAuthorizedApi = useAuthorizedRequestFinder();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidated(true);
    if (formData.title.trim() === '') return;

    try {
      const api = await getAuthorizedApi();
      await api.post('/', {
        title: formData.title.trim(),
        contributor: formData.contributor.trim() || null,
      });

      Swal.fire({
        title: 'Request Submitted!',
        text: 'Your idiom request has been sent.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
    } catch (err) {
      console.error('Failed to submit request:', err);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem submitting your request.',
        icon: 'error',
      });
    }
  };

  return (
    <FormContainer>
      <form
        className={`needs-validation ${validated ? 'was-validated' : ''}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <TextField
          label='Idiom'
          id='title'
          value={formData.title}
          onChange={handleInputChange}
          placeholder='The cat’s out of the bag'
          required
        />
        <TextField
          label='Your Name'
          id='contributor'
          placeholder='Miles'
          value={formData.contributor}
          onChange={handleInputChange}
        />
        <ButtonsWrapper>
          <SuccessButton type='submit'>Submit</SuccessButton>
        </ButtonsWrapper>
      </form>
    </FormContainer>
  );
};

export default RequestIdiomForm;
