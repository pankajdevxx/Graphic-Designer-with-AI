import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Download, ShieldCheck, Clock } from 'lucide-react';
import orderService from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import GradientText from '../components/ui/GradientText';

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getMyOrders();
        setOrders(res.orders || []);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#05020c] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Order <GradientText variant="purple-fuchsia">History</GradientText>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Complete log of all digital asset purchases and commercial license records.
            </p>
          </div>
          <Link to="/dashboard" className="text-xs font-mono text-violet-400 hover:text-white flex items-center gap-1.5">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
            <LoadingSpinner size="lg" />
            <span className="text-xs font-mono">Fetching your orders...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] text-center space-y-4">
            <ShoppingBag size={40} className="mx-auto text-slate-600" />
            <h2 className="text-lg font-bold text-white">No Orders Found</h2>
            <p className="text-xs text-slate-400">You haven't purchased any templates or kits yet.</p>
            <Link to="/marketplace" className="inline-block pt-2">
              <span className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-mono text-xs font-bold">
                Browse Marketplace
              </span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 rounded-2xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-bold text-white">{ord.order_number}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {ord.payment_status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Date: {new Date(ord.created_at).toLocaleString()} &bull; Gateway: {ord.payment_method}
                  </div>
                  <div className="text-xs text-slate-300">
                    {ord.items?.map((it) => it.product_title).join(', ')}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-white/[0.08]">
                  <div className="text-right">
                    <div className="text-lg font-mono font-extrabold text-white">₹{ord.total_amount}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{ord.currency}</div>
                  </div>
                  <Link
                    to="/download-center"
                    className="px-4 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Download size={14} /> Get Files
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
