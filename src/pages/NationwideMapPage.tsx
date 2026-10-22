import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { store } from '../services/store';
import { AssistanceCategory, AssistancePoint } from '../types';
import { InteractiveMap, MapMarkerData } from '../components/InteractiveMap';
import { StatusBadge } from '../components/StatusBadge';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import {
  MapPin,
  List,
  Search,
  Filter,
  ExternalLink,
  Clock,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  AlertTriangle,
  Compass,
  X,
  Share2
} from 'lucide-react';

export const NationwideMapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const stateParam = searchParams.get('state') || 'all';

  const [points, setPoints] = useState<AssistancePoint[]>(store.getAssistancePoints());
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedCategory, setSelectedCategory] = useState<AssistanceCategory | 'all'>('all');
  const [selectedState, setSelectedState] = useState<string>(stateParam);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>(queryParam);
  const [activePoint, setActivePoint] = useState<AssistancePoint | null>(null);
  const [reportModalPoint, setReportModalPoint] = useState<AssistancePoint | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setPoints(store.getAssistancePoints());
    });
  }, []);

  // Sync state from query params if loaded with params
  useEffect(() => {
    if (stateParam && stateParam !== 'all') {
      setSelectedState(stateParam);
    }
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [stateParam, queryParam]);

  // Current selected state's districts
  const currentDistricts =
    selectedState !== 'all'
      ? INDIA_STATES_DATA.find((s) => s.name.toLowerCase() === selectedState.toLowerCase())?.districts || []
      : [];

  // Filter listings
  const filteredPoints = points.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesState = selectedState === 'all' || p.address.state.toLowerCase() === selectedState.toLowerCase();
    const matchesDistrict =
      selectedDistrict === 'all' ||
      (p.address.district && p.address.district.toLowerCase().includes(selectedDistrict.toLowerCase()));
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.fullAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.address.pinCode && p.address.pinCode.includes(searchTerm.trim())) ||
      p.organizationName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesState && matchesDistrict && matchesSearch;
  });

  const markers: MapMarkerData[] = filteredPoints.map((p) => ({
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

  const handleMarkerSelect = (marker: MapMarkerData) => {
    const found = points.find((p) => p.id === marker.id);
    if (found) setActivePoint(found);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportModalPoint) return;

    store.addNotification({
      userId: 'user-admin-1',
      title: 'Listing Inaccuracy Reported',
      message: `User reported inaccurate info for "${reportModalPoint.title}": ${reportReason}`,
      type: 'warning',
      link: '/admin'
    });

    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportModalPoint(null);
      setReportReason('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header and Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-coral uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" /> Nationwide Coverage
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Nationwide Humanitarian Assistance Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Discover verified community kitchens, shelters, clothing drop-offs, and health services across all 28 states and union territories.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-brand-coral" />
            <span>Map View</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5 text-brand-coral" />
            <span>List View ({filteredPoints.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Keyword / Locality Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search locality, city, PIN code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-coral"
            />
          </div>

          {/* State Filter */}
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedDistrict('all');
            }}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
            aria-label="Filter by state"
          >
            <option value="all">All States & UTs (Nationwide)</option>
            {INDIA_STATES_DATA.map((s) => (
              <option key={s.code} value={s.name}>
                {s.name} ({s.zone})
              </option>
            ))}
          </select>

          {/* District Filter (Conditional) */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={selectedState === 'all'}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral disabled:opacity-50"
            aria-label="Filter by district"
          >
            <option value="all">
              {selectedState === 'all' ? 'Select state to choose district' : 'All Districts in State'}
            </option>
            {currentDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
            aria-label="Filter by assistance category"
          >
            <option value="all">All Assistance Categories</option>
            <option value="food">🍲 Food Assistance & Meals</option>
            <option value="shelter">🏠 Safe Shelters & Accommodation</option>
            <option value="clothing">👕 Clothing & Blankets</option>
            <option value="hygiene">🧼 Hygiene & Care Kits</option>
            <option value="medical">🏥 Medical & First Aid</option>
            <option value="community_centre">🤝 Community Support Centres</option>
            <option value="general_donation">❤️ General Donation Points</option>
          </select>
        </div>

        {/* Active Filters Pill Bar */}
        {(selectedCategory !== 'all' || selectedState !== 'all' || selectedDistrict !== 'all' || searchTerm.trim() !== '') && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')}>&times;</button>
              </span>
            )}
            {selectedState !== 'all' && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                State: {selectedState}
                <button onClick={() => { setSelectedState('all'); setSelectedDistrict('all'); }}>&times;</button>
              </span>
            )}
            {searchTerm.trim() !== '' && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')}>&times;</button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedState('all');
                setSelectedDistrict('all');
                setSearchTerm('');
              }}
              className="text-brand-coral font-bold ml-auto hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area: Map View vs List View */}
      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveMap
              markers={markers}
              selectedCategory={selectedCategory}
              height="600px"
              showCategoryFilterBar={false}
              onSelectMarker={handleMarkerSelect}
              onReportInaccurate={(id, title) => {
                const found = points.find((p) => p.id === id);
                if (found) setReportModalPoint(found);
              }}
            />
          </div>

          {/* Side Drawer with Details or Quick List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm h-[600px] flex flex-col">
            {activePoint ? (
              <div className="space-y-4 overflow-y-auto pr-1">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-bold text-brand-coral uppercase tracking-wider">
                    {activePoint.category.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => setActivePoint(null)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{activePoint.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{activePoint.organizationName}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={activePoint.status} size="sm" />
                  <StatusBadge status={activePoint.availabilityStatus} size="sm" />
                </div>

                <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{activePoint.address.fullAddress}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Hours:</strong> {activePoint.operatingHours}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Contact:</strong> {activePoint.contactInfo.phone}</span>
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">About This Service</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{activePoint.description}</p>
                </div>

                {activePoint.acceptedItems && activePoint.acceptedItems.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Accepted Donations</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activePoint.acceptedItems.map((item, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activePoint.accessibility && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Accessibility Features</h4>
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      {activePoint.accessibility.wheelchairAccessible && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                          ♿ Wheelchair Accessible
                        </span>
                      )}
                      {activePoint.accessibility.familyFriendly && (
                        <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                          👨‍👩‍👧 Family Friendly
                        </span>
                      )}
                      {activePoint.accessibility.womenSpecific && (
                        <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded">
                          👩 Women Safe Space
                        </span>
                      )}
                      {activePoint.accessibility.bedsAvailable !== undefined && (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
                          🛏️ {activePoint.accessibility.bedsAvailable} Beds Available
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${activePoint.address.coordinates.lat},${activePoint.address.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold text-center hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setReportModalPoint(activePoint)}
                    className="px-3 py-2 bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Report Update
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Points in View ({filteredPoints.length})
                  </span>
                  <span className="text-[11px] text-slate-400">Click a pin or list item</span>
                </div>

                <div className="space-y-2 overflow-y-auto pr-1 flex-1">
                  {filteredPoints.length === 0 ? (
                    <div className="text-center py-12 px-4 space-y-2">
                      <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                      <h4 className="font-bold text-slate-800 text-sm">No confirmed points in this area</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        There are currently no registered listings in this filter. Expand your search area or select nationwide view.
                      </p>
                    </div>
                  ) : (
                    filteredPoints.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setActivePoint(item)}
                        className="p-3 rounded-xl border border-slate-100 hover:border-brand-coral/40 hover:bg-orange-50/30 cursor-pointer transition-all space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-brand-coral uppercase">
                            {item.category.replace('_', ' ')}
                          </span>
                          <StatusBadge status={item.status} size="sm" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">📍 {item.address.city}, {item.address.state}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPoints.length === 0 ? (
            <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center max-w-md mx-auto space-y-3">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="font-bold text-slate-900 text-base">No confirmed listings match your criteria</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The database currently has no confirmed humanitarian listings for this specific filter. You can widen your geographic scope or submit a new point.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedState('all');
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-brand-coral text-white text-xs font-semibold rounded-xl hover:bg-brand-coralHover transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredPoints.map((point) => (
              <div
                key={point.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-brand-coral uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded">
                      {point.category.replace('_', ' ')}
                    </span>
                    <StatusBadge status={point.status} size="sm" />
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{point.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{point.organizationName}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">📍 {point.address.fullAddress}</p>
                  <p className="text-xs text-slate-500">
                    <strong>Hours:</strong> {point.operatingHours}
                  </p>

                  {point.acceptedItems && point.acceptedItems.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[10px] font-semibold text-slate-400 block mb-1 uppercase">Accepted Items:</span>
                      <div className="flex flex-wrap gap-1">
                        {point.acceptedItems.slice(0, 3).map((item, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                            {item}
                          </span>
                        ))}
                        {point.acceptedItems.length > 3 && (
                          <span className="text-[10px] text-slate-400 self-center">
                            +{point.acceptedItems.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${point.address.coordinates.lat},${point.address.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => {
                      setActivePoint(point);
                      setViewMode('map');
                    }}
                    className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    View on Map
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Report Inaccurate Information Modal */}
      {reportModalPoint && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-sm">Report Incorrect Information</h3>
              </div>
              <button onClick={() => setReportModalPoint(null)} className="text-slate-400 hover:text-slate-600 font-bold">
                &times;
              </button>
            </div>

            {reportSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Thank You for Your Report</h4>
                <p className="text-xs text-slate-600">
                  Our verification team has received your feedback and will review "{reportModalPoint.title}".
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <p className="text-xs text-slate-600">
                  Please let us know what details are incorrect for <strong>{reportModalPoint.title}</strong> (e.g., changed hours, relocated address, closure, or contact number).
                </p>

                <textarea
                  rows={4}
                  required
                  placeholder="Describe what needs updating..."
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-coral text-slate-800"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalPoint(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-brand-coral text-white rounded-xl hover:bg-brand-coralHover transition-colors"
                  >
                    Submit Report
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
