import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuthorizedRequestFinder from '@/apis/useAuthorizedRequestFinder';
import { DangerButton, SuccessButton } from '@/components/ButtonStyles';
import CheckIcon from '@/images/check_2.svg?react';
import { ThreeDots } from 'react-loader-spinner';

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }

  th {
    font-weight: bold;
    color: var(--color-text-primary);
  }
`;

const StyledCheckIcon = styled(CheckIcon)`
  width: 1.2rem;
  height: 1.2rem;
  display: inline-block;
  vertical-align: middle;
  color: green;
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

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  float: right;
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
    try {
      const api = await getAuthorizedApi(); // ✅ Reuse the hook result
      await api.delete(`/${id}`);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to delete request:', err);
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
    <Container>
      <h1>Requested Idioms</h1>

      {requests.length === 0 ? (
        <p>No idioms have been requested yet.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Idiom</th>
              <th>Requested</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(({ id, title, contributor, submitted_at, added }) => (
              <tr key={id}>
                <td>
                  {added && <StyledCheckIcon />} {title}
                </td>
                <td>{contributor}</td>
                <td>{formatDateMinusHours(submitted_at)}</td>

                <td>
                  <ButtonsWrapper>
                    {!added && (
                      <SuccessButton
                        type='button'
                        className='btn btn-secondary'
                        onClick={() => handleMarkAsAdded(id)}
                      >
                        Add
                      </SuccessButton>
                    )}
                    <DangerButton
                      type='button'
                      className='btn btn-danger'
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </DangerButton>
                  </ButtonsWrapper>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default RequestsPage;
