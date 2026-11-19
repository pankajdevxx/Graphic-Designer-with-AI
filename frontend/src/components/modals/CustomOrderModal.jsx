import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, CheckCircle2, Clock, DollarSign, FileText } from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';
import GradientText from '../ui/GradientText';

/**
 * CustomOrderModal Component
 * Interactive glassmorphic modal for submitting custom design quotations & briefs.
 */
export const CustomOrderModal = ({ isOpen, onClose, initialService = 'Custom Logo & Branding' }) => {
  const [formData, setFormData] = useState({
    service: initialService,
    title: '',
    budget: '$1,000 - $3,000',
    timeline: 'Standard (5-7 Days)',
    brief: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
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
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e0622]/95 border border-purple-500/30 p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.35)] z-10"
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
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles size={12} />
                  Agency Commission
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Request <GradientText variant="purple-fuchsia">Custom Design</GradientText>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300/70 mt-1">
                  Tell us about your brand vision and our creative director will reach out within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Creative Division
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="Custom Logo & Branding" className="bg-[#0e0622]">
                      Custom Logo & Branding
                    </option>
                    <option value="Social Media Design" className="bg-[#0e0622]">
                      Social Media Design
                    </option>
                    <option value="UI/UX & Web Design" className="bg-[#0e0622]">
                      UI/UX & Web Design
                    </option>
                    <option value="Complete Agency Retainer" className="bg-[#0e0622]">
                      Complete Agency Retainer
                    </option>
                  </select>
                </div>

                {/* Project Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Project Title or Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nexus Tech Rebrand 2026"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Budget & Timeline Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1">
                      <DollarSign size={12} className="text-purple-400" />
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                    >
                      <option value="$500 - $1,000" className="bg-[#0e0622]">
                        $500 - $1,000 (Starter)
                      </option>
                      <option value="$1,000 - $3,000" className="bg-[#0e0622]">
                        $1,000 - $3,000 (Growth)
                      </option>
                      <option value="$3,000 - $8,000" className="bg-[#0e0622]">
                        $3,000 - $8,000 (Enterprise)
                      </option>
                      <option value="$8,000+" className="bg-[#0e0622]">
                        $8,000+ (Full Suite)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1">
                      <Clock size={12} className="text-purple-400" />
                      Target Delivery
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                    >
                      <option value="Expedited (2-3 Days)" className="bg-[#0e0622]">
                        Expedited (2-3 Days)
                      </option>
                      <option value="Standard (5-7 Days)" className="bg-[#0e0622]">
                        Standard (5-7 Days)
                      </option>
                      <option value="Flexible (2-3 Weeks)" className="bg-[#0e0622]">
                        Flexible (2-3 Weeks)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1">
                    <FileText size={12} className="text-purple-400" />
                    Creative Brief & Objectives
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your target audience, aesthetic preferences (e.g. minimalist, cyberpunk, luxury), and required deliverables..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Your Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="founder@yourbrand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-2">
                  <PrimaryButton
                    type="submit"
                    loading={loading}
                    className="w-full"
                    icon={Send}
                    iconPosition="right"
                  >
                    Submit Custom Project Proposal
                  </PrimaryButton>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-950/50">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Proposal Submitted</h4>
              <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
                Thank you! Our creative directors have received your brief for{' '}
                <span className="text-purple-300 font-semibold">{formData.title || formData.service}</span>. We will review
                and dispatch a detailed scope proposal to <span className="text-purple-300 font-semibold">{formData.email}</span> within 24 hours.
              </p>
              <PrimaryButton onClick={handleReset} className="px-8">
                Done
              </PrimaryButton>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CustomOrderModal;

