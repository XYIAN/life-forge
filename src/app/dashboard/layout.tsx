'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card } from 'primereact/card';
import { ShineBorder } from '@/components/magicui';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const dashboardSections = [
  {
    id: 'overview',
    title: 'Overview',
    icon: 'pi pi-home',
    href: '/dashboard',
    description: 'Main dashboard overview',
  },
  {
    id: 'goals',
    title: 'Goals',
    icon: 'pi pi-target',
    href: '/dashboard/goals',
    description: 'Daily and long-term goals',
  },
  {
    id: 'workouts',
    title: 'Workouts',
    icon: 'pi pi-bolt',
    href: '/dashboard/workouts',
    description: 'Exercise and fitness tracking',
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    icon: 'pi pi-apple',
    href: '/dashboard/nutrition',
    description: 'Food and nutrition tracking',
  },
  {
    id: 'sleep',
    title: 'Sleep',
    icon: 'pi pi-moon',
    href: '/dashboard/sleep',
    description: 'Sleep quality and patterns',
  },
  {
    id: 'meditation',
    title: 'Meditation',
    icon: 'pi pi-heart',
    href: '/dashboard/meditation',
    description: 'Mindfulness and meditation',
  },
  {
    id: 'social',
    title: 'Social',
    icon: 'pi pi-users',
    href: '/dashboard/social',
    description: 'Social activities and connections',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: 'pi pi-chart-line',
    href: '/dashboard/analytics',
    description: 'Detailed analytics and insights',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'pi pi-cog',
    href: '/dashboard/settings',
    description: 'Dashboard preferences and settings',
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="dashboard-layout min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Dashboard Navigation */}
        <div className="mb-8">
          <ShineBorder
            className="rounded-lg p-4"
            shineColor={['#3b82f6', '#8b5cf6', '#ec4899']}
            duration={8}
            borderWidth={2}
          >
            <Card className="glass-card">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {dashboardSections.map(section => {
                  const isActive = pathname === section.href;
                  return (
                    <Link key={section.id} href={section.href} passHref>
                      <a
                        className={`p-4 border-round-lg cursor-pointer transition-all duration-300 glass-card hover:scale-105 ${
                          isActive ? 'border-2 shadow-lg' : 'border-1'
                        }`}
                        style={{
                          borderColor: isActive ? 'var(--warm-gold)' : 'var(--glass-border)',
                          background: isActive ? 'rgba(212, 175, 55, 0.1)' : 'var(--glass-bg)',
                          textDecoration: 'none',
                          display: 'block',
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2" style={{ color: 'var(--warm-gold)' }}>
                            <i className={section.icon}></i>
                          </div>
                          <h3
                            className="text-sm font-semibold m-0"
                            style={{ color: 'var(--foreground)' }}
                          >
                            {section.title}
                          </h3>
                          <p
                            className="text-xs m-0 mt-1"
                            style={{ color: 'var(--foreground)', opacity: 0.7 }}
                          >
                            {section.description}
                          </p>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </Card>
          </ShineBorder>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
