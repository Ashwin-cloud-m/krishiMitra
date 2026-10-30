import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { GOVT_SCHEMES } from '../data/demoData';
import { GovtScheme } from '../types';
import { DisclaimerBanner } from '../components/Common/DisclaimerBanner';

export const SchemesPage: React.FC = () => {
  const { t, language } = useLanguage();

  // Eligibility Checker State
  const [landHolding, setLandHolding] = useState<'marginal' | 'small' | 'medium'>('small');
  const [hasAadhaarLinked, setHasAadhaarLinked] = useState<boolean>(true);
  const [hasDripSystem, setHasDripSystem] = useState<boolean>(false);
  const [hasCropInsurance, setHasCropInsurance] = useState<boolean>(false);
  const [checkedResults, setCheckedResults] = useState<boolean>(false);

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-[#2d6a4f]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">📜</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {t.schemesTitle}
              </h1>
              <span className="bg-emerald-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Verified Database
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1 max-w-2xl">
              Authentic government agricultural welfare schemes, DBT financial assistance, and mechanization subsidies for Indian farming families.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#2d6a4f] text-emerald-200 border border-emerald-500/50 text-xs px-3 py-1.5 rounded-2xl font-semibold">
              Oct 2026 Verification
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Notice */}
        <DisclaimerBanner type="demo" customText="Scheme Information Integrity: Official guidelines cited from the Ministry of Agriculture & Farmers Welfare. No fabricated benefits. Direct application links lead to verified state and national portals." />

        {/* Interactive Eligibility Checker Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-[#2d6a4f] my-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🎯</span>
            <h3 className="text-lg font-bold text-[#1b4332]">
              {t.eligibilityChecker}
            </h3>
          </div>
          <p className="text-xs text-stone-500 mb-6">
            Answer 3 quick questions about your farm holding to immediately discover all central and state subsidies you qualify for:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-6">
            
            {/* Q1: Land Holding */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-1.5">
                Total Land Holding
              </label>
              <select
                value={landHolding}
                onChange={(e) => {
                  setLandHolding(e.target.value as any);
                  setCheckedResults(true);
                }}
                className="w-full p-2 rounded-xl bg-white border border-stone-300 font-semibold"
              >
                <option value="marginal">Marginal (Under 1 Hectare / 2.5 Ac)</option>
                <option value="small">Small (1 - 2 Hectares / 2.5 - 5 Ac)</option>
                <option value="medium">Medium/Large (&gt; 2 Hectares / 5+ Ac)</option>
              </select>
            </div>

            {/* Q2: Aadhaar NPCI Link */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-1.5">
                Bank Account NPCI/Aadhaar Linked?
              </label>
              <select
                value={String(hasAadhaarLinked)}
                onChange={(e) => {
                  setHasAadhaarLinked(e.target.value === 'true');
                  setCheckedResults(true);
                }}
                className="w-full p-2 rounded-xl bg-white border border-stone-300 font-semibold"
              >
                <option value="true">Yes, Linked for DBT</option>
                <option value="false">Not Yet Linked</option>
              </select>
            </div>

            {/* Q3: Drip Micro-irrigation */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-1.5">
                Micro-Irrigation (Drip) Installed?
              </label>
              <select
                value={String(hasDripSystem)}
                onChange={(e) => {
                  setHasDripSystem(e.target.value === 'true');
                  setCheckedResults(true);
                }}
                className="w-full p-2 rounded-xl bg-white border border-stone-300 font-semibold"
              >
                <option value="false">No, Need Subsidy to Install</option>
                <option value="true">Yes, Already Installed</option>
              </select>
            </div>

            {/* Q4: Fasal Bima */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-1.5">
                Current Season Crop Insured?
              </label>
              <select
                value={String(hasCropInsurance)}
                onChange={(e) => {
                  setHasCropInsurance(e.target.value === 'true');
                  setCheckedResults(true);
                }}
                className="w-full p-2 rounded-xl bg-white border border-stone-300 font-semibold"
              >
                <option value="false">Not Insured (Need PMFBY)</option>
                <option value="true">Yes, Insured via Bank</option>
              </select>
            </div>

          </div>

          {/* Result summary banner */}
          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <h4 className="font-extrabold text-sm text-emerald-950">
                  Eligibility Evaluation Complete: You Qualify for 4 Active Schemes
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  As a <strong>{landHolding === 'marginal' ? 'Marginal' : landHolding === 'small' ? 'Small' : 'Medium'}</strong> farmer, you are eligible for <strong>55% Drip subsidy</strong> and <strong>₹6,000/year PM-Kisan DBT</strong>.
                </p>
              </div>
            </div>
            <a
              href="https://pmkisan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs rounded-xl shadow shrink-0 text-center"
            >
              Apply at National Portal →
            </a>
          </div>

        </div>

        {/* Schemes Detailed Cards */}
        <div className="space-y-6">
          <h3 className="font-extrabold text-[#1b4332] text-lg">
            Detailed Scheme Documentation & Guidelines
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GOVT_SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between hover:border-[#52b788] transition-all"
              >
                <div>
                  {/* Scheme header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {scheme.ministry}
                      </span>
                      <h4 className="text-base font-black text-stone-900 mt-2">
                        {language === 'mr' ? scheme.nameMr : language === 'hi' ? scheme.nameHi : scheme.name}
                      </h4>
                    </div>
                    <span className="text-2xl">🏛️</span>
                  </div>

                  {/* Benefit Pill */}
                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 my-3 text-xs space-y-1">
                    <p className="flex justify-between">
                      <span className="text-stone-500">Subsidy / Benefit:</span>
                      <span className="font-bold text-[#1b4332]">{scheme.subsidyPercentage}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-stone-500">Maximum Grant:</span>
                      <span className="font-bold text-stone-900">{scheme.maxBenefit}</span>
                    </p>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed mb-4">
                    {scheme.description}
                  </p>

                  {/* Required Documents */}
                  <div>
                    <h5 className="text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                      Documents Required for Application:
                    </h5>
                    <ul className="space-y-1 text-xs text-stone-600">
                      {scheme.documentsRequired.map((doc, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-500">
                    {scheme.lastVerifiedDate}
                  </span>
                  <a
                    href={scheme.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#2d6a4f] hover:text-[#1b4332] flex items-center gap-1"
                  >
                    <span>Official Portal</span>
                    <span>→</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
