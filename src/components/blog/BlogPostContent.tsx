// src/components/blog/BlogPostContent.tsx
'use client';

import { MDXRemote } from 'next-mdx-remote';
import { motion } from 'framer-motion';

// Custom MDX components
const components = {
  h1: (props) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-800 dark:text-gray-100" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-bold mt-4 mb-3 text-gray-800 dark:text-gray-100" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300" {...props} />
  ),
  li: (props) => (
    <li className="ml-4 text-gray-600 dark:text-gray-300" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-purple-500 pl-4 my-4 italic text-gray-600 dark:text-gray-300" {...props} />
  ),
  code: (props) => (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 text-sm font-mono" {...props} />
  ),
  pre: (props) => (
    <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 my-4 overflow-x-auto" {...props} />
  ),
};

interface BlogPostContentProps {
  post: any;
  locale: string;
}

export default function BlogPostContent({ post, locale }: BlogPostContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gray-900"
    >
      <main className="max-w-4xl mx-auto px-4 py-16">
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">{post.content.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <span>{post.content.author}</span>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString(locale)}</span>
            <span>•</span>
            <span>{post.content.readingTime} min read</span>
          </div>

          <div className="mt-8 prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300">
            <MDXRemote {...post.content.content} components={components} />
          </div>
        </article>
      </main>
    </motion.div>
  );
}