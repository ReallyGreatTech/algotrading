// import axios from 'axios';

// const apiBaseURL =
//   import.meta.env.VITE_API_BASE_URL ||
//   'https://api-algo.reallygreattech.com/api';

// export const apiClient = axios.create({
//   baseURL: apiBaseURL,
// });

import axios from "axios";

const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://api-algo.reallygreattech.com/api";

const apiClient = axios.create({
  baseURL: apiBaseURL,
});

// Add the JWT token to the request headers
apiClient.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh
const refreshToken = localStorage.getItem("refreshToken");
if (refreshToken) {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        refreshToken
      ) {
        originalRequest._retry = true;
        try {
          const response = await apiClient.post("/refresh-token", {
            refreshToken,
          });
          const { token } = response.data;
          localStorage.setItem("authToken", token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
}

export { apiClient };
