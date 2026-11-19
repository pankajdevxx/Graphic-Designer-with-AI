import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, ShieldCheck, FileArchive, ArrowLeft, Key, Sparkles } from 'lucide-react';
import orderService from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import GradientText from '../components/ui/GradientText';

export const DownloadCenterPage = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await orderService.getMyDownloads();
        setDownloads(res.downloads || []);
      } catch (err) {
        console.error('Failed to load downloads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDownloads();
  }, []);

  return (
    <div className="min-h-screen bg-[#05020c] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold mb-2">
              <ShieldCheck size={13} />
              <span>CRYPTOGRAPHICALLY VERIFIED</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Download <GradientText variant="purple-fuchsia">Center</GradientText>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Direct access to all vector source files, Figma kits, and commercial license certificates.
            </p>
          </div>
          <Link to="/dashboard" className="text-xs font-mono text-violet-400 hover:text-white flex items-center gap-1.5">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
            <LoadingSpinner size="lg" />
            <span className="text-xs font-mono">Verifying download permissions...</span>
          </div>
        ) : downloads.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] text-center space-y-4">
            <FileArchive size={40} className="mx-auto text-slate-600" />
            <h2 className="text-lg font-bold text-white">No Downloads Available</h2>
            <p className="text-xs text-slate-400">Purchase a design asset to unlock high-speed encrypted downloads.</p>
            <Link to="/marketplace" className="inline-block pt-2">
              <span className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-mono text-xs font-bold">
                Explore Marketplace
              </span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {downloads.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#0b051c]/80 border border-white/[0.08] hover:border-violet-500/40 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white text-base">{item.product_title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-violet-950/80 text-violet-300 border border-violet-500/30">
                      {item.license_type}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <Key size={12} className="text-violet-400" />
                    <span>License: {item.license_key}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Formats Included: .SVG, .EPS, .AI, .PSD, .PNG 4K &bull; Downloads Used: {item.download_count} of {item.max_downloads}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={orderService.getDownloadUrl(item.license_key)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-950/50"
                  >
                    <Download size={14} /> Download ZIP Archive
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadCenterPage;
