import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/idioms`;

const useAuthorizedIdiomFinder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAxios = async () => {
    const token = await getAccessTokenSilently();
    return axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return getAxios;
};

export default useAuthorizedIdiomFinder;
