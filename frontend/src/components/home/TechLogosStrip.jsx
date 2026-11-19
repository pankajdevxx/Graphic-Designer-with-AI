import React from 'react';
import { Layers, Component, Sparkles, Wand2, Paintbrush, FileCode2 } from 'lucide-react';

/**
 * TechLogosStrip Component
 * Matches the clean logo grid strip and technical telemetry banner from the user reference image:
 * Divided format cells + "... > ADD-ON -> INTELLIGENCE LAYER FOR YOUR CREATIVE STACK < ..."
 */
export const TechLogosStrip = () => {
  const formats = [
    { name: 'Figma Kits', desc: 'Auto-Layout Components', icon: Component },
    { name: 'Adobe Illustrator', desc: 'Vector .AI & .EPS', icon: Wand2 },
    { name: 'Adobe Photoshop', desc: 'Layered Smart Objects', icon: Paintbrush },
    { name: 'SVG Architecture', desc: 'Web & Native Scale', icon: FileCode2 },
    { name: 'Canva Pro', desc: 'One-Click Direct Import', icon: Sparkles },
    { name: 'After Effects', desc: 'Kinetic Motion Lottie', icon: Layers },
  ];

  return (
    <div className="w-full bg-[#05020c] border-b border-white/[0.08]">
      {/* Format Grid Strip with Clean Vertical Dividers */}
      <div className="max-w-7xl mx-auto border-x border-white/[0.08]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-white/[0.08]">
          {formats.map((fmt, idx) => {
            const Icon = fmt.icon;
            return (
              <div
                key={idx}
                className="py-6 px-4 flex flex-col items-center justify-center text-center group hover:bg-violet-950/20 transition-all duration-300"
              >
                <Icon size={24} className="text-slate-500 group-hover:text-violet-400 group-hover:scale-110 transition-all duration-200 mb-2.5" />
                <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                  {fmt.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {fmt.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Dot Grid Strip with Subtitle */}
      <div className="relative py-4 px-4 bg-[#080315] border-t border-b border-white/[0.05] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="max-w-7xl mx-auto flex items-center justify-center text-center text-xs sm:text-sm font-mono tracking-wider">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-slate-600">... &gt;</span>
            <span className="text-violet-400 font-bold uppercase">ADD-ON</span>
            <span className="text-slate-600">&rarr;</span>
            <span className="text-white font-semibold tracking-widest uppercase">
              CREATIVE INTELLIGENCE LAYER FOR YOUR BRAND
            </span>
            <span className="text-slate-600">&lt; ...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechLogosStrip;
