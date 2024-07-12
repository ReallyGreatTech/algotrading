import axios from 'axios';

const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://api-algo.reallygreattech.com/api';

export const apiClient = axios.create({
  baseURL: apiBaseURL,
});
