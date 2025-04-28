'use client';

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { messages, defaultLocale } from "@/i18n";

interface LocaleManagerProps {
  onLocaleChange: (locale: string) => void;
}

export function LocaleManager({ onLocaleChange }: LocaleManagerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const lang = searchParams.get('lang');
    if (lang && messages[lang as keyof typeof messages]) {
      onLocaleChange(lang);
    } else {
      onLocaleChange(defaultLocale);
    }
  }, [searchParams, onLocaleChange]);

  return null;
} 