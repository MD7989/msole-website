import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, GitMerge, Users, Brain, Cpu, Eye, Wifi, Database, ArrowRight, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Custom ML models, NLP, predictive analytics, and MLOps intelligent systems that learn and deliver real results.',
    number: '01',
    tag: 'AI / ML',
  },
  {
    icon: Eye,
    title: 'Computer Vision & OpenCV',
    description: 'Real-time object detection, image processing, and industrial quality inspection powered by deep learning.',
    number: '02',
    tag: 'Vision AI',
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    description: 'Robust firmware, RTOS, and hardware-software co-design for mission-critical embedded applications.',
    number: '03',
    tag: 'Hardware',
  },
  {
    icon: Wifi,
    title: 'IoT Development',
    description: 'End-to-end connected ecosystems with secure protocols, edge computing, and real-time analytics.',
    number: '04',
    tag: 'IoT',
  },
  {
    icon: GitMerge,
    title: 'n8n & Automation',
    description: 'End-to-end workflow automation with n8n, Make, and Zapier eliminating manual work at scale.',
    number: '05',
    tag: 'Automation',
  },
  {
    icon: Users,
    title: 'CRM Integrations',
    description: 'GoHighLevel, Zoho CRM, and full pipeline automation custom workflows and API integrations.',
    number: '06',
    tag: 'CRM',
  },
  {
    icon: Bot,
    title: 'AI Agents & Chatbots',
    description: 'Autonomous agents, RAG systems, and AI voice agents for lead qualification and 24/7 support.',
    number: '07',
    tag: 'Agents',
  },
  {
    icon: Database,
    title: 'Data Pipelines & Analytics',
    description: 'Large-scale ETL pipelines, data streaming, and BI dashboards that turn raw data into insights.',
    number: '08',
    tag: 'Data',
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 lg:py-32 bg-[#050d1a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.25em] mb-4">
              <span className="w-6 h-[1px] bg-secondary/60" />
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-[1.15]">
              Comprehensive
              <span
                className="block gold-shimmer py-1"
                style={{ WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}
              >
                Technology Solutions
              </span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-secondary text-sm font-semibold border border-secondary/25 px-5 py-2.5 rounded-lg hover:bg-secondary/10 transition-all duration-300"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="group relative bg-white/[0.03] border border-white/6 rounded-2xl p-7 hover:border-secondary/30 hover:bg-white/[0.055] transition-all duration-400 overflow-hidden cursor-default"
            >
              {/* Top gold line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Number watermark */}
              <span className="absolute top-4 right-5 text-4xl font-display font-bold text-white/4 group-hover:text-secondary/8 transition-colors duration-500 select-none leading-none">
                {service.number}
              </span>

              {/* Tag */}
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary/60 mb-4 block">
                {service.tag}
              </span>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/15 flex items-center justify-center group-hover:bg-secondary/20 group-hover:border-secondary/30 transition-all duration-400 mb-5">
                <service.icon className="w-5 h-5 text-secondary" />
              </div>

              {/* Content */}
              <h3 className="text-[15px] font-semibold text-white/90 leading-snug mb-3">{service.title}</h3>
              <p className="text-[13px] text-white/35 leading-relaxed">{service.description}</p>

              {/* Arrow on hover */}
              <div className="mt-5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1 group-hover:translate-y-0">
                <span className="text-[11px] text-secondary font-semibold">Learn more</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
