import React, { useState } from 'react';
import { store } from '../services/store';
import type { UserRole } from '../types';
import { AlertCircle, Users, RefreshCw, Key, ShieldCheck, ChevronDown } from 'lucide-react';
import { firebaseStatus } from '../services/firebase';

export const DemoBanner: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(store.getCurrentUser());
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showEnvModal, setShowEnvModal] = useState(false);

  React.useEffect(() => {
    return store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
    });
  }, []);

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'admin', label: 'Administrator', desc: 'Full review, verification, moderation & audit logs' },
    { role: 'volunteer', label: 'Volunteer', desc: 'Explore and assign volunteer tasks, submit outreach' },
    { role: 'org_rep', label: 'Organization Rep', desc: 'Manage organization listings & received supply pledges' },
    { role: 'shelter_provider', label: 'Shelter Provider', desc: 'Update bed availability and shelter listings' },
    { role: 'donation_point_manager', label: 'Donation Point Manager', desc: 'Update accepted supplies & opening hours' },
    { role: 'donor', label: 'Donor', desc: 'Pledge supplies and explore transparent donation records' },
    { role: 'community', label: 'Community User', desc: 'Find help near you, submit respectful community reports' },
    { role: 'moderator', label: 'Moderator', desc: 'Review community reports and content flag inquiries' }
  ];

  const handleRoleSelect = (r: UserRole) => {
    store.setCurrentUserRole(r);
    setShowRoleDropdown(false);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to default nationwide seed listings?')) {
      store.resetToFactorySeeds();
      window.location.reload();
    }
  };

  return (
    <>
      <aside aria-label="Demo mode notice" className="bg-amber-500 text-slate-900 border-b border-amber-600 px-4 py-2 text-xs md:text-sm font-medium shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
            </span>
            <span className="font-semibold uppercase tracking-wider text-[11px] bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded">
              Demo Mode
            </span>
            <span>
              All listings and donation records are sample demo data. No actual payments or unauthorized data collection occur.
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Role switcher button */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="bg-white/90 hover:bg-white text-slate-800 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors border border-amber-600/30"
              >
                <Users className="w-3.5 h-3.5 text-brand-coral" />
                <span>Active Role: <strong className="text-brand-coral capitalize">{currentUser.role.replace('_', ' ')}</strong></span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-1 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Switch Test Persona
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {roles.map((item) => (
                      <button
                        key={item.role}
                        onClick={() => handleRoleSelect(item.role)}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-amber-50 flex flex-col transition-colors ${
                          currentUser.role === item.role ? 'bg-amber-100/60 font-medium' : ''
                        }`}
                      >
                        <span className="font-semibold text-slate-900 flex items-center justify-between">
                          {item.label}
                          {currentUser.role === item.role && (
                            <span className="text-[10px] text-brand-coral font-bold">Active</span>
                          )}
                        </span>
                        <span className="text-[11px] text-slate-500">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Integration Setup Status */}
            <button
              onClick={() => setShowEnvModal(true)}
              className="bg-amber-600/30 hover:bg-amber-600/50 text-slate-900 px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors"
              title="View Firebase & Razorpay setup instructions"
            >
              <Key className="w-3 h-3" />
              <span className="hidden sm:inline">Setup Guide</span>
            </button>

            {/* Reset Seeds */}
            <button
              onClick={handleResetData}
              className="bg-amber-600/30 hover:bg-amber-600/50 text-slate-900 p-1 rounded-md text-xs transition-colors"
              title="Reset to fresh sample seeds"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* Integration Setup Dialog */}
      {showEnvModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-hope" />
                <h3 className="text-base font-bold text-slate-900">Backend & Service Credentials Status</h3>
              </div>
              <button
                onClick={() => setShowEnvModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                  <span>Firebase Authentication & Firestore</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] ${
                    firebaseStatus.isConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {firebaseStatus.isConfigured ? 'Configured' : 'Demo Local Mode Active'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-2">
                  {firebaseStatus.isConfigured
                    ? 'Connected to live Firebase services.'
                    : 'Running in safe local reactive storage mode. To connect live Firebase, fill VITE_FIREBASE_* in .env file.'}
                </p>
                {!firebaseStatus.isConfigured && (
                  <div className="text-[10px] font-mono bg-slate-100 p-2 rounded text-slate-700">
                    Missing: {firebaseStatus.missingKeys.join(', ')}
                  </div>
                )}
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                  <span>Razorpay Payment Gateway</span>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-amber-100 text-amber-800">
                    Demo Mode Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Per specifications, no payment simulation or fake receipts are produced. Real payments require setting <code className="bg-slate-200 px-1 rounded">VITE_RAZORPAY_KEY_ID</code> and server-side signature webhook validation.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                <span className="font-semibold block mb-0.5">Leaflet OpenStreetMap: Active</span>
                <span className="text-[11px]">Free, non-commercial nationwide tile provider loaded. Fully operational across all Indian states and territories.</span>
              </div>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => setShowEnvModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close Setup Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
