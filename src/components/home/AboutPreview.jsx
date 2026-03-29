import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lightbulb, Target, CheckCircle } from 'lucide-react';

const highlights = [
  'AI models deployed across 10+ industries',
  'Hardware to cloud full-stack capability',
  'Agile delivery with rigorous quality assurance',
  'Ongoing support and system maintenance',
];

const values = [
  { icon: Lightbulb, title: 'Innovation First', desc: 'Pushing boundaries with cutting-edge technology' },
  { icon: Shield, title: 'Reliable Delivery', desc: 'On-time, on-budget, every single time' },
  { icon: Target, title: 'Results Driven', desc: 'Measurable impact on your business growth' },
];

export default function AboutPreview() {
  return (
    <section className="py-24 lg:py-32 bg-[#060e1c] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-secondary/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.25em] mb-5">
              <span className="w-6 h-[1px] bg-secondary/60" />
              About M·SOLE
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
              Where Vision Meets
              <span className="block gold-shimmer">Engineering Excellence</span>
            </h2>
            <p className="mt-6 text-white/40 leading-relaxed text-lg">
              Founded by Muhammad Daniyal Amjad, M·SOLE is a technology company 
              at the intersection of AI and embedded systems. We partner with businesses 
              worldwide to build intelligent, reliable systems that define the next era of innovation.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-sm text-white/50">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 border border-secondary/35 text-secondary rounded-lg hover:bg-secondary/10 transition-all duration-300 text-sm font-semibold group"
            >
              Our Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right */}
          <div className="space-y-4">
            {values.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex items-start gap-5 p-6 rounded-xl bg-white/[0.03] border border-white/6 hover:border-secondary/25 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">{item.title}</h3>
                  <p className="text-white/40 text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-3 gap-px bg-white/6 rounded-2xl overflow-hidden border border-secondary/15"
            >
              {[
                { value: '40+', label: 'Projects' },
                { value: '5+', label: 'Years' },
                { value: '15+', label: 'Clients' },
              ].map((stat) => (
                <div key={stat.label} className="text-center py-7 bg-[#060e1c] hover:bg-secondary/5 transition-colors duration-300">
                  <p className="text-2xl font-display font-bold text-secondary">{stat.value}</p>
                  <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
