// KrishiMitra AI - KrishiVoice Speech-to-Text & Text-to-Speech Engine
import { SupportedLanguage } from '../types';

export class SpeechEngine {
  private static recognitionInstance: any = null;
  private static isSpeakingNow: boolean = false;

  public static isSupported(): { stt: boolean; tts: boolean } {
    const hasSTT = typeof window !== 'undefined' && 
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    const hasTTS = typeof window !== 'undefined' && 'speechSynthesis' in window;
    return { stt: !!hasSTT, tts: !!hasTTS };
  }

  public static startListening(
    lang: SupportedLanguage,
    onResult: (text: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ): () => void {
    const windowObj = window as any;
    const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or modern mobile browsers.');
      onEnd();
      return () => {};
    }

    try {
      const recognition = new SpeechRecognition();
      SpeechEngine.recognitionInstance = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;

      // Language code mapping
      const langCodes: Record<SupportedLanguage, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        mr: 'mr-IN'
      };
      recognition.lang = langCodes[lang] || 'hi-IN';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          onResult(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          onError('Microphone access was denied. Please allow microphone permissions.');
        } else {
          onError(`Voice input error (${event.error}). Please type or try again.`);
        }
        onEnd();
      };

      recognition.onend = () => {
        onEnd();
      };

      recognition.start();

      return () => {
        try {
          recognition.stop();
        } catch (e) {
          // ignore
        }
      };
    } catch (e: any) {
      onError('Failed to initialize speech recognition: ' + (e?.message || 'Unknown error'));
      onEnd();
      return () => {};
    }
  }

  public static speak(
    text: string,
    lang: SupportedLanguage,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    const langCodes: Record<SupportedLanguage, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN'
    };
    utterance.lang = langCodes[lang] || 'hi-IN';
    utterance.rate = 0.92; // Slightly measured pace for rural outdoor listening
    utterance.pitch = 1.0;

    // Try finding an Indian accented or native voice
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => 
      v.lang.toLowerCase().includes(langCodes[lang].toLowerCase()) ||
      v.lang.toLowerCase().includes(lang)
    );
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    utterance.onstart = () => {
      SpeechEngine.isSpeakingNow = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      SpeechEngine.isSpeakingNow = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('TTS error:', e);
      SpeechEngine.isSpeakingNow = false;
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  public static stopSpeaking(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      SpeechEngine.isSpeakingNow = false;
    }
  }

  public static isSpeaking(): boolean {
    return SpeechEngine.isSpeakingNow;
  }
}
