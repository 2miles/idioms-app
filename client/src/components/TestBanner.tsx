import styled from 'styled-components';

const Banner = styled.div<{ $env: string }>`
  background-color: ${({ $env }) => ($env === 'test' ? 'green' : 'white')};
  color: ${({ $env }) => ($env === 'test' ? 'white' : 'black')};
  font-weight: bold;
  font-size: 1.25rem;
  text-align: center;
`;

const TestBanner = () => {
  const env = import.meta.env.VITE_APP_ENV;
  if (env !== 'test' && env !== 'dev') return null;

  return <Banner $env={env}>{env.toUpperCase()} CLIENT</Banner>;
};

export default TestBanner;
