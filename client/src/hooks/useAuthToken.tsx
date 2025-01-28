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

  useEffect(() => {
    const fetchToken = async () => {
      if (!isAuthenticated || isLoading) return;

      try {
        // Fetches the token without requiring the user to re-login.
        const fetchedToken = await getAccessTokenSilently();
        console.log('Fetched Token:', fetchedToken); // Debug fetched token
        setToken(fetchedToken || null);

        if (fetchedToken) {
          const decodedToken = jwtDecode<TokenPayload>(fetchedToken);
          const extractedRoles = decodedToken['https://api.idiomvault.com/roles'] || null;
          console.log('Decoded Token:', decodedToken); // Debug decoded token
          console.log('extractedRoles', extractedRoles);
          setRoles(extractedRoles);
        }
      } catch (error) {
        console.error('Failed to fetch access token:', error);
      }
    };

    fetchToken();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  return { token, roles };
};

export default useAuthToken;
