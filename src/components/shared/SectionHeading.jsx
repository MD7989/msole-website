import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-16"
    >
      {eyebrow && (
        <span className={`text-sm font-semibold uppercase tracking-widest ${
          light ? 'text-secondary' : 'text-secondary'
        }`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-3 text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight ${
        light ? 'text-white' : 'text-foreground'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${
          light ? 'text-white/60' : 'text-muted-foreground'
        }`}>
          {description}
        </p>
      )}
      <div className="mt-6 flex justify-center">
        <div className="w-16 h-1 bg-secondary rounded-full" />
      </div>
    </motion.div>
  );
}