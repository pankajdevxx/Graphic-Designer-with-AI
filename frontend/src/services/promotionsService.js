import apiClient from './apiClient';

export const promotionsService = {
  /**
   * Retrieve active promotional banners
   */
  async getBanners() {
    const response = await apiClient.get('/promotions/banners/');
    return response.data;
  },

  /**
   * Validate a promotional coupon code
   * @param {string} code
   */
  async validateCoupon(code) {
    const response = await apiClient.post('/promotions/validate-coupon/', {
      code,
    });
    return response.data;
  },
};

export default promotionsService;