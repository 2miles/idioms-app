import styled from 'styled-components';

export const Card = styled.div`
  font-size: var(--font-lg);
  &.card {
    background: var(--bg-dark);
    border: 1px solid var(--color-border);
    overflow: hidden;
    margin-top: var(--margin-xxl);
  }
`;

export const CardHeader = styled.div`
  background-color: var(--bg-dark);
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border);

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: 0.5px;
    color: var(--color-text-primary);
    margin-top: var(--margin-lg);
    margin-bottom: var(--margin-lg);
    text-align: center;
  }
`;

export const CardBody = styled.div`
  color: var(--color-text-secondary);
  padding-left: var(--padding-xxl);
  padding-right: var(--padding-xxl);

  h3 {
    font-size: 1.5rem;
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

export const IdiomInfo = styled.div`
  padding-right: var(--padding-lg);
  padding-top: var(--padding-sm);
  background-color: var(--bg-dark);
  font-size: 1rem;
`;

export const DefinitionText = styled.p`
  margin-bottom: var(--margin-md) !important;
`;

export const InfoElement = styled.p`
  margin-bottom: var(--margin-sm);
`;
export const InfoElementKey = styled.span`
  margin-right: var(--margin-sm);
  font-weight: bold;
  color: var(--color-text-primary);
`;

export const ExampleItem = styled.li`
  padding-left: var(--padding-sm) !important;
`;

export const ExampleList = styled.ul`
  padding-left: var(--padding-lg) !important;
  margin-bottom: var(--margin-xs);
`;

export const UpdateExampleButtons = styled.div`
  display: flex;
  justify-content: right;
  height: 43px;
  button {
    color: var(--color-text-secondary);
    background-color: var(--bg-medium);
    margin-left: var(--margin-sm);
    padding: var(--padding-sm);

    &:hover {
      background-color: var(--bg-light) !important;
    }
  }
`;

export const SectionHeader = styled.div`
  background-color: var(--bg-header);
  border-radius: var(--radius-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--padding-sm);
  margin-bottom: var(--margin-lg);
  margin-top: 60px;
  h3 {
    color: var(--color-text-primary);
    margin-bottom: 0 !important;
    padding-left: var(--padding-sm);
  }
`;

export const SectionGroup = styled.div`
  p {
    margin-bottom: var(--margin-xxl);
  }
`;

export const OriginText = styled(DefinitionText)`
  white-space: pre-wrap;
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
`;
