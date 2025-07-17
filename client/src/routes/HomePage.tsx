import { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import AddIcon from '@/images/add.svg?react';
import AddIdiomForm from '@/components/Forms/AddIdiomForm/AddIdiomForm';
import IdiomTableView from '@/components/IdiomTableView/IdiomTableView';
import Modal from '@/components/Modal/Modal';
import PageContainer from '@/components/PageContainer';
import { SuccessButton } from '@/components/ButtonStyles';
import { useUser } from '@/context/userContext';

const AddIdiomContainer = styled.div`
  margin-top: var(--margin-lg);
  margin-bottom: var(--margin-lg);
`;

const StyledAddIcon = styled(AddIcon)`
  width: 28px;
  height: 28px;
`;
const CustomSuccessButton = styled(SuccessButton)`
  padding-left: 5px !important;
`;

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Triggers IdiomTableView to rerun useEffect by changing search param
  const refreshIdiomList = () => {
    const url = new URLSearchParams(location.search);
    url.set('refresh', Date.now().toString()); // triggers useEffect with a new value
    navigate(`${location.pathname}?${url.toString()}`);
  };

  return (
    <PageContainer>
      {isAdmin && (
        <AddIdiomContainer>
          <CustomSuccessButton onClick={openModal} className='btn btn-success'>
            <StyledAddIcon />
            Add Idiom
          </CustomSuccessButton>
        </AddIdiomContainer>
      )}
      <IdiomTableView />
      <Modal title='Add Idiom' isOpen={isModalOpen} onClose={closeModal}>
        <AddIdiomForm onClose={closeModal} onSucess={refreshIdiomList} />
      </Modal>
    </PageContainer>
  );
};

export default HomePage;
