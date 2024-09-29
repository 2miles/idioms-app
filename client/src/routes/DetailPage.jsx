import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { IdiomsContext } from '../context/idiomsContext';
import IdiomFinder from '../apis/idiomFinder';
import PageContainer from '../components/PageContainer';
import UpdateIdiom from '../components/UpdateIdiom';
import DetailCard from '../components/DetailCard';

const UpdateButtonWrapper = styled.div`
  margin-top: 20px !important;
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
    <PageContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        selectedIdiom && (
          <DetailCard selectedIdiom={selectedIdiom} examples={examples} />
        )
      )}
      <UpdateButtonWrapper>
        <button className="btn btn-secondary" onClick={handleToggleEdit}>
          {isEditing ? 'Cancel Edit' : 'Edit Idiom'}
        </button>
      </UpdateButtonWrapper>
      {isEditing && (
        <UpdateIdiom
          idiom={selectedIdiom}
          onDelete={() => handleDelete(null, selectedIdiom.id)}
        />
      )}
    </PageContainer>
  );
};

export default DetailPage;
