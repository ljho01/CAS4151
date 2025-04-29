'use client';

import { useState } from 'react';
import { HomeContent } from '@/components/HomeContent';
import { defaultLocale } from '@/i18n';
import { LocaleManager } from '@/components/LocaleManager';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  const [locale, setLocale] = useState(defaultLocale);

  return (
    <main>
      <LocaleManager onLocaleChange={setLocale} />
      <HomeContent locale={locale} />
            <Analytics />

    </main>
  );
} 