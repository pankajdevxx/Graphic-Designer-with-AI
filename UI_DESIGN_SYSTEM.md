# PixelGenCreativity — UI Design System & Glassmorphism Guidelines

## 1. Brand Identity & Visual Language

- **Brand Name**: PixelGenCreativity
- **Brand Tagline**: *"Design Your Vision. Create Your Identity."*
- **Primary Hero Headline**: *"Design Beyond Limits. Create Without Boundaries."*
- **Aesthetic Direction**: International-grade modern glassmorphism, dark-mode foundation, translucent frosted surfaces, ambient violet and purple mesh glows, high-contrast typography, and floating micro-interactions.

---

## 2. Color Palette & Theme Tokens

PixelGenCreativity enforces a strict dark aesthetic rooted in deep void blacks and saturated violet/purple accents:

### 2.1 Background & Surface Tokens
| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `void` | `#05020c` | Primary canvas background |
| `deep` | `#090317` | Secondary section background |
| `surface` | `#12092b` | Base card background before glass opacity |
| `surfaceHover` | `#1c0e42` | Interactive hover card surface |
| `elevated` | `#251356` | Elevated modal and drawer backdrop |

### 2.2 Brand Accents & Gradients
| Color / Gradient | Value / Classes | Usage |
| :--- | :--- | :--- |
| **Violet 500** | `#8b5cf6` | Primary brand accent and focus rings |
| **Purple 600** | `#9333ea` | Primary button fill and active indicators |
| **Fuchsia 500** | `#d946ef` | Secondary gradient stop and highlight tags |
| **Cyan 400** | `#22d3ee` | Technical indicators and UI/UX division accent |
| **Text Gradient** | `from-violet-400 via-purple-300 to-fuchsia-400` | Display headings and logo accents |
| **Button Gradient**| `from-violet-600 via-purple-600 to-fuchsia-600` | Primary interactive buttons |

---

## 3. Glassmorphism Architectural Rules

All glass surfaces conform to three core properties:

1. **Translucent Background Fill**: `rgba(18, 9, 36, 0.55)` to `rgba(28, 14, 54, 0.75)`
2. **Backdrop Blur**: `backdrop-blur-xl` (`16px` to `24px` radius)
3. **Subtle Specular Border**: `1px solid rgba(255, 255, 255, 0.08)`, transitioning to `rgba(168, 85, 247, 0.35)` on hover
4. **Specular Highlight**: 1px linear gradient shimmer line along the top border (`from-transparent via-white/15 to-transparent`)

```css
/* Glassmorphism CSS Specification */
.glass-surface {
  background: rgba(18, 9, 36, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-surface-interactive:hover {
  background: rgba(28, 14, 54, 0.75);
  border-color: rgba(168, 85, 247, 0.35);
  box-shadow: 0 10px 30px -10px rgba(168, 85, 247, 0.25);
  transform: translateY(-2px);
}
```

---

## 4. Typography Scale & Hierarchy

| Role | Font Size | Tracking | Weight | Class |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | 4.5rem (72px) | `-0.03em` | ExtraBold (800) | `text-5xl sm:text-7xl font-extrabold tracking-tight` |
| **Section Title** | 3.0rem (48px) | `-0.025em`| ExtraBold (800) | `text-3xl sm:text-5xl font-extrabold tracking-tight` |
| **Card Header** | 1.25rem (20px) | `-0.015em`| Bold (700) | `text-lg sm:text-xl font-bold` |
| **Body Text** | 1.0rem (16px) | `normal` | Regular (400) | `text-base text-slate-300 leading-relaxed` |
| **Caption / Meta** | 0.75rem (12px) | `+0.05em` | SemiBold (600) | `text-xs uppercase font-semibold tracking-wider` |

---

## 5. Reusable Component Primitives

The design system exports a suite of decoupled, accessible components located in `frontend/src/components/ui/`:

- **`GlassCard`**: Universal frosted card container with configurable glow (`purple`, `violet`, `fuchsia`, `none`) and hover transformations.
- **`PrimaryButton`**: High-contrast gradient button with hover pulse, loading spinners, and icon slots.
- **`SecondaryButton`**: Frosted translucent button with subtle white/10 border and purple hover glow.
- **`GradientText`**: Typographic gradient wrapper supporting multiple brand color progressions.
- **`SectionHeading`**: Unified section header featuring an uppercase pill badge, highlighted title, and subtitle.
- **`Container`**: Responsive max-width wrapper (`sm`, `md`, `lg`, `xl`, `full`) enforcing standard horizontal padding.
- **`LoadingScreen`**: Glassmorphic full-viewport loader with pulsing logo and progress animation.
- **`ScrollReveal`**: Motion wrapper triggering directional fade-in reveals on scroll.
- **`AnimatedCounter`**: Tabular number counter utilizing cubic easing for metrics.

---

## 6. Animation System (Framer Motion & GSAP)

### 6.1 Framer Motion Usage
- **Micro-Interactions**: Button scale (`whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`).
- **Word-by-Word Hero Reveal**: Staggered container variants with `staggerChildren: 0.08` and ease-out cubic transitions.
- **Modal Transitions**: Fade-in overlay (`opacity: 0` to `1`) and scaling modal window (`scale: 0.95` to `1`).
- **Accordion Animations**: Smooth height expansion via `AnimatePresence` and `overflow-hidden`.

### 6.2 GSAP & ScrollTrigger Usage
- Hook provided in `frontend/src/hooks/useGsapScroll.js`.
- Automatically encapsulates all tweens inside `gsap.context()`.
- Guarantees complete cleanup of all ScrollTrigger instances upon component unmount via `ctx.revert()`.
- Honors accessibility settings by checking `window.matchMedia('(prefers-reduced-motion: reduce)')`.
