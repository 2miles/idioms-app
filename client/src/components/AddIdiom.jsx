import React, { useState, useContext } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';

const AddIdiom = () => {
  const generateInitialTimestamp = () => {
    const timestamp = new Date();
    const formattedTimestamp = timestamp
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    return formattedTimestamp;
  };

  const { addIdioms } = useContext(IdiomsContext);
  const [title, setTitle] = useState('');
  const [titleGeneral, setTitleGeneral] = useState('');
  const [definition, setDefinition] = useState('');
  const [contributor, setContributor] = useState('');
  const [timestamp, setTimestamp] = useState(generateInitialTimestamp());

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newTimestamp = generateInitialTimestamp();
      const response = await IdiomFinder.post('/', {
        title: title,
        title_general: titleGeneral,
        definition: definition,
        timestamps: newTimestamp, // Use the new timestamp
        contributor: contributor,
      });
      addIdioms(response.data.data.idioms);
    } catch (err) {}
  };

  const handleTimestampChange = (event) => {
    const input = event.target.value;
    setTimestamp(input);
  };
  return (
    <div className="mb-4 mx-4">
      <form action="">
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Pull yourself up by your bootstraps"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
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
        <div>
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
        <div>
          <label htmlFor="timestamp">Timestamp (optional) :</label>
          <input
            id="timestamp"
            type="datetime-local"
            className="form-control"
            value={timestamp}
            onChange={handleTimestampChange}
          />
        </div>
        <div>
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
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIdiom;
