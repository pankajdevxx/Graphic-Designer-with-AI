import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import CustomOrderModal from '../components/modals/CustomOrderModal';

/**
 * PortfolioPage Component
 * Full-scale agency case study gallery with client metadata, year tags, and commission CTA.
 */
export const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(PORTFOLIO_PROJECTS.map((p) => p.category)));
    return ['All', ...cats];
  }, []);

  const filteredProjects =
    activeFilter === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="py-12 sm:py-20 relative min-h-screen">
      <Container size="xl">
        <SectionHeading
          badge="Agency Case Studies"
          badgeIcon={Layers}
          title="Creative Work &"
          titleHighlight="Case Studies"
          subtitle="Explore selected client commissions, visual transformations, and brand identity projects delivered by PixelGenCreativity."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-950 border border-purple-400/40'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/8'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
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
                  className="group flex flex-col justify-between h-full overflow-hidden"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b041a] via-[#0b041a]/30 to-transparent opacity-80" />
                      <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 backdrop-blur-md">
                        {project.category}
                      </span>
                      <span className="absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/60 text-slate-300 border border-white/10 backdrop-blur-md">
                        {project.year}
                      </span>
                    </div>

                    <div className="p-6">
                      <p className="text-xs font-semibold text-purple-400 mb-1">
                        {project.client}
                      </p>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-300/70 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-white/8 flex flex-wrap gap-1.5 items-center justify-between">
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

                      <button
                        onClick={() => setOrderModalOpen(true)}
                        className="text-xs text-purple-300 hover:text-white font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inquire</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Commission CTA Bar */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/30 via-violet-900/20 to-fuchsia-900/30 border border-purple-500/30 text-center max-w-3xl mx-auto shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Have a project in mind?
          </h3>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            Let's build a signature visual identity or UI/UX experience that elevates your business.
          </p>
          <PrimaryButton
            size="lg"
            icon={Sparkles}
            onClick={() => setOrderModalOpen(true)}
          >
            Start Your Custom Project
          </PrimaryButton>
        </div>
      </Container>

      {/* Global Custom Order Modal */}
      <CustomOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </div>
  );
};

export default PortfolioPage;
