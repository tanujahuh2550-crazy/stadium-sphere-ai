import { en, type Translation, type TranslationKey } from "./translations/en";
import { es } from "./translations/es";
import { fr } from "./translations/fr";
import { de } from "./translations/de";
import { pt } from "./translations/pt";
import { ar } from "./translations/ar";
import { ja } from "./translations/ja";
import { ko } from "./translations/ko";
import { hi } from "./translations/hi";

export type { Translation, TranslationKey };

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "es", label: "Español", short: "ES", dir: "ltr" },
  { code: "fr", label: "Français", short: "FR", dir: "ltr" },
  { code: "de", label: "Deutsch", short: "DE", dir: "ltr" },
  { code: "pt", label: "Português", short: "PT", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" },
  { code: "ja", label: "日本語", short: "JA", dir: "ltr" },
  { code: "ko", label: "한국어", short: "KO", dir: "ltr" },
  { code: "hi", label: "हिन्दी", short: "HI", dir: "ltr" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

/** Add a language: drop a file in ./translations and register it below. */
export const TRANSLATIONS: Record<LanguageCode, Translation> = {
  en,
  es,
  fr,
  de,
  pt,
  ar,
  ja,
  ko,
  hi,
};

export const DEFAULT_LANGUAGE: LanguageCode = "en";
export const LANGUAGE_STORAGE_KEY = "stadiumsphere.language";

export function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === "string" && value in TRANSLATIONS;
}
