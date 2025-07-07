'use client';

import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: 'pi pi-tint',
      title: 'Smart Water Tracking',
      description: 'Track your hydration with intelligent session detection and goal management.',
      color: 'text-blue-500',
    },
    {
      icon: 'pi pi-heart',
      title: 'Mood Analytics',
      description: 'Monitor your emotional well-being with detailed insights and trends.',
      color: 'text-pink-500',
    },
    {
      icon: 'pi pi-star',
      title: 'Wisdom Orb',
      description: 'Over 5,000 inspirational quotes with magical interactions and surprises.',
      color: 'text-yellow-500',
    },
    {
      icon: 'pi pi-check-circle',
      title: 'Goal Management',
      description: 'Set and track daily objectives with beautiful progress visualization.',
      color: 'text-green-500',
    },
    {
      icon: 'pi pi-clock',
      title: 'Focus Timer',
      description: 'Boost productivity with Pomodoro technique and session analytics.',
      color: 'text-purple-500',
    },
    {
      icon: 'pi pi-palette',
      title: 'Dynamic Themes',
      description: 'Beautiful themes that adapt to your mood and preferences.',
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Hero Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 border-round-xl flex align-items-center justify-content-center mx-auto mb-6 shadow-2xl">
              <img
                src="/icon-1.png"
                alt="Life Forge Hero Icon"
                className="w-full h-full object-contain border-round-lg"
              />
            </div>

            {/* Hero Text */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-purple-600 bg-clip-text text-transparent leading-tight">
              Life Forge
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your daily routine into an{' '}
              <span className="text-amber-400 font-semibold">adventure</span>.
              <br />
              Track, analyze, and optimize your life with beautiful insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-content-center flex-wrap">
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

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Everything You Need to <span className="text-amber-400">Thrive</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Life Forge combines powerful tracking tools with beautiful design to help you build
              better habits and achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass-card h-full hover:transform hover:scale-105 transition-all duration-300 border-1 border-amber-500/20"
              >
                <div className="flex flex-column align-items-center text-center gap-4 p-4">
                  <div className="w-4rem h-4rem bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-round-xl flex align-items-center justify-content-center border-2 border-amber-500/30">
                    <i className={`${feature.icon} text-3xl ${feature.color}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white m-0">{feature.title}</h3>
                  <p className="text-gray-300 m-0 line-height-3">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-amber-500/10 to-orange-600/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-400 mb-2">5,000+</div>
              <div className="text-gray-300">Inspirational Quotes</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">∞</div>
              <div className="text-gray-300">Customization Options</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-500 mb-2">24/7</div>
              <div className="text-gray-300">Progress Tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <Card className="glass-card max-w-4xl mx-auto text-center p-8 border-2 border-amber-500/30">
            <div className="flex flex-column align-items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 border-round-xl flex align-items-center justify-content-center shadow-2xl">
                <i className="pi pi-sparkles text-white text-3xl"></i>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white m-0">
                Ready to Transform Your Life?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of users who have already started their journey to a more organized,
                motivated, and fulfilling life.
              </p>
              <div className="flex gap-4 justify-content-center flex-wrap mt-4">
                <Link href="/dashboard">
                  <Button
                    label="Get Started Now"
                    icon="pi pi-arrow-right"
                    size="large"
                    className="bg-gradient-to-r from-amber-500 to-orange-600 border-none text-white font-bold px-8 py-3 shadow-2xl hover:shadow-3xl"
                  />
                </Link>
                <Badge value="Free Forever" severity="success" className="text-lg px-4 py-2" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Built with <span className="text-amber-400">Modern Tech</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Life Forge is crafted with cutting-edge technologies for the best performance and user
              experience.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Next.js', icon: 'pi pi-code' },
              { name: 'TypeScript', icon: 'pi pi-file' },
              { name: 'Tailwind', icon: 'pi pi-palette' },
              { name: 'PrimeReact', icon: 'pi pi-star' },
              { name: 'React', icon: 'pi pi-heart' },
              { name: 'Modern CSS', icon: 'pi pi-sparkles' },
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="w-4rem h-4rem bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-round-xl flex align-items-center justify-content-center mx-auto mb-3 border-1 border-amber-500/30">
                  <i className={`${tech.icon} text-2xl text-amber-400`}></i>
                </div>
                <span className="text-sm font-medium text-gray-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
