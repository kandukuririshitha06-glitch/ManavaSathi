import React, { useState, useEffect } from 'react';
import { store } from '../services/store';
import type { UserProfile, UserRole } from '../types';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Lock,
  Mail,
  MapPin,
  EyeOff
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(store.getCurrentUser());
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [city, setCity] = useState(currentUser.city || 'Hyderabad');
  const [state, setState] = useState(currentUser.state || 'Telangana');

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [hidePhonePublic, setHidePhonePublic] = useState(true);

  useEffect(() => {
    return store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
    });
  }, []);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateUserProfile({
      displayName,
      phone,
      city,
      state
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to request complete account and data erasure under ManavaSathi privacy guidelines?')) {
      alert('Your data deletion request has been recorded. All personal identifiers have been purged from local storage.');
      store.resetToFactorySeeds();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="space-y-1 border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Profile & Privacy Controls
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Manage your personal details, role preferences, and data privacy safeguards.
        </p>
      </div>

      {/* Privacy Guarantee Card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block font-bold">Privacy & Consent Commitment:</strong>
          <p className="text-emerald-800 leading-relaxed text-[11px]">
            ManavaSathi complies with ethical humanitarian data standards. We never sell contact information, never track sensitive locations without explicit consent, and honor complete account deletion requests.
          </p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5 text-xs">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-brand-coral flex items-center justify-center font-black text-xl border border-orange-200">
            {displayName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{displayName}</h3>
            <p className="text-slate-500 text-[11px]">{currentUser.email}</p>
            <span className="inline-block mt-1 font-bold text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase">
              Role: {currentUser.role.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Display Name *</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Home State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">City / Region</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Privacy options */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <h4 className="font-bold text-slate-900 text-xs">Privacy Toggles</h4>
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={hidePhonePublic}
              onChange={(e) => setHidePhonePublic(e.target.checked)}
              className="rounded text-brand-coral"
            />
            <span>Hide personal telephone from public listing cards (Share only with verified coordinators)</span>
          </label>
        </div>

        {savedSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-bold text-center">
            Profile settings updated successfully.
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="text-red-600 hover:text-red-700 font-bold text-xs flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Account & Purge Data</span>
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-coral hover:bg-brand-coralHover text-white font-bold rounded-xl shadow-sm transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
