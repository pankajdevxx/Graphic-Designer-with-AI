import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';
import productService from '../services/productService';
import Container from '../components/ui/Container';
import ProductGrid from '../components/marketplace/ProductGrid';
import ProductFilter from '../components/marketplace/ProductFilter';
import ProductSearch from '../components/marketplace/ProductSearch';
import SortDropdown from '../components/marketplace/SortDropdown';
import ApiErrorCard from '../components/common/ApiErrorCard';
import { MARKETPLACE_PRODUCTS } from '../data/marketplaceProducts';

export const MarketplaceProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial URL params
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';
  const initialSort = searchParams.get('sort') || 'popular';

  // Filters state
  const [filters, setFilters] = useState({
    category: initialCategory,
    priceRange: [0, 200],
    minRating: 0,
    featuredOnly: false,
    trendingOnly: false,
    onSaleOnly: false,
  });

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState(initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [apiError, setApiError] = useState(null);

  // Sync category & query param if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== filters.category) {
      setFilters((prev) => ({ ...prev, category: cat }));
    }
    const q = searchParams.get('q');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Fetch live products from Django REST API & MySQL
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const apiParams = {
        sort: sortBy,
      };

      if (searchQuery.trim()) {
        apiParams.q = searchQuery.trim();
      }

      if (filters.category && filters.category !== 'All') {
        apiParams.category = filters.category;
      }

      if (filters.priceRange[0] > 0) {
        apiParams.min_price = filters.priceRange[0];
      }
      if (filters.priceRange[1] < 200) {
        apiParams.max_price = filters.priceRange[1];
      }

      if (filters.minRating > 0) {
        apiParams.min_rating = filters.minRating;
      }

      if (filters.featuredOnly) apiParams.featured = true;
      if (filters.trendingOnly) apiParams.trending = true;
      if (filters.onSaleOnly) apiParams.on_sale = true;

      const data = await productService.getProducts(apiParams);
      const results = Array.isArray(data) ? data : data.results || [];
      const count = data.count !== undefined ? data.count : results.length;

      if (results.length > 0) {
        setProducts(results);
        setTotalCount(count);
      } else {
        // Fallback to sample catalog if database currently empty
        let fallback = [...MARKETPLACE_PRODUCTS];
        if (filters.category && filters.category !== 'All') {
          fallback = fallback.filter((p) => (p.category_title || p.category) === filters.category);
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          fallback = fallback.filter((p) => p.title.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
        }
        setProducts(fallback);
        setTotalCount(fallback.length);
      }
    } catch (err) {
      console.warn('Failed to query products from API, using offline catalog:', err);
      let fallback = [...MARKETPLACE_PRODUCTS];
      if (filters.category && filters.category !== 'All') {
        fallback = fallback.filter((p) => (p.category_title || p.category) === filters.category);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        fallback = fallback.filter((p) => p.title.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
      }
      setProducts(fallback);
      setTotalCount(fallback.length);
      setApiError('Django backend is offline or starting up. Showing cached design catalog.');
    } finally {
      setIsLoading(false);
    }
  }, [filters, searchQuery, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      priceRange: [0, 200],
      minRating: 0,
      featuredOnly: false,
      trendingOnly: false,
      onSaleOnly: false,
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 200 ||
    filters.minRating > 0 ||
    filters.featuredOnly ||
    filters.trendingOnly ||
    filters.onSaleOnly ||
    searchQuery.trim().length > 0;

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
          <span className="text-white font-medium">All Templates & UI Kits</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-purple-500/10 pb-6">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-1">
              Marketplace Catalog (MySQL 8.0 Live)
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Explore Digital Assets
            </h1>
          </div>

          <div className="text-sm text-purple-300/80">
            Showing <span className="font-bold text-white">{totalCount}</span> results
          </div>
        </div>

        {/* Controls Bar: Search, Mobile Filter Toggle, Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex-1 max-w-lg">
            <ProductSearch
              initialQuery={searchQuery}
              onSearchSubmit={(q) => setSearchQuery(q)}
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#12092b] border border-purple-500/30 text-purple-300 text-xs font-semibold hover:border-purple-400 transition-all"
            >
              <Filter className="w-4 h-4 text-purple-400" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              )}
            </button>

            {/* Sort Dropdown */}
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-8 p-3 rounded-2xl bg-[#100727]/60 border border-purple-500/20 backdrop-blur-md">
            <span className="text-xs text-purple-400 font-semibold pl-1">Active Filters:</span>

            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                Category: {filters.category}
                <button
                  onClick={() => handleFilterChange({ ...filters, category: 'All' })}
                  aria-label="Remove category filter"
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 200) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
                <button
                  onClick={() => handleFilterChange({ ...filters, priceRange: [0, 200] })}
                  aria-label="Reset price filter"
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                Rating &ge; {filters.minRating}★
                <button
                  onClick={() => handleFilterChange({ ...filters, minRating: 0 })}
                  aria-label="Reset rating filter"
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.featuredOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                Featured
                <button
                  onClick={() => handleFilterChange({ ...filters, featuredOnly: false })}
                  aria-label="Remove featured filter"
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.trendingOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                Trending
                <button
                  onClick={() => handleFilterChange({ ...filters, trendingOnly: false })}
                  aria-label="Remove trending filter"
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.onSaleOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                On Sale
                <button
                  onClick={() => handleFilterChange({ ...filters, onSaleOnly: false })}
                  aria-label="Remove on-sale filter"
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs text-purple-400 hover:text-white underline ml-auto transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* 2-Column Marketplace Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <ProductFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                totalCount={totalCount}
              />
            </div>
          </div>

          {/* Product Grid Area or API Error */}
          <div className="lg:col-span-3">
            {apiError && products.length === 0 ? (
              <ApiErrorCard
                title="Failed to Load Catalog"
                message={apiError}
                onRetry={fetchProducts}
              />
            ) : (
              <>
                {apiError && (
                  <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-200">
                    <span>{apiError}</span>
                    <button
                      onClick={fetchProducts}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-white font-medium transition-colors"
                    >
                      Retry Live Connection
                    </button>
                  </div>
                )}
                <ProductGrid
                  products={products}
                  columns={3}
                  isLoading={isLoading}
                  onResetFilters={handleResetFilters}
                />
              </>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer Modal */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="w-full max-w-sm h-full bg-[#0a0418] border-l border-purple-500/30 p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-4">
                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    <Filter className="w-5 h-5 text-purple-400" />
                    <span>Filter Catalog</span>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    aria-label="Close filter drawer"
                    className="p-2 rounded-xl text-purple-400 hover:text-white bg-purple-900/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <ProductFilter
                  filters={filters}
                  onFilterChange={(newF) => {
                    handleFilterChange(newF);
                  }}
                  onReset={handleResetFilters}
                  totalCount={totalCount}
                />

                <div className="mt-6 pt-4 border-t border-purple-500/20">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                  >
                    Show {totalCount} Results
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default MarketplaceProductsPage;