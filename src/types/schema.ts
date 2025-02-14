export interface ImageObject {
  '@type': 'ImageObject';
  '@id': string;
  url: string;
  contentUrl: string;
  width: number;
  height: number;
  caption: string;
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  areaServed: string;
  availableLanguage: string[];
}

export interface Organization {
  '@type': 'Organization';
  '@id': string;
  name: string;
  url: string;
  logo: ImageObject;
  sameAs: string[];
  contactPoint: ContactPoint;
}

export interface WebSite {
  '@type': 'WebSite';
  '@id': string;
  url: string;
  name: string;
  description: string;
  publisher: {
    '@id': string;
  };
  inLanguage: string[];
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface GeoCoordinates {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

export interface OpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface LocalBusiness {
  '@type': 'LocalBusiness';
  '@id': string;
  name: string;
  url: string;
  logo: {
    '@id': string;
  };
  image: string;
  address: PostalAddress;
  geo: GeoCoordinates;
  openingHoursSpecification: OpeningHoursSpecification[];
  priceRange: string;
  serviceArea: {
    '@type': 'AdministrativeArea';
    name: string;
  };
}

export interface Schema {
  '@context': 'https://schema.org';
  '@graph': (Organization | WebSite | LocalBusiness)[];
}