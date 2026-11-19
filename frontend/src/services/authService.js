import apiClient from './apiClient';

export const authService = {
  register: async (userData) => {
    const response = await apiClient.post('/auth/register/', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post('/auth/login/', credentials);
    return response.data;
  },

  refreshToken: async (refresh) => {
    const response = await apiClient.post('/auth/token/refresh/', { refresh });
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile/');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await apiClient.patch('/auth/profile/', profileData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await apiClient.post('/auth/change-password/', passwordData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await apiClient.post('/auth/forgot-password/', { email });
    return response.data;
  },

  resetPassword: async (resetData) => {
    const response = await apiClient.post('/auth/reset-password/', resetData);
    return response.data;
  },

  getAdminUsers: async () => {
    const response = await apiClient.get('/auth/admin/users/');
    return response.data;
  },

  updateAdminUser: async (userId, data) => {
    const response = await apiClient.patch(`/auth/admin/users/${userId}/`, data);
    return response.data;
  },
};

export default authService;
