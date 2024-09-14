import React, { useState, useContext } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import Datetime from 'react-datetime';
import { IdiomsContext } from '../context/idiomsContext';
import 'react-datetime/css/react-datetime.css'; // Import CSS for styling
import moment from 'moment';

const AddIdiom = () => {
  const generateInitialTimestamp = () => {
    const now = moment();
    const offset = -7; // UTC-7
    const adjustedTime = now.utcOffset(offset * 60); // Convert offset to minutes
    return adjustedTime; // Format for Datetime input
  };

  const { addIdioms } = useContext(IdiomsContext);
  const [title, setTitle] = useState('');
  const [titleGeneral, setTitleGeneral] = useState('');
  const [definition, setDefinition] = useState('');
  const [contributor, setContributor] = useState('');
  const [timestamp, setTimestamp] = useState(generateInitialTimestamp());
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
      // Format for the backend to be able to parse properly
      const formattedTimestamp = timestamp ? timestamp.toISOString() : null;
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
      throw new Error('Oops, something went wrong.');
    }
  };

  const clearFormFields = () => {
    setTitle('');
    setTitleGeneral('');
    setDefinition('');
    setContributor('');
    setTimestamp(generateInitialTimestamp());
    setValidated(false);
  };

  const handleDateChange = (date) => {
    setTimestamp(date); // Update the timestamp with the selected date
  };

  return (
    <div className="form-container">
      <form
        className={`needs-validation ${validated ? 'was-validated' : ''}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Pull yourself up by your bootstraps"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="invalid-feedback">Please enter a title.</div>
        </div>
        <div className="form-group">
          <label htmlFor="titleGeneral">General title (optional)</label>
          <input
            id="titleGeneral"
            type="text"
            className="form-control"
            placeholder="Pull (oneself) up by (one's) (own) bootstraps"
            value={titleGeneral}
            onChange={(e) => setTitleGeneral(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="definition">Definition (optional)</label>
          <textarea
            id="definition"
            className="form-control"
            placeholder="To improve one's life or circumstances through one's own efforts, rather than relying on others."
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            rows={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timestamp">Timestamp (optional) :</label>
          <Datetime
            id="timestamp"
            value={timestamp} // Convert ISO to Date object
            onChange={handleDateChange}
            dateFormat="YYYY-MM-DD"
            timeFormat="HH:mm:ss"
            inputProps={{
              className: 'form-control',
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contributor">Contributor (optional):</label>
          <input
            id="contributor"
            type="text"
            className="form-control"
            placeholder="Miles"
            value={contributor}
            onChange={(e) => setContributor(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIdiom;
