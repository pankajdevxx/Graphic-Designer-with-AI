import apiClient from './apiClient';

export const reviewService = {
  /**
   * Retrieve approved reviews and distribution breakdown for a product
   * @param {string} productSlug
   */
  async getProductReviews(productSlug) {
    const response = await apiClient.get(`/products/${productSlug}/reviews/`);
    return response.data;
  },

  /**
   * Submit a new customer review for a product
   * @param {string} productSlug
   * @param {Object} reviewData - { author_name, rating, title, comment }
   */
  async submitReview(productSlug, reviewData) {
    const response = await apiClient.post(
      `/products/${productSlug}/reviews/`,
      reviewData
    );
    return response.data;
  },
};

export default reviewService;