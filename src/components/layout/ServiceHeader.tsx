'use client';

// src/components/layout/ServiceHeader.tsx
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceHeaderProps {
  title: string;
  description: string;
  locale: string;
}

export function ServiceHeader({ title, description, locale }: ServiceHeaderProps) {
  const isRTL = locale === 'ar';
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
      >
        <div className="text-center">
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
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transform transition duration-300"
            >
              {locale === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              <ChevronIcon className="w-5 h-5 ml-2" />
            </Link>

            <button
              onClick={() => {
                const contactForm = document.getElementById('contact-form');
                contactForm?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            >
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated background elements */}
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
    </div>
  );
}