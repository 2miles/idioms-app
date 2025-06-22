import { useState } from 'react';
import styled from 'styled-components';

import { SuccessButton } from '@/components/ButtonStyles';
import AddIdiomForm from '@/components/Forms/AddIdiomForm/AddIdiomForm';
import IdiomTableView from '@/components/IdiomTableView/IdiomTableView';
import Modal from '@/components/Modal/Modal';
import PageContainer from '@/components/PageContainer';
import { useUser } from '@/context/userContext';

const AddIdiomContainer = styled.div`
  margin-top: var(--margin-lg);
  margin-bottom: var(--margin-lg);
`;

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useUser();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <PageContainer>
      {isAdmin && (
        <AddIdiomContainer>
          <SuccessButton onClick={openModal} className='btn btn-success'>
            + Add Idiom
          </SuccessButton>
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
