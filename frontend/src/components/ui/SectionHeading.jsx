import React from 'react';
import { motion } from 'framer-motion';
import GradientText from './GradientText';

/**
 * SectionHeading Component
 * Standardized section header with badge pill, high-contrast title, and subtitle.
 */
export const SectionHeading = ({
  badge,
  badgeIcon: BadgeIcon,
  title,
  titleHighlight,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`max-w-3xl flex flex-col mb-12 sm:mb-16 ${alignClasses[align] || alignClasses.center} ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          {BadgeIcon && <BadgeIcon size={14} className="text-purple-400" />}
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {title}{' '}
        {titleHighlight && (
          <GradientText variant="purple-fuchsia">{titleHighlight}</GradientText>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-300/80 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

