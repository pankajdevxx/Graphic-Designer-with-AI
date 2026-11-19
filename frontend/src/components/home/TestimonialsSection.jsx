import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

/**
 * TestimonialsSection Component
 * Customer reviews showcase in responsive glassmorphic cards.
 * Clearly marked as demonstration content in compliance with design rules.
 */
export const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#05020c]">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Client Endorsements"
          badgeIcon={MessageSquare}
          title="Loved by Creators &"
          titleHighlight="Founders"
          subtitle="Discover how startups, creator agencies, and product teams accelerate their creative velocity with PixelGen."
        />

        {/* Demo Disclaimer Pill */}
        <div className="mb-10 p-3 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-center max-w-xl mx-auto">
          <p className="text-xs text-purple-300/80">
            <span className="font-semibold text-purple-200">Demonstration Showcase:</span>{' '}
            Previewing testimonial card architecture and visual hierarchy. Live client verification will activate after launch.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col h-full"
            >
              <GlassCard
                hoverEffect
                glow="violet"
                className="p-6 flex flex-col justify-between h-full relative group"
              >
                <div>
                  {/* Top Quote Icon & Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400" />
                      ))}
                    </div>
                    <Quote size={20} className="text-purple-400/40" />
                  </div>

                  {/* Impact Highlight Badge */}
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2.5 py-1 rounded-lg inline-block">
                      {item.highlight}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Metadata */}
                <div className="pt-4 border-t border-white/8 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-purple-500/40 shadow-md"
                    loading="lazy"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white">{item.name}</p>
                      {item.verified && (
                        <CheckCircle2 size={12} className="text-emerald-400" title="Verified Customer" />
                      )}
                    </div>
                    <p className="text-[11px] text-purple-300/80">{item.role}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.company}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
