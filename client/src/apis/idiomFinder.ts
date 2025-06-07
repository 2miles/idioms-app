import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/idioms`;

export const publicIdiomFinder = axios.create({
  baseURL,
});
