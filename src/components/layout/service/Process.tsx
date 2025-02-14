// src/components/layout/service/Process.tsx
'use client';

import { motion } from 'framer-motion';
import { ProcessCard } from './cards/ProcessCard';
import type { ProcessedService } from '@/types/service';

interface ProcessProps {
  service: ProcessedService;
  locale: string;
}

const Process = ({ service, locale }: ProcessProps) => {
  // Default process steps if not provided in service content
  const processSteps = service.content.processSteps || [
    {
      title: "Analysis",
      description: "Comprehensive analysis of your current situation",
      items: ["Market research", "Competitor analysis", "Performance audit"]
    },
    {
      title: "Strategy",
      description: "Developing a tailored strategy for your needs",
      items: ["Goal setting", "Channel selection", "Timeline planning"]
    },
    {
      title: "Implementation",
      description: "Executing the planned strategies",
      items: ["Content creation", "Platform optimization", "Campaign launch"]
    },
    {
      title: "Monitoring",
      description: "Continuous monitoring and optimization",
      items: ["Performance tracking", "Analytics review", "Strategy adjustment"]
    }
  ];

  return (
    <section className="relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Our Process
        </h2>
        <p className="text-black-400 max-w-2xl mx-auto">
          Our systematic approach ensures effective {service.content.title.split(' in ')[0]} solutions
        </p>
      </div>

      <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl" />
        
        <div className="relative grid md:grid-cols-2 gap-8">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              items={step.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;