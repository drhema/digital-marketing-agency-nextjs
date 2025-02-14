// src/components/sections/TestimonialsSection.tsx
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface TestimonialsData {
  testimonials: {
    title: string;
    items: Testimonial[];
  };
}

const defaultTestimonials: TestimonialsData = {
  testimonials: {
    title: '',
    items: [{
      quote: "Example quote 1",
      name: "John Doe",
      designation: "CEO",
      src: "/testimonials/client1.jpg"
    }]
  }
}

export const TestimonialsSection = () => {
  const params = useParams()
  const [translations, setTranslations] = useState<TestimonialsData>(defaultTestimonials)

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const locale = params.locale as string
        const translationModule = await import(`@/translations/locales/${locale}/testimonials.json`)
        if (translationModule.default) {
          const items = translationModule.default.testimonials.items.map((item: Testimonial) => ({
            ...item,
            src: item.src.startsWith('/') ? item.src : `/${item.src}`
          }))
          setTranslations({
            ...translationModule.default,
            testimonials: {
              ...translationModule.default.testimonials,
              items
            }
          })
        }
      } catch (error) {
        console.error('Error loading translations:', error)
      }
    }

    loadTranslations()
  }, [params.locale])

  return (
    <section id="testimonials" className="relative py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          {translations.testimonials.title}
        </h2>
        <AnimatedTestimonials 
          testimonials={translations.testimonials.items}
          autoplay={true}
        />
      </div>
    </section>
  )
}