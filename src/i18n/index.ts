export type Language = 'es' | 'en' | 'fr' | 'pt' | 'zh' | 'ja' | 'de';

export const LANGUAGE_NAMES: Record<Language, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  pt: 'Português',
  zh: '中文',
  ja: '日本語',
  de: 'Deutsch',
};

export const LANGUAGE_SHORT: Record<Language, string> = {
  es: 'ES',
  en: 'EN',
  fr: 'FR',
  pt: 'PT',
  zh: '中',
  ja: '日',
  de: 'DE',
};

export type TranslationDict = Partial<Record<Language, string>>;
export type Entry = string | TranslationDict;
export type MasterDict = Record<string, Entry>;

const STORAGE_KEY = 'codechronicles:v1:lang';

let dict: MasterDict = {};
let lang: Language = 'es';
const subscribers = new Set<() => void>();

export function loadSavedLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language;
    if (saved && saved in LANGUAGE_NAMES) return saved;
  } catch {}
  return 'es';
}

export function initI18n(
  master: MasterDict,
  initialLang: Language = 'es',
): void {
  dict = master;
  lang = initialLang;
  applyDocumentLang();
}


export function getLanguage(): Language {
  return lang;
}

export function setLanguage(next: Language): void {
  if (next === lang) return;
  lang = next;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  applyDocumentLang();
  subscribers.forEach((fn) => fn());
}

export function onLanguageChange(fn: () => void): () => void {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

export function tr(key: string, fallback?: string): string {
  const entry = dict[key];
  if (!entry) return fallback ?? key;
  if (typeof entry === 'string') return entry;
  return entry[lang] ?? entry['es'] ?? fallback ?? key;
}

function applyDocumentLang(): void {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
}
