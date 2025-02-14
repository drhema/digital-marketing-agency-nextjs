'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { 
  Target, Layout, Users, BarChart2, 
  CheckCircle2, Globe2, ArrowRight 
} from 'lucide-react';

// SubService card component
const SubServiceCard = ({ slug, content, mainSlug, locale }: any) => (
  <Link 
    href={`/${locale}/services/${mainSlug}/${slug}`}
    className="block"
  >
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300"
    >
      <div className="mb-4">
        <div className="p-3 bg-purple-500/10 rounded-xl inline-block">
          <Globe2 className="w-6 h-6 text-purple-500" />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">
        {content.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {content.description}
      </p>
      <div className="flex items-center text-purple-500 dark:text-purple-400 font-medium">
        Learn More
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  </Link>
);

// Feature card component
const FeatureCard = ({ title, description }: any) => {
  const featureIcons = {
    'Platform-Specific Marketing': Target,
    'Content Creation': Layout,
    'Community Management': Users,
    'Performance Monitoring': BarChart2,
  };
  const Icon = featureIcons[title] || Globe2;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="mb-4 bg-purple-500/10 p-3 rounded-xl inline-block">
        <Icon className="w-6 h-6 text-purple-500" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
};

// MDX components
const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mt-16 mb-8 text-gray-800 dark:text-gray-100" {...props} />
  ),
  h3: (props: any) => {
    // Handle process steps
    const match = props.children?.toString().match(/^(\d+)\.\s+(.+)/);
    if (match) {
      const [_, number, title] = match;
      return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/10 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-xl">
              {number}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h3>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-3 mt-8 mb-4">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <Globe2 className="w-6 h-6 text-purple-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white" {...props} />
      </div>
    );
  },
  p: (props: any) => (
    <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {React.Children.map(props.children, (child) => (
        <div className="flex items-start gap-3 group">
          <CheckCircle2 className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
          <span className="text-gray-600 dark:text-gray-300 group-hover:text-purple-500 transition-colors">
            {child.props.children}
          </span>
        </div>
      ))}
    </div>
  ),
};

export default function ServiceContent({ service }: { service: any }) {
  const [mdxContent, setMdxContent] = React.useState<any>(null);

  React.useEffect(() => {
    const processContent = async () => {
      try {
        const mdxSource = await serialize(service.content.content, {
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
  }, [service.content.content]);

  const isMainService = !service.parentService;

  return (
    <>
      {/* Sub-Services Grid for main services */}
      {isMainService && service.subServices && service.subServices.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.subServices.map((subService: any, index: number) => (
              <SubServiceCard 
                key={index}
                {...subService}
                mainSlug={service.slug}
                locale={subService.locale}
              />
            ))}
          </div>
        </section>
      )}

      {/* Features Grid for sub-services */}
      {!isMainService && service.content.features && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {service.content.features.map((feature: any, index: number) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      {mdxContent && (
        <div className="prose dark:prose-invert max-w-none">
          <MDXRemote {...mdxContent} components={mdxComponents} />
        </div>
      )}
    </>
  );
}