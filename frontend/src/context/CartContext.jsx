import React, { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../services/cartService';
import promotionsService from '../services/promotionsService';

const CartContext = createContext();

const CART_STORAGE_KEY = 'pixelgen_marketplace_cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  // Sync with Django MySQL backend on initial load
  useEffect(() => {
    let isMounted = true;
    cartService
      .getCart(couponCode)
      .then((serverCart) => {
        if (!isMounted || !serverCart?.items) return;
        if (serverCart.items.length > 0) {
          const mapped = serverCart.items.map((item) => ({
            id: item.id,
            product: item.product,
            licenseType: item.license_type,
            quantity: item.quantity,
            addedAt: item.created_at,
          }));
          setCart(mapped);
          if (serverCart.coupon_code) {
            setCouponCode(serverCart.coupon_code);
            setDiscountPercent(serverCart.discount_percent || 0);
          }
        }
      })
      .catch(() => {
        // Fallback to local state if backend is booting
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Add product to cart (Syncs with MySQL backend)
  const addToCart = (product, licenseType = 'Standard') => {
    // 1. Optimistic UI update
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.licenseType === licenseType
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [
        ...prevCart,
        {
          product,
          licenseType,
          quantity: 1,
          addedAt: new Date().toISOString(),
        },
      ];
    });

    // 2. Sync to Django Backend
    if (product.slug) {
      cartService.addToCart(product.slug, licenseType, 1).catch((err) => {
        console.warn('Backend cart sync note:', err.message);
      });
    }
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    const itemToRemove = cart.find((item) => item.product.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));

    if (itemToRemove?.id) {
      cartService.removeCartItem(itemToRemove.id).catch(() => {});
    }
  };

  // Update quantity
  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) {
              if (item.id) cartService.removeCartItem(item.id).catch(() => {});
              return null;
            }
            if (item.id) {
              cartService.updateCartItem(item.id, { quantity: newQty }).catch(() => {});
            }
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
    setCouponError('');
    cartService.clearCart().catch(() => {});
  };

  const isInCart = (productId) => {
    return cart.some((item) => item.product.id === productId);
  };

  // Apply discount coupon via Django MySQL promotion backend
  const applyCoupon = async (code) => {
    const trimmed = code.trim().toUpperCase();
    try {
      const res = await promotionsService.validateCoupon(trimmed);
      if (res.valid) {
        setCouponCode(res.code);
        setDiscountPercent(res.discount_percent);
        setCouponError('');
        return { success: true, message: res.message };
      } else {
        setCouponError(res.message || 'Invalid coupon code.');
        return { success: false, message: res.message };
      }
    } catch (e) {
      // Offline fallback for known codes
      if (trimmed === 'PIXEL20') {
        setCouponCode('PIXEL20');
        setDiscountPercent(20);
        setCouponError('');
        return { success: true, message: 'Promo code applied: 20% discount!' };
      } else if (trimmed === 'CREATOR10') {
        setCouponCode('CREATOR10');
        setDiscountPercent(10);
        setCouponError('');
        return { success: true, message: 'Promo code applied: 10% discount!' };
      }
      setCouponError('Invalid coupon code. Try "PIXEL20" for 20% off.');
      return { success: false, message: 'Invalid promo code.' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    setCouponError('');
  };

  // Financial calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    const priceMultiplier = item.licenseType === 'Extended' ? 2.5 : 1;
    const basePrice = Number(item.product?.price || 0);
    return acc + basePrice * priceMultiplier * item.quantity;
  }, 0);

  const discountAmount = subtotal * (discountPercent / 100);
  const total = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartCount,
        subtotal,
        discountPercent,
        discountAmount,
        total,
        couponCode,
        couponError,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;