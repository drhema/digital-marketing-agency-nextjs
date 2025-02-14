// src/components/ServicesMenu.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  slug: string;
  content: {
    title: string;
  };
  subServices?: Service[];
}

interface ServicesMenuProps {
  services: Service[];
  currentLocale: string;
}

export const ServicesMenu = ({ services, currentLocale }: ServicesMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Handle menu hover delays
  const handleMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveService(null);
    }, 150); // Small delay before closing
  };

  // Handle service hover
  const handleServiceEnter = (slug: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveService(slug);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMenuEnter}
      onMouseLeave={handleMenuLeave}
    >
      <button
        className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-purple-600 py-2"
      >
        <span>Services</span>
        <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 w-64 pt-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1">
              {services.map((service) => (
                <div 
                  key={service.slug}
                  className="relative group"
                  onMouseEnter={() => handleServiceEnter(service.slug)}
                >
                  <Link
                    href={`/${currentLocale}/services/${service.slug}/`}
                    className="flex items-center justify-between px-4 py-2 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <span className="text-gray-700 dark:text-gray-200 group-hover:text-purple-600 transition-colors duration-150">
                      {service.content.title}
                    </span>
                    {service.subServices && service.subServices.length > 0 && (
                      <ChevronDown className="w-4 h-4 -rotate-90" />
                    )}
                  </Link>
                  
                  {service.subServices && service.subServices.length > 0 && activeService === service.slug && (
                    <div className="absolute left-full top-0 w-64">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 ml-2"
                      >
                        {service.subServices.map((subService) => (
                          <Link
                            key={subService.slug}
                            href={`/${currentLocale}/services/${service.slug}/${subService.slug}/`}
                            className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 transition-colors duration-150"
                          >
                            {subService.content.title}
                          </Link>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};