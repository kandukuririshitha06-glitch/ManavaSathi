import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../services/store';
import { Organization, AssistancePoint, SupplyDonation, VolunteerTask } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import {
  Building2,
  PackageCheck,
  CheckCircle2,
  Clock,
  PlusCircle,
  MapPin,
  Calendar,
  Users,
  Settings,
  ShieldCheck
} from 'lucide-react';

export const OrganizationDashboardPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(store.getCurrentUser());
  const [orgs, setOrgs] = useState<Organization[]>(store.getOrganizations());
  const [points, setPoints] = useState<AssistancePoint[]>(store.getAssistancePoints());
  const [supplies, setSupplies] = useState<SupplyDonation[]>(store.getSupplyDonations());
  const [tasks, setTasks] = useState<VolunteerTask[]>(store.getVolunteerTasks());

  useEffect(() => {
    return store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
      setOrgs(store.getOrganizations());
      setPoints(store.getAssistancePoints());
      setSupplies(store.getSupplyDonations());
      setTasks(store.getVolunteerTasks());
    });
  }, []);

  const myOrg = orgs.find((o) => o.id === currentUser.organizationId) || orgs[0];
  const myPoints = points.filter((p) => p.organizationId === myOrg?.id || p.organizationName.includes(myOrg?.name || ''));
  const myIncomingSupplies = supplies.filter((s) => s.targetOrganizationName.includes(myOrg?.name || ''));

  const handleUpdateAvailability = (pointId: string, newStatus: AssistancePoint['availabilityStatus']) => {
    store.updatePointAvailability(pointId, newStatus);
  };

  const handleUpdateSupplyStatus = (supplyId: string, status: SupplyDonation['status']) => {
    store.updateSupplyStatus(supplyId, status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Organization Portal</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {myOrg?.name || 'Organization Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Manage your service centers, respond to supply pledges, and deploy volunteer outreach drives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={myOrg?.verificationStatus || 'pending'} />
          <Link
            to="/donation-points"
            className="px-4 py-2.5 rounded-xl bg-brand-coral hover:bg-brand-coralHover text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register New Service Point</span>
          </Link>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-slate-400 font-bold uppercase block mb-1">Legal Registration</span>
          <p className="font-semibold text-slate-800 text-sm">{myOrg?.registrationNumber || 'Pending'}</p>
          <span className="text-slate-500">{myOrg?.category}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase block mb-1">Headquarters</span>
          <p className="font-semibold text-slate-800 text-sm">{myOrg?.city}, {myOrg?.state}</p>
          <span className="text-slate-500">{myOrg?.address}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase block mb-1">Authorized Contact</span>
          <p className="font-semibold text-slate-800 text-sm">{myOrg?.authorizedPerson}</p>
          <span className="text-slate-500">{myOrg?.contactEmail} • {myOrg?.contactPhone}</span>
        </div>
      </div>

      {/* Grid: Service Points and Incoming Supplies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Managed Service Points */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Our Managed Assistance Points ({myPoints.length})
            </h2>
          </div>

          <div className="space-y-3">
            {myPoints.map((point) => (
              <div
                key={point.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-brand-coral uppercase bg-orange-50 px-2 py-0.5 rounded">
                    {point.category.replace('_', ' ')}
                  </span>
                  <StatusBadge status={point.status} size="sm" />
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{point.title}</h3>
                <p className="text-slate-600">📍 {point.address.fullAddress}</p>

                {/* Quick Availability updater */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-slate-500 font-semibold">Live Availability:</span>
                  <select
                    value={point.availabilityStatus}
                    onChange={(e) => handleUpdateAvailability(point.id, e.target.value as any)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-800 text-[11px]"
                  >
                    <option value="confirmed">Confirmed Operating Today</option>
                    <option value="schedule_published">Schedule Published</option>
                    <option value="unknown">Unknown</option>
                    <option value="temporarily_unavailable">Temporarily Closed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incoming Supply Pledges */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Incoming Essential Supply Pledges ({myIncomingSupplies.length})
          </h2>

          <div className="space-y-3">
            {myIncomingSupplies.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                No active supply pledges offered to your organization at this time.
              </div>
            ) : (
              myIncomingSupplies.map((supply) => (
                <div
                  key={supply.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      Donor: {supply.donorName} ({supply.generalLocation})
                    </span>
                    <span className="capitalize px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                      {supply.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {supply.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between bg-slate-50 p-2 rounded-lg text-[11px]">
                        <span className="font-medium text-slate-800">{it.name} ({it.quantity})</span>
                        <span className="text-slate-500 capitalize">{it.condition.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-500 text-[11px]">
                    <strong>Logistics:</strong> {supply.preferredMethod === 'dropoff' ? 'Donor will drop off' : 'Pickup requested'} • {supply.suitableTimes}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-slate-500">Update Status:</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleUpdateSupplyStatus(supply.id, 'accepted')}
                        className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded-lg font-bold text-[11px]"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateSupplyStatus(supply.id, 'received')}
                        className="px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 rounded-lg font-bold text-[11px]"
                      >
                        Received
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
