import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ShoppingBag,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Container from '../components/ui/Container';
import CartItem from '../components/marketplace/CartItem';
import EmptyCart from '../components/marketplace/EmptyCart';
import CheckoutModal from '../components/marketplace/CheckoutModal';

export const CartPage = () => {
  const {
    cart,
    clearCart,
    subtotal,
    discountPercent,
    discountAmount,
    total,
    couponCode,
    couponError,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const { showToast } = useToast();

  const [couponInput, setCouponInput] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      showToast(res.message, 'success');
      setCouponInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleClearCart = () => {
    clearCart();
    showToast('Your cart has been cleared', 'info');
  };

  if (cart.length === 0) {
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
            <span className="text-white font-medium">Cart</span>
          </div>

          <EmptyCart />
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
          <span className="text-white font-medium">Shopping Cart</span>
        </div>

        {/* Page Title */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-purple-500/10">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-1">
              Your Selection
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
              <span>Shopping Cart</span>
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 border border-purple-500/30">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </h1>
          </div>

          <button
            onClick={handleClearCart}
            className="text-xs text-purple-400 hover:text-red-400 transition-colors flex items-center gap-1.5 p-2 rounded-xl hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Cart</span>
          </button>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <CartItem key={`${item.product.id}-${item.licenseType}`} item={item} />
            ))}

            {/* Bottom Actions */}
            <div className="pt-4 flex items-center justify-between">
              <Link
                to="/marketplace/products"
                className="text-xs sm:text-sm font-semibold text-purple-300 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span>&larr; Continue Exploring Templates</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="p-6 rounded-3xl bg-[#12092b]/80 border border-purple-500/30 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.15)] space-y-6">
                <h2 className="text-xl font-bold text-white border-b border-purple-500/20 pb-3">
                  Order Summary
                </h2>

                {/* Subtotal, Discount & Total */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-purple-200">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">${Math.round(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Discount ({couponCode} -{discountPercent}%)</span>
                      </span>
                      <span>-${Math.round(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-purple-200">
                    <span>Estimated Tax</span>
                    <span className="text-white font-medium">$0 (Digital Exemption)</span>
                  </div>

                  <div className="pt-4 border-t border-purple-500/20 flex justify-between items-baseline">
                    <span className="text-base font-bold text-white">Estimated Total</span>
                    <span className="text-2xl font-extrabold text-white">
                      ${Math.round(total)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-purple-500/20">
                  {couponCode ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                      <div className="flex items-center gap-2 font-medium">
                        <Check className="w-4 h-4" />
                        <span>Promo Code Applied: <strong>{couponCode}</strong></span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-emerald-400 hover:text-emerald-200 underline font-semibold ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Promo code (e.g. PIXEL20)"
                          className="flex-1 px-3 py-2 rounded-xl bg-[#0b041a] border border-purple-500/30 text-white placeholder-purple-400/50 text-xs focus:outline-none focus:border-purple-400 uppercase"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-semibold text-xs transition-colors shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <div className="text-[11px] text-red-400 pl-1">{couponError}</div>
                      )}
                    </form>
                  )}
                </div>

                {/* Checkout Trigger Button */}
                <Link to="/checkout" className="block w-full">
                  <button
                    className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                {/* Trust Badges */}
                <div className="pt-2 space-y-2 text-xs text-purple-300/80">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Instant download access after payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Standard & Extended commercial license protection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default CartPage;