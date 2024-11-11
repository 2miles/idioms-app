import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001/api/v1/idioms',
  // baseURL: 'http://192.168.0.100:3001/api/v1/idioms',
  // baseURL: 'http://idioms-app-server:3001/api/v1/idioms',
});
