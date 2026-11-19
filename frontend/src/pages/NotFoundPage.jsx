import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';
import GradientText from '../components/ui/GradientText';

/**
 * NotFoundPage Component
 * Premium glassmorphism 404 handler guiding users back to active routes.
 */
export const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <GlassCard
        hoverEffect={false}
        glow="purple"
        className="max-w-md w-full p-8 sm:p-12 text-center border border-purple-500/30 relative"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-purple-950">
          <Compass size={32} className="animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <h1 className="text-6xl font-black text-white tracking-tight mb-2">
          4<GradientText variant="purple-fuchsia">0</GradientText>4
        </h1>

        <h2 className="text-xl font-bold text-white mb-2">Canvas Canvas Not Found</h2>

        <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-8">
          The creative coordinates you navigated to do not exist or have been relocated in the PixelGen studio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="w-full sm:w-auto">
            <PrimaryButton icon={Home} className="w-full">
              Back to Studio
            </PrimaryButton>
          </Link>
          <Link to="/marketplace" className="w-full sm:w-auto">
            <SecondaryButton icon={ArrowLeft} className="w-full">
              Marketplace
            </SecondaryButton>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default NotFoundPage;
