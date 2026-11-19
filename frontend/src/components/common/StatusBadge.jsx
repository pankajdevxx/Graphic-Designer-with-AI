import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

export const StatusBadge = ({ status, label }) => {
  const normalized = (status || '').toLowerCase();

  let styles = 'bg-slate-800 text-slate-300 border-slate-700';
  let Icon = Info;

  if (normalized === 'healthy' || normalized === 'connected' || normalized === 'operational') {
    styles = 'bg-emerald-950/80 text-emerald-300 border-emerald-600/40';
    Icon = CheckCircle2;
  } else if (normalized === 'degraded' || normalized === 'warning') {
    styles = 'bg-amber-950/80 text-amber-300 border-amber-600/40';
    Icon = AlertTriangle;
  } else if (normalized === 'error' || normalized === 'failed' || normalized === 'disconnected') {
    styles = 'bg-rose-950/80 text-rose-300 border-rose-600/40';
    Icon = XCircle;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${styles}`}
    >
      <Icon size={14} />
      <span>{label || status}</span>
    </span>
  );
};

export default StatusBadge;

