import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { contactService } from '@/services';

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

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'daniyal.amjad7989@gmail.com', href: 'mailto:daniyal.amjad7989@gmail.com' },
  { icon: Phone, label: 'WhatsApp', value: '+92 335 6561702', href: 'https://wa.me/923356561702' },
  { icon: MapPin, label: 'Location', value: 'Islamabad, Pakistan' },
  { icon: Clock, label: 'Business Hours', value: 'Mon - Fri, 9AM - 6PM PKT' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  // Single clean handler — no e, no form submit, just a direct async function
  const handleSubmit = async () => {
    console.log('handleSubmit called', formData);
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      service: formData.service.trim(),
      message: formData.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      toast.error('Please fill in your Name, Email and Message.');
      return;
    }

    if (payload.name.length < 2) {
      toast.error('Please enter your full name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (payload.message.length < 10) {
      toast.error('Please enter a message of at least 10 characters.');
      return;
    }

    setSending(true);
    try {
      await contactService.createMessage(payload);
      toast.success("Message sent! I'll get back to you within 24 hours.");
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send. Please email me directly at daniyal.amjad7989@gmail.com');
    } finally {
      setSending(false);
    }
  };

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
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Get in Touch</span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
              Let's Start a
              <span className="text-secondary"> Conversation</span>
            </h1>
            <p className="mt-6 text-white/60 text-lg leading-relaxed">
              Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendly Booking Section */}
      <section className="py-20 bg-[#050d1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.25em] mb-4">
              <span className="w-6 h-[1px] bg-secondary/60" />
              Free Consultation
              <span className="w-6 h-[1px] bg-secondary/60" />
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-[1.15] mt-2">
              Book a Free
              <span className="block gold-shimmer py-1" style={{ WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>
                15-Minute Discovery Call
              </span>
            </h2>
            <p className="mt-4 text-white/45 text-base max-w-xl mx-auto leading-relaxed">
              Not sure where to start? Let's talk. Pick a time that works for you and we'll discuss your project — no commitment, no pressure.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-white/8 shadow-2xl"
          >
            <iframe
              src="https://calendly.com/daniyal-amjad7989/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=050d1a&text_color=ffffff&primary_color=c9a84c"
              width="100%"
              height="700"
              frameBorder="0"
              title="Book a Free Discovery Call"
              style={{ display: 'block' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display font-bold text-foreground mb-8">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-foreground hover:text-secondary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Hire Me</h3>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/in/muhammad-daniyal-amjad/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://www.upwork.com/freelancers/~013899322c02a33e0d" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300" aria-label="Upwork">
                    <UpworkIcon className="w-5 h-5" />
                  </a>
                  <a href="https://wa.me/923356561702" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300" aria-label="WhatsApp">
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="p-8 md:p-10 bg-card rounded-2xl border border-border shadow-lg">
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground text-sm mb-8">Fill out the form and we'll respond promptly.</p>

                {/* NOTE: no onSubmit on the form — button handles everything via onClick */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@company.com" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Company Name" value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Service Interested In</Label>
                      <Select value={formData.service} onValueChange={(val) => setFormData({ ...formData, service: val })}>
                        <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai-agents">AI Agents & Chatbots</SelectItem>
                          <SelectItem value="voice-agent">AI Voice Call Agent</SelectItem>
                          <SelectItem value="rag">RAG Systems & LLM Integration</SelectItem>
                          <SelectItem value="computer-vision">Computer Vision & OpenCV</SelectItem>
                          <SelectItem value="ml">Machine Learning & Predictive AI</SelectItem>
                          <SelectItem value="mlops">MLOps & Model Deployment</SelectItem>
                          <SelectItem value="n8n">n8n & Workflow Automation</SelectItem>
                          <SelectItem value="make-zapier">Make / Zapier Automation</SelectItem>
                          <SelectItem value="data-pipeline">Web Scraping & Data Pipelines</SelectItem>
                          <SelectItem value="ghl">GoHighLevel CRM Buildout</SelectItem>
                          <SelectItem value="zoho">Zoho CRM Integration</SelectItem>
                          <SelectItem value="crm-automation">CRM Automation & AI Scoring</SelectItem>
                          <SelectItem value="embedded">Embedded Systems & Firmware</SelectItem>
                          <SelectItem value="iot">IoT Development</SelectItem>
                          <SelectItem value="ai-saas">AI-Powered SaaS Solution</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea id="message" placeholder="Tell us about your project..." className="min-h-[150px]"
                      value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>

                  {/* Plain button with only onClick — no form, no type="submit" */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={sending}
                    className="w-full bg-primary text-primary-foreground hover:opacity-90 py-4 px-6 rounded-lg text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
