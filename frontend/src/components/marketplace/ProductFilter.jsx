import React from 'react';
import { Filter, X, RotateCcw, Check, Star } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { MARKETPLACE_PRODUCTS } from '../../data/marketplaceProducts';

/**
 * ProductFilter Component
 * Sidebar and modal filter controller managing categories, price thresholds, ratings, and special flags.
 */
export const ProductFilter = ({
  selectedCategory = 'All',
  onSelectCategory,
  priceRange = [0, 150],
  onPriceChange,
  minRating = 0,
  onRatingChange,
  flags = { featuredOnly: false, trendingOnly: false, onSaleOnly: false },
  onFlagChange,
  onResetFilters,
  className = '',
  isMobileDrawer = false,
  onCloseMobile,
}) => {
  // Count available demo products per category
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat.slug] = MARKETPLACE_PRODUCTS.filter(
      (p) => p.categorySlug === cat.slug
    ).length;
    return acc;
  }, {});

  const pricePresets = [
    { label: 'All Prices', min: 0, max: 200 },
    { label: 'Under $30', min: 0, max: 30 },
    { label: '$30 to $50', min: 30, max: 50 },
    { label: '$50 & Above', min: 50, max: 200 },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-purple-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Filters
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
            title="Reset all filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
          {isMobileDrawer && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 ml-2"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Design Categories
        </h4>
        <div className="space-y-1 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => onSelectCategory('All')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-950'
                : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] opacity-75">
              {MARKETPLACE_PRODUCTS.length}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.slug] || 0;
            const isSelected =
              selectedCategory.toLowerCase() === cat.slug.toLowerCase() ||
              selectedCategory.toLowerCase() === cat.title.toLowerCase();

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-950'
                    : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <span className="truncate pr-2">{cat.title}</span>
                <span className="text-[10px] opacity-60 shrink-0">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range Presets */}
      <div className="space-y-3 pt-4 border-t border-white/8">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Price Range
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {pricePresets.map((preset, idx) => {
            const isCurrent =
              priceRange[0] === preset.min && priceRange[1] === preset.max;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onPriceChange([preset.min, preset.max])}
                className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                  isCurrent
                    ? 'bg-purple-600/40 border-purple-400 text-purple-200'
                    : 'bg-white/[0.03] border-white/8 text-slate-300 hover:bg-white/[0.06]'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Rating Threshold */}
      <div className="space-y-3 pt-4 border-t border-white/8">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Minimum Rating
        </h4>
        <div className="space-y-1.5">
          {[
            { label: '4.8 Stars & Up', value: 4.8 },
            { label: '4.5 Stars & Up', value: 4.5 },
            { label: 'All Ratings', value: 0 },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onRatingChange(item.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                minRating === item.value
                  ? 'bg-purple-600/30 text-purple-200 border border-purple-400/40'
                  : 'text-slate-300 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Star size={13} className="text-amber-400 fill-amber-400" />
                <span>{item.label}</span>
              </div>
              {minRating === item.value && <Check size={14} className="text-purple-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Special Product Flags */}
      <div className="space-y-2.5 pt-4 border-t border-white/8">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Special Collections
        </h4>

        <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={flags.featuredOnly}
            onChange={(e) => onFlagChange('featuredOnly', e.target.checked)}
            className="w-4 h-4 rounded bg-white/5 border-white/20 text-purple-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <span>Featured Assets Only</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={flags.trendingOnly}
            onChange={(e) => onFlagChange('trendingOnly', e.target.checked)}
            className="w-4 h-4 rounded bg-white/5 border-white/20 text-purple-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <span>Trending Designs</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={flags.onSaleOnly}
            onChange={(e) => onFlagChange('onSaleOnly', e.target.checked)}
            className="w-4 h-4 rounded bg-white/5 border-white/20 text-purple-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <span>Discounted Special Offers</span>
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;
