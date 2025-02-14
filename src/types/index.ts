export type Locale = 'en' | 'ar'

export interface LayoutProps {
  children: React.ReactNode
  params: {
    locale: Locale
  }
}

export interface Service {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
  features: string[]
}

export interface BackgroundCircle {
  id: number
  left: string
  top: string
  width: number
  height: number
  color: [number, number, number]
}

export type Section = 'hero' | 'services' | 'testimonials' | 'trusted-companies' | 'cta'