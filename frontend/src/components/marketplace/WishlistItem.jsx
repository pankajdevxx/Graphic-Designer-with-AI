import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Star, Eye } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export const WishlistItem = ({ product }) => {
  const { removeFromWishlist, moveToCart } = useWishlist();
  const { showToast } = useToast();

  const handleRemove = () => {
    removeFromWishlist(product.id);
    showToast(`Removed "${product.title}" from your wishlist`, 'info');
  };

  const handleMoveToCart = () => {
    moveToCart(product, 'Standard');
    showToast(`Moved "${product.title}" to your cart!`, 'success');
  };

  return (
    <div className="group relative rounded-2xl bg-[#12092b]/70 border border-purple-500/20 backdrop-blur-md overflow-hidden hover:border-purple-500/40 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-between">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0c051f]">
        <img
          src={product.previewImages?.[0] || product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#05020c]/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
          {product.category}
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          aria-label="Remove from wishlist"
          className="absolute top-3 right-3 p-2 rounded-full bg-[#05020c]/80 text-purple-300 hover:text-red-400 border border-purple-500/30 hover:border-red-500/50 backdrop-blur-md transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Info & Actions */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-white">{product.rating}</span>
            <span className="text-xs text-purple-400/80">({product.reviewsCount} reviews)</span>
          </div>

          {/* Title */}
          <Link
            to={`/marketplace/product/${product.slug}`}
            className="text-base font-bold text-white hover:text-purple-300 transition-colors line-clamp-1 block mb-2"
          >
            {product.title}
          </Link>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-extrabold text-white">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-purple-400/60 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-purple-500/10">
          <button
            onClick={handleMoveToCart}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Move to Cart
          </button>

          <Link
            to={`/marketplace/product/${product.slug}`}
            className="p-2 rounded-xl bg-[#1c0d3a]/60 hover:bg-[#1c0d3a] border border-purple-500/30 text-purple-300 hover:text-white transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;