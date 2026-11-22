import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, KeyRound, Lock, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import authService from '../services/authService';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientText from '../components/ui/GradientText';
import AuthGraphicBackground from '../components/auth/AuthGraphicBackground';

export const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: enter email, 2: enter code & new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [demoCode, setDemoCode] = useState('');

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.forgotPassword(email.trim());
      setMessage(res.message || 'Reset code sent.');
      if (res.demo_code) {
        setDemoCode(res.demo_code);
        setCode(res.demo_code);
      }
      setStep(2);
    } catch (err) {
      setErrorMessage(err?.details?.email?.[0] || err?.message || 'Failed to request reset.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!code.trim() || !newPassword) {
      setErrorMessage('Please provide the reset code and your new password.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.resetPassword({
        email: email.trim(),
        code: code.trim(),
        new_password: newPassword,
      });
      setMessage(res.message);
      setStep(3); // success
    } catch (err) {
      setErrorMessage(err?.details?.email?.[0] || err?.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGraphicBackground>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full relative my-8"
      >
        <div className="relative p-8 sm:p-10 rounded-3xl bg-[#0b051c]/85 border border-white/[0.12] backdrop-blur-2xl shadow-[0_0_60px_rgba(139,92,246,0.22)] space-y-6 overflow-hidden">
          {/* Top Decorative Gradient Shimmer Bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />

          {/* Precision Alignment Crosses */}
          <span className="absolute top-3 left-3 text-slate-500/30 font-mono text-[10px] select-none pointer-events-none">+</span>
          <span className="absolute top-3 right-3 text-slate-500/30 font-mono text-[10px] select-none pointer-events-none">+</span>
          <span className="absolute bottom-3 left-3 text-slate-500/30 font-mono text-[10px] select-none pointer-events-none">+</span>
          <span className="absolute bottom-3 right-3 text-slate-500/30 font-mono text-[10px] select-none pointer-events-none">+</span>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-violet-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-950/50">
              <KeyRound size={22} />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Password <GradientText variant="purple-fuchsia">Recovery</GradientText>
            </h1>
            <p className="text-xs text-slate-400">
              {step === 1 && 'Enter your registered email address to receive a secure recovery code.'}
              {step === 2 && 'Enter the verification code and set your new account password.'}
              {step === 3 && 'Your password has been successfully updated.'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {message && step !== 3 && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-400" />
              <span>{message}</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500"
                    required
                  />
                </div>
              </div>

              <PrimaryButton
                type="submit"
                size="lg"
                loading={loading}
                icon={ArrowRight}
                className="w-full justify-center"
              >
                Send Recovery Code
              </PrimaryButton>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {demoCode && (
                <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/30 text-[11px] font-mono text-violet-300">
                  Dev/Sandbox Test Code: <span className="font-bold text-white">{demoCode}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. PIXEL-8849"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                  New Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500"
                    required
                  />
                </div>
              </div>

              <PrimaryButton
                type="submit"
                size="lg"
                loading={loading}
                icon={CheckCircle2}
                className="w-full justify-center"
              >
                Set New Password
              </PrimaryButton>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                Your password has been reset successfully! You can now log into your account.
              </div>
              <Link to="/login">
                <PrimaryButton size="lg" className="w-full justify-center">
                  Proceed to Sign In
                </PrimaryButton>
              </Link>
            </div>
          )}

          <div className="text-center pt-2 border-t border-white/[0.08] text-xs">
            <Link to="/login" className="text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </AuthGraphicBackground>
  );
};

export default ForgotPasswordPage;
