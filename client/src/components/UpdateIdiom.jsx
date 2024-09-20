import React, { useContext, useEffect, useState } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import TextAreaField from './formFields/TextAreaField';
import TextField from './formFields/TextField';
import TimestampField from './formFields/TimestampField';
import { IdiomsContext } from '../context/idiomsContext';
import moment from 'moment';

const UpdateIdiom = ({ idiom, onDelete }) => {
  const { updateIdiom } = useContext(IdiomsContext);
  const [title, setTitle] = useState(idiom.title || '');
  const [titleGeneral, setTitleGeneral] = useState(idiom.title_general || '');
  const [definition, setDefinition] = useState(idiom.definition || '');
  const [contributor, setContributor] = useState(idiom.contributor || '');
  const [timestamp, setTimestamp] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (idiom.timestamps) {
      setTimestamp(moment(idiom.timestamps));
    }
  }, [idiom]);

  const emptyStringToNull = (value) => (value.trim() === '' ? null : value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (title.trim() === '') {
      return; // Prevent form submission if title is empty
    }
    try {
      // Convert the timestamp back to an ISO string for submission
      const formattedTimestamp = timestamp ? timestamp.toISOString() : null;
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

  const handleDateChange = (date) => {
    setTimestamp(date);
  };

  return (
    <div className="form-container">
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
          onChange={handleDateChange}
          inputProps={{
            className: 'form-control',
          }}
        />
        <TextField
          label="Contributor"
          id="contributor"
          value={contributor}
          onChange={(e) => setContributor(e.target.value)}
        />
        <div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button type="button" className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateIdiom;
