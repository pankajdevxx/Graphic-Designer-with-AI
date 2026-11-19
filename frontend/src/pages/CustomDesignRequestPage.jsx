import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palette,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  Briefcase,
  Layers,
  ArrowRight,
} from 'lucide-react';
import orderService from '../services/orderService';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientText from '../components/ui/GradientText';

export const CustomDesignRequestPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_category: 'Custom Logo & Branding',
    budget_range: '$1,000 - $3,000',
    timeline: 'Standard (2-3 Weeks)',
    title: '',
    description: '',
    reference_links: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const categories = [
    'Custom Logo & Branding',
    'Social Media & Motion Kit',
    'UI/UX & Web Design',
    '3D Iconography & Vector Illustration',
    'Packaging & Merchandising',
    'Presentation & Pitch Decks',
  ];

  const budgetOptions = [
    '$500 - $1,000 (Starter Kit)',
    '$1,000 - $3,000 (Growth Brand)',
    '$3,000 - $5,000 (Enterprise Suite)',
    '$5,000+ (Full Custom Agency Partnership)',
  ];

  const timelineOptions = [
    'Urgent (1-2 Weeks)',
    'Standard (2-3 Weeks)',
    'Comprehensive (1-2 Months)',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.title.trim() || !formData.description.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await orderService.submitCustomDesignRequest(formData);
      setSuccessMsg(res.message || 'Brief submitted successfully! We will get in touch within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_category: 'Custom Logo & Branding',
        budget_range: '$1,000 - $3,000',
        timeline: 'Standard (2-3 Weeks)',
        title: '',
        description: '',
        reference_links: '',
      });
    } catch (err) {
      setErrorMsg(err?.message || 'Error submitting brief. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05020c] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono font-semibold">
            <Sparkles size={13} />
            <span>AGENCY COMMISSIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Commission a <GradientText variant="purple-fuchsia">Custom Design</GradientText>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Need something tailored uniquely to your brand identity? Submit a creative brief to our senior art directors and receive a guaranteed quote within 24 hours.
          </p>
        </div>

        {successMsg && (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-start gap-3">
            <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Brief Received Successfully!</div>
              <div className="text-xs text-emerald-400/90 mt-1">{successMsg}</div>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Elena Rostova"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase">Work Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="elena@studio.design"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase">Phone / WhatsApp</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 019-2834"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase">Company / Brand Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Lumina Studio"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase">Creative Discipline *</label>
              <select
                name="service_category"
                value={formData.service_category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-[#110729] border border-white/10 text-white text-xs focus:border-violet-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase">Estimated Budget *</label>
              <select
                name="budget_range"
                value={formData.budget_range}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-[#110729] border border-white/10 text-white text-xs focus:border-violet-500"
              >
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase">Target Timeline *</label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-[#110729] border border-white/10 text-white text-xs focus:border-violet-500"
              >
                {timelineOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 uppercase">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Complete SaaS Brand Identity & Spatial UI Kit"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 uppercase">Creative Brief & Requirements *</label>
            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your brand values, required deliverables (SVG, Figma, AI, 3D), visual style, color palettes, and audience..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 uppercase">Moodboard / Reference Links (Figma, Behance, Dribbble)</label>
            <input
              type="text"
              name="reference_links"
              value={formData.reference_links}
              onChange={handleChange}
              placeholder="https://figma.com/@yourbrand or https://behance.net/..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
            />
          </div>

          <PrimaryButton
            type="submit"
            size="lg"
            loading={loading}
            icon={Send}
            className="w-full justify-center !shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          >
            Submit Creative Brief for Review
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default CustomDesignRequestPage;
