import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Eye, ShoppingCart, ArrowRight, X, Download, Check } from 'lucide-react';
import { FEATURED_DESIGNS } from '../../data/featuredDesigns';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';
import GradientText from '../ui/GradientText';

/**
 * FeaturedDesignsSection Component
 * Curated marketplace showcase with interactive category filtering and detail preview modal.
 */
export const FeaturedDesignsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDesign, setSelectedDesign] = useState(null);

  const filterTabs = useMemo(() => {
    const cats = Array.from(new Set(FEATURED_DESIGNS.map((d) => d.category)));
    return ['All', ...cats];
  }, []);

  const filteredDesigns =
    activeCategory === 'All'
      ? FEATURED_DESIGNS
      : FEATURED_DESIGNS.filter((d) => d.category === activeCategory);

  return (
    <section className="py-24 relative overflow-hidden bg-[#06020e]/60">
      {/* Background Glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeading
          badge="Curated Collections"
          badgeIcon={Sparkles}
          title="Featured Creative"
          titleHighlight="Masterpieces"
          subtitle="Explore world-class graphic assets, design systems, and vector mockups crafted by elite visual artists."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === tab
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/50'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/8'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Demo Notice Banner */}
        <div className="mb-8 p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-center max-w-2xl mx-auto">
          <p className="text-xs text-purple-300/80">
            <span className="font-semibold text-purple-200">Demonstration Showcase:</span>{' '}
            Previewing Phase 2 design catalog architecture. Connects to live MySQL product engine in Phase 3.
          </p>
        </div>

        {/* Grid of Design Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDesigns.map((design) => (
              <motion.div
                key={design.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <GlassCard
                  hoverEffect
                  glow="purple"
                  className="group flex flex-col h-full"
                >
                  {/* Preview Image Thumbnail with Overlay */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <img
                      src={design.previewImage}
                      alt={design.title}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0620] via-transparent to-transparent opacity-80" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${design.badgeColor}`}
                      >
                        {design.badge}
                      </span>
                    </div>

                    {/* Quick Action Overlay */}
                    <div className="absolute inset-0 bg-[#06020e]/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => setSelectedDesign(design)}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                        title="Quick View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => setSelectedDesign(design)}
                        className="p-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-950 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75 cursor-pointer"
                        title="Purchase / Details"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-purple-300 mb-2">
                        <span>{design.category}</span>
                        <div className="flex items-center gap-1 text-amber-400 font-semibold">
                          <Star size={12} className="fill-amber-400" />
                          <span>{design.rating}</span>
                          <span className="text-slate-400">({design.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                        {design.title}
                      </h3>

                      <p className="mt-1.5 text-xs text-slate-300/70 line-clamp-2 leading-relaxed">
                        {design.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {design.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing and Action */}
                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-black text-white">
                          ${design.price.toFixed(2)}
                        </span>
                        {design.originalPrice && (
                          <span className="ml-2 text-xs text-slate-400 line-through">
                            ${design.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedDesign(design)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white group-hover:translate-x-1 transition-all cursor-pointer"
                      >
                        <span>View Design</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <Link to="/marketplace">
            <SecondaryButton size="lg" icon={ArrowRight} iconPosition="right">
              View All 4,500+ Templates in Marketplace
            </SecondaryButton>
          </Link>
        </div>
      </div>

      {/* Quick View Design Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDesign(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#0f0724]/95 border border-purple-500/30 p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.35)] z-10 overflow-hidden"
            >
              <button
                onClick={() => setSelectedDesign(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="rounded-2xl overflow-hidden aspect-square border border-white/10 bg-slate-900">
                  <img
                    src={selectedDesign.previewImage}
                    alt={selectedDesign.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <span className="text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300">
                    {selectedDesign.category}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedDesign.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedDesign.description}
                  </p>

                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-white">
                      ${selectedDesign.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ${selectedDesign.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-400" />
                      <span>Commercial & Personal Use License</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-400" />
                      <span>Vector SVG, High-Res PSD & Figma Files</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-400" />
                      <span>Free Lifetime Asset Updates</span>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <PrimaryButton
                      className="flex-1"
                      icon={Download}
                      onClick={() => alert(`Phase 2 Preview: ${selectedDesign.title} checkout opens in Phase 3 with Razorpay gateway.`)}
                    >
                      Instant Download
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedDesignsSection;

