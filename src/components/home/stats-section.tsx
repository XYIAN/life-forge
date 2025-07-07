'use client';

import React from 'react';

interface Stat {
  value: string;
  label: string;
  color: string;
}

interface StatsSectionProps {
  stats: Stat[];
  className?: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  className = 'bg-gradient-to-r from-amber-500/10 to-orange-600/10',
}) => {
  return (
    <section className={`py-20 lg:py-32 ${className}`}>
      <div className="container mx-auto px-4 justify-content-center align-items-center justify-items-center flex flex-column">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
