import axios from 'axios';

import { useAuth0 } from '@auth0/auth0-react';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/requests`;
const audience = 'https://api.idiomvault.com';
const scope = 'openid profile email';

const useAuthorizedRequestFinder = () => {
  const { getAccessTokenSilently } = useAuth0();

  return async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: { audience, scope },
    });

    return axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${token}` },
    });
  };
};

export default useAuthorizedRequestFinder;
