import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type LoginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const LoginButton: React.FC<LoginButtonProps> = ({ className, ...props }) => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    loginWithRedirect();
  };

  // Fetch the token directly when needed, no need to store it in state
  useEffect(() => {
    const fetchToken = async () => {
      if (!isAuthenticated || isLoading) return; // wait until the user is authenticated

      try {
        await getAccessTokenSilently(); // Get the access token silently
        // The token is now available if needed for future API requests
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  return (
    <div>
      <button className={className} onClick={handleLoginClick} {...props}>
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
