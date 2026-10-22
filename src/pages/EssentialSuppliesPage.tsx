import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../services/store';
import type { AssistancePoint } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import {
  Shirt,
  Sparkles,
  PackageCheck,
  Search,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export const EssentialSuppliesPage: React.FC = () => {
  const [points, setPoints] = useState<AssistancePoint[]>(store.getAssistancePoints());
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'clothing' | 'hygiene'>('all');
  const [selectedState, setSelectedState] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    return store.subscribe(() => {
      setPoints(store.getAssistancePoints());
    });
  }, []);

  const supplyPoints = points.filter(
    (p) => p.category === 'clothing' || p.category === 'hygiene' || p.category === 'general_donation'
  );

  const filtered = supplyPoints.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesState = selectedState === 'all' || p.address.state.toLowerCase() === selectedState.toLowerCase();
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.acceptedItems?.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCat && matchesState && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
            <Shirt className="w-4 h-4 text-purple-600" />
            <span>Essential Supplies, Clothing & Hygiene</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Clothing, Blankets & Vital Essentials
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Locate verified donation drop-offs and distribution hubs for clean clothing, winter warm blankets, menstrual hygiene kits, footwear, and baby supplies.
          </p>
        </div>

        <Link
          to="/donate-supplies"
          className="self-start md:self-auto px-5 py-3 rounded-xl bg-brand-coral hover:bg-brand-coralHover text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
        >
          <PackageCheck className="w-4 h-4" />
          <span>Pledge Supplies Online</span>
        </Link>
      </div>

      {/* Quality & Condition Guidelines */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block mb-0.5">Clean & Usable Garments</strong>
            <p className="text-slate-500">Clothing must be freshly washed, undamaged, folded, and suitable for dignified immediate wear.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block mb-0.5">Sealed Hygiene Products</strong>
            <p className="text-slate-500">Soaps, sanitary pads, toothbrushes, and baby care items must be unopened and within safe expiry periods.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block mb-0.5">Winter Thermal Protection</strong>
            <p className="text-slate-500">Blankets, jackets, and woollen caps are prioritized ahead of cold-weather waves across North and Central India.</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search item (e.g. blankets, soap, sweaters)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as any)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter essential supplies category"
        >
          <option value="all">All Essential Supplies</option>
          <option value="clothing">👕 Clothing, Footwear & Blankets</option>
          <option value="hygiene">🧼 Hygiene, Soap & Menstrual Care</option>
        </select>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter supplies by state"
        >
          <option value="all">All India States</option>
          {INDIA_STATES_DATA.map((s) => (
            <option key={s.code} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Supplies Center Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-purple-700 uppercase bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {item.category.replace('_', ' ')}
                </span>
                <StatusBadge status={item.status} size="sm" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{item.organizationName}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

              {item.currentRequirements && item.currentRequirements.length > 0 && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <span className="font-bold text-amber-900 block mb-1">⚡ Urgently Needed Items:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.currentRequirements.map((req, idx) => (
                      <span key={idx} className="bg-white text-amber-900 text-[11px] px-2 py-0.5 rounded border border-amber-300 font-medium">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{item.address.fullAddress}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span><strong>Hours:</strong> {item.operatingHours}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span><strong>Coordinator:</strong> {item.contactInfo.phone}</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${item.address.coordinates.lat},${item.address.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Drop-off Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                to={`/map?q=${encodeURIComponent(item.title)}`}
                className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Map
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
