'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export const CreatorSection: React.FC = () => {
  return (
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
        <div className="flex flex-column lg:flex-row align-items-center gap-6 lg:gap-8">
          <div className="flex-shrink-0">
            <div
              className="relative overflow-hidden glass-card border-round-xl"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(25px) saturate(180%)',
                border: '1px solid var(--glass-border)',
                width: 'clamp(120px, 25vw, 200px)',
                height: 'clamp(120px, 25vw, 200px)',
                aspectRatio: '1 / 1',
              }}
            >
              <Image
                src="/headshot.png"
                alt="Kyle Dilbeck - Creator of Life Forge"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 120px, (max-width: 1024px) 160px, 200px"
                priority
              />
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Meet the Creator
            </h2>
            <p className="mb-6 line-height-3" style={{ color: 'var(--foreground)', opacity: 0.9 }}>
              Hi! I&apos;m Kyle Dilbeck, a passionate developer who believes in creating beautiful,
              functional applications that enhance daily life. Life Forge represents my vision of
              combining modern web technologies with thoughtful design to create something truly
              magical.
            </p>
            <div className="flex flex-wrap justify-content-center lg:justify-content-start gap-3">
              <Link
                href="https://github.com/xyian"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <Button
                  label="GitHub"
                  icon="pi pi-github"
                  severity="info"
                  size="large"
                  className="font-semibold"
                  style={{
                    background: 'var(--warm-gold)',
                    borderColor: 'var(--warm-gold)',
                    color: 'var(--background)',
                  }}
                />
              </Link>
              <Link
                href="https://linkedin.com/in/kxdilbeck"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <Button
                  label="LinkedIn"
                  icon="pi pi-linkedin"
                  severity="success"
                  size="large"
                  className="font-semibold"
                  style={{
                    background: 'var(--warm-gold)',
                    borderColor: 'var(--warm-gold)',
                    color: 'var(--background)',
                  }}
                />
              </Link>
              <Link
                href="https://kyledilbeck.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <Button
                  label="Website"
                  icon="pi pi-globe"
                  severity="warning"
                  size="large"
                  className="font-semibold"
                  style={{
                    background: 'var(--warm-gold)',
                    borderColor: 'var(--warm-gold)',
                    color: 'var(--background)',
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
