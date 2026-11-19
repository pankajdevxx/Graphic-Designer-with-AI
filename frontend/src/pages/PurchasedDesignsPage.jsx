import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Download, ShieldCheck, ArrowLeft, Key } from 'lucide-react';
import orderService from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import GradientText from '../components/ui/GradientText';

export const PurchasedDesignsPage = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await orderService.getMyDownloads();
        setDownloads(res.downloads || []);
      } catch (err) {
        console.error('Failed to load purchased designs:', err);
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Purchased <GradientText variant="purple-fuchsia">Designs</GradientText>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Your acquired vector kits, source archives, and commercial certificate keys.
            </p>
          </div>
          <Link to="/dashboard" className="text-xs font-mono text-violet-400 hover:text-white flex items-center gap-1.5">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
            <LoadingSpinner size="lg" />
            <span className="text-xs font-mono">Loading your designs...</span>
          </div>
        ) : downloads.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] text-center space-y-4">
            <Package size={40} className="mx-auto text-slate-600" />
            <h2 className="text-lg font-bold text-white">No Designs Purchased Yet</h2>
            <p className="text-xs text-slate-400">When you buy templates, your instant download licenses appear here.</p>
            <Link to="/marketplace" className="inline-block pt-2">
              <span className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-mono text-xs font-bold">
                Explore Marketplace
              </span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloads.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] hover:border-violet-500/40 backdrop-blur-xl transition-all space-y-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-white text-lg">{item.product_title}</h2>
                    <span className="text-xs text-violet-400 font-mono">
                      {item.license_type === 'extended' ? 'Extended Enterprise License' : 'Standard Commercial License'}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20">
                    ACTIVE
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.05] space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Key size={12} className="text-violet-400" /> License Certificate Key:
                  </div>
                  <div className="text-xs font-mono text-violet-300 font-bold tracking-wider select-all">
                    {item.license_key}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/[0.06]">
                  <span>Downloaded: {item.download_count} / {item.max_downloads}</span>
                  <a
                    href={orderService.getDownloadUrl(item.license_key)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md shadow-purple-950/50"
                  >
                    <Download size={14} /> Download .ZIP
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

export default PurchasedDesignsPage;
