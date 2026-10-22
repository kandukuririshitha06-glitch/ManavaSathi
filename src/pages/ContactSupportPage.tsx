import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Clock,
  Send
} from 'lucide-react';
import { store } from '../services/store';

export const ContactSupportPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Inaccurate Information Report');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.addNotification({
      userId: 'user-admin-1',
      title: `Grievance / Support Inquiry: ${subject}`,
      message: `From: ${name} (${email}): ${message.slice(0, 100)}...`,
      type: 'warning',
      link: '/admin'
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 text-slate-800">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
          <PhoneCall className="w-3.5 h-3.5 text-brand-coral" />
          <span>Grievance & Support Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Contact & Community Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Reach our platform moderators, report fraudulent donation solicitations, or get assistance navigating humanitarian services.
        </p>
      </div>

      {/* Verified Indian Emergency Numbers Grid */}
      <div className="bg-red-50/70 border border-red-200 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
          <span>Official National 24x7 Emergency Crisis Hotlines Across India</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-red-200 shadow-sm space-y-1">
            <span className="font-extrabold text-base text-red-700 block">Dial 112</span>
            <span className="font-semibold text-slate-800 block">National Emergency</span>
            <p className="text-[11px] text-slate-500">All-in-one Police, Fire & Disaster response.</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-red-200 shadow-sm space-y-1">
            <span className="font-extrabold text-base text-red-700 block">Dial 108</span>
            <span className="font-semibold text-slate-800 block">Medical Ambulance</span>
            <p className="text-[11px] text-slate-500">Emergency medical care & transport.</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-red-200 shadow-sm space-y-1">
            <span className="font-extrabold text-base text-red-700 block">Dial 1098</span>
            <span className="font-semibold text-slate-800 block">Childline India</span>
            <p className="text-[11px] text-slate-500">Protection for vulnerable or stranded children.</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-red-200 shadow-sm space-y-1">
            <span className="font-extrabold text-base text-red-700 block">Dial 14567</span>
            <span className="font-semibold text-slate-800 block">Elderline</span>
            <p className="text-[11px] text-slate-500">Toll-free helpline for senior citizens.</p>
          </div>
        </div>
      </div>

      {/* Support & Grievance Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Send a Grievance or Inquiry</h2>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-slate-900 text-base">Inquiry Dispatched</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you. Your message has been logged in the administrator review queue. We will investigate promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject / Category *</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none"
                >
                  <option value="Inaccurate Information Report">Report Inaccurate or Relocated Service Point</option>
                  <option value="Suspicious Organization Report">Report Suspicious or Unverified Solicitations</option>
                  <option value="Volunteer Coordination Inquiry">Volunteer Coordination Inquiry</option>
                  <option value="Technical or Translation Feedback">Technical or Language Translation Feedback</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide specific listing title, address, or details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-coral"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-coral hover:bg-brand-coralHover text-white font-bold rounded-xl shadow-sm transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Platform Grievance Cell</h3>
            <p className="text-slate-600 leading-relaxed">
              ManavaSathi operates an independent ethics cell to ensure dignity and non-exploitation across all community activities.
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-100 text-slate-600">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>ethics@manavasathi.org</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Review turnaround: Within 48 hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
