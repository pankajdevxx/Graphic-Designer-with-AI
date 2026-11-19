import React from 'react';

/**
 * GradientText Component
 * Renders high-end typographic gradients across headings and highlights.
 */
export const GradientText = ({
  children,
  variant = 'purple-fuchsia',
  className = '',
  as: Component = 'span',
}) => {
  const variants = {
    'purple-fuchsia': 'from-violet-400 via-purple-300 to-fuchsia-400',
    'violet-cyan': 'from-violet-400 via-purple-300 to-cyan-300',
    'fuchsia-rose': 'from-fuchsia-400 via-pink-400 to-rose-400',
    'amber-violet': 'from-amber-300 via-fuchsia-400 to-purple-400',
    white: 'from-white via-slate-200 to-slate-400',
  };

  return (
    <Component
      className={`bg-gradient-to-r ${variants[variant] || variants['purple-fuchsia']} bg-clip-text text-transparent font-bold ${className}`}
    >
      {children}
    </Component>
  );
};

export default GradientText;

