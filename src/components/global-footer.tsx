'use client';

import React from 'react';
import { Button } from 'primereact/button';
import Link from 'next/link';

export const GlobalFooter: React.FC = () => {
  return (
    <footer className="mt-12 py-8 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-column lg:flex-row justify-content-between align-items-center gap-6">
          {/* Left Section - Logo & Description */}
          <div className="flex flex-column align-items-center lg:align-items-start gap-3">
            <div className="flex align-items-center gap-2">
              <div className="w-2rem h-2rem bg-gradient-to-br from-amber-600 to-purple-600 border-round-lg flex align-items-center justify-content-center p-1">
                <img
                  src="/icon-2.png"
                  alt="Life Forge Logo"
                  className="w-full h-full object-contain border-round"
                />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
                Life Forge
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 m-0 text-center lg:text-left max-w-md">
              Transform your daily routine into an adventure with beautiful tracking and insights.
            </p>
          </div>

          {/* Center Section - Quick Links */}
          <div className="flex flex-column align-items-center gap-3">
            <h6 className="text-sm font-semibold m-0 text-gray-700 dark:text-gray-300">
              Quick Links
            </h6>
            <div className="flex gap-2">
              <Link href="/">
                <Button label="Home" icon="pi pi-home" size="small" severity="secondary" text />
              </Link>
              <Link href="/dashboard">
                <Button
                  label="Dashboard"
                  icon="pi pi-th-large"
                  size="small"
                  severity="secondary"
                  text
                />
              </Link>
              <Link href="/about">
                <Button
                  label="About"
                  icon="pi pi-info-circle"
                  size="small"
                  severity="secondary"
                  text
                />
              </Link>
            </div>
          </div>

          {/* Right Section - Social Links */}
          <div className="flex flex-column align-items-center gap-3">
            <h6 className="text-sm font-semibold m-0 text-gray-700 dark:text-gray-300">Connect</h6>
            <div className="flex gap-2">
              <Link href="https://github.com/xyian" target="_blank" rel="noopener noreferrer">
                <Button
                  icon="pi pi-github"
                  size="small"
                  severity="secondary"
                  text
                  rounded
                  aria-label="GitHub"
                />
              </Link>
              <Link
                href="https://linkedin.com/in/kxdilbeck"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  icon="pi pi-linkedin"
                  size="small"
                  severity="secondary"
                  text
                  rounded
                  aria-label="LinkedIn"
                />
              </Link>
              <Link href="https://kyledilbeck.com" target="_blank" rel="noopener noreferrer">
                <Button
                  icon="pi pi-external-link"
                  size="small"
                  severity="secondary"
                  text
                  rounded
                  aria-label="Website"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="flex flex-column lg:flex-row justify-content-between align-items-center gap-4 mt-8 pt-6 border-t border-gray-200/30 dark:border-gray-700/30">
          <div className="flex align-items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>© 2024 Kyle Dilbeck. All rights reserved.</span>
          </div>
          <div className="flex align-items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Built with Next.js & PrimeReact</span>
            <span>•</span>
            <span>Made with ❤️ and ☕</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
