import axios from 'axios';

export const apiClient = axios.create({
  // baseURL: 'http://3.76.134.149:8000/api',
  baseURL: import.meta.env.VITE_ALGO_TRADING_API_URL,
});
