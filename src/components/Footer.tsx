import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, PhoneCall, ShieldAlert, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      {/* Emergency Helpline Banner */}
      <div className="bg-red-950/80 border-b border-red-900/50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2 text-red-200">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              <strong>Emergency Hotlines:</strong> For immediate medical or life-threatening crisis, dial verified emergency services.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-semibold text-white">
            <span className="bg-red-900/60 px-2 py-0.5 rounded border border-red-700/50 flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-red-300" /> 112 National Emergency
            </span>
            <span className="bg-red-900/60 px-2 py-0.5 rounded border border-red-700/50 flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-red-300" /> 108 Ambulance
            </span>
            <span className="bg-red-900/60 px-2 py-0.5 rounded border border-red-700/50 flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-red-300" /> 1098 Childline
            </span>
            <span className="bg-red-900/60 px-2 py-0.5 rounded border border-red-700/50 flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-red-300" /> 14567 Elderline
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center shadow">
                <img src="/logo-icon.svg" alt="ManavaSathi" className="w-7 h-7" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">ManavaSathi</span>
            </div>
            <p className="text-brand-coral font-medium text-xs tracking-wide uppercase">
              "Every Human Deserves Care."
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A companion for humanity across India. Connecting people who need essential nourishment, warm clothing, safe shelter, and hygiene with verified charitable organizations, community kitchens, and volunteers with compassion and dignity.
            </p>
            <div className="pt-2">
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-emerald-400 block">Dignity First Commitment:</span>
                <p className="text-[11px] text-slate-400">
                  We never require photographs of aid recipients, never display precise private sleeping spots, and never stigmatize people facing hardship.
                </p>
              </div>
            </div>
          </div>

          {/* Assistance Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Find Assistance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/food" className="hover:text-white transition-colors">Free Meals & Kitchens</Link>
              </li>
              <li>
                <Link to="/shelter" className="hover:text-white transition-colors">Night Shelters & Rest Centers</Link>
              </li>
              <li>
                <Link to="/supplies" className="hover:text-white transition-colors">Clothing & Blankets</Link>
              </li>
              <li>
                <Link to="/donation-points" className="hover:text-white transition-colors">Humanitarian Donation Points</Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white transition-colors">Nationwide Interactive Map</Link>
              </li>
            </ul>
          </div>

          {/* Community & Volunteering */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Get Involved</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/volunteer" className="hover:text-white transition-colors">Volunteer Opportunities</Link>
              </li>
              <li>
                <Link to="/donate-supplies" className="hover:text-white transition-colors">Donate Supplies & Clothes</Link>
              </li>
              <li>
                <Link to="/donate-money" className="hover:text-white transition-colors">Transparent Monetary Support</Link>
              </li>
              <li>
                <Link to="/report-need" className="hover:text-white transition-colors">Report Community Need</Link>
              </li>
              <li>
                <Link to="/register-org" className="hover:text-white transition-colors">Register an Organization</Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Governance & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About ManavaSathi</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact & Grievance Cell</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy & Dignity Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Humanitarian Use</Link>
              </li>
              <li>
                <Link to="/admin" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Administrator Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} ManavaSathi. Built for India with care, hope, and transparency.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Open Humanitarian Platform
            </span>
            <span>No commercial advertisements</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
