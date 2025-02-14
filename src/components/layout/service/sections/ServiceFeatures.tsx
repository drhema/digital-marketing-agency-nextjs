// src/components/layout/service/sections/ServiceFeatures.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  features: Feature[];
  locale: string;
}

export const ServiceFeatures = ({ features, locale }: ServiceFeaturesProps) => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        {locale === 'ar' ? 'مميزات الخدمة' : 'Our Features'}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white dark:bg-gray-800/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            
            <h3 className="relative text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
              {feature.title}
            </h3>
            
            <p className="relative text-black-400 group-hover:text-gray-300 transition-colors duration-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};