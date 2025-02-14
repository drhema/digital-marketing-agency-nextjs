'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Calendar, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

// Breadcrumb component
const Breadcrumb = ({ items, locale }: { 
  items: Array<{ label: string; href: string; active?: boolean }>;
  locale: string;
}) => {
  const ChevronIcon = locale === 'ar' ? ChevronLeft : ChevronRight;
  
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className={`inline-flex items-center space-x-1 md:space-x-3 ${
        locale === 'ar' ? 'flex-row-reverse space-x-reverse' : ''
      }`}>
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && (
              <ChevronIcon className="w-4 h-4 text-black-400 mx-2" />
            )}
            {item.active ? (
              <span className="text-gray-500 dark:text-black-400">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// MDX components config
const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-100" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed" {...props} />
  ),
  img: (props: any) => (
    <div className="my-8">
      <Image
        {...props}
        width={800}
        height={400}
        className="rounded-lg shadow-lg"
        alt={props.alt || 'Blog post image'}
      />
    </div>
  ),
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 text-sm font-mono" {...props} />
  ),
};

interface BlogPostProps {
  post: any;
  locale: string;
  relatedPosts?: any[];
}

export default function EnhancedBlogPost({ post, locale, relatedPosts }: BlogPostProps) {
  const [mdxContent, setMdxContent] = React.useState<any>(null);

  React.useEffect(() => {
    const processContent = async () => {
      try {
        const mdxSource = await serialize(post.content.content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        });
        setMdxContent(mdxSource);
      } catch (error) {
        console.error('Error processing MDX content:', error);
      }
    };

    processContent();
  }, [post.content.content]);

  const breadcrumbItems = [
    { label: locale === 'ar' ? 'الرئيسية' : 'Home', href: `/${locale}` },
    { label: locale === 'ar' ? 'المدونة' : 'Blog', href: `/${locale}/blog` },
    { label: post.content.title, href: `/${locale}/blog/${post.slug}`, active: true },
  ];

  if (!mdxContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500" />
      </div>
    );
  }

  const featuredImage = post.content.metadata.openGraph.images[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gray-900"
    >
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} locale={locale} />

        <article className="prose dark:prose-invert max-w-none">
          {/* Featured Image */}
          <div className="relative h-[400px] mb-8 rounded-xl overflow-hidden">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.content.title}</h1>
            
            <div className={`flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-black-400 ${
              locale === 'ar' ? 'flex-row-reverse' : ''
            }`}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.content.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString(
                    locale === 'ar' ? 'ar-KW' : 'en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {locale === 'ar' 
                    ? `${post.content.readingTime} دقائق للقراءة`
                    : `${post.content.readingTime} min read`
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="mt-8 prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300">
            <MDXRemote {...mdxContent} components={mdxComponents} />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {locale === 'ar' ? 'مقالات ذات صلة' : 'Related Posts'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/${locale}/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={relatedPost.content.metadata.openGraph.images[0].url}
                      alt={relatedPost.content.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {relatedPost.content.title}
                  </h3>
                  <p className="text-gray-600 dark:text-black-400 text-sm line-clamp-2">
                    {relatedPost.content.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
}