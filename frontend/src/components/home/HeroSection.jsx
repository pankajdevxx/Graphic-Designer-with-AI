import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Layers,
  Palette,
  Zap,
  Play,
  CheckCircle2,
  Download,
} from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';
import GradientText from '../ui/GradientText';
import CustomOrderModal from '../modals/CustomOrderModal';
import InteractivePixelGrid from './InteractivePixelGrid';
import TechLogosStrip from './TechLogosStrip';
import TechValueSection from './TechValueSection';

/**
 * Flagship Hero Section
 * Fully incorporates the exact high-tech aesthetic, interactive pixel matrix,
 * marquee ticker, Swiss typography with interactive bracket blocks, and isometric value cards
 * from the reference design.
 */
export const HeroSection = () => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  const bracketWords = ['Creative Suite', 'Vector Assets', 'Brand Systems', 'UI/UX Kits'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % bracketWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* 1. Top Interactive Pixel Grid & Marquee Ticker */}
      <InteractivePixelGrid />

      {/* 2. Main Hero Typographic Canvas */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full bg-gradient-to-b from-purple-600/25 via-violet-600/15 to-transparent blur-3xl" />
          <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-fuchsia-600/15 blur-3xl animate-pulse-glow" />
          <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left Column: Swiss Headline & Buttons (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Tagline Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#160b33]/80 border border-purple-500/35 text-purple-300 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.25)]"
              >
                <Sparkles size={16} className="text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Design Your Vision. Create Your Identity.</span>
              </motion.div>

              {/* Swiss Headline with Interactive Bracket Switcher */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                  A Next-Gen Powerful
                  <br />
                  <span className="inline-flex items-center gap-2 my-1">
                    <span className="text-violet-400 font-mono text-3xl sm:text-5xl lg:text-6xl font-light">[</span>
                    <span className="relative inline-block px-3 py-1 rounded-xl bg-gradient-to-r from-violet-600/30 via-purple-600/30 to-fuchsia-600/30 border border-violet-500/40 backdrop-blur-md shadow-[0_0_25px_rgba(139,92,246,0.3)]">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={bracketWords[activeWordIdx]}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.35 }}
                          className="inline-block text-white"
                        >
                          <GradientText variant="purple-fuchsia">
                            {bracketWords[activeWordIdx]}
                          </GradientText>
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="text-violet-400 font-mono text-3xl sm:text-5xl lg:text-6xl font-light">]</span>
                  </span>
                  <br />
                  for Smarter Workflows.
                </h1>
              </div>

              {/* Description */}
              <p className="text-lg text-slate-300/85 max-w-xl leading-relaxed font-normal">
                Curated vectors, brand identity systems, social media kits, and UI templates built for ambitious creators and agencies. Instant digital download with full commercial rights.
              </p>

              {/* High-Contrast Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link to="/marketplace">
                  <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-black hover:bg-slate-200 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-2xl shadow-white/20 group">
                    <span className="w-2.5 h-2.5 bg-black group-hover:scale-110 transition-transform" />
                    <span>EXPLORE DESIGNS</span>
                    <ArrowRight size={16} className="text-black group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <button
                  onClick={() => setOrderModalOpen(true)}
                  className="flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#160b33]/80 border border-purple-500/30 hover:border-purple-400 text-purple-200 hover:text-white font-mono text-xs sm:text-sm font-semibold transition-all duration-200 backdrop-blur-xl group"
                >
                  <Play size={14} className="text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>GET CUSTOM DESIGN</span>
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck size={14} />
                  </div>
                  <span>Commercial License Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                    <Download size={14} />
                  </div>
                  <span>Instant Razorpay Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Reference Metric Card & Floating Graphic Preview (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Trust & Automation Pill Box (from reference image) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 sm:p-7 rounded-2xl bg-[#0e0722]/80 border border-white/[0.08] backdrop-blur-2xl shadow-2xl shadow-purple-950/40 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-violet-600 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white">ER</div>
                      <div className="w-7 h-7 rounded-full bg-fuchsia-600 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white">MT</div>
                      <div className="w-7 h-7 rounded-full bg-indigo-600 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white">AV</div>
                    </div>
                    <span className="text-xs font-mono text-slate-300">Trusted by 10K+ Creators</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400 font-mono">
                    <Star size={13} className="fill-amber-400" />
                    <span>4.9 / 5</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Automate complex tasks, streamline your creative workflows, and deliver world-class brand identities faster — with verified vector precision.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20">
                    <div className="text-lg font-bold text-white font-mono">15+</div>
                    <div className="text-[11px] text-slate-400">Design Disciplines</div>
                  </div>
                  <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/20">
                    <div className="text-lg font-bold text-violet-300 font-mono">100%</div>
                    <div className="text-[11px] text-slate-400">Vector Scalability</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Spatial Showcase Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="relative rounded-2xl overflow-hidden border border-violet-500/30 group shadow-2xl shadow-purple-950/50"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-[#1b0a3d] via-[#100529] to-[#080216] relative flex items-center justify-center p-6">
                  {/* Glowing center emblem */}
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-[0_0_50px_rgba(168,85,247,0.5)] border border-white/20 group-hover:scale-105 transition-transform duration-500">
                    <Sparkles size={56} className="text-white" />
                  </div>

                  {/* Corner tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-purple-300">
                    PIXELGEN STUDIO 2.0
                  </div>

                  {/* Bottom banner */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">Full-Stack Digital Marketplace</div>
                      <div className="text-slate-400 text-[11px]">Instant Download + Razorpay</div>
                    </div>
                    <Link to="/marketplace/products" className="text-violet-400 font-mono hover:text-violet-300 font-bold flex items-center gap-1">
                      VIEW ALL &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Partner / Format Grid Strip */}
      <TechLogosStrip />

      {/* 4. Technical Section [N.01/11] with Isometric Wireframe Cards */}
      <TechValueSection />

      {/* Custom Order Modal */}
      <CustomOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </>
  );
};

export default HeroSection;
