// src/components/sections/ServicesSection.tsx
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ServiceCard } from '../ServiceCard'
import type { Service } from '@/types/types'
import { Monitor, Fingerprint, Globe2, BarChart3, MessageCircle, Sparkles } from 'lucide-react'

export interface ServicesSectionProps {
  onSelectService: (service: Service | null) => void;
}

// Define interface for translations structure
interface ServiceTranslation {
  title: string;
  description: string;
}

interface ServicesTranslations {
  services: {
    title: string;
    items: {
      [key: string]: ServiceTranslation;
    };
  };
}

const serviceConfig = {
  digitalInnovation: {
    icon: <Monitor className="w-12 h-12" />,
    color: "from-pink-500 to-purple-500"
  },
  brandEvolution: {
    icon: <Fingerprint className="w-12 h-12" />,
    color: "from-blue-500 to-cyan-500"
  },
  socialAmplification: {
    icon: <Globe2 className="w-12 h-12" />,
    color: "from-green-500 to-emerald-500"
  },
  contentArchitecture: {
    icon: <MessageCircle className="w-12 h-12" />,
    color: "from-orange-500 to-red-500"
  },
  performanceMarketing: {
    icon: <BarChart3 className="w-12 h-12" />,
    color: "from-violet-500 to-purple-500"
  },
  digitalExperience: {
    icon: <Sparkles className="w-12 h-12" />,
    color: "from-indigo-500 to-blue-500"
  }
} as const;

const defaultTranslations: ServicesTranslations = {
  services: {
    title: "Our Services",
    items: {
      digitalInnovation: {
        title: "Digital Innovation",
        description: "Pioneering digital solutions that transform brands in the Kuwait market"
      },
      brandEvolution: {
        title: "Brand Evolution",
        description: "Evolving your brand identity for the digital age with cutting-edge strategies"
      },
      socialAmplification: {
        title: "Social Amplification",
        description: "Maximizing your social presence with data-driven engagement strategies"
      },
      contentArchitecture: {
        title: "Content Architecture",
        description: "Building compelling content ecosystems that drive engagement"
      },
      performanceMarketing: {
        title: "Performance Marketing",
        description: "Data-driven campaigns that deliver measurable results"
      },
      digitalExperience: {
        title: "Digital Experience",
        description: "Creating immersive digital experiences that captivate and convert"
      }
    }
  }
}

export const ServicesSection = ({ onSelectService }: ServicesSectionProps) => {
  const params = useParams()
  const [translations, setTranslations] = useState<ServicesTranslations>(defaultTranslations)

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const locale = params.locale as string
        const translationModule = await import(`@/translations/locales/${locale}/home.json`)
        if (translationModule.default) {
          setTranslations(translationModule.default)
        }
      } catch (error) {
        console.error('Error loading translations:', error)
        setTranslations(defaultTranslations)
      }
    }

    loadTranslations()
  }, [params.locale])

  const services = Object.entries(translations.services.items).map(([key, value], index) => ({
    id: index + 1,
    title: value.title,
    description: value.description,
    icon: serviceConfig[key as keyof typeof serviceConfig].icon,
    color: serviceConfig[key as keyof typeof serviceConfig].color,
    features: []
  }))

  return (
    <section id="services" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          {translations.services.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => onSelectService(service)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}