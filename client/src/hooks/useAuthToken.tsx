import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

// This is a hook to fetch and manage the Auth0 access token.
const useAuthToken = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (!isAuthenticated || isLoading) return;
      try {
        //This function fetches the token without requiring the user to re-login.
        const fetchedToken = await getAccessTokenSilently();
        setToken(fetchedToken || null); // Always set token, even if null
      } catch (error) {
        console.error('Failed to fetch access token:', error);
      }
    };

    fetchToken();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  return token;
};

export default useAuthToken;
