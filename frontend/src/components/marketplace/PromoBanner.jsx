import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Sparkles } from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';
import GradientText from '../ui/GradientText';

/**
 * PromoBanner Component
 * Glassmorphic high-impact promotional banner for seasonal marketplace campaigns.
 */
export const PromoBanner = ({
  badge = 'Special Creator Offer',
  title = 'Save 20% on All Pro Bundles',
  description = 'Use promo code PIXEL20 at checkout for an instant 20% discount on all Figma templates and brand kits.',
  buttonText = 'Browse Sale Assets',
  buttonLink = '/marketplace/products?sale=true',
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/40 via-violet-900/30 to-fuchsia-900/40 border border-purple-500/35 p-8 sm:p-12 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Zap size={13} className="text-purple-400" />
            <span>{badge}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed">
            {description}
          </p>
        </div>

        <Link to={buttonLink} className="shrink-0">
          <PrimaryButton
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            className="!shadow-xl"
          >
            {buttonText}
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default PromoBanner;
