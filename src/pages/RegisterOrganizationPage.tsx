import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../services/store';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const RegisterOrganizationPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [category, setCategory] = useState('Community Nutrition & Welfare');
  const [authorizedPerson, setAuthorizedPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [officialWebsite, setOfficialWebsite] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [district, setDistrict] = useState('Mumbai Suburban');
  const [city, setCity] = useState('Mumbai');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [docsConfirmed, setDocsConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    store.addOrganization({
      name,
      registrationNumber,
      category,
      authorizedPerson,
      contactEmail,
      contactPhone,
      officialWebsite,
      state,
      district,
      city,
      address,
      description
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span>Organization Onboarding</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Register an Organization
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Enroll your charitable trust, society, community kitchen, or shelter board on ManavaSathi to list verified donation points and coordinate aid.
        </p>
      </div>

      {/* Verification Safeguard */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-0.5 font-bold">Mandatory Verification Process:</strong>
          <span>
            Every organization undergoes documentary review (Registration Certificate, 80G/12A or local municipal recognition) before receiving the <strong>Verified</strong> badge. Unverified organizations cannot solicit public financial donations.
          </span>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900">Application Submitted for Review</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you for registering <strong>{name}</strong>. Your listing has been logged with status <strong>Pending Verification</strong>. Our verification team will review your documentation within 48-72 hours.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/org-dashboard')}
              className="px-5 py-2.5 bg-brand-coral hover:bg-brand-coralHover text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              Open Organization Dashboard
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Organization Legal Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Karunai Illam Charitable Trust"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-coral"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Registration / Darpan / Society ID *</label>
              <input
                type="text"
                required
                placeholder="e.g. MAH/MUM/2021/TR/1209"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Primary Activity Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none"
              >
                <option value="Community Nutrition & Welfare">Community Nutrition & Food Distribution</option>
                <option value="Safe Night Shelter & Accommodation">Safe Night Shelter & Accommodation</option>
                <option value="Clothing & Winter Relief">Clothing, Blankets & Disaster Relief</option>
                <option value="Elderly Outreach & Social Care">Elderly Care & Disability Assistance</option>
                <option value="Community Healthcare & First Aid">Healthcare & First Aid Support</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Authorized Trustee / Officer Name *</label>
              <input
                type="text"
                required
                placeholder="Full Name & Designation"
                value={authorizedPerson}
                onChange={(e) => setAuthorizedPerson(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Official Email *</label>
              <input
                type="email"
                required
                placeholder="contact@organization.org"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Official Phone *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Website or Official Page</label>
              <input
                type="url"
                placeholder="https://..."
                value={officialWebsite}
                onChange={(e) => setOfficialWebsite(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Location Fields */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">Headquarters / Operational Location</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">State / UT *</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
                <label className="font-bold text-slate-700 block mb-1">District / Region *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai Suburban"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">City / Town *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Registered Office Address *</label>
              <input
                type="text"
                required
                placeholder="Premises number, building, road, locality, pin code..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Description of Humanitarian Activities *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Detail your operating kitchens, distribution events, shelter beds, or community support initiatives..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
            />
          </div>

          {/* Compliance Declaration */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <label className="flex items-start gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                required
                checked={docsConfirmed}
                onChange={(e) => setDocsConfirmed(e.target.checked)}
                className="mt-0.5 rounded text-brand-coral"
              />
              <span>
                I certify that our organization is legally registered in India, operates non-discriminatory humanitarian services, and will provide official documentation upon administrator review.
              </span>
            </label>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!docsConfirmed}
              className="px-6 py-3 bg-brand-coral hover:bg-brand-coralHover text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-50"
            >
              Submit Application for Verification
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
