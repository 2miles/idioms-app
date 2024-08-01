import axios from 'axios';

// With Axios, you don't need to manually check for response.ok and handle JSON parsing,
// as Axios automatically handles these for you.
export default axios.create({
  // baseURL: "http://localhost:3001/api/v1/idioms"
  baseURL: 'http://192.168.0.100:3001/api/v1/idioms',
});
