'use client';

import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { ThemeSwitcher } from '@/components/theme-switcher';
import Link from 'next/link';

export default function About() {
  const techStack = [
    { name: 'Next.js 15.3.3+', icon: 'pi pi-code', color: 'text-blue-600' },
    { name: 'TypeScript', icon: 'pi pi-file', color: 'text-blue-500' },
    { name: 'Tailwind CSS', icon: 'pi pi-palette', color: 'text-cyan-500' },
    { name: 'PrimeReact', icon: 'pi pi-star', color: 'text-purple-600' },
    { name: 'PrimeFlex', icon: 'pi pi-th-large', color: 'text-green-600' },
    { name: 'PrimeIcons', icon: 'pi pi-heart', color: 'text-red-500' },
  ];

  const features = [
    {
      icon: 'pi pi-tint',
      title: 'Smart Water Tracking',
      description: 'Automatically separates drinking sessions and tracks your hydration history.',
    },
    {
      icon: 'pi pi-heart',
      title: 'Mood Monitoring',
      description: 'Track your emotional state with beautiful visualizations and trend analysis.',
    },
    {
      icon: 'pi pi-star',
      title: 'Wisdom Orb',
      description: 'Over 5,000 inspirational quotes with magical interactions and easter eggs.',
    },
    {
      icon: 'pi pi-check-circle',
      title: 'Goal Management',
      description: 'Set daily objectives and celebrate your achievements with visual progress.',
    },
    {
      icon: 'pi pi-clock',
      title: 'Focus Timer',
      description: 'Pomodoro technique implementation with customizable work and break intervals.',
    },
    {
      icon: 'pi pi-palette',
      title: 'Theme Switching',
      description: 'Beautiful themes with light/dark modes and surprise me functionality.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-5 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex align-items-center justify-content-between">
            {/* Logo */}
            <Link href="/" className="text-decoration-none">
              <div className="flex align-items-center gap-3">
                <div className="w-3rem h-3rem bg-gradient-to-br from-blue-500 to-purple-600 border-round-xl flex align-items-center justify-content-center p-1 shadow-lg">
                  <img
                    src="/icon-2.png"
                    alt="Life Forge Logo"
                    className="w-full h-full object-contain border-round-lg"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold m-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Life Forge
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                    Your Personal Daily Dashboard
                  </p>
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <div className="flex align-items-center gap-2">
              <Link href="/">
                <Button label="Dashboard" icon="pi pi-home" severity="secondary" text />
              </Link>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-6rem h-6rem bg-gradient-to-br from-blue-500 to-purple-600 border-round-xl flex align-items-center justify-content-center mx-auto mb-4 p-2 shadow-lg">
            <img
              src="/icon-1.png"
              alt="Life Forge Hero Icon"
              className="w-full h-full object-contain border-round-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            About Life Forge
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A beautifully crafted personal dashboard designed to transform your daily routine into
            an adventure. Built with cutting-edge technology and a touch of magic.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            ✨ Features & Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card h-full">
                <div className="flex flex-column align-items-center text-center gap-3">
                  <div className="w-4rem h-4rem bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-round-xl flex align-items-center justify-content-center">
                    <i className={`${feature.icon} text-2xl text-blue-600`}></i>
                  </div>
                  <h3 className="text-lg font-semibold m-0">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 m-0 line-height-3">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <Card className="glass-card">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
              🛠️ Built With Modern Technology
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {techStack.map((tech, index) => (
                <div key={index} className="text-center">
                  <div className="flex flex-column align-items-center gap-2">
                    <div className="w-3rem h-3rem bg-white dark:bg-gray-800 border-round-xl flex align-items-center justify-content-center shadow-sm">
                      <i className={`${tech.icon} text-lg ${tech.color}`}></i>
                    </div>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Creator Section */}
        <div className="mb-12">
          <Card className="glass-card">
            <div className="flex flex-column lg:flex-row align-items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-8rem h-8rem bg-gradient-to-br from-blue-500 to-purple-600 border-round-xl flex align-items-center justify-content-center">
                  <i className="pi pi-user text-white text-4xl"></i>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  Meet the Creator
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-height-3">
                  Hi! I&apos;m Kyle Dilbeck, a passionate developer who believes in creating
                  beautiful, functional applications that enhance daily life. Life Forge represents
                  my vision of combining modern web technologies with thoughtful design to create
                  something truly magical.
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

        {/* Philosophy Section */}
        <div className="mb-12">
          <Card className="glass-card text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              🌟 Development Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-column align-items-center gap-3">
                <Badge value="1" severity="info" className="w-2rem h-2rem text-lg font-bold" />
                <h3 className="text-lg font-semibold m-0">Beautiful & Functional</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  Every component is designed with both aesthetics and usability in mind.
                </p>
              </div>
              <div className="flex flex-column align-items-center gap-3">
                <Badge value="2" severity="success" className="w-2rem h-2rem text-lg font-bold" />
                <h3 className="text-lg font-semibold m-0">Privacy First</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  All your data stays local in your browser. No servers, no tracking.
                </p>
              </div>
              <div className="flex flex-column align-items-center gap-3">
                <Badge value="3" severity="warning" className="w-2rem h-2rem text-lg font-bold" />
                <h3 className="text-lg font-semibold m-0">Continuous Magic</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  Hidden easter eggs and delightful interactions make daily tracking fun.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Ready to Transform Your Daily Routine?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start your journey with Life Forge today and discover the magic of mindful daily
              tracking.
            </p>
            <Link href="/">
              <Button
                label="Get Started"
                icon="pi pi-arrow-right"
                size="large"
                severity="info"
                className="font-semibold"
              />
            </Link>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
            Made with ❤️ and a touch of magic by Kyle Dilbeck
          </p>
        </div>
      </footer>
    </div>
  );
}
