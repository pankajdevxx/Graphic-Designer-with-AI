import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutGrid,
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
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

/**
 * Icon Map Dictionary
 * Maps iconName strings from data to actual Lucide component implementations.
 */
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

/**
 * CategoriesSection Component
 * Displays all 15 design categories in a responsive glassmorphic grid with interactive micro-animations.
 */
export const CategoriesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#05020c]">
      {/* Radial Background Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="15 Core Disciplines"
          badgeIcon={LayoutGrid}
          title="Browse Design"
          titleHighlight="Categories"
          subtitle="From high-converting social campaigns to enterprise design systems, find the exact creative assets you need."
        />

        {/* 15 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = ICON_MAP[cat.iconName] || Sparkles;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: (idx % 5) * 0.05 }}
              >
                <Link
                  to={`/marketplace?category=${cat.slug}`}
                  className="block h-full"
                >
                  <GlassCard
                    hoverEffect
                    glow="purple"
                    className="p-5 flex flex-col justify-between h-full group hover:border-purple-400/40"
                  >
                    <div>
                      {/* Top Row: Icon & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${cat.accentColor}25 0%, ${cat.accentColor}10 100%)`,
                            border: `1px solid ${cat.accentColor}40`,
                            color: cat.accentColor,
                          }}
                        >
                          <Icon size={20} />
                        </div>

                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/10">
                          {cat.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                        {cat.title}
                      </h3>

                      <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {cat.description}
                      </p>
                    </div>

                    {/* Bottom Row: Item count & Explore Arrow */}
                    <div className="pt-4 mt-4 border-t border-white/8 flex items-center justify-between text-xs">
                      <span className="text-purple-300 font-medium">
                        {cat.itemCount}+ templates
                      </span>
                      <span className="inline-flex items-center text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all">
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

