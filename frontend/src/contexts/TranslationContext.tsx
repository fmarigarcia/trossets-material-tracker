'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { DictionaryKeys } from '@/dictionaries';

const TranslationContext = createContext<DictionaryKeys | null>(null);

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }
  return context;
}

interface TranslationProviderProps {
  children: ReactNode;
  dictionary: DictionaryKeys;
}

export function TranslationProvider({ children, dictionary }: TranslationProviderProps) {
  return <TranslationContext.Provider value={dictionary}>{children}</TranslationContext.Provider>;
}
