import React from 'react';
import { Shield, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-slate-800">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
          <FileText className="w-4 h-4 text-brand-coral" />
          <span>Platform Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terms of Humanitarian Use
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Last updated: October 2026 • Governing all users, volunteers, and organizations
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Nature of the Platform</h2>
          <p>
            ManavaSathi is an open civil coordination platform designed to bridge community assistance with people who need food, clothing, shelter, and essential supplies. <strong>ManavaSathi is NOT an emergency dispatch or official rescue agency.</strong> In situations involving immediate danger, medical crisis, or safeguarding threats, users must immediately contact official emergency services (112, 108, 1098, or 14567).
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900">2. Prohibition on Fake Listings & Fraudulent Solicitations</h2>
          <p>
            Users, organizations, and donation centers agree never to fabricate addresses, telephone numbers, bank accounts, UPI IDs, or verification badges. Any attempt to solicit money under false pretenses or misrepresent charitable activities will result in immediate suspension and notification to law enforcement authorities.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900">3. Dignity & Code of Conduct</h2>
          <p>
            All users and registered volunteers agree to respect the dignity, privacy, and autonomy of persons needing assistance:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>Never take or publish photographs or video recordings of recipients receiving aid.</li>
            <li>Never condition food or emergency relief on religious, political, or social affiliations.</li>
            <li>Never use abusive, degrading, or stigmatizing language.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900">4. Supply Donation Standards</h2>
          <p>
            Donors pledging physical supplies warrant that items are clean, hygienic, and safe for use. Donating expired packaged foods, damaged garments, or contaminated hygiene goods is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            While ManavaSathi exercises diligent review protocols, listings and operating schedules are maintained by independent charitable bodies. We do not guarantee bed availability or food stock at third-party premises. Users are encouraged to verify availability by phone before transit.
          </p>
        </section>
      </div>
    </div>
  );
};
