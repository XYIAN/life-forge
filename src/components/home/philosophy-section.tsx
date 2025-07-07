'use client';

import React from 'react';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

interface PhilosophyItem {
  number: number;
  title: string;
  description: string;
  severity: 'info' | 'success' | 'warning';
}

interface PhilosophySectionProps {
  items?: PhilosophyItem[];
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  items = [
    {
      number: 1,
      title: 'Beautiful & Functional',
      description: 'Every component is designed with both aesthetics and usability in mind.',
      severity: 'info',
    },
    {
      number: 2,
      title: 'Privacy First',
      description: 'All your data stays local in your browser. No servers, no tracking.',
      severity: 'success',
    },
    {
      number: 3,
      title: 'Continuous Magic',
      description: 'Hidden easter eggs and delightful interactions make daily tracking fun.',
      severity: 'warning',
    },
  ],
}) => {
  return (
    <div className="mb-12">
      <Card
        className="glass-card text-center"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          color: 'var(--foreground)',
        }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
          🌟 Development Philosophy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex flex-column align-items-center gap-3">
              <Badge
                value={item.number.toString()}
                severity={item.severity}
                className="w-2rem h-2rem text-lg font-bold"
                style={{
                  background: 'var(--warm-gold)',
                  color: 'var(--background)',
                }}
              />
              <h3 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
                {item.title}
              </h3>
              <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
