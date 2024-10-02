import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

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
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this idiom!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (confirmResult.isConfirmed) {
      try {
        await IdiomFinder.delete(`/${id}`);
        setIdioms(idioms.filter((idiom) => idiom.id !== id));

        Swal.fire({
          title: 'Deleted!',
          text: 'The idiom has been successfully deleted.',
          icon: 'success',
          timer: 1800,
          showConfirmButton: false,
        });

        navigate('/');
      } catch (err) {
        console.error('Error deleting idiom:', err);
        Swal.fire({
          title: 'Error',
          text: 'There was a problem deleting the idiom.',
          icon: 'error',
        });
      }
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          onDelete={(e) => handleDelete(e, selectedIdiom.id)}
        />
      )}
    </PageContainer>
  );
};

export default DetailPage;
