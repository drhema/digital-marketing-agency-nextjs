// src/app/[locale]/blog/page.tsx
export const runtime = 'edge';
import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/content/blog';
import BlogList from '@/components/blog/BlogList';
import FeaturedPosts from '@/components/blog/FeaturedPosts';

interface BlogPageProps {
  params: { locale: string };
}

export async function generateMetadata({ 
  params 
}: BlogPageProps): Promise<Metadata> {
  const isArabic = params.locale === 'ar';
  
  return {
    title: isArabic ? 'المدونة | موصلنين' : 'Blog | Mu3lnen',
    description: isArabic 
      ? 'اقرأ أحدث المقالات والأفكار حول التسويق الرقمي'
      : 'Read our latest articles and insights about digital marketing',
  };
}

export default async function BlogPage({ 
  params 
}: BlogPageProps) {
  const { getBlogPosts } = await import('@/lib/content/blog');
  const posts = await getBlogPosts(params.locale as 'en' | 'ar', 1, 20);
  const featuredPosts = posts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 py-16">
        <FeaturedPosts posts={featuredPosts} locale={params.locale} />
        <BlogList 
          initialPosts={posts} 
          locale={params.locale} 
        />
      </main>
    </div>
  );
}