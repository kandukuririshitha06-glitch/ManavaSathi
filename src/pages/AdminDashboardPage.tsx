import React, { useState, useEffect } from 'react';
import { store } from '../services/store';
import {
  AssistancePoint,
  Organization,
  CommunityNeedsReport,
  VolunteerTask,
  AuditLog,
  ListingStatus,
  NeedStatus
} from '../types';
import { StatusBadge } from '../components/StatusBadge';
import {
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  MapPin,
  Clock,
  History,
  FileCheck,
  PackageCheck,
  Users
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(store.getCurrentUser());
  const [points, setPoints] = useState<AssistancePoint[]>(store.getAssistancePoints());
  const [orgs, setOrgs] = useState<Organization[]>(store.getOrganizations());
  const [needs, setNeeds] = useState<CommunityNeedsReport[]>(store.getCommunityNeeds());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(store.getAuditLogs());

  const [activeTab, setActiveTab] = useState<'points' | 'orgs' | 'needs' | 'logs'>('points');
  const [actionReason, setActionReason] = useState('');
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);

  useEffect(() => {
    return store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
      setPoints(store.getAssistancePoints());
      setOrgs(store.getOrganizations());
      setNeeds(store.getCommunityNeeds());
      setAuditLogs(store.getAuditLogs());
    });
  }, []);

  const pendingPoints = points.filter((p) => p.status === 'pending');
  const pendingOrgs = orgs.filter((o) => o.verificationStatus === 'pending');
  const openNeeds = needs.filter((n) => n.status === 'new' || n.status === 'awaiting_review');

  const handleUpdatePointStatus = (id: string, status: ListingStatus) => {
    const reason = actionReason.trim() || `Status updated to ${status} by admin`;
    store.updateAssistancePointStatus(id, status, reason);
    setActionReason('');
    setSelectedTargetId(null);
  };

  const handleUpdateOrgVerification = (id: string, status: 'verified' | 'rejected') => {
    const reason = actionReason.trim() || `Organization verification marked as ${status}`;
    store.updateOrganizationVerification(id, status, reason);
    setActionReason('');
    setSelectedTargetId(null);
  };

  const handleUpdateNeedStatus = (id: string, status: NeedStatus) => {
    const reason = actionReason.trim() || `Need status updated to ${status}`;
    store.updateCommunityNeedStatus(id, status, reason);
    setActionReason('');
    setSelectedTargetId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-amber-300 text-xs font-bold mb-1">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Governance & Verification Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Admin: <strong>{currentUser.email}</strong> • Every review action is cryptographically timestamped in the audit log.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('points')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'points' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5 text-brand-coral" />
            <span>Points ({pendingPoints.length} Pending)</span>
          </button>

          <button
            onClick={() => setActiveTab('orgs')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'orgs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Orgs ({pendingOrgs.length} Pending)</span>
          </button>

          <button
            onClick={() => setActiveTab('needs')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'needs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Needs ({openNeeds.length} Pending)</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'logs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5 text-blue-600" />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Assistance Points Verification */}
      {activeTab === 'points' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Review Submitted Assistance & Donation Points ({points.length} Total)
          </h2>

          <div className="space-y-3">
            {points.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{p.title}</span>
                    <span className="text-[10px] uppercase font-bold text-brand-coral bg-orange-50 px-2 py-0.5 rounded">
                      {p.category.replace('_', ' ')}
                    </span>
                  </div>
                  <StatusBadge status={p.status} size="sm" />
                </div>

                <p className="text-slate-600">{p.description}</p>
                <p className="text-slate-500">
                  📍 {p.address.fullAddress} • Org: <strong>{p.organizationName}</strong>
                </p>

                {p.verificationNotes && (
                  <p className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700">
                    <strong>Admin Record:</strong> {p.verificationNotes}
                  </p>
                )}

                {/* Action Toolbar */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    Created: {new Date(p.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    {p.status !== 'verified' && (
                      <button
                        onClick={() => handleUpdatePointStatus(p.id, 'verified')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify & Approve</span>
                      </button>
                    )}

                    {p.status !== 'rejected' && (
                      <button
                        onClick={() => handleUpdatePointStatus(p.id, 'rejected')}
                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-bold flex items-center gap-1 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}

                    {p.status !== 'needs_update' && (
                      <button
                        onClick={() => handleUpdatePointStatus(p.id, 'needs_update')}
                        className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg font-bold transition-colors"
                      >
                        Flag for Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Organizations Verification */}
      {activeTab === 'orgs' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Review Organization Registrations ({orgs.length} Total)
          </h2>

          <div className="space-y-3">
            {orgs.map((org) => (
              <div
                key={org.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{org.name}</h3>
                    <p className="text-slate-500 font-medium">Reg ID: {org.registrationNumber} • {org.category}</p>
                  </div>
                  <StatusBadge status={org.verificationStatus} size="sm" />
                </div>

                <p className="text-slate-600">{org.description}</p>
                <p className="text-slate-500">
                  📍 {org.address}, {org.city}, {org.state} • Officer: <strong>{org.authorizedPerson}</strong> ({org.contactPhone})
                </p>

                {org.verificationNotes && (
                  <p className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700">
                    <strong>Review Note:</strong> {org.verificationNotes}
                  </p>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    Applied: {new Date(org.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    {org.verificationStatus !== 'verified' && (
                      <button
                        onClick={() => handleUpdateOrgVerification(org.id, 'verified')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify Organization</span>
                      </button>
                    )}

                    {org.verificationStatus !== 'rejected' && (
                      <button
                        onClick={() => handleUpdateOrgVerification(org.id, 'rejected')}
                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-bold flex items-center gap-1 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Community Needs Moderation */}
      {activeTab === 'needs' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Moderate Community Needs Outreach Reports ({needs.length} Total)
          </h2>

          <div className="space-y-3">
            {needs.map((need) => (
              <div
                key={need.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-coral uppercase text-[10px]">
                    Category: {need.category.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <StatusBadge status={need.urgency} size="sm" />
                    <StatusBadge status={need.status} size="sm" />
                  </div>
                </div>

                <p className="text-slate-800 font-medium">{need.description}</p>
                <p className="text-slate-500">
                  📍 {need.approximateLocation.generalArea}, {need.approximateLocation.city}, {need.approximateLocation.state}
                </p>

                {need.reviewNotes && (
                  <p className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700">
                    <strong>Audit Record:</strong> {need.reviewNotes}
                  </p>
                )}

                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    Reporter: {need.reporterType} • {new Date(need.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => handleUpdateNeedStatus(need.id, 'verified_need')}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded-lg font-bold text-[11px]"
                    >
                      Confirm Need
                    </button>
                    <button
                      onClick={() => handleUpdateNeedStatus(need.id, 'assistance_planned')}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-lg font-bold text-[11px]"
                    >
                      Assistance Planned
                    </button>
                    <button
                      onClick={() => handleUpdateNeedStatus(need.id, 'resolved')}
                      className="px-2.5 py-1 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-bold text-[11px]"
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <span>Immutable Administrative Audit Trail</span>
          </h2>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Admin</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Target</th>
                  <th className="p-3">Recorded Justification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-3 font-semibold text-slate-900">{log.adminEmail}</td>
                    <td className="p-3">
                      <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[10px] text-slate-500">{log.targetType}:{log.targetId}</td>
                    <td className="p-3 text-slate-600">{log.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
