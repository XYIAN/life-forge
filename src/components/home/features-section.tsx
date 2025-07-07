'use client';

import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { useScrollStagger } from '@hooks';

interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
  title = 'Everything You Need to Thrive',
  subtitle = 'Life Forge combines powerful tracking tools with beautiful design to help you build better habits and achieve your goals.',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollStagger({
    elementRef: sectionRef as React.RefObject<HTMLElement>,
    staggerDelay: 100,
    duration: 800,
    animation: 'slideUp',
  });

  return (
    <section ref={sectionRef} className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 data-animate className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            {title.split(' ').map((word, index) =>
              index === title.split(' ').length - 1 ? (
                <span key={index} className="text-amber-400">
                  {word}
                </span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h2>
          <p data-animate className="text-xl text-white/90 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              data-animate
              className="glass-card h-full hover:transform hover:scale-105 transition-all duration-300 border-1 border-amber-500/20"
            >
              <div className="flex flex-column align-items-center text-center gap-4 p-4">
                <div
                  className={`w-4rem h-4rem bg-gradient-to-br ${feature.gradient} border-round-xl flex align-items-center justify-content-center border-2 border-white/20 shadow-lg`}
                >
                  <i className={`${feature.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-white m-0">{feature.title}</h3>
                <p className="text-white/80 m-0 line-height-3">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
