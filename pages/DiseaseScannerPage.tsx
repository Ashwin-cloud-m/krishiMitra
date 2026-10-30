import React, { useState, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { SAMPLE_LEAVES, analyzeLeafImage, SampleLeafOption } from '../services/diseaseModel';
import { DiseaseDiagnosis } from '../types';
import { DisclaimerBanner } from '../components/Common/DisclaimerBanner';

export const DiseaseScannerPage: React.FC = () => {
  const { t, language } = useLanguage();

  const [selectedSample, setSelectedSample] = useState<SampleLeafOption | null>(SAMPLE_LEAVES[0]);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(SAMPLE_LEAVES[0].thumbnail);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiseaseDiagnosis | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectSample = async (sample: SampleLeafOption) => {
    setSelectedSample(sample);
    setUploadedImagePreview(sample.thumbnail);
    setErrorStatus(null);
    setIsAnalyzing(true);
    setDiagnosis(null);

    try {
      const res = await analyzeLeafImage(sample.id);
      setDiagnosis(res);
    } catch (e: any) {
      setErrorStatus('Failed to process leaf sample. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedSample(null);
    const reader = new FileReader();
    reader.onload = async () => {
      setUploadedImagePreview(reader.result as string);
      setErrorStatus(null);
      setIsAnalyzing(true);
      setDiagnosis(null);

      try {
        const res = await analyzeLeafImage(file);
        setDiagnosis(res);
      } catch (err: any) {
        setErrorStatus('Analysis error: Neural diagnostic vision model timed out.');
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Run initial diagnostic on mount if empty
  React.useEffect(() => {
    if (!diagnosis && SAMPLE_LEAVES.length > 0) {
      handleSelectSample(SAMPLE_LEAVES[0]);
    }
  }, []);

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-[#2d6a4f]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍃</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {t.scannerTitle}
              </h1>
              <span className="bg-emerald-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Vision AI
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1 max-w-2xl">
              {t.scannerSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-stone-950 font-bold text-xs px-3 py-1 rounded-full">
              Pre-trained Edge Model (Demo)
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Medical disclaimer alert */}
        <DisclaimerBanner type="advisory" customText="Agricultural Warning: Image-based diagnostics are advisory estimations. Field symptoms may resemble nutrient chlorosis or viral mosaics. Consult a certified agronomist before heavy pesticide application." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Left Column: Image Capture / Upload / Sample Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Upload Box */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 text-center">
              <h3 className="font-bold text-sm text-[#1b4332] mb-3">
                {t.uploadPrompt}
              </h3>

              {/* Leaf Image Preview Area */}
              <div className="w-full h-64 rounded-2xl bg-stone-100 border-2 border-dashed border-stone-300 relative overflow-hidden flex items-center justify-center p-2 mb-4 group">
                {uploadedImagePreview ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={uploadedImagePreview}
                      alt="Uploaded Crop Leaf"
                      className="max-h-full max-w-full object-contain rounded-xl"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-[#1b4332]/40 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                        <div className="w-16 h-16 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mb-3" />
                        <span className="text-xs font-bold tracking-wider animate-pulse">
                          Scanning Cellular Patterns...
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-stone-400 text-xs flex flex-col items-center">
                    <span className="text-4xl mb-2">🌿</span>
                    <span>No leaf selected yet</span>
                  </div>
                )}
              </div>

              {/* Upload & Camera Buttons */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="py-3 px-4 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <span>📁</span>
                  <span>Upload Photo</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2 border border-stone-300"
                >
                  <span>📷</span>
                  <span>{t.takePhoto}</span>
                </button>
              </div>
            </div>

            {/* Instant Sample Leaves Carousel */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t.orPickSample}
              </h4>
              <p className="text-[11px] text-stone-500 mb-3">
                Tap any pre-labeled leaf specimen for immediate diagnostic demonstration:
              </p>

              <div className="space-y-2">
                {SAMPLE_LEAVES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`w-full p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      selectedSample?.id === sample.id
                        ? 'bg-emerald-50 border-[#2d6a4f] shadow-sm'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-stone-200 overflow-hidden shrink-0 border border-stone-300">
                      <img src={sample.thumbnail} alt={sample.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {sample.name}
                      </p>
                      <p className="text-[10px] text-stone-500">
                        {sample.crop} • Expected: {sample.expectedDiagnosis}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: AI Diagnostic Results & Recommended Actions (7 cols) */}
          <div className="lg:col-span-7">
            {isAnalyzing && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-20 h-20 rounded-full border-4 border-[#2d6a4f] border-t-transparent animate-spin mb-4" />
                <h3 className="text-lg font-bold text-[#1b4332]">
                  {t.analyzing}
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm">
                  Detecting necrosis, chlorosis rings, fungal spore morphology, and leaf vein bounds...
                </p>
              </div>
            )}

            {errorStatus && !isAnalyzing && (
              <div className="bg-red-50 text-red-800 p-6 rounded-3xl border border-red-200 text-sm">
                <span className="font-bold block mb-1">Diagnosis Error</span>
                <p>{errorStatus}</p>
              </div>
            )}

            {diagnosis && !isAnalyzing && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6">
                
                {/* Identification Banner */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-200 pb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs uppercase font-extrabold text-[#2d6a4f] bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {diagnosis.crop} Pathology
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${
                        diagnosis.severity === 'high' || diagnosis.severity === 'severe'
                          ? 'bg-red-100 text-red-800'
                          : diagnosis.severity === 'moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Severity: {diagnosis.severity}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-stone-900 mt-1">
                      {diagnosis.diseaseName}
                    </h2>
                    {diagnosis.scientificName && (
                      <p className="text-xs text-stone-500 italic mt-0.5">
                        Scientific Pathogen: {diagnosis.scientificName}
                      </p>
                    )}
                  </div>

                  {/* Confidence Gauge */}
                  <div className="text-center sm:text-right bg-stone-50 sm:bg-transparent p-3 sm:p-0 rounded-2xl border sm:border-0 border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">
                      AI Model Confidence
                    </span>
                    <span className="text-3xl font-black text-[#1b4332]">
                      {diagnosis.confidence}%
                    </span>
                    <span className="text-[10px] text-emerald-700 block font-semibold">
                      High Statistical Certainty
                    </span>
                  </div>
                </div>

                {/* Visible Symptoms */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-2.5 flex items-center gap-2">
                    <span>🔍</span> {t.symptomsIdentified}
                  </h4>
                  <ul className="space-y-1.5">
                    {diagnosis.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-xs text-stone-700 flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Two-Column Solutions: Organic vs Chemical */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Organic / Bio-control */}
                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2 text-emerald-900 font-bold text-xs uppercase tracking-wide">
                      <span>🌿</span> {t.organicSolution}
                    </div>
                    <ul className="space-y-2 text-xs text-stone-800">
                      {diagnosis.organicRemedies.map((remedy, idx) => (
                        <li key={idx} className="leading-relaxed">
                          • {remedy}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chemical Remediation */}
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
                      <span>🧪</span> {t.chemicalSolution}
                    </div>
                    <ul className="space-y-2 text-xs text-stone-800">
                      {diagnosis.chemicalManagement.map((chem, idx) => (
                        <li key={idx} className="leading-relaxed">
                          • {chem}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Long term prevention */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-2">
                    <span>🛡️</span> {t.preventionTips}
                  </h4>
                  <ul className="space-y-1.5">
                    {diagnosis.preventiveMeasures.map((tip, idx) => (
                      <li key={idx} className="text-xs text-stone-600 bg-stone-50 p-2 rounded-xl">
                        ✓ {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mandatory Disclaimer Box */}
                <div className="bg-stone-100 p-3.5 rounded-2xl text-[11px] text-stone-600 leading-relaxed border border-stone-200">
                  <span className="font-bold text-stone-800">Field Diagnostics Note: </span>
                  {diagnosis.disclaimer}
                </div>

              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
