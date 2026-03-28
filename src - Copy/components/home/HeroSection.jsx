import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Zap, Linkedin } from 'lucide-react';

const ROTATING_WORDS = [
  'Computer Vision',
  'AI Automation',
  'n8n Workflows',
  'CRM Systems',
  'AI Agents',
  'Embedded Systems',
];

const stats = [
  { value: '40+', label: 'Projects Delivered' },
  { value: '15+', label: 'Global Clients' },
  { value: '3+',  label: 'Years Experience' },
  { value: '3',   label: 'Continents Served' },
];

// Upwork SVG Icon
const UpworkIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

// WhatsApp SVG Icon
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/muhammad-daniyal-amjad/',
    label: 'LinkedIn',
    icon: Linkedin,
    isCustom: false,
  },
  {
    href: 'https://www.upwork.com/freelancers/~013899322c02a33e0d',
    label: 'Upwork',
    icon: UpworkIcon,
    isCustom: true,
  },
  {
    href: 'https://wa.me/923356561702',
    label: 'WhatsApp',
    icon: WhatsAppIcon,
    isCustom: true,
  },
];

function TypingWord({ words }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx, words]);

  return (
    <span className="gold-shimmer">
      {displayed}
      <span className="inline-block w-[3px] h-[0.85em] bg-secondary ml-1 align-middle animate-pulse rounded-sm" />
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050d1a]">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030812] via-[#050d1a] to-[#040b18]" />
        <div className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[130px]" />
        <div className="absolute left-0 bottom-1/3 w-[400px] h-[400px] rounded-full bg-blue-900/15 blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-25" />
      </div>

      {/* Location / meta strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 flex items-center gap-2 mb-12 mt-4"
      >
        <span className="flex h-1.5 w-1.5 rounded-full bg-secondary/70" />
        <span className="text-[11px] font-mono text-white/30 tracking-[0.2em] uppercase">
          Islamabad, Pakistan · Est. 2022 · Remote Worldwide
        </span>
      </motion.div>

      {/* Main hero content — centered */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display font-bold leading-[1.08] tracking-tight"
        >
          <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] text-white">
            We Build
          </span>
          <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] mt-1 min-h-[1.15em]">
            <TypingWord words={ROTATING_WORDS} />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 text-base md:text-lg text-white/45 leading-relaxed max-w-xl"
        >
          M·SOLE is an independent AI & engineering studio. We deliver{' '}
          <strong className="text-white/70 font-semibold">production-ready automation</strong>,{' '}
          <strong className="text-white/70 font-semibold">intelligent systems</strong>, and{' '}
          <strong className="text-white/70 font-semibold">custom embedded hardware</strong>{' '}
          to businesses worldwide.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 gold-glow-sm text-sm tracking-wide"
          >
            <Mail className="w-4 h-4" />
            Start a Project
            <span className="text-secondary-foreground/60 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/5 text-white/75 font-semibold rounded-lg transition-all duration-300 border border-white/10 hover:border-secondary/35 hover:text-white hover:bg-white/8 text-sm tracking-wide"
          >
            <Zap className="w-4 h-4 text-secondary/70" />
            View Our Work
          </Link>
        </motion.div>

        {/* Hire Me — social links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.88 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Hire Us</span>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-secondary hover:bg-white/10 hover:border-secondary/30 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.95 }}
        className="relative z-10 w-full max-w-3xl mx-auto mt-16 px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/6 border border-white/6 rounded-2xl bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 hover:bg-white/[0.03] transition-colors duration-200">
              <span className="text-3xl font-display font-bold text-secondary">{stat.value}</span>
              <span className="text-[10px] text-white/30 uppercase tracking-[0.15em] mt-1.5 text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}