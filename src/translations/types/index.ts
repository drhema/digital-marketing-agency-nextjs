// src/translations/types/index.ts

export type LocaleType = 'en' | 'ar'

// Common translations used across multiple pages
export interface CommonTranslations {
  navigation: {
    home: string
    seoServices: string
    socialMedia: string
    paidAdvertising: string
    ecommerce: string
    contentMarketing: string
    webDevelopment: string
  }
  buttons: {
    learnMore: string
    contactUs: string
    getStarted: string
    readMore: string
  }
}

// Homepage translations
export interface HomeTranslations {
  hero: {
    title: string
    subtitle: string
    cta: string
  }
  services: {
    title: string
    digitalInnovation: {
      title: string
      description: string
      features: string[]
    }
    brandEvolution: {
      title: string
      description: string
      features: string[]
    }
    socialAmplification: {
      title: string
      description: string
      features: string[]
    }
  }
  why: {
    title: string
    items: Array<{
      title: string
      description: string
    }>
  }
  cta: {
    title: string
    subtitle: string
    button: string
  }
}

// Combine all translations
export interface Translations {
  common: CommonTranslations
  home: HomeTranslations
}