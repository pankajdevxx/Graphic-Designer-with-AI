import React from 'react';

/**
 * LoadingSkeleton Component
 * Renders glassmorphic card skeletons with animated pulsing gradients during data filtering or loading.
 */
export const LoadingSkeleton = ({ count = 4, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 ${className}`}>
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-[#12092b]/40 border border-white/5 overflow-hidden p-0 animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="aspect-[4/3] bg-white/[0.04]" />

          {/* Body Lines */}
          <div className="p-5 space-y-3">
            <div className="flex justify-between">
              <div className="w-20 h-3 bg-white/[0.06] rounded" />
              <div className="w-12 h-3 bg-white/[0.06] rounded" />
            </div>
            <div className="w-full h-4 bg-white/[0.08] rounded" />
            <div className="w-3/4 h-3 bg-white/[0.04] rounded" />

            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="w-16 h-5 bg-white/[0.08] rounded" />
              <div className="w-20 h-8 bg-white/[0.08] rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
