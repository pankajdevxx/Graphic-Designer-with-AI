import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Tag,
  ArrowRight,
  Layers,
  ShieldCheck,
  Zap,
  Compass,
  Palette,
  Camera,
  Flame,
  Video,
  Monitor,
  CreditCard,
  FileText,
  Presentation,
  Layout,
  Smartphone,
  Globe,
  Megaphone,
} from 'lucide-react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import Container from '../components/ui/Container';
import MarketplaceHero from '../components/marketplace/MarketplaceHero';
import ProductGrid from '../components/marketplace/ProductGrid';
import PromoBanner from '../components/marketplace/PromoBanner';
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

export const MarketplacePage = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [categories, setCategories] = useState([]);
  const [tabProducts, setTabProducts] = useState({
    featured: [],
    trending: [],
    bestsellers: [],
    new: [],
    offers: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchMarketplaceData = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const [cats, feat, trend, newArr, offers] = await Promise.all([
        categoryService.getAllCategories(),
        productService.getFeaturedProducts(8),
        productService.getTrendingProducts(8),
        productService.getNewArrivals(8),
        productService.getProducts({ on_sale: true, page_size: 8 }),
      ]);

      setCategories(Array.isArray(cats) ? cats : cats.results || []);
      setTabProducts({
        featured: feat || [],
        trending: trend || [],
        bestsellers: trend || [], // Bestsellers mapped to high sales velocity
        new: newArr || [],
        offers: offers?.results || offers || [],
      });
    } catch (err) {
      console.error('Marketplace API fetch failed:', err);
      setApiError(err.message || 'Unable to connect to Django API.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  const getActiveProducts = () => {
    return tabProducts[activeTab] || [];
  };

  return (
    <div className="min-h-screen bg-[#05020c] text-white pt-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <MarketplaceHero />

      {/* 2. VALUE PROPOSITION STRIP */}
      <section className="py-8 border-y border-purple-500/10 bg-[#0d061e]/40 backdrop-blur-md">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center justify-center p-3">
              <Zap className="w-6 h-6 text-purple-400 mb-2" />
              <div className="font-bold text-white text-sm sm:text-base">Instant Downloads</div>
              <div className="text-xs text-purple-300/70">Immediate access to source files</div>
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              <ShieldCheck className="w-6 h-6 text-purple-400 mb-2" />
              <div className="font-bold text-white text-sm sm:text-base">Commercial Licenses</div>
              <div className="text-xs text-purple-300/70">100% royalty-free usage rights</div>
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              <Layers className="w-6 h-6 text-purple-400 mb-2" />
              <div className="font-bold text-white text-sm sm:text-base">Multi-Format Files</div>
              <div className="text-xs text-purple-300/70">Figma, AI, PSD & Scalable SVG</div>
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              <Sparkles className="w-6 h-6 text-purple-400 mb-2" />
              <div className="font-bold text-white text-sm sm:text-base">Curated Quality</div>
              <div className="text-xs text-purple-300/70">Live MySQL 8.0 catalog database</div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CURATED MARKETPLACE TABS (Featured, Trending, Best Sellers, New, Offers) */}
      <section className="py-16 sm:py-20 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-1">
                Curated Collections
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Discover World-Class Designs
              </h2>
            </div>

            <Link
              to="/marketplace/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors group"
            >
              <span>View All Templates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Collection Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {[
              { id: 'featured', label: 'Featured Picks', icon: Sparkles },
              { id: 'trending', label: 'Trending Now', icon: TrendingUp },
              { id: 'bestsellers', label: 'Best Sellers', icon: Award },
              { id: 'new', label: 'New Arrivals', icon: Clock },
              { id: 'offers', label: 'Special Offers', icon: Tag },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'bg-[#12092b]/70 border border-purple-500/20 text-purple-300 hover:text-white hover:border-purple-500/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Products Grid or Error State */}
          {apiError ? (
            <ApiErrorCard
              title="Marketplace Data Unavailable"
              message={apiError}
              onRetry={fetchMarketplaceData}
            />
          ) : (
            <ProductGrid
              products={getActiveProducts()}
              columns={4}
              isLoading={isLoading}
            />
          )}

          {/* Explore Catalog CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/marketplace/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-[#160a33] hover:bg-[#200e4b] border border-purple-500/30 text-purple-200 hover:text-white transition-all shadow-[0_0_25px_rgba(168,85,247,0.2)]"
            >
              <span>Browse Full Marketplace Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 4. EXPLORE ALL 15 DESIGN CATEGORIES (From Django & MySQL) */}
      <section className="py-16 bg-[#090317]/60 border-y border-purple-500/10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-2">
              All 15 Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Browse by Creative Category
            </h2>
            <p className="text-purple-300/80 text-sm sm:text-base">
              Everything from corporate identity kits and high-converting landing pages to viral social media carousels.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((cat) => {
              const IconComponent = ICON_MAP[cat.icon_name] || Sparkles;
              return (
                <Link
                  key={cat.id}
                  to={`/marketplace/category/${cat.slug}`}
                  className="group p-4 rounded-2xl bg-[#12092b]/60 border border-purple-500/20 hover:border-purple-500/50 backdrop-blur-md hover:shadow-[0_10px_25px_rgba(168,85,247,0.2)] transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/30 group-hover:border-purple-400 text-purple-400 group-hover:text-purple-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-1">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-purple-400/80">
                    {cat.product_count} {cat.product_count === 1 ? 'asset' : 'assets'}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/marketplace/categories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors"
            >
              <span>Explore Category Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 5. PROMOTIONAL DISCOUNT BANNER */}
      <section className="py-16">
        <Container>
          <PromoBanner />
        </Container>
      </section>
    </div>
  );
};

export default MarketplacePage;