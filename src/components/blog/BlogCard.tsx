// src/components/blog/BlogCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import type { ProcessedBlogPost } from '@/types/blog';

interface BlogCardProps {
  post: ProcessedBlogPost;
  locale: string;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300"
    >
      <Link href={`/${locale}/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.content.metadata.openGraph.images[0].url}
            alt={post.content.metadata.openGraph.images[0].alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4 text-sm text-black-400">
            <span className="bg-purple-500/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.content.readingTime} min read</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
            {post.content.title}
          </h3>
          
          <p className="text-black-400 text-sm line-clamp-2">
            {post.content.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}