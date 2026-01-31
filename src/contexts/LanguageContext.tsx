import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { translations } from '../services/translations';
import { type Country, COUNTRIES } from '../types';

export interface LanguageContextType {
  currentCountry: Country;
  setCountry: (country: Country) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCountry, setCurrentCountry] = useState<Country>(COUNTRIES[0]); // Default US

  const t = (path: string) => {
    const keys = path.split('.');
    let current = translations[currentCountry.langCode];
    
    // Fallback to English if language not found
    if (!current) current = translations['en'];

    for (const key of keys) {
      if (current[key]) {
        current = current[key];
      } else {
        // Fallback to English key if specific key missing
        return translations['en'][keys[0]]?.[keys[1]] || path;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ currentCountry, setCountry: setCurrentCountry, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
