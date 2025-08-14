import styled from 'styled-components';
import moment from 'moment';

import { Idiom } from '@/types';
import { PrimaryButton, SecondaryButton, SuccessButton } from '@/components/ButtonStyles';
import { useUser } from '@/context/userContext';

const Card = styled.div`
  font-size: var(--font-lg);
  &.card {
    background: var(--bg-dark);
    border: 1px solid var(--color-border);
    // font-family: 'Times New Roman', Times, serif;
    overflow: hidden;
    margin-top: var(--margin-xxl);
  }
`;

const CardHeader = styled.div`
  background-color: var(--bg-medium);

  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border);

  h1 {
    // font-size: var(--font-xxl);
    font-size: var(2.25rem);
    font-weight: 700;
    margin: 0;
    padding: var(--padding-md);
    font-weight: bold;
    text-align: center;
    color: var(--color-text-primary);
  }
`;

const CardBody = styled.div`
  color: var(--color-text-secondary);
  padding-left: var(--padding-xxl);
  padding-right: var(--padding-xxl);

  h3 {
    margin: 0 !important;
    padding: 0 !important;
    text-transform: uppercase;
  }

  p {
  }

  li {
    padding-bottom: var(--padding-md);
    line-height: 1.6;
    font-size: 1.1rem;
    font-style: italic;
  }

  li::marker {
    color: var(--color-text-secondary);
  }
  li {
    padding-left: var(--padding-lg) !important;
  }

  @media (max-width: 770px) {
    padding-left: var(--padding-lg);
    padding-right: var(--padding-lg);
  }
`;

const IdiomInfo = styled.div`
  padding-right: var(--padding-lg);
  padding-top: var(--padding-sm);
  padding-bottom: var(--padding-sm);
  background-color: var(--bg-dark);
  font-size: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

const InfoElement = styled.p`
  margin-bottom: var(--margin-sm);
`;
const InfoElementKey = styled.span`
  margin-right: var(--margin-sm);
  font-weight: bold;
  color: var(--color-text-primary);
`;

const ExampleItem = styled.li`
  padding-left: var(--padding-sm) !important;
`;

const ExampleList = styled.ul`
  padding-left: var(--padding-lg) !important;
`;

const UpdateExampleButtons = styled.div`
  display: flex;
  justify-content: right;
  margin-top: var(--margin-lg);
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
  button {
    background-color: var(--bg-medium);
    margin-left: var(--margin-lg);
    margin-bottom: 0 !important;

    &:hover {
      background-color: var(--bg-light) !important;
    }
  }
`;

const SectionHeader = styled.div`
  margin-bottom: var(--margin-md);
  margin-top: var(--margin-xl);
  h3 {
    color: var(--color-text-primary);
  }
`;

const SectionGroup = styled.div`
  p {
    margin-bottom: var(--margin-xxl);
  }
`;

type DetailCardProps = {
  idiom: Idiom;
  openModal: () => void;
  openExampleModal: () => void;
  openAddExampleModal: () => void;
};

const DetailCard = ({
  idiom,
  openModal,
  openExampleModal,
  openAddExampleModal,
}: DetailCardProps) => {
  const { isAdmin } = useUser();
  const examples = Array.isArray(idiom.examples) ? idiom.examples : [];
  return (
    <Card className='card'>
      <CardHeader className='card-header'>
        <h1 data-testid='displaytitle'>
          {idiom.title_general && idiom.title_general.trim() !== ''
            ? idiom.title_general
            : idiom.title}
        </h1>
      </CardHeader>

      <CardBody className='card-body'>
        <IdiomInfo>
          <InfoElement>
            <InfoElementKey>Idiom #:</InfoElementKey>
            {idiom.position}
          </InfoElement>
          <InfoElement data-testid='timestamp'>
            <InfoElementKey>Added on:</InfoElementKey>
            {moment(idiom.timestamps).format('MM-DD-YY')}
          </InfoElement>
          {idiom.contributor && (
            <InfoElement data-testid='contributor'>
              <InfoElementKey>Added by:</InfoElementKey>
              {idiom.contributor}
            </InfoElement>
          )}
        </IdiomInfo>

        {isAdmin && (
          <UpdateExampleButtons>
            <SecondaryButton className='btn btn-secondary' onClick={openModal}>
              Edit Idiom
            </SecondaryButton>
            {idiom.examples && idiom.examples.length > 0 && (
              <SecondaryButton className='btn btn-secondary' onClick={openExampleModal}>
                Edit Ex.
              </SecondaryButton>
            )}
            <SecondaryButton className='btn btn-secondary' onClick={openAddExampleModal}>
              Add Ex.
            </SecondaryButton>
          </UpdateExampleButtons>
        )}

        <SectionGroup>
          {idiom.definition && (
            <SectionHeader>
              <h3>Meaning:</h3>
            </SectionHeader>
          )}
          <p data-testid='definition'>{idiom.definition}</p>

          {idiom.examples && idiom.examples.length > 0 && (
            <SectionHeader>
              <h3>Examples:</h3>
            </SectionHeader>
          )}
          <ExampleList data-testid='examples'>
            {examples.map((example) => (
              <ExampleItem key={example.example_id}>{example.example}</ExampleItem>
            ))}
          </ExampleList>
        </SectionGroup>
      </CardBody>
    </Card>
  );
};

export default DetailCard;
