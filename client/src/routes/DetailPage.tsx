import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { IdiomsContext } from 'context/idiomsContext';
import { Example, Idiom } from 'types';
import IdiomFinder from 'apis/idiomFinder';
import PageContainer from 'components/PageContainer';
import UpdateIdiom from 'components/UpdateIdiom';
import DetailCard from 'components/DetailCard';

const UpdateButtonWrapper = styled.div`
  margin-top: 20px !important;
`;

//
const DetailPage = () => {
  const { id } = useParams();
  const { idioms, setIdioms } = useContext(IdiomsContext);
  const [examples, setExamples] = useState<Example[]>([]);
  const [selectedIdiom, setSelectedIdiom] = useState<Idiom | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        setIdioms(idioms.filter((idiom: Idiom) => idiom.id !== Number(id)));

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch idiom examples when the page loads
  useEffect(() => {
    const fetchExamples = async () => {
      try {
        const response = await IdiomFinder.get(`/${id}`);
        setExamples(response.data.data.examples);
      } catch (err) {
        console.error('Error fetching examples:', err);
      } finally {
        setLoading(false);
      }
    };

    // Find idiom from context by ID, avoid re-fetching
    const idiomFromContext = idioms.find((idiom) => idiom.id === Number(id));
    if (idiomFromContext) {
      setSelectedIdiom(idiomFromContext);
      fetchExamples();
    } else {
      setLoading(false);
    }
  }, [id, idioms]);
  if (loading || !selectedIdiom) {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer>
      <DetailCard idiom={selectedIdiom} examples={examples} />
      <UpdateButtonWrapper>
        <button className='btn btn-secondary' onClick={handleToggleEdit}>
          {isEditing ? 'Cancel Edit' : 'Edit Idiom'}
        </button>
      </UpdateButtonWrapper>
      {isEditing && (
        <UpdateIdiom
          idiom={selectedIdiom}
          onDelete={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(e)}
          handleToggleEdit={handleToggleEdit}
        />
      )}
    </PageContainer>
  );
};

export default DetailPage;
