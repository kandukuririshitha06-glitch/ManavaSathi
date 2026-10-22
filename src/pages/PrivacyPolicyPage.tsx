import React from 'react';
import { ShieldCheck, Lock, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-slate-800">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Privacy & Dignity Charter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy, Dignity & Safeguarding Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Last updated: October 2026 • Effective nationwide across India
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Core Humanitarian Principle: Aid with Dignity</h2>
          <p>
            Humanitarian assistance must protect people rather than expose them to vulnerability or social stigma. At <strong>ManavaSathi</strong>, we adhere to strict non-surveillance and dignity-first ethics:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>No Recipient Photography:</strong> We never require, encourage, or permit photographs of recipients to receive food, blankets, or shelter.</li>
            <li><strong>No Public Mapping of Individuals:</strong> We map registered services, community kitchens, and general outreach zones—never identifiable individuals.</li>
            <li><strong>Respectful Terminology:</strong> We strictly avoid degrading labels. We use respectful terms such as <em>person needing assistance</em>, <em>community support request</em>, and <em>area requiring outreach</em>.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900">2. Geographic Location Approximation</h2>
          <p>
            When a user reports a community need (e.g. food parcels or thermal blankets needed), coordinates displayed on the public map are automatically generalized and offset within a 1 to 2 kilometer radius. Precise coordinates are never published publicly to prevent harassment, exploitation, or forced displacement.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900">3. Voluntary Consent & Anonymity</h2>
          <p>
            Community members discovering nearby food assistance, shelters, or clothing points can browse the platform without creating an account or providing phone numbers. Authentication is required solely for actions requiring accountability, such as managing organization listings or coordinating volunteer logistics.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900">4. Right to Data Erasure & Privacy Controls</h2>
          <p>
            Any registered user, volunteer, or organization representative can at any time request the permanent erasure of their profile data, logs, and contact identifiers through their Profile & Privacy Settings. We do not sell, rent, or monetize user data.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900">5. Contact Our Privacy Cell</h2>
          <p>
            For privacy inquiries or grievance reporting regarding sensitive listings, contact our dedicated ethics cell at <code className="bg-slate-100 px-1 py-0.5 rounded text-brand-coral font-bold">privacy@manavasathi.org</code>.
          </p>
        </section>
      </div>
    </div>
  );
};
