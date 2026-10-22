import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../services/store';
import type { AssistancePoint, Organization } from '../types';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import {
  PackageCheck,
  CheckCircle2,
  ShieldCheck,
  Plus,
  Trash2,
  Clock,
  MapPin,
  HeartHandshake
} from 'lucide-react';

export const DonateSuppliesPage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = store.getCurrentUser();
  const [points, setPoints] = useState<AssistancePoint[]>(store.getAssistancePoints());
  const [orgs, setOrgs] = useState<Organization[]>(store.getOrganizations());

  const [donorName, setDonorName] = useState(currentUser.displayName || '');
  const [donorContact, setDonorContact] = useState(currentUser.email || '');
  const [generalLocation, setGeneralLocation] = useState('Hyderabad, Telangana');
  const [preferredMethod, setPreferredMethod] = useState<'dropoff' | 'pickup'>('dropoff');
  const [suitableTimes, setSuitableTimes] = useState('Saturday 10:00 AM – 2:00 PM');
  const [targetOrgName, setTargetOrgName] = useState('Ananda Seva Community Trust');
  const [notes, setNotes] = useState('');

  // Item list state
  const [items, setItems] = useState([
    { name: 'Clean Winter Blankets', category: 'Blankets', quantity: '5 blankets', condition: 'clean_usable' as const },
    { name: 'Sanitary Menstrual Pads', category: 'Hygiene', quantity: '10 packs', condition: 'new' as const }
  ]);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setPoints(store.getAssistancePoints());
      setOrgs(store.getOrganizations());
    });
  }, []);

  const handleAddItem = () => {
    setItems([
      ...items,
      { name: '', category: 'Clothing', quantity: '', condition: 'clean_usable' }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    store.addSupplyDonation({
      donorId: currentUser.id,
      donorName,
      donorContact,
      items,
      generalLocation,
      preferredMethod,
      suitableTimes,
      targetOrganizationName: targetOrgName,
      notes
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <PackageCheck className="w-4 h-4 text-emerald-600" />
          <span>Physical Supply Donation</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Pledge Essential Supplies
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Pledge blankets, clean clothes, sealed hygiene essentials, and grains directly to verified distribution coordinators.
        </p>
      </div>

      {/* Privacy Guarantee */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-0.5 font-bold">Donor Privacy Protection:</strong>
          <span>
            Your specific residential address is never made public. Only general neighborhood areas are shared with the receiving verified organization for collection or drop-off scheduling.
          </span>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900">Supply Pledge Recorded!</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you for offering essentials. Your pledge has been forwarded to <strong>{targetOrgName}</strong>. You can monitor the fulfillment status in your dashboard.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/user-dashboard')}
              className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Go to My Dashboard
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
              }}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Pledge More Items
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 text-xs">
          {/* Target Organization */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Recipient Verified Organization / Center *
            </label>
            <select
              value={targetOrgName}
              onChange={(e) => setTargetOrgName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:outline-none"
            >
              {orgs.map((org) => (
                <option key={org.id} value={org.name}>
                  {org.name} ({org.city}, {org.state})
                </option>
              ))}
            </select>
          </div>

          {/* Items Section */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 text-sm">Items to Donate *</label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs font-bold text-brand-coral hover:text-brand-coralHover flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-end">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Item Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Warm Blankets, Soap Bars"
                      value={item.name}
                      onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Quantity</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5 pieces"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Condition</label>
                      <select
                        value={item.condition}
                        onChange={(e) => handleItemChange(idx, 'condition', e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:outline-none"
                      >
                        <option value="clean_usable">Clean / Gently Used</option>
                        <option value="new">Brand New / Sealed</option>
                      </select>
                    </div>

                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-2 text-slate-400 hover:text-red-600 self-end mb-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drop-off vs Pickup & Logistics */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">Drop-off / Pickup Coordination</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Delivery Method *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredMethod('dropoff')}
                    className={`p-2.5 rounded-xl font-bold border transition-all text-center ${
                      preferredMethod === 'dropoff'
                        ? 'bg-brand-coral text-white border-brand-coral'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    I will drop off
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredMethod('pickup')}
                    className={`p-2.5 rounded-xl font-bold border transition-all text-center ${
                      preferredMethod === 'pickup'
                        ? 'bg-brand-coral text-white border-brand-coral'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    Request volunteer pickup
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Suitable Day & Time *</label>
                <input
                  type="text"
                  required
                  value={suitableTimes}
                  onChange={(e) => setSuitableTimes(e.target.value)}
                  placeholder="e.g. Weekends 10 AM to 1 PM"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Your General Neighborhood / City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bandra West, Mumbai"
                  value={generalLocation}
                  onChange={(e) => setGeneralLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Contact Phone / Email *
                </label>
                <input
                  type="text"
                  required
                  value={donorContact}
                  onChange={(e) => setDonorContact(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Optional Notes</label>
              <textarea
                rows={2}
                placeholder="Special instructions, packing details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Your donation directly reaches verified field distribution.
            </span>
            <button
              type="submit"
              className="px-6 py-3 bg-brand-coral hover:bg-brand-coralHover text-white font-bold rounded-xl shadow-md transition-colors text-xs"
            >
              Submit Supply Pledge
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
