'use client';

import React from 'react';
import Image from 'next/image';

export const AboutHeroSection: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div
        className="w-6rem h-6rem border-round-xl flex align-items-center justify-content-center mx-auto mb-4 p-2 glass-card"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Image
          src="/icon-1.png"
          alt="Life Forge Hero Icon"
          width={96}
          height={96}
          className="object-contain border-round-lg"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
        About Life Forge
      </h1>
      <p
        className="text-xl max-w-3xl mx-auto leading-relaxed"
        style={{ color: 'var(--foreground)', opacity: 0.9 }}
      >
        A beautifully crafted personal dashboard designed to transform your daily routine into an
        adventure. Built with cutting-edge technology and a touch of magic.
      </p>
    </div>
  );
};
