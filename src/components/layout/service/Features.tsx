// src/components/layout/service/Features.tsx
'use client';

import { 
  Target, 
  Users2, 
  Layout, 
  LineChart, 
  BarChart2, 
  Lightbulb,
  Users 
} from 'lucide-react';
import { FeatureCard } from './cards/FeatureCard';
import type { ProcessedService } from '@/types/service';

interface FeaturesProps {
  service: ProcessedService;
}

const Features = ({ service }: FeaturesProps) => {
  // Icon mapping based on feature title
  const featureIcons = {
    'Platform-Specific Marketing': Users2,
    'Content Creation': Layout,
    'Community Management': Users,
    'Performance Monitoring': LineChart,
    'Technical SEO': BarChart2,
    'Product Page Optimization': Layout,
    'Content Strategy': Lightbulb,
    'default': Target
  };

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Our Services
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {service.content.features?.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={featureIcons[feature.title] || featureIcons.default}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;