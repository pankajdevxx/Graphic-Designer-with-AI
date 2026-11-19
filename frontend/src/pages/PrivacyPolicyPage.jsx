import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import GradientText from '../components/ui/GradientText';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#05020c] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-4">
          <Link to="/" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Privacy <GradientText variant="purple-fuchsia">Policy</GradientText>
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Last Updated: November 19, 2026 &bull; PixelGenCreativity Global Privacy Standard
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-2xl shadow-xl space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock size={18} className="text-violet-400" /> 1. Data Collection & Integrity
            </h2>
            <p>
              PixelGenCreativity collects personal information strictly necessary to process digital graphic transactions, generate cryptographically signed commercial licenses, and deliver vector assets. This includes your name, verified email address, optional contact phone, and transaction references.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" /> 2. Payment Gateway Security
            </h2>
            <p>
              All payments are processed securely through Razorpay or authorized PCI-DSS Level 1 compliant payment gateways. We never store credit card numbers, CVVs, or bank account credentials on our servers. All transaction authorizations occur through encrypted HTTPS channels using 256-bit SSL.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye size={18} className="text-pink-400" /> 3. Digital Asset Protection & IP
            </h2>
            <p>
              When downloading design assets, we log IP addresses and user agents solely to enforce licensing terms and prevent unauthorized bulk extraction or commercial piracy of creator assets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-purple-400" /> 4. User Rights & Contact
            </h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal account data at any time by contacting our Data Protection Officer at privacy@pixelgencreativity.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
