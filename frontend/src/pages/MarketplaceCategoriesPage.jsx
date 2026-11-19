import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
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
  ChevronRight,
} from 'lucide-react';
import categoryService from '../services/categoryService';
import Container from '../components/ui/Container';
import GlassCard from '../components/ui/GlassCard';
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

export const MarketplaceCategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await categoryService.getAllCategories();
      setCategories(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setApiError(err.message || 'Unable to connect to MySQL database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <span className="text-white font-medium">15 Design Categories</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-2">
            15 Creative Disciplines (MySQL Database Live)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Explore Design Categories
          </h1>
          <p className="text-purple-300/80 text-sm sm:text-base leading-relaxed">
            Browse our comprehensive collection of 15 graphic design categories engineered for creators, agency founders, and digital teams.
          </p>

          {/* Search Box */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="w-4 h-4 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search categories (e.g. Logo, Instagram, UI Kit)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#12092b]/80 border border-purple-500/30 text-white placeholder-purple-400/60 text-sm focus:outline-none focus:border-purple-400 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            />
          </div>
        </div>

        {/* Categories Grid or Error State */}
        {apiError ? (
          <ApiErrorCard
            title="Failed to Load Categories"
            message={apiError}
            onRetry={fetchCategories}
          />
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-2xl bg-[#12092b]/40 border border-purple-500/20 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredCategories.map((cat) => {
              const IconComponent = ICON_MAP[cat.icon_name] || Sparkles;

              return (
                <Link
                  key={cat.id}
                  to={`/marketplace/category/${cat.slug}`}
                  className="block h-full group"
                >
                  <GlassCard
                    hoverEffect
                    glow="purple"
                    className="p-5 flex flex-col justify-between h-full hover:border-purple-400/50 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)] transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg text-purple-400"
                          style={{
                            background: `linear-gradient(135deg, ${cat.accent_color}30 0%, ${cat.accent_color}10 100%)`,
                            border: `1px solid ${cat.accent_color}50`,
                          }}
                        >
                          <IconComponent size={22} />
                        </div>

                        {cat.badge && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30">
                            {cat.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                        {cat.name}
                      </h3>

                      <p className="mt-2 text-xs text-purple-300/70 leading-relaxed line-clamp-3">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-purple-500/20 flex items-center justify-between text-xs">
                      <span className="text-purple-300 font-semibold">
                        {cat.product_count} {cat.product_count === 1 ? 'Asset' : 'Assets'}
                      </span>
                      <span className="inline-flex items-center text-purple-400 group-hover:text-white group-hover:translate-x-1 transition-all">
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MarketplaceCategoriesPage;