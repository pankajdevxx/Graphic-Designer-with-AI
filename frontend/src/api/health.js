import apiClient from './client';

/**
 * Fetch backend and database health status
 * @returns {Promise<object>} Health response payload
 */
export const getHealthStatus = async () => {
  const response = await apiClient.get('/health/');
  return response.data;
};

