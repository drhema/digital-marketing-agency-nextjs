// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

// Define shared language fields for blog content
const blogLanguageContent = {
  title: { type: 'string', required: true },
  description: { type: 'string', required: true },
  author: { type: 'string', required: true },
  readingTime: { type: 'string', required: true },
  content: { type: 'string', required: true },
  metadata: {
    type: 'nested',
    required: true,
    of: defineDocumentType(() => ({
      name: 'BlogMetadata',
      fields: {
        metaTitle: { type: 'string', required: true },
        metaDescription: { type: 'string', required: true },
        openGraph: { type: 'json', required: true },
        twitterCard: { type: 'json', required: true },
      },
    })),
  },
} as const;

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    type: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
    category: { type: 'string', required: true },
    featured: { type: 'boolean', default: false },
    en: {
      type: 'nested',
      required: true,
      of: defineDocumentType(() => ({
        name: 'BlogEN',
        fields: blogLanguageContent,
      })),
    },
    ar: {
      type: 'nested',
      required: true,
      of: defineDocumentType(() => ({
        name: 'BlogAR',
        fields: blogLanguageContent,
      })),
    },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: (doc) => `/blog/${doc.slug}`,
    },
  },
}));

// Define shared language fields for service content
const serviceLanguageContent = {
  title: { type: 'string', required: true },
  description: { type: 'string', required: true },
  metadata: {
    type: 'nested',
    required: true,
    of: defineDocumentType(() => ({
      name: 'ServiceMetadata',
      fields: {
        metaTitle: { type: 'string', required: true },
        metaDescription: { type: 'string', required: true },
        openGraph: { type: 'json', required: true },
        twitterCard: { type: 'json', required: true },
      },
    })),
  },
  features: { type: 'json', required: false },
  content: { type: 'string', required: true },
} as const;

export const Service = defineDocumentType(() => ({
  name: 'Service',
  filePathPattern: 'services/**/*.mdx',
  contentType: 'mdx',
  fields: {
    type: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    parentService: { type: 'string', required: false },
    en: {
      type: 'nested',
      required: true,
      of: defineDocumentType(() => ({
        name: 'ServiceEN',
        fields: serviceLanguageContent,
      })),
    },
    ar: {
      type: 'nested',
      required: true,
      of: defineDocumentType(() => ({
        name: 'ServiceAR',
        fields: serviceLanguageContent,
      })),
    },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: (doc) => doc.parentService 
        ? `/services/${doc.parentService}/${doc.slug}`
        : `/services/${doc.slug}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog, Service],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});