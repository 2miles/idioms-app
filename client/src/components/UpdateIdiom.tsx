import { useContext, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import IdiomFinder from '@/apis/idiomFinder';
import { IdiomsContext } from '@/context/idiomsContext';
import { Idiom } from '@/types';
import TextAreaField from '@/components/formFields/TextAreaField';
import TextField from '@/components/formFields/TextField';
import TimestampField from '@/components/formFields/TimestampField';

const FormContainer = styled.div`
  background-color: var(--color-ui-primary);
  border: 1px solid var(--color-ui-border);
  border-radius: var(--radius-sm);
  margin: var(--margin-md) auto var(--margin-xxl);
  font-size: var(--font-md);
  margin-bottom: var(--margin-lg);
  margin-top: var(--margin-lg);

  .form-group {
    padding: var(--padding-md);
  }

  & button {
    margin-top: var(--margin-xxl) !important;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    margin: var(--margin-lg);
  }

  .btn-danger {
    margin-left: auto;
  }
`;

type UpdateIdiomProps = {
  idiom: Idiom | null;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleToggleEdit: () => void;
};

const UpdateIdiom = ({ idiom, onDelete, handleToggleEdit }: UpdateIdiomProps) => {
  const { updateIdiom } = useContext(IdiomsContext);
  const [formData, setFormData] = useState({
    title: idiom?.title || '',
    titleGeneral: idiom?.title_general || '',
    definition: idiom?.definition || '',
    contributor: idiom?.contributor || '',
    timestamp: moment(idiom?.timestamps),
  });
  const [validated, setValidated] = useState(false);

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
      const formattedTimestamp = formData.timestamp.toISOString().split('.')[0] + 'Z';
      const response = await IdiomFinder.put(`/${idiom?.id}`, {
        title: emptyStringToNull(formData.title),
        title_general: emptyStringToNull(formData.titleGeneral),
        definition: emptyStringToNull(formData.definition),
        contributor: emptyStringToNull(formData.contributor),
        timestamps: emptyStringToNull(formattedTimestamp),
      });
      if (response.data && response.data.data && response.data.data.idiom) {
        updateIdiom(response.data.data.idiom);
        Swal.fire({
          title: 'Updated!',
          text: 'The idiom has been successfully updated.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        // Call onSuccess to hide the form
        handleToggleEdit();
      }
    } catch (err) {
      console.error('Error updating idiom:', err);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem updating the idiom.',
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
          label='Title'
          id='title'
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <TextField
          label='Title General'
          id='titleGeneral'
          value={formData.titleGeneral}
          onChange={handleInputChange}
        />
        <TextAreaField
          label='Definition'
          id='definition'
          value={formData.definition}
          onChange={handleInputChange}
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
          value={formData.contributor}
          onChange={handleInputChange}
        />
        <ButtonsWrapper>
          <button type='submit' className='btn btn-primary'>
            Update
          </button>
          <button type='button' className='btn btn-danger' onClick={onDelete}>
            Delete
          </button>
        </ButtonsWrapper>
      </form>
    </FormContainer>
  );
};

export default UpdateIdiom;
