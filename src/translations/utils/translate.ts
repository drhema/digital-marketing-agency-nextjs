// src/translations/utils/translate.ts
import 'server-only';
import type { Locale } from '@/types/next';
import { Translation, Dictionary } from '@/translations/types';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('../locales/en/common.json').then((module) => module.default),
  ar: () => import('../locales/ar/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  try {
    return (await dictionaries[locale]()) ;
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error);
    // Fallback to English if the requested locale fails
    return (await dictionaries['en']()) ;
  }
};

