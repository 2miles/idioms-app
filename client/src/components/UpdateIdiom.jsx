import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IdiomFinder from '../apis/idiomFinder';
import { useNavigate } from 'react-router-dom';

const UpdateIdiom = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [titleNew, setTitleNew] = useState('');
  const [definition, setDefinition] = useState('');
  const [day, setDay] = useState('');
  const [owner, setOwner] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await IdiomFinder.get(`/${id}`);
      setTitle(response.data.data.idiom.title_old);
      setTitleNew(response.data.data.idiom.title_new);
      setDefinition(response.data.data.idiom.definition);
      setDay(response.data.data.idiom.day);
      setOwner(response.data.data.idiom.owner);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateIdiom = await IdiomFinder.put(`/${id}`, {
      title_old: title,
      title_new: titleNew,
      definition,
      day,
      owner,
    });
    navigate(`/`);
  };

  const truncatedDay = day ? day.substring(0, 10) : ''; // Get the first 10 characters

  return (
    <div className="text-white">
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
          <textarea
            defaultValue={definition}
            onChange={(e) => setDefinition(e.target.value)}
            className="form-control"
            id="definition"
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="day">Day: YYYY-MM-DD</label>
          <input
            defaultValue={truncatedDay}
            onChange={(e) => setDefinition(e.target.value)}
            className="form-control"
            id="day"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="owner">Owner</label>
          <input
            defaultValue={owner}
            onChange={(e) => setDefinition(e.target.value)}
            className="form-control"
            id="owner"
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
