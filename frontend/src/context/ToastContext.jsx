import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Fixed Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className={`
                pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl
                bg-[#13082b]/95 backdrop-blur-xl border shadow-[0_10px_35px_rgba(0,0,0,0.6)]
                text-xs font-semibold max-w-sm
                ${
                  toast.type === 'error'
                    ? 'border-rose-500/40 text-rose-300'
                    : toast.type === 'info'
                    ? 'border-cyan-500/40 text-cyan-300'
                    : 'border-purple-500/40 text-purple-200'
                }
              `}
            >
              {toast.type === 'error' ? (
                <AlertCircle size={16} className="text-rose-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info size={16} className="text-cyan-400 shrink-0" />
              ) : (
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              )}
              <span className="flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
