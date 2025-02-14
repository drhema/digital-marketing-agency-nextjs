// src/components/layout/service/Content.tsx
'use client';

import { motion } from 'framer-motion';
import { Target, Layout, Users, BarChart2 } from 'lucide-react';
import { ContentCard } from './cards'; // Instead of './cards/ContentCard'

import type { ProcessedService } from '@/types/service';

interface ContentProps {
  service: ProcessedService;
}

const Content = ({ service }: ContentProps) => {
  const contentSections = [
    {
      title: "Platform-Specific Marketing",
      icon: Target,
      mainContent: {
        title: "Instagram Marketing",
        description: "Engage Kuwait's vibrant Instagram community"
      }
    },
    {
      title: "Content Creation",
      icon: Layout,
      mainContent: {
        title: "Professional Content",
        description: "Bilingual content creation for Kuwait market"
      }
    },
    {
      title: "Community Management",
      icon: Users,
      mainContent: {
        title: "Active Engagement",
        description: "Community building and interaction"
      }
    },
    {
      title: "Performance Monitoring",
      icon: BarChart2,
      mainContent: {
        title: "Analytics & Reporting",
        description: "Comprehensive performance tracking"
      }
    }
  ];

  return (
    <section className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl" />
      
      <div className="relative space-y-12">
        <div className="prose prose-invert max-w-none">
          {/* Main Description */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Strategic {service.content.title.split(' in ')[0]} for Kuwait Businesses
            </h2>
            <p className="text-black-400 leading-relaxed">
              {service.content.description}
            </p>
          </div>

          {/* Service Sections Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {contentSections.map((section, index) => (
              <ContentCard
                key={index}
                title={section.title}
                icon={section.icon}
                mainContent={section.mainContent}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;