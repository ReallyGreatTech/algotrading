import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://3.76.134.149:8000/api',
});
