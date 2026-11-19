import apiClient from './apiClient';

export const cartService = {
  /**
   * Retrieve active cart summary and items for the current session
   * @param {string} couponCode - Optional coupon code
   */
  async getCart(couponCode = '') {
    const params = couponCode ? { coupon: couponCode } : {};
    const response = await apiClient.get('/cart/', { params });
    return response.data;
  },

  /**
   * Add a product to the cart
   * @param {string} productSlug
   * @param {string} licenseType - 'Standard' | 'Extended'
   * @param {number} quantity
   */
  async addToCart(productSlug, licenseType = 'Standard', quantity = 1) {
    const response = await apiClient.post('/cart/items/', {
      product_slug: productSlug,
      license_type: licenseType,
      quantity,
    });
    return response.data;
  },

  /**
   * Update cart item quantity or license
   * @param {number} itemId
   * @param {Object} updateData - { quantity, license_type }
   */
  async updateCartItem(itemId, updateData) {
    const response = await apiClient.patch(`/cart/items/${itemId}/`, updateData);
    return response.data;
  },

  /**
   * Remove a single item from the cart
   * @param {number} itemId
   */
  async removeCartItem(itemId) {
    const response = await apiClient.delete(`/cart/items/${itemId}/`);
    return response.data;
  },

  /**
   * Clear all items from the current cart
   */
  async clearCart() {
    const response = await apiClient.delete('/cart/clear/');
    return response.data;
  },
};

export default cartService;