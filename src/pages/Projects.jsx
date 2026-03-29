import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Wifi, Bot, GitMerge, Users, ArrowUpRight, Database, Code, Zap } from 'lucide-react';

const categories = ['All', 'AI Agents', 'Automation', 'CRM', 'Embedded', 'IoT'];

const projects = [
  // ── AI AGENTS & LLM ──────────────────────────────────────
  {
    icon: Bot,
    tag: 'AI Voice Agent',
    category: 'AI Agents',
    title: 'AI Sales Voice Call Agent',
    description: 'Natural-sounding AI voice agent handling inbound leads, bookings, support & sales 24/7 with zero human involvement.',
    metrics: '3× lead conversion',
    techTags: ['LLM', 'Voice AI', 'Python'],
  },
  {
    icon: Brain,
    tag: 'RAG / LLM',
    category: 'AI Agents',
    title: 'Enterprise Knowledge Base AI',
    description: 'Production-grade RAG system trained on 10,000+ internal documents, reducing support resolution time by 65%.',
    metrics: '65% faster support',
    techTags: ['RAG', 'LangChain', 'OpenAI'],
  },
  {
    icon: Bot,
    tag: 'AI Agents',
    category: 'AI Agents',
    title: 'Multi-Step Agentic Pipeline',
    description: 'Autonomous multi-agent system executing complex business workflows research, reasoning, and action without human input.',
    metrics: '90% less manual work',
    techTags: ['LangGraph', 'OpenAI', 'Python'],
  },
  {
    icon: Bot,
    tag: 'AI Chatbot',
    category: 'AI Agents',
    title: 'Lead Qualification Chatbot',
    description: 'AI chatbot handling 24/7 lead qualification, FAQs, and appointment booking integrated directly into client websites.',
    metrics: '24/7 availability',
    techTags: ['OpenAI', 'Webhook', 'React'],
  },
  {
    icon: Brain,
    tag: 'Computer Vision',
    category: 'AI Agents',
    title: 'Industrial Quality Inspector',
    description: 'AI-powered visual inspection system for manufacturing defect detection with 99.2% accuracy, deployed on edge hardware.',
    metrics: '99.2% accuracy',
    techTags: ['OpenCV', 'YOLO', 'Deep Learning'],
  },
  {
    icon: Brain,
    tag: 'Predictive AI',
    category: 'AI Agents',
    title: 'Demand Forecasting Engine',
    description: 'ML model predicting inventory demand for a retail chain across 50+ SKUs, cutting overstock costs by 42%.',
    metrics: '42% cost reduction',
    techTags: ['Scikit-learn', 'Time Series', 'Python'],
  },
  {
    icon: Brain,
    tag: 'Document AI',
    category: 'AI Agents',
    title: 'Document AI Processor',
    description: 'Intelligent document processing system for automated data extraction and classification at scale.',
    metrics: '10× faster extraction',
    techTags: ['OCR', 'NLP', 'FastAPI'],
  },
  {
    icon: Brain,
    tag: 'MLOps',
    category: 'AI Agents',
    title: 'ML Model Deployment Pipeline',
    description: 'End-to-end MLOps pipeline for deploying, monitoring, and retraining production ML models with CI/CD integration.',
    metrics: '99.9% uptime',
    techTags: ['MLflow', 'Docker', 'AWS'],
  },
  {
    icon: Brain,
    tag: 'AI SaaS',
    category: 'AI Agents',
    title: 'AI-Powered SaaS Platform',
    description: 'Custom industry-specific SaaS solution with embedded AI for automated reporting, recommendations, and workflow management.',
    metrics: '5× productivity',
    techTags: ['OpenAI', 'React', 'Node.js'],
  },

  // ── AUTOMATION ───────────────────────────────────────────
  {
    icon: GitMerge,
    tag: 'n8n Automation',
    category: 'Automation',
    title: 'n8n E-Commerce Pipeline',
    description: 'End-to-end order processing automation connecting Shopify, CRM, fulfilment, and support zero manual steps.',
    metrics: '100% automated',
    techTags: ['n8n', 'Shopify', 'REST APIs'],
  },
  {
    icon: Zap,
    tag: 'Make / Zapier',
    category: 'Automation',
    title: 'Business Process Automation',
    description: 'No-code automation pipelines built on Make and Zapier eliminating repetitive tasks across HR, finance, and ops.',
    metrics: '80% time saved',
    techTags: ['Make', 'Zapier', 'No-Code'],
  },
  {
    icon: GitMerge,
    tag: 'OpenAI Integration',
    category: 'Automation',
    title: 'AI-Powered Automation Pipeline',
    description: 'n8n workflows enhanced with OpenAI auto-classifying, summarising, and routing data across business systems.',
    metrics: '95% accuracy',
    techTags: ['n8n', 'OpenAI', 'Webhooks'],
  },
  {
    icon: Database,
    tag: 'Data Pipeline',
    category: 'Automation',
    title: 'Web Scraping & Data Pipeline',
    description: 'Large-scale web scraping and ETL pipeline extracting structured data from 500+ sources for BI dashboards.',
    metrics: '500+ sources',
    techTags: ['Python', 'Selenium', 'PostgreSQL'],
  },
  {
    icon: Brain,
    tag: 'Predictive Analytics',
    category: 'Automation',
    title: 'Predictive Analytics Dashboard',
    description: 'AI-powered analytics platform forecasting sales trends, churn, and demand integrated with live business data.',
    metrics: '40% better forecasts',
    techTags: ['Python', 'Power BI', 'ML'],
  },

  // ── CRM ──────────────────────────────────────────────────
  {
    icon: Users,
    tag: 'CRM Integration',
    category: 'CRM',
    title: 'GoHighLevel CRM Buildout',
    description: 'Full GHL CRM setup with custom pipelines, automated follow-ups, and AI-powered lead scoring for a US real estate firm.',
    metrics: '5× faster follow-up',
    techTags: ['GoHighLevel', 'Zapier', 'AI Scoring'],
  },
  {
    icon: Users,
    tag: 'Zoho CRM',
    category: 'CRM',
    title: 'Zoho CRM Automation',
    description: 'Custom Zoho CRM workflows, automations, and API integrations connecting sales, support, and marketing teams.',
    metrics: '3× pipeline speed',
    techTags: ['Zoho CRM', 'Deluge', 'REST API'],
  },
  {
    icon: Bot,
    tag: 'CRM + AI',
    category: 'CRM',
    title: 'AI Lead Scoring System',
    description: 'ML-powered lead scoring model integrated into CRM automatically prioritising high-value prospects in real time.',
    metrics: '2× close rate',
    techTags: ['Python', 'GHL', 'OpenAI'],
  },

  // ── EMBEDDED ─────────────────────────────────────────────
  {
    icon: Cpu,
    tag: 'Embedded',
    category: 'Embedded',
    title: 'Smart HVAC Controller',
    description: 'Custom embedded controller with ML-based climate prediction reducing energy consumption by 38% in commercial buildings.',
    metrics: '38% energy saved',
    techTags: ['STM32', 'RTOS', 'TFLite'],
  },
  {
    icon: Cpu,
    tag: 'Embedded',
    category: 'Embedded',
    title: 'Motor Control Unit',
    description: 'High-precision BLDC motor controller for industrial robotics with real-time feedback and fault protection.',
    metrics: '0.01° precision',
    techTags: ['FPGA', 'VHDL', 'C++'],
  },
  {
    icon: Brain,
    tag: 'Autonomous AI',
    category: 'Embedded',
    title: 'Autonomous Drone System',
    description: 'Autonomous navigation and object detection system for agricultural survey drones with edge AI inference.',
    metrics: '95% nav accuracy',
    techTags: ['YOLO', 'ROS', 'Embedded Linux'],
  },

  // ── IoT ──────────────────────────────────────────────────
  {
    icon: Wifi,
    tag: 'Embedded / IoT',
    category: 'IoT',
    title: 'Fleet Tracking Platform',
    description: 'Real-time vehicle tracking and diagnostics with predictive maintenance alerts across a 200+ vehicle fleet.',
    metrics: '200+ vehicles',
    techTags: ['GPS', 'MQTT', 'React'],
  },
  {
    icon: Wifi,
    tag: 'IoT',
    category: 'IoT',
    title: 'Smart Energy Monitor',
    description: 'Home energy monitoring system with real-time analytics and AI-driven consumption optimisation.',
    metrics: '30% energy saved',
    techTags: ['ESP32', 'Firebase', 'React Native'],
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Our Work</span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.15]">
              Projects That
              <span className="text-secondary block py-1">Define Excellence</span>
            </h1>
            <p className="mt-6 text-white/60 text-lg leading-relaxed">
              A showcase of AI-first solutions we've engineered across industries and domains worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-[#050d1a] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-secondary/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-white/5 text-white/50 border border-white/8 hover:border-secondary/30 hover:text-white/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative p-7 rounded-2xl bg-white/[0.03] border border-white/6 hover:border-secondary/25 transition-all duration-400 overflow-hidden"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon + tag row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/15 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-400">
                      <project.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 border border-white/8 px-2.5 py-1 rounded-full">
                      {project.tag}
                    </span>
                  </div>

                  {/* Title & description */}
                  <h3 className="text-[15px] font-semibold text-white/90 mb-2.5 group-hover:text-secondary transition-colors duration-300 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-white/35 leading-relaxed mb-5">{project.description}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techTags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/30">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Metric chip */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/8 border border-secondary/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-[11px] font-semibold text-secondary/80">{project.metrics}</span>
                  </div>

                  {/* Arrow on hover */}
                  <ArrowUpRight className="absolute bottom-6 right-6 w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
