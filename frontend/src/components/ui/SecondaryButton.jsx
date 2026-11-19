import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * SecondaryButton Component
 * Glassmorphic translucent button with purple glow borders on hover.
 */
export const SecondaryButton = ({
  children,
  onClick,
  type = 'button',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      className={`
        relative inline-flex items-center justify-center font-medium rounded-xl
        bg-white/[0.04] hover:bg-white/[0.08]
        backdrop-blur-md
        border border-white/12 hover:border-purple-500/40
        text-slate-200 hover:text-white
        hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${sizeClasses[size] || sizeClasses.md}
        ${className}
      `.trim()}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'lg' ? 20 : 16} />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon size={size === 'lg' ? 20 : 16} />}
        </>
      )}
    </motion.button>
  );
};

export default SecondaryButton;

