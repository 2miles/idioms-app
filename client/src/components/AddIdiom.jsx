import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Swal from 'sweetalert2';

import { IdiomsContext } from '../context/idiomsContext';
import IdiomFinder from '../apis/idiomFinder';
import TextAreaField from './formFields/TextAreaField';
import TextField from './formFields/TextField';
import TimestampField from './formFields/TimestampField';

const FormContainer = styled.div`
  background-color: var(--color-ui-primary);
  border: 1px solid var(--color-ui-border);
  border-radius: 5px;
  margin: 16px auto 40px;
  font-size: 16px;

  .form-group {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  padding-left: 20px;
  padding-right: 20px;
`;

const FormControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  .form-check {
    margin: 20px;
  }
  .button {
    margin: 20px;
  }
`;

const AddIdiom = ({ collapseForm }) => {
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

  const emptyStringToNull = (value) => (value.trim() === '' ? null : value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (formData.title.trim() === '') {
      return; // Prevent form submission if title is empty
    }
    try {
      // Format for the backend and remove milliseconds
      const formattedTimestamp = formData.timestamp
        ? formData.timestamp.toISOString().split('.')[0] + 'Z'
        : null;
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
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
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Pull yourself up by your bootstraps"
          required
        />
        <TextField
          label="Title General"
          id="titleGeneral"
          value={formData.titleGeneral}
          onChange={handleInputChange}
          placeholder="Pull (oneself) up by (one's) (own) bootstraps"
        />
        <TextAreaField
          label="Definition"
          id="definition"
          value={formData.definition}
          onChange={handleInputChange}
          placeholder="To improve one's life or circumstances through one's own efforts, rather than relying on others."
          rows={3}
        />
        <TimestampField
          label="Timestamp"
          id="timestamp"
          value={formData.timestamp}
          onChange={handleInputChange}
        />
        <TextField
          label="Contributor"
          id="contributor"
          placeholder="Miles"
          value={formData.contributor}
          onChange={handleInputChange}
        />
        <FormControlsWrapper>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
          <div className="form-check">
            <input
              id="flexCheckDefault"
              type="checkbox"
              value=""
              className="form-check-input"
              checked={keepOpen}
              onChange={(e) => setKeepOpen(e.target.checked)}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Keep Open
            </label>
          </div>
        </FormControlsWrapper>
      </form>
    </FormContainer>
  );
};

export default AddIdiom;
