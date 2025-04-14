import axios from 'axios';

export default axios.create({
  // Latest version with environment variable
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/idioms`,

  // No environment variable version
  //baseURL: 'http://localhost:3001/api/v1/idioms',

  // If I want use my phone
  // baseURL: 'http://192.168.0.100:3001/api/v1/idioms',

  // Not sure what this is about
  // baseURL: 'http://idioms-app-server:3001/api/v1/idioms',
});
