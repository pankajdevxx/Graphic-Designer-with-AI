import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { FAQS } from '../../data/faqs';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

/**
 * FaqSection Component
 * Interactive accordion addressing questions about licensing, custom orders, payments, and revisions.
 */
export const FaqSection = () => {
  const [openId, setOpenId] = useState(FAQS[0]?.id || null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#06020e]/70">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Frequently Asked Questions"
          badgeIcon={HelpCircle}
          title="Questions &"
          titleHighlight="Answers"
          subtitle="Everything you need to know about our digital templates, custom agency commissions, and source licenses."
        />

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <GlassCard
                key={faq.id}
                hoverEffect={false}
                className="overflow-hidden !border-white/10"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-purple-300">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-purple-300 bg-purple-950/50 border-purple-500/30' : ''
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300/80 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
