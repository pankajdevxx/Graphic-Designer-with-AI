import apiClient from './apiClient';

export const categoryService = {
  /**
   * Retrieve all 15 active categories with product counts
   */
  async getAllCategories() {
    const response = await apiClient.get('/categories/');
    return response.data;
  },

  /**
   * Retrieve single category metadata by slug
   */
  async getCategoryBySlug(slug) {
    const response = await apiClient.get(`/categories/${slug}/`);
    return response.data;
  },
};

export default categoryService;