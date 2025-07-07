'use client';

import Head from 'next/head';
import SocialFunPanel from '@/components/dashboard/social-fun-panel';

export default function SocialPage() {
  return (
    <>
      <Head>
        <title>Social Fun | Life Forge Dashboard</title>
        <meta
          name="description"
          content="Connect, share, and grow with others in the Social Fun section of Life Forge."
        />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <SocialFunPanel />
      </div>
    </>
  );
}
