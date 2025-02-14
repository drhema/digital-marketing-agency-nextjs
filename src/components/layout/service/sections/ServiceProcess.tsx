// src/components/layout/service/sections/ServiceProcess.tsx
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import type { ProcessedService } from '@/types/service';

interface ServiceProcessProps {
  service: ProcessedService;
  locale: string;
  isSubService?: boolean;
}

export const ServiceProcess = ({ service, locale, isSubService }: ServiceProcessProps) => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true });

  // Default process steps if not provided
  const defaultSteps = [
    {
      title: locale === 'ar' ? 'التحليل' : 'Analysis',
      description: locale === 'ar' ? 'تحليل شامل للوضع الحالي' : 'Comprehensive analysis of your current situation',
      items: [
        locale === 'ar' ? 'بحث السوق' : 'Market research',
        locale === 'ar' ? 'تحليل المنافسين' : 'Competitor analysis',
        locale === 'ar' ? 'تدقيق الأداء' : 'Performance audit'
      ]
    },
    // Add other default steps...
  ];

  const processSteps = service.content.processSteps || defaultSteps;

  return (
    <section ref={containerRef} className="py-20 bg-gray-50 dark:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
        >
          {locale === 'ar' ? 'عمليتنا' : 'Our Process'}
        </motion.h2>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[50%] top-0 h-full w-px bg-gradient-to-b from-purple-500/50 to-transparent" />

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                  <div className="bg-white dark:bg-white/5 backdrop-blur-lg border border-gray-100 dark:border-white/10 rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>

                    <p className="text-black-400 mb-6">{step.description}</p>

                    {step.items && (
                      <ul className="space-y-3">
                        {step.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-3 text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};