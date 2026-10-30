import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { DisclaimerBanner } from '../components/Common/DisclaimerBanner';

interface LandingPageProps {
  setCurrentPage: (page: string) => void;
  onOpenVoice: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentPage, onOpenVoice }) => {
  const { t, language } = useLanguage();
  const [activePreviewTab, setActivePreviewTab] = useState<'spray' | 'alert' | 'soil'>('spray');

  return (
    <div className="bg-[#fdfbf7] text-stone-900 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-[#1b4332] via-[#24523e] to-[#1b4332] text-white">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#74c69d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#2d6a4f]/80 border border-[#52b788]/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>कृषि तंत्रज्ञान २०२६ • Rural Agritech Ecosystem</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
                {t.heroTitle}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-xl text-stone-200 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('advisor');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#52b788] to-[#40916c] hover:from-[#74c69d] hover:to-[#52b788] text-stone-950 font-extrabold text-base shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3"
                >
                  <span>🤖</span>
                  <span>{t.ctaGetAdvice}</span>
                  <span className="text-xl">→</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('community');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <span>👥</span>
                  <span>{t.ctaCommunity}</span>
                </button>

                <button
                  onClick={onOpenVoice}
                  className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 font-bold text-base border border-emerald-500/50 flex items-center justify-center gap-2 transition-all"
                >
                  <span className="animate-pulse">🎙️</span>
                  <span>{t.ctaVoice}</span>
                </button>
              </div>

              {/* Micro Trust Proof */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>3 Indian Languages (मराठी, हिन्दी, English)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Works In Offline Field Mode</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Verified by KVK Agronomists</span>
                </div>
              </div>

            </div>

            {/* Right Hero Column: Animated Agricultural Dashboard Preview */}
            <div className="lg:col-span-5">
              <div className="bg-[#fdfbf7] text-stone-900 rounded-3xl p-5 shadow-2xl border-4 border-[#2d6a4f] relative">
                
                {/* Header of Preview */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚜</span>
                    <div>
                      <h3 className="font-bold text-sm text-[#1b4332] leading-tight">
                        Live Agro-Sensor & AI Telematics
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Plot: Ramesh Patil • Pimpalgaon Baswant (Nashik)
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                    Live Demo
                  </span>
                </div>

                {/* Preview Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl mb-4 text-xs font-semibold">
                  <button
                    onClick={() => setActivePreviewTab('spray')}
                    className={`py-1.5 rounded-lg transition-all ${
                      activePreviewTab === 'spray'
                        ? 'bg-white text-[#1b4332] shadow font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Spraying Safe?
                  </button>
                  <button
                    onClick={() => setActivePreviewTab('alert')}
                    className={`py-1.5 rounded-lg transition-all ${
                      activePreviewTab === 'alert'
                        ? 'bg-white text-[#1b4332] shadow font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Pest Radar
                  </button>
                  <button
                    onClick={() => setActivePreviewTab('soil')}
                    className={`py-1.5 rounded-lg transition-all ${
                      activePreviewTab === 'soil'
                        ? 'bg-white text-[#1b4332] shadow font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Soil Score
                  </button>
                </div>

                {/* Tab 1: Spraying Window Preview */}
                {activePreviewTab === 'spray' && (
                  <div className="space-y-3">
                    <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
                          ✓
                        </div>
                        <div>
                          <p className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                            Optimal Spraying Window Active
                          </p>
                          <p className="text-xs text-emerald-800">
                            7:00 AM – 10:30 AM (Wind: 6.8 km/h • Rain: 10%)
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-200 px-2 py-1 rounded-lg">
                        Low Drift
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
                        <span className="text-stone-500 block text-[10px]">Temperature</span>
                        <span className="font-bold text-stone-900 text-sm">28.5°C</span>
                      </div>
                      <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
                        <span className="text-stone-500 block text-[10px]">Humidity</span>
                        <span className="font-bold text-stone-900 text-sm">64% RH</span>
                      </div>
                      <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
                        <span className="text-stone-500 block text-[10px]">Leaf Wetness</span>
                        <span className="font-bold text-stone-900 text-sm">Dry (Safe)</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-600 bg-amber-50 p-2 rounded-xl border border-amber-200">
                      💡 <strong>AI Agronomist Note:</strong> Drizzle forecasted for Sunday evening. Complete foliar fertilizer application before Saturday noon.
                    </p>
                  </div>
                )}

                {/* Tab 2: Pest Radar Preview */}
                {activePreviewTab === 'alert' && (
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 p-3 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🐛</span>
                        <div>
                          <p className="text-xs font-bold text-red-900">
                            Pink Bollworm Alert (Dindori Border)
                          </p>
                          <p className="text-[11px] text-red-700">
                            5.4 km from your farm • 8 farmers verified
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-red-600 text-white px-2 py-0.5 rounded-full">
                        High Risk
                      </span>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs text-stone-700">
                      <p className="font-semibold text-stone-900">Suggested Action:</p>
                      <p className="text-[11px] text-stone-600 mt-1">
                        Check your pheromone traps immediately. If trap catch exceeds 8 moths/night, deploy Trichogramma egg parasitoids.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 3: Soil Score Preview */}
                {activePreviewTab === 'soil' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-[#1b4332] text-white p-3.5 rounded-2xl">
                      <div>
                        <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                          Sustainability Index
                        </p>
                        <p className="text-2xl font-black text-white">74 / 100</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold bg-[#52b788] text-stone-950 px-2.5 py-1 rounded-full">
                          Grade A- (Good)
                        </span>
                        <p className="text-[10px] text-emerald-200 mt-1">₹4,850/acre saved</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-stone-600">
                        <span>Organic Carbon Retention</span>
                        <span className="font-bold text-stone-900">0.58% (Medium)</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#52b788] h-full rounded-full" style={{ width: '64%' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action button inside preview */}
                <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    Kharif 2026 Telematics Node
                  </span>
                  <button
                    onClick={() => {
                      setCurrentPage('dashboard');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#1b4332] hover:text-[#2d6a4f] flex items-center gap-1"
                  >
                    <span>Open Full Dashboard</span>
                    <span>→</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Demo Notice Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <DisclaimerBanner type="demo" customText="KrishiMitra AI startup showcase demo. Sensor telematics, satellite pest alerts, and mandi market prices use realistic agricultural sample feeds." />
      </div>

      {/* How the Platform Works in Three Steps */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2d6a4f] bg-emerald-100 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1b4332] mt-3">
            How KrishiMitra AI Works for Every Farmer
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            No complicated technical training needed. Designed for outdoor field operation on any smartphone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200 hover:border-[#52b788] transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#1b4332] flex items-center justify-center text-2xl font-black mb-5 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              Speak or Snap a Photo
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Press the KrishiVoice microphone to speak your question in Marathi, Hindi, or English. Or capture a photo of an affected crop leaf.
            </p>
            <div className="mt-4 text-xs font-semibold text-[#2d6a4f] flex items-center gap-1">
              <span>Supports low bandwidth</span>
              <span>•</span>
              <span>Offline queue</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200 hover:border-[#52b788] transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-[#1b4332] flex items-center justify-center text-2xl font-black mb-5 group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              AI & Agronomist Triangulation
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Our agricultural AI cross-references your crop stage, soil type, and local weather. High-risk pest diagnoses are reviewed by verified KVK agronomists.
            </p>
            <div className="mt-4 text-xs font-semibold text-[#2d6a4f] flex items-center gap-1">
              <span>Uncertainty calibrated</span>
              <span>•</span>
              <span>Zero hallucinations</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200 hover:border-[#52b788] transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-[#1b4332] flex items-center justify-center text-2xl font-black mb-5 group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              Act, Track & Share with Community
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Get exact organic or chemical remedies with safe dilution rates. Broadcast verified pest outbreak alerts to protect fellow village farmers.
            </p>
            <div className="mt-4 text-xs font-semibold text-[#2d6a4f] flex items-center gap-1">
              <span>Cryptographically signed</span>
              <span>•</span>
              <span>Shared knowledge</span>
            </div>
          </div>

        </div>
      </section>

      {/* Key Feature Cards Grid */}
      <section className="py-16 bg-[#f7f4ea] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2d6a4f] bg-emerald-100 px-3 py-1 rounded-full">
              Full Spectrum Agricultural Intelligence
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1b4332] mt-3">
              Built Specifically for Rural Farming Realities
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              A comprehensive toolkit bringing the scientific power of agricultural universities directly to your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1: KrishiVoice */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🎙️</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                KrishiVoice (कृषीवाणी)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Multilingual speech-to-text and natural voice output in Marathi, Hindi, and English. Large touch targets and high audio volume for outdoor sunny fields.
              </p>
              <button
                onClick={onOpenVoice}
                className="text-xs font-bold text-[#2d6a4f] hover:underline flex items-center gap-1"
              >
                <span>Try Voice Assistant</span>
                <span>→</span>
              </button>
            </div>

            {/* Feature 2: Leaf Disease Scanner */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🍃</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Leaf Disease Diagnostic Scanner
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Instant computer vision analysis of leaf spots, blights, and caterpillar chewing. Delivers organic biocontrol and controlled chemical dosages.
              </p>
              <button
                onClick={() => {
                  setCurrentPage('disease');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#2d6a4f] hover:underline flex items-center gap-1"
              >
                <span>Scan Affected Leaf</span>
                <span>→</span>
              </button>
            </div>

            {/* Feature 3: Community Crop Alert Map */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🗺️</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Community Crop Alert Radar
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                District-level map tracking Fall Armyworm, Pink Bollworm, downy mildew, and canal water shortages. Protects farmer GPS privacy with cluster radii.
              </p>
              <button
                onClick={() => {
                  setCurrentPage('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#2d6a4f] hover:underline flex items-center gap-1"
              >
                <span>View Outbreak Map</span>
                <span>→</span>
              </button>
            </div>

            {/* Feature 4: Decentralized Knowledge Network */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Decentralized Peer Network
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Farmer questions and answers cryptographically signed with SHA-256 hashes. Verified answers from KVK agronomists are replicated across local FPO nodes.
              </p>
              <button
                onClick={() => {
                  setCurrentPage('community');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#2d6a4f] hover:underline flex items-center gap-1"
              >
                <span>Browse Community Forum</span>
                <span>→</span>
              </button>
            </div>

            {/* Feature 5: Soil & Sustainability Scorecard */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🌱</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Soil Health & Carbon Scorecard
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Educational sustainability scorecard evaluating organic carbon, drip efficiency, and IPM practices. Estimates annual input cost savings per acre.
              </p>
              <button
                onClick={() => {
                  setCurrentPage('sustainability');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#2d6a4f] hover:underline flex items-center gap-1"
              >
                <span>Calculate Soil Score</span>
                <span>→</span>
              </button>
            </div>

            {/* Feature 6: Govt Schemes & Mandi Rates */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">📜</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Verified Schemes & APMC Mandi
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Interactive eligibility check for PM-Kisan, PMFBY, and drip irrigation subsidies. Daily APMC mandi rates for soybean, onion, cotton, and wheat.
              </p>
              <button
                onClick={() => {
                  setCurrentPage('schemes');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#2d6a4f] hover:underline flex items-center gap-1"
              >
                <span>Check Eligibility</span>
                <span>→</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits for Small and Marginal Farmers */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1b4332] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#2d6a4f]">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full">
              Social Impact & Farmer Economics
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-6">
              Empowering Small & Marginal Farmers Across India
            </h2>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed mb-8">
              Over 86% of Indian farmers cultivate less than 2 hectares of land. Commercial agritech often overlooks their unique literacy, capital, and language constraints. KrishiMitra AI is specifically architected to level the playing field:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#24523e] p-5 rounded-2xl border border-white/10">
              <span className="text-2xl mb-2 block">📉</span>
              <h4 className="font-bold text-white text-sm mb-1">
                25-30% Cost Reduction
              </h4>
              <p className="text-xs text-emerald-100">
                Preventing over-application of costly chemical fertilizers like DAP and unnecessary preventative sprays.
              </p>
            </div>

            <div className="bg-[#24523e] p-5 rounded-2xl border border-white/10">
              <span className="text-2xl mb-2 block">💧</span>
              <h4 className="font-bold text-white text-sm mb-1">
                35% Water Savings
              </h4>
              <p className="text-xs text-emerald-100">
                Weather-calibrated micro-irrigation scheduling prevents overwatering and preserves groundwater tables.
              </p>
            </div>

            <div className="bg-[#24523e] p-5 rounded-2xl border border-white/10">
              <span className="text-2xl mb-2 block">🛡️</span>
              <h4 className="font-bold text-white text-sm mb-1">
                Zero Crop Blind Spots
              </h4>
              <p className="text-xs text-emerald-100">
                Early community warning alerts allow timely containment before regional epidemic outbreaks.
              </p>
            </div>

            <div className="bg-[#24523e] p-5 rounded-2xl border border-white/10">
              <span className="text-2xl mb-2 block">🌐</span>
              <h4 className="font-bold text-white text-sm mb-1">
                Mother Tongue Access
              </h4>
              <p className="text-xs text-emerald-100">
                Voice-first interface in Marathi, Hindi, and English removes all digital literacy hurdles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Success Stories (Labeled as Illustrative Examples) */}
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2">
                <span>⚠️</span>
                <span>Illustrative Demonstration Case Studies (Subject to Field Verification)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332]">
                Voices from the Agricultural Frontier
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentPage('community');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-4 sm:mt-0 text-sm font-bold text-[#2d6a4f] hover:underline"
            >
              Read More Community Stories →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Story 1 */}
            <div className="bg-[#fdfbf7] p-6 rounded-3xl border border-stone-200 shadow-sm relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">👨‍🌾</span>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    Balasaheb Shinde
                  </h4>
                  <p className="text-xs text-stone-500">
                    Soybean & Onion Farmer • Vinchur, Nashik
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed mb-4">
                "When my 35-day soybean leaves started yellowing, I was about to buy ₹3,200 worth of chemical fungicide. Dr. Deshmukh and KrishiMitra's diagnosis showed it was just temporary waterlogging. A simple foliar spray saved my crop and my wallet."
              </p>
              <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Saved ₹3,200 on chemical inputs
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-[#fdfbf7] p-6 rounded-3xl border border-stone-200 shadow-sm relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🚜</span>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    Harpreet Singh
                  </h4>
                  <p className="text-xs text-stone-500">
                    Wheat & Paddy Farmer • Samrala, Ludhiana
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed mb-4">
                "We avoided stubble burning completely across our 12 acres by adopting the Super Seeder practice shared on KrishiMitra's node. Our soil moisture stayed high and fuel expense fell by ₹1,400 per acre."
              </p>
              <div className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg">
                Zero-till stubble retention success
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-[#fdfbf7] p-6 rounded-3xl border border-stone-200 shadow-sm relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🔬</span>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    Dr. Sunita Deshmukh
                  </h4>
                  <p className="text-xs text-stone-500">
                    Senior Agronomist • KVK Pimpalgaon Centre
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed mb-4">
                "As agricultural extension scientists, reaching thousands of scattered villages was our biggest barrier. KrishiMitra's alert radar allows us to detect pink bollworm clusters early and coordinate community bio-parasitoid releases."
              </p>
              <div className="text-[11px] font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg">
                Coordinated KVK outbreak response
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Call to Action: Join the Farming Community */}
      <section className="py-16 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-3xl">🌾</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to Transform Your Farm with Shared Knowledge?
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join thousands of progressive farmers, Krishi Vigyan Kendra scientists, and village peers. Free, open, and available in your mother tongue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentPage('community');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#52b788] hover:bg-[#74c69d] text-stone-950 font-extrabold text-base shadow-xl transition-all"
            >
              Join Farmer Community Free
            </button>
            <button
              onClick={() => {
                setCurrentPage('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition-all"
            >
              Open Farmer Dashboard
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
