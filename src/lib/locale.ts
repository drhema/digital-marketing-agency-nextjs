import { cookies } from 'next/headers'

export type Locale = 'en' | 'ar'

export function getCurrentLocale(): Locale {
  const cookieStore = cookies()
  return (cookieStore.get('locale')?.value || 'en') as Locale
}

export function isRTL(locale: Locale): boolean {
  return locale === 'ar'
}