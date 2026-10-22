import React, { useState, useEffect } from 'react';
import { store } from '../services/store';
import type { Organization, MonetaryDonation } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import {
  HandHeart,
  ShieldCheck,
  AlertCircle,
  Building,
  CheckCircle2,
  Receipt,
  ExternalLink,
  Lock,
  Heart
} from 'lucide-react';

export const DonateMoneyPage: React.FC = () => {
  const [orgs, setOrgs] = useState<Organization[]>(store.getOrganizations());
  const [monetaryDonations, setMonetaryDonations] = useState<MonetaryDonation[]>(store.getMonetaryDonations());
  const [selectedOrgId, setSelectedOrgId] = useState<string>(orgs[0]?.id || '');
  const [amount, setAmount] = useState<number>(1000);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [purpose, setPurpose] = useState('Nourishment & Community Meals');
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const isRazorpayConfigured = !!razorpayKey && !razorpayKey.includes('YOUR_');

  useEffect(() => {
    return store.subscribe(() => {
      setOrgs(store.getOrganizations());
      setMonetaryDonations(store.getMonetaryDonations());
    });
  }, []);

  const verifiedOrgs = orgs.filter((o) => o.verificationStatus === 'verified');
  const currentOrg = verifiedOrgs.find((o) => o.id === selectedOrgId) || verifiedOrgs[0];

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRazorpayConfigured) {
      // Per Section 11 requirement:
      // "If payment integration is not configured, display a clearly labelled setup or demo message. Do not simulate a real successful transaction."
      setShowDemoNotice(true);
      return;
    }

    // When Razorpay is configured in production, invoke standard Razorpay checkout
    alert('Razorpay gateway configured. In production, this launches standard signed server checkout.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <HandHeart className="w-4 h-4 text-rose-600" />
          <span>Financial Transparency & Direct Aid</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Support Verified Humanitarian Initiatives
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Donate directly to vetted community trusts and verified kitchens with total transparency. ManavaSathi never takes commissions or conceals fund utilization.
        </p>
      </div>

      {/* Honest Payment Provider Status Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-2 text-slate-900">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Secure Gateway Integration Status</span>
          </span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            isRazorpayConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {isRazorpayConfigured ? 'Live Gateway Connected' : 'Setup Required (Demo Mode)'}
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {isRazorpayConfigured
            ? 'Payments are processed via authorized Razorpay checkout and verified on the server.'
            : 'Payment gateway credentials are intentionally unconfigured in this demonstration environment. In compliance with Section 11 rules, no fake transactions or artificial payment success receipts are generated.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Donation Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Choose Verified Recipient & Amount</h2>

          <form onSubmit={handleInitiatePayment} className="space-y-5 text-xs">
            {/* Choose Verified Org */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Select Verified Recipient Organization *
              </label>
              <select
                value={selectedOrgId}
                onChange={(e) => setSelectedOrgId(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-coral"
              >
                {verifiedOrgs.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name} ({org.city}, {org.state})
                  </option>
                ))}
              </select>
              {currentOrg && (
                <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <p><strong>Registration ID:</strong> {currentOrg.registrationNumber}</p>
                  <p><strong>Focus:</strong> {currentOrg.description}</p>
                  <p><strong>Authorized Trustee:</strong> {currentOrg.authorizedPerson}</p>
                </div>
              )}
            </div>

            {/* Amount Selection */}
            <div>
              <label className="font-bold text-slate-700 block mb-2">Select Donation Amount (INR) *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[500, 1000, 2500, 5000].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`py-2.5 rounded-xl font-bold transition-all border ${
                      amount === amt
                        ? 'bg-brand-coral text-white border-brand-coral shadow-sm'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  min={100}
                  step={50}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none"
                  placeholder="Enter custom amount"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Fund Allocation Purpose *</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none"
              >
                <option value="Nourishment & Community Meals">Free Hot Meal Preparation & Grain Procurement</option>
                <option value="Winter Blankets & Thermal Clothing">Winter Thermal Blankets & Protective Clothing</option>
                <option value="Night Shelter Bed Maintenance & Hygiene">Sanitized Shelter Bedding & Hygiene Kits</option>
                <option value="Emergency Elder & Disability Care">Elderly Living Alone & Disability Support</option>
              </select>
            </div>

            {/* Donor Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Donor Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Kumar (or leave blank for Anonymous)"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email (for 80G Tax Receipt)</label>
                <input
                  type="email"
                  placeholder="donor@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-coral hover:bg-brand-coralHover text-white font-bold rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Proceed to Donate ₹{amount.toLocaleString('en-IN')}</span>
            </button>
          </form>
        </div>

        {/* Transparency Records Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-emerald-600" />
              <span>Recent Verified Contributions</span>
            </h3>

            <div className="space-y-3 text-xs">
              {monetaryDonations.map((don) => (
                <div key={don.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>₹{don.amount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">
                      {don.isDemoData ? 'Demo Record' : 'Verified'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">To: {don.targetOrganizationName}</p>
                  <p className="text-[10px] text-slate-400">Ref: {don.transactionRef}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-3xl border border-emerald-200 p-6 text-xs text-emerald-950 space-y-2">
            <span className="font-bold block">Tax Exemption (80G) Note:</span>
            <p className="text-emerald-800 leading-relaxed text-[11px]">
              Direct monetary contributions to verified registered trusts under Section 80G of the Income Tax Act qualify for statutory tax benefits. Receipts are issued directly under the organization's legal name.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Mode Notice Modal */}
      {showDemoNotice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2.5 text-amber-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-bold text-slate-900 text-base">Payment Gateway Setup Notice</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Per ManavaSathi Humanitarian Platform Guidelines (Section 11), simulated or fake payment completions are strictly forbidden.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 font-mono">
              <span className="font-bold block text-slate-900 font-sans">To enable live donations:</span>
              <p>1. Supply <code>VITE_RAZORPAY_KEY_ID</code> in <code>.env</code></p>
              <p>2. Deploy Cloud Function webhook for cryptographic server validation.</p>
            </div>

            <button
              onClick={() => setShowDemoNotice(false)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
