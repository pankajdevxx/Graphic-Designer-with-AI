import apiClient from './apiClient';

export const contentService = {
  getBlogPosts: async (category = '') => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const response = await apiClient.get(`/blog/${query}`);
    return response.data;
  },

  getBlogPostDetail: async (slug) => {
    const response = await apiClient.get(`/blog/${slug}/`);
    return response.data;
  },

  submitContactInquiry: async (inquiryData) => {
    const response = await apiClient.post('/contact/', inquiryData);
    return response.data;
  },

  subscribeNewsletter: async (email) => {
    const response = await apiClient.post('/newsletter/', { email });
    return response.data;
  },

  getNotifications: async () => {
    const response = await apiClient.get('/notifications/');
    return response.data;
  },

  markNotificationsRead: async (notifId = null) => {
    const url = notifId ? `/notifications/${notifId}/read/` : '/notifications/read/';
    const response = await apiClient.post(url);
    return response.data;
  },

  // Admin Management
  getAdminBlogPosts: async () => {
    const response = await apiClient.get('/admin/blog/');
    return response.data;
  },

  createAdminBlogPost: async (data) => {
    const response = await apiClient.post('/admin/blog/', data);
    return response.data;
  },

  deleteAdminBlogPost: async (id) => {
    const response = await apiClient.delete(`/admin/blog/${id}/`);
    return response.data;
  },

  getAdminInquiries: async () => {
    const response = await apiClient.get('/admin/inquiries/');
    return response.data;
  },

  updateAdminInquiry: async (id, data) => {
    const response = await apiClient.patch(`/admin/inquiries/${id}/`, data);
    return response.data;
  },

  getAdminSubscribers: async () => {
    const response = await apiClient.get('/admin/subscribers/');
    return response.data;
  },

  getAdminProducts: async () => {
    const response = await apiClient.get('/admin/products/');
    return response.data;
  },

  createAdminProduct: async (data) => {
    const response = await apiClient.post('/admin/products/', data);
    return response.data;
  },

  updateAdminProduct: async (id, data) => {
    const response = await apiClient.patch(`/admin/products/${id}/`, data);
    return response.data;
  },

  deleteAdminProduct: async (id) => {
    const response = await apiClient.delete(`/admin/products/${id}/`);
    return response.data;
  },

  getAdminCategories: async () => {
    const response = await apiClient.get('/admin/categories/');
    return response.data;
  },

  createAdminCategory: async (data) => {
    const response = await apiClient.post('/admin/categories/', data);
    return response.data;
  },

  updateAdminCategory: async (id, data) => {
    const response = await apiClient.patch(`/admin/categories/${id}/`, data);
    return response.data;
  },

  deleteAdminCategory: async (id) => {
    const response = await apiClient.delete(`/admin/categories/${id}/`);
    return response.data;
  },
};

export default contentService;
