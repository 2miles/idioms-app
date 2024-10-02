import React, { useContext, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';
import TextAreaField from './formFields/TextAreaField';
import TextField from './formFields/TextField';
import TimestampField from './formFields/TimestampField';

const FormContainer = styled.div`
  background-color: var(--color-ui-primary);
  border: 1px solid var(--color-ui-border);
  border-radius: 5px;
  margin: 16px auto 40px;
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 20px;

  .form-group {
    padding: 16px;
  }

  & button {
    margin-top: 40px !important;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start; // Ensures the buttons start aligned on the left

  button {
    margin: 20px;
  }

  .btn-danger {
    margin-left: auto; // This pushes the delete button to the right
  }
`;

const ConfirmationModal = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  text-align: center;

  .modal-header {
    margin-bottom: 20px;
    font-weight: bold;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;

    button {
      padding: 10px 20px;
    }
  }
`;

const SuccessBanner = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const UpdateIdiom = ({ idiom, onDelete }) => {
  const { updateIdiom } = useContext(IdiomsContext);
  const [title, setTitle] = useState(idiom.title || '');
  const [titleGeneral, setTitleGeneral] = useState(idiom.title_general || '');
  const [definition, setDefinition] = useState(idiom.definition || '');
  const [contributor, setContributor] = useState(idiom.contributor || '');
  const [timestamp, setTimestamp] = useState(
    idiom.timestamps ? moment(idiom.timestamps) : null,
  );
  const [validated, setValidated] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const navigate = useNavigate();

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
      }
    } catch (err) {
      console.error('Error updating idiom:', err);
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
