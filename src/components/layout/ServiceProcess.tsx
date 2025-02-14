'use client';

// src/components/layout/ServiceProcess.tsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Target, Zap, Award } from 'lucide-react';

interface ProcessStep {
  title: string;
  description: string;
  icon?: string;
}

interface ServiceProcessProps {
  process: ProcessStep[];
  locale: string;
}

const processIcons = {
  1: Rocket,
  2: Target,
  3: Zap,
  4: Award,
};

export function ServiceProcess({ process, locale }: ServiceProcessProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        >
          {locale === 'ar' ? 'مراحل العمل' : 'Our Process'}
        </motion.h2>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-purple-600 to-transparent" />

          <div className="space-y-24">
            {process.map((step, index) => {
              const Icon = processIcons[index + 1] || Rocket;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex ${isEven ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-1/2 ${isEven ? 'pr-12' : 'pl-12'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white transform -translate-x-1/2">
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}