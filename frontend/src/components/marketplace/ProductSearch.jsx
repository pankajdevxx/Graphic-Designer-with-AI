import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MARKETPLACE_PRODUCTS } from '../../data/marketplaceProducts';
import { CATEGORIES } from '../../data/categories';

/**
 * ProductSearch Component
 * Interactive search bar with instant drop-down suggestions for products and categories.
 */
export const ProductSearch = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search 4,500+ vector logos, UI kits, templates, posters...',
  className = '',
  autoFocus = false,
}) => {
  const [query, setQuery] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions({ products: [], categories: [] });
      return;
    }

    const q = query.toLowerCase();

    const matchedProducts = MARKETPLACE_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchedCategories = CATEGORIES.filter((c) =>
      c.title.toLowerCase().includes(q)
    ).slice(0, 3);

    setSuggestions({ products: matchedProducts, categories: matchedCategories });
  }, [query]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (onChange) onChange(val);
  };

  const handleClear = () => {
    setQuery('');
    if (onChange) onChange('');
    if (onSearch) onSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFocused(false);
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/marketplace/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#12092b]/80 backdrop-blur-xl border border-white/12 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 shadow-xl transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </form>

      {/* Auto-suggest dropdown */}
      {isFocused && (suggestions.products.length > 0 || suggestions.categories.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-[#0f0725]/95 backdrop-blur-2xl border border-purple-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden divide-y divide-white/5">
          {/* Categories Suggestions */}
          {suggestions.categories.length > 0 && (
            <div className="p-3">
              <p className="text-[10px] uppercase font-bold tracking-wider text-purple-300 px-2 mb-1.5 flex items-center gap-1">
                <Sparkles size={11} /> Categories
              </p>
              <div className="space-y-1">
                {suggestions.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/marketplace/category/${cat.slug}`}
                    onClick={() => setIsFocused(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-purple-600/20 hover:text-white transition-colors"
                  >
                    <span>{cat.title}</span>
                    <span className="text-[10px] text-purple-300">
                      {cat.itemCount}+ items
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products Suggestions */}
          {suggestions.products.length > 0 && (
            <div className="p-3">
              <p className="text-[10px] uppercase font-bold tracking-wider text-purple-300 px-2 mb-1.5">
                Designs Matching "{query}"
              </p>
              <div className="space-y-1">
                {suggestions.products.map((prod) => (
                  <Link
                    key={prod.id}
                    to={`/marketplace/product/${prod.slug}`}
                    onClick={() => setIsFocused(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.05] transition-colors"
                  >
                    <img
                      src={prod.previewImages[0]}
                      alt={prod.title}
                      className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">
                        {prod.title}
                      </p>
                      <p className="text-[10px] text-purple-300">
                        {prod.category} • ${prod.price.toFixed(2)}
                      </p>
                    </div>
                    <ArrowRight size={13} className="text-slate-400 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* View All Matches Footer */}
          <div className="p-2.5 bg-white/[0.02] text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-xs font-semibold text-purple-300 hover:text-white inline-flex items-center gap-1.5"
            >
              <span>View all search results for "{query}"</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
