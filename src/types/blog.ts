// src/types/blog.ts
export type Locale = 'en' | 'ar';

export interface BlogMeta {
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
    cardType: 'summary_large_image' | 'summary';
    title: string;
    description: string;
    image: string;
  };
}

// src/types/blog.ts
export interface BlogContent {
  title: string;
  description: string;
  author: string;
  readingTime: string;
  content: string;
  metadata?: {
    metaTitle?: string;
    metaDescription?: string;
    openGraph?: {
      title: string;
      description: string;
      images: Array<{
        url: string;
        width: number;
        height: number;
        alt: string;
      }>;
    };
    twitterCard?: {
      title: string;
      description: string;
      image: string;
    };
  };
}

export interface ProcessedBlogPost {
  type: 'post';
  slug: string;
  publishedAt: string;
  category: string;
  featured: boolean;
  content: BlogContent;
}

export interface BlogPost {
  type: 'post';
  slug: string;
  publishedAt: string;
  category: string;
  featured: boolean;
  en: BlogContent;
  ar: BlogContent;
}