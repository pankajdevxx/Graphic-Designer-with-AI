import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, LayoutGrid, Download, ShieldCheck, Star } from 'lucide-react';
import ProductSearch from './ProductSearch';
import GradientText from '../ui/GradientText';
import SecondaryButton from '../ui/SecondaryButton';
import { CATEGORIES } from '../../data/categories';

/**
 * MarketplaceHero Component
 * Flagship hero banner for the digital asset marketplace hub.
 */
export const MarketplaceHero = () => {
  const popularPills = CATEGORIES.slice(0, 6);

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-white/[0.06]">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-purple-950/40"
        >
          <Sparkles size={14} className="text-purple-400" />
          <span>Curated Digital Marketplace</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
        >
          Discover World-Class{' '}
          <GradientText variant="purple-fuchsia">Design Assets</GradientText>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300/85 max-w-2xl mx-auto leading-relaxed"
        >
          Explore thousands of vector logos, production-ready Figma design systems, viral social templates, and executive pitch decks crafted by elite visual artists.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto pt-2"
        >
          <ProductSearch />
        </motion.div>

        {/* Quick Category Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400"
        >
          <span className="font-semibold text-slate-500 mr-1">Popular:</span>
          {popularPills.map((p) => (
            <Link
              key={p.id}
              to={`/marketplace/category/${p.slug}`}
              className="px-3 py-1 rounded-full bg-white/[0.04] hover:bg-purple-600/20 border border-white/8 hover:border-purple-500/40 text-slate-300 hover:text-white transition-all"
            >
              {p.title}
            </Link>
          ))}
          <Link
            to="/marketplace/categories"
            className="text-purple-300 hover:text-white font-semibold inline-flex items-center gap-1 ml-1"
          >
            <span>All 15</span>
            <ArrowRight size={12} />
          </Link>
        </motion.div>

        {/* Stats Row */}
        <div className="pt-8 border-t border-white/8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-xs text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <Download size={16} className="text-purple-400" />
            <span>Instant Source Access</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Commercial License</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <LayoutGrid size={16} className="text-cyan-400" />
            <span>15 Specialized Niches</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Star size={16} className="text-amber-400" />
            <span>4.9 / 5 Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceHero;
