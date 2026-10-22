import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../services/store';
import { CommunityNeedsReport, AssistanceCategory, NeedStatus, NeedUrgency } from '../types';
import { InteractiveMap, MapMarkerData } from '../components/InteractiveMap';
import { StatusBadge } from '../components/StatusBadge';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import {
  AlertCircle,
  PlusCircle,
  ShieldCheck,
  MapPin,
  Clock,
  Filter,
  Users,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const CommunityNeedsMapPage: React.FC = () => {
  const [needs, setNeeds] = useState<CommunityNeedsReport[]>(store.getCommunityNeeds());
  const [selectedUrgency, setSelectedUrgency] = useState<NeedUrgency | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<NeedStatus | 'all'>('all');
  const [selectedState, setSelectedState] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    return store.subscribe(() => {
      setNeeds(store.getCommunityNeeds());
    });
  }, []);

  const filteredNeeds = needs.filter((n) => {
    const matchesUrgency = selectedUrgency === 'all' || n.urgency === selectedUrgency;
    const matchesStatus = selectedStatus === 'all' || n.status === selectedStatus;
    const matchesState = selectedState === 'all' || n.approximateLocation.state.toLowerCase() === selectedState.toLowerCase();
    const matchesSearch =
      searchTerm.trim() === '' ||
      n.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.approximateLocation.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.approximateLocation.generalArea.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesUrgency && matchesStatus && matchesState && matchesSearch;
  });

  const markers: MapMarkerData[] = filteredNeeds.map((n) => ({
    id: n.id,
    type: 'need',
    category: n.category === 'urgent_request' ? 'urgent_request' : n.category,
    title: `Community Outreach Request: ${n.category.replace('_', ' ')}`,
    lat: n.approximateLocation.coordinates.lat,
    lng: n.approximateLocation.coordinates.lng,
    status: n.status,
    address: n.approximateLocation.generalArea,
    city: n.approximateLocation.city,
    state: n.approximateLocation.state,
    urgency: n.urgency,
    isApproximate: true
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-1">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Community Outreach & Needs Mapping</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Community Needs Map
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-0.5">
            Identify areas requiring humanitarian outreach, meal distribution, or winter warmth with strict privacy safeguards.
          </p>
        </div>

        <Link
          to="/report-need"
          className="self-start md:self-auto px-5 py-3 rounded-xl bg-brand-coral hover:bg-brand-coralHover text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report an Area in Need</span>
        </Link>
      </div>

      {/* Safeguard Notice */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block font-bold">Dignity Safeguard Protection:</strong>
          <p className="text-xs text-emerald-800 leading-relaxed">
            All map pins on this board are deliberately displayed as <strong>approximate neighborhood areas (1-2 km radius)</strong>. We never map individuals, publish names of recipients, or reveal vulnerable sleeping spots.
          </p>
        </div>
      </div>

      {/* Map Overview */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">
        <InteractiveMap markers={markers} height="420px" showCategoryFilterBar={false} />
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search general area or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          />
        </div>

        <select
          value={selectedUrgency}
          onChange={(e) => setSelectedUrgency(e.target.value as any)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter community needs by urgency"
        >
          <option value="all">All Urgency Levels</option>
          <option value="critical">🚨 Critical / Urgent Attention</option>
          <option value="high">🟠 High Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as any)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter community needs by status"
        >
          <option value="all">All Workflow Statuses</option>
          <option value="awaiting_review">Awaiting Review</option>
          <option value="verified_need">Verified Need</option>
          <option value="assistance_planned">Assistance Planned</option>
          <option value="assistance_in_progress">Assistance in Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter community needs by state"
        >
          <option value="all">All India States</option>
          {INDIA_STATES_DATA.map((s) => (
            <option key={s.code} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Needs Reports List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Active Community Outreach Reports ({filteredNeeds.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNeeds.map((need) => (
            <div
              key={need.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-slate-700 uppercase bg-slate-100 px-2 py-0.5 rounded">
                    Category: {need.category.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <StatusBadge status={need.urgency} size="sm" />
                    <StatusBadge status={need.status} size="sm" />
                  </div>
                </div>

                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {need.description}
                </p>

                <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>General Area:</strong> {need.approximateLocation.generalArea}, {need.approximateLocation.city}, {need.approximateLocation.state}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>Reported:</strong> {new Date(need.createdAt).toLocaleDateString()}</span>
                  </p>
                  {need.estimatedPeopleAffected && (
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span><strong>Estimated People Requiring Support:</strong> ~{need.estimatedPeopleAffected}</span>
                    </p>
                  )}
                </div>

                {need.reviewNotes && (
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-[11px] text-blue-900">
                    <strong>Admin Note:</strong> {need.reviewNotes}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Reporter: {need.reporterType.replace('_', ' ')}
                </span>
                <Link
                  to="/volunteer"
                  className="font-bold text-brand-coral hover:text-brand-coralHover flex items-center gap-1"
                >
                  <span>Coordinate Response</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
