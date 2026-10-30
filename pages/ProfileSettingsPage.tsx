import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { SupportedLanguage } from '../types';

export const ProfileSettingsPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, updateProfile } = useAuth();
  const { isOnline, outbox, syncOutbox, clearOutbox, lastSyncedAt } = useOffline();
  const { 
    fontSize, 
    setFontSize, 
    highContrast, 
    toggleHighContrast, 
    lowBandwidth, 
    toggleLowBandwidth 
  } = useAccessibility();

  const [name, setName] = useState(user.name);
  const [village, setVillage] = useState(user.village);
  const [district, setDistrict] = useState(user.district);
  const [state, setState] = useState(user.state);
  const [landSizeAcre, setLandSizeAcre] = useState(user.landSizeAcre);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      village,
      district,
      state,
      landSizeAcre: Number(landSizeAcre)
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSyncOutbox = async () => {
    setIsSyncing(true);
    await syncOutbox();
    setIsSyncing(false);
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-[#2d6a4f]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{user.avatar || '👨‍🌾'}</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {t.navProfile} & Settings
              </h1>
            </div>
            <p className="text-xs text-emerald-200 mt-1">
              Manage your agricultural plot telemetry, offline sync queue, and regional language preferences.
            </p>
          </div>

          <span className="bg-emerald-500 text-stone-950 text-xs font-bold px-3 py-1 rounded-full uppercase">
            {user.role}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {savedSuccess && (
          <div className="bg-emerald-50 text-emerald-900 border border-emerald-300 p-3 rounded-2xl text-xs font-bold flex items-center gap-2">
            <span>✓</span> Profile and farm records successfully updated.
          </div>
        )}

        {/* Farm & Personal Information Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
          <h3 className="text-base font-extrabold text-[#1b4332] mb-4 flex items-center gap-2">
            <span>🌾</span> Farm & Plot Particulars
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Farmer Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Land Holding (Acres)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={landSizeAcre}
                  onChange={(e) => setLandSizeAcre(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Village
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  District
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold rounded-xl shadow transition-colors"
              >
                Save Farm Profile
              </button>
            </div>
          </form>
        </div>

        {/* Offline Outbox & Sync Manager */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#1b4332] flex items-center gap-2">
                <span>📤</span> PWA Offline Outbox Queue
              </h3>
              <p className="text-xs text-stone-500">
                Posts and pest alerts submitted while offline are queued locally in browser storage.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSyncOutbox}
                disabled={outbox.length === 0 || !isOnline || isSyncing}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40 transition-colors"
              >
                {isSyncing ? 'Syncing...' : 'Sync All Queued Now'}
              </button>

              {outbox.length > 0 && (
                <button
                  onClick={clearOutbox}
                  className="px-3 py-2 text-stone-500 hover:text-red-600 font-bold text-xs"
                >
                  Clear Queue
                </button>
              )}
            </div>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-stone-600">Pending Outbox Items:</span>
              <span className="font-black text-stone-900">{outbox.length} Items</span>
            </div>
            <div className="flex justify-between items-center text-stone-500 text-[11px]">
              <span>Last Background Sync:</span>
              <span>{lastSyncedAt}</span>
            </div>

            {outbox.length > 0 && (
              <div className="mt-3 pt-3 border-t border-stone-200 space-y-2">
                {outbox.map((item) => (
                  <div key={item.id} className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-stone-800">{item.title}</span>
                      <span className="text-[10px] text-stone-400 block">{item.type} • {item.createdAt}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      Queued
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Accessibility & Language Preferences */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
          <h3 className="text-base font-extrabold text-[#1b4332] mb-4 flex items-center gap-2">
            <span>⚙️</span> Accessibility & Field Usability Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            
            {/* Language */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-2">Preferred Language</label>
              <div className="space-y-1.5">
                {[
                  { code: 'mr', label: 'मराठी (Marathi)' },
                  { code: 'hi', label: 'हिन्दी (Hindi)' },
                  { code: 'en', label: 'English' }
                ].map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code as SupportedLanguage)}
                    className={`w-full text-left p-2 rounded-xl border text-xs font-semibold ${
                      language === l.code
                        ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-2">Text Scale</label>
              <div className="space-y-1.5">
                {[
                  { id: 'normal', label: 'Standard (100%)' },
                  { id: 'large', label: 'Large (115% - Field readable)' },
                  { id: 'xlarge', label: 'Extra Large (130%)' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFontSize(s.id as any)}
                    className={`w-full text-left p-2 rounded-xl border text-xs font-semibold ${
                      fontSize === s.id
                        ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast & Low Bandwidth */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div>
                <label className="font-bold text-stone-800 block mb-2">Field Display Modes</label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={toggleHighContrast}
                    className={`w-full p-2.5 rounded-xl border text-left font-bold ${
                      highContrast
                        ? 'bg-yellow-400 text-black border-yellow-500'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    {highContrast ? '✓ High Contrast Enabled' : 'Enable High Contrast'}
                  </button>

                  <button
                    type="button"
                    onClick={toggleLowBandwidth}
                    className={`w-full p-2.5 rounded-xl border text-left font-bold ${
                      lowBandwidth
                        ? 'bg-teal-700 text-white border-teal-800'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    {lowBandwidth ? '✓ Low Bandwidth Mode Active' : 'Enable 2G/3G Low Data'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
