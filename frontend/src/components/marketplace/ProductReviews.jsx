import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, ShieldCheck } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

/**
 * ProductReviews Component
 * Displays ratings breakdown and demonstration customer review testimonials.
 */
export const ProductReviews = ({ reviews = [], rating = 4.9, reviewCount = 120 }) => {
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const handleVoteHelpful = (revId) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [revId]: (prev[revId] || 0) + 1,
    }));
  };

  const ratingDistribution = [
    { stars: 5, percentage: 88, count: Math.round(reviewCount * 0.88) },
    { stars: 4, percentage: 9, count: Math.round(reviewCount * 0.09) },
    { stars: 3, percentage: 2, count: Math.round(reviewCount * 0.02) },
    { stars: 2, percentage: 1, count: Math.round(reviewCount * 0.01) },
    { stars: 1, percentage: 0, count: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Demo Review Notice */}
      <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2">
        <ShieldCheck size={16} className="text-purple-400 shrink-0" />
        <span>
          <strong>Demonstration Ratings:</strong> Sample client feedback presented for Phase 3 UI architecture. Real customer reviews activate with verified checkout in Phase 4.
        </span>
      </div>

      {/* Ratings Overview Card */}
      <GlassCard hoverEffect={false} className="p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Overall Score */}
          <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
            <p className="text-5xl font-black text-white">{rating.toFixed(1)}</p>
            <div className="flex justify-center md:justify-start text-amber-400 gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.round(rating) ? 'fill-amber-400' : 'text-slate-600'}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400">
              Based on {reviewCount} verified creator reviews
            </p>
          </div>

          {/* Right: Breakdown Bars */}
          <div className="md:col-span-8 space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-12 font-medium flex items-center gap-1">
                  {item.stars} <Star size={11} className="fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-slate-400 text-[11px]">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((rev) => {
            const addedVotes = helpfulVotes[rev.id] || 0;
            const totalHelpful = (rev.helpfulCount || 0) + addedVotes;

            return (
              <GlassCard key={rev.id} hoverEffect={false} className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-9 h-9 rounded-full object-cover border border-purple-500/30"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{rev.author}</p>
                      <div className="flex text-amber-400 gap-0.5 mt-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{rev.date}</span>
                </div>

                <h4 className="text-sm font-bold text-purple-200">{rev.title}</h4>
                <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    ✓ Verified Template Licensee
                  </span>
                  <button
                    type="button"
                    onClick={() => handleVoteHelpful(rev.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
                  >
                    <ThumbsUp size={12} className="text-purple-400" />
                    <span>Helpful ({totalHelpful})</span>
                  </button>
                </div>
              </GlassCard>
            );
          })
        ) : (
          <p className="text-xs text-slate-400 italic">
            No demonstration reviews have been populated for this specific asset.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
