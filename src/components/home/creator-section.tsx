'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export const CreatorSection: React.FC = () => {
  return (
    <div className="mb-12">
      <Card className="glass-card">
        <div className="flex flex-column lg:flex-row align-items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-8rem h-8rem bg-gradient-to-br from-blue-500 to-purple-600 border-round-xl flex align-items-center justify-content-center">
              <i className="pi pi-user text-white text-4xl"></i>
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-4 text-white">Meet the Creator</h2>
            <p className="text-white/90 mb-6 line-height-3">
              Hi! I&apos;m Kyle Dilbeck, a passionate developer who believes in creating beautiful,
              functional applications that enhance daily life. Life Forge represents my vision of
              combining modern web technologies with thoughtful design to create something truly
              magical.
            </p>
            <div className="flex justify-content-center lg:justify-content-start gap-3">
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
                />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
