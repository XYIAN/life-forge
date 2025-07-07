'use client';

import React from 'react';

interface TechItem {
  name: string;
  icon: string;
}

interface TechStackSectionProps {
  techStack: TechItem[];
  title?: string;
  subtitle?: string;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({
  techStack,
  title = 'Built with Modern Tech',
  subtitle = 'Life Forge is crafted with cutting-edge technologies for the best performance and user experience.',
}) => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 flex flex-column justify-content-center align-items-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
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
          <p className="text-xl text-white/90 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techStack.map((tech, index) => (
            <div key={index} className="text-center">
              <div className="w-4rem h-4rem bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-round-xl flex align-items-center justify-content-center mx-auto mb-3 border-1 border-amber-500/30">
                <i className={`${tech.icon} text-2xl text-amber-400`}></i>
              </div>
              <span className="text-sm font-medium text-white/90">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
