import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Trash2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Container from '../components/ui/Container';
import WishlistItem from '../components/marketplace/WishlistItem';
import EmptyWishlist from '../components/marketplace/EmptyWishlist';

export const WishlistPage = () => {
  const { wishlist, moveAllToCart, clearWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleMoveAllToCart = () => {
    moveAllToCart();
    showToast('All wishlist items moved to your shopping cart!', 'success');
  };

  const handleClearWishlist = () => {
    clearWishlist();
    showToast('Wishlist cleared', 'info');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#05020c] text-white pt-24 pb-20">
        <Container>
          <div className="flex items-center gap-2 text-xs text-purple-400/80 mb-6">
            <Link to="/" className="hover:text-purple-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-purple-600" />
            <Link to="/marketplace" className="hover:text-purple-300 transition-colors">
              Marketplace
            </Link>
            <ChevronRight className="w-3 h-3 text-purple-600" />
            <span className="text-white font-medium">Wishlist</span>
          </div>

          <EmptyWishlist />
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05020c] text-white pt-24 pb-20">
      <Container>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-purple-400/80 mb-6">
          <Link to="/" className="hover:text-purple-300 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-purple-600" />
          <Link to="/marketplace" className="hover:text-purple-300 transition-colors">
            Marketplace
          </Link>
          <ChevronRight className="w-3 h-3 text-purple-600" />
          <span className="text-white font-medium">Saved Items</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-purple-500/10 gap-4">
          <div>
            <span className="text-xs font-bold text-pink-400 uppercase tracking-widest block mb-1">
              Personal Collection
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
              <span>Saved Designs</span>
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-pink-900/30 text-pink-300 border border-pink-500/30">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToCart}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Move All to Cart</span>
            </button>

            <button
              onClick={handleClearWishlist}
              className="p-2.5 rounded-xl text-purple-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Clear Wishlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {wishlist.map((product) => (
            <WishlistItem key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t border-purple-500/10">
          <Link
            to="/marketplace/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors"
          >
            <span>Explore More Templates in Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default WishlistPage;