import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientText from '../components/ui/GradientText';

/**
 * ContactPage Component
 * Direct client inquiry portal, studio headquarters info, and creative brief submission form.
 */
export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    division: 'Custom Logo & Branding',
    budget: '$1,000 - $3,000',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="py-12 sm:py-20 relative min-h-screen">
      <Container size="xl">
        <SectionHeading
          badge="Direct Line to Studio"
          badgeIcon={Mail}
          title="Start a Creative"
          titleHighlight="Conversation"
          subtitle="Whether commissioning a bespoke brand kit, seeking licensing clarification, or exploring enterprise partnerships, our directors are here."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Contact Info & Studio Locations (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard hoverEffect={false} className="p-8 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-2">Studio Information</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Our global creative hubs collaborate synchronously across North American and European timezones.
              </p>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Direct Email</p>
                    <a href="mailto:hello@pixelgencreativity.com" className="text-purple-300 hover:text-white">
                      hello@pixelgencreativity.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Headquarters</p>
                    <p className="text-slate-400">San Francisco: 550 Montgomery St, Suite 400</p>
                    <p className="text-slate-400">London: 12 Shoreditch High St, EC1 6PG</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Guaranteed Response</p>
                    <p className="text-slate-400">Under 24 hours for all project briefs</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck size={16} />
                <span>NDA & Confidentiality Agreements Available</span>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <GlassCard hoverEffect={false} className="p-8 sm:p-10 border border-white/10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Fill out the parameters below and we'll respond with an initial project breakdown.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jordan Lee"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jordan@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Creative Division
                      </label>
                      <select
                        value={formData.division}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                      >
                        <option value="Custom Logo & Branding" className="bg-[#0e0622]">Custom Logo & Branding</option>
                        <option value="Social Media Design" className="bg-[#0e0622]">Social Media Design</option>
                        <option value="UI/UX & Web Design" className="bg-[#0e0622]">UI/UX & Web Design</option>
                        <option value="Marketplace Licensing" className="bg-[#0e0622]">Marketplace Licensing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                      >
                        <option value="$500 - $1,000" className="bg-[#0e0622]">$500 - $1,000</option>
                        <option value="$1,000 - $3,000" className="bg-[#0e0622]">$1,000 - $3,000</option>
                        <option value="$3,000 - $8,000" className="bg-[#0e0622]">$3,000 - $8,000</option>
                        <option value="$8,000+" className="bg-[#0e0622]">$8,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Brand Identity Overhaul for Q1 2027"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Project Details & Goals
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your brand, timeline expectations, reference websites, or target deliverables..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <PrimaryButton
                      type="submit"
                      loading={loading}
                      size="md"
                      icon={Send}
                      iconPosition="right"
                      className="w-full"
                    >
                      Dispatch Message to Studio
                    </PrimaryButton>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Message Transmitted</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-purple-300 font-semibold">{formData.name}</span>. Your brief regarding "{formData.subject}" has been delivered to our creative desk. A senior strategist will review and reply to <span className="text-purple-300 font-semibold">{formData.email}</span> within 24 hours.
                  </p>
                  <div className="pt-4">
                    <PrimaryButton
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', division: 'Custom Logo & Branding', budget: '$1,000 - $3,000', message: '' });
                      }}
                    >
                      Send Another Inquiry
                    </PrimaryButton>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
