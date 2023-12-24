import React, { useState, useContext } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';

const AddIdiom = () => {
  const { addIdioms } = useContext(IdiomsContext);
  const [title, setTitle] = useState('');
  const [titleNew, setTitleNew] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await IdiomFinder.post('/', {
        title_old: title,
        title_new: titleNew,
        definition: definition,
      });
      addIdioms(response.data.data.idioms);
    } catch (err) {}
  };

  return (
    <div className="mb-4 mx-4">
      <form action="">
        <div className="row">
          <div className="col-sm">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Title"
              type="text"
            />
          </div>
          <div className="col-sm">
            <input
              value={titleNew}
              onChange={(e) => setTitleNew(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Title General"
            />
          </div>
          <div className="col-sm-4">
            <input
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="form-control"
              placeholder="Definition"
              type="text"
            />
          </div>
          <div className="col-sm">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddIdiom;
