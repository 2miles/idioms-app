import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner';

import { IdiomsContext } from '@/context/idiomsContext';
import { Example, Idiom } from '@/types';
import IdiomFinder from '@/apis/idiomFinder';
import PageContainer from '@/components/PageContainer';
import UpdateIdiom from '@/components/UpdateIdiom';
import DetailCard from '@/components/DetailCard';

const UpdateButtonWrapper = styled.div`
  margin-top: 20px !important;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const ModalTitle = styled.div`
  color: var(--color-text-primary) !important;
  padding-top: var(--padding-sm);
  padding-left: var(--padding-sm);
  font-weight: 600;
  font-size: var(--font-xl);
`;

const ModalContent = styled.div`
  background: white;
  background: var(--color-canvas);

  padding: var(--padding-sm);
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  padding: 0px 11px;
  margin-left: auto;
  margin-bottom: var(--margin-sm);
  background: var(--color-ui-primary);
  border: 1px solid var(--color-ui-border);
  color: var(--color-ui-border);
  border-radius: var(--radius-sm);
  font-size: 24px;
  cursor: pointer;
  &:hover {
    background: var(--hilite-ui-primary);
  }
`;

//
const DetailPage = () => {
  const { id } = useParams();
  const { idioms, setIdioms } = useContext(IdiomsContext);
  const [examples, setExamples] = useState<Example[]>([]);
  const [selectedIdiom, setSelectedIdiom] = useState<Idiom | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    return (
      <SpinnerWrapper>
        <ThreeDots
          visible={true}
          height='80'
          width='80'
          color='var(--color-brand-primary)'
          ariaLabel='three-dots-loading'
        />
      </SpinnerWrapper>
    );
  }

  return (
    <PageContainer>
      <UpdateButtonWrapper>
        <button className='btn btn-secondary' onClick={openModal}>
          Edit
        </button>
      </UpdateButtonWrapper>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle> Edit Idiom</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <UpdateIdiom
              idiom={selectedIdiom}
              onDelete={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(e)}
              onClose={closeModal}
            />
          </ModalContent>
        </ModalOverlay>
      )}
      <DetailCard idiom={selectedIdiom} examples={examples} />
    </PageContainer>
  );
};

export default DetailPage;
