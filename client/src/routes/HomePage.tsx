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
import RequestIdiomForm from '@/components/Forms/RequestIdiomForm';

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
  margin-bottom: 13px !important;
  margin-right: var(--margin-md);
  height: 42px;
`;

const HomePage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const { isAdmin, isRegularUser } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openRequestModal = () => setIsRequestModalOpen(true);
  const closeRequestModal = () => setIsRequestModalOpen(false);

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
            <CustomSuccessButton onClick={openAddModal} className='btn btn-success'>
              <StyledAddIcon />
              Add
            </CustomSuccessButton>
          )}
          {(isRegularUser || isAdmin) && (
            <CustomSuccessButton onClick={openRequestModal} className='btn btn-success'>
              Request
            </CustomSuccessButton>
          )}
        </LeftBox>

        <RightBox>
          <ThemeDropdown />
        </RightBox>
      </TopRow>

      <IdiomTableView />

      <Modal title='Add Idiom' isOpen={isAddModalOpen} onClose={closeAddModal}>
        <AddIdiomForm onClose={closeAddModal} onSucess={refreshIdiomList} />
      </Modal>
      <Modal title='Request an Idiom' isOpen={isRequestModalOpen} onClose={closeRequestModal}>
        <RequestIdiomForm onClose={closeRequestModal} />
      </Modal>
    </PageContainer>
  );
};

export default HomePage;
