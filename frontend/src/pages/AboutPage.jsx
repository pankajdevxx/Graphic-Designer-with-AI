import React from 'react';
import {
  Info,
  Sparkles,
  Award,
  Zap,
  Globe,
  Users,
  Target,
  Heart,
  ShieldCheck,
} from 'lucide-react';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import AnimatedCounter from '../components/ui/AnimatedCounter';

/**
 * AboutPage Component
 * Agency narrative, creative manifesto, design philosophy, leadership principles, and global metrics.
 */
export const AboutPage = () => {
  const principles = [
    {
      title: 'Mathematical Balance',
      description: 'Every curve, kerning pair, and layout grid is rooted in golden ratio proportions and typographic rigor.',
      icon: Target,
      color: '#a855f7',
    },
    {
      title: 'Emotional Resonance',
      description: 'Design must evoke visceral feeling. We build brands that forge genuine human connection and brand loyalty.',
      icon: Heart,
      color: '#ec4899',
    },
    {
      title: 'Conversion Architecture',
      description: 'Aesthetics without utility is art. We build commercial design systems optimized for conversion and growth.',
      icon: Zap,
      color: '#06b6d4',
    },
    {
      title: 'Global Inclusivity',
      description: 'Our assets and interfaces conform to WCAG accessibility guidelines and international design aesthetics.',
      icon: Globe,
      color: '#10b981',
    },
  ];

  const stats = [
    { value: 42, suffix: 'k+', label: 'Asset Downloads Worldwide' },
    { value: 99, suffix: '.8%', label: 'Verified Client Satisfaction' },
    { value: 15, suffix: ' Disciplines', label: 'Specialized Design Categories' },
    { value: 40, suffix: 'M+', label: 'Client Venture Capital Raised' },
  ];

  return (
    <div className="py-12 sm:py-20 relative min-h-screen">
      <Container size="xl">
        <SectionHeading
          badge="Agency Manifesto"
          badgeIcon={Info}
          title="About"
          titleHighlight="PixelGenCreativity"
          subtitle="We are a collective of senior brand strategists, 3D visualizers, and UI engineers committed to redefining graphic design."
        />

        {/* Narrative & Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Bridging the chasm between raw imagination and{' '}
              <GradientText variant="purple-fuchsia">commercial excellence</GradientText>.
            </h3>

            <p>
              Founded with the conviction that high-end graphic design shouldn't be reserved only for Fortune 500 budgets, PixelGenCreativity curates elite digital templates while operating a bespoke agency studio for ambitious creators.
            </p>

            <p>
              Whether you are an early-stage startup looking for a transformative brand identity or an independent creator building a seven-figure digital audience, our assets give you the visual gravity to command immediate attention.
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center gap-6 text-xs text-purple-300 font-semibold">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                World-Class Quality
              </span>
              <span className="flex items-center gap-2">
                <Award size={16} className="text-amber-400" />
                Global Design Honors
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-purple-600/20 rounded-3xl blur-2xl transform scale-95" />
            <GlassCard hoverEffect={false} className="p-8 relative border border-purple-500/30">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white mb-6">
                <Sparkles size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Our Core Promise</h4>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "We reject boring templates. Every asset published on PixelGen must meet the aesthetic standards of an international design biennial before it is approved."
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs">
                <p className="font-bold text-white">Creative Direction Council</p>
                <p className="text-purple-300">PixelGenCreativity International</p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((s, idx) => (
            <GlassCard key={idx} hoverEffect={false} className="p-6 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-slate-400 mt-2 font-medium">{s.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* Core Principles */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our Design Philosophy
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Four non-negotiable pillars that govern every pixel we produce.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <GlassCard key={idx} hoverEffect className="p-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}30 0%, ${p.color}10 100%)`,
                      color: p.color,
                      border: `1px solid ${p.color}40`,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
