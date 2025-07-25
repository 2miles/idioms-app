import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner';

import { IdiomsContext } from '@/context/idiomsContext';
import { Idiom } from '@/types';
import PageContainer from '@/components/PageContainer';
import UpdateIdiomForm from '@/components/Forms/UpdateIdiomForm/UpdateIdiomForm';
import UpdateExamplesForm from '@/components/Forms/UpdateExamplesForm/UpdateExamplesForm';
import DetailCard from '@/components/DetailCard/DetailCard';
import Modal from '@/components/Modal/Modal';
import AddExampleForm from '@/components/Forms/AddExampleForm/AddExampleForm';
import { publicIdiomFinder } from '@/apis/idiomFinder';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DetailPage = () => {
  const { id } = useParams();
  const { deleteIdiom } = useContext(IdiomsContext);
  const [selectedIdiom, setSelectedIdiom] = useState<Idiom | undefined>();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false);
  const [isAddExampleModalOpen, setIsAddExampleModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchIdiom = async () => {
    try {
      const res = await publicIdiomFinder.get(`/${id}`);
      const { idiom, examples } = res.data.data;
      setSelectedIdiom({ ...idiom, examples: examples ?? [] });
    } catch (err) {
      console.error('Failed to fetch idiom detail:', err);
    } finally {
      setLoading(false);
    }
  };

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

    if (!confirmResult.isConfirmed) return;

    try {
      await deleteIdiom(Number(id));

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
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openExampleModal = () => setIsExampleModalOpen(true);
  const closeExampleModal = () => setIsExampleModalOpen(false);
  const openAddExampleModal = () => setIsAddExampleModalOpen(true);
  const closeAddExampleModal = () => setIsAddExampleModalOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchIdiom();
  }, [id]);

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
      <Modal title='Edit Idiom' isOpen={isModalOpen} onClose={closeModal}>
        <UpdateIdiomForm
          idiom={selectedIdiom}
          onDelete={handleDelete}
          onClose={closeModal}
          onUpdateSuccess={fetchIdiom}
        />
      </Modal>

      <Modal title='Edit Examples' isOpen={isExampleModalOpen} onClose={closeExampleModal}>
        {typeof id !== 'undefined' && (
          <UpdateExamplesForm
            idiomId={Number(id)}
            examples={selectedIdiom.examples || []}
            idiomTitle={selectedIdiom.title}
            onClose={closeExampleModal}
            onUpdateSuccess={fetchIdiom}
          />
        )}
      </Modal>
      <Modal title='Add Example' isOpen={isAddExampleModalOpen} onClose={closeAddExampleModal}>
        {typeof id !== 'undefined' && (
          <AddExampleForm
            idiomId={Number(id)}
            idiomTitle={selectedIdiom.title}
            onClose={closeAddExampleModal}
            onAddSuccess={fetchIdiom}
          />
        )}
      </Modal>
      <DetailCard
        idiom={selectedIdiom}
        openAddExampleModal={openAddExampleModal}
        openExampleModal={openExampleModal}
        openModal={openModal}
      />
    </PageContainer>
  );
};

export default DetailPage;
