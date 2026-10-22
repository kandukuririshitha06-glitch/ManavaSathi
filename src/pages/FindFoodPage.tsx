import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../services/store';
import type { AssistancePoint } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import {
  Utensils,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Search,
  Calendar,
  Sparkles
} from 'lucide-react';

export const FindFoodPage: React.FC = () => {
  const [points, setPoints] = useState<AssistancePoint[]>(store.getAssistancePoints());
  const [selectedState, setSelectedState] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');

  useEffect(() => {
    return store.subscribe(() => {
      setPoints(store.getAssistancePoints());
    });
  }, []);

  const foodListings = points.filter((p) => p.category === 'food');

  const filtered = foodListings.filter((p) => {
    const matchesState = selectedState === 'all' || p.address.state.toLowerCase() === selectedState.toLowerCase();
    const matchesAvailability = filterAvailability === 'all' || p.availabilityStatus === filterAvailability;
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.fullAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.organizationName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesState && matchesAvailability && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
          <Utensils className="w-4 h-4 text-orange-600" />
          <span>Food Assistance & Community Meals</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Find Free & Low-Cost Food Assistance Across India
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Discover verified community kitchens, daily langars, dry ration grain distribution, and warm meal centers. Respect and human dignity are unconditional—no photographs or identification are required to receive nourishment.
        </p>
      </div>

      {/* Dignity Guarantee Card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-emerald-950">
          <span className="font-bold">Human Dignity Guarantee:</span>
          <p className="text-xs text-emerald-800 leading-relaxed">
            All listed community kitchens are instructed never to photograph or record individuals receiving food. Meals are served with respect. Availability statuses reflect verified reports from our field coordinators.
          </p>
        </div>
      </div>

      {/* Search and Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search kitchen name, locality, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          />
        </div>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter food assistance by state"
        >
          <option value="all">All States & Territories (Nationwide)</option>
          {INDIA_STATES_DATA.map((s) => (
            <option key={s.code} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={filterAvailability}
          onChange={(e) => setFilterAvailability(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter by availability status"
        >
          <option value="all">All Availability Statuses</option>
          <option value="confirmed">Recently Confirmed Availability</option>
          <option value="schedule_published">Schedule Published</option>
          <option value="unknown">Availability Unknown</option>
          <option value="temporarily_unavailable">Temporarily Unavailable</option>
        </select>
      </div>

      {/* Food Assistance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center max-w-md mx-auto space-y-3">
            <Utensils className="w-10 h-10 text-orange-400 mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">No food assistance listings found for this filter</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We currently have no confirmed food kitchens in this exact area. You can expand your search or contact local emergency helpline 112.
            </p>
            <button
              onClick={() => {
                setSelectedState('all');
                setSearchTerm('');
                setFilterAvailability('all');
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
                  <span className="text-[10px] font-bold text-orange-700 uppercase bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    Community Kitchen / Annapurna
                  </span>
                  <StatusBadge status={item.availabilityStatus} size="sm" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{item.organizationName}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{item.address.fullAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Serving Hours:</strong> {item.operatingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Phone:</strong> {item.contactInfo.phone}</span>
                  </div>
                </div>

                {item.servicesOffered && item.servicesOffered.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Services Provided:</span>
                    <div className="flex flex-wrap gap-1">
                      {item.servicesOffered.map((srv, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          ✓ {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
