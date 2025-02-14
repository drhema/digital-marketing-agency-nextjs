// src/components/layout/service/sections/ServiceHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceHeroProps {
  title: string;
  description: string;
  locale: string;
  isSubService?: boolean;
}

export const ServiceHero = ({ 
  title, 
  description, 
  locale,
  isSubService 
}: ServiceHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Container to center and constrain the gradient background */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-3xl rounded-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              {title}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-12"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-6"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:scale-105 transform transition duration-300">
              {locale === 'ar' ? 'ابدأ الآن' : 'Get Started'}
            </button>
            
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-gray-900 dark:text-white rounded-full font-bold hover:bg-white/20 transition-colors">
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};