import 'server-only';
import type { Locale } from '@/middleware';

// Dictionary type based on the structure of our translations
type Dictionary = typeof import('./en.json');

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default as Dictionary),
  es: () => import('./es.json').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};

// Type for accessing nested dictionary keys
export type DictionaryKeys = Dictionary;
