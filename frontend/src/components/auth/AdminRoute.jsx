import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import PrimaryButton from '../ui/PrimaryButton';

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <LoadingSpinner size="lg" />
        <span className="text-sm text-slate-400">Verifying administrative privileges...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login?next=/admin-dashboard" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#0e0722]/80 border border-red-500/30 backdrop-blur-xl text-center space-y-6 shadow-2xl shadow-red-950/30">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <ShieldAlert size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Access Restricted</h2>
            <p className="text-sm text-slate-300">
              The Admin Dashboard requires elevated administrative permissions. Your current role is not authorized.
            </p>
          </div>
          <Link to="/dashboard">
            <PrimaryButton className="w-full justify-center">
              <ArrowLeft size={16} /> Return to User Dashboard
            </PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
