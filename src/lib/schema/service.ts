// src/lib/schema/service.ts
export interface ServiceSchemaData {
  name: string;
  description: string;
  serviceType: string;
  category: string;
  url: string;
  offers?: {
    name: string;
    description: string;
  }[];
}

export function generateServiceSchema(data: ServiceSchemaData, isSubService: boolean = false) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mu3lnen.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name,
    "description": data.description,
    "serviceType": data.serviceType,
    "category": data.category,
    "url": data.url,
    "areaServed": {
      "@type": "Country",
      "name": "Kuwait",
      "sameAs": "https://en.wikipedia.org/wiki/Kuwait"
    },
    "provider": {
      "@type": "Organization",
      "name": "Mu3lnen Digital Marketing Agency",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kuwait City",
        "addressLocality": "Kuwait City",
        "addressRegion": "Al Asimah",
        "addressCountry": "KW"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+965-XXXX-XXXX",
        "contactType": "customer service",
        "email": "info@mu3lnen.com",
        "availableLanguage": ["English", "Arabic"]
      }
    },
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "KWD",
        "priceRange": "$$$"
      },
      "availability": "https://schema.org/InStock"
    },
    ...(data.offers && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": data.serviceType,
        "itemListElement": data.offers.map(offer => ({
          "@type": "Offer",
          "name": offer.name,
          "description": offer.description
        }))
      }
    }),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "85"
    },
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/mu3lnen",
      "https://www.instagram.com/mu3lnen",
      "https://twitter.com/mu3lnen"
    ],
    "image": [
      `${baseUrl}/images/digital-marketing-kuwait.jpg`
    ]
  };
}