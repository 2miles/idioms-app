import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use the named export

// Define the structure of your token payload
interface TokenPayload {
  'https://api.idiomvault.com/roles'?: string[];
  [key: string]: any;
}

const audience = 'https://api.idiomvault.com';
const scope = 'openid profile email';

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
        const fetchedToken = await getAccessTokenSilently({
          authorizationParams: { audience, scope }, // ← match provider
        });
        setToken(fetchedToken || null);

        if (fetchedToken) {
          const decoded = jwtDecode<TokenPayload>(fetchedToken);
          setRoles(decoded['https://api.idiomvault.com/roles'] ?? null);
        } else {
          setRoles(null);
        }
      } catch (e: any) {
        // Ignore common silent-auth cases; user just isn't eligible silently
        const ignorable = ['login_required', 'consent_required', 'interaction_required'];
        if (!ignorable.includes(e?.error)) {
          console.error('Failed to fetch access token:', e);
        }
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
