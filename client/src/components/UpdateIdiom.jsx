import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IdiomsContext } from '../context/idiomsContext';
import IdiomFinder from '../apis/idiomFinder';
import { useNavigate } from 'react-router-dom';

const UpdateIdiom = () => {
  const { id } = useParams();
  const { idioms } = useContext(IdiomsContext);
  const [title, setTitle] = useState('');
  const [titleNew, setTitleNew] = useState('');
  const [definition, setDefinition] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await IdiomFinder.get(`/${id}`);
      setTitle(response.data.data.idiom.title_old);
      setTitleNew(response.data.data.idiom.title_new);
      setDefinition(response.data.data.idiom.definition);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Executed every time 'title', 'titleNew', or 'definition' changes
    console.log('After setting state:', title, titleNew, definition);
  }, [title, titleNew, definition]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateIdiom = await IdiomFinder.put(`/${id}`, {
      title_old: title,
      title_new: titleNew,
      definition,
    });
    navigate(`/`);
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="title_new">Title Alternate</label>
          <input
            defaultValue={titleNew}
            onChange={(e) => setTitleNew(e.target.value)}
            id="title_new"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="definition">Definition</label>
          <input
            defaultValue={definition}
            onChange={(e) => setDefinition(e.target.value)}
            className="form-control"
            id="definition"
            type="text"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateIdiom;
