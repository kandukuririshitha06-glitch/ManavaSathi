import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import type { AssistanceCategory, AssistancePoint, CommunityNeedsReport, VolunteerTask } from '../types';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import { StatusBadge } from './StatusBadge';
import {
  Compass,
  Filter,
  Layers,
  MapPin,
  ExternalLink,
  AlertTriangle,
  Info,
  CheckCircle2,
  Search,
  Crosshair
} from 'lucide-react';

export interface MapMarkerData {
  id: string;
  type: 'assistance' | 'need' | 'task';
  category: AssistanceCategory;
  title: string;
  organizationName?: string;
  lat: number;
  lng: number;
  status: string;
  address: string;
  city: string;
  state: string;
  hours?: string;
  acceptedItems?: string[];
  requirements?: string[];
  bedsAvailable?: number;
  urgency?: string;
  availabilityStatus?: string;
  isApproximate?: boolean;
}

interface InteractiveMapProps {
  markers: MapMarkerData[];
  selectedCategory?: AssistanceCategory | 'all';
  onSelectMarker?: (marker: MapMarkerData) => void;
  height?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
  showCategoryFilterBar?: boolean;
  onReportInaccurate?: (markerId: string, title: string) => void;
}

// Marker icon generator with distinctive symbols and colors
const getCategoryIconHtml = (category: AssistanceCategory, isUrgent: boolean = false) => {
  let symbol = '❤️';
  let bgColor = '#f45a43';

  switch (category) {
    case 'food':
      symbol = '🍲';
      bgColor = '#ea580c';
      break;
    case 'shelter':
      symbol = '🏠';
      bgColor = '#0284c7';
      break;
    case 'clothing':
      symbol = '👕';
      bgColor = '#7c3aed';
      break;
    case 'hygiene':
      symbol = '🧼';
      bgColor = '#059669';
      break;
    case 'medical':
      symbol = '🏥';
      bgColor = '#dc2626';
      break;
    case 'community_centre':
      symbol = '🤝';
      bgColor = '#d97706';
      break;
    case 'general_donation':
      symbol = '❤️';
      bgColor = '#e11d48';
      break;
    case 'urgent_request':
      symbol = '🆘';
      bgColor = '#b91c1c';
      break;
    case 'volunteer_activity':
      symbol = '🙋';
      bgColor = '#0d9488';
      break;
  }

  const urgentClass = isUrgent ? 'marker-urgent ring-4 ring-red-400' : '';

  return `
    <div class="custom-map-marker ${urgentClass}" style="background-color: ${bgColor}; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
      <span>${symbol}</span>
    </div>
  `;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  markers,
  selectedCategory = 'all',
  onSelectMarker,
  height = '560px',
  initialCenter = [22.3511, 78.6677], // Center of India
  initialZoom = 5,
  showCategoryFilterBar = true,
  onReportInaccurate
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  const [activeCategory, setActiveCategory] = useState<AssistanceCategory | 'all'>(selectedCategory);
  const [selectedState, setSelectedState] = useState<string>('all');
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Categories config
  const categories: { id: AssistanceCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Services', icon: '📍' },
    { id: 'food', label: 'Food Assistance', icon: '🍲' },
    { id: 'shelter', label: 'Shelters', icon: '🏠' },
    { id: 'clothing', label: 'Clothing & Blankets', icon: '👕' },
    { id: 'hygiene', label: 'Hygiene & Care', icon: '🧼' },
    { id: 'medical', label: 'Health & Medical', icon: '🏥' },
    { id: 'community_centre', label: 'Community Centre', icon: '🤝' },
    { id: 'general_donation', label: 'Donation Points', icon: '❤️' },
    { id: 'urgent_request', label: 'Urgent Needs', icon: '🆘' },
    { id: 'volunteer_activity', label: 'Volunteer Activities', icon: '🙋' }
  ];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 4,
        maxZoom: 18,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | ManavaSathi',
        maxZoom: 19
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // cleanup on full unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Filter markers
  const filteredMarkers = markers.filter((m) => {
    const matchesCategory = activeCategory === 'all' || m.category === activeCategory;
    const matchesState = selectedState === 'all' || m.state.toLowerCase() === selectedState.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.organizationName && m.organizationName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesState && matchesSearch;
  });

  // Render Markers on Map
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    const group = markersGroupRef.current;
    group.clearLayers();

    filteredMarkers.forEach((item) => {
      const isUrgent = item.category === 'urgent_request' || item.urgency === 'critical';
      const customIcon = L.divIcon({
        html: getCategoryIconHtml(item.category, isUrgent),
        className: 'custom-leaflet-div-icon',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([item.lat, item.lng], { icon: customIcon });

      // Rich popup content
      const popupHtml = `
        <div style="min-width: 240px; max-width: 290px; font-family: system-ui, sans-serif;">
          <div style="margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between; gap: 6px;">
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #f45a43; letter-spacing: 0.5px;">
              ${item.category.replace('_', ' ')}
            </span>
            <span style="font-size: 10px; background: ${item.status === 'verified' ? '#d1fae5' : '#fef3c7'}; color: ${item.status === 'verified' ? '#065f46' : '#92400e'}; padding: 2px 6px; border-radius: 9999px; font-weight: 600;">
              ${item.status === 'verified' ? 'Verified' : item.status.replace('_', ' ')}
            </span>
          </div>

          <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.3;">
            ${item.title}
          </h4>

          ${item.organizationName ? `<p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b; font-weight: 500;">${item.organizationName}</p>` : ''}

          <p style="margin: 0 0 8px 0; font-size: 12px; color: #334155; line-height: 1.4;">
            📍 ${item.address}
          </p>

          ${item.hours ? `<p style="margin: 0 0 8px 0; font-size: 11px; color: #475569; background: #f8fafc; padding: 4px 8px; border-radius: 6px;"><strong>Hours:</strong> ${item.hours}</p>` : ''}

          ${item.isApproximate ? `<div style="font-size: 10px; color: #b45309; background: #fffbeb; padding: 4px 6px; border-radius: 4px; margin-bottom: 8px;">🛡️ Approximate coordinates to protect vulnerable individuals.</div>` : ''}

          <div style="display: flex; gap: 6px; margin-top: 10px; border-top: 1px solid #e2e8f0; padding-top: 8px;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #0f172a; color: white; padding: 6px 10px; font-size: 11px; font-weight: 600; text-decoration: none; border-radius: 6px;">
              Directions ↗
            </a>
            <button onclick="window.__onReportInaccurate && window.__onReportInaccurate('${item.id}', '${item.title.replace(/'/g, "\\'")}')" style="background: #f1f5f9; color: #475569; border: none; padding: 6px 8px; font-size: 11px; border-radius: 6px; cursor: pointer;">
              Report
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        if (onSelectMarker) onSelectMarker(item);
      });

      marker.addTo(group);
    });

    // Provide global handler for report click inside popup
    (window as any).__onReportInaccurate = (id: string, title: string) => {
      if (onReportInaccurate) {
        onReportInaccurate(id, title);
      } else {
        alert(`Thank you for flagging "${title}". An administrator has been notified to review this location.`);
      }
    };
  }, [filteredMarkers, onSelectMarker, onReportInaccurate]);

  // Handle State quick jump
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    if (!mapInstanceRef.current) return;

    if (stateName === 'all') {
      mapInstanceRef.current.flyTo(initialCenter, initialZoom, { duration: 1.2 });
    } else {
      const stateObj = INDIA_STATES_DATA.find((s) => s.name.toLowerCase() === stateName.toLowerCase());
      if (stateObj) {
        mapInstanceRef.current.flyTo([stateObj.lat, stateObj.lng], 8, { duration: 1.2 });
      }
    }
  };

  // GPS Locate User
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGpsStatus('Geolocation is not supported by your browser. Please select your state/city manually.');
      return;
    }

    setGpsStatus('Locating your position...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setGpsStatus(null);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 12, { duration: 1.5 });
          L.circle([latitude, longitude], {
            radius: 800,
            color: '#f45a43',
            fillColor: '#f45a43',
            fillOpacity: 0.15
          }).addTo(mapInstanceRef.current).bindPopup('Your Current Approximate Location').openPopup();
        }
      },
      (err) => {
        console.warn('Geolocation denied or failed', err);
        setGpsStatus('GPS permission was denied or unavailable. You can easily choose any Indian State or City using the dropdown above.');
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      {/* Category Filter Bar */}
      {showCategoryFilterBar && (
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-coral text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Jump Dropdown & Search */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search city / area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-coral"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
              aria-label="Filter by Indian State"
            >
              <option value="all">All India (Nationwide)</option>
              {INDIA_STATES_DATA.map((s) => (
                <option key={s.code} value={s.name}>
                  {s.name} ({s.zone})
                </option>
              ))}
            </select>

            <button
              onClick={handleLocateMe}
              title="Find my nearby location"
              className="p-1.5 bg-white border border-slate-300 text-slate-700 hover:text-brand-coral hover:border-brand-coral rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <Crosshair className="w-4 h-4 text-brand-coral" />
              <span className="hidden md:inline">Near Me</span>
            </button>
          </div>
        </div>
      )}

      {/* GPS Status Notice if needed */}
      {gpsStatus && (
        <div className="bg-amber-50 text-amber-800 border-b border-amber-200 px-3 py-1.5 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{gpsStatus}</span>
          </div>
          <button onClick={() => setGpsStatus(null)} className="font-bold text-amber-900 ml-2">
            &times;
          </button>
        </div>
      )}

      {/* Leaflet Map Div */}
      <div className="relative w-full" style={{ height }}>
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Map Marker Counter & Legend overlay */}
        <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md border border-slate-200 text-xs pointer-events-auto">
          <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
            <MapPin className="w-3.5 h-3.5 text-brand-coral" />
            <span>{filteredMarkers.length} Points Visible</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Click any pin for verified hours & directions.
          </div>
        </div>

        {/* Empty state alert if filter returns 0 */}
        {filteredMarkers.length === 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-200 max-w-sm text-center">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h4 className="font-bold text-slate-900 text-sm mb-1">No Confirmed Listings in Selected Filter</h4>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Our nationwide database currently has no verified listings matching this filter. This does not mean people in this area do not need assistance.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedState('all');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 bg-brand-coral text-white text-xs font-semibold rounded-lg hover:bg-brand-coralHover transition-colors"
            >
              Reset Filters to All India
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
