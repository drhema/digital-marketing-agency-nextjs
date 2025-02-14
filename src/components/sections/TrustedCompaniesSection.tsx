'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logos3 } from '@/components/ui/logos3';

const defaultTranslations = {
  trustedCompanies: {
    title: "Trusted by Leading Companies",
    companies: [
      {
        id: "company-1",
        description: "Company 1",
        image: "/companies/company1.svg"
      },
      {
        id: "company-2",
        description: "Company 2",
        image: "/companies/company2.svg"
      }
      // Add more companies
    ]
  }
};

export const TrustedCompaniesSection = () => {
  const params = useParams();
  const [translations, setTranslations] = useState(defaultTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const locale = params.locale as string;
        const translationModule = await import(`@/translations/locales/${locale}/companies.json`);
        if (translationModule.default) {
          setTranslations(translationModule.default);
        }
      } catch (error) {
        console.error('Error loading translations:', error);
        setTranslations(defaultTranslations);
      }
    };

    loadTranslations();
  }, [params.locale]);

  return (
    <section id="trusted-companies" className="relative">
      <Logos3
        heading={translations.trustedCompanies.title}
        logos={translations.trustedCompanies.companies.map(company => ({
          ...company,
          className: "h-7 w-auto"
        }))}
      />
    </section>
  );
};