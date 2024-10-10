import React, { useContext, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';
import TextAreaField from './formFields/TextAreaField';
import TextField from './formFields/TextField';
import TimestampField from './formFields/TimestampField';

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
  justify-content: flex-start; // Ensures the buttons start aligned on the left

  button {
    margin: var(--margin-lg);
  }

  .btn-danger {
    margin-left: auto;
  }
`;

const UpdateIdiom = ({ idiom, onDelete, onSuccess }) => {
  const { updateIdiom } = useContext(IdiomsContext);
  const [title, setTitle] = useState(idiom.title || '');
  const [titleGeneral, setTitleGeneral] = useState(idiom.title_general || '');
  const [definition, setDefinition] = useState(idiom.definition || '');
  const [contributor, setContributor] = useState(idiom.contributor || '');
  const [timestamp, setTimestamp] = useState(
    idiom.timestamps ? moment(idiom.timestamps) : null,
  );
  const [validated, setValidated] = useState(false);

  const emptyStringToNull = (value) => (value.trim() === '' ? null : value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (title.trim() === '') {
      return; // Prevent form submission if title is empty
    }
    try {
      // Format for the backend and remove milliseconds
      const formattedTimestamp = timestamp
        ? timestamp.toISOString().split('.')[0] + 'Z'
        : null;
      const response = await IdiomFinder.put(`/${idiom.id}`, {
        title: emptyStringToNull(title),
        title_general: emptyStringToNull(titleGeneral),
        definition: emptyStringToNull(definition),
        contributor: emptyStringToNull(contributor),
        timestamps: emptyStringToNull(formattedTimestamp),
      });
      if (response.data && response.data.data && response.data.data.idiom) {
        updateIdiom(response.data.data.idiom);
        // Show success message
        Swal.fire({
          title: 'Updated!',
          text: 'The idiom has been successfully updated.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        // Call onSuccess to hide the form
        if (onSuccess) {
          onSuccess();
        }
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
          label="Title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Title General"
          id="titleGeneral"
          value={titleGeneral}
          onChange={(e) => setTitleGeneral(e.target.value)}
        />
        <TextAreaField
          label="Definition"
          id="definition"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          rows={3}
        />
        <TimestampField
          label="Timestamp"
          id="timestamp"
          value={timestamp}
          onChange={setTimestamp}
        />
        <TextField
          label="Contributor"
          id="contributor"
          value={contributor}
          onChange={(e) => setContributor(e.target.value)}
        />
        <ButtonsWrapper>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button type="button" className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </ButtonsWrapper>
      </form>
    </FormContainer>
  );
};

export default UpdateIdiom;
