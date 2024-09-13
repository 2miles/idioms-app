import React, { useContext, useEffect, useState } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { useParams } from 'react-router-dom';
import { IdiomsContext } from '../context/idiomsContext';
import UpdateIdiom from '../components/UpdateIdiom';
import styled from 'styled-components';

const Card = styled.div`
  &.card {
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.5),
      rgba(230, 230, 230, 0.7)
    );
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin: 20px auto;
    border: 1px solid #e0e0e0;
    font-family: 'Times New Roman', Times, serif;
    overflow: hidden;
  }
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2em;
    margin: 0;
    padding: 20px;
    font-style: italic;
    font-weight: normal;
  }

  h2 {
    font-size: 1.5em;
    margin: 0;
    font-style: italic;
    font-weight: normal;
    color: #555;
  }
`;
const CardBody = styled.div`
  font-size: 1.2em;
  line-height: 1.6;
  padding-left: 50px;
  padding-right: 50px;

  h3 {
    margin-top: 30px;
  }

  p {
    margin: 5px 0;
  }

  @media (max-width: 770px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

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
    <div className="page-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        selectedIdiom && (
          <Card className="card">
            <CardHeader className="card-header">
              <h1>
                &quot;
                {selectedIdiom.title_general &&
                selectedIdiom.title_general.trim() !== ''
                  ? selectedIdiom.title_general
                  : selectedIdiom.title}
                &quot;
              </h1>
            </CardHeader>
            <CardBody className="card-body">
              <p># {selectedIdiom.id}</p>
              <p>{selectedIdiom.contributor}</p> */}
              <h3>Meaning:</h3>
              <p>{selectedIdiom.definition}</p>
              <h3>Examples:</h3>
              <ul>
                {examples.map((example) => (
                  <li key={example.example_id}>{example.example}</li>
                ))}
              </ul>
            </CardBody>
          </Card>
        )
      )}
      <div>
        <button className="btn btn-secondary" onClick={handleToggleEdit}>
          {isEditing ? 'Cancel Edit' : 'Edit Idiom'}
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
    </div>
  );
};

export default DetailPage;
