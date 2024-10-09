import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto var(--space-xxxl);

  @media (max-width: 1300px) {
    margin-left: var(--margin-xxl);
    margin-right: var(--margin-xxl);
  }

  @media (max-width: 800px) {
    margin-left: var(--margin-sm);
    margin-right: var(--margin-sm);
  }
`;

export default PageContainer;
