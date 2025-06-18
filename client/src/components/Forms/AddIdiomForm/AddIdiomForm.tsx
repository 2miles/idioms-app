import { useState, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { IdiomsContext } from '@/context/idiomsContext';
import TextAreaField from '@/components/FormFields/TextAreaField';
import TextField from '@/components/FormFields/TextField';
import TimestampField from '@/components/FormFields/TimestampField';
import { NewIdiomInput } from '@/types';
import { SuccessButton } from '@/components/ButtonStyles';

const FormContainer = styled.div`
  background-color: var(--color-canvas);
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

type AddIdiomProps = {
  onClose: () => void;
};

const AddIdiomForm = ({ onClose }: AddIdiomProps) => {
  const { addIdioms } = useContext(IdiomsContext);

  const [validated, setValidated] = useState(false);
  const [keepOpen, setKeepOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    titleGeneral: '',
    definition: '',
    contributor: '',
    timestamp: moment(),
  });

  const emptyStringToNull = (value: string) => (value.trim() === '' ? null : value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleTimestampChange = (value: moment.Moment) => {
    setFormData((prevData) => ({
      ...prevData,
      timestamp: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.trace('🚨 handleSubmit called');
    setValidated(true);
    if (formData.title.trim() === '') {
      return; // Prevent form submission if title is empty
    }

    // Format for the backend and remove milliseconds
    const formattedTimestamp: string = formData.timestamp.toISOString().split('.')[0] + 'Z';

    const payload: NewIdiomInput = {
      title: emptyStringToNull(formData.title),
      title_general: emptyStringToNull(formData.titleGeneral),
      definition: emptyStringToNull(formData.definition),
      timestamps: emptyStringToNull(formattedTimestamp),
      contributor: emptyStringToNull(formData.contributor),
    };

    const addedIdiom = await addIdioms(payload);

    if (addedIdiom) {
      clearFormFields();
      Swal.fire({
        title: 'Idiom Added!',
        text: 'The idiom has been successfully added.',
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
      Swal.fire({
        title: 'Error',
        text: 'There was a problem adding the idiom.',
        icon: 'error',
      });
    }
  };

  const clearFormFields = () => {
    setFormData({
      title: '',
      titleGeneral: '',
      definition: '',
      contributor: '',
      timestamp: moment(),
    });
    setValidated(false);
  };

  return (
    <FormContainer>
      <form
        className={`needs-validation ${validated ? 'was-validated' : ''}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <TextField
          label='Title'
          id='title'
          value={formData.title}
          onChange={handleInputChange}
          placeholder='Pull yourself up by your bootstraps'
          required
        />
        <TextField
          label='Title General'
          id='titleGeneral'
          value={formData.titleGeneral}
          onChange={handleInputChange}
          placeholder="Pull (oneself) up by (one's) (own) bootstraps"
        />
        <TextAreaField
          label='Definition'
          id='definition'
          value={formData.definition}
          onChange={handleInputChange}
          placeholder="To improve one's life or circumstances through one's own efforts, rather than relying on others."
          rows={3}
        />
        <TimestampField
          label='Timestamp'
          id='timestamp'
          value={formData.timestamp}
          onChange={handleTimestampChange}
        />
        <TextField
          label='Contributor'
          id='contributor'
          placeholder='Miles'
          value={formData.contributor}
          onChange={handleInputChange}
        />
        <FormControlsWrapper>
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
        </FormControlsWrapper>
      </form>
    </FormContainer>
  );
};

export default AddIdiomForm;
