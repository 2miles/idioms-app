import React, { useEffect, useContext } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';
import { useNavigate } from 'react-router-dom';

const IdiomList = (props) => {
  const { idioms, setIdioms } = useContext(IdiomsContext);

  const navigate = useNavigate();

  // Will execute this code block only once, right after the component is initially rendered.
  // If the dependency array is empty, it won't run again on subsequent renders.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IdiomFinder.get('/');
        setIdioms(response.data.data.idioms);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await IdiomFinder.delete(`/${id}`);
      setIdioms(
        idioms.filter((idiom) => {
          return idiom.id !== id;
        }),
      );
    } catch (err) {}
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/idioms/${id}/update`);
  };

  const handleIdiomSelect = (id) => {
    navigate(`/idioms/${id}`);
  };

  return (
    <div>
      <table className="table table-bordered table-hover table-dark">
        <thead>
          <tr key={idioms.id} className="big-primary">
            <th> </th>
            <th>Title</th>
            <th>Definition</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {idioms &&
            idioms.map((idiom) => {
              return (
                <tr onClick={() => handleIdiomSelect(idiom.id)} key={idiom.id}>
                  <td> {idiom.id}</td>
                  <td> {idiom.title_old}</td>
                  <td> {idiom.definition}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => handleUpdate(e, idiom.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, idiom.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default IdiomList;
