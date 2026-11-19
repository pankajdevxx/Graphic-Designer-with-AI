import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';
import GradientText from '../ui/GradientText';

/**
 * AuthModal Component
 * Premium glassmorphic dialog for Login and Account Registration.
 */
export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock response demonstration for Phase 2 UI preview
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0e0622]/90 border border-purple-500/30 p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] z-10"
        >
          {/* Top Glow Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>

          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 mb-3 text-white shadow-lg shadow-purple-900/50">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Access your premium design assets and agency orders
                </p>
              </div>

              {/* Mode Switch Tabs */}
              <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'login'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'register'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <PrimaryButton
                    type="submit"
                    loading={loading}
                    className="w-full"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    {mode === 'login' ? 'Sign In to Studio' : 'Get Started'}
                  </PrimaryButton>
                </div>
              </form>

              {/* Informational Disclaimer */}
              <div className="mt-4 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
                <p className="text-[11px] text-purple-300/80">
                  Phase 2 UI Interface Preview. Full JWT token authentication will connect in Phase 3.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Welcome to PixelGen</h4>
              <p className="text-sm text-slate-300 mb-6">
                UI session initialized for <span className="text-purple-300 font-semibold">{formData.email}</span>.
              </p>
              <PrimaryButton onClick={handleReset} className="w-full">
                Continue to Studio
              </PrimaryButton>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;

