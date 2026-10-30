import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBanner } from '../components/Common/DisclaimerBanner';
import { 
  DEMO_WEATHER, 
  DEMO_SOIL_HEALTH, 
  INITIAL_COMMUNITY_POSTS, 
  INITIAL_CROP_ALERTS 
} from '../data/demoData';

interface FarmerDashboardProps {
  setCurrentPage: (page: string) => void;
  onOpenVoice: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ setCurrentPage, onOpenVoice }) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [selectedCrop, setSelectedCrop] = useState<string>(user.primaryCrops[0] || 'Soybean');
  const [selectedStage, setSelectedStage] = useState<string>('Pod Development (शेंगा भरण्याची अवस्था)');

  const cropStages: Record<string, string[]> = {
    Soybean: [
      'Germination & Emergence (०-१० दिवस)',
      'Vegetative Vigor (१०-२५ दिवस)',
      'Flowering Stage (२५-४० दिवस)',
      'Pod Development (४०-६५ दिवस)',
      'Maturity & Harvest (६५+ दिवस)'
    ],
    Onion: [
      'Nursery Stage',
      'Transplanting (०-१५ दिवस)',
      'Vegetative Development',
      'Bulb Formation & Swelling',
      'Harvest & Curing'
    ],
    Cotton: [
      'Square Formation (पात लागणे)',
      'Flowering & Early Boll',
      'Boll Bursting & Picking'
    ],
    Wheat: [
      'Crown Root Initiation (CRI - २१ दिवस)',
      'Tillering Stage (फुटवे येणे)',
      'Booting & Heading',
      'Grain Milk & Dough Stage'
    ],
    Tomato: [
      'Vegetative Bush Stage',
      'Flowering & Fruit Setting',
      'Fruit Ripening & Picking'
    ]
  };

  const tasks = [
    {
      id: 'task_01',
      title: language === 'mr' ? 'पोटॅशियम नायट्रेट (१३:००:४५) फवारणी' : language === 'hi' ? 'पोटेशियम नाइट्रेट (13:00:45) छिड़काव' : 'Foliar Spray of 13:00:45',
      due: 'Tomorrow, Morning (7 AM - 9 AM)',
      priority: 'high',
      tag: 'Fertilizer'
    },
    {
      id: 'task_02',
      title: language === 'mr' ? 'पिवळे चिकट सापळे तपासा (पांढरी माशी)' : language === 'hi' ? 'पीले चिपचिपे ट्रैप चेक करें' : 'Inspect Yellow Sticky Traps',
      due: 'Friday',
      priority: 'medium',
      tag: 'Scouting'
    },
    {
      id: 'task_03',
      title: language === 'mr' ? 'ठिबक सिंचन फिल्टर बॅकवॉश क्लिनिंग' : language === 'hi' ? 'ड्रिप फिल्टर बैकवॉश सफाई' : 'Drip Screen Filter Backwash',
      due: 'Sunday',
      priority: 'normal',
      tag: 'Irrigation'
    }
  ];

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-20">
      
      {/* Top Banner with Farmer Profile Info */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-[#2d6a4f]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-emerald-400/40 flex items-center justify-center text-3xl shadow-inner">
              {user.avatar || '👨‍🌾'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">
                  {t.greeting}, {user.name}
                </h1>
                {user.verifiedBadge && (
                  <span className="bg-emerald-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ✓ Verified Farmer
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-200 mt-1 flex items-center gap-2">
                <span>📍 {user.village}, Tal. Dindori, Dist. {user.district} ({user.state})</span>
                <span>•</span>
                <span>🌾 Land: {user.landSizeAcre} Acres</span>
              </p>
            </div>
          </div>

          {/* Quick Action Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenVoice}
              className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <span className="text-base animate-pulse">🎙️</span>
              <span>{t.ctaVoice}</span>
            </button>
            <button
              onClick={() => setCurrentPage('advisor')}
              className="bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-white/20 transition-all flex items-center gap-2"
            >
              <span>🤖</span>
              <span>{t.navAdvisor}</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* Demo Notice */}
        <DisclaimerBanner type="demo" customText="Farmer Dashboard Demo Mode: Micro-climate weather telemetry, soil health card parameters, and expense summaries are based on representative agricultural demo data." />

        {/* Crop Selection & Growth Stage Bar */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {t.selectCrop}:
            </span>
            {['Soybean', 'Onion', 'Cotton', 'Wheat', 'Tomato'].map((c) => (
              <button
                key={c}
                onClick={() => {
                  setSelectedCrop(c);
                  if (cropStages[c]) {
                    setSelectedStage(cropStages[c][0]);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCrop === c
                    ? 'bg-[#2d6a4f] text-white shadow-md'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {c === 'Soybean' ? '🌱 Soybean' : c === 'Onion' ? '🧅 Onion' : c === 'Cotton' ? '☁️ Cotton' : c === 'Wheat' ? '🌾 Wheat' : '🍅 Tomato'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {t.cropStage}:
            </span>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="text-xs font-semibold bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
            >
              {(cropStages[selectedCrop] || []).map((stage, idx) => (
                <option key={idx} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid 1: Weather & Spray Window + Soil Health */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Weather & Spray Window Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌦️</span>
                  <div>
                    <h3 className="font-extrabold text-[#1b4332] text-base">
                      {t.weatherForecast}
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Station: {DEMO_WEATHER.district} • {DEMO_WEATHER.lastUpdated}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                  Sample Data
                </span>
              </div>

              {/* Current Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Temperature</span>
                  <p className="text-2xl font-black text-emerald-950 mt-0.5">{DEMO_WEATHER.tempC}°C</p>
                  <span className="text-[10px] text-emerald-700">Feels like 30°C</span>
                </div>

                <div className="bg-teal-50/70 p-3 rounded-2xl border border-teal-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-teal-800">Humidity</span>
                  <p className="text-2xl font-black text-teal-950 mt-0.5">{DEMO_WEATHER.humidity}%</p>
                  <span className="text-[10px] text-teal-700">Moderate dew</span>
                </div>

                <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-blue-800">Rain Prob.</span>
                  <p className="text-2xl font-black text-blue-950 mt-0.5">{DEMO_WEATHER.rainProbability}%</p>
                  <span className="text-[10px] text-blue-700">Passing clouds</span>
                </div>

                <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-amber-800">Wind Velocity</span>
                  <p className="text-2xl font-black text-amber-950 mt-0.5">{DEMO_WEATHER.windSpeedKmh} <span className="text-xs font-normal">km/h</span></p>
                  <span className="text-[10px] text-amber-700">Gentle (Low drift)</span>
                </div>
              </div>

              {/* Spray Window Banner */}
              <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wide bg-emerald-600 text-white px-2 py-0.5 rounded">
                      {t.sprayingOptimal}
                    </span>
                    <span className="text-xs font-bold text-emerald-950">
                      7:00 AM – 10:30 AM Safe Spray Window
                    </span>
                  </div>
                  <p className="text-xs text-stone-700">
                    {DEMO_WEATHER.sprayWindowNote}
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Day Forecast Row */}
            <div className="mt-5 pt-3 border-t border-stone-100 grid grid-cols-4 gap-2 text-center text-xs">
              {DEMO_WEATHER.forecast.map((day, idx) => (
                <div key={idx} className="bg-stone-50 p-2 rounded-xl">
                  <span className="text-stone-500 block font-semibold text-[11px]">{day.day}</span>
                  <span className="text-xl my-1 block">{day.icon}</span>
                  <span className="font-bold text-stone-800 block text-xs">{day.tempMax}° / {day.tempMin}°</span>
                  <span className="text-[10px] text-blue-600 font-medium">💧 {day.rainProb}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soil Health Overview Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <h3 className="font-extrabold text-[#1b4332] text-base">
                      {t.soilHealthSummary}
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      {DEMO_SOIL_HEALTH.lastTestDate}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage('sustainability')}
                  className="text-xs font-bold text-[#2d6a4f] hover:underline"
                >
                  Scorecard →
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-600">Soil Type:</span>
                  <span className="font-bold text-stone-900">{DEMO_SOIL_HEALTH.soilType}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-600">Soil pH (Reaction):</span>
                  <span className="font-bold text-stone-900">{DEMO_SOIL_HEALTH.ph} (Slightly Alkaline)</span>
                </div>

                {/* Organic Carbon Progress */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-stone-600">Organic Carbon (OC):</span>
                    <span className="font-bold text-amber-700">{DEMO_SOIL_HEALTH.organicCarbonPct}% (Target &gt; 0.75%)</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '58%' }} />
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1">
                    Needs farmyard manure (FYM) or green manuring to boost carbon.
                  </p>
                </div>

                {/* NPK Breakdown */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                  <div className="bg-red-50 p-2 rounded-xl border border-red-100">
                    <span className="text-[10px] font-bold text-red-800">Nitrogen (N)</span>
                    <p className="font-black text-stone-900 text-sm mt-0.5">{DEMO_SOIL_HEALTH.nitrogenKgHa} kg/ha</p>
                    <span className="text-[10px] text-red-600 font-semibold">Low</span>
                  </div>
                  <div className="bg-amber-50 p-2 rounded-xl border border-amber-100">
                    <span className="text-[10px] font-bold text-amber-800">Phosphorus (P)</span>
                    <p className="font-black text-stone-900 text-sm mt-0.5">{DEMO_SOIL_HEALTH.phosphorusKgHa} kg/ha</p>
                    <span className="text-[10px] text-amber-700 font-semibold">Medium</span>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-800">Potassium (K)</span>
                    <p className="font-black text-stone-900 text-sm mt-0.5">{DEMO_SOIL_HEALTH.potassiumKgHa} kg/ha</p>
                    <span className="text-[10px] text-emerald-700 font-semibold">High</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Need fresh soil test?</span>
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="font-bold text-[#2d6a4f] hover:underline"
              >
                Book NABL Lab (₹350) →
              </button>
            </div>
          </div>

        </div>

        {/* Grid 2: Personalized AI Recommendations & Urgent Farming Reminders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* AI Recommendations for current crop & stage (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-extrabold text-[#1b4332] text-base">
                    {t.aiRecommendations}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Targeted for {selectedCrop} • {selectedStage}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('advisor')}
                className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
              >
                Ask Farm AI →
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100 flex items-start gap-3">
                <span className="text-xl">💧</span>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">
                    Critical Irrigation Timing (Pod Swelling)
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Soybean is entering the pod-filling phase. Moisture stress now directly reduces seed weight by 18-22%. Run drip irrigation for 2.5 hours every 3rd morning.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-100 flex items-start gap-3">
                <span className="text-xl">🐛</span>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">
                    Spodoptera Leaf Caterpillar Scouting
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Neighboring plots in Dindori reported early skeletonization. Scout 20 random plants in a "W" pattern across the field. If egg masses are seen, spray Neem oil 1500ppm before larvae disperse.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50/60 p-3.5 rounded-2xl border border-teal-100 flex items-start gap-3">
                <span className="text-xl">🧪</span>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">
                    Foliar Potassium Top-Dress Recommendation
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Foliar spray of 00:00:50 (Potassium Sulphate) @ 4g/liter water during pod filling will boost test seed weight and enhance drought tolerance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Farming Task Reminders (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-extrabold text-[#1b4332] text-base">
                    {t.farmingReminders}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Scheduled agronomic interventions
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-stone-500">
                {tasks.length} Pending
              </span>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-stone-50 hover:bg-stone-100 p-3 rounded-2xl border border-stone-200 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-[#2d6a4f] focus:ring-[#2d6a4f]"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900">{task.title}</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">{task.due}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {task.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick add custom reminder */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <button
                onClick={() => alert('New task reminder scheduled.')}
                className="w-full text-center text-xs py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition-colors"
              >
                + Add Custom Farm Task
              </button>
            </div>
          </div>

        </div>

        {/* Grid 3: Water Stewardship & Expenses Summary + Nearby Community Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Water & Expenses Tracker (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-extrabold text-[#1b4332] text-base">
                    {t.waterAndExpenses}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Kharif 2026 Season Estimates
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-center">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                  {t.litersSaved}
                </span>
                <p className="text-2xl font-black text-emerald-950 mt-1">
                  145,000 L
                </p>
                <span className="text-[10px] text-emerald-700">via Drip Scheduling</span>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-center">
                <span className="text-[10px] font-bold text-stone-600 uppercase block">
                  Input Spend vs Budget
                </span>
                <p className="text-2xl font-black text-stone-900 mt-1">
                  ₹18,400
                </p>
                <span className="text-[10px] text-stone-500">Budget: ₹24,000</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Fertilizers (DAP/MOP/Solubles)</span>
                <span className="font-semibold text-stone-900">₹8,200</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Seed & Seed Treatment (Trichoderma)</span>
                <span className="font-semibold text-stone-900">₹5,400</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Custom Hiring (Tractor & Weeding)</span>
                <span className="font-semibold text-stone-900">₹4,800</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 text-center">
              <button
                onClick={() => setCurrentPage('sustainability')}
                className="text-xs font-bold text-[#2d6a4f] hover:underline"
              >
                View Full Economic Optimization →
              </button>
            </div>
          </div>

          {/* Nearby Alerts & Questions (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📡</span>
                <div>
                  <h3 className="font-extrabold text-[#1b4332] text-base">
                    {t.nearbyCommunityAlerts}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Active around {user.district} district
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('map')}
                className="text-xs font-bold text-[#2d6a4f] hover:underline"
              >
                Open Map Radar →
              </button>
            </div>

            <div className="space-y-3">
              {INITIAL_CROP_ALERTS.slice(0, 2).map((alert) => (
                <div
                  key={alert.id}
                  className="bg-stone-50 hover:bg-stone-100 p-3.5 rounded-2xl border border-stone-200 flex items-start justify-between gap-3 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{alert.category === 'pest' ? '🐛' : alert.category === 'disease' ? '🍄' : '💧'}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs text-stone-900">{alert.title}</h4>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                          alert.severity === 'critical' ? 'bg-red-600 text-white' : alert.severity === 'high' ? 'bg-orange-600 text-white' : 'bg-yellow-500 text-black'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-stone-500 mt-1.5">
                        <span>📍 {alert.taluka}, {alert.district} (~{alert.approximateRadiusKm}km radius)</span>
                        <span>•</span>
                        <span>👥 {alert.verifiedFarmersCount} farmers verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Have an outbreak to report?</span>
              <button
                onClick={() => setCurrentPage('map')}
                className="font-bold text-red-600 hover:text-red-700"
              >
                + Broadcast Field Outbreak Alert
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
