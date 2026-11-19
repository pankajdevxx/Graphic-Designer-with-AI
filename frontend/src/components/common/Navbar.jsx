import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Menu,
  X,
  User,
  ArrowRight,
  Activity,
  ShoppingCart,
  Heart,
  Shield,
  LogOut,
  LayoutDashboard,
  Download,
  Package,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import GradientText from '../ui/GradientText';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';
import AuthModal from '../modals/AuthModal';
import CustomOrderModal from '../modals/CustomOrderModal';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

/**
 * Premium Glassmorphism Navbar
 * Sticky header with animated active indicators, live cart & wishlist counters,
 * real JWT auth user profile pill, mobile drawer, and high-tech reference styling.
 */
export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Categories', path: '/marketplace/categories' },
    { name: 'Services', path: '/services' },
    { name: 'Custom Design', path: '/custom-request' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
  ];

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#06020e]/85 backdrop-blur-2xl border-b border-white/[0.08] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-600/40 rounded-xl blur-md group-hover:blur-lg transition-all" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center text-white border border-white/20 shadow-lg shadow-purple-950/50 group-hover:scale-105 transition-transform duration-300">
                  <Sparkles size={20} className="text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-purple-200 transition-colors">
                    PixelGen
                  </span>
                  <GradientText variant="purple-fuchsia" className="text-xl">
                    Creativity
                  </GradientText>
                </div>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                  Digital Design Marketplace
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Pill Style) */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    relative px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 uppercase tracking-wider
                    ${
                      isActive
                        ? 'text-white bg-white/[0.08] border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      {isActive && <span className="text-violet-400">&lt;</span>}
                      <span>{link.name}</span>
                      {isActive && <span className="text-violet-400">&gt;</span>}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Actions: Wishlist, Cart, User Auth & Contact Button */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Telemetry Health */}
              <NavLink
                to="/health"
                className={({ isActive }) => `
                  p-2 rounded-xl text-slate-400 hover:text-purple-300 hover:bg-white/[0.04] transition-colors
                  ${isActive ? 'text-purple-400 bg-purple-950/40 border border-purple-500/30' : ''}
                `}
                title="System Health & MySQL Status"
              >
                <Activity size={17} />
              </NavLink>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/8 hover:border-purple-500/30 text-slate-300 hover:text-white transition-all"
                title="View Wishlist"
              >
                <Heart size={18} className={wishlistCount > 0 ? 'text-pink-400 fill-pink-400/20' : ''} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-600 text-white text-[10px] font-black flex items-center justify-center shadow-md shadow-pink-950"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Shopping Cart Link */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/8 hover:border-purple-500/30 text-slate-300 hover:text-white transition-all"
                title="View Shopping Cart"
              >
                <ShoppingCart size={18} className={cartCount > 0 ? 'text-purple-400' : ''} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[10px] font-black flex items-center justify-center shadow-md shadow-purple-950"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* User Authentication / Dashboard Dropdown */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#160b33]/80 border border-purple-500/30 hover:border-purple-400 text-white transition-all shadow-md shadow-purple-950/40"
                  >
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-[11px] font-bold text-white">
                      {user.first_name ? user.first_name[0] : user.username[0].toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold max-w-[100px] truncate">
                      {user.first_name || user.username}
                    </span>
                    {isAdmin && (
                      <span className="px-1.5 py-0.5 rounded bg-violet-600 text-white text-[9px] font-black uppercase tracking-wider">
                        ADMIN
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0e0722] border border-white/[0.08] shadow-2xl shadow-purple-950/70 py-2 z-50 backdrop-blur-2xl"
                      >
                        <div className="px-4 py-2 border-b border-white/[0.08]">
                          <div className="text-xs font-bold text-white truncate">{user.full_name || user.username}</div>
                          <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                        </div>

                        <div className="py-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <LayoutDashboard size={14} className="text-violet-400" />
                            <span>User Dashboard</span>
                          </Link>

                          <Link
                            to="/purchased-designs"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <Package size={14} className="text-purple-400" />
                            <span>Purchased Designs</span>
                          </Link>

                          <Link
                            to="/download-center"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <Download size={14} className="text-emerald-400" />
                            <span>Download Center</span>
                          </Link>

                          {isAdmin && (
                            <Link
                              to="/admin-dashboard"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-xs text-violet-300 hover:text-violet-200 hover:bg-violet-950/40 transition-colors font-bold"
                            >
                              <Shield size={14} className="text-violet-400" />
                              <span>Admin Dashboard</span>
                            </Link>
                          )}
                        </div>

                        <div className="pt-1 border-t border-white/[0.08]">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut size={14} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 py-2 text-xs font-mono font-semibold text-slate-300 hover:text-white transition-colors uppercase tracking-wider"
                  >
                    LOGIN
                  </Link>
                  <Link to="/register">
                    <button className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-xs font-mono font-bold text-white uppercase tracking-wider transition-all">
                      REGISTER
                    </button>
                  </Link>
                </div>
              )}

              {/* Reference-style "↗ CONTACT US" Pill */}
              <Link to="/contact">
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black hover:bg-slate-200 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-md shadow-white/10 group">
                  <ArrowUpRight size={14} className="text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>CONTACT US</span>
                </button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/cart"
                className="relative p-2 rounded-xl bg-white/[0.04] text-slate-300"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/8 text-slate-300 hover:text-white"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/[0.08] bg-[#070212]/95 backdrop-blur-2xl px-4 pt-4 pb-8 space-y-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      px-3 py-2 rounded-xl text-xs font-mono font-medium uppercase
                      ${isActive ? 'bg-purple-600/30 text-white border border-purple-500/30' : 'text-slate-300 hover:text-white'}
                    `}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-white flex items-center gap-2"
                    >
                      <LayoutDashboard size={14} /> User Dashboard ({user.username})
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-2.5 rounded-xl bg-violet-950/60 border border-violet-500/30 text-xs font-bold text-violet-300 flex items-center gap-2"
                      >
                        <Shield size={14} /> Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 rounded-xl text-xs text-red-400 font-semibold text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center text-xs font-mono text-white font-bold"
                    >
                      LOGIN
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 rounded-xl bg-purple-600 text-center text-xs font-mono text-white font-bold"
                    >
                      REGISTER
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Modal (Fallback for quick login popup) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Custom Order Modal */}
      <CustomOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
