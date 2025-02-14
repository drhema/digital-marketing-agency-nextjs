// src/components/Services.tsx
'use client'

import { Monitor, Fingerprint, Globe2 } from 'lucide-react'

interface ServiceProps {
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
}

interface ServicesProps {
  title: string
  services: {
    title: string
    description: string
    features: string[]
  }[]
}

const ServiceCard = ({ title, description, features, icon }: ServiceProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4 text-purple-600">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-600 dark:text-black-400 flex items-center">
            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Services({ title, services }: ServicesProps) {
  const icons = [
    <Monitor key="monitor" className="w-8 h-8" />,
    <Fingerprint key="fingerprint" className="w-8 h-8" />,
    <Globe2 key="globe" className="w-8 h-8" />
  ]

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              icon={icons[index]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}