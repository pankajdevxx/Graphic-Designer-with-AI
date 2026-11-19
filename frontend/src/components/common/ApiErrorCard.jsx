import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';

export const ApiErrorCard = ({
  title = 'Failed to Load Marketplace Data',
  message = 'Unable to establish a connection with the Django backend or MySQL database. Please verify the backend service is running on port 8000.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-[#160a2c]/80 border border-red-500/30 backdrop-blur-xl text-center max-w-lg mx-auto my-8 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
      <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-purple-200/80 mb-6 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
};

export default ApiErrorCard;