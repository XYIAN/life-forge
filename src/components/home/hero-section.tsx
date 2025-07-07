'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { useScrollStagger } from '@hooks';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollStagger({
    elementRef: sectionRef as React.RefObject<HTMLElement>,
    staggerDelay: 150,
    duration: 1000,
    animation: 'fadeIn',
  });

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hero Icon */}
          <div
            data-animate
            className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 border-round-xl flex align-items-center justify-content-center mx-auto mb-6 shadow-2xl"
          >
            <Image
              src="/icon-1.png"
              alt="Life Forge Hero Icon"
              width={80}
              height={80}
              className="object-contain border-round-lg"
              priority
            />
          </div>

          {/* Hero Text */}
          <h1
            data-animate
            className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-purple-600 bg-clip-text text-transparent leading-tight"
          >
            Life Forge
          </h1>
          <p data-animate className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
            Transform your daily routine into an{' '}
            <span className="text-amber-400 font-semibold">adventure</span>.
            <br />
            Track, analyze, and optimize your life with beautiful insights.
          </p>

          {/* CTA Buttons */}
          <div data-animate className="flex gap-4 justify-content-center flex-wrap">
            <Link href="/dashboard">
              <Button
                label="Launch Dashboard"
                icon="pi pi-rocket"
                size="large"
                className="bg-gradient-to-r from-amber-500 to-orange-600 border-none text-white font-bold px-8 py-3 shadow-2xl hover:shadow-3xl"
              />
            </Link>
            <Link href="/about">
              <Button
                label="Learn More"
                icon="pi pi-info-circle"
                size="large"
                severity="secondary"
                outlined
                className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white px-8 py-3"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
