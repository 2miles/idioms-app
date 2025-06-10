import { useState } from 'react';
import { useUser } from '@/context/userContext';

import PageContainer from '@/components/PageContainer';
import IdiomTableView from '@/components/IdiomTableView/IdiomTableView';
import AddIdiomForm from '@/components/Forms/AddIdiomForm/AddIdiomForm';
import Modal from '@/components/Modal/Modal';

import styled from 'styled-components';

const AddIdiomContainer = styled.div`
  margin-top: var(--margin-lg);
  margin-bottom: var(--margin-lg);
`;

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { roles } = useUser();
  const isAdmin = roles?.includes('Admin');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <PageContainer>
      {isAdmin && (
        <AddIdiomContainer>
          <button onClick={openModal} className='btn btn-success'>
            Add Idiom
          </button>
        </AddIdiomContainer>
      )}
      <IdiomTableView />
      <Modal title='Add Idiom' isOpen={isModalOpen} onClose={closeModal}>
        <AddIdiomForm onClose={closeModal} />
      </Modal>
    </PageContainer>
  );
};

export default HomePage;
