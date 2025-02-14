// src/components/sections/ServiceHero.tsx
'use client';

import { motion } from 'framer-motion';

interface ServiceHeroProps {
  title: string;
  description: string;
  locale: string;
}

export function ServiceHero({ title, description, locale }: ServiceHeroProps) {
  const isRTL = locale === 'ar';

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex justify-center gap-6"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:scale-105 transform transition duration-300">
              {isRTL ? 'ابدأ الآن' : 'Get Started'}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 opacity-50" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>
    </section>
  );
}