import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true, light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${light ? 'text-white' : 'text-charcoal'}`}>
          {title}
        </h2>
        <div className={`h-1 w-20 bg-saffron mb-6 ${centered ? 'mx-auto' : ''}`} />
        {subtitle && (
          <p className={`max-w-2xl text-lg ${centered ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-500'}`}>
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
