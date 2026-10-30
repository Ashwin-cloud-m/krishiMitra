import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';
import { INITIAL_CROP_ALERTS } from '../data/demoData';
import { CropAlert, AlertCategory, AlertSeverity } from '../types';
import { DisclaimerBanner } from '../components/Common/DisclaimerBanner';

export const CropAlertMapPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { isOnline, addToOutbox } = useOffline();

  const [alerts, setAlerts] = useState<CropAlert[]>(INITIAL_CROP_ALERTS);
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedAlert, setSelectedAlert] = useState<CropAlert | null>(INITIAL_CROP_ALERTS[0]);

  // Report Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [newAlertTitle, setNewAlertTitle] = useState('');
  const [newAlertCategory, setNewAlertCategory] = useState<AlertCategory>('pest');
  const [newAlertCrop, setNewAlertCrop] = useState('Cotton');
  const [newAlertTaluka, setNewAlertTaluka] = useState('Dindori');
  const [newAlertSeverity, setNewAlertSeverity] = useState<AlertSeverity>('high');
  const [newAlertDesc, setNewAlertDesc] = useState('');

  const filteredAlerts = alerts.filter((a) => {
    if (selectedCrop !== 'All' && !a.crop.toLowerCase().includes(selectedCrop.toLowerCase())) return false;
    if (selectedSeverity !== 'All' && a.severity !== selectedSeverity) return false;
    return true;
  });

  const handleVerifyAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId ? { ...a, verifiedFarmersCount: a.verifiedFarmersCount + 1 } : a
      )
    );
  };

  const handleCreateAlert = () => {
    if (!newAlertTitle.trim() || !newAlertDesc.trim()) return;

    const newAlert: CropAlert = {
      id: 'alert_' + Date.now(),
      title: newAlertTitle,
      category: newAlertCategory,
      crop: newAlertCrop,
      district: user.district || 'Nashik',
      taluka: newAlertTaluka,
      approximateRadiusKm: 5.5,
      severity: newAlertSeverity,
      verifiedFarmersCount: 1,
      verifiedByExpert: user.role === 'expert',
      reportedAt: 'Just now',
      description: newAlertDesc,
      lat: 20.15 + (Math.random() - 0.5) * 0.2,
      lng: 73.9 + (Math.random() - 0.5) * 0.2,
      isDemo: true
    };

    if (!isOnline) {
      addToOutbox({
        type: 'alert_report',
        payload: newAlert,
        title: newAlertTitle
      });
      alert('Alert queued in Outbox! Will broadcast to peer radar when connectivity returns.');
    } else {
      setAlerts([newAlert, ...alerts]);
      setSelectedAlert(newAlert);
    }

    setNewAlertTitle('');
    setNewAlertDesc('');
    setIsReportModalOpen(false);
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-[#2d6a4f]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🗺️</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {t.alertMapTitle}
              </h1>
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                Early Warning Radar
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1 max-w-2xl">
              {t.alertMapSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>🚨</span>
              <span>{t.reportAlert}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Sample notice & Privacy explanation */}
        <DisclaimerBanner type="demo" customText="Sample Agricultural Radar Data: To protect farmer privacy, exact GPS coordinates are masked into approximate 5km taluka clusters. Community verification prevents panic." />

        {/* Filters */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-stone-200 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-stone-500">{t.filterByCrop}:</span>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-1 text-xs font-semibold"
              >
                <option value="All">{t.allCrops}</option>
                <option value="Cotton">Cotton (कापूस)</option>
                <option value="Maize">Maize (मका)</option>
                <option value="Tomato">Tomato / Grapes</option>
                <option value="Sugarcane">Sugarcane</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-stone-500">{t.filterBySeverity}:</span>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-1 text-xs font-semibold"
              >
                <option value="All">{t.allSeverities}</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-stone-600 font-medium">
              {filteredAlerts.length} Active Regional Alerts
            </span>
          </div>
        </div>

        {/* Map Grid Layout: Interactive Visual Radar (7 cols) + Selected Alert Detail (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Map Visualizer Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#1b4332] text-white rounded-3xl p-6 shadow-xl border-4 border-[#2d6a4f] relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Radar Grid Graphic */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#52b788" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Radar Sweep Animation Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-emerald-500/20 pointer-events-none animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-emerald-500/30 pointer-events-none" />

            {/* Top map controls */}
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold tracking-widest uppercase bg-[#2d6a4f] text-emerald-300 px-2 py-0.5 rounded">
                  Maharashtra & Central AgroNet Cluster
                </span>
                <p className="text-xs text-emerald-100 font-semibold mt-1">
                  Nashik • Ahmednagar • Indore Regional Grid
                </p>
              </div>
              <div className="bg-[#143326] px-3 py-1 rounded-xl text-[10px] text-emerald-300 border border-emerald-600/40">
                🔒 Privacy: ~5km Taluka Masking
              </div>
            </div>

            {/* Interactive Cluster Nodes */}
            <div className="relative z-10 my-10 min-h-[260px] flex items-center justify-around flex-wrap gap-4">
              {filteredAlerts.map((alert, idx) => {
                const isSelected = selectedAlert?.id === alert.id;
                const isCritical = alert.severity === 'critical';
                const isHigh = alert.severity === 'high';

                return (
                  <button
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`group relative p-3 rounded-2xl backdrop-blur-md border text-left transition-all transform hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'bg-white text-stone-900 border-white shadow-2xl ring-4 ring-emerald-400'
                        : 'bg-[#24523e]/90 text-white border-emerald-500/50 hover:bg-[#2d6a4f]'
                    }`}
                  >
                    {/* Pulsing indicator */}
                    <span
                      className={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full ${
                        isCritical
                          ? 'bg-red-500 animate-ping'
                          : isHigh
                          ? 'bg-orange-500'
                          : 'bg-yellow-400'
                      }`}
                    />

                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">
                        {alert.category === 'pest' ? '🐛' : alert.category === 'disease' ? '🍄' : '💧'}
                      </span>
                      <div>
                        <p className="text-xs font-bold leading-none truncate max-w-[130px]">
                          {alert.taluka}
                        </p>
                        <span className={`text-[9px] font-bold uppercase ${
                          isSelected ? 'text-stone-500' : 'text-emerald-300'
                        }`}>
                          {alert.crop}
                        </span>
                      </div>
                    </div>

                    <p className={`text-[10px] truncate max-w-[150px] ${
                      isSelected ? 'text-stone-700' : 'text-stone-200'
                    }`}>
                      {alert.title}
                    </p>

                    <div className="mt-1.5 pt-1 border-t border-stone-200/40 flex items-center justify-between text-[9px]">
                      <span>~{alert.approximateRadiusKm}km radius</span>
                      <span className="font-bold">👥 {alert.verifiedFarmersCount}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Legend */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-emerald-800/60 text-[11px] text-emerald-200">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Critical
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> High
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> Medium
                </span>
              </div>
              <span>Click any marker to inspect remediation</span>
            </div>

          </div>

          {/* Selected Alert Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between">
            {selectedAlert ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        selectedAlert.severity === 'critical'
                          ? 'bg-red-100 text-red-900 border border-red-300'
                          : selectedAlert.severity === 'high'
                          ? 'bg-orange-100 text-orange-900 border border-orange-300'
                          : 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                      }`}>
                        {selectedAlert.severity} Severity
                      </span>
                      <span className="text-xs font-bold text-stone-500 uppercase">
                        {selectedAlert.crop}
                      </span>
                    </div>
                    <h3 className="font-black text-stone-900 text-base leading-snug">
                      {selectedAlert.title}
                    </h3>
                  </div>
                  <span className="text-3xl">
                    {selectedAlert.category === 'pest' ? '🐛' : selectedAlert.category === 'disease' ? '🍄' : '💧'}
                  </span>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-xs space-y-1">
                  <p className="flex justify-between">
                    <span className="text-stone-500">Location:</span>
                    <span className="font-bold text-stone-900">{selectedAlert.taluka}, {selectedAlert.district}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-stone-500">Reported:</span>
                    <span className="font-semibold text-stone-700">{selectedAlert.reportedAt}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-stone-500">Privacy Radius:</span>
                    <span className="font-semibold text-stone-700">Approx. {selectedAlert.approximateRadiusKm} km coverage</span>
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Field Description & Threat Assessment:
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed bg-amber-50/50 p-3 rounded-2xl border border-amber-200">
                    {selectedAlert.description}
                  </p>
                </div>

                {/* Verification Status */}
                <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-emerald-950">
                      Community Verification Status
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      {selectedAlert.verifiedFarmersCount} local farmers verified • {selectedAlert.verifiedByExpert ? '✓ Verified by KVK Scientist' : 'Awaiting agronomist review'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleVerifyAlert(selectedAlert.id)}
                    className="px-3 py-1.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 ml-2"
                  >
                    + I Observe This Too
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-stone-400">
                <span>Select a marker on the radar to view detailed advisories</span>
              </div>
            )}

            <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Protecting {user.district} crops</span>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="font-bold text-red-600 hover:text-red-700"
              >
                + Broadcast New Outbreak
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-red-500">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <span>🚨</span> Report Field Outbreak or Water Crisis
              </h3>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['pest', 'disease', 'weather', 'water'] as AlertCategory[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewAlertCategory(cat)}
                      className={`p-2 rounded-xl text-center capitalize font-bold border transition-colors ${
                        newAlertCategory === cat
                          ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Target Crop</label>
                  <input
                    type="text"
                    value={newAlertCrop}
                    onChange={(e) => setNewAlertCrop(e.target.value)}
                    placeholder="e.g. Cotton, Soybean"
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Taluka / Tehsil</label>
                  <input
                    type="text"
                    value={newAlertTaluka}
                    onChange={(e) => setNewAlertTaluka(e.target.value)}
                    placeholder="e.g. Dindori, Niphad"
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Alert Title</label>
                <input
                  type="text"
                  value={newAlertTitle}
                  onChange={(e) => setNewAlertTitle(e.target.value)}
                  placeholder="e.g. Yellow Rust patches spreading in early wheat"
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Field Symptoms & Details</label>
                <textarea
                  rows={3}
                  value={newAlertDesc}
                  onChange={(e) => setNewAlertDesc(e.target.value)}
                  placeholder="Describe severity, approximate acreage affected, and any initial remedies tried..."
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-normal leading-relaxed"
                />
              </div>

              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                🔒 <strong>Farmer Privacy:</strong> Your exact GPS coordinates will be converted to a general 5km radius cluster on the map.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 text-stone-600 font-bold hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAlert}
                  disabled={!newAlertTitle.trim() || !newAlertDesc.trim()}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl disabled:opacity-40 shadow transition-colors"
                >
                  Broadcast Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
