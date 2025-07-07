'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { AboutHeroSection, CreatorSection, PhilosophySection } from '@home';
import { aboutFeatures, aboutTechStack } from '@data';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <AboutHeroSection />

        {/* Features Grid */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: 'var(--foreground)' }}
          >
            ✨ Features & Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutFeatures.map((feature, index) => (
              <Card
                key={index}
                className="glass-card"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(25px) saturate(180%)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--foreground)',
                  height: '280px',
                  minHeight: '280px',
                  maxHeight: '280px',
                }}
              >
                <div className="flex flex-column align-items-center text-center gap-3 h-full">
                  <div
                    className="w-4rem h-4rem border-round-xl flex align-items-center justify-content-center glass-card flex-shrink-0"
                    style={{
                      background: 'var(--glass-bg)',
                      backdropFilter: 'blur(25px) saturate(180%)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    <i
                      className={`${feature.icon} text-2xl`}
                      style={{ color: 'var(--warm-gold)' }}
                    ></i>
                  </div>
                  <h3 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm m-0 line-height-3 flex-1"
                    style={{ color: 'var(--foreground)', opacity: 0.8 }}
                  >
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <Card
            className="glass-card"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
            }}
          >
            <h2
              className="text-2xl font-bold text-center mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              🛠️ Built With Modern Technology
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {aboutTechStack.map((tech, index) => (
                <div key={index} className="text-center">
                  <div className="flex flex-column align-items-center gap-2">
                    <div
                      className="w-3rem h-3rem border-round-xl flex align-items-center justify-content-center glass-card"
                      style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(25px) saturate(180%)',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <i
                        className={`${tech.icon} text-lg`}
                        style={{ color: 'var(--warm-gold)' }}
                      ></i>
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      {tech.name}
                    </span>
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
          <Card
            className="glass-card max-w-2xl mx-auto"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
            }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Ready to Transform Your Daily Routine?
            </h2>
            <p className="mb-6" style={{ color: 'var(--foreground)', opacity: 0.9 }}>
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
                style={{
                  background: 'var(--warm-gold)',
                  borderColor: 'var(--warm-gold)',
                  color: 'var(--background)',
                }}
              />
            </Link>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
            Made with ❤️ and a touch of magic by Kyle Dilbeck
          </p>
        </div>
      </footer>
    </div>
  );
}
