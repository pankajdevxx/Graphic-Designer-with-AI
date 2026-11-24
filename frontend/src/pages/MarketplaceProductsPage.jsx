import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

/**
 * Filter and sort client-side catalog with complete parity to Django QuerySet logic
 */
const filterClientProducts = (catalog, filters, query, sort) => {
  let list = [...catalog];

  // 1. Category Filter
  if (filters.category && filters.category !== 'All' && filters.category !== '') {
    const catLower = filters.category.toLowerCase().trim();
    list = list.filter((p) => {
      const pCat = (p.category || p.category_title || '').toLowerCase();
      const pSlug = (p.categorySlug || p.category_slug || '').toLowerCase();
      return pCat === catLower || pSlug === catLower;
    });
  }

  // 2. Search Query Filter
  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter((p) => {
      const matchTitle = (p.title || '').toLowerCase().includes(q);
      const matchDesc = (p.description || '').toLowerCase().includes(q);
      const matchCat = (p.category || '').toLowerCase().includes(q);
      const matchTags = Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCat || matchTags;
    });
  }

  // 3. Price Range Filter
  if (filters.priceRange && Array.isArray(filters.priceRange)) {
    const [minPrice, maxPrice] = filters.priceRange;
    list = list.filter((p) => {
      const price = parseFloat(p.price) || 0;
      return price >= minPrice && price <= maxPrice;
    });
  }

  // 4. Rating Filter
  if (filters.minRating && filters.minRating > 0) {
    list = list.filter((p) => {
      const rating = parseFloat(p.rating || p.average_rating) || 0;
      return rating >= filters.minRating;
    });
  }

  // 5. Merchandising Flags
  if (filters.featuredOnly) {
    list = list.filter((p) => Boolean(p.featured || p.is_featured));
  }
  if (filters.trendingOnly) {
    list = list.filter((p) => Boolean(p.trending || p.is_trending));
  }
  if (filters.onSaleOnly) {
    list = list.filter((p) => Boolean(p.onSale || p.on_sale || (p.discount && p.discount > 0)));
  }

  // 6. Sorting
  if (sort === 'price-low' || sort === 'price_asc') {
    list.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
  } else if (sort === 'price-high' || sort === 'price_desc') {
    list.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
  } else if (sort === 'highest-rated' || sort === 'rating') {
    list.sort((a, b) => (parseFloat(b.rating || b.average_rating) || 0) - (parseFloat(a.rating || a.average_rating) || 0));
  } else if (sort === 'newest') {
    list.sort((a, b) => (b.isNew || b.is_new ? 1 : 0) - (a.isNew || a.is_new ? 1 : 0));
  } else {
    // popular default
    list.sort((a, b) => (parseFloat(b.salesCount || b.sales_count) || 0) - (parseFloat(a.salesCount || a.sales_count) || 0));
  }

  return list;
};

export const MarketplaceProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial URL params
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';
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
  const [apiNotice, setApiNotice] = useState(null);

  // Sync category & query param if URL changes externally
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== filters.category) {
      setFilters((prev) => ({ ...prev, category: cat }));
    }
    const q = searchParams.get('q') || searchParams.get('search');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Fetch live products from Django REST API or fallback to client filtering
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setApiNotice(null);
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
        // Apply full client filtering on sample catalog if database has 0 matching records
        const fallback = filterClientProducts(MARKETPLACE_PRODUCTS, filters, searchQuery, sortBy);
        setProducts(fallback);
        setTotalCount(fallback.length);
      }
    } catch (err) {
      console.warn('API query unsuccessful, operating in local catalog mode:', err);
      const fallback = filterClientProducts(MARKETPLACE_PRODUCTS, filters, searchQuery, sortBy);
      setProducts(fallback);
      setTotalCount(fallback.length);
      setApiNotice('Connecting with cached design catalog.');
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
    setSortBy('popular');
    setSearchParams({});
  };

  const hasActiveFilters =
    (filters.category && filters.category !== 'All') ||
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
              Marketplace Catalog
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
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#12092b] border border-purple-500/30 text-purple-300 text-xs font-semibold hover:border-purple-400 transition-all cursor-pointer"
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

            {filters.category && filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                Category: {filters.category}
                <button
                  type="button"
                  onClick={() => handleFilterChange({ ...filters, category: 'All' })}
                  aria-label="Remove category filter"
                  className="hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 200) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
                <button
                  type="button"
                  onClick={() => handleFilterChange({ ...filters, priceRange: [0, 200] })}
                  aria-label="Reset price filter"
                  className="hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                Rating &ge; {filters.minRating}★
                <button
                  type="button"
                  onClick={() => handleFilterChange({ ...filters, minRating: 0 })}
                  aria-label="Reset rating filter"
                  className="hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.featuredOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                Featured
                <button
                  type="button"
                  onClick={() => handleFilterChange({ ...filters, featuredOnly: false })}
                  aria-label="Remove featured filter"
                  className="hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.trendingOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                Trending
                <button
                  type="button"
                  onClick={() => handleFilterChange({ ...filters, trendingOnly: false })}
                  aria-label="Remove trending filter"
                  className="hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.onSaleOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                On Sale
                <button
                  type="button"
                  onClick={() => handleFilterChange({ ...filters, onSaleOnly: false })}
                  aria-label="Remove on-sale filter"
                  className="hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                Search: "{searchQuery}"
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-purple-400 hover:text-white underline ml-auto transition-colors cursor-pointer"
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

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={products}
              columns={3}
              isLoading={isLoading}
              onResetFilters={handleResetFilters}
            />
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
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    aria-label="Close filter drawer"
                    className="p-2 rounded-xl text-purple-400 hover:text-white bg-purple-900/30 transition-colors cursor-pointer"
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
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
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
