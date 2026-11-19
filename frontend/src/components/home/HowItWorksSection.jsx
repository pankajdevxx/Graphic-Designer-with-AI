import React from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

/**
 * HowItWorksSection Component
 * Visualizes the 4-step creative customer journey:
 * Step 1: Explore Designs & Services
 * Step 2: Select Your Favourite Design
 * Step 3: Place Your Order
 * Step 4: Receive Your Creative Work
 */
export const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Explore Designs & Services',
      description:
        'Browse through 15 specialized design categories or explore our bespoke branding, social media, and UI/UX agency services.',
      icon: Search,
      accent: '#8b5cf6',
      badge: 'Step 1',
    },
    {
      step: '02',
      title: 'Select Your Favourite Design',
      description:
        'Inspect high-res vector mockups, review layered component specs, and preview interactive layouts before deciding.',
      icon: Heart,
      accent: '#ec4899',
      badge: 'Step 2',
    },
    {
      step: '03',
      title: 'Place Your Order',
      description:
        'Checkout securely via encrypted international payment channels or submit your tailored custom design brief with exact parameters.',
      icon: CreditCard,
      accent: '#06b6d4',
      badge: 'Step 3',
    },
    {
      step: '04',
      title: 'Receive Your Creative Work',
      description:
        'Get immediate source download links (Figma, AI, PSD, SVG) or receive your custom agency deliverables within 3 to 7 business days.',
      icon: Sparkles,
      accent: '#a855f7',
      badge: 'Step 4',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#06020e]/90">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Seamless Process"
          badgeIcon={Sparkles}
          title="How PixelGen"
          titleHighlight="Works"
          subtitle="From concept discovery to final production asset handoff, experience an intuitive four-step creative journey."
        />

        {/* Steps Grid with Connecting Visual Flow */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-violet-500/20 via-purple-500/30 to-fuchsia-500/20 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="flex flex-col h-full"
                >
                  <GlassCard
                    hoverEffect
                    glow="purple"
                    className="p-6 sm:p-8 flex flex-col justify-between h-full relative group"
                  >
                    <div>
                      {/* Top Step Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${item.accent}30 0%, ${item.accent}10 100%)`,
                            border: `1px solid ${item.accent}50`,
                            color: item.accent,
                          }}
                        >
                          <Icon size={24} />
                        </div>

                        <span className="text-3xl font-black font-mono text-white/15 group-hover:text-purple-400/30 transition-colors">
                          {item.step}
                        </span>
                      </div>

                      {/* Badge */}
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 mb-3 inline-block">
                        {item.badge}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300/75 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Step Highlight Indicator */}
                    <div className="pt-6 mt-6 border-t border-white/8 flex items-center justify-between text-xs text-purple-300">
                      <span className="font-semibold">Step {idx + 1} of 4</span>
                      <ArrowRight size={14} className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
