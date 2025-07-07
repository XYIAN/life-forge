'use client';

import React from 'react';
import Dashboard from '@/components/dashboard/dashboard';

export default function DashboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading dashboard...</p>
          </div>
        </div>
      }
    >
      <Dashboard />
    </React.Suspense>
  );
}
