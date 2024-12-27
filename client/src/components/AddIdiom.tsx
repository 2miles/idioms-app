import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Swal from 'sweetalert2';

import { IdiomsContext } from '@/context/idiomsContext';
import IdiomFinder from '@/apis/idiomFinder';
import TextAreaField from '@/components/formFields/TextAreaField';
import TextField from '@/components/formFields/TextField';
import TimestampField from '@/components/formFields/TimestampField';

const FormContainer = styled.div`
  background-color: var(--color-ui-primary);
  border: 1px solid var(--color-ui-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-md);

  .form-group {
    margin-top: var(--margin-lg);
    margin-bottom: var(--margin-lg);
  }
  padding-left: var(--padding-lg);
  padding-right: var(--padding-lg);
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
`;

type AddIdiomProps = {
  collapseForm: () => void;
};

const AddIdiom = ({ collapseForm }: AddIdiomProps) => {
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
    setValidated(true);
    if (formData.title.trim() === '') {
      return; // Prevent form submission if title is empty
    }
    try {
      // Format for the backend and remove milliseconds
      const formattedTimestamp: string = formData.timestamp.toISOString().split('.')[0] + 'Z';
      const response = await IdiomFinder.post('/', {
        title: emptyStringToNull(formData.title),
        title_general: emptyStringToNull(formData.titleGeneral),
        definition: emptyStringToNull(formData.definition),
        timestamps: emptyStringToNull(formattedTimestamp),
        contributor: emptyStringToNull(formData.contributor),
      });
      if (response.data && response.data.data && response.data.data.idiom) {
        addIdioms(response.data.data.idiom);
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
            collapseForm();
          }, 200);
        }
      }
    } catch (err) {
      console.error('Error adding idiom.', err);
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
          <button type='submit' className='btn btn-primary'>
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
        </FormControlsWrapper>
      </form>
    </FormContainer>
  );
};

export default AddIdiom;
