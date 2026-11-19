import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Hooks for future auth token attachment (Phase 2+)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorDetails = {
      message: error.response?.data?.message || error.message || 'API request error',
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(errorDetails);
  }
);

export default apiClient;

