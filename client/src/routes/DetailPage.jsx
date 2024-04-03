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
        //console.log(response.data.data.idiom);
        setSelectedIdiom(response.data.data.idiom);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {selectedIdiom ? (
        <>
          <h1>{selectedIdiom.title_old}</h1>
          <h2>{selectedIdiom.title_new}</h2>
          <p>{selectedIdiom.definition}</p>
          <p>{selectedIdiom.day?.substring(0, 10)}</p>
          <p>{selectedIdiom.owner}</p>
          <p>{selectedIdiom.id}</p>
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
        </>
      ) : (
        // or handle the case when selectedIdiom is not available
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailPage;
