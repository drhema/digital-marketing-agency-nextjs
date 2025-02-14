// src/components/blog/BlogList.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import BlogCard from './BlogCard';
import type { ProcessedBlogPost } from '@/types/blog';

interface BlogListProps {
  initialPosts: ProcessedBlogPost[];
  locale: string;
}

export default function BlogList({ initialPosts, locale }: BlogListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && hasMore) {
      loadMorePosts();
    }
  }, [loading, hasMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [handleObserver]);

  const loadMorePosts = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(`/api/posts?page=${nextPage}&locale=${locale}`);
      const newPosts = await response.json();
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        {locale === 'ar' ? 'جميع المقالات' : 'All Posts'}
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
      
      {/* Loading indicator and observer trigger */}
      <div ref={loader} className="mt-12 text-center">
        {loading && (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto" />
        )}
      </div>
    </section>
  );
}