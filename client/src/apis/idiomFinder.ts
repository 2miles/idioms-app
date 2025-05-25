import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/idioms`;
console.log('VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL);

export const publicIdiomFinder = axios.create({
  baseURL,
});
