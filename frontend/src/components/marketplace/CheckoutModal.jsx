import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Shield,
  Download,
  CreditCard,
  CheckCircle,
  FileText,
  Lock,
  Sparkles,
  ArrowRight,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, subtotal, discountAmount, total, couponCode, clearCart } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState('review'); // 'review' | 'processing' | 'success'
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.creator@example.com',
    paymentMethod: 'card',
    acceptTerms: true,
  });
  const [orderResult, setOrderResult] = useState(null);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      showToast('Please accept the digital license terms to proceed', 'error');
      return;
    }
    if (!formData.email || !formData.name) {
      showToast('Please provide your name and delivery email', 'error');
      return;
    }

    setStep('processing');

    setTimeout(() => {
      const generatedOrderId = `PXG-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedLicenseKey = `LIC-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      setOrderResult({
        orderId: generatedOrderId,
        licenseKey: generatedLicenseKey,
        items: [...cart],
        total,
        email: formData.email,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      });

      clearCart();
      setStep('success');
      showToast('Order completed! Your digital assets are ready for download.', 'success');
    }, 1500);
  };

  const copyLicenseKey = () => {
    if (orderResult?.licenseKey) {
      navigator.clipboard.writeText(orderResult.licenseKey);
      showToast('License key copied to clipboard!', 'info');
    }
  };

  const handleDownloadAsset = (title) => {
    showToast(`Downloading demo zip package for "${title}"...`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#0f0722] border border-purple-500/30 shadow-[0_0_60px_rgba(168,85,247,0.25)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-purple-400 hover:text-white bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: REVIEW & CHECKOUT */}
        {step === 'review' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Instant Digital Checkout
                </h3>
                <p className="text-xs sm:text-sm text-purple-300/70">
                  Secure instant access to your source files & commercial licenses
                </p>
              </div>
            </div>

            <form onSubmit={handleSimulatePayment} className="space-y-6">
              {/* Order Items Preview */}
              <div className="bg-[#150a2f]/80 rounded-2xl border border-purple-500/20 p-4 space-y-3">
                <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">
                  Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </div>
                <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-sm py-1.5 border-b border-purple-500/10 last:border-0"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="text-white font-medium truncate">
                          {item.product.title}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-500/30 shrink-0">
                          {item.licenseType}
                        </span>
                      </div>
                      <span className="text-white font-semibold shrink-0">
                        ${Math.round(item.product.price * (item.licenseType === 'Extended' ? 2.5 : 1)) * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-purple-500/20 space-y-1.5 text-xs text-purple-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-white font-medium">${Math.round(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>Discount ({couponCode}):</span>
                      <span>-${Math.round(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-purple-500/20">
                    <span>Total Due:</span>
                    <span className="text-purple-400">${Math.round(total)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Digital Delivery Destination
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-purple-300/80 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#140b2e] border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-purple-300/80 mb-1">Delivery Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#140b2e] border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Simulated Payment Method Selection */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Payment Gateway (Demonstration Sandbox)
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'razorpay', label: 'Razorpay Demo', icon: Shield },
                    { id: 'instant', label: 'Instant Download', icon: Download },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = formData.paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-purple-600/30 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                            : 'bg-[#150a2f]/60 border-purple-500/20 text-purple-300/70 hover:bg-[#150a2f] hover:border-purple-500/40'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* License Terms Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-purple-300/90 leading-relaxed pt-1">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-0.5 rounded border-purple-500/40 bg-[#12092b] text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                />
                <span>
                  I understand this is a digital purchase. All source files (AI, PSD, Figma) are provided instantly with commercial usage rights according to PixelGen license guidelines.
                </span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-purple-300 hover:text-white bg-[#150a2f] border border-purple-500/30 hover:border-purple-500/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2 transition-all"
                >
                  <span>Pay & Download (${Math.round(total)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: PROCESSING SIMULATION */}
        {step === 'processing' && (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin mx-auto" />
            <h3 className="text-xl font-bold text-white">Authorizing Digital Transaction...</h3>
            <p className="text-sm text-purple-300/70">
              Generating cryptographic license keys and provisioning your secure download package.
            </p>
          </div>
        )}

        {/* STEP 3: ORDER SUCCESS & INSTANT DOWNLOADS */}
        {step === 'success' && orderResult && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Purchase Confirmed!
              </h3>
              <p className="text-sm text-purple-300/80 mt-1">
                Receipt and backup links sent to <span className="text-white font-medium">{orderResult.email}</span>
              </p>
            </div>

            {/* License & Order Details Card */}
            <div className="bg-[#150a2f] rounded-2xl border border-purple-500/30 p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-purple-300 gap-2 border-b border-purple-500/10 pb-2">
                <div>
                  <span className="text-purple-400/80">Order Ref: </span>
                  <span className="font-mono text-white font-bold">{orderResult.orderId}</span>
                </div>
                <div>
                  <span className="text-purple-400/80">Date: </span>
                  <span className="text-white">{orderResult.date}</span>
                </div>
              </div>

              {/* License Key Box */}
              <div>
                <label className="block text-xs font-medium text-purple-300/80 mb-1">
                  Commercial License Key
                </label>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0b051a] border border-purple-500/40">
                  <span className="font-mono text-sm text-emerald-300 font-semibold tracking-wider">
                    {orderResult.licenseKey}
                  </span>
                  <button
                    onClick={copyLicenseKey}
                    className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors"
                    title="Copy Key"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Instant Download List */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Available Digital Asset Packages
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {orderResult.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#12092b] border border-purple-500/20 hover:border-purple-500/40 transition-all"
                  >
                    <div className="truncate pr-3">
                      <div className="text-sm font-semibold text-white truncate">
                        {item.product.title}
                      </div>
                      <div className="text-xs text-purple-400">
                        {item.licenseType} License &bull; {item.product.fileFormat || 'AI, PSD, Figma, SVG'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadAsset(item.product.title)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .ZIP</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Close / Return */}
            <div className="text-center pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#1a0f35] hover:bg-[#25154d] border border-purple-500/40 transition-all"
              >
                Close & Continue Browsing
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CheckoutModal;