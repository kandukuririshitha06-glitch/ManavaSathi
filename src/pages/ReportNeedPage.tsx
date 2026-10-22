import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../services/store';
import type { AssistanceCategory, NeedUrgency } from '../types';
import { INDIA_STATES_DATA, getDignifiedApproximateLocation } from '../utils/indiaGeo';
import {
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Users,
  Compass,
  ArrowLeft
} from 'lucide-react';

export const ReportNeedPage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = store.getCurrentUser();

  const [category, setCategory] = useState<AssistanceCategory>('food');
  const [urgency, setUrgency] = useState<NeedUrgency>('medium');
  const [generalArea, setGeneralArea] = useState('');
  const [selectedState, setSelectedState] = useState('Telangana');
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [selectedDistrict, setSelectedDistrict] = useState('Hyderabad');
  const [pinCode, setPinCode] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedPeople, setEstimatedPeople] = useState<number>(5);
  const [reporterType, setReporterType] = useState<'volunteer' | 'organization' | 'community_member'>(
    currentUser.role === 'volunteer' ? 'volunteer' : currentUser.role === 'org_rep' ? 'organization' : 'community_member'
  );
  const [contactEmail, setContactEmail] = useState(currentUser.email || '');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Look up state baseline coordinates
    const stateObj = INDIA_STATES_DATA.find((s) => s.name.toLowerCase() === selectedState.toLowerCase());
    const baseLat = stateObj ? stateObj.lat : 20.5937;
    const baseLng = stateObj ? stateObj.lng : 78.9629;

    // Apply safe approximate jitter (never pinpoint exact spot)
    const approxCoords = getDignifiedApproximateLocation(baseLat, baseLng);

    store.addCommunityNeed({
      category,
      urgency,
      approximateLocation: {
        generalArea,
        city: selectedCity,
        district: selectedDistrict,
        state: selectedState,
        pinCode,
        coordinates: approxCoords,
        isApproximate: true
      },
      description,
      observedAt: new Date().toISOString(),
      estimatedPeopleAffected: estimatedPeople > 0 ? estimatedPeople : undefined,
      reporterType,
      reporterId: currentUser.id,
      reporterContact: contactEmail
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Report Area Requiring Outreach</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Identify a Community Need
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Help community volunteers, meal distributors, and shelters direct essential supplies where support is required.
        </p>
      </div>

      {/* Dignity & Privacy Shield */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block font-bold">Dignity Safeguards:</strong>
          <p className="text-emerald-800 leading-relaxed">
            • Do NOT collect or submit a person's private name or identity without informed consent.<br />
            • Do NOT upload or submit photographs of vulnerable people.<br />
            • Coordinates are deliberately offset by 1-2 km to prevent unwanted surveillance.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900">Report Successfully Submitted</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you for being a companion for humanity. Your report has been dispatched with status <strong>Awaiting Review</strong>. Our volunteer network will inspect requirements and coordinate appropriate relief.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/community-needs')}
              className="px-5 py-2.5 bg-brand-coral hover:bg-brand-coralHover text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              View Community Needs Map
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setDescription('');
                setGeneralArea('');
              }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5 text-xs">
          {/* Category & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Assistance Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
              >
                <option value="food">🍲 Food / Clean Drinking Water Assistance</option>
                <option value="clothing">👕 Clothing / Thermal Blankets</option>
                <option value="shelter">🏠 Night Shelter / Accommodation Guidance</option>
                <option value="hygiene">🧼 Hygiene Supplies / Sanitary Kits</option>
                <option value="medical">🏥 Medical / Health Outreach Support</option>
                <option value="community_centre">🤝 Elderly Support / Disability Mobility Aid</option>
                <option value="urgent_request">🆘 Urgent Non-Emergency Outreach</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Urgency Level *</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
              >
                <option value="critical">🚨 Critical (Cold wave, acute dehydration, severe distress)</option>
                <option value="high">🟠 High (Food needed by today evening, vulnerable group)</option>
                <option value="medium">🟡 Medium (Regular outreach required in coming days)</option>
                <option value="low">Low (General supply supplementation)</option>
              </select>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">General Area & Geographic Scope</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Indian State / UT *</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none"
                >
                  {INDIA_STATES_DATA.map((s) => (
                    <option key={s.code} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">City / Town / Village *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Visakhapatnam, Varanasi, Guwahati"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">PIN Code (Optional)</label>
                <input
                  type="text"
                  placeholder="6-digit PIN"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                General Area Description / Landmark *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Near Old Railway Goods Yard underpass, Station Road periphery"
                value={generalArea}
                onChange={(e) => setGeneralArea(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Provide general neighborhood landmarks. Do not publish private home or sleeping spots.
              </span>
            </div>
          </div>

          {/* Description & Estimates */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Description of Assistance Required *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe what items or support are observed to be needed (e.g. warm blankets before temperature drops, dry food packets, drinking water)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-coral"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Estimated Number of People (if known)
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={estimatedPeople}
                  onChange={(e) => setEstimatedPeople(parseInt(e.target.value) || 1)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reporter Role *</label>
                <select
                  value={reporterType}
                  onChange={(e) => setReporterType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none"
                >
                  <option value="community_member">Local Community Member</option>
                  <option value="volunteer">Registered Volunteer</option>
                  <option value="organization">Community Organization Representative</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Submitted under ManavaSathi Dignity & Safeguarding Protocol.
            </span>
            <button
              type="submit"
              className="px-6 py-3 bg-brand-coral hover:bg-brand-coralHover text-white font-bold rounded-xl shadow-md transition-colors text-xs"
            >
              Submit Community Report
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
