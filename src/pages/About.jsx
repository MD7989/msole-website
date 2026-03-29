import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Rocket, Target, CheckCircle, Linkedin } from 'lucide-react';
import SectionHeading from '../components/shared/SectionHeading';

const UpworkIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socialLinks = [
  { href: 'https://www.linkedin.com/in/muhammad-daniyal-amjad/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://www.upwork.com/freelancers/~013899322c02a33e0d', label: 'Upwork', icon: UpworkIcon },
  { href: 'https://wa.me/923356561702', label: 'WhatsApp', icon: WhatsAppIcon },
];

const milestones = [
  { year: '2025', title: 'Founded', desc: 'M·SOLE was born from a vision to bridge AI and hardware engineering.' },
  { year: '2025', title: 'First Clients', desc: 'Onboarded our first clients and delivered early-stage AI automation projects.' },
  { year: '2025', title: 'Going Global', desc: 'Began serving clients remotely across multiple countries and time zones.' },
  { year: '2026', title: 'Growing Strong', desc: 'Expanding our portfolio with embedded systems, IoT, and intelligent automation solutions.' },
];

const capabilities = [
  'Machine Learning & Deep Learning',
  'Computer Vision & Image Processing',
  'Natural Language Processing',
  'Embedded C/C++ & RTOS',
  'PCB Design & Prototyping',
  'IoT & Edge Computing',
  'Full-Stack Web & Mobile Development',
  'Cloud Architecture & DevOps',
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">About Us</span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
              Building the Future,
              <span className="text-secondary"> One System at a Time</span>
            </h1>
            <p className="mt-6 text-white/60 text-lg leading-relaxed">
              M·SOLE is a freshly launched technology studio founded by Muhammad Daniyal Amjad,
              specializing in AI and Embedded Systems engineering built from day one to solve real problems.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">Hire Me</span>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-secondary hover:bg-white/15 hover:border-secondary/40 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-10 bg-card rounded-2xl border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground">Our Mission</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                To deliver innovative, reliable, and scalable technology solutions that empower
                businesses to thrive in an increasingly connected world. We bridge the gap between
                artificial intelligence and physical systems.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-10 bg-card rounded-2xl border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                <Rocket className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground">Our Vision</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                To become a globally trusted name in intelligent systems engineering where every device
                is smarter, every process is optimized, and every solution drives meaningful impact
                for our clients and their communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Know"
            title="Core Capabilities"
            description="A multidisciplinary skill set spanning the full technology stack."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={cap}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
              >
                <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm font-medium text-foreground">{cap}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Journey"
            title="Key Milestones"
            description={undefined}
          />
          <div className="max-w-2xl mx-auto">
            {milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-secondary font-bold text-sm shrink-0">
                    {item.year}
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, value: '40+', label: 'Projects Delivered' },
              { icon: Users, value: '15+', label: 'Global Clients' },
              { icon: Rocket, value: '3+', label: 'Years Experience' },
              { icon: Target, value: '3', label: 'Continents Served' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-display font-bold text-white">{stat.value}</p>
                <p className="text-white/50 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
