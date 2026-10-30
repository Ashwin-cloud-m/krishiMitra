import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAuth } from '../context/AuthContext';
import { SpeechEngine } from '../services/speech';
import { ApiService } from '../services/api';
import { SupportedLanguage } from '../types';

interface KrishiVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KrishiVoiceModal: React.FC<KrishiVoiceModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useLanguage();
  const { lowBandwidth } = useAccessibility();
  const { user } = useAuth();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [stopFn, setStopFn] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (!isOpen) {
      SpeechEngine.stopSpeaking();
      if (stopFn) stopFn();
      setIsListening(false);
      setIsSpeaking(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    setErrorStatus(null);
    setTranscript('');
    setResponseMessage('');
    SpeechEngine.stopSpeaking();

    const stop = SpeechEngine.startListening(
      language,
      (text) => {
        setTranscript(text);
      },
      (err) => {
        setErrorStatus(err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    setStopFn(() => stop);
    setIsListening(true);
  };

  const handleStopListening = async () => {
    if (stopFn) {
      stopFn();
    }
    setIsListening(false);

    if (!transcript.trim()) {
      setErrorStatus(language === 'mr' ? 'काही आवाज ऐकू आला नाही. कृपया पुन्हा बोला.' : language === 'hi' ? 'कोई आवाज़ सुनाई नहीं दी। कृपया फिर से बोलें।' : 'No speech detected. Please tap and speak again.');
      return;
    }

    // Process spoken query
    try {
      const res = await ApiService.askAdvisory(
        transcript,
        {
          cropName: user.primaryCrops[0] || 'Soybean',
          village: user.village,
          district: user.district,
          soilType: 'Black Clay',
          cropStage: 'Vegetative',
          irrigationMethod: 'Drip'
        },
        language
      );

      setResponseMessage(res.text);

      // Speak response back
      SpeechEngine.speak(
        res.text,
        language,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    } catch (e: any) {
      setErrorStatus('Failed to process voice query.');
    }
  };

  const handleStopAudio = () => {
    SpeechEngine.stopSpeaking();
    setIsSpeaking(false);
  };

  const handleReplayAudio = () => {
    if (responseMessage) {
      SpeechEngine.speak(
        responseMessage,
        language,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const langButtons: { code: SupportedLanguage; label: string }[] = [
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'en', label: 'English' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#fdfbf7] text-stone-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-[#2d6a4f] relative overflow-hidden flex flex-col items-center text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center font-bold text-xl transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">🎙️</span>
          <h2 className="text-2xl font-bold text-[#1b4332]">
            {language === 'mr' ? 'कृषीवाणी व्हॉइस असिस्टंट' : language === 'hi' ? 'कृषिवाणी वॉइस असिस्टेंट' : 'KrishiVoice Assistant'}
          </h2>
        </div>
        <p className="text-xs text-stone-600 mb-4">
          {language === 'mr' ? 'टाइपिंग न करता थेट तुमच्या भाषेत बोला आणि ऐका' : language === 'hi' ? 'बिना टाइप किए सीधी अपनी भाषा में बोलें और सुनें' : 'Hands-free voice advisory designed for field conditions'}
        </p>

        {/* Language Selector */}
        <div className="flex gap-2 mb-6">
          {langButtons.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                SpeechEngine.stopSpeaking();
                setIsSpeaking(false);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                language === l.code
                  ? 'bg-[#2d6a4f] text-white shadow-md'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Big Giant Microphone Button */}
        <div className="relative my-4 flex items-center justify-center">
          {isListening && (
            <div className="absolute w-40 h-40 rounded-full bg-red-400/30 animate-ping pointer-events-none" />
          )}
          {isSpeaking && (
            <div className="absolute w-40 h-40 rounded-full bg-emerald-400/30 animate-pulse pointer-events-none" />
          )}

          <button
            onClick={isListening ? handleStopListening : handleStartListening}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all transform active:scale-95 ${
              isListening
                ? 'bg-red-600 hover:bg-red-700 text-white border-4 border-red-300'
                : 'bg-gradient-to-tr from-[#1b4332] to-[#40916c] hover:opacity-95 text-white border-4 border-[#74c69d]'
            }`}
          >
            <span className="text-4xl">{isListening ? '⏹️' : '🎙️'}</span>
            <span className="text-xs font-bold mt-1 tracking-wide uppercase">
              {isListening ? 'Done (थांबा)' : 'Tap to Speak'}
            </span>
          </button>
        </div>

        {/* Status indicator */}
        <div className="min-h-[28px] mt-2 mb-3">
          {isListening && (
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full animate-pulse border border-red-200">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              {t.listening}
            </span>
          )}
          {isSpeaking && (
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="text-base animate-bounce">🔊</span>
              {t.speaking}
            </span>
          )}
          {!isListening && !isSpeaking && !transcript && !responseMessage && (
            <span className="text-xs text-stone-500">
              {language === 'mr' ? 'मोठ्या बटणावर दाबा आणि पीक किंवा कीड संदर्भात विचारा' : language === 'hi' ? 'बटन दबाकर फसल, खाद या कीट के बारे में पूछें' : 'Press the mic button and speak your farm query'}
            </span>
          )}
        </div>

        {/* Transcript Box */}
        {transcript && (
          <div className="w-full bg-stone-100 p-3 rounded-xl border border-stone-300 mb-3 text-left">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
              You Asked:
            </span>
            <p className="text-stone-800 text-sm font-medium mt-0.5">"{transcript}"</p>
          </div>
        )}

        {/* Spoken Response Box */}
        {responseMessage && (
          <div className="w-full max-h-48 overflow-y-auto bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-left mb-4 shadow-inner">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                <span>🤖</span> KrishiMitra Spoken Answer:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleReplayAudio}
                  className="text-xs bg-emerald-200 hover:bg-emerald-300 text-emerald-900 font-semibold px-2 py-0.5 rounded transition-colors"
                >
                  🔁 Replay
                </button>
                {isSpeaking && (
                  <button
                    onClick={handleStopAudio}
                    className="text-xs bg-red-200 hover:bg-red-300 text-red-900 font-semibold px-2 py-0.5 rounded transition-colors"
                  >
                    ⏹️ Stop
                  </button>
                )}
              </div>
            </div>
            <p className="text-stone-800 text-sm whitespace-pre-line leading-relaxed">
              {responseMessage}
            </p>
          </div>
        )}

        {/* Error message */}
        {errorStatus && (
          <div className="w-full bg-red-50 text-red-700 text-xs p-2.5 rounded-lg border border-red-200 mb-2">
            ⚠️ {errorStatus}
          </div>
        )}

        {/* Quick query chips */}
        <div className="w-full mt-2 pt-3 border-t border-stone-200">
          <p className="text-[11px] text-stone-500 mb-2 font-medium">
            {language === 'mr' ? 'किंवा हे लोकप्रिय प्रश्न निवडा:' : language === 'hi' ? 'या इन त्वरित सवालों पर टैप करें:' : 'Or tap a common farmer question:'}
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {[
              language === 'mr' ? 'सोयाबीन वरील कीड कशी रोखावी?' : language === 'hi' ? 'सोयाबीन में कीट नियंत्रण कैसे करें?' : 'How to control pests in Soybean?',
              language === 'mr' ? 'ठिबक सिंचनाने पाणी कधी द्यावे?' : language === 'hi' ? 'ड्रिप से सही सिंचाई समय क्या है?' : 'When to irrigate via drip?',
              language === 'mr' ? 'शेती खर्च कसा कमी करावा?' : language === 'hi' ? 'खेती की लागत कैसे कम करें?' : 'How to reduce farm input costs?'
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={async () => {
                  setTranscript(q);
                  setIsListening(false);
                  SpeechEngine.stopSpeaking();
                  const res = await ApiService.askAdvisory(
                    q,
                    {
                      cropName: user.primaryCrops[0] || 'Soybean',
                      village: user.village,
                      district: user.district,
                      soilType: 'Black Clay',
                      cropStage: 'Vegetative',
                      irrigationMethod: 'Drip'
                    },
                    language
                  );
                  setResponseMessage(res.text);
                  SpeechEngine.speak(
                    res.text,
                    language,
                    () => setIsSpeaking(true),
                    () => setIsSpeaking(false)
                  );
                }}
                className="text-xs bg-white hover:bg-emerald-50 text-stone-700 border border-stone-300 hover:border-emerald-500 px-3 py-1.5 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
