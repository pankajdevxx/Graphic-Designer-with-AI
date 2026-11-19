import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Package,
  Download,
  Heart,
  CreditCard,
  Bell,
  Settings,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Lock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';
import contentService from '../services/contentService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';
import GradientText from '../components/ui/GradientText';

export const UserDashboardPage = () => {
  const { user, updateProfile, refreshUserProfile } = useAuth();
  const { wishlistItems, removeFromWishlist, moveToCart } = useWishlist();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Data states
  const [orders, setOrders] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Profile form
  const [profileForm, setProfileForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.profile?.phone || '',
    company: user?.profile?.company || '',
    bio: user?.profile?.bio || '',
    address: user?.profile?.address || '',
    city: user?.profile?.city || '',
    country: user?.profile?.country || 'India',
    postal_code: user?.profile?.postal_code || '',
  });
  const [profileUpdating, setProfileUpdating] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');

  // Password change form
  const [passwordForm, setPasswordForm] = useState({ old_password: '', new_password: '', confirm: '' });
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingData(true);
      try {
        const [ordersRes, downloadsRes, notifsRes] = await Promise.allSettled([
          orderService.getMyOrders(),
          orderService.getMyDownloads(),
          contentService.getNotifications(),
        ]);

        if (ordersRes.status === 'fulfilled' && ordersRes.value.orders) {
          setOrders(ordersRes.value.orders);
        }
        if (downloadsRes.status === 'fulfilled' && downloadsRes.value.downloads) {
          setDownloads(downloadsRes.value.downloads);
        }
        if (notifsRes.status === 'fulfilled' && notifsRes.value.notifications) {
          setNotifications(notifsRes.value.notifications);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileUpdating(true);
    setProfileSuccess('');

    const res = await updateProfile(profileForm);
    setProfileUpdating(false);
    if (res.success) {
      setProfileSuccess('Profile details successfully updated in database!');
      refreshUserProfile();
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg({ text: '', type: '' });

    if (passwordForm.new_password !== passwordForm.confirm) {
      setPasswordMsg({ text: 'New passwords do not match.', type: 'error' });
      return;
    }
    if (passwordForm.new_password.length < 6) {
      setPasswordMsg({ text: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }

    setPasswordUpdating(true);
    try {
      await authService.changePassword({
        old_password: passwordForm.old_password,
        new_password: passwordForm.new_password,
      });
      setPasswordMsg({ text: 'Password changed successfully!', type: 'success' });
      setPasswordForm({ old_password: '', new_password: '', confirm: '' });
    } catch (err) {
      setPasswordMsg({
        text: err?.details?.old_password?.[0] || err?.message || 'Password update failed.',
        type: 'error',
      });
    } finally {
      setPasswordUpdating(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag, count: orders.length },
    { id: 'purchased', label: 'Purchased Designs', icon: Package, count: downloads.length },
    { id: 'downloads', label: 'Download History', icon: Download },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlistItems.length },
    { id: 'payments', label: 'Payment History', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: notifications.filter((n) => !n.is_read).length },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#05020c] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* User Hero Header Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#170938]/90 via-[#0d0522]/90 to-[#12072c]/90 border border-white/[0.08] backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-950/50 border border-white/20">
              {user?.first_name ? user.first_name[0] : user?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {user?.full_name || user?.username}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 text-[10px] font-mono uppercase tracking-wider font-bold">
                  {user?.profile?.role || 'Customer'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <Link to="/marketplace">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-slate-200 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-white/10">
                <Sparkles size={14} />
                <span>Browse Store</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.08] no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-950/50 border border-purple-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-purple-950' : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[500px]">
          {loadingData ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
              <LoadingSpinner size="lg" />
              <span className="text-xs font-mono">Loading dashboard records from MySQL...</span>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 rounded-2xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-2">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                        <span>TOTAL ORDERS</span>
                        <ShoppingBag size={16} className="text-purple-400" />
                      </div>
                      <div className="text-3xl font-extrabold text-white font-mono">{orders.length}</div>
                      <div className="text-[11px] text-slate-400">Verified purchase records</div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-2">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                        <span>ACTIVE LICENSES</span>
                        <Package size={16} className="text-violet-400" />
                      </div>
                      <div className="text-3xl font-extrabold text-violet-300 font-mono">{downloads.length}</div>
                      <div className="text-[11px] text-slate-400">Ready for instant download</div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-2">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                        <span>SAVED IN WISHLIST</span>
                        <Heart size={16} className="text-pink-400" />
                      </div>
                      <div className="text-3xl font-extrabold text-pink-300 font-mono">{wishlistItems.length}</div>
                      <div className="text-[11px] text-slate-400">Designs marked for later</div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-2">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                        <span>ACCOUNT STATUS</span>
                        <ShieldCheck size={16} className="text-emerald-400" />
                      </div>
                      <div className="text-xl font-bold text-emerald-400 font-mono">ACTIVE VERIFIED</div>
                      <div className="text-[11px] text-slate-400">SimpleJWT Authenticated</div>
                    </div>
                  </div>

                  {/* Recent Orders Section */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-white">Recent Orders</h2>
                        <p className="text-xs text-slate-400">Track and download your latest purchases</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs text-violet-400 font-mono hover:text-violet-300 font-bold"
                      >
                        VIEW ALL &rarr;
                      </button>
                    </div>

                    {orders.length === 0 ? (
                      <div className="py-12 text-center text-slate-500 text-xs font-mono">
                        No orders placed yet. Browse the marketplace to acquire your first design kit!
                      </div>
                    ) : (
                      <div className="divide-y divide-white/[0.08]">
                        {orders.slice(0, 3).map((ord) => (
                          <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-white text-sm">{ord.order_number}</span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  {ord.payment_status}
                                </span>
                              </div>
                              <div className="text-xs text-slate-400">
                                {new Date(ord.created_at).toLocaleDateString()} &bull; {ord.items?.length || 1} item(s) &bull; Total: ₹{ord.total_amount}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setActiveTab('purchased')}
                                className="px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/40 text-violet-300 text-xs font-mono font-semibold transition-all border border-violet-500/30 flex items-center gap-1.5"
                              >
                                <Download size={13} />
                                <span>Get Files</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: MY PROFILE */}
              {activeTab === 'profile' && (
                <div className="max-w-3xl p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Profile Details</h2>
                    <p className="text-xs text-slate-400">Update your personal and agency identity</p>
                  </div>

                  {profileSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      <span>{profileSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300 uppercase">First Name</label>
                        <input
                          type="text"
                          value={profileForm.first_name}
                          onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300 uppercase">Last Name</label>
                        <input
                          type="text"
                          value={profileForm.last_name}
                          onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300 uppercase">Email Address</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300 uppercase">Phone Number</label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300 uppercase">Company / Agency</label>
                        <input
                          type="text"
                          value={profileForm.company}
                          onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300 uppercase">City / Location</label>
                        <input
                          type="text"
                          value={profileForm.city}
                          onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 uppercase">Bio / Creator Statement</label>
                      <textarea
                        rows={3}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                        placeholder="Tell the agency team about your design style..."
                      />
                    </div>

                    <PrimaryButton type="submit" loading={profileUpdating} size="md">
                      Save Profile Changes
                    </PrimaryButton>
                  </form>
                </div>
              )}

              {/* TAB 3: MY ORDERS */}
              {activeTab === 'orders' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Order History</h2>
                    <p className="text-xs text-slate-400">Complete record of your purchases and transactions</p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs font-mono">
                      No order records found.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/[0.08] text-slate-400">
                            <th className="pb-3">ORDER #</th>
                            <th className="pb-3">DATE</th>
                            <th className="pb-3">ITEMS</th>
                            <th className="pb-3">TOTAL</th>
                            <th className="pb-3">STATUS</th>
                            <th className="pb-3 text-right">ACTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                          {orders.map((ord) => (
                            <tr key={ord.id} className="text-slate-300">
                              <td className="py-4 font-bold text-white">{ord.order_number}</td>
                              <td className="py-4 text-slate-400">{new Date(ord.created_at).toLocaleDateString()}</td>
                              <td className="py-4">{ord.items?.length || 1} asset(s)</td>
                              <td className="py-4 font-bold text-white">₹{ord.total_amount}</td>
                              <td className="py-4">
                                <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  {ord.payment_status}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <Link
                                  to={`/orders/${ord.order_number}`}
                                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-violet-300 transition-colors"
                                >
                                  View Details
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PURCHASED DESIGNS */}
              {activeTab === 'purchased' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Purchased Designs & Digital Assets</h2>
                    <p className="text-xs text-slate-400">Download your verified vector packages and commercial certificates</p>
                  </div>

                  {downloads.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs font-mono">
                      No purchased digital design assets yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {downloads.map((item) => (
                        <div
                          key={item.id}
                          className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-violet-500/40 transition-all space-y-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-bold text-white text-base">{item.product_title}</h3>
                              <span className="text-xs text-violet-400 font-mono">
                                License: {item.license_type === 'extended' ? 'Enterprise Unlimited' : 'Standard Commercial'}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                              VALID
                            </span>
                          </div>

                          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.05] text-[11px] font-mono space-y-1">
                            <div className="text-slate-400">License Key:</div>
                            <div className="text-violet-300 font-bold tracking-wide select-all">{item.license_key}</div>
                          </div>

                          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                            <span>Downloads: {item.download_count} / {item.max_downloads}</span>
                            <a
                              href={orderService.getDownloadUrl(item.license_key)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md shadow-purple-950/50"
                            >
                              <Download size={14} />
                              <span>Download .ZIP</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: DOWNLOAD HISTORY */}
              {activeTab === 'downloads' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Download Center & History</h2>
                    <p className="text-xs text-slate-400">All available files and quota allocation</p>
                  </div>

                  <div className="space-y-4">
                    {downloads.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-white text-sm">{item.product_title}</div>
                          <div className="text-xs text-slate-400 font-mono">
                            License: {item.license_key} &bull; Formats: SVG, EPS, AI, Figma &bull; Status: Ready
                          </div>
                        </div>
                        <a
                          href={orderService.getDownloadUrl(item.license_key)}
                          className="px-4 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-200 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <Download size={14} /> Download Package
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: WISHLIST */}
              {activeTab === 'wishlist' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Saved in Wishlist</h2>
                    <p className="text-xs text-slate-400">Designs you have saved for future inspiration</p>
                  </div>

                  {wishlistItems.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs font-mono">
                      Your wishlist is currently empty.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((prod) => (
                        <div key={prod.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4">
                          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
                            {prod.preview_image ? (
                              <img src={prod.preview_image} alt={prod.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-600">No Image</div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-sm truncate">{prod.title}</h3>
                            <div className="text-xs font-mono font-bold text-violet-400 mt-1">₹{prod.price}</div>
                          </div>
                          <div className="flex items-center gap-2 pt-2">
                            <button
                              onClick={() => moveToCart(prod.id)}
                              className="flex-1 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono font-bold transition-colors"
                            >
                              Move to Cart
                            </button>
                            <button
                              onClick={() => removeFromWishlist(prod.id)}
                              className="px-3 py-2 rounded-xl bg-white/[0.05] text-slate-400 hover:text-red-400 text-xs font-mono transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: PAYMENT HISTORY */}
              {activeTab === 'payments' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Payment Transactions</h2>
                    <p className="text-xs text-slate-400">Cryptographically verified Razorpay payment receipts</p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs font-mono">
                      No payment records found.
                    </div>
                  ) : (
                    <div className="divide-y divide-white/[0.05]">
                      {orders.map((ord) => (
                        <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="font-mono text-sm font-bold text-white">Order {ord.order_number}</div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5">
                              Gateway: Razorpay &bull; Date: {new Date(ord.created_at).toLocaleString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-mono font-bold text-emerald-400">₹{ord.total_amount} {ord.currency}</div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase">Payment Captured</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 8: NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">Notifications & Alerts</h2>
                      <p className="text-xs text-slate-400">Order updates, downloads, and platform announcements</p>
                    </div>
                  </div>

                  {notifications.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs font-mono">
                      You are all caught up! No unread notifications.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4"
                        >
                          <div className="w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Bell size={16} />
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="text-xs font-bold text-white">{n.title}</div>
                            <div className="text-xs text-slate-400">{n.message}</div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {new Date(n.created_at).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 9: ACCOUNT SETTINGS */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Security & Password</h2>
                    <p className="text-xs text-slate-400">Change your account credentials</p>
                  </div>

                  {passwordMsg.text && (
                    <div
                      className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
                        passwordMsg.type === 'success'
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                          : 'bg-red-500/10 border border-red-500/30 text-red-300'
                      }`}
                    >
                      {passwordMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      <span>{passwordMsg.text}</span>
                    </div>
                  )}

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 uppercase">Current Password</label>
                      <input
                        type="password"
                        value={passwordForm.old_password}
                        onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 uppercase">New Password</label>
                      <input
                        type="password"
                        value={passwordForm.new_password}
                        onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 uppercase">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordForm.confirm}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500"
                        required
                      />
                    </div>

                    <PrimaryButton type="submit" loading={passwordUpdating} size="md">
                      Update Password
                    </PrimaryButton>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
