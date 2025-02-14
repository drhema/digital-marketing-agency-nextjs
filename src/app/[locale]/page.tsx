export const runtime = 'edge';

import { Metadata } from 'next';
import ModernAgencyUI from '@/components/ModernAgencyUI';

interface Props {
  params: { locale: string };
}

// Generate schema based on locale
const generateSchema = (metadataBase: string, isArabic: boolean) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${metadataBase}/#organization`,
      "name": isArabic ? "موصلنين" : "Mu3lnen Digital Marketing Agency",
      "url": metadataBase,
      "logo": {
        "@type": "ImageObject",
        "@id": `${metadataBase}/#logo`,
        "url": `${metadataBase}/logo.png`,
        "contentUrl": `${metadataBase}/logo.png`,
        "width": 112,
        "height": 112,
        "caption": isArabic ? "شعار موصلنين" : "Mu3lnen Logo"
      },
      "sameAs": [
        "https://www.facebook.com/mu3lnen",
        "https://twitter.com/mu3lnen",
        "https://www.instagram.com/mu3lnen",
        "https://www.linkedin.com/company/mu3lnen"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+965-XXXX-XXXX",
        "contactType": "customer service",
        "areaServed": "KW",
        "availableLanguage": ["English", "Arabic"]
      }
    },
    {
      "@type": "WebSite",
      "@id": `${metadataBase}/#website`,
      "url": metadataBase,
      "name": isArabic ? "موصلنين" : "Mu3lnen Digital Marketing Agency",
      "description": isArabic 
        ? "وكالة التسويق الرقمي الرائدة في الكويت"
        : "Kuwait's Leading Digital Marketing Agency",
      "publisher": {
        "@id": `${metadataBase}/#organization`
      },
      "inLanguage": ["en", "ar"]
    },
    {
      "@type": "LocalBusiness",
      "@id": `${metadataBase}/#localbusiness`,
      "name": isArabic ? "موصلنين" : "Mu3lnen Digital Marketing Agency",
      "url": metadataBase,
      "logo": {
        "@id": `${metadataBase}/#logo`
      },
      "image": `${metadataBase}/office-image.jpg`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kuwait City",
        "addressLocality": "Kuwait City",
        "addressRegion": "Al Asimah",
        "postalCode": "12345",
        "addressCountry": "KW"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 29.3759,
        "longitude": 47.9774
      },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "09:00",
        "closes": "18:00"
      }],
      "priceRange": "$$$$",
      "serviceArea": {
        "@type": "AdministrativeArea",
        "name": "Kuwait"
      }
    }
  ]
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isArabic = params.locale === 'ar';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mu3lnen.com';

  return {
    metadataBase: new URL(baseUrl),
    title: isArabic 
      ? 'موصلنين - وكالة التسويق الرقمي الرائدة في الكويت'
      : 'Mu3lnen - Leading Digital Marketing Agency in Kuwait',
    description: isArabic
      ? 'وكالة التسويق الرقمي الرائدة في الكويت، نقدم حلولاً رقمية مبتكرة'
      : "Kuwait's leading digital marketing agency, delivering innovative digital solutions",
    openGraph: {
      type: 'website',
      siteName: isArabic ? 'موصلنين' : 'Mu3lnen',
      locale: params.locale,
      alternateLocale: params.locale === 'ar' ? 'en' : 'ar',
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'ar': `${baseUrl}/ar`,
      },
    },
  };
}

function JsonLd({ schema }: { schema: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HomePage({ params }: Props) {
  const isArabic = params.locale === 'ar';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mu3lnen.com';
  const schema = generateSchema(baseUrl, isArabic);

  return (
    <>
      <JsonLd schema={schema} />
      <ModernAgencyUI />
    </>
  );
}