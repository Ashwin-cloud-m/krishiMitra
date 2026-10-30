import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { DEMO_SUSTAINABILITY } from '../data/demoData';
import { DisclaimerBanner } from '../components/Common/DisclaimerBanner';

export const SustainabilityPage: React.FC = () => {
  const { t } = useLanguage();

  // Interactive practice toggles
  const [compostPractice, setCompostPractice] = useState<'yes' | 'partial' | 'no'>('partial');
  const [dripCoverage, setDripCoverage] = useState<number>(80);
  const [cropRotationPractice, setCropRotationPractice] = useState<'legume' | 'monoculture'>('legume');
  const [stubblePractice, setStubblePractice] = useState<'retain' | 'burn'>('retain');
  const [ipmPractice, setIpmPractice] = useState<'traps_and_bio' | 'chemical_only'>('traps_and_bio');

  // Compute dynamic score based on farmer selections
  let score = 50;
  if (compostPractice === 'yes') score += 15;
  else if (compostPractice === 'partial') score += 8;

  score += Math.round((dripCoverage / 100) * 15);

  if (cropRotationPractice === 'legume') score += 10;
  if (stubblePractice === 'retain') score += 10;
  if (ipmPractice === 'traps_and_bio') score += 10;

  // Compute estimated savings (Rs per acre)
  const estimatedSavings = Math.round((score / 100) * 6500);

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-[#2d6a4f]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌱</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {t.sustainabilityTitle}
              </h1>
              <span className="bg-emerald-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Agro-Ecology Tool
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1 max-w-2xl">
              {t.sustainabilitySubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs px-3 py-1.5 rounded-2xl font-semibold">
              Educational Calculator
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Notice */}
        <DisclaimerBanner type="demo" customText="Educational Scoring Engine: Evaluates self-reported farmer agronomy practices. For formal carbon credit trading or certified organic accreditation, physical soil core laboratory assays are legally required." />

        {/* Top Score Banner: Score Gauge + Savings Tracker */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-stone-100 pb-6 md:pb-0 md:pr-6">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Farm Sustainability Rating
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-2 mt-1">
              <span className="text-5xl font-black text-[#1b4332]">{score}</span>
              <span className="text-stone-400 font-bold text-lg">/ 100</span>
            </div>
            <div className="mt-2">
              <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full ${
                score >= 80 ? 'bg-emerald-100 text-emerald-900' : score >= 60 ? 'bg-teal-100 text-teal-900' : 'bg-amber-100 text-amber-900'
              }`}>
                {score >= 80 ? '🌟 Excellent Ecological Stewardship' : score >= 60 ? '🌿 Good Agro-Ecological Balance' : '⚠️ Transitioning Farm'}
              </span>
            </div>
          </div>

          <div className="md:col-span-5 space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-700">
              Financial Impact on Farmer Bottom-Line:
            </h4>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-emerald-800">₹{estimatedSavings}</span>
              <span className="text-xs text-stone-600 font-medium">Estimated Input Savings / Acre / Year</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Achieved through reduced synthetic fertilizer dependence, decreased tractor diesel consumption via stubble retention, and precision drip fertigation.
            </p>
          </div>

          <div className="md:col-span-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center text-xs">
            <span className="font-bold text-stone-700 block mb-1">Carbon Credit Eligibility</span>
            <span className="text-emerald-700 font-black text-sm block">Pre-Qualified Level 2</span>
            <p className="text-[10px] text-stone-500 mt-1">Est. 0.8 Tonnes CO2 equivalent sequestered per acre</p>
          </div>

        </div>

        {/* Interactive Practice Customizer */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 mb-8">
          <h3 className="font-extrabold text-[#1b4332] text-base mb-1">
            Simulate Your Farm Practices & Recalculate
          </h3>
          <p className="text-xs text-stone-500 mb-6">
            Adjust your current farm management techniques to see how ecological stewardship directly impacts input costs:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            
            {/* Control 1: Compost & Organic Manure */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-2">
                1. Organic Manure / Jeevamrut Use
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'yes', label: 'Full Jeevamrut & 3T FYM/acre' },
                  { id: 'partial', label: 'Partial Compost + Chemical NPK' },
                  { id: 'no', label: 'Only Synthetic Chemical Fertilizers' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCompostPractice(opt.id as any)}
                    className={`w-full text-left p-2 rounded-xl border text-xs font-medium transition-colors ${
                      compostPractice === opt.id
                        ? 'bg-[#2d6a4f] text-white border-[#2d6a4f] font-bold'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Drip Irrigation Coverage Slider */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-stone-800">
                  2. Micro-Irrigation (Drip/Sprinkler)
                </label>
                <span className="font-bold text-[#1b4332] text-sm">{dripCoverage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={dripCoverage}
                onChange={(e) => setDripCoverage(Number(e.target.value))}
                className="w-full accent-[#2d6a4f] cursor-pointer my-2"
              />
              <p className="text-[10px] text-stone-500 mt-2">
                {dripCoverage >= 70
                  ? 'Excellent: Cuts water loss by 40% and prevents nutrient leaching.'
                  : 'Flood furrow irrigation causes topsoil erosion and salt accumulation.'}
              </p>
            </div>

            {/* Control 3: Crop Rotation with Legumes */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-2">
                3. Crop Rotation & Legumes
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'legume', label: 'Rotates with Pulses/Soybean (Fixes N)' },
                  { id: 'monoculture', label: 'Continuous Monoculture (Sugarcane/Cotton)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCropRotationPractice(opt.id as any)}
                    className={`w-full text-left p-2 rounded-xl border text-xs font-medium transition-colors ${
                      cropRotationPractice === opt.id
                        ? 'bg-[#2d6a4f] text-white border-[#2d6a4f] font-bold'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Crop Residue & Stubble */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-2">
                4. Crop Residue & Stubble
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'retain', label: 'Mulch / Super Seeder Zero-Till' },
                  { id: 'burn', label: 'Open Field Stubble Burning' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setStubblePractice(opt.id as any)}
                    className={`w-full text-left p-2 rounded-xl border text-xs font-medium transition-colors ${
                      stubblePractice === opt.id
                        ? 'bg-[#2d6a4f] text-white border-[#2d6a4f] font-bold'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 5: Integrated Pest Management */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-2">
                5. Pest Management Philosophy
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'traps_and_bio', label: 'Pheromone Traps + Neem Bio-Control' },
                  { id: 'chemical_only', label: 'Prophylactic Chemical Calendar Spraying' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setIpmPractice(opt.id as any)}
                    className={`w-full text-left p-2 rounded-xl border text-xs font-medium transition-colors ${
                      ipmPractice === opt.id
                        ? 'bg-[#2d6a4f] text-white border-[#2d6a4f] font-bold'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary card */}
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-900 tracking-wider">
                  Summary Advice
                </span>
                <p className="text-xs text-stone-800 mt-1">
                  Your combination retains organic carbon while cutting expensive chemical pesticide bills.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-bold text-emerald-800">
                ✓ Ready for PM-KMY Carbon Tier
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Assessment Pillars Breakdown */}
        <div className="space-y-4 mb-8">
          <h3 className="font-extrabold text-[#1b4332] text-base">
            Detailed Sustainability Pillar Breakdown
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(DEMO_SUSTAINABILITY.pillars).map(([key, pillar]) => (
              <div key={key} className="bg-white p-5 rounded-3xl shadow-sm border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-xs text-stone-900">{pillar.name}</h4>
                  <span className="text-xs font-extrabold text-[#1b4332]">
                    {pillar.score} / {pillar.maxScore}
                  </span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-3">
                  <div
                    className="bg-[#52b788] h-full rounded-full"
                    style={{ width: `${(pillar.score / pillar.maxScore) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {pillar.summary}
                </p>
                <div className="text-[11px] text-stone-500 space-y-1">
                  {pillar.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Data Points Callout */}
        <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200 text-xs text-amber-950">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📋</span>
            <h4 className="font-bold text-sm text-amber-900">
              Identified Data Gaps to Improve Scoring Precision
            </h4>
          </div>
          <p className="text-amber-800 mb-3">
            To achieve formal NABL-grade verification, the following data points can be uploaded to your farm profile:
          </p>
          <ul className="space-y-1.5">
            {DEMO_SUSTAINABILITY.missingDataPoints.map((gap, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
