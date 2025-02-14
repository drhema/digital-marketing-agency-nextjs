// src/lib/content/blog.ts
import { allBlogs } from 'contentlayer/generated';

export async function getBlogPosts(
  locale: 'en' | 'ar',
  page: number = 1,
  perPage: number = 10
) {
  const posts = allBlogs
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map(post => ({
      ...post,
      content: post[locale],
    }));

  const start = (page - 1) * perPage;
  const end = start + perPage;
  return posts.slice(start, end);
}

export async function getBlogPostBySlug(
  slug: string,
  locale: 'en' | 'ar'
) {
  const post = allBlogs.find(post => post.slug === slug);
  if (!post) return null;

  return {
    ...post,
    content: post[locale],
  };
}

export async function getRelatedPosts(
  currentPost: any,
  locale: 'en' | 'ar',
  limit: number = 3
) {
  const posts = allBlogs
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.category === currentPost.category
    )
    .map(post => ({
      ...post,
      content: post[locale],
    }))
    .slice(0, limit);

  return posts;
}