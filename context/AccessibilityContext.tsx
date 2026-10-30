import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  lowBandwidth: boolean;
  toggleLowBandwidth: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('km_font_size') as FontSize) || 'normal';
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('km_high_contrast') === 'true';
  });

  const [lowBandwidth, setLowBandwidth] = useState<boolean>(() => {
    return localStorage.getItem('km_low_bandwidth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('km_font_size', fontSize);
    const root = document.documentElement;
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
    root.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('km_high_contrast', String(highContrast));
    if (highContrast) {
      document.documentElement.classList.add('high-contrast-mode');
    } else {
      document.documentElement.classList.remove('high-contrast-mode');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('km_low_bandwidth', String(lowBandwidth));
  }, [lowBandwidth]);

  const increaseFontSize = () => {
    if (fontSize === 'normal') setFontSizeState('large');
    else if (fontSize === 'large') setFontSizeState('xlarge');
  };

  const decreaseFontSize = () => {
    if (fontSize === 'xlarge') setFontSizeState('large');
    else if (fontSize === 'large') setFontSizeState('normal');
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize: setFontSizeState,
        increaseFontSize,
        decreaseFontSize,
        highContrast,
        toggleHighContrast: () => setHighContrast(prev => !prev),
        lowBandwidth,
        toggleLowBandwidth: () => setLowBandwidth(prev => !prev)
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
