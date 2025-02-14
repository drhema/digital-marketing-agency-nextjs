// src/lib/seo-utils.ts
import { headers } from 'next/headers';
import { Metadata } from 'next';

export const getMetadataBase = (): string => {
  const host = headers().get('host') || 'mu3lnen.com';
  return `https://${host.replace(/\/$/, '')}`;
};

export const defaultOpenGraph = {
  images: ['/office-image.jpg'],
  type: 'website',
};

export const getLocalizedMetadata = (
  locale: string,
  pageName: string = 'home'
): Metadata => {
  const isArabic = locale === 'ar';
  const metadataBase = getMetadataBase();

  const titles = {
    home: {
      en: 'Mu3lnen - Leading Digital Marketing Agency in Kuwait',
      ar: 'موصلنين - وكالة التسويق الرقمي الرائدة في الكويت',
    },
  };

  const descriptions = {
    home: {
      en: 'Mu3lnen is Kuwait\'s premier digital marketing agency, offering SEO, social media marketing, web design, and paid advertising services.',
      ar: 'موصلنين هي وكالة التسويق الرقمي الرائدة في الكويت، نقدم خدمات تحسين محركات البحث، التسويق عبر وسائل التواصل الاجتماعي، تصميم المواقع والإعلانات المدفوعة.',
    },
  };

  return {
    metadataBase: new URL(metadataBase),
    title: titles[pageName][isArabic ? 'ar' : 'en'],
    description: descriptions[pageName][isArabic ? 'ar' : 'en'],
    
    openGraph: {
      title: titles[pageName][isArabic ? 'ar' : 'en'],
      description: descriptions[pageName][isArabic ? 'ar' : 'en'],
      url: `${metadataBase}/${locale}/`,
      ...defaultOpenGraph,
    },

    alternates: {
      canonical: `${metadataBase}/${locale}/`,
      languages: {
        'en': `${metadataBase}/en/`,
        'ar': `${metadataBase}/ar/`,
      },
    },
  };
};