// src/lib/utils/blog.ts
import { ProcessedBlogPost } from '@/types/blog';

export const getRelatedPosts = async (
  currentPost: ProcessedBlogPost,
  locale: 'en' | 'ar',
  limit: number = 3
): Promise<ProcessedBlogPost[]> => {
  // Get all blog posts
  const { getBlogPosts } = await import('@/lib/content/blog');
  const allPosts = await getBlogPosts(locale);

  // Filter out current post and get posts in the same category
  const relatedPosts = allPosts
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.category === currentPost.category
    )
    // Sort by publish date (most recent first)
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    // Limit the number of related posts
    .slice(0, limit);

  return relatedPosts;
};