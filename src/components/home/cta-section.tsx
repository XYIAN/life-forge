'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  icon?: string;
  badgeText?: string;
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = 'Ready to Transform Your Life?',
  subtitle = 'Join thousands of users who have already started their journey to a more organized, motivated, and fulfilling life.',
  ctaText = 'Get Started Now',
  ctaLink = '/dashboard',
  icon = 'pi pi-sparkles',
  badgeText = 'Free Forever',
  className = 'max-w-4xl mx-auto',
}) => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <Card className={`glass-card ${className} text-center p-8 border-2 border-amber-500/30`}>
          <div className="flex flex-column align-items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 border-round-xl flex align-items-center justify-content-center shadow-2xl">
              <i className={`${icon} text-white text-3xl`}></i>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white m-0">{title}</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">{subtitle}</p>
            <div className="flex gap-4 justify-content-center flex-wrap mt-4">
              <Link href={ctaLink}>
                <Button
                  label={ctaText}
                  icon="pi pi-arrow-right"
                  size="large"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 border-none text-white font-bold px-8 py-3 shadow-2xl hover:shadow-3xl"
                />
              </Link>
              {badgeText && (
                <Badge value={badgeText} severity="success" className="text-lg px-4 py-2" />
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
