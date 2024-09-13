import React, { useState, useContext } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';

const AddIdiom = () => {
  const generateInitialTimestamp = () => {
    const ts = new Date();
    ts.setHours(ts.getHours() - 7); // Adjusting to UTC-7
    if (ts.getHours() < 0) {
      ts.setDate(ts.getDate() - 1);
      ts.setHours(ts.getHours() + 24);
      if (ts.getUTCMonth() === 11 && ts.getUTCDate() === 31) {
        ts.setUTCFullYear(ts.getUTCFullYear() - 1);
      }
    }
    // Format the timestamp
    // 24-5-15 20:33:00
    return ts.toISOString().slice(0, 19).replace('T', ' ');
  };

  const { addIdioms } = useContext(IdiomsContext);
  const [title, setTitle] = useState('');
  const [titleGeneral, setTitleGeneral] = useState('');
  const [definition, setDefinition] = useState('');
  const [contributor, setContributor] = useState('');
  const [timestamp, setTimestamp] = useState(generateInitialTimestamp());
  const [manuallyChanged, setManuallyChanged] = useState(false); // Track manual timestamp changes
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
      const response = await IdiomFinder.post('/', {
        title: emptyStringToNull(title),
        title_general: emptyStringToNull(titleGeneral),
        definition: emptyStringToNull(definition),
        timestamps: emptyStringToNull(timestampValue), // Use the new timestamp
        contributor: emptyStringToNull(contributor),
      });
      if (response.data && response.data.data && response.data.data.idiom) {
        addIdioms(response.data.data.idiom);
        // Clear form fields after successful submission
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

  const handleTimestampChange = (event) => {
    const input = event.target.value;
    setTimestamp(input);
    setManuallyChanged(true);
  };

  // If the timestamp is manually changed, use the manually entered timestamp
  // Otherwise, use the generated timestamp
  const timestampValue = manuallyChanged
    ? timestamp
    : generateInitialTimestamp();

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
          <input
            id="timestamp"
            type="datetime-local"
            className="form-control"
            value={timestampValue} //use timestamp value instead of timestamp
            onChange={handleTimestampChange}
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
