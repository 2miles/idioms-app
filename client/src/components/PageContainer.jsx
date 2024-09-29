import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto 200px;
  margin-left: 100px;
  margin-right: 100px;

  @media (max-width: 950px) {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

export default PageContainer;
