'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Languages } from 'lucide-react'

export const LanguageSwitcher = ({ currentLocale }: { currentLocale: string }) => {
  const router = useRouter()
  const pathname = usePathname()

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en'
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Switch language"
    >
      <Languages className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      <span className="ms-2 text-sm font-medium">{currentLocale.toUpperCase()}</span>
    </button>
  )
}
