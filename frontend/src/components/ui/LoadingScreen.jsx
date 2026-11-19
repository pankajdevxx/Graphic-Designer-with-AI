import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import GradientText from './GradientText';

/**
 * LoadingScreen Component
 * Branded glassmorphic loading overlay for transitions and async actions.
 */
export const LoadingScreen = ({ message = 'Loading Creative Studio...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05020c]/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="flex flex-col items-center p-8 rounded-3xl bg-[#12092b]/70 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.3)] max-w-sm text-center"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-xl animate-pulse" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center border border-white/20 shadow-xl">
            <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          PixelGen<GradientText variant="purple-fuchsia">Creativity</GradientText>
        </h3>
        <p className="text-sm text-slate-300/70">{message}</p>

        {/* Glowing Progress Bar */}
        <div className="w-48 h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;

