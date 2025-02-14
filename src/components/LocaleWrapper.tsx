'use client'

import { ReactNode } from 'react'

type Locale = 'en' | 'ar'

interface Props {
  locale: Locale
  children: ReactNode
}

export function LocaleWrapper({ locale, children }: Props) {
  return (
    <div 
      className={locale === 'ar' ? 'font-arabic' : 'font-primary'}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {children}
    </div>
  )
}