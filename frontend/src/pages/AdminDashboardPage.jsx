import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  CreditCard,
  Palette,
  MessageSquare,
  BookOpen,
  Mail,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';
import orderService from '../services/orderService';
import contentService from '../services/contentService';
import authService from '../services/authService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';
import GradientText from '../components/ui/GradientText';

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [loading, setLoading] = useState(true);

  // Data states
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [customRequests, setCustomRequests] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // Modals / forms
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    slug: '',
    category: '',
    price: '',
    original_price: '',
    discount: 0,
    sku: '',
    status: 'active',
    short_description: '',
    description: '',
    file_formats: 'AI, EPS, SVG, FIGMA',
    image_url: '',
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    badge: 'Popular',
    accent_color: '#8b5cf6',
  });

  const [quoteModal, setQuoteModal] = useState({ open: false, requestId: null, amount: '' });

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [
        analyticsRes,
        productsRes,
        categoriesRes,
        ordersRes,
        usersRes,
        customRes,
        inquiriesRes,
        blogRes,
        subsRes,
      ] = await Promise.allSettled([
        orderService.getAdminAnalytics(),
        contentService.getAdminProducts(),
        contentService.getAdminCategories(),
        orderService.getAdminOrders(),
        authService.getAdminUsers(),
        orderService.getAdminCustomRequests(),
        contentService.getAdminInquiries(),
        contentService.getAdminBlogPosts(),
        contentService.getAdminSubscribers(),
      ]);

      if (analyticsRes.status === 'fulfilled') setAnalytics(analyticsRes.value);
      if (productsRes.status === 'fulfilled') setProducts(productsRes.value.products || []);
      if (categoriesRes.status === 'fulfilled') setCategories(categoriesRes.value.categories || []);
      if (ordersRes.status === 'fulfilled') setOrders(ordersRes.value.orders || []);
      if (usersRes.status === 'fulfilled') setUsersList(usersRes.value.users || []);
      if (customRes.status === 'fulfilled') setCustomRequests(customRes.value.requests || []);
      if (inquiriesRes.status === 'fulfilled') setInquiries(inquiriesRes.value.inquiries || []);
      if (blogRes.status === 'fulfilled') setBlogPosts(blogRes.value.posts || []);
      if (subsRes.status === 'fulfilled') setSubscribers(subsRes.value.subscribers || []);
    } catch (err) {
      console.error('Error fetching admin datasets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await contentService.createAdminProduct(newProduct);
      setShowProductModal(false);
      setNewProduct({
        title: '',
        slug: '',
        category: '',
        price: '',
        original_price: '',
        discount: 0,
        sku: '',
        status: 'active',
        short_description: '',
        description: '',
        file_formats: 'AI, EPS, SVG, FIGMA',
        image_url: '',
      });
      fetchAdminData();
    } catch (err) {
      alert('Failed to create product: ' + (err?.message || 'Error'));
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await contentService.deleteAdminProduct(id);
      fetchAdminData();
    } catch (err) {
      alert('Delete failed: ' + err?.message);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await contentService.createAdminCategory(newCategory);
      setShowCategoryModal(false);
      setNewCategory({ name: '', slug: '', description: '', badge: 'Popular', accent_color: '#8b5cf6' });
      fetchAdminData();
    } catch (err) {
      alert('Failed to create category: ' + err?.message);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateAdminOrder(orderId, { status: newStatus });
      fetchAdminData();
    } catch (err) {
      alert('Status update failed: ' + err?.message);
    }
  };

  const handleUpdateCustomRequestStatus = async (reqId, newStatus, quoteAmt = null) => {
    try {
      const payload = { status: newStatus };
      if (quoteAmt !== null) payload.quoted_amount = quoteAmt;
      await orderService.updateAdminCustomRequest(reqId, payload);
      setQuoteModal({ open: false, requestId: null, amount: '' });
      fetchAdminData();
    } catch (err) {
      alert('Update failed: ' + err?.message);
    }
  };

  const handleToggleUserRole = async (userId, currentRole) => {
    const nextRole = currentRole === 'admin' ? 'customer' : 'admin';
    try {
      await authService.updateAdminUser(userId, { role: nextRole });
      fetchAdminData();
    } catch (err) {
      alert('Role update failed: ' + err?.message);
    }
  };

  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, count: products.length },
    { id: 'categories', label: 'Categories', icon: Layers, count: categories.length },
    { id: 'orders', label: 'Orders & Payments', icon: ShoppingBag, count: orders.length },
    { id: 'custom', label: 'Custom Briefs', icon: Palette, count: customRequests.length },
    { id: 'users', label: 'Users', icon: Users, count: usersList.length },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, count: inquiries.length },
    { id: 'blog', label: 'Blog Posts', icon: BookOpen, count: blogPosts.length },
    { id: 'subscribers', label: 'Newsletter', icon: Mail, count: subscribers.length },
  ];

  return (
    <div className="min-h-screen bg-[#05020c] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-950/80 via-[#0d0522]/90 to-purple-950/80 border border-violet-500/30 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/30 border border-violet-500/40 text-violet-300 text-xs font-mono font-bold uppercase">
              <Shield size={13} />
              <span>PLATFORM COMMAND CENTER</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              PixelGen <GradientText variant="purple-fuchsia">Admin Dashboard</GradientText>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Live Relational MySQL 8.0 Management &middot; DRF Endpoints &middot; Cryptographic Signatures
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAdminData}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Admin Nav Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.08] no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold shadow-lg shadow-purple-950/50'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/10 text-slate-300">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Displays */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
            <LoadingSpinner size="lg" />
            <span className="text-xs font-mono">Retrieving administrative database records...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 1. ANALYTICS OVERVIEW */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-6 rounded-2xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>TOTAL REVENUE</span>
                      <DollarSign size={16} className="text-emerald-400" />
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                      ₹{analytics?.metrics?.total_revenue?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-[11px] text-slate-400">Razorpay captured payments</div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>TOTAL ORDERS</span>
                      <ShoppingBag size={16} className="text-violet-400" />
                    </div>
                    <div className="text-3xl font-extrabold text-white font-mono">
                      {analytics?.metrics?.total_orders || 0}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {analytics?.metrics?.paid_orders_count || 0} confirmed paid
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>TOTAL PRODUCTS</span>
                      <Package size={16} className="text-purple-400" />
                    </div>
                    <div className="text-3xl font-extrabold text-white font-mono">
                      {analytics?.metrics?.total_products || 0}
                    </div>
                    <div className="text-[11px] text-slate-400">Across 15 disciplines</div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>REGISTERED USERS</span>
                      <Users size={16} className="text-fuchsia-400" />
                    </div>
                    <div className="text-3xl font-extrabold text-white font-mono">
                      {analytics?.metrics?.total_users || 0}
                    </div>
                    <div className="text-[11px] text-slate-400">JWT authenticated creators</div>
                  </div>
                </div>

                {/* Recent Orders & Payments Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="p-6 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-4">
                    <h2 className="font-bold text-white text-base">Recent Customer Orders</h2>
                    <div className="divide-y divide-white/[0.06]">
                      {analytics?.recent_orders?.slice(0, 5).map((ord) => (
                        <div key={ord.id} className="py-3 flex items-center justify-between text-xs font-mono">
                          <div>
                            <div className="font-bold text-white">{ord.order_number}</div>
                            <div className="text-[11px] text-slate-400">{ord.customer_name} &bull; {ord.customer_email}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-emerald-400">₹{ord.total_amount}</div>
                            <div className="text-[10px] uppercase text-slate-500">{ord.payment_status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-4">
                    <h2 className="font-bold text-white text-base">Recent Gateway Transactions</h2>
                    <div className="divide-y divide-white/[0.06]">
                      {analytics?.recent_payments?.slice(0, 5).map((pay) => (
                        <div key={pay.id} className="py-3 flex items-center justify-between text-xs font-mono">
                          <div>
                            <div className="font-bold text-violet-300">{pay.razorpay_payment_id}</div>
                            <div className="text-[11px] text-slate-400">Ref: {pay.order_number}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">₹{pay.amount}</div>
                            <div className="text-[10px] text-emerald-400 uppercase font-bold">{pay.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PRODUCTS MANAGEMENT */}
            {activeTab === 'products' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Marketplace Products Catalog</h2>
                    <p className="text-xs text-slate-400">Add, configure, and manage digital design kits</p>
                  </div>
                  <button
                    onClick={() => setShowProductModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-purple-950"
                  >
                    <Plus size={14} /> Add New Product
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-slate-400">
                        <th className="pb-3">TITLE</th>
                        <th className="pb-3">CATEGORY</th>
                        <th className="pb-3">PRICE</th>
                        <th className="pb-3">SKU</th>
                        <th className="pb-3">STATUS</th>
                        <th className="pb-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {products.map((p) => (
                        <tr key={p.id} className="text-slate-300">
                          <td className="py-3.5 font-bold text-white max-w-[220px] truncate">{p.title}</td>
                          <td className="py-3.5 text-slate-400">{p.category_title}</td>
                          <td className="py-3.5 font-bold text-emerald-400">₹{p.price}</td>
                          <td className="py-3.5 text-slate-500">{p.sku}</td>
                          <td className="py-3.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-bold">
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. CATEGORIES MANAGEMENT */}
            {activeTab === 'categories' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Design Categories (15 Disciplines)</h2>
                    <p className="text-xs text-slate-400">Manage marketplace taxonomies</p>
                  </div>
                  <button
                    onClick={() => setShowCategoryModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-purple-950"
                  >
                    <Plus size={14} /> Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((c) => (
                    <div key={c.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{c.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-violet-950/60 text-violet-300 border border-violet-500/30">
                          {c.badge}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono truncate">{c.slug}</div>
                      <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. ORDERS & PAYMENTS */}
            {activeTab === 'orders' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                <h2 className="text-xl font-bold text-white">All Platform Orders</h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-slate-400">
                        <th className="pb-3">ORDER #</th>
                        <th className="pb-3">CUSTOMER</th>
                        <th className="pb-3">TOTAL</th>
                        <th className="pb-3">PAYMENT</th>
                        <th className="pb-3">ORDER STATUS</th>
                        <th className="pb-3 text-right">STATUS CONTROL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="text-slate-300">
                          <td className="py-3.5 font-bold text-white">{ord.order_number}</td>
                          <td className="py-3.5">
                            <div className="font-semibold text-white">{ord.customer_name}</div>
                            <div className="text-[10px] text-slate-400">{ord.customer_email}</div>
                          </td>
                          <td className="py-3.5 font-bold text-emerald-400">₹{ord.total_amount}</td>
                          <td className="py-3.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {ord.payment_status}
                            </span>
                          </td>
                          <td className="py-3.5 font-semibold text-white uppercase">{ord.status}</td>
                          <td className="py-3.5 text-right">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              className="px-2 py-1 rounded-lg bg-[#140833] border border-white/10 text-white text-xs font-mono"
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. CUSTOM DESIGN BRIEFS */}
            {activeTab === 'custom' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                <h2 className="text-xl font-bold text-white">Client Custom Design Requests</h2>

                <div className="space-y-4">
                  {customRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-white text-base">{req.title}</h3>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">
                            Client: {req.name} ({req.email}) &bull; Category: {req.service_category}
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-violet-950 text-violet-300 border border-violet-500/30 w-fit">
                          {req.status}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 bg-black/30 p-4 rounded-xl border border-white/[0.04]">
                        {req.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 border-t border-white/[0.06] pt-3">
                        <div>Budget: {req.budget_range} &bull; Timeline: {req.timeline}</div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateCustomRequestStatus(req.id, 'reviewing')}
                            className="px-3 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-slate-300"
                          >
                            Mark Reviewing
                          </button>
                          <button
                            onClick={() => handleUpdateCustomRequestStatus(req.id, 'in_progress')}
                            className="px-3 py-1 rounded bg-violet-600/30 text-violet-200"
                          >
                            Mark In Progress
                          </button>
                          <button
                            onClick={() => handleUpdateCustomRequestStatus(req.id, 'completed')}
                            className="px-3 py-1 rounded bg-emerald-600/30 text-emerald-200"
                          >
                            Mark Completed
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. USER MANAGEMENT */}
            {activeTab === 'users' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                <h2 className="text-xl font-bold text-white">Registered Users & Permissions</h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-slate-400">
                        <th className="pb-3">USERNAME</th>
                        <th className="pb-3">EMAIL</th>
                        <th className="pb-3">ROLE</th>
                        <th className="pb-3">STAFF</th>
                        <th className="pb-3">JOINED</th>
                        <th className="pb-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {usersList.map((u) => (
                        <tr key={u.id} className="text-slate-300">
                          <td className="py-3.5 font-bold text-white">{u.username}</td>
                          <td className="py-3.5 text-slate-400">{u.email}</td>
                          <td className="py-3.5 font-bold text-violet-300 uppercase">{u.role || (u.is_staff ? 'admin' : 'customer')}</td>
                          <td className="py-3.5">{u.is_staff ? 'YES' : 'NO'}</td>
                          <td className="py-3.5 text-slate-500">{new Date(u.date_joined).toLocaleDateString()}</td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => handleToggleUserRole(u.id, u.role || (u.is_staff ? 'admin' : 'customer'))}
                              className="px-3 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-violet-300 transition-colors"
                            >
                              Toggle Role
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. INQUIRIES & MESSAGES */}
            {activeTab === 'inquiries' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                <h2 className="text-xl font-bold text-white">Client Contact Inquiries</h2>

                {inquiries.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs font-mono">No contact inquiries recorded.</div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-white">{inq.subject}</div>
                          <span className="text-[10px] font-mono text-slate-500">{new Date(inq.created_at).toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-violet-300 font-mono">From: {inq.name} ({inq.email})</div>
                        <p className="text-xs text-slate-300 pt-1">{inq.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 8. BLOG MANAGEMENT */}
            {activeTab === 'blog' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Published Creative Essays</h2>
                  <Link to="/blog" className="text-xs font-mono text-violet-400 hover:text-white flex items-center gap-1">
                    <span>View Public Blog</span> <ArrowUpRight size={13} />
                  </Link>
                </div>

                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="font-bold text-white text-sm">{post.title}</div>
                        <div className="text-xs text-slate-400 font-mono">{post.category} &bull; {post.views_count} views &bull; By {post.author_name}</div>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="text-xs text-violet-300 hover:underline">
                        Preview
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. SUBSCRIBERS */}
            {activeTab === 'subscribers' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
                <h2 className="text-xl font-bold text-white">Newsletter Audience ({subscribers.length})</h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-slate-400">
                        <th className="pb-3">SUBSCRIBER EMAIL</th>
                        <th className="pb-3">STATUS</th>
                        <th className="pb-3 text-right">DATE JOINED</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {subscribers.map((s) => (
                        <tr key={s.id} className="text-slate-300">
                          <td className="py-3 font-bold text-white">{s.email}</td>
                          <td className="py-3 text-emerald-400">ACTIVE</td>
                          <td className="py-3 text-right text-slate-500">{new Date(s.subscribed_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal: Add Product */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-lg w-full p-8 rounded-3xl bg-[#0e0722] border border-violet-500/30 space-y-5">
            <h3 className="text-lg font-bold text-white">Add New Marketplace Product</h3>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300">Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-300">Category</label>
                  <select
                    required
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#140833] border border-white/10 text-white text-xs"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-300">Price (INR)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300">SKU</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PKG-LOGO-012"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300">Description</label>
                <textarea
                  rows={3}
                  required
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] text-xs font-mono text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-mono font-bold text-white"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Category */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#0e0722] border border-violet-500/30 space-y-5">
            <h3 className="text-lg font-bold text-white">Add New Category</h3>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300">Category Name</label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-300">Description</label>
                <textarea
                  rows={2}
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] text-xs font-mono text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-mono font-bold text-white"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
