import axios from 'axios';

const SESSION_STORAGE_KEY = 'pixelgen_session_key';

export const getOrCreateSessionKey = () => {
  try {
    let key = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!key) {
      key = 'pgx_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now().toString(36);
      localStorage.setItem(SESSION_STORAGE_KEY, key);
    }
    return key;
  } catch (e) {
    return 'pgx_guest_fallback';
  }
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach Session Key & JWT Auth Token
apiClient.interceptors.request.use(
  (config) => {
    const sessionKey = getOrCreateSessionKey();
    config.headers['X-Session-Key'] = sessionKey;

    try {
      const token = localStorage.getItem('pixelgen_access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      // Ignore storage errors
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Capture Session Key & Standardize Errors
apiClient.interceptors.response.use(
  (response) => {
    const serverSessionKey = response.headers['x-session-key'];
    if (serverSessionKey) {
      try {
        localStorage.setItem(SESSION_STORAGE_KEY, serverSessionKey);
      } catch (e) {
        // Ignore localStorage quota errors
      }
    }
    return response;
  },
  (error) => {
    let customError = {
      message: 'Network error or backend unreachable. Please verify Django server is running.',
      status: error.response?.status || 500,
      details: error.response?.data || null,
      isApiError: true,
    };

    if (error.response) {
      if (error.response.status === 404) {
        customError.message = error.response.data?.detail || 'Requested resource was not found.';
      } else if (error.response.status === 400) {
        customError.message = error.response.data?.error || 'Invalid request parameters.';
      } else if (error.response.status >= 500) {
        customError.message = 'Internal server error. Please try again shortly.';
      }
    } else if (error.code === 'ECONNABORTED') {
      customError.message = 'Request timed out waiting for backend API response.';
    }

    return Promise.reject(customError);
  }
);

export default apiClient;