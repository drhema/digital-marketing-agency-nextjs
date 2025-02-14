// src/lib/content/service.ts
import { allServices } from 'contentlayer/generated';

export async function getServiceBySlug(
  slug: string,
  locale: 'en' | 'ar'
) {
  const service = allServices.find(s => s.slug === slug);
  if (!service) return null;

  const transformedService = {
    ...service,
    content: service[locale],
  };

  // If this is a main service, get its sub-services
  if (service.type === 'mainService') {
    const subServices = allServices
      .filter(s => s.parentService === service.slug)
      .map(s => ({
        ...s,
        content: s[locale],
      }));

    return {
      ...transformedService,
      subServices,
    };
  }

  return transformedService;
}

export async function getSubServiceBySlug(
  slug: string,
  locale: 'en' | 'ar'
) {
  const service = allServices.find(
    s => s.slug === slug && s.type === 'subService'
  );
  
  if (!service) return null;

  return {
    ...service,
    content: service[locale],
  };
}

export async function getServiceHierarchy(locale: 'en' | 'ar') {
  // Get all main services
  const mainServices = allServices
    .filter(service => service.type === 'mainService')
    .map(service => ({
      ...service,
      content: service[locale],
      subServices: allServices
        .filter(s => s.parentService === service.slug)
        .map(s => ({
          ...s,
          content: s[locale],
        })),
    }));

  return mainServices;
}

export async function getServicePaths() {
  const paths = {
    services: [] as { locale: string; serviceSlug: string }[],
    subServices: [] as { locale: string; serviceSlug: string; subServiceSlug: string }[],
  };

  const locales = ['en', 'ar'];

  // Add main service paths
  const mainServices = allServices.filter(service => service.type === 'mainService');
  for (const service of mainServices) {
    for (const locale of locales) {
      paths.services.push({ locale, serviceSlug: service.slug });
    }
  }

  // Add sub-service paths
  const subServices = allServices.filter(service => service.type === 'subService');
  for (const service of subServices) {
    if (service.parentService) {
      for (const locale of locales) {
        paths.subServices.push({
          locale,
          serviceSlug: service.parentService,
          subServiceSlug: service.slug,
        });
      }
    }
  }

  return paths;
}