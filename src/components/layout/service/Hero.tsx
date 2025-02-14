// src/components/layout/service/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import type { ProcessedService } from '@/types/service';

interface HeroProps {
  service: ProcessedService;
  locale: string;
}

const Hero = ({ service, locale }: HeroProps) => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="relative py-20 px-4">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/5 to-pink-600/5 backdrop-blur-sm" />
          <div className="relative max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
            >
              {service.content.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 mb-8"
            >
              {service.content.description}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
                Get Started
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-colors">
                Contact Us
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;