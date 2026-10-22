import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShieldCheck,
  Compass,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 text-slate-800">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/15 text-brand-coral text-xs font-bold">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>About ManavaSathi</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          "Every Human Deserves Care."
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          <strong>ManavaSathi</strong> means a <em>companion for humanity</em>. We exist to ensure that no individual in India faces hunger, severe cold, or isolation without access to compassionate support.
        </p>
      </div>

      {/* Brand Identity & Meaning */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Brand Philosophy & Original Identity</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The ManavaSathi symbol depicts caring human hands cradling a rising sun of hope and an open heart. The warm coral/orange accents represent human warmth, empathy, and active care; the green accents represent life, renewal, and hope.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          ManavaSathi is an independent, non-partisan humanitarian platform. We do not claim false affiliation with any government ministry or single NGO. Instead, we serve as an open, verifiable bridge connecting civil society, community kitchens, shelters, and voluntary donors across India.
        </p>
      </div>

      {/* The Nationwide Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-coral flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Nationwide Geographic Reach</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            From urban centers like Mumbai, Bengaluru, and Delhi to rural hamlets in Assam, Odisha, and Rajasthan, our platform provides a unified geographical hierarchy down to street and colony levels.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Uncompromising Human Dignity</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Aid should never come at the price of humiliation. We strictly prohibit requiring photographs of recipients to receive food or essentials, and we protect vulnerable individuals from unwanted exposure.
          </p>
        </div>
      </div>

      {/* Principles & Safeguards */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-white">Our Core Humanitarian Commitments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>No Fabricated Listings:</strong> Every donation center or kitchen must be physically or documentarily verified.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Financial Integrity:</strong> Monetary contributions go directly through verified gateways with zero deductions.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Multilingual Inclusivity:</strong> Architecture prepared for 13 official Indian languages for barrier-free access.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Inclusive Outreach:</strong> Supporting anyone facing hardship—elderly, disabled, migrants, disaster survivors.</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/map"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-coral hover:bg-brand-coralHover text-white font-bold text-xs sm:text-sm shadow-md transition-all"
        >
          <span>Explore Nationwide Assistance Map</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
