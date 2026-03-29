import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitMerge, Bot, Users, Database, Brain, Cpu, Wifi, Eye, ArrowRight, CheckCircle, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    tag: 'AI / ML',
    description: 'Custom ML models that learn, adapt, and deliver measurable results from predictive analytics to full MLOps deployment.',
    image: 'https://media.base44.com/images/public/69bdfa4cdc485779f5219af4/f3e988f9c_generated_image.png',
    features: [
      'Custom ML Model Development & Training',
      'Natural Language Processing (NLP)',
      'Predictive Analytics & Forecasting',
      'MLOps deploying & monitoring ML models in production',
      'AI-Powered SaaS Solutions',
    ],
  },
  {
    icon: Eye,
    title: 'Computer Vision & OpenCV',
    tag: 'Vision AI',
    description: 'Advanced image and video analysis systems from real-time object detection to industrial quality inspection.',
    image: 'https://media.base44.com/images/public/69bdfa4cdc485779f5219af4/2dae63555_generated_image.png',
    features: [
      'Object Detection & Recognition (YOLO, SSD)',
      'OpenCV real-time image processing',
      'Industrial defect detection & quality control',
      'Facial recognition & biometric systems',
      'Video analytics & surveillance AI',
    ],
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    tag: 'Hardware',
    description: 'Robust firmware, RTOS integration, and hardware-software co-design for mission-critical applications.',
    image: 'https://media.base44.com/images/public/69bdfa4cdc485779f5219af4/f3138c8c9_generated_image.png',
    features: [
      'Firmware Development (C/C++)',
      'RTOS Integration & Optimization',
      'Hardware-Software Co-Design',
      'STM32, ESP32, Raspberry Pi',
      'Device Driver Development',
    ],
  },
  {
    icon: Wifi,
    title: 'IoT Development',
    tag: 'IoT',
    description: 'End-to-end connected ecosystems with secure protocols, edge computing, and real-time analytics.',
    image: 'https://media.base44.com/images/public/69bdfa4cdc485779f5219af4/2d6ce53ee_generated_image.png',
    features: [
      'Sensor Integration & Edge Computing',
      'MQTT, HTTP, WebSocket protocols',
      'Cloud Connectivity (AWS IoT, Firebase)',
      'Remote Monitoring & Dashboards',
      'Smart Device & Home Automation',
    ],
  },
  {
    icon: GitMerge,
    title: 'n8n & No-Code Automation',
    tag: 'Automation',
    description: 'End-to-end workflow automation pipelines that eliminate repetitive manual work across your entire organization.',
    image: 'https://media.base44.com/images/public/69bdfa4cdc485779f5219af4/4d52fbb85_generated_image.png',
    features: [
      'n8n end-to-end workflow automation pipelines',
      'Make (Integromat) no-code automation workflows',
      'Zapier business process automation',
      'OpenAI integration AI-powered automation',
      'Web Scraping & Data Pipelines (Python & Selenium)',
    ],
  },
  {
    icon: Users,
    title: 'CRM Integrations',
    tag: 'CRM',
    description: 'Full pipeline automation and deep CRM integrations that keep your sales and support running smoothly.',
    image: 'https://media.base44.com/images/public/69bdfa4cdc485779f5219af4/c77917eac_generated_image.png',
    features: [
      'GoHighLevel (GHL) custom workflows & API integrations',
      'Zoho CRM custom workflows & automations',
      'Full CRM pipeline automation',
      'Third-party API integrations',
      'Lead management & follow-up automation',
    ],
  },
  {
    icon: Bot,
    title: 'AI Agents & Chatbots',
    tag: 'Agents',
    description: 'Autonomous agents and multi-step agentic pipelines that handle lead qualification, support, and sales 24/7.',
    image: 'https://media.base44.com/images/public/69bdfa4cdc485779f5219af4/b617f2fd0_generated_image.png',
    features: [
      'AI Agent Development autonomous multi-step pipelines',
      'RAG Systems production-grade Retrieval-Augmented Generation',
      'AI Chatbots lead qualification & 24/7 support',
      'AI Voice Call Agents bookings, support & sales',
      'Custom knowledge base integration',
    ],
  },
  {
    icon: Database,
    title: 'Data Pipelines & Analytics',
    tag: 'Data',
    description: 'Large-scale data extraction, transformation, and analytics pipelines that turn raw data into decisive insights.',
    image: 'https://media.base44.com/images/public/69bdfa4cdc485779f5219af4/ae2188fd1_generated_image.png',
    features: [
      'Web scraping at scale with Python & Selenium',
      'ETL pipeline design & implementation',
      'Real-time data streaming & processing',
      'Database architecture (PostgreSQL, MongoDB, Redis)',
      'Business intelligence & reporting dashboards',
    ],
  },
];

function ServiceCard({ service, idx }) {
  const isEven = idx % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/6 bg-[#070f1e] hover:border-secondary/20 transition-colors duration-500`}
    >
      {/* Image side */}
      <div className={`relative overflow-hidden aspect-[4/3] lg:aspect-auto ${!isEven ? 'lg:order-2' : ''}`}>
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className={`absolute inset-0 ${isEven
          ? 'bg-gradient-to-r from-transparent to-[#070f1e]/60'
          : 'bg-gradient-to-l from-transparent to-[#070f1e]/60'}`}
        />
        {/* Tag badge on image */}
        <div className="absolute top-5 left-5">
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/35 text-secondary backdrop-blur-sm">
            {service.tag}
          </span>
        </div>
      </div>

      {/* Content side */}
      <div className={`flex flex-col justify-center p-10 lg:p-14 ${!isEven ? 'lg:order-1' : ''}`}>
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
          <service.icon className="w-6 h-6 text-secondary" />
        </div>

        <h3 className="text-2xl lg:text-3xl font-display font-bold text-white leading-tight">
          {service.title}
        </h3>
        <p className="mt-4 text-white/45 leading-relaxed text-base">
          {service.description}
        </p>

        {/* Features */}
        <ul className="mt-8 space-y-3">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span className="text-white/65 text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA link */}
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 text-secondary text-sm font-semibold hover:gap-3 transition-all duration-300 group"
        >
          Get a Quote
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#050d1a] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.25em] mb-6">
              <span className="w-8 h-[1px] bg-secondary/60" />
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.08]">
              Solutions That
              <span className="block gold-shimmer mt-1">Drive Innovation</span>
            </h1>
            <p className="mt-7 text-white/45 text-lg leading-relaxed max-w-xl">
              Comprehensive engineering services spanning AI, embedded systems, IoT, and intelligent automation delivered with precision.
            </p>

            {/* Service count strip */}
            <div className="flex items-center gap-6 mt-10">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-display font-bold text-secondary">8</span>
                <span className="text-white/30 text-sm">Core Services</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-3xl font-display font-bold text-secondary">40+</span>
                <span className="text-white/30 text-sm">Projects Delivered</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-3xl font-display font-bold text-secondary">15+</span>
                <span className="text-white/30 text-sm">Clients Worldwide</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-[#050d1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          {services.map((service, idx) => (
            <ServiceCard key={service.title} service={service} idx={idx} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#050d1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary/6 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-secondary/15 bg-white/[0.02] p-14 text-center gold-glow"
          >
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.25em]">Ready to Start?</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold text-white leading-tight">
              Need a Custom Solution?
            </h2>
            <p className="mt-4 text-white/40 text-lg max-w-lg mx-auto">
              Every project is unique. Let's discuss your specific requirements and build something extraordinary.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 group gold-glow-sm"
            >
              Get a Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
