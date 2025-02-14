// src/components/layout/service/sections/ServiceContent.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

interface ServiceContentProps {
  content: string;
  locale: string;
  isSubService?: boolean;
}

// Custom MDX components with enhanced styling
const mdxComponents = {
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mt-16 mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold mt-12 mb-6 text-white" {...props} />
  ),
  p: (props: any) => (
    <p className="text-gray-300 mb-6 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="space-y-4 mb-8" {...props} />
  ),
  li: (props: any) => (
    <li className="flex items-start gap-3 text-gray-300">
      <span className="w-1.5 h-1.5 mt-2.5 bg-purple-500 rounded-full flex-shrink-0" />
      <span>{props.children}</span>
    </li>
  ),
};

export const ServiceContent = ({ content, locale, isSubService }: ServiceContentProps) => {
  const [mdxContent, setMdxContent] = React.useState<any>(null);

  React.useEffect(() => {
    const processContent = async () => {
      try {
        const mdxSource = await serialize(content, {
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
  }, [content]);

  if (!mdxContent) return null;

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose dark:prose-invert max-w-none prose-headings:text-black-900 dark:prose-headings:text-white prose-p:text-black-600 dark:prose-p:text-black-300"
        >
          <MDXRemote {...mdxContent} components={mdxComponents} />
        </motion.div>
      </div>
    </section>
  );
};