# ManavaSathi — Every Human Deserves Care

> **A nationwide humanitarian assistance platform for India.**  
> Connecting people who need essential help with verified services, volunteers, donors, and community organisations across every state and union territory.

---

## What Is ManavaSathi?

ManavaSathi ("A companion for humanity") is a complete, responsive, humanitarian-support web application built with:

| Technology | Purpose |
|---|---|
| **React 19 + TypeScript** | UI framework and type safety |
| **Vite 6** | Build tool and dev server |
| **Tailwind CSS 3** | Utility-first styling with warm brand design system |
| **React Router 6** | Client-side routing for all 22 pages |
| **Leaflet + OpenStreetMap** | Interactive nationwide map (free, no API key needed) |
| **Local Storage Store** | Reactive demo-mode state (drop-in for Firebase Firestore) |
| **Firebase Auth placeholder** | Ready-to-connect authentication |
| **Lucide React** | Accessible icon system |

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Copy and configure environment variables
cp .env.example .env
# Then edit .env and add your Firebase / Razorpay credentials

# 3. Start the development server
npm run dev
# → Opens at http://localhost:5173/

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## What Is Already Working (Demo Mode)

All features below work **right now** with locally-seeded demo data — no external credentials needed:

| Feature | Status |
|---|---|
| 🗺️ **Interactive Nationwide Map** | ✅ Leaflet + OpenStreetMap across all India |
| 📍 **All 22 Pages** | ✅ Implemented and routed |
| 🔍 **Location Search** | ✅ By city, locality, state, district, PIN code |
| 🏷️ **Category Filters** | ✅ Food, Shelter, Clothing, Hygiene, Medical, Community, Urgent, Volunteer |
| 🌏 **Nationwide State Coverage** | ✅ All 28 states + 8 UTs with districts |
| 📱 **Responsive Design** | ✅ Mobile, tablet, desktop |
| 🔄 **Role Switcher** | ✅ Instantly test Admin, Volunteer, Org Rep, Donor, Community views |
| 🏛️ **Admin Dashboard** | ✅ Review, approve/reject listings + organisations + community needs |
| 🆔 **Verification Workflow** | ✅ Pending → Verified → Rejected with audit log |
| 📝 **Donation Point Submission** | ✅ Form with pending-verification labelling |
| 🙋 **Volunteer Task System** | ✅ Browse, join, complete tasks with dignity-first safety instructions |
| 🤝 **Community Needs Reporting** | ✅ Approximate location, urgency, respectful language |
| 💰 **Monetary Donation Page** | ✅ Transparent — shows setup message instead of fake payment |
| 📦 **Supply Donation Pledge** | ✅ Item pledge with organisation matching |
| 🏥 **Organisation Registration** | ✅ Multi-step form with pending-verification flow |
| 🔔 **Notifications System** | ✅ Role-aware activity alerts |
| 🌐 **Multilingual Framework** | ✅ English, Hindi, Telugu, Tamil implemented; 9 more marked "Preview" |
| 🔒 **Privacy Controls** | ✅ Profile page with data deletion, phone visibility toggle |
| 📊 **Honest Impact Dashboard** | ✅ Counts from actual database records, clearly labelled as demo |
| 🛡️ **Demo Mode Banner** | ✅ Always-visible notice — no fake transactions or fake verifications |

---

## Pages Implemented

| # | Page | Route |
|---|---|---|
| 1 | Home | `/` |
| 2 | Nationwide Assistance Map | `/map` |
| 3 | Find Food | `/food` |
| 4 | Find Shelter | `/shelter` |
| 5 | Essential Supplies | `/supplies` |
| 6 | Humanitarian Donation Points | `/donation-points` |
| 7 | Community Needs Map | `/community-needs` |
| 8 | Report a Community Need | `/report-need` |
| 9 | Volunteer Opportunities | `/volunteer` |
| 10 | Volunteer Dashboard | `/volunteer-dashboard` |
| 11 | Donate Money | `/donate-money` |
| 12 | Donate Supplies | `/donate-supplies` |
| 13 | Register an Organisation | `/register-org` |
| 14 | Organisation Dashboard | `/org-dashboard` |
| 15 | User Dashboard | `/user-dashboard` |
| 16 | Notifications | `/notifications` |
| 17 | User Profile & Privacy | `/profile` |
| 18 | Administrator Dashboard | `/admin` |
| 19 | About ManavaSathi | `/about` |
| 20 | Contact & Support | `/contact` |
| 21 | Privacy Policy | `/privacy` |
| 22 | Terms of Use | `/terms` |

