import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'Services', path: '/services', hasDropdown: true,
    children: [
      { label: 'AI & Machine Learning', path: '/services' },
      { label: 'n8n & Automation', path: '/services' },
      { label: 'CRM Integrations', path: '/services' },
      { label: 'AI Agents & Chatbots', path: '/services' },
      { label: 'Embedded Systems', path: '/services' },
      { label: 'Computer Vision', path: '/services' },
    ],
  },
  { label: 'Our Work', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#050d1a]/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/5'
        : 'bg-[#050d1a]/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <span className="text-base font-display font-bold text-white tracking-widest">
              M<span className="text-secondary">·</span>SOLE
            </span>
            <span className="hidden sm:block text-[9px] font-mono text-white/25 tracking-wider border border-white/10 px-1.5 py-0.5 rounded">
              AI STUDIO
            </span>
          </Link>

          {/* Desktop Nav — centered */}
          <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <div key={link.path} className="relative"
                onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-200 rounded-md ${
                    location.pathname === link.path
                      ? 'text-white bg-white/8'
                      : 'text-white/55 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label.toUpperCase()}
                  {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-50" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.hasDropdown && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-[#070f1e] border border-white/8 shadow-2xl shadow-black/60 py-2 overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block px-4 py-2.5 text-[12px] text-white/50 hover:text-white hover:bg-white/5 transition-all duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right side — social icons + status + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Social icons */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all duration-200">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all duration-200">
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
            <a href="mailto:contact@msole.com"
              className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all duration-200">
              <Mail className="w-3.5 h-3.5" />
            </a>

            {/* Available badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-500/25 bg-green-500/8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-green-400 font-medium">Available</span>
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-secondary-foreground text-[12px] font-bold rounded-lg hover:bg-secondary/90 transition-all duration-200 shadow-lg shadow-secondary/20 tracking-wide"
            >
              Hire Us
              <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/70 hover:text-white p-2 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-[#060e1c]/98 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-5 py-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-secondary bg-secondary/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="block mt-4 px-4 py-3 bg-secondary text-secondary-foreground text-sm font-semibold rounded-lg text-center"
              >
                Hire Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}