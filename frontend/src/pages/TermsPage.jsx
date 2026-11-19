import React from 'react';
import { Scale, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import GradientText from '../components/ui/GradientText';

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#05020c] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-4">
          <Link to="/" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Terms & <GradientText variant="purple-fuchsia">Conditions</GradientText>
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Effective Date: November 19, 2026 &bull; Master Marketplace Agreement
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-2xl shadow-xl space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale size={18} className="text-violet-400" /> 1. Commercial Licensing Terms
            </h2>
            <p>
              By purchasing and downloading digital design assets from PixelGenCreativity, you are granted a non-exclusive, non-transferable commercial license:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
              <li><strong>Standard License:</strong> Allows use in 1 commercial or personal end product for up to 100,000 views or impressions.</li>
              <li><strong>Extended Enterprise License:</strong> Permits unlimited commercial end products, resale of customized derivatives, and worldwide advertising campaigns.</li>
              <li><strong>Prohibited:</strong> Sub-licensing, redistributing, or re-selling the raw source files (Figma, .AI, .SVG) as standalone design templates is strictly forbidden.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" /> 2. Delivery & Instant Downloads
            </h2>
            <p>
              Digital products become available for download immediately upon confirmation of payment verification from Razorpay. Each purchased product is issued a unique license key (`LIC-2026-XXXXXX`) that permanently authenticates ownership.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-purple-400" /> 3. Agency Commissions & Custom Requests
            </h2>
            <p>
              Custom design briefs submitted through our Custom Request portal are subject to dedicated project agreements and milestone delivery schedules outlined in the official quotation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
