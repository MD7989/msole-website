import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Cpu, Bot, GitMerge, Users, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    icon: Bot,
    tag: 'AI Agents',
    title: 'AI Sales Voice Agent',
    description: '24/7 AI voice agent handling inbound leads, booking demos, and qualifying prospects fully autonomous pipeline.',
    metrics: '3× lead conversion',
  },
  {
    icon: Brain,
    tag: 'RAG / LLM',
    title: 'Enterprise Knowledge Base AI',
    description: 'Production-grade RAG system trained on 10,000+ internal documents, reducing support resolution time by 65%.',
    metrics: '65% faster support',
  },
  {
    icon: GitMerge,
    tag: 'AI Automation',
    title: 'n8n E-Commerce Pipeline',
    description: 'End-to-end order processing automation connecting Shopify, CRM, fulfilment, and support zero manual steps.',
    metrics: '100% automated',
  },
  {
    icon: Users,
    tag: 'CRM Integration',
    title: 'GoHighLevel CRM Buildout',
    description: 'Full GHL CRM setup with custom pipelines, automated follow-ups, and AI-powered lead scoring for a US real estate firm.',
    metrics: '5× faster follow-up',
  },
  {
    icon: Brain,
    tag: 'Computer Vision',
    title: 'Industrial Quality Inspector',
    description: 'AI-powered visual inspection system for manufacturing defect detection with 99.2% accuracy, deployed on edge hardware.',
    metrics: '99.2% accuracy',
  },
  {
    icon: Brain,
    tag: 'Predictive AI',
    title: 'Demand Forecasting Engine',
    description: 'ML model predicting inventory demand for a retail chain across 50+ SKUs, cutting overstock costs by 42%.',
    metrics: '42% cost reduction',
  },
  {
    icon: Cpu,
    tag: 'Embedded',
    title: 'Smart HVAC Controller',
    description: 'Custom embedded controller with ML-based climate prediction reducing energy consumption by 38% in commercial buildings.',
    metrics: '38% energy saved',
  },
  {
    icon: Cpu,
    tag: 'Embedded / IoT',
    title: 'Fleet Tracking Platform',
    description: 'Real-time vehicle tracking and diagnostics with predictive maintenance alerts across a 200+ vehicle fleet.',
    metrics: '200+ vehicles',
  },
];

export default function ProjectsPreview() {
  return (
    <section className="py-24 lg:py-32 bg-[#050d1a] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-secondary/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.25em] mb-4">
              <span className="w-6 h-[1px] bg-secondary/60" />
              Featured Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
              Projects That
              <span className="block gold-shimmer">Define Excellence</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-secondary text-sm font-semibold border border-secondary/25 px-5 py-2.5 rounded-lg hover:bg-secondary/10 transition-all duration-300"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-7 rounded-2xl bg-white/[0.03] border border-white/6 hover:border-secondary/25 transition-all duration-400 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/15 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-400">
                  <project.icon className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 border border-white/8 px-2.5 py-1 rounded-full">
                  {project.tag}
                </span>
              </div>

              <h3 className="text-[15px] font-semibold text-white/90 mb-2.5 group-hover:text-secondary transition-colors duration-300 leading-snug">
                {project.title}
              </h3>
              <p className="text-[13px] text-white/35 leading-relaxed mb-5">{project.description}</p>

              {/* Metric chip */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/8 border border-secondary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-[11px] font-semibold text-secondary/80">{project.metrics}</span>
              </div>

              {/* Arrow on hover */}
              <ArrowUpRight className="absolute bottom-6 right-6 w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
