'use client';

import { useState } from 'react';
import { HomeContent } from '@/components/HomeContent';
import { defaultLocale } from '@/i18n';

export default function Home() {
  const [locale, setLocale] = useState(defaultLocale);

  return (
    <main>
      <HomeContent locale={locale} />
    </main>
  );
} 