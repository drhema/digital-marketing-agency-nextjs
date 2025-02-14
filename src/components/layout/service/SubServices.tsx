// src/components/layout/service/SubServices.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProcessedService } from '@/types/service';

interface SubServicesProps {
  service: ProcessedService;
  locale: string;
}

const SubServices = ({ service, locale }: SubServicesProps) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        {locale === 'ar' ? 'خدماتنا المتخصصة' : 'Specialized Services'}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {service.subServices?.map((subService) => (
          <Link
            key={subService.slug}
            href={`/${locale}/services/${service.slug}/${subService.slug}`}
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
                {subService.content.title}
              </h3>
              <p className="text-black-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                {subService.content.description}
              </p>
              <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                <span className="mr-2">Learn More</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SubServices;