import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientText from '../components/ui/GradientText';

export const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const nextUrl = queryParams.get('next') || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!usernameOrEmail.trim() || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    setLoading(true);
    const result = await login({
      username_or_email: usernameOrEmail.trim(),
      password: password,
    });
    setLoading(false);

    if (result.success) {
      navigate(nextUrl);
    } else {
      setErrorMessage(result.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-2xl shadow-2xl shadow-purple-950/50 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono font-semibold">
              <Sparkles size={13} />
              <span>SECURE ACCESS</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome <GradientText variant="purple-fuchsia">Back</GradientText>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Sign in to manage your purchased designs, download licenses, and agency requests.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                Username or Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="creator@pixelgen.com or admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-violet-400 hover:text-violet-300 font-mono transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Quick Demo Credentials Pill */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] font-mono text-slate-400 space-y-1">
              <div className="text-slate-300 font-semibold">Demo Accounts:</div>
              <div>Admin: <span className="text-violet-300">admin</span> / <span className="text-violet-300">Admin@12345</span></div>
              <div>Customer: <span className="text-violet-300">demo_creator</span> / <span className="text-violet-300">Creator@12345</span></div>
            </div>

            <PrimaryButton
              type="submit"
              size="lg"
              loading={loading}
              icon={LogIn}
              className="w-full justify-center !shadow-[0_0_25px_rgba(168,85,247,0.35)]"
            >
              Sign In to Account
            </PrimaryButton>
          </form>

          {/* Footer */}
          <div className="text-center pt-2 border-t border-white/[0.08] text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-violet-400 font-bold hover:text-violet-300 transition-colors">
              Create an Account &rarr;
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
