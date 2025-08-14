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
import ThemeDropdown from '@/components/Dropdown/ThemeDropdown';

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: var(--margin-lg) 0;
  gap: var(--gap-sm);
`;

const LeftBox = styled.div`
  display: inline-flex;
  align-items: center;
`;

const RightBox = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 0;
`;

const StyledAddIcon = styled(AddIcon)`
  width: 28px;
  height: 28px;
`;

const CustomSuccessButton = styled(SuccessButton)`
  padding-left: 5px !important;
  margin-bottom: 13px !important;
`;

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const refreshIdiomList = () => {
    const url = new URLSearchParams(location.search);
    url.set('refresh', Date.now().toString());
    navigate(`${location.pathname}?${url.toString()}`);
  };

  return (
    <PageContainer>
      <TopRow>
        <LeftBox>
          {isAdmin && (
            <CustomSuccessButton onClick={openModal} className='btn btn-success'>
              <StyledAddIcon />
              Add Idiom
            </CustomSuccessButton>
          )}
        </LeftBox>

        <RightBox>
          <ThemeDropdown />
        </RightBox>
      </TopRow>

      <IdiomTableView />

      <Modal title='Add Idiom' isOpen={isModalOpen} onClose={closeModal}>
        <AddIdiomForm onClose={closeModal} onSucess={refreshIdiomList} />
      </Modal>
    </PageContainer>
  );
};

export default HomePage;
