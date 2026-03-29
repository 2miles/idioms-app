import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Swal from 'sweetalert2';

import useAuthorizedRequestFinder from '@/apis/useAuthorizedRequestFinder';
import { DangerButton, SuccessButton } from '@/components/ButtonStyles';
import AddIdiomForm from '@/components/Forms/AddIdiomForm/AddIdiomForm';
import Modal from '@/components/Modal/Modal';
import PageContainer from '@/components/PageContainer';
import { Request } from '@/types';
import {
  ButtonsWrapper,
  CardBody,
  CardsWrapper,
  PageTitle,
  RequestCard,
  RequestCardHeader,
  RequestIdiomInfo,
  RequestInfoElement,
  RequestInfoElementKey,
  SpinnerWrapper,
  StyledCheckIcon,
} from './RequestsPage.styles';

function formatDateMinusHours(isoString: string, hoursToSubtract: number = 7): string {
  const date = new Date(isoString);
  date.setHours(date.getHours() - hoursToSubtract);
  return date.toISOString().split('T')[0];
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const getAuthorizedApi = useAuthorizedRequestFinder();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const api = await getAuthorizedApi();
        const res = await api.get('/');
        setRequests(res.data.data.requests);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleOpenAddModal = (request: Request) => {
    setSelectedRequest(request);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setSelectedRequest(null);
  };

  const handleDelete = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this request!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const api = await getAuthorizedApi();
      await api.delete(`/${id}`);
      Swal.fire({
        title: 'Deleted!',
        text: 'The request has been successfully deleted.',
        icon: 'success',
        timer: 1800,
        showConfirmButton: false,
      });
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to delete request:', err);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem deleting the request.',
        icon: 'error',
      });
    }
  };

  const handleMarkAsAdded = async (id: string) => {
    try {
      const api = await getAuthorizedApi();
      await api.patch(`/${id}/mark-added`);
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, added: true } : r)));
    } catch (err) {
      console.error('Failed to mark request as added:', err);
    }
  };

  if (loading) {
    return (
      <SpinnerWrapper>
        <ThreeDots
          visible
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
      <PageTitle>Idiom Requests</PageTitle>

      {requests.length === 0 ? (
        <p>No idioms have been requested yet.</p>
      ) : (
        <CardsWrapper>
          {requests.map((request) => {
            const { id, title, contributor, submitted_at, added } = request;

            return (
              <RequestCard className='card' key={id}>
                <RequestCardHeader>
                  <h1>
                    {added && <StyledCheckIcon />} {title}
                  </h1>
                </RequestCardHeader>
                <CardBody className='card-body'>
                  <RequestIdiomInfo>
                    <RequestInfoElement>
                      <RequestInfoElementKey>Requested On:</RequestInfoElementKey>{' '}
                      {formatDateMinusHours(submitted_at)}
                    </RequestInfoElement>
                    <RequestInfoElement>
                      <RequestInfoElementKey>Requested By:</RequestInfoElementKey>{' '}
                      {contributor || 'Anonymous'}
                    </RequestInfoElement>
                  </RequestIdiomInfo>
                  <ButtonsWrapper>
                    <SuccessButton
                      type='button'
                      className='btn btn-success'
                      disabled={added}
                      onClick={() => handleOpenAddModal(request)}
                    >
                      {added ? 'Added' : 'Add'}
                    </SuccessButton>
                    <DangerButton
                      type='button'
                      className='btn btn-danger'
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </DangerButton>
                  </ButtonsWrapper>
                </CardBody>
              </RequestCard>
            );
          })}
        </CardsWrapper>
      )}

      <Modal title='Add Idiom' isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
        {selectedRequest && (
          <AddIdiomForm
            onClose={handleCloseAddModal}
            hideKeepOpen
            initialValues={{
              title: selectedRequest.title,
              contributor: selectedRequest.contributor || null,
              timestamp: new Date(selectedRequest.submitted_at),
            }}
            onSuccess={async () => {
              await handleMarkAsAdded(selectedRequest.id);
            }}
          />
        )}
      </Modal>
    </PageContainer>
  );
};

export default RequestsPage;
