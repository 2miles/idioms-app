import styled from 'styled-components';

export const IdiomHeader = styled.div`
  color: var(--color-text-primary);
  background-color: var(--bg-dark);
  border-radius: var(--radius-md);
  border-bottom: 0.5px solid var(--color-border);
  margin-bottom: var(--margin-lg);

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.3px;
    margin-top: var(--margin-xl);
    margin-bottom: var(--margin-md);
    text-align: center;
    padding-top: var(--padding-md);
  }
`;

export const IdiomInfo = styled.div`
  display: flex;
  gap: var(--margin-xl);
  margin-top: var(--margin-lg);
  padding-left: var(--padding-sm);
`;

export const InfoElementKey = styled.span`
  margin-right: var(--margin-sm);
  color: var(--color-text-primary);
`;

export const ExampleList = styled.ul`
  padding-left: var(--padding-lg) !important;
  margin-bottom: var(--margin-xs);
`;

export const SectionHeader = styled.div`
  border-bottom: 1px solid var(--color-border);
  padding: var(--padding-xs) var(--padding-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--margin-xl);
  margin-bottom: var(--margin-md);
  h3 {
    color: var(--color-text-primary);
    margin-bottom: 0 !important;
  }
`;

export const OriginText = styled.div`
  white-space: pre-wrap;
`;

export const OriginSource = styled.p`
  margin-left: var(--margin-md);
  color: var(--color-text-primary);
  opacity: 0.5;
  font-size: 1rem;
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--margin-lg);
  margin-left: var(--margin-sm);
  margin-right: var(--margin-sm);
`;

export const IdiomBody = styled.div`
  margin: var(--margin-sm);
  li {
    padding-bottom: var(--padding-md);
    line-height: 1.6;
    font-style: italic;
  }

  li::marker {
    color: var(--color-text-secondary);
  }
  li {
    padding-left: var(--padding-lg) !important;
  }
`;

export const PageBody = styled.div`
  margin-left: var(--margin-sm);
  margin-right: var(--margin-sm);
`;

export const IdiomSection = styled.div`
  margin-bottom: var(--margin-xxl);
`;

export const SectionBody = styled.div`
  padding-left: var(--padding-sm);
`;
