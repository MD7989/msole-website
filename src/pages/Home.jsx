import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TechStack from '../components/home/TechStack';
import ServicesPreview from '../components/home/ServicesPreview';
import AboutPreview from '../components/home/AboutPreview';
import ProjectsPreview from '../components/home/ProjectsPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechStack />
      <ServicesPreview />
      <AboutPreview />
      <ProjectsPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}