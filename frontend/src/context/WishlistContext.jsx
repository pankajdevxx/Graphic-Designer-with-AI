import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';
import wishlistService from '../services/wishlistService';

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = 'pixelgen_marketplace_wishlist';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage:', e);
      return [];
    }
  });

  const { addToCart } = useCart();

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage:', e);
    }
  }, [wishlist]);

  // Sync with Django MySQL backend on mount
  useEffect(() => {
    let isMounted = true;
    wishlistService
      .getWishlist()
      .then((data) => {
        if (!isMounted || !data?.items) return;
        if (data.items.length > 0) {
          const serverProducts = data.items.map((item) => item.product);
          setWishlist(serverProducts);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });

    if (product.slug) {
      wishlistService.addToWishlist(product.slug, false).catch(() => {});
    }
  };

  const removeFromWishlist = (productId) => {
    const item = wishlist.find((i) => i.id === productId);
    setWishlist((prev) => prev.filter((i) => i.id !== productId));

    if (item?.slug) {
      wishlistService.addToWishlist(item.slug, true).catch(() => {});
    }
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  const moveToCart = (product, licenseType = 'Standard') => {
    addToCart(product, licenseType);
    removeFromWishlist(product.id);
    if (product.slug) {
      wishlistService.moveToCart(product.slug, licenseType).catch(() => {});
    }
  };

  const moveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 'Standard');
      if (product.slug) {
        wishlistService.moveToCart(product.slug, 'Standard').catch(() => {});
      }
    });
    setWishlist([]);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        moveToCart,
        moveAllToCart,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;