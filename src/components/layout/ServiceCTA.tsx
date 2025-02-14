'use client';

// src/components/layout/ServiceCTA.tsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ServiceCTAProps {
  locale: string;
}

export function ServiceCTA({ locale }: ServiceCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            {isRTL ? 'جاهز لتحويل حضورك الرقمي؟' : 'Ready to Transform Your Digital Presence?'}
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {isRTL 
              ? 'انضم إلى الثورة الرقمية وارتقِ بعلامتك التجارية إلى آفاق جديدة'
              : 'Join the digital revolution and elevate your brand to new heights'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transform transition duration-300"
            >
              {isRTL ? 'ابدأ رحلتك' : 'Start Your Journey'}
              <ArrowIcon className="w-5 h-5 ml-2" />
            </Link>

            <button
              onClick={() => {
                const el = document.getElementById('contact-form');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-full hover:bg-white/20 transition duration-300"
            >
              {isRTL ? 'تحدث مع خبير' : 'Talk to an Expert'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}