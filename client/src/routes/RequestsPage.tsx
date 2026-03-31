import { ReactNode, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Swal from 'sweetalert2';

import { publicIdiomFinder } from '@/apis/idiomFinder';
import useAuthorizedRequestFinder from '@/apis/useAuthorizedRequestFinder';
import { DangerButton, SuccessButton } from '@/components/ButtonStyles';
import AddIdiomForm from '@/components/Forms/AddIdiomForm/AddIdiomForm';
import Modal from '@/components/Modal/Modal';
import PageContainer from '@/components/PageContainer';
import { Request, TestResult } from '@/types';
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
  RequestMetaRow,
  SearchButton,
  SearchForm,
  SearchInputWrapper,
  SearchResultText,
  SearchSection,
  SpinnerWrapper,
  StyledCheckIcon,
  TestButton,
  TestResultDimText,
  TestResultRow,
  TestSection,
} from './RequestsPage.styles';

import { Input as SearchInput } from '@/components/SearchBar/SearchBar.styles';

function formatDateMinusHours(isoString: string, hoursToSubtract: number = 7): string {
  const date = new Date(isoString);
  date.setHours(date.getHours() - hoursToSubtract);
  return date.toISOString().split('T')[0];
}

function buildHeuristicSearchTerm(title: string): string {
  const stopWords = new Set([
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'of',
    'to',
    'in',
    'on',
    'at',
    'by',
    'for',
    'with',
    'from',
    'up',
    'down',
    'out',
    'off',
    'over',
    'under',
    'into',
    'through',
    'your',
    'my',
    'his',
    'her',
    'our',
    'their',
    'one',
    'ones',
    'oneself',
    'it',
    'is',
    'be',
    'as',
  ]);

  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean)
    .filter((word) => !stopWords.has(word));

  const strongestWords = words
    .map((word, index) => ({ word, index })) // keep position
    .sort((a, b) => b.word.length - a.word.length) // pick strongest
    .slice(0, 3)
    .sort((a, b) => a.index - b.index) // restore original order
    .map((item) => item.word);

  return strongestWords.join(' ');
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});

  const [manualSearch, setManualSearch] = useState('');
  const [manualSearchCount, setManualSearchCount] = useState<number | null>(null);
  const [manualSearchLoading, setManualSearchLoading] = useState(false);
  const [manualSearchError, setManualSearchError] = useState<string | null>(null);

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

  const handleManualSearch = async () => {
    const trimmedSearch = manualSearch.trim();

    if (!trimmedSearch) {
      setManualSearchCount(null);
      setManualSearchError(null);
      return;
    }

    setManualSearchLoading(true);
    setManualSearchError(null);

    try {
      const res = await publicIdiomFinder.get('/', {
        params: {
          page: 1,
          limit: 1,
          search: trimmedSearch,
          searchColumn: 'title',
        },
      });

      setManualSearchCount(res.data.data.totalCount);
    } catch (err) {
      console.error('Failed to search idioms:', err);
      setManualSearchError('Search failed.');
      setManualSearchCount(null);
    } finally {
      setManualSearchLoading(false);
    }
  };

  const handleTest = async (request: Request) => {
    // const searchTerm = request.title.trim();
    const searchTerm = buildHeuristicSearchTerm(request.title);

    setTestResults((prev) => ({
      ...prev,
      [request.id]: {
        loading: true,
        count: null,
        error: null,
        searchTerm,
      },
    }));

    try {
      const res = await publicIdiomFinder.get('/', {
        params: {
          page: 1,
          limit: 1,
          search: searchTerm,
          searchColumn: 'title',
        },
      });

      setTestResults((prev) => ({
        ...prev,
        [request.id]: {
          loading: false,
          count: res.data.data.totalCount,
          error: null,
          searchTerm,
        },
      }));
    } catch (err) {
      console.error('Failed to test request:', err);

      setTestResults((prev) => ({
        ...prev,
        [request.id]: {
          loading: false,
          count: null,
          error: 'Test failed.',
          searchTerm,
        },
      }));
    }
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

  let message = '';
  let status: 'good' | 'bad' | 'neutral' = 'neutral';

  if (manualSearchError) {
    status = 'bad';
    message = 'Something went wrong while checking';
  } else if (manualSearchCount === 0) {
    status = 'good';
    message = 'We don’t have that one!';
  } else if (manualSearchCount !== null) {
    status = 'bad';
    message = 'Looks like a duplicate';
  }

  return (
    <PageContainer>
      <PageTitle>Idiom Requests</PageTitle>

      <SearchSection>
        <SearchForm
          onSubmit={(e) => {
            e.preventDefault();
            handleManualSearch();
          }}
        >
          <SearchInputWrapper>
            <SearchInput
              type='text'
              className='form-control'
              placeholder='Search for duplicates'
              value={manualSearch}
              onChange={(e) => {
                const value = e.target.value;
                setManualSearch(value);

                if (!value.trim()) {
                  setManualSearchCount(null);
                  setManualSearchError(null);
                }
              }}
            />
          </SearchInputWrapper>

          <SearchButton type='submit' className='btn btn-success' disabled={manualSearchLoading}>
            {manualSearchLoading ? 'Searching...' : 'Search'}
          </SearchButton>
        </SearchForm>
        <TestResultRow>
          <SearchResultText $status={status}>{message}</SearchResultText>
        </TestResultRow>
      </SearchSection>

      {requests.length === 0 ? (
        <p>No idioms have been requested yet.</p>
      ) : (
        <CardsWrapper>
          {requests.map((request) => {
            const { id, title, contributor, submitted_at, added } = request;
            const testResult = testResults?.[id];

            let testMessage: ReactNode = '';
            let testStatus: 'good' | 'bad' | 'neutral' = 'neutral';

            if (testResult?.error) {
              testStatus = 'bad';
              testMessage = 'Something went wrong while checking';
            } else if (testResult?.count === 0) {
              testStatus = 'good';
              testMessage = (
                <>
                  <span>We don’t have it!</span>
                  <TestResultDimText>Search: "{testResult.searchTerm}"</TestResultDimText>
                </>
              );
            } else if (testResult && testResult.count !== null && testResult.count > 0) {
              testStatus = 'bad';
              testMessage = (
                <>
                  <span>It's a duplicate!</span>
                  <TestResultDimText>Search: "{testResult.searchTerm}"</TestResultDimText>
                </>
              );
            }

            return (
              <RequestCard className='card' key={id}>
                <RequestCardHeader>
                  <h1>
                    {added && <StyledCheckIcon />} {title}
                  </h1>
                </RequestCardHeader>

                <CardBody className='card-body'>
                  <RequestMetaRow>
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

                    <TestSection>
                      <TestButton
                        type='button'
                        className='btn btn-success'
                        onClick={() => handleTest(request)}
                        disabled={testResult?.loading}
                      >
                        {testResult?.loading ? 'Testing...' : 'Test'}
                      </TestButton>
                    </TestSection>
                  </RequestMetaRow>
                  <TestResultRow>
                    <SearchResultText $status={testStatus}>
                      {testResult && testMessage ? testMessage : ''}
                    </SearchResultText>
                  </TestResultRow>

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
