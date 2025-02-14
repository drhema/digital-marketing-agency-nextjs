// src/components/layout/service/sections/SubServicesList.tsx
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ProcessedService } from '@/types/service';

interface SubServicesListProps {
  services: ProcessedService[];
  parentSlug: string;
  locale: string;
}

export const SubServicesList = ({ services, parentSlug, locale }: SubServicesListProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        {locale === 'ar' ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link 
            key={service.slug}
            href={`/${locale}/services/${parentSlug}/${service.slug}`}
            className="group"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="relative overflow-hidden bg-white dark:bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
                {service.content.title}
              </h3>
              
              <p className="text-black-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                {service.content.description}
              </p>
              
              <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                <span className="mr-2">
                  {locale === 'ar' ? 'اكتشف المزيد' : 'Learn More'}
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
