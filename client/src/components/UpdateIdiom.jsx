import React, { useContext, useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';
import 'react-datetime/css/react-datetime.css'; // Import CSS for styling
import moment from 'moment';

const UpdateIdiom = ({ idiom, onDelete }) => {
  const { updateIdiom } = useContext(IdiomsContext);
  const [title, setTitle] = useState(idiom.title || '');
  const [titleGeneral, setTitleGeneral] = useState(idiom.title_general || '');
  const [definition, setDefinition] = useState(idiom.definition || '');
  const [contributor, setContributor] = useState(idiom.contributor || '');
  const [timestamp, setTimestamp] = useState(null);

  // useEffect(() => {
  //   if (idiom.timestamps) {
  //     const date = new Date(idiom.timestamps);
  //     const offset = date.getTimezoneOffset() * 60000;
  //     const localDate = new Date(date.getTime() - offset);
  //     const formattedTimestamp = localDate.toISOString().slice(0, 19);
  //     setTimestamp(formattedTimestamp);
  //   }
  // }, [idiom]);

  useEffect(() => {
    if (idiom.timestamps) {
      setTimestamp(moment(idiom.timestamps));
    }
  }, [idiom]);

  const emptyStringToNull = (value) => (value.trim() === '' ? null : value);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="mb-4 mx-4">
      <form onSubmit={handleSubmit} className="add-idiom-form p-4">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="titleGeneral">General title (optional)</label>
          <input
            id="titleGeneral"
            type="text"
            className="form-control"
            value={titleGeneral}
            onChange={(e) => setTitleGeneral(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="definition">Definition (optional)</label>
          <textarea
            id="definition"
            className="form-control"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="timestamp">Time (optional)</label>
          <Datetime
            id="timestamp"
            value={timestamp}
            onChange={handleDateChange}
            dateFormat="YYYY-MM-DD"
            timeFormat="HH:mm:ss"
            inputProps={{ className: 'form-control' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contributor">Contributor (optional)</label>
          <input
            id="contributor"
            type="text"
            className="form-control"
            value={contributor}
            onChange={(e) => setContributor(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <button type="button" className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default UpdateIdiom;
