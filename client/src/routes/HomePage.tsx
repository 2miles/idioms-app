import { useState } from 'react';

import PageContainer from '@/components/PageContainer';
import TableSection from '@/components/TableSection';
import AddIdiom from '@/components/AddIdiom';

import styled from 'styled-components';

const AddIdiomContainer = styled.div`
  margin-top: var(--margin-lg);
  margin-bottom: var(--margin-lg);
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

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <AddIdiomContainer>
        <button onClick={openModal} className='btn btn-success'>
          Add Idiom
        </button>
      </AddIdiomContainer>
      <TableSection />

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle> Add Idiom</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <AddIdiom collapseForm={closeModal} />
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default HomePage;
