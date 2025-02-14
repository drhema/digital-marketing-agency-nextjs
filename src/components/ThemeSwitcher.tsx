'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    // Set initial theme if not set
    if (!theme) {
      setTheme('dark')
    }
  }, [theme, setTheme])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-purple-600" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  )
}
