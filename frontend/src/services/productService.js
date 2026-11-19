import apiClient from './apiClient';

export const productService = {
  /**
   * Search, filter, and paginate products
   * @param {Object} params - { q, category, min_price, max_price, min_rating, featured, trending, on_sale, is_new, sort, page, page_size }
   */
  async getProducts(params = {}) {
    const response = await apiClient.get('/products/', { params });
    return response.data;
  },

  /**
   * Retrieve single product details by slug or numeric ID
   * @param {string|number} slugOrId
   */
  async getProductBySlug(slugOrId) {
    const response = await apiClient.get(`/products/${slugOrId}/`);
    return response.data;
  },

  /**
   * Retrieve featured products showcase
   * @param {number} limit
   */
  async getFeaturedProducts(limit = 8) {
    const response = await apiClient.get('/products/featured/', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Retrieve trending products
   * @param {number} limit
   */
  async getTrendingProducts(limit = 8) {
    const response = await apiClient.get('/products/trending/', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Retrieve new arrival products
   * @param {number} limit
   */
  async getNewArrivals(limit = 8) {
    const response = await apiClient.get('/products/new-arrivals/', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Retrieve category-specific related products
   * @param {string} slug
   * @param {number} limit
   */
  async getRelatedProducts(slug, limit = 4) {
    const response = await apiClient.get(`/products/${slug}/related/`, {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Retrieve commercial license packages
   */
  async getLicenses() {
    const response = await apiClient.get('/products/licenses/');
    return response.data;
  },
};

export default productService;