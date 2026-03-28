import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Al-Rashid',
    role: 'CTO, TechVentures UAE',
    initials: 'AA',
    text: 'M·SOLE delivered an AI inspection system that exceeded every benchmark. Their engineering depth and professionalism are truly world-class.',
    stars: 5,
    tag: 'Computer Vision',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Founder, GreenEdge IoT',
    initials: 'SM',
    text: "The embedded system they built runs flawlessly in harsh environments. Daniyal's team has unmatched expertise in hardware-software integration.",
    stars: 5,
    tag: 'Embedded Systems',
  },
  {
    name: 'Lars Hoffmann',
    role: 'Director of Engineering, AutoSense GmbH',
    initials: 'LH',
    text: 'From requirements to deployment, M·SOLE managed everything with precision. The fleet tracking platform has completely transformed our operations.',
    stars: 5,
    tag: 'IoT Platform',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Ops, Nexus Retail',
    initials: 'PN',
    text: 'The n8n automation workflows they built saved our team 40+ hours a week. Incredible ROI and delivered faster than expected.',
    stars: 5,
    tag: 'n8n Automation',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#060e1c] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-secondary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-blue-900/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <span className="w-6 h-[1px] bg-secondary/60" />
            Client Voices
            <span className="w-6 h-[1px] bg-secondary/60" />
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-white">
            Trusted by <span className="gold-shimmer">Industry Leaders</span>
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-md mx-auto">
            Real results from real clients across AI, embedded systems, IoT, and automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/6 hover:border-secondary/25 transition-all duration-400 group overflow-hidden"
            >
              {/* Subtle hover top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-5">
                <Quote className="w-7 h-7 text-secondary/25" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-secondary/50 border border-secondary/20 px-2.5 py-1 rounded-full">
                  {t.tag}
                </span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-white/50 text-sm leading-relaxed">"{t.text}"</p>

              <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-secondary/15 border border-secondary/25 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold text-secondary">{t.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}