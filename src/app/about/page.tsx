'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { AboutHeroSection } from '@/components/home/about-hero-section';
import { CreatorSection } from '@/components/home/creator-section';
import { PhilosophySection } from '@/components/home/philosophy-section';
import { aboutFeatures, aboutTechStack } from '@/data/about-data';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <AboutHeroSection />

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            ✨ Features & Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutFeatures.map((feature, index) => (
              <Card key={index} className="glass-card h-full">
                <div className="flex flex-column align-items-center text-center gap-3">
                  <div className="w-4rem h-4rem bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-round-xl flex align-items-center justify-content-center">
                    <i className={`${feature.icon} text-2xl text-blue-600`}></i>
                  </div>
                  <h3 className="text-lg font-semibold m-0">{feature.title}</h3>
                  <p className="text-sm text-white/80 m-0 line-height-3">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <Card className="glass-card">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">
              🛠️ Built With Modern Technology
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {aboutTechStack.map((tech, index) => (
                <div key={index} className="text-center">
                  <div className="flex flex-column align-items-center gap-2">
                    <div className="w-3rem h-3rem bg-white dark:bg-gray-800 border-round-xl flex align-items-center justify-content-center shadow-sm">
                      <i className={`${tech.icon} text-lg ${tech.color}`}></i>
                    </div>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <CreatorSection />
        <PhilosophySection />

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Ready to Transform Your Daily Routine?
            </h2>
            <p className="text-white/90 mb-6">
              Start your journey with Life Forge today and discover the magic of mindful daily
              tracking.
            </p>
            <Link href="/">
              <Button
                label="Get Started"
                icon="pi pi-arrow-right"
                size="large"
                severity="info"
                className="font-semibold"
              />
            </Link>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-white/70 m-0">
            Made with ❤️ and a touch of magic by Kyle Dilbeck
          </p>
        </div>
      </footer>
    </div>
  );
}
