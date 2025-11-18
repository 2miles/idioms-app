import moment from 'moment';

import { SecondaryButton } from '@/components/ButtonStyles';
import { useUser } from '@/context/userContext';
import { Idiom } from '@/types';

import {
  Card,
  CardBody,
  CardHeader,
  DefinitionText,
  ExampleItem,
  ExampleList,
  IdiomInfo,
  InfoElement,
  InfoElementKey,
  OriginText,
  SectionGroup,
  SectionHeader,
  UpdateExampleButtons,
} from './DetailCard.styles';

type DetailCardProps = {
  idiom: Idiom;
  openModal: () => void;
  openAddOriginModal: () => void;
  openEditOriginModal: () => void;
  openExampleModal: () => void;
  openAddExampleModal: () => void;
};

const DetailCard = ({
  idiom,
  openModal,
  openAddOriginModal,
  openEditOriginModal,
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

        <SectionGroup>
          {idiom.definition && (
            <SectionHeader>
              <h3>Meaning</h3>
              {isAdmin && (
                <UpdateExampleButtons>
                  <SecondaryButton className='btn btn-secondary' onClick={openModal}>
                    Edit Idiom
                  </SecondaryButton>
                </UpdateExampleButtons>
              )}
            </SectionHeader>
          )}
          {isAdmin && !idiom.definition && (
            <UpdateExampleButtons>
              <SecondaryButton className='btn btn-secondary' onClick={openModal}>
                Edit Idiom
              </SecondaryButton>
            </UpdateExampleButtons>
          )}

          <DefinitionText data-testid='definition'>{idiom.definition}</DefinitionText>

          {idiom.origin && idiom.origin.origin_text && (
            <>
              <SectionHeader>
                <h3>Origin</h3>
                {isAdmin && (
                  <UpdateExampleButtons>
                    {idiom.origin ? (
                      <SecondaryButton className='btn btn-secondary' onClick={openEditOriginModal}>
                        Edit Origin
                      </SecondaryButton>
                    ) : (
                      <SecondaryButton className='btn btn-secondary' onClick={openAddOriginModal}>
                        Add Origin
                      </SecondaryButton>
                    )}
                  </UpdateExampleButtons>
                )}
              </SectionHeader>
              <DefinitionText>
                <OriginText>{idiom.origin.origin_text}</OriginText>
              </DefinitionText>
            </>
          )}
          {isAdmin && (
            <UpdateExampleButtons>
              {idiom.origin ? (
                <SecondaryButton className='btn btn-secondary' onClick={openEditOriginModal}>
                  Edit Origin
                </SecondaryButton>
              ) : (
                <SecondaryButton className='btn btn-secondary' onClick={openAddOriginModal}>
                  Add Origin
                </SecondaryButton>
              )}
            </UpdateExampleButtons>
          )}

          {idiom.examples && idiom.examples.length > 0 && (
            <SectionHeader>
              <h3>Examples</h3>
              {isAdmin && (
                <UpdateExampleButtons>
                  <SecondaryButton className='btn btn-secondary' onClick={openAddExampleModal}>
                    Add Ex.
                  </SecondaryButton>
                  {idiom.examples && idiom.examples.length > 0 && (
                    <SecondaryButton className='btn btn-secondary' onClick={openExampleModal}>
                      Edit Ex.
                    </SecondaryButton>
                  )}
                </UpdateExampleButtons>
              )}
            </SectionHeader>
          )}
          <ExampleList data-testid='examples'>
            {examples.map((example) => (
              <ExampleItem key={example.example_id}>{example.example}</ExampleItem>
            ))}
          </ExampleList>
          {isAdmin && idiom.examples && idiom.examples.length < 1 && (
            <UpdateExampleButtons>
              <SecondaryButton className='btn btn-secondary' onClick={openAddExampleModal}>
                Add Ex.
              </SecondaryButton>
            </UpdateExampleButtons>
          )}
        </SectionGroup>
      </CardBody>
    </Card>
  );
};

export default DetailCard;
