import React, { useState, useContext } from 'react';
import { IdiomsContext } from '../context/idiomsContext';
import IdiomFinder from '../apis/idiomFinder';
import TextAreaField from './formFields/TextAreaField';
import TextField from './formFields/TextField';
import TimestampField from './formFields/TimestampField';
import moment from 'moment';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #eee;
  border-radius: 5px;
  margin: 16px auto 40px;
  font-size: 16px;

  .form-group {
    padding: 10px;
  }

  button {
    margin: 10px;
  }
`;

const AddIdiom = () => {
  const { addIdioms } = useContext(IdiomsContext);
  const [title, setTitle] = useState('');
  const [titleGeneral, setTitleGeneral] = useState('');
  const [definition, setDefinition] = useState('');
  const [contributor, setContributor] = useState('');
  const [timestamp, setTimestamp] = useState(moment());
  const [validated, setValidated] = useState(false);

  // Helper function to convert empty strings to null
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
      const response = await IdiomFinder.post('/', {
        title: emptyStringToNull(title),
        title_general: emptyStringToNull(titleGeneral),
        definition: emptyStringToNull(definition),
        timestamps: emptyStringToNull(formattedTimestamp),
        contributor: emptyStringToNull(contributor),
      });
      if (response.data && response.data.data && response.data.data.idiom) {
        addIdioms(response.data.data.idiom);
        clearFormFields();
      }
    } catch (err) {
      console.Error('Error adding idiom.', err);
    }
  };

  const clearFormFields = () => {
    setTitle('');
    setTitleGeneral('');
    setDefinition('');
    setContributor('');
    setTimestamp(moment());
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
          label="Title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Pull yourself up by your bootstraps"
          required
        />
        <TextField
          label="Title General"
          id="titleGeneral"
          value={titleGeneral}
          onChange={(e) => setTitleGeneral(e.target.value)}
          placeholder="Pull (oneself) up by (one's) (own) bootstraps"
        />
        <TextAreaField
          label="Definition"
          id="definition"
          value={titleGeneral}
          onChange={(e) => setDefinition(e.target.value)}
          placeholder="To improve one's life or circumstances through one's own efforts, rather than relying on others."
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
          placeholder="Miles"
          value={contributor}
          onChange={(e) => setContributor(e.target.value)}
        />
        <div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default AddIdiom;
