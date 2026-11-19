import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  Sparkles,
  Compass,
  Palette,
  Camera,
  Flame,
  Layers,
  Video,
  Monitor,
  CreditCard,
  FileText,
  Presentation,
  Layout,
  Smartphone,
  Globe,
  Megaphone,
  ArrowRight,
  Search,
} from 'lucide-react';
import categoryService from '../services/categoryService';
import productService from '../services/productService';
import Container from '../components/ui/Container';
import ProductGrid from '../components/marketplace/ProductGrid';
import SortDropdown from '../components/marketplace/SortDropdown';
import ApiErrorCard from '../components/common/ApiErrorCard';

const ICON_MAP = {
  Sparkles,
  Compass,
  Palette,
  Camera,
  Flame,
  Layers,
  Video,
  Monitor,
  CreditCard,
  FileText,
  Presentation,
  Layout,
  Smartphone,
  Globe,
  Megaphone,
};

export const CategoryDetailPage = () => {
  const { slug } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [otherCategories, setOtherCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchCategoryAndProducts = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const [catData, prodData, allCats] = await Promise.all([
        categoryService.getCategoryBySlug(slug),
        productService.getProducts({
          category: slug,
          q: searchQuery.trim() || undefined,
          sort: sortBy,
        }),
        categoryService.getAllCategories(),
      ]);

      setCategoryInfo(catData);
      setProducts(Array.isArray(prodData) ? prodData : prodData.results || []);

      const others = (Array.isArray(allCats) ? allCats : allCats.results || [])
        .filter((c) => c.slug.toLowerCase() !== (slug || '').toLowerCase())
        .slice(0, 4);
      setOtherCategories(others);
    } catch (err) {
      console.error('Failed to load category products:', err);
      setApiError(err.message || 'Unable to connect to MySQL database.');
    } finally {
      setIsLoading(false);
    }
  }, [slug, searchQuery, sortBy]);

  useEffect(() => {
    fetchCategoryAndProducts();
  }, [fetchCategoryAndProducts]);

  const IconComponent = ICON_MAP[categoryInfo?.icon_name] || Sparkles;

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
          <Link to="/marketplace/categories" className="hover:text-purple-300 transition-colors">
            Categories
          </Link>
          <ChevronRight className="w-3 h-3 text-purple-600" />
          <span className="text-white font-medium">
            {categoryInfo?.name || slug}
          </span>
        </div>

        {apiError ? (
          <ApiErrorCard
            title="Category Not Available"
            message={apiError}
            onRetry={fetchCategoryAndProducts}
          />
        ) : (
          <>
            {/* Category Hero Banner */}
            <div className="relative rounded-3xl bg-gradient-to-r from-[#170a33] via-[#12082b] to-[#0d0420] border border-purple-500/30 p-8 sm:p-12 mb-12 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)]">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-start sm:items-center gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-900/40 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs uppercase font-bold tracking-widest text-purple-400">
                        Category Hub (MySQL Live)
                      </span>
                      {categoryInfo?.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {categoryInfo.badge}
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                      {categoryInfo?.name || slug}
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-purple-200/80 max-w-2xl leading-relaxed">
                      {categoryInfo?.description || 'Explore high-end digital design templates.'}
                    </p>
                  </div>
                </div>

                <div className="text-left md:text-right shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-purple-500/20">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    {products.length}
                  </div>
                  <div className="text-xs text-purple-400/80">
                    Templates in MySQL Database
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Sort Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search in ${categoryInfo?.name || 'this category'}...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#12092b]/80 border border-purple-500/30 text-white placeholder-purple-400/50 text-xs sm:text-sm focus:outline-none focus:border-purple-400 backdrop-blur-md"
                />
              </div>

              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {/* Category Products Grid */}
            <div className="mb-16">
              <ProductGrid
                products={products}
                columns={4}
                isLoading={isLoading}
                onResetFilters={() => setSearchQuery('')}
              />
            </div>

            {/* Explore Other Categories */}
            {otherCategories.length > 0 && (
              <div className="pt-12 border-t border-purple-500/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Explore More Design Categories
                  </h3>
                  <Link
                    to="/marketplace/categories"
                    className="text-xs sm:text-sm font-semibold text-purple-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>View All 15</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {otherCategories.map((c) => {
                    const OtherIcon = ICON_MAP[c.icon_name] || Sparkles;
                    return (
                      <Link
                        key={c.id}
                        to={`/marketplace/category/${c.slug}`}
                        className="p-4 rounded-2xl bg-[#12092b]/60 border border-purple-500/20 hover:border-purple-500/50 backdrop-blur-md transition-all flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-purple-900/30 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <OtherIcon className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <div className="text-sm font-bold text-white group-hover:text-purple-300 truncate">
                            {c.name}
                          </div>
                          <div className="text-xs text-purple-400/80">
                            {c.product_count} {c.product_count === 1 ? 'asset' : 'assets'}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default CategoryDetailPage;