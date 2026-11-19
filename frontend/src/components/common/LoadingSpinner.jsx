import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = 20, className = '' }) => {
  return (
    <Loader2
      size={size}
      className={`animate-spin text-indigo-400 inline-block ${className}`}
    />
  );
};

export default LoadingSpinner;

