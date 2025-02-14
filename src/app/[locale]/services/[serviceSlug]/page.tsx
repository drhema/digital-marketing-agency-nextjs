// src/app/[locale]/services/[serviceSlug]/page.tsx
export const runtime = 'edge';

import { Metadata } from 'next';
import { allServices } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { MainServiceLayout } from '@/components/layout/service/MainServiceLayout';
import { generateServiceSchema } from '@/lib/schema/service';
import type { ProcessedService } from '@/types/service';

interface Props {
  params: {
    locale: string;
    serviceSlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const service = allServices.find(
    s => s.slug === params.serviceSlug && !s.parentService
  );

  if (!service) return { title: 'Not Found' };

  const content = service[locale];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mu3lnen.com';
  const url = `${baseUrl}/${locale}/services/${service.slug}`;

  return {
    title: content.metadata.metaTitle,
    description: content.metadata.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en/services/${service.slug}`,
        'ar': `${baseUrl}/ar/services/${service.slug}`,
      },
    },
    openGraph: {
      ...content.metadata.openGraph,
      url,
      type: 'website',
      locale,
      alternateLocale: locale === 'ar' ? 'en' : 'ar',
    },
    twitter: content.metadata.twitterCard,
  };
}

export default async function ServicePage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  
  const service = allServices.find(
    s => s.slug === params.serviceSlug && !s.parentService
  );

  if (!service) notFound();

  // Get sub-services if any
  const subServices = allServices
    .filter(s => s.parentService === service.slug)
    .map(s => ({
      ...s,
      content: s[locale]
    }));

  const processedService = {
    ...service,
    content: service[locale],
    subServices: subServices.length > 0 ? subServices : undefined
  };

  // Generate schema
  const serviceSchema = generateServiceSchema({
    name: processedService.content.title,
    description: processedService.content.description,
    serviceType: 'Digital Marketing Services',
    category: 'Digital Marketing',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/${service.slug}`,
    offers: subServices?.map(s => ({
      name: s.content.title,
      description: s.content.description
    }))
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <MainServiceLayout service={processedService} locale={locale} />
    </>
  );
}