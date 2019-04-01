import axios from 'axios';
import { cookieKeys, cookies } from 'utils/cookies';
const baseURL = 'http://localhost:3001/api/v1';

const api = axios.create({
  baseURL,
});

export const getHeaders = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Authorization ${cookies.get(cookieKeys.TOKEN)}`,
  },
});

export default api;
