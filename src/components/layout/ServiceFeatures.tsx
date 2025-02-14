'use client';

// src/components/layout/ServiceFeatures.tsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface ServiceFeaturesProps {
  features: Feature[];
  locale: string;
}

export function ServiceFeatures({ features, locale }: ServiceFeaturesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        >
          {locale === 'ar' ? 'مميزات الخدمة' : 'Service Features'}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {feature.icon && (
                  <div className="mb-4 text-purple-600 dark:text-purple-400">
                    {/* You can implement a dynamic icon component here */}
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}