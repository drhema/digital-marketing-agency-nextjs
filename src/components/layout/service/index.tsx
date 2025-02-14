// src/components/layout/service/index.tsx
'use client';

import { useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import type { ProcessedService } from '@/types/service';
import Hero from './Hero';
import Features from './Features';
import Process from './Process';
import Content from './Content';
import SubServices from './SubServices';
import CTA from './CTA';

interface ServiceLayoutProps {
  service: ProcessedService;
  locale: string;
}

const ServiceLayout = ({ service, locale }: ServiceLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-900">
      <Hero service={service} locale={locale} />
      
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        <Features service={service} />
        <Process service={service} locale={locale} />
        <Content service={service} />
        {service.type === 'mainService' && service.subServices?.length > 0 && (
          <SubServices service={service} locale={locale} />
        )}
        <CTA />
      </main>
    </div>
  );
};

export default ServiceLayout;