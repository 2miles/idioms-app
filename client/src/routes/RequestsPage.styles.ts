import { SuccessButton } from '@/components/ButtonStyles';
import { InfoElementKey } from '@/components/DetailPage/DetailCard/DetailCard.styles';
import CheckIcon from '@/images/check_2.svg?react';
import { styled } from 'styled-components';

const Card = styled.div`
  font-size: var(--font-md);
  background: var(--bg-dark);
  overflow: hidden;
`;

const CardHeader = styled.div`
  color: var(--color-text-primary);
  background-color: var(--bg-medium);
  border-bottom: 1px solid var(--color-border);

  h1 {
    font-size: 1.3rem;
    color: var(--color-text-primary);
    padding-top: var(--padding-md);
    padding-bottom: var(--padding-sm);
    text-align: center;
  }
`;

export const CardBody = styled.div`
  color: var(--color-text-primary);
  padding-left: var(--padding-lg);
  padding-right: var(--padding-lg);

  @media (max-width: 770px) {
    padding-left: var(--padding-md);
    padding-right: var(--padding-md);
  }
`;

export const StyledCheckIcon = styled(CheckIcon)`
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  vertical-align: middle;
  color: green;
  margin-bottom: var(--margin-xs);
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;

export const CardsWrapper = styled.div`
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

export const RequestCard = styled(Card)`
  &.card {
    margin-bottom: var(--margin-sm);
    margin-top: var(--margin-sm);
  }
`;

export const RequestCardHeader = styled(CardHeader)`
  h1 {
    text-align: left;
    padding-left: var(--padding-lg);
    font-size: 1.5rem;
  }
`;

export const RequestIdiomInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--margin-lg);
  margin-top: 0px;
`;

export const RequestInfoElement = styled.div`
  margin-top: 0px;
  padding: 0px;
`;

export const RequestInfoElementKey = styled(InfoElementKey)`
  font-weight: normal;
`;

export const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: var(--margin-xxl);
  margin-top: var(--margin-xxl);
  font-size: 2rem;
`;

export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--margin-xl);
`;

export const SearchForm = styled.form`
  width: 100%;
  max-width: 800px;
  display: flex;
  gap: var(--margin-md);
  align-items: stretch;

  @media (max-width: 660px) {
    flex-direction: column;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchButton = styled(SuccessButton)`
  min-width: 120px;
`;

export const SearchResultText = styled.p<{ $status: 'good' | 'bad' }>`
  margin-top: var(--margin-md);
  margin-bottom: 0;
  min-height: 24px;

  color: ${({ $status }) =>
    $status === 'good' ? 'var(--color-status-good)' : 'var(--color-status-bad)'};
`;

export const TestResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--margin-sm);
`;

export const TestResultDimText = styled.span`
  color: var(--color-text-dim);
  font-size: var(--font-sm);
`;
