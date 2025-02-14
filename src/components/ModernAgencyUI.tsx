// src/components/ModernAgencyUI.tsx
'use client';

import { useState, useEffect } from 'react';
import { Hero } from './Hero';
import { ServicesSection } from './sections/ServicesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { TrustedCompaniesSection } from './sections/TrustedCompaniesSection';
import { CTASection } from './sections/CTASection';
import { NavigationDots } from './NavigationDots';
import type { Service, BackgroundCircle } from '@/types/types';

const ModernAgencyUI = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [backgroundCircles, setBackgroundCircles] = useState<BackgroundCircle[]>([]);

  useEffect(() => {
    setMounted(true);
    setBackgroundCircles(
      Array(20).fill(0).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: Math.random() * 300,
        height: Math.random() * 300,
        color: [
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255)
        ]
      }))
    );
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      const sections = ['hero', 'services', 'testimonials', 'trusted-companies', 'cta'];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const handleServiceSelect = (service: Service | null) => {
    setSelectedService(service);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black">
        <div className="absolute inset-0 opacity-30">
          {backgroundCircles.map((circle) => (
            <div
              key={circle.id}
              className="absolute rounded-full"
              style={{
                left: circle.left,
                top: circle.top,
                width: `${circle.width}px`,
                height: `${circle.height}px`,
                background: `radial-gradient(circle, rgba(${circle.color.join(',')}, 0.1) 0%, transparent 70%)`,
                transform: `translate(-50%, -50%) scale(${1 + Math.sin(scrollPosition / 1000 + circle.id) * 0.2})`,
                transition: 'transform 0.5s ease-out',
              }}
            />
          ))}
        </div>
      </div>

      <main className="relative">
        <Hero />
        <ServicesSection 
          onSelectService={handleServiceSelect}
        />
        <TestimonialsSection />
        <TrustedCompaniesSection />
        <CTASection />
      </main>
      <NavigationDots
        activeSection={activeSection}
        onSectionClick={(sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
};

export default ModernAgencyUI;