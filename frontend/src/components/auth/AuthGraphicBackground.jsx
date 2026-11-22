import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Palette,
  Type,
  Maximize2,
  Boxes,
} from 'lucide-react';

/**
 * AuthGraphicBackground
 * A high-performance, studio-grade graphic design animated background.
 * Features:
 * 1. Interactive Canvas with Vector Anchor Points & Bezier Connecting Nodes (60 FPS)
 * 2. Multi-color Aurora Mesh Glowing Orbs with smooth floating motion
 * 3. Designer Artifacts & Floating Graphic Badges (Pen Tool/Bezier, Color Swatches, Typography Specs, Artboard Layers)
 * 4. Blueprint / Artboard Matrix Grid with subtle vector registration marks
 */
export const AuthGraphicBackground = ({ children }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000, active: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Canvas Vector Node & Connection Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Vector Anchor Node Class
    const nodeCount = window.innerWidth < 768 ? 22 : 44;
    let nodes = [];

    const colors = [
      { r: 139, g: 92, b: 246 },  // Violet
      { r: 217, g: 70, b: 239 },  // Fuchsia
      { r: 99, g: 102, b: 241 },  // Indigo
      { r: 34, g: 211, b: 238 },  // Cyan
    ];

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const color = colors[i % colors.length];
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          radius: Math.random() * 2 + 1.5,
          shape: i % 4 === 0 ? 'square' : i % 4 === 1 ? 'diamond' : 'circle',
          color: color,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    initNodes();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const maxDist = window.innerWidth < 768 ? 95 : 135;
      const mouseMaxDist = 160;

      // Update and draw connections first
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor if near
        if (mousePos.current.active) {
          const mdx = nodes[i].x - mousePos.current.x;
          const mdy = nodes[i].y - mousePos.current.y;
          const mdist = Math.hypot(mdx, mdy);

          if (mdist < mouseMaxDist) {
            const mAlpha = (1 - mdist / mouseMaxDist) * 0.45;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mousePos.current.x, mousePos.current.y);
            ctx.strokeStyle = `rgba(217, 70, 239, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Draw anchor nodes (vector nodes, squares & diamonds like in design tools)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.025;

        // Bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse gentle repel
        if (mousePos.current.active) {
          const mdx = node.x - mousePos.current.x;
          const mdy = node.y - mousePos.current.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 100 && mdist > 0) {
            const force = (100 - mdist) * 0.008;
            node.x += (mdx / mdist) * force;
            node.y += (mdy / mdist) * force;
          }
        }

        const currentAlpha = 0.4 + Math.sin(node.pulse) * 0.2;
        ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${currentAlpha})`;
        ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.7})`;
        ctx.lineWidth = 0.75;

        if (node.shape === 'square') {
          // Illustrator-style Anchor Point Box
          const s = node.radius * 2.2;
          ctx.strokeRect(node.x - s / 2, node.y - s / 2, s, s);
          ctx.fillRect(node.x - s / 2, node.y - s / 2, s, s);
        } else if (node.shape === 'diamond') {
          // Keyframe / Rhombus Node
          const s = node.radius * 2.4;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y - s);
          ctx.lineTo(node.x + s, node.y);
          ctx.lineTo(node.x, node.y + s);
          ctx.lineTo(node.x - s, node.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        } else {
          // Smooth circular handle point
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-[#05020c] py-12 px-4"
    >
      {/* 1. Subtle Designer Artboard Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 2. Registration Marks at Screen Corners */}
      <div className="absolute top-6 left-6 pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[10px] text-violet-500/40 select-none">
        <span className="text-violet-400 font-bold">+</span>
        <span>X:000 Y:000 • 300DPI</span>
      </div>
      <div className="absolute top-6 right-6 pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[10px] text-fuchsia-500/40 select-none">
        <span>RGB / VECTOR ARTBOARD</span>
        <span className="text-fuchsia-400 font-bold">+</span>
      </div>
      <div className="absolute bottom-6 left-6 pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[10px] text-cyan-500/40 select-none">
        <span className="text-cyan-400 font-bold">+</span>
        <span>PIXELGEN STUDIO CANVAS</span>
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[10px] text-purple-500/40 select-none">
        <span>PRECISION RENDERING: ACTIVE</span>
        <span className="text-purple-400 font-bold">+</span>
      </div>

      {/* 3. Sweeping SVG Vector Bezier Graphic Waves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d946ef" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Spline 1 */}
        <motion.path
          d="M -100 250 C 300 100, 600 500, 1100 220 C 1400 60, 1700 400, 2100 280"
          fill="none"
          stroke="url(#waveGrad1)"
          strokeWidth="1.5"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          strokeDasharray="8 6"
        />

        {/* Ambient Spline 2 */}
        <motion.path
          d="M -100 600 C 400 750, 700 350, 1200 650 C 1500 800, 1800 500, 2200 620"
          fill="none"
          stroke="url(#waveGrad2)"
          strokeWidth="1.5"
          initial={{ pathOffset: 1 }}
          animate={{ pathOffset: [1, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          strokeDasharray="6 8"
        />
      </svg>

      {/* 4. Multi-Orb Aurora Ambient Light Blurs (Smooth Pulsing & Floating) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Center Main Violet Aura */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            x: ['-50%', '-48%', '-50%'],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full bg-gradient-to-b from-purple-600/25 via-violet-600/15 to-transparent blur-[110px]"
        />

        {/* Left Fuchsia Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 0.95, 1],
            x: [0, 25, -15, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 -left-28 w-[480px] h-[480px] rounded-full bg-fuchsia-600/15 blur-[100px]"
        />

        {/* Right Indigo / Cyan Glow */}
        <motion.div
          animate={{
            scale: [1, 0.9, 1.15, 1],
            x: [0, -30, 15, 0],
            y: [0, -25, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-12 -right-28 w-[520px] h-[520px] rounded-full bg-indigo-600/20 blur-[110px]"
        />

        {/* Center Sub-card Bloom Glow */}
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-purple-500/10 blur-[130px]"
        />
      </div>

      {/* 5. Interactive Canvas for Vector Nodes & Connecting Lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1]"
      />

      {/* 6. Floating Graphic Design Badges & Tool Artifacts */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2] select-none">
          {/* Badge 1: Vector Pen Tool / Bezier Anchor Specimen (Top Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -14, 0],
              rotate: [0, 1.5, 0],
            }}
            transition={{
              opacity: { duration: 0.8 },
              x: { duration: 0.8 },
              y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute top-16 left-[5%] xl:left-[10%] p-3.5 rounded-2xl bg-[#0e0722]/75 border border-purple-500/25 backdrop-blur-xl shadow-[0_8px_30px_rgba(139,92,246,0.2)] flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-purple-900/40">
              <Sparkles size={18} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono font-bold text-white tracking-wide">
                  PEN TOOL BEZIER
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-violet-950/80 text-violet-300 border border-violet-500/40">
                  4K
                </span>
              </div>
              <p className="text-[10px] font-mono text-purple-300/70">
                P1: [320, 480] • Smooth Node
              </p>
            </div>
          </motion.div>

          {/* Badge 2: Color Palette Swatch Card (Top Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 15, 0],
              rotate: [0, -1.8, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              x: { duration: 0.8, delay: 0.2 },
              y: { duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
              rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute top-20 right-[5%] xl:right-[10%] p-3.5 rounded-2xl bg-[#0e0722]/75 border border-fuchsia-500/25 backdrop-blur-xl shadow-[0_8px_30px_rgba(217,70,239,0.2)] flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-fuchsia-900/40">
              <Palette size={18} />
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-mono font-bold text-white">
                PALETTE STUDIO
              </div>
              {/* Mini Color Chips */}
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-[#8b5cf6] shadow-sm" title="#8b5cf6" />
                <span className="w-3.5 h-3.5 rounded-md bg-[#d946ef] shadow-sm" title="#d946ef" />
                <span className="w-3.5 h-3.5 rounded-md bg-[#06b6d4] shadow-sm" title="#06b6d4" />
                <span className="w-3.5 h-3.5 rounded-md bg-[#ec4899] shadow-sm" title="#ec4899" />
                <span className="text-[9px] font-mono text-slate-400 ml-1">HEX/CMYK</span>
              </div>
            </div>
          </motion.div>

          {/* Badge 3: Design Layers Stack (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 16, 0],
              rotate: [0, -1.2, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.3 },
              x: { duration: 0.8, delay: 0.3 },
              y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
              rotate: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute bottom-16 left-[6%] xl:left-[11%] p-3.5 rounded-2xl bg-[#0e0722]/75 border border-indigo-500/25 backdrop-blur-xl shadow-[0_8px_30px_rgba(99,102,241,0.2)] flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-900/40">
              <Layers size={18} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono font-bold text-white">
                  ARTBOARD LAYERS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-[10px] font-mono text-indigo-300/80">
                Blend: Pass-Through 100%
              </p>
            </div>
          </motion.div>

          {/* Badge 4: Typography & Golden Ratio Box (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 30 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -18, 0],
              rotate: [0, 1.6, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 },
              x: { duration: 0.8, delay: 0.4 },
              y: { duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
              rotate: { duration: 8.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute bottom-20 right-[6%] xl:right-[11%] p-3.5 rounded-2xl bg-[#0e0722]/75 border border-cyan-500/25 backdrop-blur-xl shadow-[0_8px_30px_rgba(34,211,238,0.2)] flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-cyan-900/40">
              <Type size={18} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono font-bold text-white">
                  TYPOGRAPHY SPEC
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                  Aa
                </span>
              </div>
              <p className="text-[10px] font-mono text-cyan-300/80">
                Tracking: -0.025em • Ratio: 1.618
              </p>
            </div>
          </motion.div>

          {/* Badge 5: Isometric Bounding Box Pill (Mid-Left subtle) */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              opacity: [0.7, 0.95, 0.7],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="hidden 2xl:flex absolute top-1/2 -translate-y-1/2 left-[3%] px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md items-center gap-2 text-[10px] font-mono text-slate-400"
          >
            <Boxes size={12} className="text-violet-400" />
            <span>W: 1920px H: 1080px (16:9)</span>
          </motion.div>

          {/* Badge 6: High Precision Transform Pill (Mid-Right subtle) */}
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.7, 0.95, 0.7],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="hidden 2xl:flex absolute top-1/2 -translate-y-1/2 right-[3%] px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md items-center gap-2 text-[10px] font-mono text-slate-400"
          >
            <Maximize2 size={12} className="text-fuchsia-400" />
            <span>SCALE: 100% • ROT: 0.0°</span>
          </motion.div>
        </div>
      )}

      {/* 7. Actual Page Form Content Container (Foreground, High Z-Index) */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthGraphicBackground;
