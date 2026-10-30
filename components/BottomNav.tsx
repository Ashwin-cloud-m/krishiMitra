import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface BottomNavProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onOpenVoice: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage, onOpenVoice }) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'home', label: t.navHome, icon: '🏠' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'voice', label: 'Voice', icon: '🎙️', isAction: true },
    { id: 'disease', label: 'Scan', icon: '🍃' },
    { id: 'community', label: 'Forum', icon: '👥' }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-2xl px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          if (tab.isAction) {
            return (
              <button
                key={tab.id}
                onClick={onOpenVoice}
                className="-mt-5 flex flex-col items-center group focus:outline-none"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#1b4332] to-[#40916c] text-white p-3 shadow-xl border-4 border-white flex items-center justify-center transform group-hover:scale-105 group-active:scale-95 transition-transform">
                  <span className="text-xl">🎙️</span>
                </div>
                <span className="text-[10px] font-bold text-[#1b4332] mt-0.5">
                  Voice
                </span>
              </button>
            );
          }

          const isActive = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentPage(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
                isActive
                  ? 'text-[#2d6a4f] font-bold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