---

## Demo Data — Assistance Points Nationwide

| City | State | Category |
|---|---|---|
| Hyderabad | Telangana | Food (Community Kitchen) |
| Visakhapatnam | Andhra Pradesh | Shelter |
| Mumbai | Maharashtra | Clothing & Blankets |
| New Delhi | Delhi | Shelter & Winter Relief |
| Chennai | Tamil Nadu | Food (Community Kitchen) |
| Bengaluru | Karnataka | Hygiene & Health |
| Guwahati | Assam | Essential Supplies & Relief |
| Lucknow | Uttar Pradesh | Food (Community Kitchen) |
| Kolkata | West Bengal | General Donation Point |
| Ahmedabad | Gujarat | Community Support Centre |
| Jaipur | Rajasthan | Shelter (Needs Update — flagged) |
| Srinagar | Jammu & Kashmir | Medical & Winter Aid |

All demo listings are **clearly labelled as fictional sample data** and carry `isDemoData: true` flags internally.

---

## Connecting Live Services

### Firebase (Authentication + Firestore)

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication** (Email/Password and/or Google Sign-In).
3. Create a **Cloud Firestore** database.
4. Copy your project credentials into `.env`:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
5. Install the Firebase SDK: `npm install firebase`
6. Replace the store service (`src/services/store.ts`) with Firestore SDK calls — the store interface is already Firebase-compatible.

### Razorpay (Monetary Donations)

> ⚠️ **Security:** Never process payments client-side only. Use Cloud Functions or a server to create orders and verify payment signatures.

1. Get your Key ID from [razorpay.com](https://razorpay.com).
2. Add `VITE_RAZORPAY_KEY_ID` to `.env` (publishable Key ID only — never the secret).
3. Deploy a Firebase Cloud Function to create orders and verify webhook signatures.

### Map Provider

The default map is **OpenStreetMap + Leaflet** (free, no API key, nationwide India coverage). Switch to Google Maps by adding `VITE_GOOGLE_MAPS_API_KEY` to `.env` and updating `src/components/InteractiveMap.tsx`.

---

## Architecture

```
src/
├── components/
│   ├── DemoBanner.tsx        ← Demo notice + role switcher
│   ├── Footer.tsx            ← Site-wide footer
│   ├── InteractiveMap.tsx    ← Leaflet map with category filters
│   ├── Navbar.tsx            ← Responsive navigation
│   └── StatusBadge.tsx       ← Verification / availability status labels
├── context/
│   └── LanguageContext.tsx   ← Multilingual context provider
├── data/
│   └── mockData.ts           ← Demo seed data (flagged isDemoData: true)
├── i18n/
│   └── translations.ts       ← en, hi, te, ta + 9 preview languages
├── pages/                    ← 22 fully implemented pages
├── services/
│   ├── firebase.ts           ← Firebase config checker (honest fallback)
│   └── store.ts              ← Reactive localStorage store (Firebase-ready)
├── types/
│   └── index.ts              ← Complete TypeScript models for all data
└── utils/
    └── indiaGeo.ts           ← All 28 states + 8 UTs with districts
```

---

## Privacy & Dignity Guarantees

- 🚫 Never maps individual people sleeping outdoors
- 🚫 Never requires photographs to receive assistance  
- 🚫 Never exposes exact coordinates of vulnerable individuals
- ✅ Approximate locations for community need reports
- ✅ Respectful language — "person needing assistance", not "beggar"
- ✅ Consent-first reporting forms
- ✅ Role-based access to sensitive reports
- ✅ Audit log for every admin action

---

## Deployment

```bash
npm run build
# Upload dist/ to Netlify, Vercel, or Firebase Hosting
```

`public/_redirects` is pre-configured for Netlify SPA routing.

---

*Built with dignity, care, and respect for every human being.*
