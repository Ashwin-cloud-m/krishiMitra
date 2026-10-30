import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { SupportedLanguage, UserRole } from '../types';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onOpenVoice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, onOpenVoice }) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, switchRole } = useAuth();
  const { isOnline, toggleSimulatedOffline, outbox, syncOutbox } = useOffline();
  const { 
    increaseFontSize, 
    decreaseFontSize, 
    fontSize, 
    highContrast, 
    toggleHighContrast, 
    lowBandwidth, 
    toggleLowBandwidth 
  } = useAccessibility();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const navItems = [
    { id: 'home', label: t.navHome, icon: '🏠' },
    { id: 'dashboard', label: t.navDashboard, icon: '📊' },
    { id: 'advisor', label: t.navAdvisor, icon: '🤖' },
    { id: 'disease', label: t.navDisease, icon: '🍃' },
    { id: 'community', label: t.navCommunity, icon: '👥' },
    { id: 'map', label: t.navMap, icon: '🗺️' },
    { id: 'sustainability', label: t.navSustainability, icon: '🌱' },
    { id: 'schemes', label: t.navSchemes, icon: '📜' },
    { id: 'marketplace', label: t.navMarketplace, icon: '🏪' },
    { id: 'admin', label: t.navAdmin, icon: '⚙️' }
  ];

  const handleSyncClick = async () => {
    setIsSyncing(true);
    await syncOutbox();
    setIsSyncing(false);
  };

  const roles: { id: UserRole; label: string; icon: string }[] = [
    { id: 'farmer', label: 'Farmer (शेतकरी)', icon: '👨‍🌾' },
    { id: 'expert', label: 'KVK Agronomist (कृषी शास्त्रज्ञ)', icon: '🔬' },
    { id: 'moderator', label: 'Community Moderator', icon: '🛡️' },
    { id: 'admin', label: 'Decentralized Node Admin', icon: '⚙️' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1b4332] text-white shadow-md border-b border-[#2d6a4f]">
      {/* Top utility bar: Connectivity, Language, Accessibility */}
      <div className="bg-[#143326] px-4 py-1.5 text-xs flex flex-wrap items-center justify-between border-b border-[#1b4332]/60">
        <div className="flex items-center gap-3">
          {/* Online / Offline Status Indicator */}
          <button
            onClick={toggleSimulatedOffline}
            title="Click to toggle simulated offline mode for field testing"
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium transition-colors ${
              isOnline
                ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600'
                : 'bg-amber-900/90 text-amber-200 border border-amber-500 animate-pulse'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span>{isOnline ? t.statusOnline : t.statusOffline}</span>
          </button>

          {/* Outbox Sync Pill */}
          {outbox.length > 0 && (
            <button
              onClick={handleSyncClick}
              disabled={!isOnline || isSyncing}
              className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-2 py-0.5 rounded-full transition-transform active:scale-95 disabled:opacity-50"
            >
              <span>📤</span>
              <span>{isSyncing ? 'Syncing...' : `${outbox.length} Queued (${t.syncNow})`}</span>
            </button>
          )}

          {/* Low Bandwidth Mode Badge */}
          {lowBandwidth && (
            <span className="hidden sm:inline-block bg-teal-800 text-teal-200 px-2 py-0.5 rounded">
              ⚡ {t.lowBandwidth}
            </span>
          )}
        </div>

        {/* Right side utilities: Accessibility & Language */}
        <div className="flex items-center gap-3">
          {/* Font size adjustments */}
          <div className="flex items-center bg-[#1b4332] rounded border border-[#2d6a4f] overflow-hidden">
            <button
              onClick={decreaseFontSize}
              title="Decrease Font Size"
              className="px-1.5 py-0.5 hover:bg-[#2d6a4f] text-stone-300 font-bold"
            >
              A-
            </button>
            <span className="px-1.5 py-0.5 text-[10px] text-stone-400 font-mono">
              {fontSize === 'normal' ? '100%' : fontSize === 'large' ? '115%' : '130%'}
            </span>
            <button
              onClick={increaseFontSize}
              title="Increase Font Size"
              className="px-1.5 py-0.5 hover:bg-[#2d6a4f] text-stone-300 font-bold"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            title="Toggle High Contrast Mode"
            className={`px-2 py-0.5 rounded text-xs border ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-500 font-bold'
                : 'border-stone-600 text-stone-300 hover:bg-[#2d6a4f]'
            }`}
          >
            ◐ {t.highContrast}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-[#1b4332] rounded border border-[#2d6a4f] overflow-hidden">
            {(['mr', 'hi', 'en'] as SupportedLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 text-xs font-semibold transition-colors ${
                  language === lang
                    ? 'bg-[#52b788] text-stone-950 shadow'
                    : 'text-stone-300 hover:bg-[#2d6a4f]'
                }`}
              >
                {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिन्दी' : 'EN'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand Logo & Name */}
        <div
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#52b788] to-[#74c69d] flex items-center justify-center text-stone-950 font-bold text-2xl shadow-lg transform group-hover:scale-105 transition-transform">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                {t.brandName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-[#52b788] text-stone-950 px-1.5 py-0.5 rounded-full">
                AgroNet
              </span>
            </div>
            <p className="text-[11px] text-emerald-200 hidden sm:block tracking-wide">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#2d6a4f] text-[#95d5b2] shadow-inner font-semibold'
                    : 'text-stone-200 hover:bg-[#2d6a4f]/50 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action buttons: KrishiVoice CTA & Profile/Role Switcher */}
        <div className="flex items-center gap-2.5">
          {/* KrishiVoice CTA Button */}
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-[#52b788] hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            <span className="text-base animate-pulse">🎙️</span>
            <span className="hidden sm:inline">{t.ctaVoice}</span>
            <span className="sm:hidden">Voice</span>
          </button>

          {/* Role Switcher Pill & Profile */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 bg-[#2d6a4f] hover:bg-[#40916c] px-3 py-1.5 rounded-xl text-xs text-white border border-[#52b788]/40 transition-colors"
            >
              <span className="text-base">{user.avatar || '👨‍🌾'}</span>
              <div className="text-left hidden md:block">
                <p className="font-semibold text-white leading-none truncate max-w-[100px]">
                  {user.name}
                </p>
                <span className="text-[10px] text-emerald-300 capitalize">
                  {user.role}
                </span>
              </div>
              <span className="text-stone-300 text-[10px]">▼</span>
            </button>

            {/* Dropdown Menu for Roles */}
            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-stone-100">
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Logged in as
                  </p>
                  <p className="font-bold text-stone-900 text-sm">{user.name}</p>
                  <p className="text-xs text-stone-500">{user.village}, {user.district}</p>
                </div>

                <div className="py-1">
                  <p className="text-[10px] font-bold text-stone-400 px-3 py-1 uppercase tracking-wider">
                    Switch Active Persona (Demo)
                  </p>
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        switchRole(r.id);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center justify-between transition-colors ${
                        user.role === r.id
                          ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                          : 'hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{r.icon}</span>
                        <span>{r.label}</span>
                      </span>
                      {user.role === r.id && <span>✓</span>}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <button
                    onClick={() => {
                      setCurrentPage('profile');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-center text-xs py-1.5 text-emerald-800 font-semibold hover:bg-emerald-50 rounded-lg"
                  >
                    Manage Profile & Farms →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-200 hover:text-white rounded-lg hover:bg-[#2d6a4f]"
            aria-label="Open Navigation Menu"
          >
            <span className="text-2xl leading-none">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#143326] border-t border-[#2d6a4f] px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 ${
                currentPage === item.id
                  ? 'bg-[#2d6a4f] text-[#74c69d] font-bold'
                  : 'text-stone-200 hover:bg-[#1b4332]'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
