import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC<{ setCurrentPage: (p: string) => void }> = ({ setCurrentPage }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#143326] text-stone-300 pt-12 pb-24 lg:pb-12 border-t-4 border-[#2d6a4f] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: About & Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="text-xl font-bold text-white tracking-tight">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Decentralized agricultural knowledge network engineered for Indian rural farming communities. Combining edge computer vision, local weather telematics, and peer-to-peer agronomic verification.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span>🔒 Cryptographically Signed AgroNodes</span>
            </div>
          </div>

          {/* Col 2: Core Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Farming Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('advisor')} className="hover:text-emerald-400 transition-colors">
                  🤖 AI Farm Advisor (कृषी सल्लागार)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('disease')} className="hover:text-emerald-400 transition-colors">
                  🍃 Leaf Disease Scanner (रोग निदान)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('map')} className="hover:text-emerald-400 transition-colors">
                  🗺️ Crop Outbreak Alert Map
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('sustainability')} className="hover:text-emerald-400 transition-colors">
                  🌱 Soil Health & Carbon Scorecard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('community')} className="hover:text-emerald-400 transition-colors">
                  👥 Decentralized Farmer Network
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Schemes & Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Schemes & APMC
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('schemes')} className="hover:text-emerald-400 transition-colors">
                  📜 PM-Kisan Samman Nidhi
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('schemes')} className="hover:text-emerald-400 transition-colors">
                  🛡️ Pradhan Mantri Fasal Bima (PMFBY)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('marketplace')} className="hover:text-emerald-400 transition-colors">
                  🏪 APMC Mandi Daily Rates (लासलगाव, नाशिक)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('marketplace')} className="hover:text-emerald-400 transition-colors">
                  🚜 Custom Hiring Centers & Agro Drones
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Agricultural University & KVK Helplines */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Agronomy Support
            </h4>
            <p className="text-xs text-stone-300 mb-2">
              Need immediate emergency crop consultation? Contact your regional Krishi Vigyan Kendra:
            </p>
            <div className="bg-[#1b4332] p-3 rounded-xl border border-[#2d6a4f] text-xs space-y-1">
              <p className="font-semibold text-emerald-300">KVK Pimpalgaon & MPKV Rahuri</p>
              <p className="text-stone-300">Toll-Free Kisan Call Centre: <strong className="text-white">1800-180-1551</strong></p>
              <p className="text-stone-300">KVK Emergency Helpline: <strong className="text-white">+91 94231 87654</strong></p>
            </div>
          </div>

        </div>

        {/* Regulatory & Scientific Disclaimer */}
        <div className="pt-8 border-t border-[#1b4332] text-center text-xs text-stone-400 space-y-2">
          <p className="max-w-4xl mx-auto leading-relaxed text-[11px]">
            <strong>Important Agricultural Disclaimer:</strong> KrishiMitra AI is an educational and advisory platform. Crop pest diagnoses, weather forecasts, and soil health scores are generated using automated models and community observations. While developed in consultation with agricultural guidelines, field conditions vary significantly. Always verify pesticide dilutions and disease interventions with a certified agricultural extension officer or local KVK agronomist before application.
          </p>
          <p className="text-[10px] text-stone-500">
            © 2026 KrishiMitra AI • Smart Farming, Shared Knowledge • PWA Progressive Web App Ready
          </p>
        </div>
      </div>
    </footer>
  );
};
