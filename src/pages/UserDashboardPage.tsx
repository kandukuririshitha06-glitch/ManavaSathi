import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../services/store';
import { CommunityNeedsReport, SupplyDonation, UserProfile } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import {
  User,
  PackageCheck,
  AlertCircle,
  ShieldCheck,
  PlusCircle,
  Clock,
  MapPin,
  Settings,
  ChevronRight
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(store.getCurrentUser());
  const [needs, setNeeds] = useState<CommunityNeedsReport[]>(store.getCommunityNeeds());
  const [supplies, setSupplies] = useState<SupplyDonation[]>(store.getSupplyDonations());

  useEffect(() => {
    return store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
      setNeeds(store.getCommunityNeeds());
      setSupplies(store.getSupplyDonations());
    });
  }, []);

  const myNeeds = needs.filter((n) => n.reporterId === currentUser.id);
  const mySupplies = supplies.filter((s) => s.donorId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-1">
            <User className="w-4 h-4 text-brand-coral" />
            <span>Personal Dashboard</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Namaste, {currentUser.displayName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Role: <strong className="capitalize text-brand-coral">{currentUser.role.replace('_', ' ')}</strong> • Member since {new Date(currentUser.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/profile"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Profile & Privacy</span>
          </Link>

          <Link
            to="/report-need"
            className="px-4 py-2 bg-brand-coral hover:bg-brand-coralHover text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Report Need</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Community Needs Reports */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>My Community Outreach Reports ({myNeeds.length})</span>
            </h2>
            <Link to="/report-need" className="text-xs font-bold text-brand-coral hover:underline">
              + New Report
            </Link>
          </div>

          <div className="space-y-3">
            {myNeeds.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-xs text-slate-500">
                You haven't submitted any community needs reports yet.
              </div>
            ) : (
              myNeeds.map((need) => (
                <div key={need.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-brand-coral uppercase text-[10px]">
                      {need.category.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-1">
                      <StatusBadge status={need.urgency} size="sm" />
                      <StatusBadge status={need.status} size="sm" />
                    </div>
                  </div>
                  <p className="text-slate-800 font-medium">{need.description}</p>
                  <p className="text-slate-500 text-[11px]">
                    📍 {need.approximateLocation.generalArea}, {need.approximateLocation.city}
                  </p>
                  {need.reviewNotes && (
                    <div className="p-2 rounded bg-blue-50 text-blue-900 text-[11px]">
                      <strong>Verification Note:</strong> {need.reviewNotes}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Supply Pledges */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-emerald-600" />
              <span>My Supply Donation Pledges ({mySupplies.length})</span>
            </h2>
            <Link to="/donate-supplies" className="text-xs font-bold text-brand-coral hover:underline">
              + Pledge Items
            </Link>
          </div>

          <div className="space-y-3">
            {mySupplies.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-xs text-slate-500">
                No active supply pledges. You can offer clean blankets, clothing, or grains.
              </div>
            ) : (
              mySupplies.map((supply) => (
                <div key={supply.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      To: {supply.targetOrganizationName}
                    </span>
                    <span className="capitalize px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                      Status: {supply.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {supply.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] bg-slate-50 p-1.5 rounded">
                        <span>{it.name} ({it.quantity})</span>
                        <span className="text-slate-500 capitalize">{it.condition.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Method: {supply.preferredMethod === 'dropoff' ? 'Drop-off' : 'Volunteer pickup'} • {supply.suitableTimes}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
