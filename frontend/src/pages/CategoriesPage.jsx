import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutGrid,
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
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';

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
 * CategoriesPage Component
 * Full-page directory exploring all 15 creative categories with item counts and search filtering.
 */
export const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 sm:py-20 relative min-h-screen">
      <Container size="xl">
        <SectionHeading
          badge="15 Core Disciplines"
          badgeIcon={LayoutGrid}
          title="All Design"
          titleHighlight="Categories"
          subtitle="Explore our comprehensive directory of 15 graphic design categories engineered for creators, agency founders, and digital teams."
        />

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter categories (e.g. Logo, Instagram, UI Kit)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#12092b]/60 backdrop-blur-md border border-white/10 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-purple-500 shadow-xl"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredCategories.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Sparkles;

            return (
              <Link
                key={cat.id}
                to={`/marketplace?category=${cat.slug}`}
                className="block h-full group"
              >
                <GlassCard
                  hoverEffect
                  glow="purple"
                  className="p-6 flex flex-col justify-between h-full hover:border-purple-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${cat.accentColor}30 0%, ${cat.accentColor}10 100%)`,
                          border: `1px solid ${cat.accentColor}50`,
                          color: cat.accentColor,
                        }}
                      >
                        <Icon size={22} />
                      </div>

                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/10">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                      {cat.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/8 flex items-center justify-between text-xs">
                    <span className="text-purple-300 font-semibold">
                      {cat.itemCount}+ Assets
                    </span>
                    <span className="inline-flex items-center text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default CategoriesPage;
