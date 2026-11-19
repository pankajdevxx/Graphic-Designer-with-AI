import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-[#12092b]/50 border border-purple-500/20 backdrop-blur-xl max-w-xl mx-auto my-8">
      {/* Glow effect & icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-purple-600/30 blur-2xl rounded-full" />
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-900/60 to-violet-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <ShoppingBag className="w-10 h-10" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
        Your Cart is Empty
      </h2>
      <p className="text-purple-300/80 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        Looks like you haven't added any digital design assets yet. Browse our curated collection of logos, UI kits, social media templates, and more!
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link to="/marketplace/products" className="w-full sm:w-auto">
          <PrimaryButton className="w-full flex items-center justify-center gap-2">
            <span>Explore Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </PrimaryButton>
        </Link>
        <Link
          to="/marketplace/categories"
          className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold text-purple-300 hover:text-white bg-[#1a0f35]/60 hover:bg-[#1a0f35] border border-purple-500/30 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          Browse Categories
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;