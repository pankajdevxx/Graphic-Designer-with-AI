import apiClient from './apiClient';

export const orderService = {
  createCheckoutOrder: async (checkoutPayload) => {
    const response = await apiClient.post('/orders/checkout/', checkoutPayload);
    return response.data;
  },

  verifyPayment: async (paymentPayload) => {
    const response = await apiClient.post('/orders/verify-payment/', paymentPayload);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await apiClient.get('/orders/my-orders/');
    return response.data;
  },

  getMyDownloads: async () => {
    const response = await apiClient.get('/orders/my-downloads/');
    return response.data;
  },

  getOrderDetail: async (orderNumber, email = '') => {
    const query = email ? `?email=${encodeURIComponent(email)}` : '';
    const response = await apiClient.get(`/orders/detail/${orderNumber}/${query}`);
    return response.data;
  },

  getDownloadUrl: (licenseKey) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
    return `${baseUrl}/orders/downloads/${licenseKey}/`;
  },

  submitCustomDesignRequest: async (briefData) => {
    const response = await apiClient.post('/orders/custom-request/', briefData);
    return response.data;
  },

  // Admin endpoints
  getAdminOrders: async () => {
    const response = await apiClient.get('/orders/admin/orders/');
    return response.data;
  },

  updateAdminOrder: async (orderId, data) => {
    const response = await apiClient.patch(`/orders/admin/orders/${orderId}/`, data);
    return response.data;
  },

  getAdminCustomRequests: async () => {
    const response = await apiClient.get('/orders/admin/custom-requests/');
    return response.data;
  },

  updateAdminCustomRequest: async (requestId, data) => {
    const response = await apiClient.patch(`/orders/admin/custom-requests/${requestId}/`, data);
    return response.data;
  },

  getAdminAnalytics: async () => {
    const response = await apiClient.get('/orders/admin/analytics/');
    return response.data;
  },
};

export default orderService;
