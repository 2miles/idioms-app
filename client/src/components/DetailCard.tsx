import styled from 'styled-components';
import moment from 'moment';

import { Idiom } from 'types';

//
const Card = styled.div`
  &.card {
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.5),
      rgba(230, 230, 230, 0.7)
    );
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    font-family: 'Times New Roman', Times, serif;
    overflow: hidden;
    margin-top: var(--margin-xxl);
  }
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;

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
    color: #555;
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

type Example = {
  example_id: number;
  example: string;
};

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
      <CardBody className='card-body'>
        <p># {idiom.id}</p>
        <p>
          {'Added on '}
          {moment(idiom.timestamps).format('MM-DD-YY')}
        </p>

        <h3>Meaning:</h3>
        <p>{idiom.definition}</p>
        <h3>Examples:</h3>
        <ul>
          {examples.map((example) => (
            <li key={example.example_id}>{example.example}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default DetailCard;
