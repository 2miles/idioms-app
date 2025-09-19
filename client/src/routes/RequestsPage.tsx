import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import useAuthorizedRequestFinder from '@/apis/useAuthorizedRequestFinder';
import { DangerButton, SuccessButton } from '@/components/ButtonStyles';
import {
  Card,
  CardBody,
  CardHeader,
  IdiomInfo,
  InfoElement,
  InfoElementKey,
} from '@/components/DetailPage/DetailCard/DetailCard.styles';
import PageContainer from '@/components/PageContainer';
import CheckIcon from '@/images/check_2.svg?react';

const StyledCheckIcon = styled(CheckIcon)`
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  vertical-align: middle;
  color: green;
  margin-bottom: var(--margin-xs);
`;

type Request = {
  id: string;
  title: string;
  contributor: string | null;
  submitted_at: string;
  added: boolean;
};

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;

const CardsWrapper = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  max-width: 800px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: var(--margin-md);

  button,
  div {
    flex: 1;
  }

  @media (max-width: 769px) {
    flex-direction: column;

    button,
    div {
      width: 100%;
    }
  }
`;

export const ButtonPlaceholder = styled.div`
  flex: 1;
  visibility: hidden;
`;

const RequestCard = styled(Card)`
  &.card {
    margin-bottom: var(--margin-sm);
    margin-top: var(--margin-sm);
  }
`;

const RequestCardHeader = styled(CardHeader)`
  h1 {
    text-align: left;
    padding-left: var(--padding-xxl);
    margin-bottom: 0px;
    font-size: 1.5rem;
  }
`;

const RequestIdiomInfo = styled(IdiomInfo)`
  padding-top: 0px;
  display: flex;
  flex-wrap: wrap;
`;

const RequestInfoElement = styled(InfoElement)`
  margin-right: var(--margin-xl);
  margin-right: 64px;
`;

const RequestInfoElementKey = styled(InfoElementKey)`
  font-weight: normal;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: var(--margin-xxl);
  margin-top: var(--margin-xxl);
  font-size: 2rem;
`;

function formatDateMinusHours(isoString: string, hoursToSubtract: number = 7): string {
  const date = new Date(isoString);
  date.setHours(date.getHours() - hoursToSubtract);
  return date.toISOString().split('T')[0];
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
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
          {requests.map(({ id, title, contributor, submitted_at, added }) => (
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
                  {!added ? (
                    <SuccessButton
                      type='button'
                      className='btn btn-success'
                      onClick={() => handleMarkAsAdded(id)}
                    >
                      Add
                    </SuccessButton>
                  ) : (
                    <ButtonPlaceholder />
                  )}

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
          ))}
        </CardsWrapper>
      )}
    </PageContainer>
  );
};

export default RequestsPage;
