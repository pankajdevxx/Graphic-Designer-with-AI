import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';

/**
 * TechValueSection Component
 * Accurately implements the exact layout, technical notation, and isometric wireframe cards
 * from the user reference image:
 * [N.01/11] > KEY VALUE
 * / Less manual work. More intelligent execution. /
 * // 001 Smart Processing | // 002 Adaptive Workflows | // 003 Better Results
 */
export const TechValueSection = () => {
  return (
    <section className="relative w-full bg-[#06020e] border-b border-white/[0.08] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Technical Subheader & Action Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-violet-400">
              <span className="text-slate-400 font-bold">[N.01/11]</span>
              <span>&gt;</span>
              <span className="uppercase text-violet-300 font-semibold">KEY VALUE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              <span className="text-slate-500 font-normal mr-2">/</span>
              Less manual work.
              <br className="hidden sm:inline" />
              {' '}More intelligent execution.
              <span className="text-slate-500 font-normal ml-2">/</span>
            </h2>
          </div>

          <div className="shrink-0">
            <Link to="/marketplace">
              <button className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white text-black hover:bg-slate-200 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-xl shadow-white/10 group">
                <span className="w-2.5 h-2.5 bg-black group-hover:scale-110 transition-transform" />
                <span>EXPLORE DESIGNS</span>
                <ArrowUpRight size={14} className="text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* 3 Isometric / Wireframe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] pt-12">
          {/* Card 001 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="py-8 md:py-4 md:px-8 first:pl-0 last:pr-0 space-y-6 group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="group-hover:text-violet-400 transition-colors">// 001</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-600">PRECISION</span>
            </div>

            {/* Wireframe Cylinder Graphic */}
            <div className="h-44 w-full flex items-center justify-center relative">
              <div className="w-28 h-28 relative">
                {/* Isometric SVG Cylinder */}
                <svg viewBox="0 0 120 120" className="w-full h-full stroke-slate-400 group-hover:stroke-violet-400 transition-colors duration-300" fill="none" strokeWidth="1.5">
                  <ellipse cx="60" cy="40" rx="36" ry="18" strokeDasharray="3 3" />
                  <ellipse cx="60" cy="76" rx="36" ry="18" />
                  <path d="M24 40v36M96 40v36" />
                  <circle cx="34" cy="40" r="14" strokeWidth="1" className="stroke-fuchsia-400 opacity-60" />
                </svg>
                <div className="absolute inset-0 bg-violet-600/10 rounded-full blur-xl group-hover:bg-violet-600/20 transition-all pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                Smart Processing
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Non-destructive vector geometry, automatic swatch extraction, and smart SVG component architectures engineered for modern web engines.
              </p>
            </div>
          </motion.div>

          {/* Card 002 (Featured Voxel Stack) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-8 md:py-4 md:px-8 space-y-6 group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="group-hover:text-violet-400 transition-colors">// 002</span>
              <span className="text-[10px] uppercase tracking-wider text-violet-400 font-bold">MODULAR</span>
            </div>

            {/* Voxel Isometric Stack Graphic (matches the blue pixel block stack in image) */}
            <div className="h-44 w-full flex items-center justify-center relative">
              <div className="w-32 h-32 relative flex items-center justify-center">
                <svg viewBox="0 0 140 140" className="w-full h-full" fill="none">
                  {/* Layer 1 (bottom) */}
                  <g transform="translate(18, 52) skewX(-20) rotate(15)">
                    <rect width="70" height="40" rx="3" fill="#1e1045" stroke="#7c3aed" strokeWidth="1" />
                    {Array.from({ length: 6 }).map((_, i) => (
                      <rect key={i} x={i * 11 + 4} y="4" width="7" height="7" fill="#6d28d9" opacity="0.6" />
                    ))}
                  </g>
                  {/* Layer 2 (middle) */}
                  <g transform="translate(24, 38) skewX(-20) rotate(15)">
                    <rect width="70" height="40" rx="3" fill="#2e1065" stroke="#8b5cf6" strokeWidth="1" />
                    {Array.from({ length: 6 }).map((_, i) => (
                      <rect key={i} x={i * 11 + 4} y="4" width="7" height="7" fill="#8b5cf6" />
                    ))}
                  </g>
                  {/* Layer 3 (top) */}
                  <g transform="translate(30, 24) skewX(-20) rotate(15)">
                    <rect width="70" height="40" rx="3" fill="#4c1d95" stroke="#a78bfa" strokeWidth="1.2" />
                    {Array.from({ length: 6 }).map((_, i) => (
                      <rect key={i} x={i * 11 + 4} y="4" width="7" height="7" fill="#a78bfa" />
                    ))}
                  </g>
                </svg>
                <div className="absolute inset-0 bg-violet-600/15 rounded-full blur-2xl group-hover:bg-violet-600/30 transition-all pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                Adaptive Workflows
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Create flexible design systems that adapt to your brand colors, typography, and layout rules — without rigid constraints or manual rework.
              </p>
            </div>
          </motion.div>

          {/* Card 003 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="py-8 md:py-4 md:px-8 space-y-6 group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="group-hover:text-violet-400 transition-colors">// 003</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-600">ENTERPRISE</span>
            </div>

            {/* Wireframe Faceted Star Graphic */}
            <div className="h-44 w-full flex items-center justify-center relative">
              <div className="w-28 h-28 relative">
                <svg viewBox="0 0 120 120" className="w-full h-full stroke-slate-400 group-hover:stroke-fuchsia-400 transition-colors duration-300" fill="none" strokeWidth="1.5">
                  <polygon points="60,15 72,45 105,48 80,72 88,105 60,88 32,105 40,72 15,48 48,45" />
                  <line x1="60" y1="15" x2="60" y2="88" strokeDasharray="2 2" strokeWidth="1" />
                  <line x1="15" y1="48" x2="105" y2="48" strokeDasharray="2 2" strokeWidth="1" />
                </svg>
                <div className="absolute inset-0 bg-fuchsia-600/10 rounded-full blur-xl group-hover:bg-fuchsia-600/25 transition-all pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-200 transition-colors">
                Better Results
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Commercial rights included with every kit, verified 4K exports, and enterprise multi-seat licensing with instant Razorpay checkout.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechValueSection;
