// src/components/layout/service/cards/ProcessCard.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ProcessCardProps {
  number: number;
  title: string;
  description: string;
  items?: string[];
}

export const ProcessCard = ({ number, title, description, items = [] }: ProcessCardProps) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xl">
        {number}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-black-400 mb-4">{description}</p>
    {items.length > 0 && (
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-black-400">
            <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);