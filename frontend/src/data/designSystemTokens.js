/**
 * PixelGenCreativity — Centralized Design System Tokens
 * Defines core color palettes, gradients, glassmorphism presets, typography scale,
 * spacing standards, and animation timing constants.
 */

export const DESIGN_TOKENS = {
  brand: {
    name: 'PixelGenCreativity',
    tagline: 'Design Your Vision. Create Your Identity.',
    heroHeadline: 'Design Beyond Limits. Create Without Boundaries.',
    heroDescription:
      'Discover premium graphic design templates, build a powerful brand identity, and transform your creative vision into reality.',
  },
  colors: {
    background: {
      void: '#05020c',
      deep: '#090317',
      surface: '#12092b',
      surfaceHover: '#1c0e42',
      elevated: '#251356',
    },
    primary: {
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
    },
    secondary: {
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
    },
    accent: {
      fuchsia: '#d946ef',
      cyan: '#06b6d4',
      rose: '#f43f5e',
      amber: '#f59e0b',
      emerald: '#10b981',
    },
    neutral: {
      white: '#ffffff',
      gray100: '#f8fafc',
      gray200: '#e2e8f0',
      gray300: '#cbd5e1',
      gray400: '#94a3b8',
      gray500: '#64748b',
      borderSubtle: 'rgba(255, 255, 255, 0.08)',
      borderActive: 'rgba(168, 85, 247, 0.35)',
    },
  },
  gradients: {
    brandText: 'bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent',
    brandButton: 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500',
    brandGlow: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
    cardBorder: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(255, 255, 255, 0.04) 100%)',
  },
  glass: {
    card: 'bg-[#12092b]/55 backdrop-blur-xl border border-white/8 shadow-2xl',
    cardHover: 'hover:bg-[#1c0e42]/75 hover:border-purple-500/35 hover:shadow-[0_10px_35px_-10px_rgba(168,85,247,0.25)] transition-all duration-300',
    nav: 'bg-[#06020e]/80 backdrop-blur-2xl border-b border-white/8',
    pill: 'bg-purple-950/50 backdrop-blur-md border border-purple-500/30 text-purple-300',
  },
  radius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full',
  },
  transitions: {
    default: 'transition-all duration-300 ease-out',
    spring: { type: 'spring', stiffness: 300, damping: 25 },
  },
};

