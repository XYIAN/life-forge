'use client';

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { ThemeSwitcher } from '@common';
import { useTheme } from '@/lib/providers/theme-provider';
import Link from 'next/link';
import Image from 'next/image';

interface HamburgerMenuProps {
  currentPage?: 'home' | 'dashboard' | 'about';
  className?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  currentPage = 'home',
  className,
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { isDarkMode } = useTheme();

  const navigationItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      href: '/',
      active: currentPage === 'home',
      description: 'Landing page and overview',
    },
    {
      label: 'Dashboard',
      icon: 'pi pi-th-large',
      href: '/dashboard',
      active: currentPage === 'dashboard',
      description: 'Your personal wellness dashboard',
    },
    {
      label: 'About',
      icon: 'pi pi-info-circle',
      href: '/about',
      active: currentPage === 'about',
      description: 'Learn more about Life Forge',
    },
  ];

  const handleNavigation = () => {
    setSidebarVisible(false);
    // Navigation will be handled by Link component
  };

  return (
    <>
      {/* Hamburger Button - Only visible on mobile/tablet */}
      <div className={`block lg:hidden ${className || ''}`}>
        <Button
          icon="pi pi-bars"
          onClick={() => setSidebarVisible(true)}
          className="p-button-text p-button-rounded"
          style={{
            color: isDarkMode ? '#ffffff' : '#1f2937',
            background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            border: isDarkMode
              ? '1px solid rgba(255, 255, 255, 0.2)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(25px) saturate(180%)',
            fontSize: '1.5rem',
            width: '3rem',
            height: '3rem',
          }}
          aria-label="Open navigation menu"
        />
      </div>

      {/* Mobile Navigation Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="right"
        style={{
          width: '85vw',
          maxWidth: '350px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(25px) saturate(180%)',
          borderLeft: '1px solid var(--glass-border)',
          color: 'var(--foreground)',
        }}
        header={
          <div className="flex align-items-center gap-3">
            <div className="w-2rem h-2rem bg-gradient-to-br from-amber-600 to-purple-600 border-round-lg flex align-items-center justify-content-center p-1">
              <Image
                src="/icon-2.png"
                alt="Life Forge Logo"
                width={32}
                height={32}
                className="object-contain border-round"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold m-0 bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
                Life Forge
              </h3>
              <p className="text-xs m-0" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Navigation Menu
              </p>
            </div>
          </div>
        }
        className="hamburger-sidebar"
      >
        <div className="flex flex-column gap-4">
          {/* Current Page Indicator */}
          <Card className="text-center glass-card">
            <div className="flex flex-column gap-2">
              <i className="pi pi-map-marker text-2xl" style={{ color: 'var(--warm-gold)' }}></i>
              <h4 className="m-0" style={{ color: 'var(--foreground)' }}>
                {navigationItems.find(item => item.active)?.label || 'Home'}
              </h4>
              <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                {navigationItems.find(item => item.active)?.description || 'Landing page'}
              </p>
              <Badge value="Current" severity="info" className="mt-2" />
            </div>
          </Card>

          {/* Navigation Links */}
          <div className="flex flex-column gap-2">
            <h5 className="m-0 font-semibold" style={{ color: 'var(--warm-gold)' }}>
              Navigation
            </h5>
            {navigationItems.map(item => (
              <Link key={item.href} href={item.href} className="text-decoration-none">
                <Card
                  className={`cursor-pointer transition-all duration-300 glass-card ${
                    item.active ? 'border-2 shadow-lg' : 'border-1 hover:border-opacity-50'
                  }`}
                  style={{
                    borderColor: item.active ? 'var(--warm-gold)' : 'var(--glass-border)',
                  }}
                  onClick={handleNavigation}
                >
                  <div className="flex align-items-center gap-3">
                    <div className="flex align-items-center justify-content-center w-3rem h-3rem border-round-lg glass-card">
                      <i
                        className={`${item.icon} text-xl`}
                        style={{ color: 'var(--warm-gold)' }}
                      ></i>
                    </div>
                    <div className="flex flex-column flex-1">
                      <h6 className="m-0 font-semibold" style={{ color: 'var(--foreground)' }}>
                        {item.label}
                      </h6>
                      <p
                        className="text-xs m-0"
                        style={{ color: 'var(--foreground)', opacity: 0.8 }}
                      >
                        {item.description}
                      </p>
                    </div>
                    {item.active && <Badge value="Active" severity="success" className="ml-auto" />}
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Theme Switcher */}
          <div className="flex flex-column gap-2">
            <h5 className="m-0 font-semibold" style={{ color: 'var(--warm-gold)' }}>
              Customization
            </h5>
            <Card className="glass-card">
              <div className="flex align-items-center gap-3">
                <i className="pi pi-palette text-xl" style={{ color: 'var(--warm-gold)' }}></i>
                <div className="flex flex-column flex-1">
                  <h6 className="m-0 font-semibold" style={{ color: 'var(--foreground)' }}>
                    Theme Switcher
                  </h6>
                  <p className="text-xs m-0" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                    Change the look and feel
                  </p>
                </div>
                <ThemeSwitcher />
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-column gap-2">
            <h5 className="m-0 font-semibold" style={{ color: 'var(--warm-gold)' }}>
              Quick Actions
            </h5>
            <div className="grid">
              <div className="col-6">
                <Button
                  label="Dashboard"
                  icon="pi pi-th-large"
                  className="w-full"
                  severity="info"
                  size="small"
                  onClick={() => {
                    setSidebarVisible(false);
                    window.location.href = '/dashboard';
                  }}
                />
              </div>
              <div className="col-6">
                <Button
                  label="About"
                  icon="pi pi-info-circle"
                  className="w-full"
                  severity="secondary"
                  size="small"
                  onClick={() => {
                    setSidebarVisible(false);
                    window.location.href = '/about';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Close Button */}
          <Button
            label="Close Menu"
            icon="pi pi-times"
            onClick={() => setSidebarVisible(false)}
            className="w-full"
            severity="secondary"
          />
        </div>
      </Sidebar>
    </>
  );
};
