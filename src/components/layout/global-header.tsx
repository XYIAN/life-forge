'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { ThemeSwitcher } from '@common';
import Link from 'next/link';

interface GlobalHeaderProps {
  currentPage?: 'home' | 'dashboard' | 'about';
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ currentPage = 'home' }) => {
  return (
    <header className="sticky top-0 z-5 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex align-items-center justify-content-between">
          {/* Logo */}
          <Link href="/" className="text-decoration-none">
            <div className="flex align-items-center gap-3">
              <div className="w-3rem h-3rem bg-gradient-to-br from-amber-600 to-purple-600 border-round-xl flex align-items-center justify-content-center p-1 shadow-lg">
                <Image
                  src="/icon-2.png"
                  alt="Life Forge Logo"
                  width={48}
                  height={48}
                  className="object-contain border-round-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold m-0 bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
                  Life Forge
                </h1>
                <p className="text-sm text-white/90 m-0">Your Personal Daily Dashboard</p>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex align-items-center gap-2">
            {currentPage !== 'home' && (
              <Link href="/">
                <Button
                  label="Home"
                  icon="pi pi-home"
                  text
                  className="text-white hover:text-amber-400 transition-colors"
                />
              </Link>
            )}
            {currentPage !== 'dashboard' && (
              <Link href="/dashboard">
                <Button
                  label="Dashboard"
                  icon="pi pi-th-large"
                  text
                  className="text-white hover:text-amber-400 transition-colors"
                />
              </Link>
            )}
            {currentPage !== 'about' && (
              <Link href="/about">
                <Button
                  label="About"
                  icon="pi pi-info-circle"
                  text
                  className="text-white hover:text-amber-400 transition-colors"
                />
              </Link>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
