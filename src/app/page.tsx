'use client';

import React from 'react';
import { HeroSection, FeaturesSection, StatsSection, CTASection, TechStackSection } from '@home';
import { homeFeatures, homeStats, techStack } from '@data';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection features={homeFeatures} />
      <StatsSection stats={homeStats} />
      <CTASection />
      <TechStackSection techStack={techStack} />
    </div>
  );
}
