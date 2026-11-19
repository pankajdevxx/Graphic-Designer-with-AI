import React, { useState } from 'react';
import {
  Briefcase,
  Crown,
  Share2,
  LayoutGrid,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES } from '../data/services';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import CustomOrderModal from '../components/modals/CustomOrderModal';

const ICON_MAP = {
  Crown,
  Share2,
  LayoutGrid,
};

/**
 * ServicesPage Component
 * In-depth presentation of bespoke agency services with direct brief submission and scope details.
 */
export const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState('Custom Logo & Branding');
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const handleOpenOrder = (title) => {
    setSelectedService(title);
    setOrderModalOpen(true);
  };

  return (
    <div className="py-12 sm:py-20 relative min-h-screen">
      <Container size="xl">
        <SectionHeading
          badge="Bespoke Creative Commissions"
          badgeIcon={Briefcase}
          title="Creative Agency"
          titleHighlight="Services"
          subtitle="Work directly with our senior visual designers, art directors, and brand strategists to build market-dominating brand identities."
        />

        {/* Detailed Service Divisions */}
        <div className="space-y-16">
          {SERVICES.map((srv, idx) => {
            const Icon = ICON_MAP[srv.iconName] || Crown;

            return (
              <GlassCard
                key={srv.id}
                hoverEffect={false}
                className="p-8 sm:p-12 border border-purple-500/25 relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Overview (5 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${srv.accentColor}30 0%, ${srv.accentColor}10 100%)`,
                          border: `1px solid ${srv.accentColor}50`,
                          color: srv.accentColor,
                        }}
                      >
                        <Icon size={26} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300">
                          Division {srv.division}
                        </span>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {srv.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-purple-300">
                      {srv.tagline}
                    </p>

                    <p className="text-sm text-slate-300/80 leading-relaxed">
                      {srv.description}
                    </p>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-2 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-purple-400" />
                        <span>Average Delivery: <strong>{srv.turnaround}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers size={14} className="text-purple-400" />
                        <span>Scope: <strong>{srv.deliverablesCount}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-emerald-400" />
                        <span>Includes 3 Full Rounds of Revision</span>
                      </div>
                    </div>

                    <div>
                      <PrimaryButton
                        size="md"
                        icon={Sparkles}
                        onClick={() => handleOpenOrder(srv.title)}
                        className="w-full sm:w-auto"
                      >
                        Request {srv.title}
                      </PrimaryButton>
                    </div>
                  </div>

                  {/* Right Column: Capabilities & Deliverables Breakdown (7 cols) */}
                  <div className="lg:col-span-7 bg-[#0b041a]/60 rounded-2xl p-6 sm:p-8 border border-white/8">
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-purple-300 mb-6">
                      Included Deliverables & Specifications
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {srv.capabilities.map((cap, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 hover:border-purple-500/30 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={15} className="text-purple-400 shrink-0" />
                            <h5 className="text-xs font-bold text-white">{cap.name}</h5>
                          </div>
                          <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">
                            {cap.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </Container>

      {/* Global Custom Order Modal */}
      <CustomOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
};

export default ServicesPage;
