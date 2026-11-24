import React from 'react';
import { Filter, X, RotateCcw, Check, Star } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { MARKETPLACE_PRODUCTS } from '../../data/marketplaceProducts';

/**
 * ProductFilter Component
 * Sidebar and modal filter controller managing categories, price thresholds, ratings, and special flags.
 * Supports both object-based filters pattern ({ filters, onFilterChange, onReset })
 * and individual props ({ selectedCategory, onSelectCategory, priceRange, onPriceChange, ... })
 */
export const ProductFilter = ({
  // 1. Object-based prop signature
  filters,
  onFilterChange,
  onReset,
  totalCount,

  // 2. Individual prop signatures (backwards compatibility)
  selectedCategory = 'All',
  onSelectCategory,
  priceRange = [0, 200],
  onPriceChange,
  minRating = 0,
  onRatingChange,
  flags = { featuredOnly: false, trendingOnly: false, onSaleOnly: false },
  onFlagChange,
  onResetFilters,

  // 3. UI and layout props
  className = '',
  isMobileDrawer = false,
  onCloseMobile,
}) => {
  // Resolve effective active values from either object-style or individual props
  const activeCategory = filters?.category !== undefined ? filters.category : selectedCategory;
  const activePrice = filters?.priceRange !== undefined ? filters.priceRange : priceRange;
  const activeRating = filters?.minRating !== undefined ? filters.minRating : minRating;
  const activeFlags = {
    featuredOnly: Boolean(filters?.featuredOnly ?? flags?.featuredOnly),
    trendingOnly: Boolean(filters?.trendingOnly ?? flags?.trendingOnly),
    onSaleOnly: Boolean(filters?.onSaleOnly ?? flags?.onSaleOnly),
  };

  // Calculate live count per category from demo catalog
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat.slug] = MARKETPLACE_PRODUCTS.filter(
      (p) =>
        p.categorySlug === cat.slug ||
        (p.category && p.category.toLowerCase() === cat.title.toLowerCase())
    ).length;
    return acc;
  }, {});

  const pricePresets = [
    { label: 'All Prices', min: 0, max: 200 },
    { label: 'Under $30', min: 0, max: 30 },
    { label: '$30 to $50', min: 30, max: 50 },
    { label: '$50 & Above', min: 50, max: 200 },
  ];

  // Helper handlers that fire both unified object-change & individual callbacks
  const handleCategorySelect = (categoryVal) => {
    if (onFilterChange) {
      onFilterChange({
        category: categoryVal,
        priceRange: activePrice,
        minRating: activeRating,
        ...activeFlags,
        ...(filters || {}),
        category: categoryVal,
      });
    }
    if (onSelectCategory) {
      onSelectCategory(categoryVal);
    }
  };

  const handlePriceSelect = (min, max) => {
    const newRange = [min, max];
    if (onFilterChange) {
      onFilterChange({
        category: activeCategory,
        priceRange: newRange,
        minRating: activeRating,
        ...activeFlags,
        ...(filters || {}),
        priceRange: newRange,
      });
    }
    if (onPriceChange) {
      onPriceChange(newRange);
    }
  };

  const handleRatingSelect = (val) => {
    if (onFilterChange) {
      onFilterChange({
        category: activeCategory,
        priceRange: activePrice,
        minRating: val,
        ...activeFlags,
        ...(filters || {}),
        minRating: val,
      });
    }
    if (onRatingChange) {
      onRatingChange(val);
    }
  };

  const handleFlagToggle = (key, checked) => {
    const updatedFlags = { ...activeFlags, [key]: checked };
    if (onFilterChange) {
      onFilterChange({
        category: activeCategory,
        priceRange: activePrice,
        minRating: activeRating,
        ...updatedFlags,
        ...(filters || {}),
        [key]: checked,
      });
    }
    if (onFlagChange) {
      onFlagChange(key, checked);
    }
  };

  const handleResetAll = () => {
    if (onReset) {
      onReset();
    }
    if (onResetFilters) {
      onResetFilters();
    }
  };

  const isAllSelected = !activeCategory || activeCategory === 'All' || activeCategory === '';

  const isCatActive = (cat) => {
    if (isAllSelected) return false;
    const current = String(activeCategory).toLowerCase();
    return current === cat.slug.toLowerCase() || current === cat.title.toLowerCase();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-purple-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Filters
          </h3>
          {totalCount !== undefined && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300">
              {totalCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetAll}
            className="text-xs text-purple-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset all filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
          {isMobileDrawer && onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 ml-2 cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Design Categories
          </h4>
          {!isAllSelected && (
            <button
              type="button"
              onClick={() => handleCategorySelect('All')}
              className="text-[11px] text-purple-400 hover:text-purple-200 underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-1 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => handleCategorySelect('All')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              isAllSelected
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-950'
                : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] opacity-75">
              {MARKETPLACE_PRODUCTS.length}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.slug] || 0;
            const isSelected = isCatActive(cat);

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
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
              activePrice[0] === preset.min && activePrice[1] === preset.max;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handlePriceSelect(preset.min, preset.max)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-purple-600/50 border-purple-400 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'bg-white/[0.03] border-white/8 text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
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
          ].map((item) => {
            const isCurrent = activeRating === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleRatingSelect(item.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-purple-600/40 text-purple-200 border border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                    : 'text-slate-300 hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Star
                    size={13}
                    className={item.value > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}
                  />
                  <span>{item.label}</span>
                </div>
                {isCurrent && <Check size={14} className="text-purple-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Special Product Flags */}
      <div className="space-y-2.5 pt-4 border-t border-white/8">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Special Collections
        </h4>

        <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={activeFlags.featuredOnly}
            onChange={(e) => handleFlagToggle('featuredOnly', e.target.checked)}
            className="w-4 h-4 rounded bg-white/5 border-white/20 text-purple-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-purple-600"
          />
          <span>Featured Assets Only</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={activeFlags.trendingOnly}
            onChange={(e) => handleFlagToggle('trendingOnly', e.target.checked)}
            className="w-4 h-4 rounded bg-white/5 border-white/20 text-purple-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-purple-600"
          />
          <span>Trending Designs</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={activeFlags.onSaleOnly}
            onChange={(e) => handleFlagToggle('onSaleOnly', e.target.checked)}
            className="w-4 h-4 rounded bg-white/5 border-white/20 text-purple-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-purple-600"
          />
          <span>Discounted Special Offers</span>
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;
