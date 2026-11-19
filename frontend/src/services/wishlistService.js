import apiClient from './apiClient';

export const wishlistService = {
  /**
   * Retrieve all saved wishlist items for the current session
   */
  async getWishlist() {
    const response = await apiClient.get('/wishlist/');
    return response.data;
  },

  /**
   * Add or toggle a product in the wishlist
   * @param {string} productSlug
   * @param {boolean} toggle
   */
  async addToWishlist(productSlug, toggle = false) {
    const response = await apiClient.post('/wishlist/items/', {
      product_slug: productSlug,
      toggle,
    });
    return response.data;
  },

  /**
   * Remove item from wishlist by ID
   * @param {number} itemId
   */
  async removeWishlistItem(itemId) {
    const response = await apiClient.delete(`/wishlist/items/${itemId}/`);
    return response.data;
  },

  /**
   * Move product from wishlist directly to cart
   * @param {string} productSlug
   * @param {string} licenseType
   */
  async moveToCart(productSlug, licenseType = 'Standard') {
    const response = await apiClient.post('/wishlist/move-to-cart/', {
      product_slug: productSlug,
      license_type: licenseType,
    });
    return response.data;
  },

  /**
   * Retrieve recently viewed products
   */
  async getRecentlyViewed() {
    const response = await apiClient.get('/wishlist/recently-viewed/');
    return response.data;
  },

  /**
   * Record a recently viewed product
   * @param {string} productSlug
   */
  async recordView(productSlug) {
    const response = await apiClient.post('/wishlist/recently-viewed/', {
      product_slug: productSlug,
    });
    return response.data;
  },
};

export default wishlistService;