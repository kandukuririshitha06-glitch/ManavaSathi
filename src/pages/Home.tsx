import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Utensils,
  Home as HomeIcon,
  Shirt,
  Sparkles,
  MapPin,
  Heart,
  Users,
  ShieldCheck,
  Building2,
  PackageCheck,
  AlertCircle,
  ArrowRight,
  Search,
  CheckCircle2,
  PhoneCall,
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { store } from '../services/store';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import { InteractiveMap } from '../components/InteractiveMap';
import type { MapMarkerData } from '../components/InteractiveMap';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  const points = store.getAssistancePoints();
  const needs = store.getCommunityNeeds();
  const tasks = store.getVolunteerTasks();
  const orgs = store.getOrganizations();

  // Convert points to markers for map
  const markers: MapMarkerData[] = points.map((p) => ({
    id: p.id,
    type: 'assistance',
    category: p.category,
    title: p.title,
    organizationName: p.organizationName,
    lat: p.address.coordinates.lat,
    lng: p.address.coordinates.lng,
    status: p.status,
    address: p.address.fullAddress,
    city: p.address.city,
    state: p.address.state,
    hours: p.operatingHours,
    acceptedItems: p.acceptedItems,
    requirements: p.currentRequirements,
    availabilityStatus: p.availabilityStatus
  }));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      navigate(`/map?q=${encodeURIComponent(searchLocation.trim())}`);
    } else if (selectedState !== 'all') {
      navigate(`/map?state=${encodeURIComponent(selectedState)}`);
    } else {
      navigate('/map');
    }
  };

  const featureCards = [
    {
      title: 'Find Food Assistance',
      desc: 'Free community kitchens, meal distribution centers, and grocery support across India.',
      icon: Utensils,
      to: '/food',
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    },
    {
      title: 'Find Shelter & Beds',
      desc: 'Night shelters, safe rest places, women-specific spaces, and family accommodations.',
      icon: HomeIcon,
      to: '/shelter',
      color: 'bg-sky-50 text-sky-600 border-sky-200'
    },
    {
      title: 'Clothing & Blankets',
      desc: 'Clean garments, winter wear, waterproof sheets, and dignity clothing drives.',
      icon: Shirt,
      to: '/supplies',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Essential Hygiene',
      desc: 'Soap, sanitary menstrual products, baby care necessities, and basic first-aid supplies.',
      icon: Sparkles,
      to: '/supplies',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      title: 'Donation Points',
      desc: 'Locate authorized centers accepting grain, clean clothing, and household necessities.',
      icon: PackageCheck,
      to: '/donation-points',
      color: 'bg-rose-50 text-rose-600 border-rose-200'
    },
    {
      title: 'Community Needs Map',
      desc: 'Identify areas requiring food parcels, blankets, or outreach with privacy-first mapping.',
      icon: AlertCircle,
      to: '/community-needs',
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      title: 'Volunteer Opportunities',
      desc: 'Join coordinated meal packaging, clothing sorting, and dignity-first outreach teams.',
      icon: Users,
      to: '/volunteer',
      color: 'bg-teal-50 text-teal-600 border-teal-200'
    },
    {
      title: 'Register an Organization',
      desc: 'Enroll community trusts, shelter boards, and verified kitchens to coordinate support.',
      icon: Building2,
      to: '/register-org',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-coral/10 via-brand-sand to-transparent pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/15 text-brand-coral text-xs sm:text-sm font-semibold tracking-wide border border-brand-coral/25">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>ManavaSathi • Nationwide Humanitarian Companion</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            "Every Human Deserves Care."
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Find food, shelter, essential supplies, and community support—or become a helping hand for someone who needs it across every state, city, town, and locality in India.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/map"
              className="px-6 py-3.5 rounded-xl bg-brand-coral hover:bg-brand-coralHover text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>{t('find_help_near_me')}</span>
            </Link>

            <Link
              to="/donate-supplies"
              className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <PackageCheck className="w-4 h-4" />
              <span>{t('donate_essentials')}</span>
            </Link>

            <Link
              to="/volunteer"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-brand-coral" />
              <span>{t('become_volunteer')}</span>
            </Link>

            <Link
              to="/register-org"
              className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>{t('register_org')}</span>
            </Link>
          </div>

          {/* Nationwide Search Bar */}
          <div className="pt-6 max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl border border-slate-200 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your city, village, locality, street, or PIN code..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none text-slate-800 placeholder-slate-400"
                />
              </div>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none sm:w-44"
              >
                <option value="all">All India States</option>
                {INDIA_STATES_DATA.map((s) => (
                  <option key={s.code} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[11px] text-slate-500 mt-2 text-center">
              Works nationwide without requiring mandatory GPS permissions. Manual city or state selection supported.
            </p>
          </div>
        </div>
      </section>

      {/* Main Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How ManavaSathi Connects Communities
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Choose what you are looking for or how you can assist others today with dignity and care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.to}
                className="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-brand-coral/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${card.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-brand-coral transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-semibold text-brand-coral group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Interactive Map Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-coral uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" /> Nationwide Coverage
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Explore Humanitarian Assistance Points Across India
              </h3>
            </div>
            <Link
              to="/map"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors shrink-0"
            >
              <span>Open Fullscreen Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <InteractiveMap markers={markers} height="460px" />
        </div>
      </section>

      {/* Honest Impact & Live Database Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-2 mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Database Transparency
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Genuine Community Records
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Per our core humanitarian principles, statistics reflect current confirmed entries in the system. Demonstration records are clearly segregated from operational public services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-3xl sm:text-4xl font-black text-brand-coral">{points.length}</span>
              <p className="text-xs font-semibold text-slate-300 mt-1">Assistance & Donation Points</p>
              <span className="text-[10px] text-amber-400 block mt-0.5">Sample Seeds in Demo Mode</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">{orgs.filter(o => o.verificationStatus === 'verified').length}</span>
              <p className="text-xs font-semibold text-slate-300 mt-1">Verified Organizations</p>
              <span className="text-[10px] text-slate-400 block mt-0.5">Documentation Reviewed</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-3xl sm:text-4xl font-black text-sky-400">{tasks.length}</span>
              <p className="text-xs font-semibold text-slate-300 mt-1">Volunteer Activities</p>
              <span className="text-[10px] text-slate-400 block mt-0.5">Meal & Supply Logistics</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-3xl sm:text-4xl font-black text-amber-400">{needs.length}</span>
              <p className="text-xs font-semibold text-slate-300 mt-1">Community Outreach Reports</p>
              <span className="text-[10px] text-slate-400 block mt-0.5">Protected Approximate Locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dignity & Safeguard Guarantee Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Our Dignity, Privacy & Ethics Standards</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Helping People with Respect, Never Surveillance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ManavaSathi maps verified service providers, community kitchens, and general areas requiring assistance. We explicitly never map individual people, never expose vulnerable individuals sleeping rough, and never require recipients to pose for camera photos to receive nourishment.
              </p>
            </div>

            <div className="space-y-2 shrink-0">
              <Link
                to="/privacy"
                className="block text-center px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm transition-colors"
              >
                Read Dignity & Privacy Policy
              </Link>
              <Link
                to="/report-need"
                className="block text-center px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors"
              >
                Submit Respectful Need Report
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
