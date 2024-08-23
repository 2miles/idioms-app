import React, { useContext, useEffect, useState } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { useParams } from 'react-router-dom';
import { IdiomsContext } from '../context/idiomsContext';
import UpdateIdiom from '../components/UpdateIdiom';

const DetailPage = () => {
  const { id } = useParams();
  const { idioms, setIdioms } = useContext(IdiomsContext);
  const { selectedIdiom, setSelectedIdiom } = useContext(IdiomsContext);
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await IdiomFinder.delete(`/${id}`);
      setIdioms(
        idioms.filter((idiom) => {
          return idiom.id !== id;
        }),
      );
    } catch (err) {
      console.log('Error deleting idiom: ', err);
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
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
    <>
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
            </div>
          )
        )}
      </div>
      <div className="add-idiom-container px-4 pt-4">
        <button className="btn btn-secondary" onClick={handleToggleEdit}>
          {isEditing ? 'Cancel' : 'Edit Idiom'}
        </button>
      </div>
      {isEditing && (
        <div className="add-idiom-container">
          <UpdateIdiom
            idiom={selectedIdiom}
            onDelete={() => handleDelete(null, selectedIdiom.id)}
          />
        </div>
      )}
    </>
  );
};

export default DetailPage;
