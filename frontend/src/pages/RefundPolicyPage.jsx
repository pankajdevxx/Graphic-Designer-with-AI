import React from 'react';
import { RefreshCcw, ShieldAlert, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import GradientText from '../components/ui/GradientText';

export const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#05020c] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-4">
          <Link to="/" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Refund & <GradientText variant="purple-fuchsia">Cancellation</GradientText> Policy
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Last Updated: November 19, 2026 &bull; Digital Goods & Creative Services
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-2xl shadow-xl space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <RefreshCcw size={18} className="text-violet-400" /> 1. Digital Goods Nature
            </h2>
            <p>
              Due to the intangible nature of digital design products (Figma templates, Adobe Illustrator files, vector packages, and 3D renders) which are delivered immediately upon cryptographic payment verification, we generally do not offer unconditional refunds once the file archive has been downloaded.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert size={18} className="text-emerald-400" /> 2. Eligible Refund Conditions
            </h2>
            <p>
              We stand 100% behind the quality of our marketplace. We happily issue a full refund or product exchange in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
              <li>The downloaded archive is corrupt or missing promised file formats (e.g. vector assets advertised as AI/SVG missing).</li>
              <li>A technical billing error resulted in duplicate charges for the same order.</li>
              <li>A custom design commission cannot be fulfilled within the agreed SLA.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail size={18} className="text-fuchsia-400" /> 3. How to Request a Refund
            </h2>
            <p>
              To initiate a claim, email support@pixelgencreativity.com within 14 days of purchase with your order number, license key, and description of the issue. Our support team responds within 24 business hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
