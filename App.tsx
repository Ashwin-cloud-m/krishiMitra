import React, { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { OfflineProvider } from './context/OfflineContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

// Components
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { KrishiVoiceModal } from './components/KrishiVoiceModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { AiAdvisorPage } from './pages/AiAdvisorPage';
import { DiseaseScannerPage } from './pages/DiseaseScannerPage';
import { CommunityPage } from './pages/CommunityPage';
import { CropAlertMapPage } from './pages/CropAlertMapPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { SchemesPage } from './pages/SchemesPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { AuthPage } from './pages/AuthPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { AdminExpertPage } from './pages/AdminExpertPage';

export const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage setCurrentPage={setCurrentPage} onOpenVoice={() => setIsVoiceModalOpen(true)} />;
      case 'dashboard':
        return <FarmerDashboard setCurrentPage={setCurrentPage} onOpenVoice={() => setIsVoiceModalOpen(true)} />;
      case 'advisor':
        return <AiAdvisorPage />;
      case 'disease':
        return <DiseaseScannerPage />;
      case 'community':
        return <CommunityPage />;
      case 'map':
        return <CropAlertMapPage />;
      case 'sustainability':
        return <SustainabilityPage />;
      case 'schemes':
        return <SchemesPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'auth':
      case 'login':
        return <AuthPage onComplete={() => setCurrentPage('dashboard')} />;
      case 'profile':
        return <ProfileSettingsPage />;
      case 'admin':
        return <AdminExpertPage />;
      default:
        return <LandingPage setCurrentPage={setCurrentPage} onOpenVoice={() => setIsVoiceModalOpen(true)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-stone-900 bg-[#fdfbf7]">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      {/* Mobile-first bottom navigation bar */}
      <BottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
      />

      {/* Full-screen Voice Assistant Modal */}
      <KrishiVoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <OfflineProvider>
          <AccessibilityProvider>
            <MainApp />
          </AccessibilityProvider>
        </OfflineProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
