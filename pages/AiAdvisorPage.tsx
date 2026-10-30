import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { SpeechEngine } from '../services/speech';
import { ApiService } from '../services/api';
import { FarmContext, AdvisoryMessage } from '../types';
import { DisclaimerBanner } from '../components/Common/DisclaimerBanner';

export const AiAdvisorPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();

  // Farm Context state
  const [context, setContext] = useState<FarmContext>({
    cropName: user.primaryCrops[0] || 'Soybean',
    village: user.village || 'Pimpalgaon Baswant',
    district: user.district || 'Nashik',
    soilType: 'Medium Deep Black Clay (काळी माती)',
    cropStage: 'Vegetative Vigor (शाकीय वाढ)',
    irrigationMethod: 'Drip Irrigation (ठिबक सिंचन)',
    photoUrl: undefined
  });

  const [isContextDrawerOpen, setIsContextDrawerOpen] = useState(false);

  // Messages state
  const [messages, setMessages] = useState<AdvisoryMessage[]>([
    {
      id: 'init_welcome',
      sender: 'ai',
      text: language === 'mr'
        ? `रामराम ${user.name} जी! मी तुमचा कृषी मित्र AI सल्लागार आहे. तुमच्या ${context.district} भागातील माती आणि हवामानानुसार पिकांची काळजी, खत नियोजन, कीड नियंत्रण आणि सिंचनाबद्दल मला विचारा.`
        : language === 'hi'
        ? `नमस्ते ${user.name} जी! मैं आपका कृषि मित्र AI सलाहकार हूँ। आपके ${context.district} क्षेत्र की मिट्टी और मौसम के आधार पर फसल पोषण, कीट नियंत्रण या सिंचाई के बारे में कुछ भी पूछें।`
        : `Namaste ${user.name}! I am your KrishiMitra AI Farm Advisor. Ask me anything regarding pest management, irrigation timing, balanced nutrition, or reducing input costs in ${context.district}.`,
      timestamp: 'Just now',
      language,
      confidence: 0.95,
      riskLevel: 'low',
      isDemo: true
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [stopMicFn, setStopMicFn] = useState<(() => void) | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickQuestions = [
    {
      en: 'Which crop is suitable for my soil and season?',
      hi: 'मेरी मिट्टी और मौसम के लिए कौन सी फसल उपयुक्त है?',
      mr: 'माझ्या माती आणि हंगामासाठी कोणते पीक योग्य आहे?'
    },
    {
      en: 'How should I manage pests in my crop?',
      hi: 'मेरी फसल में कीट प्रबंधन कैसे करें?',
      mr: 'माझ्या पिकावरील कीड नियंत्रण कसे करावे?'
    },
    {
      en: 'When should I irrigate my field?',
      hi: 'मुझे अपने खेत की सिंचाई कब करनी चाहिए?',
      mr: 'शेताला पाणी (सिंचन) कधी द्यावे?'
    },
    {
      en: 'What nutrients might my crop need right now?',
      hi: 'वर्तमान में मेरी फसल को किन पोषक तत्वों की आवश्यकता है?',
      mr: 'सध्या पिकाला कोणत्या खतांची/अन्नद्रव्यांची गरज आहे?'
    },
    {
      en: 'How can I reduce cultivation costs by 25%?',
      hi: 'खेती की लागत 25% तक कैसे कम करें?',
      mr: 'शेतीचा खर्च २५% कसा कमी करता येईल?'
    }
  ];

  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q || isLoading) return;

    setInputQuery('');
    SpeechEngine.stopSpeaking();
    setCurrentlySpeakingId(null);

    const userMsg: AdvisoryMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const aiReply = await ApiService.askAdvisory(q, context, language);
      setMessages((prev) => [...prev, aiReply]);
    } catch (e) {
      const errorMsg: AdvisoryMessage = {
        id: 'err_' + Date.now(),
        sender: 'ai',
        text: 'Unable to reach the advisory model right now. If you are offline, cached knowledge guides are still accessible.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        riskLevel: 'low'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVoiceInput = () => {
    if (isListening) {
      if (stopMicFn) stopMicFn();
      setIsListening(false);
      return;
    }

    SpeechEngine.stopSpeaking();
    setCurrentlySpeakingId(null);

    const stop = SpeechEngine.startListening(
      language,
      (text) => {
        setInputQuery(text);
      },
      (err) => {
        alert(err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    setStopMicFn(() => stop);
    setIsListening(true);
  };

  const handlePlayAudio = (msg: AdvisoryMessage) => {
    if (currentlySpeakingId === msg.id) {
      SpeechEngine.stopSpeaking();
      setCurrentlySpeakingId(null);
      return;
    }

    SpeechEngine.speak(
      msg.text,
      language,
      () => setCurrentlySpeakingId(msg.id),
      () => setCurrentlySpeakingId(null)
    );
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24">
      
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-6 px-4 sm:px-6 lg:px-8 border-b-4 border-[#2d6a4f]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🤖</span>
              <h1 className="text-2xl font-black text-white">
                {t.navAdvisor}
              </h1>
              <span className="bg-emerald-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Multilingual AI
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1">
              Contextual agricultural advice calibrated by crop stage, soil chemistry, and verified KVK protocols.
            </p>
          </div>

          {/* Context Trigger Pill */}
          <button
            onClick={() => setIsContextDrawerOpen(!isContextDrawerOpen)}
            className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#40916c] px-4 py-2 rounded-2xl text-xs font-bold text-white border border-[#52b788]/50 shadow transition-all"
          >
            <span>🌾 Farm Context:</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-lg">
              {context.cropName} • {context.district}
            </span>
            <span>{isContextDrawerOpen ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        
        {/* Context Configuration Drawer */}
        {isContextDrawerOpen && (
          <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-[#2d6a4f] mb-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-4">
              <h3 className="text-xs font-bold text-[#1b4332] uppercase tracking-wider flex items-center gap-2">
                <span>📋</span> Farm Calibration Inputs (Used by AI for precise recommendations)
              </h3>
              <button
                onClick={() => setIsContextDrawerOpen(false)}
                className="text-xs font-bold text-stone-500 hover:text-stone-800"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">{t.selectCrop}</label>
                <select
                  value={context.cropName}
                  onChange={(e) => setContext({ ...context, cropName: e.target.value })}
                  className="w-full p-2 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                >
                  <option value="Soybean">Soybean (सोयाबीन)</option>
                  <option value="Onion">Onion (कांदा)</option>
                  <option value="Cotton">Cotton (कापूस)</option>
                  <option value="Wheat">Wheat (गहू)</option>
                  <option value="Tomato">Tomato (टोमॅटो)</option>
                  <option value="Sugarcane">Sugarcane (ऊस)</option>
                  <option value="Maize">Maize (मका)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Village & District</label>
                <input
                  type="text"
                  value={context.district}
                  onChange={(e) => setContext({ ...context, district: e.target.value })}
                  className="w-full p-2 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">{t.selectSoil}</label>
                <select
                  value={context.soilType}
                  onChange={(e) => setContext({ ...context, soilType: e.target.value })}
                  className="w-full p-2 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                >
                  <option value="Medium Deep Black Clay (काळी माती)">Medium Deep Black Clay (Vertisol)</option>
                  <option value="Red Loamy Soil (तांबडी माती)">Red Loamy Soil</option>
                  <option value="Alluvial Soil (गाळाची माती)">Alluvial Soil</option>
                  <option value="Sandy Loam Soil (रेताड माती)">Sandy Loam Soil</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">{t.selectStage}</label>
                <select
                  value={context.cropStage}
                  onChange={(e) => setContext({ ...context, cropStage: e.target.value })}
                  className="w-full p-2 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                >
                  <option value="Sowing & Germination (उगवण)">Sowing & Germination (0-15 days)</option>
                  <option value="Vegetative Vigor (शाकीय वाढ)">Vegetative Vigor (15-35 days)</option>
                  <option value="Flowering Stage (फुलोरा अवस्था)">Flowering Stage (35-50 days)</option>
                  <option value="Pod/Fruit Formation (फळ/शेंगा विकास)">Pod / Fruit Formation (50-70 days)</option>
                  <option value="Maturity & Pre-Harvest (पक्वता)">Maturity & Pre-Harvest</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">{t.selectIrrigation}</label>
                <select
                  value={context.irrigationMethod}
                  onChange={(e) => setContext({ ...context, irrigationMethod: e.target.value })}
                  className="w-full p-2 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                >
                  <option value="Drip Irrigation (ठिबक सिंचन)">Drip Irrigation (ठिबक)</option>
                  <option value="Sprinkler Irrigation (तुषार सिंचन)">Sprinkler Irrigation (तुषार)</option>
                  <option value="Flood / Furrow Irrigation (पाटपाणी)">Flood / Furrow Irrigation (पाटपाणी)</option>
                  <option value="Rainfed (जिरायती)">Rainfed / Dryland (जिरायती)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setIsContextDrawerOpen(false)}
                  className="w-full py-2 bg-[#2d6a4f] text-white font-bold rounded-xl hover:bg-[#1b4332] transition-colors"
                >
                  Save Context
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Demo Notice */}
        <DisclaimerBanner type="advisory" customText="Model Transparency: Agricultural advice is generated with calibrated uncertainty metrics. For severe chemical interventions, always consult certified KVK scientists." />

        {/* Chat History Box */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200 min-h-[460px] flex flex-col justify-between mb-4">
          
          {/* Scrollable messages container */}
          <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 shadow-sm ${
                      isUser
                        ? 'bg-[#2d6a4f] text-white rounded-br-xs'
                        : 'bg-[#fdfbf7] text-stone-900 border border-stone-200 rounded-bl-xs'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-1.5 text-[11px] opacity-80">
                      <span className="font-bold flex items-center gap-1">
                        <span>{isUser ? '👨‍🌾 You' : '🤖 KrishiMitra AI'}</span>
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Text Body */}
                    <p className="text-sm leading-relaxed whitespace-pre-line font-normal">
                      {msg.text}
                    </p>

                    {/* AI Metadata & Safety Disclaimers */}
                    {!isUser && (
                      <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                        
                        {/* Audio readout button */}
                        <button
                          onClick={() => handlePlayAudio(msg)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                            currentlySpeakingId === msg.id
                              ? 'bg-emerald-600 text-white animate-pulse'
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                          }`}
                        >
                          <span>{currentlySpeakingId === msg.id ? '⏹️' : '🔊'}</span>
                          <span>{currentlySpeakingId === msg.id ? t.stopSpeaking : 'Listen (ऐका)'}</span>
                        </button>

                        {/* Confidence score */}
                        {msg.confidence && (
                          <span className="text-[10px] text-stone-500 font-medium">
                            Confidence: {Math.round(msg.confidence * 100)}%
                          </span>
                        )}

                        {/* High risk KVK consultation banner */}
                        {msg.riskLevel === 'moderate' || msg.riskLevel === 'high' ? (
                          <div className="w-full bg-red-50 text-red-800 p-2 rounded-xl text-[11px] border border-red-200 mt-1 flex items-center justify-between">
                            <span>⚠️ {t.consultExpertPrompt}</span>
                            {msg.kvkContact && (
                              <a
                                href={`tel:${msg.kvkContact.phone}`}
                                className="font-bold text-red-900 underline hover:text-red-950 ml-2"
                              >
                                {t.contactKVK}
                              </a>
                            )}
                          </div>
                        ) : null}

                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-3 bg-stone-100 p-3 rounded-2xl max-w-xs animate-pulse text-xs text-stone-600">
                <span className="text-xl animate-spin">🌱</span>
                <span>Synthesizing agricultural guidance...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Quick Chips */}
          <div className="pt-4 mt-2 border-t border-stone-100">
            <p className="text-[11px] text-stone-500 mb-2 font-semibold">
              {language === 'mr' ? 'जलद प्रश्न निवडा:' : language === 'hi' ? 'त्वरित सवाल चुनें:' : 'Popular Questions:'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => {
                const label = q[language] || q.en;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(label)}
                    disabled={isLoading}
                    className="text-xs bg-stone-50 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 hover:border-emerald-400 px-3 py-1.5 rounded-full transition-all text-left"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Input Bar */}
        <div className="bg-white rounded-3xl p-3 shadow-md border border-stone-200 flex items-center gap-2">
          {/* Mic Button */}
          <button
            onClick={handleToggleVoiceInput}
            title={isListening ? 'Stop listening' : 'Speak your question'}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
            }`}
          >
            {isListening ? '⏹️' : '🎙️'}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={isListening ? t.listening : t.askPlaceholder}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isLoading}
            className="w-12 h-12 rounded-2xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white flex items-center justify-center text-lg disabled:opacity-40 transition-colors"
          >
            ➔
          </button>
        </div>

      </div>

    </div>
  );
};
