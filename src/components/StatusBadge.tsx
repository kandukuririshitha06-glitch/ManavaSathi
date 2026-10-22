import React from 'react';
import { ListingStatus, AvailabilityStatus, NeedStatus, NeedUrgency } from '../types';
import { CheckCircle2, Clock, AlertTriangle, XCircle, Info, ShieldAlert } from 'lucide-react';

interface StatusBadgeProps {
  status: ListingStatus | AvailabilityStatus | NeedStatus | NeedUrgency | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  switch (status) {
    case 'verified':
    case 'confirmed':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Verified Service
        </span>
      );

    case 'pending':
    case 'awaiting_review':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 ${sizeClasses}`}>
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Pending Verification
        </span>
      );

    case 'needs_update':
    case 'outdated':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 ${sizeClasses}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
          Needs Updated Information
        </span>
      );

    case 'temporarily_closed':
    case 'temporarily_unavailable':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
          <XCircle className="w-3.5 h-3.5 text-slate-500" />
          Temporarily Closed
        </span>
      );

    case 'rejected':
    case 'unable_to_verify':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-red-50 text-red-700 border border-red-200 ${sizeClasses}`}>
          <XCircle className="w-3.5 h-3.5 text-red-500" />
          Rejected / Unverified
        </span>
      );

    case 'schedule_published':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses}`}>
          <Info className="w-3.5 h-3.5 text-blue-600" />
          Schedule Published
        </span>
      );

    case 'critical':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-red-100 text-red-800 border border-red-300 font-semibold ${sizeClasses}`}>
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          Urgent Attention
        </span>
      );

    case 'high':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 ${sizeClasses}`}>
          High Priority
        </span>
      );

    case 'medium':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 ${sizeClasses}`}>
          Medium Priority
        </span>
      );

    case 'low':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
          Low Priority
        </span>
      );

    case 'assistance_in_progress':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 ${sizeClasses}`}>
          Assistance in Progress
        </span>
      );

    case 'resolved':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Resolved
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
          {status}
        </span>
      );
  }
};
