import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use the named export

// Define the structure of your token payload
interface TokenPayload {
  'https://api.idiomvault.com/roles'?: string[];
  [key: string]: any;
}
// Hook to fetch and manage the Auth0 access token.
const useAuthToken = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [token, setToken] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[] | null>(null);
  const [authTokenLoading, setAuthTokenLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      if (isLoading) return;

      if (!isAuthenticated) {
        setToken(null);
        setRoles(null);
        setAuthTokenLoading(false);
        return;
      }

      try {
        // Fetches the token without requiring the user to re-login.
        const fetchedToken = await getAccessTokenSilently();
        setToken(fetchedToken || null);

        if (fetchedToken) {
          const decodedToken = jwtDecode<TokenPayload>(fetchedToken);
          const extractedRoles = decodedToken['https://api.idiomvault.com/roles'] || null;
          setRoles(extractedRoles);
        }
      } catch (error) {
        console.error('Failed to fetch access token:', error);
        setToken(null);
        setRoles(null);
      } finally {
        setAuthTokenLoading(false);
      }
    };

    fetchToken();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  return { token, roles, authTokenLoading };
};

export default useAuthToken;
