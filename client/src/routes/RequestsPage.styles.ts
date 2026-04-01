import { SecondaryButton } from '@/components/ButtonStyles';
import CheckIcon from '@/images/check_2.svg?react';
import { styled } from 'styled-components';

const Card = styled.div`
  font-size: var(--font-md);
  background: var(--bg-dark);
  overflow: hidden;
  margin-bottom: var(--margin-lg) !important;
`;

export const CardHeader = styled.div<{ $added: boolean }>`
  color: ${({ $added }) => ($added ? 'var(--color-text-secondary)' : 'var(--color-text-primary)')};

  background: ${({ $added }) =>
    $added ? 'color-mix(in oklab, var(--bg-dark) 85%, black)' : 'transparent'};

  border-bottom: 1px solid var(--color-border);
  h1 {
    font-size: 1.2rem;
    padding-top: var(--padding-md);
    padding-bottom: var(--padding-sm);
    text-align: center;
  }
`;

export const CardBody = styled.div<{ $added: boolean }>`
  color: ${({ $added }) => ($added ? 'var(--color-text-dim)' : 'var(--color-text-primary)')};

  background: ${({ $added }) =>
    $added ? 'color-mix(in oklab, var(--bg-dark) 85%, black)' : 'transparent'};

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
  margin-top: var(--margin-lg);

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
  color: var(--color-text-secondary);
`;

export const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: var(--margin-xxl);
  margin-top: var(--margin-xxl);
  font-size: 2.5rem;
  font-weight: 400;
`;

export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--margin-sm);
`;

export const SearchForm = styled.form`
  width: 100%;
  max-width: 800px;
  display: flex;
  gap: var(--margin-md);
  align-items: stretch;
  margin-bottom: var(--margin-md);

  /* @media (max-width: 660px) {
    flex-direction: column;
  } */
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchButton = styled(SecondaryButton)`
  min-width: 120px;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-text-dim);
`;

export const TestResultRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 30px;
  width: 100%;
  max-width: 800px;
`;

export const TestResultDimText = styled.span`
  color: var(--color-text-dim);
  font-size: var(--font-sm);
`;

export const RequestMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--margin-sm);
`;

export const TestSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--margin-sm);

  flex-shrink: 0; // 👈 THIS is the fix
`;

export const TestButton = styled(SecondaryButton)`
  min-width: 120px;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-text-dim) !important;
`;

export const SearchResultText = styled.p<{ $status: 'good' | 'bad' | 'neutral' }>`
  margin: 0;
  min-height: 24px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${({ $status }) => ($status === 'neutral' ? '0' : '2px 6px')};
  border-radius: var(--radius-md);

  color: ${({ $status }) =>
    $status === 'good'
      ? 'var(--color-status-good)'
      : $status === 'bad'
        ? 'var(--color-status-bad)'
        : 'transparent'};

  background: ${({ $status }) =>
    $status === 'good'
      ? 'color-mix(in oklab, var(--color-status-good) 10%, transparent)'
      : $status === 'bad'
        ? 'color-mix(in oklab, var(--color-status-bad) 10%, transparent)'
        : 'transparent'};
`;
