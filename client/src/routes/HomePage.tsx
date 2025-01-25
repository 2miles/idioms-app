import { useState } from 'react';
import { useUser } from '@/context/userContext';

import PageContainer from '@/components/PageContainer';
import TableSection from '@/components/TableSection';
import AddIdiom from '@/components/AddIdiom';
import Modal from '@/components/Modal';

import styled from 'styled-components';

const AddIdiomContainer = styled.div`
  margin-top: var(--margin-lg);
  margin-bottom: var(--margin-lg);
`;

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { roles } = useUser(); // Access the roles from the hook

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Check if user has the 'Admin' role
  const isAdmin = roles?.includes('Admin');

  return (
    <PageContainer>
      {isAdmin && ( // Only render the button if the user is an Admin
        <AddIdiomContainer>
          <button onClick={openModal} className='btn btn-success'>
            Add Idiom
          </button>
        </AddIdiomContainer>
      )}
      <TableSection />
      <Modal title='Add Idiom' isOpen={isModalOpen} onClose={closeModal}>
        <AddIdiom onClose={closeModal} />
      </Modal>
    </PageContainer>
  );
};

export default HomePage;
