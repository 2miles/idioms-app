import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto var(--space-xxxl);

  @media (max-width: 1300px) {
    padding-left: var(--padding-xxl);
    padding-right: var(--padding-xxl);
  }

  @media (max-width: 800px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export default PageContainer;
