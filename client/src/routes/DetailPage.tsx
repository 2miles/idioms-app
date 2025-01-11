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
import UpdateExamples from '@/components/UpdateExamples';
import DetailCard from '@/components/DetailCard';
import Modal from '@/components/Modal';
import AddExample from '@/components/AddExample';

const UpdateButtonWrapper = styled.div`
  margin-top: 20px !important;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DetailPage = () => {
  const { id } = useParams();
  const { idioms, setIdioms } = useContext(IdiomsContext);
  const [examples, setExamples] = useState<Example[]>([]);
  const [selectedIdiom, setSelectedIdiom] = useState<Idiom | undefined>();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false);
  const [isAddExampleModalOpen, setIsAddExampleModalOpen] = useState(false);
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

      <UpdateButtonWrapper>
        <button className='btn btn-secondary' onClick={openExampleModal}>
          Edit Examples
        </button>
      </UpdateButtonWrapper>

      <UpdateButtonWrapper>
        <button className='btn btn-secondary' onClick={openAddExampleModal}>
          Add Example
        </button>
      </UpdateButtonWrapper>

      <Modal title='Edit Idiom' isOpen={isModalOpen} onClose={closeModal}>
        <UpdateIdiom idiom={selectedIdiom} onDelete={handleDelete} onClose={closeModal} />
      </Modal>

      <Modal title='Edit Examples' isOpen={isExampleModalOpen} onClose={closeExampleModal}>
        {typeof id !== 'undefined' && (
          <UpdateExamples idiomId={Number(id)} examples={examples} onClose={closeExampleModal} />
        )}
      </Modal>
      <Modal title='Add Example' isOpen={isAddExampleModalOpen} onClose={closeAddExampleModal}>
        {typeof id !== 'undefined' && (
          <AddExample idiomId={Number(id)} onClose={closeAddExampleModal} />
        )}
      </Modal>
      <DetailCard idiom={selectedIdiom} examples={examples} />
    </PageContainer>
  );
};

export default DetailPage;
