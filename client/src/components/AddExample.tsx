import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { IdiomsContext } from '@/context/idiomsContext';
import IdiomFinder from '@/apis/idiomFinder';
import TextAreaField from '@/components/formFields/TextAreaField';

const FormContainer = styled.div`
  background-color: var(--color-ui-primary);
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

const FormControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  .form-check {
    margin: var(--margin-lg);
  }
  .button {
    margin: var(--margin-lg);
  }
  label {
    font-weight: normal;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin-left: var(--margin-lg);
  margin-top: var(--margin-lg);
  max-height: 40px;
  align-items: center;
`;

const TitleArea = styled.div`
  text-align: center;
  font-size: var(--font-xl);
  margin: 0;
  font-style: italic;
  font-weight: normal;
`;

type AddExampleProps = {
  idiomId: number;
  idiomTitle: string;
  onClose: () => void;
};

const AddExample = ({ idiomId, idiomTitle, onClose }: AddExampleProps) => {
  const { addExampleToIdiom } = useContext(IdiomsContext);

  const [validated, setValidated] = useState(false);
  const [keepOpen, setKeepOpen] = useState(false);
  const [formData, setFormData] = useState({ newExample: '' });

  const emptyStringToNull = (value: string) => (value.trim() === '' ? null : value);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidated(true);
    if (formData.newExample.trim() === '') {
      return; // Prevent form submission if title is empty
    }
    try {
      const response = await IdiomFinder.post(`/${String(idiomId)}/examples`, {
        example: emptyStringToNull(formData.newExample),
      });
      if (response.data && response.data.data && response.data.data.example) {
        addExampleToIdiom(idiomId, response.data.data.example);
        clearFormFields();
        Swal.fire({
          title: 'Example Added!',
          text: 'The example has been successfully added.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        if (!keepOpen) {
          setTimeout(() => {
            onClose();
          }, 200);
        }
      }
    } catch (err) {
      console.error('Error adding idiom.', err);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem adding the example.',
        icon: 'error',
      });
    }
  };

  const clearFormFields = () => {
    setFormData({ newExample: '' });
    setValidated(false);
  };

  return (
    <FormContainer>
      <TitleArea>{idiomTitle}</TitleArea>
      <form
        className={`needs-validation ${validated ? 'was-validated' : ''}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <TextAreaField
          label='New Example'
          id='newExample'
          value={formData.newExample}
          onChange={handleInputChange}
          placeholder='This is an example sentence.'
          rows={3}
        />
        <FormControlsWrapper>
          <ButtonsWrapper>
            <button type='submit' className='btn btn-success'>
              Add
            </button>
            <div className='form-check'>
              <input
                id='flexCheckDefault'
                type='checkbox'
                value=''
                className='form-check-input'
                checked={keepOpen}
                onChange={(e) => setKeepOpen(e.target.checked)}
              />
              <label className='form-check-label' htmlFor='flexCheckDefault'>
                Keep Open
              </label>
            </div>
          </ButtonsWrapper>
        </FormControlsWrapper>
      </form>
    </FormContainer>
  );
};

export default AddExample;
