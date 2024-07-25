import React, { useContext, useEffect } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { useParams } from 'react-router-dom';
import { IdiomsContext } from '../context/idiomsContext';
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const { idioms, setIdioms } = useContext(IdiomsContext);
  const { selectedIdiom, setSelectedIdiom } = useContext(IdiomsContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IdiomFinder.get(`/${id}`);
        setSelectedIdiom(response.data.data.idiom);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setSelectedIdiom]);

  return (
    <div className="card-container">
      {selectedIdiom ? (
        <>
          <div className="card">
            <div className="card-header">
              <h1>&quot;{selectedIdiom.title}&quot;</h1>
              <h2>&quot;{selectedIdiom.title_general}&quot;</h2>
            </div>
            <div className="card-body">
              <p>{selectedIdiom.definition}</p>
              <p>{selectedIdiom.timestamps?.substring(0, 10)}</p>
              <p>{selectedIdiom.contributor}</p>
              <p>{selectedIdiom.id}</p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-secondary"
                onClick={(e) => handleUpdate(e, selectedIdiom.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={(e) => handleDelete(e, selectedIdiom.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailPage;
