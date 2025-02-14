// src/app/[locale]/services/[serviceSlug]/[subServiceSlug]/page.tsx
export const runtime = 'edge';

import { Metadata } from 'next';
import { allServices } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { SubServiceLayout } from '@/components/layout/service/SubServiceLayout';
import { generateServiceSchema } from '@/lib/schema/service';
import type { ProcessedService } from '@/types/service';

interface Props {
  params: {
    locale: string;
    serviceSlug: string;
    subServiceSlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const subService = allServices.find(
    service => 
      service.slug === params.subServiceSlug && 
      service.parentService === params.serviceSlug
  );

  if (!subService) return { title: 'Not Found' };

  const content = subService[locale];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mu3lnen.com';
  const url = `${baseUrl}/${locale}/services/${params.serviceSlug}/${params.subServiceSlug}`;

  return {
    title: content.metadata.metaTitle,
    description: content.metadata.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en/services/${params.serviceSlug}/${params.subServiceSlug}`,
        'ar': `${baseUrl}/ar/services/${params.serviceSlug}/${params.subServiceSlug}`,
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

export default async function SubServicePage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  
  const subService = allServices.find(
    service => 
      service.slug === params.subServiceSlug && 
      service.parentService === params.serviceSlug
  );

  if (!subService) notFound();

  const processedService = {
    ...subService,
    content: subService[locale],
    type: 'subService'
  };

  // Generate schema
  const serviceSchema = generateServiceSchema({
    name: processedService.content.title,
    description: processedService.content.description,
    serviceType: processedService.content.title,
    category: 'Digital Marketing',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/${params.serviceSlug}/${params.subServiceSlug}`,
  }, true);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SubServiceLayout service={processedService} locale={locale} />
    </>
  );
}