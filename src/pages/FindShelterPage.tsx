import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../services/store';
import type { AssistancePoint } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import {
  Home as HomeIcon,
  MapPin,
  Clock,
  Phone,
  Bed,
  Users,
  ShieldCheck,
  Search,
  ExternalLink,
  Info,
  PhoneCall
} from 'lucide-react';

export const FindShelterPage: React.FC = () => {
  const [points, setPoints] = useState<AssistancePoint[]>(store.getAssistancePoints());
  const [selectedState, setSelectedState] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [womenOnlyFilter, setWomenOnlyFilter] = useState(false);
  const [familyFilter, setFamilyFilter] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setPoints(store.getAssistancePoints());
    });
  }, []);

  const shelterListings = points.filter((p) => p.category === 'shelter');

  const filtered = shelterListings.filter((p) => {
    const matchesState = selectedState === 'all' || p.address.state.toLowerCase() === selectedState.toLowerCase();
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.fullAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWomen = !womenOnlyFilter || p.accessibility.womenSpecific === true;
    const matchesFamily = !familyFilter || p.accessibility.familyFriendly === true;

    return matchesState && matchesSearch && matchesWomen && matchesFamily;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
          <HomeIcon className="w-4 h-4 text-sky-600" />
          <span>Safe Accommodation & Shelters</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Find Legitimate Shelters & Safe Night Spaces Across India
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Locate verified night shelters (Rain Baseras), short-stay accommodation, women-safe spaces, and elder rest facilities. Verified operating hours, bed capacities, and sanitized amenities.
        </p>
      </div>

      {/* Safety & Emergency Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-950">
            <span className="font-bold">Immediate Safety Notice:</span>
            <p className="text-xs text-amber-800 leading-relaxed">
              If someone is in immediate danger or in critical medical distress, contact emergency responders immediately at <strong>112</strong> or <strong>108</strong>. ManavaSathi coordinates community shelter discovery and is not an emergency evacuation service.
            </p>
          </div>
        </div>
        <a
          href="tel:112"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-sm transition-colors flex items-center gap-1.5 self-end sm:self-auto"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Dial 112 Emergency</span>
        </a>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[200px] flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search shelter by city, district or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-coral"
            />
          </div>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
            aria-label="Filter shelter listings by state"
          >
            <option value="all">All States & Territories (Nationwide)</option>
            {INDIA_STATES_DATA.map((s) => (
              <option key={s.code} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Feature Checkboxes */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={womenOnlyFilter}
              onChange={(e) => setWomenOnlyFilter(e.target.checked)}
              className="rounded text-brand-coral focus:ring-brand-coral"
            />
            <span>Women-Safe Wing</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={familyFilter}
              onChange={(e) => setFamilyFilter(e.target.checked)}
              className="rounded text-brand-coral focus:ring-brand-coral"
            />
            <span>Family Accommodations</span>
          </label>
        </div>
      </div>

      {/* Shelter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center max-w-md mx-auto space-y-3">
            <HomeIcon className="w-10 h-10 text-sky-400 mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">No shelters registered in this region</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              There are currently no verified night shelters in this filter. For homeless assistance or local municipal night shelters, contact city helpline 112.
            </p>
            <button
              onClick={() => {
                setSelectedState('all');
                setSearchTerm('');
                setWomenOnlyFilter(false);
                setFamilyFilter(false);
              }}
              className="px-4 py-2 bg-brand-coral text-white text-xs font-semibold rounded-xl hover:bg-brand-coralHover transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-sky-700 uppercase bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    Night Shelter / Rain Basera
                  </span>
                  <StatusBadge status={item.status} size="sm" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{item.organizationName}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                {/* Bed Availability Badge */}
                {item.accessibility.bedsAvailable !== undefined && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                      <Bed className="w-4 h-4 text-emerald-600" />
                      <span>{item.accessibility.bedsAvailable} Beds Currently Listed</span>
                    </span>
                    <span className="text-[10px] text-emerald-600">Last confirmed: {item.lastConfirmedDate}</span>
                  </div>
                )}

                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{item.address.fullAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Operating Hours:</strong> {item.operatingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Desk Contact:</strong> {item.contactInfo.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {item.accessibility.womenSpecific && (
                    <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded">
                      👩 Women Safe Space
                    </span>
                  )}
                  {item.accessibility.familyFriendly && (
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                      👨‍👩‍👦 Family Accommodations
                    </span>
                  )}
                  {item.accessibility.wheelchairAccessible && (
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      ♿ Accessible
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${item.address.coordinates.lat},${item.address.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  to={`/map?q=${encodeURIComponent(item.title)}`}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  View on Map
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
