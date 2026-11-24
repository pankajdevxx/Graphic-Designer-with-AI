import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import Container from '../components/ui/Container';
import ProductGrid from '../components/marketplace/ProductGrid';
import SortDropdown from '../components/marketplace/SortDropdown';
import ApiErrorCard from '../components/common/ApiErrorCard';
import { CATEGORIES } from '../data/categories';
import { MARKETPLACE_PRODUCTS } from '../data/marketplaceProducts';

export const MarketplaceSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [apiNotice, setApiNotice] = useState(null);

  useEffect(() => {
    setSearchInput(queryParam);
  }, [queryParam]);

  // Load category filter options with automatic local fallback
  useEffect(() => {
    categoryService.getAllCategories()
      .then((cats) => {
        const list = Array.isArray(cats) ? cats : cats?.results || [];
        if (list.length > 0) {
          setCategories(list);
        } else {
          setCategories(
            CATEGORIES.map((c) => ({
              id: c.id,
              name: c.title,
              slug: c.slug,
              product_count: c.itemCount || 10,
            }))
          );
        }
      })
      .catch(() => {
        setCategories(
          CATEGORIES.map((c) => ({
            id: c.id,
            name: c.title,
            slug: c.slug,
            product_count: c.itemCount || 10,
          }))
        );
      });
  }, []);

  // Filter client-side catalog matching query and category
  const filterLocalSearch = useCallback(() => {
    let list = [...MARKETPLACE_PRODUCTS];

    if (queryParam.trim()) {
      const q = queryParam.toLowerCase().trim();
      list = list.filter((p) => {
        const matchTitle = (p.title || '').toLowerCase().includes(q);
        const matchDesc = (p.description || '').toLowerCase().includes(q);
        const matchCat = (p.category || '').toLowerCase().includes(q);
        const matchTags = Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(q));
        return matchTitle || matchDesc || matchCat || matchTags;
      });
    }

    if (activeCategory !== 'All') {
      const catLower = activeCategory.toLowerCase().trim();
      list = list.filter((p) => {
        const pCat = (p.category || p.category_title || '').toLowerCase();
        const pSlug = (p.categorySlug || p.category_slug || '').toLowerCase();
        return pCat === catLower || pSlug === catLower;
      });
    }

    // Sort
    if (sortBy === 'price-low' || sortBy === 'price_asc') {
      list.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
    } else if (sortBy === 'price-high' || sortBy === 'price_desc') {
      list.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
    } else if (sortBy === 'highest-rated' || sortBy === 'rating') {
      list.sort((a, b) => (parseFloat(b.rating || b.average_rating) || 0) - (parseFloat(a.rating || a.average_rating) || 0));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNew || b.is_new ? 1 : 0) - (a.isNew || a.is_new ? 1 : 0));
    } else {
      list.sort((a, b) => (parseFloat(b.salesCount || b.sales_count) || 0) - (parseFloat(a.salesCount || a.sales_count) || 0));
    }

    return list;
  }, [queryParam, activeCategory, sortBy]);

  // Fetch search results from Django REST API with seamless local fallback
  const performSearch = useCallback(async () => {
    setIsLoading(true);
    setApiNotice(null);
    try {
      const params = {
        sort: sortBy,
      };
      if (queryParam.trim()) {
        params.q = queryParam.trim();
      }
      if (activeCategory !== 'All') {
        params.category = activeCategory;
      }

      const data = await productService.getProducts(params);
      const results = Array.isArray(data) ? data : data.results || [];
      const count = data.count !== undefined ? data.count : results.length;

      if (results.length > 0) {
        setSearchResults(results);
        setTotalCount(count);
      } else {
        const local = filterLocalSearch();
        setSearchResults(local);
        setTotalCount(local.length);
      }
    } catch (err) {
      console.warn('Backend search request unsuccessful, using cached assets:', err);
      const local = filterLocalSearch();
      setSearchResults(local);
      setTotalCount(local.length);
      setApiNotice('Displaying cached design search results.');
    } finally {
      setIsLoading(false);
    }
  }, [queryParam, activeCategory, sortBy, filterLocalSearch]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleSuggestedClick = (term) => {
    setSearchInput(term);
    setSearchParams({ q: term });
  };

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
          <span className="text-white font-medium">Search</span>
        </div>

        {/* Search Header Form */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-1">
            Database Query Engine
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Search Design Assets
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto mb-4">
            <Search className="w-5 h-5 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by title, tag, software, or design discipline..."
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-[#12092b]/90 border border-purple-500/40 text-white placeholder-purple-400/60 text-sm sm:text-base focus:outline-none focus:border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Quick Suggestions */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-purple-300/80">
            <span>Popular searches:</span>
            {['Minimalist Logo', 'Figma UI Kit', 'Instagram Carousel', 'Brand Identity', 'Landing Page', 'YouTube'].map(
              (term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSuggestedClick(term)}
                  className="px-2.5 py-1 rounded-full bg-purple-900/30 hover:bg-purple-800/50 border border-purple-500/30 text-purple-300 hover:text-white transition-colors cursor-pointer"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>

        {/* Results Metadata & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-purple-500/10">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-1">
              Search Results
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {queryParam ? (
                <>
                  Results for "<span className="text-purple-300">{queryParam}</span>" ({totalCount})
                </>
              ) : (
                `All Designs (${totalCount})`
              )}
            </div>
          </div>

          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'All'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-[#12092b]/60 border border-purple-500/20 text-purple-300 hover:text-white hover:border-purple-500/40'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.slug || cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.slug || activeCategory === cat.name
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-[#12092b]/60 border border-purple-500/20 text-purple-300 hover:text-white hover:border-purple-500/40'
              }`}
            >
              {cat.name} {cat.product_count !== undefined && `(${cat.product_count})`}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={searchResults}
          columns={4}
          isLoading={isLoading}
          onResetFilters={() => {
            setSearchInput('');
            setSearchParams({});
            setActiveCategory('All');
          }}
        />
      </Container>
    </div>
  );
};

export default MarketplaceSearchPage;
