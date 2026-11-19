import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassCard Primitive Component
 * Reusable frosted glassmorphism card container with subtle glowing borders and backdrop blur.
 */
export const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  glow = 'none',
  interactive = false,
  onClick,
  ...props
}) => {
  const glowStyles = {
    purple: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] border-purple-500/20',
    violet: 'hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] border-violet-500/20',
    fuchsia: 'hover:shadow-[0_0_35px_rgba(217,70,239,0.25)] border-fuchsia-500/20',
    none: 'hover:shadow-2xl border-white/8',
  };

  const baseClasses = `
    relative overflow-hidden rounded-2xl
    bg-[#12092b]/55 backdrop-blur-xl
    border border-white/8
    transition-all duration-300 ease-out
    ${glowStyles[glow] || glowStyles.none}
    ${hoverEffect ? 'hover:bg-[#1c0e42]/75 hover:border-purple-500/35 hover:-translate-y-1' : ''}
    ${interactive ? 'cursor-pointer active:scale-[0.99]' : ''}
    ${className}
  `.trim();

  return (
    <motion.div
      className={baseClasses}
      onClick={onClick}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      {...props}
    >
      {/* Subtle top shimmer highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default GlassCard;

