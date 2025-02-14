// src/lib/content/loader.ts
import { ProcessedBlogPost } from '@/types/blog'
import { ProcessedService } from '@/types/service'

// Type for the MDX module
interface MDXModule {
  default: {
    type: string
    slug: string
    publishedAt?: string
    category?: string
    featured?: boolean
    en: any
    ar: any
  }
}

// Correctly type the glob imports
const blogFiles: Record<string, () => Promise<MDXModule>> = 
  import.meta.glob('/src/content/blog/**/*.mdx')

const serviceFiles: Record<string, () => Promise<MDXModule>> = 
  import.meta.glob('/src/content/services/**/*.mdx')

export async function getBlogPosts(locale: 'en' | 'ar'): Promise<ProcessedBlogPost[]> {
  const posts = await Promise.all(
    Object.entries(blogFiles).map(async ([path, loader]) => {
      const module = await loader()
      const slug = path.split('/').pop()?.replace('.mdx', '') || ''
      
      return {
        type: 'post',
        slug,
        publishedAt: module.default.publishedAt,
        category: module.default.category,
        featured: module.default.featured,
        content: module.default[locale]
      } as ProcessedBlogPost
    })
  )

  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getBlogPostBySlug(
  slug: string, 
  locale: 'en' | 'ar'
): Promise<ProcessedBlogPost | null> {
  try {
    const posts = await getBlogPosts(locale)
    return posts.find(post => post.slug === slug) || null
  } catch (error) {
    console.error(`Error loading blog post: ${slug}`, error)
    return null
  }
}

export async function getServiceContent(
  locale: 'en' | 'ar'
): Promise<ProcessedService[]> {
  const services = await Promise.all(
    Object.entries(serviceFiles).map(async ([path, loader]) => {
      const module = await loader()
      const slug = path.split('/').pop()?.replace('.mdx', '') || ''
      
      return {
        type: module.default.type || 'mainService',
        slug,
        parentService: module.default.parentService,
        content: module.default[locale]
      } as ProcessedService
    })
  )

  return services
}

export async function getServiceBySlug(
  slug: string, 
  locale: 'en' | 'ar'
): Promise<ProcessedService | null> {
  try {
    const services = await getServiceContent(locale)
    return services.find(service => service.slug === slug) || null
  } catch (error) {
    console.error(`Error loading service: ${slug}`, error)
    return null
  }
}