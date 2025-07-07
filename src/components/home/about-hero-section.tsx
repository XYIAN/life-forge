'use client';

import React from 'react';
import Image from 'next/image';

export const AboutHeroSection: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-6rem h-6rem bg-gradient-to-br from-blue-500 to-purple-600 border-round-xl flex align-items-center justify-content-center mx-auto mb-4 p-2 shadow-lg">
        <Image
          src="/icon-1.png"
          alt="Life Forge Hero Icon"
          width={96}
          height={96}
          className="object-contain border-round-lg"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">About Life Forge</h1>
      <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
        A beautifully crafted personal dashboard designed to transform your daily routine into an
        adventure. Built with cutting-edge technology and a touch of magic.
      </p>
    </div>
  );
};
