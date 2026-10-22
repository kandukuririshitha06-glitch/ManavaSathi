import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Utensils,
  Home as HomeIcon,
  Shirt,
  HandHeart,
  Users,
  Shield,
  Bell,
  Menu,
  X,
  Globe,
  Building2,
  AlertCircle,
  PackageCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { store } from '../services/store';

export const Navbar: React.FC = () => {
  const { language, setLanguage, languages, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(store.getCurrentUser());
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);
      const notifs = store.getNotifications(user.id);
      setUnreadCount(notifs.filter((n) => !n.read).length);
    };
    update();
    return store.subscribe(update);
  }, []);

  const navLinks = [
    { to: '/map', label: 'Nationwide Map', icon: MapPin },
    { to: '/food', label: 'Find Food', icon: Utensils },
    { to: '/shelter', label: 'Find Shelter', icon: HomeIcon },
    { to: '/supplies', label: 'Essential Supplies', icon: Shirt },
    { to: '/donation-points', label: 'Donation Points', icon: PackageCheck },
    { to: '/community-needs', label: 'Community Needs', icon: AlertCircle },
    { to: '/volunteer', label: 'Volunteer', icon: Users },
    { to: '/donate-money', label: 'Donate', icon: HandHeart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-coral via-orange-500 to-emerald-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <img src="/logo-icon.svg" alt="ManavaSathi Logo" className="w-9 h-9 rounded-full bg-white p-0.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-brand-coral transition-colors flex items-center gap-1.5">
                {t('app_name')}
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  India
                </span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wide uppercase">
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium flex items-center gap-1.5 transition-all ${
                    active
                      ? 'bg-brand-coral/10 text-brand-coral font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-brand-coral' : 'text-slate-500'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1 text-xs font-semibold transition-colors border border-transparent hover:border-slate-200"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline uppercase">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Language / भाषा
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 flex items-center justify-between transition-colors ${
                          language === l.code ? 'font-bold text-brand-coral bg-orange-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>{l.nativeName} ({l.name})</span>
                        {!l.isComplete && (
                          <span className="text-[9px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded">Preview</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Admin or Org Dashboard Quick Link */}
            {currentUser.role === 'admin' ? (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-amber-300 hover:bg-slate-800 shadow-sm transition-all"
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Console</span>
              </Link>
            ) : currentUser.role === 'org_rep' ? (
              <Link
                to="/org-dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm transition-all"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-200" />
                <span>Org Dashboard</span>
              </Link>
            ) : currentUser.role === 'volunteer' ? (
              <Link
                to="/volunteer-dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-coral text-white hover:bg-brand-coralHover shadow-sm transition-all"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Volunteer Hub</span>
              </Link>
            ) : (
              <Link
                to="/user-dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
              >
                <span>My Dashboard</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg max-h-[85vh] overflow-y-auto">
          <div className="p-2 mb-2 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
            <span className="text-slate-500">Current Role:</span>
            <span className="font-bold text-brand-coral capitalize">{currentUser.role.replace('_', ' ')}</span>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-coral text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="border-t border-slate-100 pt-3 mt-3 space-y-1">
            <Link
              to="/report-need"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-amber-700 bg-amber-50"
            >
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Report Area Needing Outreach</span>
            </Link>

            <Link
              to="/register-org"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Register an Organization</span>
            </Link>

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-amber-400 bg-slate-900"
            >
              <Shield className="w-4 h-4" />
              <span>Administrator Console</span>
            </Link>

            <Link
              to="/user-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <span>User Dashboard & Privacy Controls</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
