// src/components/layout/service/MainServiceLayout.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ServiceHero } from './sections/ServiceHero';
import { ServiceFeatures } from './sections/ServiceFeatures';
import { ServiceProcess } from './sections/ServiceProcess';
import { SubServicesList } from './sections/SubServicesList';
import { ServiceContent } from './sections/ServiceContent';
import { ServiceCTA } from './sections/ServiceCTA';
import type { ProcessedService } from '@/types/service';

interface MainServiceLayoutProps {
  service: ProcessedService;
  locale: string;
}

export const MainServiceLayout = ({ service, locale }: MainServiceLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <ServiceHero
        title={service.content.title}
        description={service.content.description}
        locale={locale}
      />

      {service.content.features && (
        <section className="py-20">
          <ServiceFeatures 
            features={service.content.features} 
            locale={locale}
          />
        </section>
      )}

      {service.subServices && service.subServices.length > 0 && (
        <section className="py-20 bg-gray-100/50 dark:bg-black/50 transition-colors duration-300">
          <SubServicesList
            services={service.subServices}
            parentSlug={service.slug}
            locale={locale}
          />
        </section>
      )}

      <ServiceProcess
        service={service}
        locale={locale}
      />

      <ServiceContent
        content={service.content.content}
        locale={locale}
      />

      <ServiceCTA locale={locale} />
    </div>
  );
};
