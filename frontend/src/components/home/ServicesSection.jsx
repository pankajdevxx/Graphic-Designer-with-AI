import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Crown,
  Share2,
  LayoutGrid,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Layers,
} from 'lucide-react';
import { SERVICES } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';
import CustomOrderModal from '../modals/CustomOrderModal';

const ICON_MAP = {
  Crown,
  Share2,
  LayoutGrid,
};

/**
 * ServicesSection Component
 * Presents the 3 major studio service divisions:
 * A. Custom Logo & Branding
 * B. Social Media Design
 * C. UI/UX & Web Design
 */
export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const handleRequestService = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setOrderModalOpen(true);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#06020e]/80">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Bespoke Creative Solutions"
          badgeIcon={Briefcase}
          title="Creative Agency"
          titleHighlight="Services"
          subtitle="Commission tailored visual experiences engineered by our award-winning senior designers and art directors."
        />

        {/* 3 Detailed Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, idx) => {
            const Icon = ICON_MAP[srv.iconName] || Crown;

            return (
              <GlassCard
                key={srv.id}
                hoverEffect
                glow="violet"
                className="flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden group"
              >
                {/* Accent Top Gradient Line */}
                <div
                  className="absolute top-0 inset-x-0 h-1 transition-all duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${srv.accentColor}, #c084fc)`,
                  }}
                />

                <div>
                  {/* Division Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, ${srv.accentColor}30 0%, ${srv.accentColor}10 100%)`,
                        border: `1px solid ${srv.accentColor}40`,
                        color: srv.accentColor,
                      }}
                    >
                      <Icon size={26} />
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300">
                        Division {srv.division}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">{srv.badge}</p>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-semibold text-purple-300 mb-4">
                    {srv.tagline}
                  </p>
                  <p className="text-sm text-slate-300/80 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Turnaround & Deliverables Metadata */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/8 mb-6 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock size={14} className="text-purple-400" />
                      <span>{srv.turnaround}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Layers size={14} className="text-purple-400" />
                      <span>{srv.deliverablesCount}</span>
                    </div>
                  </div>

                  {/* Capabilities List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Included Capabilities:
                    </p>
                    {srv.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={15}
                          className="text-purple-400 mt-0.5 shrink-0"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">{cap.name}</p>
                          <p className="text-[11px] text-slate-400 leading-tight">
                            {cap.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <PrimaryButton
                    size="sm"
                    onClick={() => handleRequestService(srv.title)}
                    className="flex-1 text-xs"
                    icon={Sparkles}
                  >
                    Request Service
                  </PrimaryButton>

                  <Link to="/services" className="flex-1">
                    <SecondaryButton
                      size="sm"
                      className="w-full text-xs"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Learn More
                    </SecondaryButton>
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Global Custom Order Modal */}
      <CustomOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialService={selectedService || 'Custom Logo & Branding'}
      />
    </section>
  );
};

export default ServicesSection;

