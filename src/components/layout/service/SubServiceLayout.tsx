// src/components/layout/service/SubServiceLayout.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ServiceHero } from './sections/ServiceHero';
import { ServiceFeatures } from './sections/ServiceFeatures';
import { ServiceProcess } from './sections/ServiceProcess';
import { ServiceContent } from './sections/ServiceContent';
import { ServiceCTA } from './sections/ServiceCTA';
import type { ProcessedService } from '@/types/service';

interface SubServiceLayoutProps {
  service: ProcessedService;
  locale: string;
}

export const SubServiceLayout = ({ service, locale }: SubServiceLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-black-900 dark:text-white transition-colors duration-300">
      <ServiceHero
        title={service.content.title}
        description={service.content.description}
        locale={locale}
        isSubService={true}
      />

      {service.content.features && (
        <section className="py-20">
          <ServiceFeatures 
            features={service.content.features} 
            locale={locale}
          />
        </section>
      )}

      <ServiceProcess
        service={service}
        locale={locale}
        isSubService={true}
      />

      <ServiceContent
        content={service.content.content}
        locale={locale}
        isSubService={true}
      />

      <ServiceCTA locale={locale} />
    </div>
  );
};