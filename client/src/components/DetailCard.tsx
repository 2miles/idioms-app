import styled from 'styled-components';
import moment from 'moment';

import { Idiom, Example } from '@/types';

const Card = styled.div`
  &.card {
    background: var(--color-ui-primary);
    border: 1px solid var(--color-ui-border);
    font-family: 'Times New Roman', Times, serif;
    overflow: hidden;
    margin-top: var(--margin-xxl);
  }
`;

const CardHeader = styled.div`
  text-align: center;
  background-color: var(--hilite-ui-primary);
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-ui-border);

  h1 {
    font-size: var(--font-xxl);
    margin: 0;
    padding: var(--padding-lg);
    font-style: italic;
    font-weight: normal;
  }

  h2 {
    font-size: var(--font-xl);
    margin: 0;
    font-style: italic;
    font-weight: normal;
  }
`;

const CardBody = styled.div`
  font-size: var(--font-lg);

  padding-left: var(--padding-xxl);
  padding-right: var(--padding-xxl);

  h3 {
    margin-top: var(--margin-xxl);
  }

  p {
    margin: var(--margin-md) 0;
  }

  li {
    padding-top: var(--padding-sm);
    padding-bottom: var(--padding-sm);
  }

  @media (max-width: 770px) {
    padding-left: var(--padding-lg);
    padding-right: var(--padding-lg);
  }
`;

const IdiomInfo = styled.div`
  display: flex;
  justify-content: space-between;

  padding-left: var(--padding-lg);
  padding-right: var(--padding-lg);
  padding-top: var(--padding-sm);
  padding-bottom: var(--padding-sm);

  background-color: var(--color-ui-primary);
`;

const Position = styled.p`
  margin: 0;
  font-size: var(--font-lg);
  color: var(--color-text-primary);
  align-self: flex-start;

  border-radius: var(--radius-sm);
`;

const Contributor = styled.p`
  margin: 0;
  font-size: var(--font-lg);
  color: var(--color-text-primary);
  align-self: flex-end;
`;

const ExampleItem = styled.li`
  padding-left: 0px !important;
`;

const ExampleList = styled.ul`
  padding-left: var(--padding-lg) !important;
`;

type DetailCardProps = {
  idiom: Idiom;
  examples: Example[];
};

const DetailCard = ({ idiom, examples }: DetailCardProps) => {
  return (
    <Card className='card'>
      <CardHeader className='card-header'>
        <h1>
          &quot;
          {idiom.title_general && idiom.title_general.trim() !== ''
            ? idiom.title_general
            : idiom.title}
          &quot;
        </h1>
      </CardHeader>
      <IdiomInfo>
        <Position>{`Idiom: ${idiom.position}`}</Position>
        <Contributor>
          {`Added: ${moment(idiom.timestamps).format('MM-DD-YY')}`}
          {idiom.contributor ? ` by ${idiom.contributor}` : ''}
        </Contributor>
      </IdiomInfo>
      <CardBody className='card-body'>
        <h3>Meaning:</h3>
        <p>{idiom.definition}</p>
        <h3>Examples:</h3>
        <ExampleList>
          {examples.map((example) => (
            <ExampleItem key={example.example_id}>{example.example}</ExampleItem>
          ))}
        </ExampleList>
      </CardBody>
    </Card>
  );
};

export default DetailCard;
