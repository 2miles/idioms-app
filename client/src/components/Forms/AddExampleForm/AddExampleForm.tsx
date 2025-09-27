import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { SuccessButton } from '@/components/ButtonStyles';
import TextAreaField from '@/components/FormFields/TextAreaField';
import { IdiomsContext } from '@/context/idiomsContext';

import { FormContainer, FormControlsWrapper } from '../Form.styles';

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
  onAddSuccess?: () => void;
};

const AddExampleForm = ({ idiomId, idiomTitle, onClose, onAddSuccess }: AddExampleProps) => {
  const { addExampleToIdiom } = useContext(IdiomsContext);
  const [validated, setValidated] = useState(false);
  const [keepOpen, setKeepOpen] = useState(false);
  const [formData, setFormData] = useState({ newExample: '' });

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
    if (!formData.newExample.trim()) return;
    try {
      const newExample = await addExampleToIdiom(idiomId, formData.newExample);
      if (newExample) {
        clearFormFields();
        onAddSuccess?.(); // Let DetailPage refresh examples
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
      } else {
        throw new Error('No example returned');
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
            <SuccessButton type='submit' className='btn btn-success'>
              Add
            </SuccessButton>
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

export default AddExampleForm;
