import { useEffect } from 'react';
import { styled } from 'styled-components';

import { useAuth0 } from '@auth0/auth0-react';

import { SecondaryButton } from '@/components//ButtonStyles';

type LoginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledLoginButton = styled(SecondaryButton)`
  background-color: var(--bg-dark) !important;
  padding: var(--padding-sm) var(--padding-md);
`;

const LoginButton: React.FC<LoginButtonProps> = ({ ...props }) => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    loginWithRedirect();
  };

  useEffect(() => {
    const fetchToken = async () => {
      if (!isAuthenticated || isLoading) return;

      try {
        await getAccessTokenSilently();
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);
  return (
    <>
      <StyledLoginButton onClick={handleLoginClick} className='btn btn-secondary' {...props}>
        Log In
      </StyledLoginButton>
    </>
  );
};

export default LoginButton;
