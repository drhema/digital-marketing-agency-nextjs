// src/types/mdx.ts
export type Locale = 'en' | 'ar';

// Base metadata types
export interface MetaImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface MetaData {
  metaTitle: string;
  metaDescription: string;
  openGraph: {
    title: string;
    description: string;
    images: MetaImage[];
  };
  twitterCard: {
    cardType: 'summary_large_image' | 'summary';
    title: string;
    description: string;
    image: string;
  };
}

// Content specific types
export interface LocalizedContent {
  title: string;
  description: string;
  author?: string;
  readingTime?: string;
  content: string;
  metadata: MetaData;
}

// Main MDX types
export interface BaseMDXContent {
  type: 'post' | 'mainService' | 'subService';
  slug: string;
  en: LocalizedContent;
  ar: LocalizedContent;
}

export interface BlogMDXContent extends BaseMDXContent {
  type: 'post';
  publishedAt: string;
  category: string;
  featured: boolean;
}

export interface ServiceMDXContent extends BaseMDXContent {
  type: 'mainService' | 'subService';
  parentService?: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  processSteps?: Array<{
    title: string;
    description: string;
    items: string[];
  }>;
}

// Processed content types
export interface ProcessedMDXContent {
  content: LocalizedContent;
  slug: string;
}

export interface ProcessedBlogPost extends ProcessedMDXContent {
  type: 'post';
  publishedAt: string;
  category: string;
  featured: boolean;
}

export interface ProcessedService extends ProcessedMDXContent {
  type: 'mainService' | 'subService';
  parentService?: string;
  subServices?: ProcessedService[];
}