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
  margin-bottom: var(--margin-sm);
  position: relative; /* Enable absolute positioning for the close button */
`;

const ModalTitle = styled.div`
  padding: 0px var(--padding-sm);
  color: var(--color-text-primary) !important;
  font-weight: 600;
  font-size: 1.2rem;
`;

const ModalContent = styled.div`
  background: white;
  background: var(--color-canvas);

  padding: var(--padding-md);
  padding-top: var(--padding-sm);
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute; /* Position it within the ModalHeader */
  right: 0; /* Align to the right */
  top: 50%; /* Vertically center */
  transform: translateY(-50%); /* Adjust for centering alignment */
  padding: 0px var(--padding-sm);
  background: var(--hilite-ui-primary);
  border: 1px solid var(--color-ui-border);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  cursor: pointer;
`;

const HomePage = () => {
  // const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const collapseForm = () => {
  //   setIsCollapsed(true);
  // };

  // const handleToggleCollapse = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <AddIdiomContainer>
        <button
          // onClick={handleToggleCollapse}
          onClick={openModal}
          // className={isCollapsed ? 'btn btn-success' : 'btn btn-secondary'}
          className='btn btn-success'
        >
          Add Idiom
        </button>
        {/* {!isCollapsed && <AddIdiom collapseForm={collapseForm} />} */}
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
