import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_STORAGE_KEY,
  TRANSLATIONS,
  isLanguageCode,
  type LanguageCode,
  type TranslationKey,
} from "@/i18n";

export interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: TranslationKey) => string;
  dir: "ltr" | "rtl";
  /** Bumps on every language change — use as a React key to replay fade transitions. */
  transitionKey: number;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [transitionKey, setTransitionKey] = useState(0);

  // Restore after hydration so SSR markup always matches the English default.
  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguageCode(stored) && stored !== DEFAULT_LANGUAGE) {
      setLanguageState(stored);
      setTransitionKey((k) => k + 1);
    }
  }, []);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState((prev) => (prev === code ? prev : code));
    setTransitionKey((k) => k + 1);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    } catch {
      /* storage unavailable — language still applies for this session */
    }
  }, []);

  const dir = (LANGUAGES.find((l) => l.code === language)?.dir ?? "ltr") as "ltr" | "rtl";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = TRANSLATIONS[language];
    return {
      language,
      setLanguage,
      dir,
      transitionKey,
      t: (key: TranslationKey) => dict[key] ?? TRANSLATIONS.en[key] ?? key,
    };
  }, [language, setLanguage, dir, transitionKey]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
