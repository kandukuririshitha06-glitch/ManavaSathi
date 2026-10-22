import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { NationwideMapPage } from './pages/NationwideMapPage';
import { FindFoodPage } from './pages/FindFoodPage';
import { FindShelterPage } from './pages/FindShelterPage';
import { EssentialSuppliesPage } from './pages/EssentialSuppliesPage';
import { DonationPointsPage } from './pages/DonationPointsPage';
import { CommunityNeedsMapPage } from './pages/CommunityNeedsMapPage';
import { ReportNeedPage } from './pages/ReportNeedPage';
import { VolunteerOpportunitiesPage } from './pages/VolunteerOpportunitiesPage';
import { VolunteerDashboardPage } from './pages/VolunteerDashboardPage';
import { DonateMoneyPage } from './pages/DonateMoneyPage';
import { DonateSuppliesPage } from './pages/DonateSuppliesPage';
import { RegisterOrganizationPage } from './pages/RegisterOrganizationPage';
import { OrganizationDashboardPage } from './pages/OrganizationDashboardPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactSupportPage } from './pages/ContactSupportPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfUsePage } from './pages/TermsOfUsePage';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-brand-sand text-slate-800 font-sans selection:bg-brand-coral/20 selection:text-brand-coral">
          {/* Top Demo Mode Banner & Persona Switcher */}
          <DemoBanner />

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1">
            <Routes>
              {/* 1. Home */}
              <Route path="/" element={<Home />} />

              {/* 2. Nationwide Map */}
              <Route path="/map" element={<NationwideMapPage />} />

              {/* 3. Find Food */}
              <Route path="/food" element={<FindFoodPage />} />

              {/* 4. Find Shelter */}
              <Route path="/shelter" element={<FindShelterPage />} />

              {/* 5. Essential Supplies */}
              <Route path="/supplies" element={<EssentialSuppliesPage />} />

              {/* 6. Donation Points */}
              <Route path="/donation-points" element={<DonationPointsPage />} />

              {/* 7. Community Needs Map */}
              <Route path="/community-needs" element={<CommunityNeedsMapPage />} />

              {/* 8. Report a Community Need */}
              <Route path="/report-need" element={<ReportNeedPage />} />

              {/* 9. Volunteer Opportunities */}
              <Route path="/volunteer" element={<VolunteerOpportunitiesPage />} />

              {/* 10. Volunteer Dashboard */}
              <Route path="/volunteer-dashboard" element={<VolunteerDashboardPage />} />

              {/* 11. Donate Money */}
              <Route path="/donate-money" element={<DonateMoneyPage />} />

              {/* 12. Donate Supplies */}
              <Route path="/donate-supplies" element={<DonateSuppliesPage />} />

              {/* 13. Register an Organization */}
              <Route path="/register-org" element={<RegisterOrganizationPage />} />

              {/* 14. Organization Dashboard */}
              <Route path="/org-dashboard" element={<OrganizationDashboardPage />} />

              {/* 15. User Dashboard */}
              <Route path="/user-dashboard" element={<UserDashboardPage />} />

              {/* 16. Notifications */}
              <Route path="/notifications" element={<NotificationsPage />} />

              {/* 17. User Profile & Privacy */}
              <Route path="/profile" element={<UserProfilePage />} />

              {/* 18. Administrator Dashboard */}
              <Route path="/admin" element={<AdminDashboardPage />} />

              {/* 19. About ManavaSathi */}
              <Route path="/about" element={<AboutPage />} />

              {/* 20. Contact & Support */}
              <Route path="/contact" element={<ContactSupportPage />} />

              {/* 21. Privacy Policy */}
              <Route path="/privacy" element={<PrivacyPolicyPage />} />

              {/* 22. Terms of Use */}
              <Route path="/terms" element={<TermsOfUsePage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};
export default App;
