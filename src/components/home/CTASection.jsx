import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Zap, MessageCircle } from 'lucide-react';

const perks = [
  { icon: Zap, text: 'Free initial consultation' },
  { icon: Mail, text: 'Response within 24 hours' },
  { icon: MessageCircle, text: 'No-obligation quote' },
];

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-[#050d1a] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-secondary/15"
          style={{ background: 'linear-gradient(135deg, #070f1e 0%, #050d1a 50%, #060e1c 100%)' }}
        >
          {/* Inner glow orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/8 rounded-full blur-[70px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/6 rounded-full blur-[70px] pointer-events-none" />
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

          <div className="relative p-12 md:p-20 text-center">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/25 bg-secondary/8 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary text-[11px] font-bold uppercase tracking-[0.2em]">Available for Projects</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-[1.1]">
              Let's Build Something
              <span className="block gold-shimmer mt-1">Extraordinary Together</span>
            </h2>

            <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
              Whether you need AI integration, embedded systems design, or custom automation — 
              we're ready to bring your vision to life.
            </p>

            {/* Perks */}
            <div className="mt-8 flex flex-wrap justify-center gap-5">
              {perks.map((p) => (
                <div key={p.text} className="flex items-center gap-2">
                  <p.icon className="w-4 h-4 text-secondary/70" />
                  <span className="text-[13px] text-white/40">{p.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/90 transition-all duration-300 group gold-glow-sm text-sm tracking-wide"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/4 text-white/70 font-semibold rounded-xl hover:bg-white/8 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20 text-sm tracking-wide"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}