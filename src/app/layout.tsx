import '@/styles/globals.css'
import { Inter, Cairo } from 'next/font/google'
import { Providers } from './providers'
import { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
})

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-arabic',
})

export const metadata: Metadata = {
  title: 'Mu3lnen Digital Agency',
  description: 'Kuwait\'s Premier Digital Marketing Agency',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
