import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from './i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('resumetools-lang');
    if (saved) return saved;
    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('vi')) return 'vi';
    if (browserLang.startsWith('id') || browserLang.startsWith('ms')) return 'id';
    if (browserLang.startsWith('zh')) return 'zh';
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('resumetools-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key, ...args) => {
    const str = translations[lang]?.[key] || translations.en?.[key] || translations.ja?.[key] || key;
    if (args.length === 0) return str;
    return str.replace(/\{(\d+)\}/g, (_, i) => args[Number(i)] ?? '');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
