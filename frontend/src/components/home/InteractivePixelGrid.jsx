import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

/**
 * InteractivePixelGrid Component
 * Recreates the interactive pixel grid / matrix banner from the user reference image:
 * Top bar with "+PixelGen v2.0-PRO", hoverable glowing mosaic pixel blocks, and "SCROLL FOR MORE ↓".
 */
export const InteractivePixelGrid = () => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const rows = 6;
  const cols = 28;

  // Active glowing cells pattern (curated futuristic wave)
  const isInitiallyActive = (r, c) => {
    // Generate a geometric cluster centered around middle
    const dist = Math.hypot(r - 3, c - 14);
    return (dist < 4.5 && (r + c) % 2 === 0) || (r === 2 && c >= 11 && c <= 17) || (r === 3 && c >= 10 && c <= 18);
  };

  return (
    <div className="w-full bg-[#05020c] border-b border-white/[0.08] relative overflow-hidden select-none">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs font-mono tracking-wider text-slate-400 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="text-violet-400 font-bold">+</span>
          <span className="text-white font-semibold">PixelGen</span>
          <span className="px-1.5 py-0.5 rounded bg-violet-950/60 text-violet-300 text-[10px] border border-violet-500/30">
            v2.0-PRO
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer group">
          <span>SCROLL FOR MORE</span>
          <ArrowDown size={12} className="group-hover:translate-y-0.5 transition-transform text-violet-400" />
        </div>
      </div>

      {/* Mosaic Grid Area */}
      <div className="py-6 px-4 flex justify-center items-center overflow-x-auto no-scrollbar">
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(18px, 28px))`,
            gridTemplateRows: `repeat(${rows}, minmax(16px, 22px))`,
          }}
        >
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const cellKey = `${r}-${c}`;
              const active = isInitiallyActive(r, c);
              const isHovered = hoveredCell === cellKey;

              return (
                <div
                  key={cellKey}
                  onMouseEnter={() => setHoveredCell(cellKey)}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`rounded-[2px] transition-all duration-300 cursor-crosshair ${
                    isHovered
                      ? 'bg-fuchsia-400 shadow-[0_0_14px_rgba(236,72,153,0.9)] scale-110 z-10'
                      : active
                      ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 shadow-[0_0_10px_rgba(139,92,246,0.4)]'
                      : (r + c) % 5 === 0
                      ? 'bg-[#150a2e]/60 border border-purple-500/10'
                      : 'bg-[#090317] border border-white/[0.03] hover:border-violet-500/40'
                  }`}
                  style={{
                    opacity: active ? (isHovered ? 1 : 0.85) : isHovered ? 1 : 0.45,
                  }}
                />
              );
            })
          )}
        </div>
      </div>

      {/* High-Tech Marquee Ticker */}
      <div className="w-full bg-[#0a041a] border-t border-b border-white/[0.08] py-2.5 overflow-hidden flex whitespace-nowrap text-xs font-mono text-slate-300">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
          className="flex items-center gap-8 shrink-0 pr-8"
        >
          <span className="flex items-center gap-2 text-violet-400 font-bold">
            <Sparkles size={12} /> INTRODUCING: ULTRA-HD VECTOR ASSETS WITH PIXELGEN
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-medium">15+ CURATED DESIGN DISCIPLINES</span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-400 font-bold">+ LAUNCH GPU-ACCELERATED ASSETS</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">RAZORPAY INSTANT SECURE CHECKOUT</span>
          <span className="text-slate-600">|</span>
          <span className="text-violet-400 font-bold">+ ZERO-LATENCY CRYPTOGRAPHIC DOWNLOADS</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">COMMERCIAL & EXTENDED ENTERPRISE LICENSES</span>
          <span className="text-slate-600">|</span>
          <span className="text-fuchsia-400 font-bold">+ 10K+ CREATORS TRUSTED</span>
        </motion.div>

        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
          className="flex items-center gap-8 shrink-0 pr-8"
        >
          <span className="flex items-center gap-2 text-violet-400 font-bold">
            <Sparkles size={12} /> INTRODUCING: ULTRA-HD VECTOR ASSETS WITH PIXELGEN
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-medium">15+ CURATED DESIGN DISCIPLINES</span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-400 font-bold">+ LAUNCH GPU-ACCELERATED ASSETS</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">RAZORPAY INSTANT SECURE CHECKOUT</span>
          <span className="text-slate-600">|</span>
          <span className="text-violet-400 font-bold">+ ZERO-LATENCY CRYPTOGRAPHIC DOWNLOADS</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">COMMERCIAL & EXTENDED ENTERPRISE LICENSES</span>
          <span className="text-slate-600">|</span>
          <span className="text-fuchsia-400 font-bold">+ 10K+ CREATORS TRUSTED</span>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractivePixelGrid;
