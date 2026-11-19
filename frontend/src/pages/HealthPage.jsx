import React, { useState, useEffect } from 'react';
import {
  Activity,
  RefreshCw,
  Database,
  Server,
  Clock,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Code2,
} from 'lucide-react';
import { getHealthStatus } from '../api/health';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

export const HealthPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getHealthStatus();
      setData(result);
      setLastChecked(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err);
      setData(null);
      setLastChecked(new Date().toLocaleTimeString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/60">
              <Activity size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">System Health & API Diagnostics</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Verifies frontend-to-backend communication and live database connectivity.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {lastChecked && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={13} /> Last probed: {lastChecked}
            </span>
          )}
          <button
            onClick={fetchHealth}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Probing...' : 'Re-test Health'}</span>
          </button>
        </div>
      </div>

      {/* Primary Status Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* API Health */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs font-medium text-slate-400 block mb-2">Backend Service</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                {data?.service || 'PixelGenCreativity'}
              </span>
              {loading ? (
                <LoadingSpinner size={16} />
              ) : data ? (
                <StatusBadge status={data.status} />
              ) : (
                <StatusBadge status="error" label="Unavailable" />
              )}
            </div>
          </div>

          {/* Database Connection */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs font-medium text-slate-400 block mb-2">MySQL Database</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                {data?.database?.engine ? `Engine: ${data.database.engine}` : 'MySQL Server 8.0'}
              </span>
              {loading ? (
                <LoadingSpinner size={16} />
              ) : data?.database?.connected ? (
                <StatusBadge status="healthy" label="Connected" />
              ) : (
                <StatusBadge status="warning" label="Connecting..." />
              )}
            </div>
          </div>

          {/* Latency */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs font-medium text-slate-400 block mb-2">DB Query Latency</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-mono font-bold text-indigo-400">
                {data?.database?.latency_ms !== undefined && data?.database?.latency_ms !== null
                  ? `${data.database.latency_ms} ms`
                  : '—'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">SELECT 1</span>
            </div>
          </div>

          {/* Environment */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs font-medium text-slate-400 block mb-2">Runtime Environment</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-300 capitalize">
                {data?.environment || 'Development'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                v{data?.version || '1.0.0'}
              </span>
            </div>
          </div>
        </div>

        {/* Database Notice / Error Banner */}
        {data?.database?.error && (
          <div className="mt-4 p-4 rounded-xl bg-amber-950/40 border border-amber-700/40 text-amber-300 text-xs flex items-start gap-3">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Database Connection Notice</p>
              <p className="font-mono text-[11px] mt-1 text-amber-200/90">{data.database.error}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-rose-950/40 border border-rose-700/40 text-rose-300 text-xs flex items-start gap-3">
            <ShieldAlert size={16} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Backend Communication Error</p>
              <p className="mt-1">
                Unable to contact backend endpoint at {import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/health/.
                Ensure the Django server is running.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Raw Response Payload */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex items-center gap-2 mb-3 text-xs font-medium text-slate-400">
          <Code2 size={15} />
          <span>Raw Diagnostics Response Payload</span>
        </div>
        <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 overflow-x-auto border border-slate-800">
          {JSON.stringify(data || error || { status: 'Probing endpoint...' }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default HealthPage;

