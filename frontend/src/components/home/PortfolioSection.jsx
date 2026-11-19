import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, ExternalLink } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import SecondaryButton from '../ui/SecondaryButton';

/**
 * PortfolioSection Component
 * Visual agency showcase featuring interactive hover zooms, client metadata, and category tagging.
 */
export const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Brand Identity', 'UI/UX & Web Design', 'Marketing Creatives', 'Posters & Banners'];

  const filteredProjects =
    activeFilter === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section className="py-24 relative overflow-hidden bg-[#05020c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Curated Client Case Studies"
          badgeIcon={Layers}
          title="Featured Studio"
          titleHighlight="Portfolio"
          subtitle="Explore recent visual identities, digital products, and high-impact campaigns produced for global leaders."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/8'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard
                hoverEffect
                glow="purple"
                className="group flex flex-col h-full overflow-hidden"
              >
                {/* Image Container with Zoom and Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b041a] via-[#0b041a]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/50 text-slate-300 border border-white/10 backdrop-blur-md">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-purple-400 mb-1">
                      {project.client}
                    </p>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300/70 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="pt-4 mt-4 border-t border-white/8 flex flex-wrap gap-1.5 items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/portfolio"
                      className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                    >
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-16 text-center">
          <Link to="/portfolio">
            <SecondaryButton size="lg" icon={ArrowRight} iconPosition="right">
              Explore Full Creative Portfolio (40+ Case Studies)
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

