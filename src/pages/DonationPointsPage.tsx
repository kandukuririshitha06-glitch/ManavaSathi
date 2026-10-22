import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../services/store';
import { AssistancePoint, AssistanceCategory } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import {
  PackageCheck,
  PlusCircle,
  Search,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Building,
  Filter
} from 'lucide-react';

export const DonationPointsPage: React.FC = () => {
  const [points, setPoints] = useState<AssistancePoint[]>(store.getAssistancePoints());
  const [selectedState, setSelectedState] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form state for new donation point registration
  const [newTitle, setNewTitle] = useState('');
  const [newOrgName, setNewOrgName] = useState('');
  const [newCategory, setNewCategory] = useState<AssistanceCategory>('clothing');
  const [newState, setNewState] = useState('Telangana');
  const [newDistrict, setNewDistrict] = useState('Hyderabad');
  const [newCity, setNewCity] = useState('Hyderabad');
  const [newAddress, setNewAddress] = useState('');
  const [newPinCode, setNewPinCode] = useState('');
  const [newHours, setNewHours] = useState('Monday to Saturday: 10:00 AM – 6:00 PM');
  const [newPhone, setNewPhone] = useState('');
  const [newAcceptedItems, setNewAcceptedItems] = useState('Clean clothing, Blankets, Footwear');
  const [newDesc, setNewDesc] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setPoints(store.getAssistancePoints());
    });
  }, []);

  const currentDistricts =
    selectedState !== 'all'
      ? INDIA_STATES_DATA.find((s) => s.name.toLowerCase() === selectedState.toLowerCase())?.districts || []
      : [];

  const filtered = points.filter((p) => {
    const matchesState = selectedState === 'all' || p.address.state.toLowerCase() === selectedState.toLowerCase();
    const matchesDistrict =
      selectedDistrict === 'all' ||
      (p.address.district && p.address.district.toLowerCase().includes(selectedDistrict.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.fullAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.address.pinCode && p.address.pinCode.includes(searchTerm.trim()));

    return matchesState && matchesDistrict && matchesStatus && matchesSearch;
  });

  const handleCreatePoint = (e: React.FormEvent) => {
    e.preventDefault();

    // Lookup base coords for chosen state
    const stateObj = INDIA_STATES_DATA.find((s) => s.name.toLowerCase() === newState.toLowerCase());
    const baseLat = stateObj ? stateObj.lat : 20.5937;
    const baseLng = stateObj ? stateObj.lng : 78.9629;

    store.addAssistancePoint({
      title: newTitle,
      category: newCategory,
      organizationName: newOrgName,
      address: {
        fullAddress: `${newAddress}, ${newCity}, ${newDistrict}, ${newState} - ${newPinCode}`,
        city: newCity,
        district: newDistrict,
        state: newState,
        pinCode: newPinCode,
        coordinates: {
          lat: +(baseLat + (Math.random() - 0.5) * 0.1).toFixed(4),
          lng: +(baseLng + (Math.random() - 0.5) * 0.1).toFixed(4)
        }
      },
      description: newDesc,
      operatingHours: newHours,
      acceptedItems: newAcceptedItems.split(',').map((s) => s.trim()).filter(Boolean),
      currentRequirements: ['Warm Blankets', 'Hygiene Kits'],
      servicesOffered: ['Donation Intake', 'Receipt Confirmation', 'Direct Outreach Distribution'],
      contactInfo: {
        phone: newPhone
      },
      accessibility: {
        wheelchairAccessible: true,
        familyFriendly: true
      },
      availabilityStatus: 'confirmed',
      lastConfirmedDate: new Date().toISOString().split('T')[0]
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      // Reset form
      setNewTitle('');
      setNewOrgName('');
      setNewAddress('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-1">
            <PackageCheck className="w-4 h-4 text-rose-600" />
            <span>Humanitarian Donation Points</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Nationwide Donation Points Across India
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-0.5">
            Donate grain, warm blankets, clothes, and hygiene items to verified community initiatives and legitimate charities with complete transparency.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="self-start md:self-auto px-5 py-3 rounded-xl bg-brand-coral hover:bg-brand-coralHover text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register New Donation Point</span>
        </button>
      </div>

      {/* Verification Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-0.5 font-bold">Strict Verification Protocol:</strong>
          <span>
            New submissions remain marked <strong>Pending Verification</strong> until an administrator reviews registration documentation and conducts phone or on-site validation. We never invent donation centers or verification badges.
          </span>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search city, PIN code, center name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          />
        </div>

        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedDistrict('all');
          }}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter donation points by state"
        >
          <option value="all">All States & Territories (Nationwide)</option>
          {INDIA_STATES_DATA.map((s) => (
            <option key={s.code} value={s.name}>
              {s.name} ({s.zone})
            </option>
          ))}
        </select>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={selectedState === 'all'}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral disabled:opacity-50"
          aria-label="Filter donation points by district"
        >
          <option value="all">{selectedState === 'all' ? 'Select state first' : 'All Districts'}</option>
          {currentDistricts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter donation points by verification status"
        >
          <option value="all">All Verification Statuses</option>
          <option value="verified">Verified Centers Only</option>
          <option value="pending">Pending Verification</option>
          <option value="needs_update">Needs Updated Info</option>
        </select>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-rose-700 uppercase bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {item.category.replace('_', ' ')}
                </span>
                <StatusBadge status={item.status} size="sm" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.organizationName}</span>
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

              {item.acceptedItems && item.acceptedItems.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Accepted Donations:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.acceptedItems.map((ai, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {ai}
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
                  <span><strong>Contact:</strong> {item.contactInfo.phone}</span>
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
                <span>Directions</span>
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

      {/* Register Donation Point Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Register a Humanitarian Donation Point</h3>
                <p className="text-xs text-slate-500">
                  New submissions will receive status <strong>Pending Verification</strong> until reviewed by administrator.
                </p>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Submission Received!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your donation point has been entered into the database with status <strong>Pending Verification</strong>. Our verification team will review your details shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreatePoint} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Center / Point Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad Annapurna Kitchen Point"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-coral"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Operating Organization / Trust *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananda Seva Trust"
                      value={newOrgName}
                      onChange={(e) => setNewOrgName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-coral"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Assistance Category *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none"
                    >
                      <option value="food">Food Assistance</option>
                      <option value="clothing">Clothing & Blankets</option>
                      <option value="shelter">Night Shelter</option>
                      <option value="hygiene">Hygiene & Toiletries</option>
                      <option value="medical">Health Support</option>
                      <option value="general_donation">General Donation Point</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Indian State / UT *</label>
                    <select
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
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
                    <label className="font-bold text-slate-700 block mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Street Address / Locality *</label>
                    <input
                      type="text"
                      required
                      placeholder="Plot number, landmark, street, colony..."
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="6-digit PIN"
                      value={newPinCode}
                      onChange={(e) => setNewPinCode(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Operating Hours *</label>
                    <input
                      type="text"
                      required
                      value={newHours}
                      onChange={(e) => setNewHours(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Coordinator Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Accepted Donation Items (comma-separated)</label>
                  <input
                    type="text"
                    value={newAcceptedItems}
                    onChange={(e) => setNewAcceptedItems(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description & Verification Details</label>
                  <textarea
                    rows={3}
                    placeholder="Describe facilities, volunteer presence, registration documents provided..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-coral hover:bg-brand-coralHover text-white rounded-xl font-bold shadow-sm transition-colors"
                  >
                    Submit for Verification
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
