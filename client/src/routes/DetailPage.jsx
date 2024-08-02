import React, { useContext, useEffect, useState } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { useParams } from 'react-router-dom';
import { IdiomsContext } from '../context/idiomsContext';
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const { idioms, setIdioms } = useContext(IdiomsContext);
  const { selectedIdiom, setSelectedIdiom } = useContext(IdiomsContext);
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setExamples(response.data.data.examples);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setSelectedIdiom]);

  return (
    <div className="card-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        selectedIdiom && (
          <div className="card">
            <div className="card-header">
              <h1>
                &quot;
                {selectedIdiom.title_general &&
                selectedIdiom.title_general.trim() !== ''
                  ? selectedIdiom.title_general
                  : selectedIdiom.title}
                &quot;
              </h1>
            </div>
            <div className="card-body">
              <p># {selectedIdiom.id}</p>
              {/* <p>Added on {selectedIdiom.timestamps?.substring(0, 10)}</p>
              <p>{selectedIdiom.contributor}</p> */}
              <h3>Meaning:</h3>
              <p className="definition">{selectedIdiom.definition}</p>
              <h3>Examples:</h3>
              <ul>
                {examples.map((example) => (
                  <li key={example.example_id}>{example.example}</li>
                ))}
              </ul>
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
        )
      )}
    </div>
  );
};

export default DetailPage;
