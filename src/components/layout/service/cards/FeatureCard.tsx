// src/components/layout/service/cards/FeatureCard.tsx
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="group relative overflow-hidden bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
  >
    {/* ... rest of the FeatureCard code ... */}
  </motion.div>
);