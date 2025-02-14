// src/types/service.ts

export type Locale = 'en' | 'ar';

export type ServiceType = 'mainService' | 'subService';

export interface ServiceMetadata {
  metaTitle: string;
  metaDescription: string;
  openGraph: {
    title: string;
    description: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitterCard: {
    title: string;
    description: string;
    image: string;
    cardType: 'summary_large_image' | 'summary';
  };
}

export interface ServiceContent {
  title: string;
  description: string;
  metadata: ServiceMetadata;
  content: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  process?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  caseStudies?: Array<{
    title: string;
    description: string;
    metrics: Array<{
      label: string;
      value: string;
    }>;
  }>;
}

export interface ServiceData {
  type: ServiceType;
  slug: string;
  parentService?: string;
  locales: Record<Locale, ServiceContent>;
}

export interface ServicePageProps {
  params: {
    locale: Locale;
    serviceSlug?: string;
    subServiceSlug?: string;
  };
}

export interface ProcessedService {
  type: ServiceType;
  slug: string;
  parentService?: string;
  content: ServiceContent;
  subServices?: Array<ProcessedService>;
}

// Navigation type for breadcrumbs and menu
export interface ServiceNavigation {
  title: string;
  slug: string;
  type: ServiceType;
  children?: ServiceNavigation[];
}