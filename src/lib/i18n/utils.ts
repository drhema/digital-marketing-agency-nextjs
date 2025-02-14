// src/lib/i18n/utils.ts

export const defaultLocale = 'en';
export const locales = ['en', 'ar'] as const;
export type ValidLocale = typeof locales[number];

export function getValidLocale(locale: string | undefined): ValidLocale {
  if (!locale) return defaultLocale;
  return locales.includes(locale as ValidLocale) ? (locale as ValidLocale) : defaultLocale;
}