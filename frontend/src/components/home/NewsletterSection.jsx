import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Sparkles, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';
import GradientText from '../ui/GradientText';
import GlassCard from '../ui/GlassCard';

/**
 * NewsletterSection Component
 * Premium subscription interface with email validation, loading states, and backend readiness.
 */
export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email format (e.g. name@domain.com).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulated API submission pipeline (Interface ready for Phase 3 newsletter endpoint)
    setTimeout(() => {
      setStatus('success');
    }, 900);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-[#05020c]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GlassCard
          hoverEffect={false}
          glow="purple"
          className="relative p-8 sm:p-14 overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-[#140830]/90 via-[#0d0422]/90 to-[#06020e]/95 shadow-[0_0_50px_rgba(168,85,247,0.25)]"
        >
          {/* Background Corner Glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            {/* Header Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-purple-950/40">
              <Sparkles size={14} className="text-purple-400" />
              <span>Weekly Creative Digest</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Get Free Design Assets &{' '}
              <GradientText variant="purple-fuchsia">Creative Insights</GradientText>
            </h2>

            <p className="text-sm sm:text-base text-slate-300/80 leading-relaxed mb-8">
              Join 25,000+ visual artists, agency founders, and UI engineers. Receive exclusive weekly vector drops, curated font pairings, and Figma tutorials directly in your inbox.
            </p>

            {/* Newsletter Form */}
            {status !== 'success' ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-full">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your work email address..."
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/12 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all shadow-inner"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <PrimaryButton
                    type="submit"
                    size="md"
                    loading={status === 'loading'}
                    icon={Send}
                    iconPosition="right"
                    className="w-full sm:w-auto shrink-0 !py-3.5 !px-6 !text-sm"
                  >
                    Subscribe
                  </PrimaryButton>
                </div>

                {/* Validation Error Message */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-rose-400 text-xs pt-1"
                  >
                    <AlertCircle size={14} />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                  <ShieldCheck size={13} className="text-purple-400" />
                  <span>No spam ever. Unsubscribe at any time with a single click.</span>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  You're on the VIP Creative List!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  We have dispatched your complimentary starter vector kit to{' '}
                  <span className="text-purple-300 font-semibold">{email}</span>. Check your inbox to confirm.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setEmail('');
                  }}
                  className="mt-4 text-xs font-semibold text-purple-300 hover:text-white underline underline-offset-4"
                >
                  Subscribe another email
                </button>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default NewsletterSection;
