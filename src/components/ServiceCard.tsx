'use client'

import React from 'react'
import { Service } from '@/types'
import { ChevronRight } from 'lucide-react'

interface ServiceCardProps {
  service: Service
  onClick: () => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden" onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-8 border border-gray-100 dark:border-gray-800 rounded-2xl group-hover:border-purple-500 transition-all duration-300">
        <div className={`mb-6 bg-gradient-to-r ${service.color} p-4 rounded-xl inline-block`}>
          {service.icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
          {service.description}
        </p>
        
        <button className="inline-flex items-center text-purple-600 dark:text-purple-400 group-hover:text-purple-500 transition duration-300">
          Discover More 
          <ChevronRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}