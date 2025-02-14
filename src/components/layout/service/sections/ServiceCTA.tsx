// src/components/layout/service/sections/ServiceCTA.tsx
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceCTAProps {
  locale: string;
}

export const ServiceCTA = ({ locale }: ServiceCTAProps) => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            {locale === 'ar' ? 'جاهز لتحويل حضورك الرقمي؟' : 'Ready to Transform Your Digital Presence?'}
          </h2>
          
          <p className="text-xl text-black-300">
            {locale === 'ar' 
              ? 'انضم إلى الثورة الرقمية وارتقِ بعلامتك التجارية إلى آفاق جديدة'
              : 'Join the digital revolution and elevate your brand to new heights'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:scale-105 transform transition duration-300">
              {locale === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey'}
            </button>

            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/20 transition-colors">
              {locale === 'ar' ? 'تحدث مع خبير' : 'Talk to an Expert'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};