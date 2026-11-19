import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

/**
 * ProductCard Component
 * Displays a marketplace digital design item with pricing, discounts, rating, wishlist toggle, and cart actions.
 */
export const ProductCard = ({ product, priority = false }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'Standard');
    addToast(`"${product.title}" added to your cart!`, 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      addToast(`Added "${product.title}" to wishlist.`, 'success');
    } else {
      addToast(`Removed "${product.title}" from wishlist.`, 'info');
    }
  };

  return (
    <GlassCard
      hoverEffect
      glow="purple"
      className="group flex flex-col justify-between h-full overflow-hidden border border-white/10 hover:border-purple-500/40"
    >
      <div>
        {/* Thumbnail Preview with Overlays */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-900 rounded-t-2xl">
          <Link to={`/marketplace/product/${product.slug}`} className="block w-full h-full">
            <img
              src={product.previewImages?.[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}
              alt={product.title}
              className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
              loading={priority ? 'eager' : 'lazy'}
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0620] via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
            {product.featured && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-950/85 text-purple-300 border border-purple-500/40 backdrop-blur-md">
                Featured
              </span>
            )}
            {product.trending && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-fuchsia-950/85 text-fuchsia-300 border border-fuchsia-500/40 backdrop-blur-md">
                Trending
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-rose-600/90 text-white backdrop-blur-md shadow-md">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Wishlist Heart Button (Top Right) */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all duration-300 z-10 ${
              inWishlist
                ? 'bg-pink-600 text-white border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'bg-black/40 text-slate-300 border-white/10 hover:text-white hover:bg-black/60'
            }`}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={15} className={inWishlist ? 'fill-white' : ''} />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-purple-300">
            <Link
              to={`/marketplace/category/${product.categorySlug}`}
              className="hover:underline font-medium text-[11px] uppercase tracking-wider text-purple-300/90"
            >
              {product.category}
            </Link>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star size={12} className="fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/marketplace/product/${product.slug}`} className="block group-hover:text-purple-300 transition-colors">
            <h3 className="text-base font-bold text-white line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Formats Tags */}
          {product.fileFormats && product.fileFormats.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {product.fileFormats.slice(0, 3).map((fmt, i) => (
                <span
                  key={i}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/5"
                >
                  {fmt}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Pricing & Action Buttons */}
      <div className="p-5 pt-0">
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="ml-2 text-xs text-slate-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/marketplace/product/${product.slug}`}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="View Product Details"
            >
              <Eye size={15} />
            </Link>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                inCart
                  ? 'bg-emerald-600/90 text-white border border-emerald-400/40'
                  : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-purple-950/50'
              }`}
            >
              {inCart ? (
                <>
                  <Check size={14} />
                  <span>In Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProductCard;
