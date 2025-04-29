'use client';

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { messages, defaultLocale } from "@/i18n";

interface LocaleManagerProps {
  onLocaleChange: (locale: string) => void;
}

export function LocaleManager({ onLocaleChange }: LocaleManagerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const determineLocale = () => {
      // 1. URL 파라미터 우선 확인
      const langParam = searchParams.get('lang');
      if (langParam && messages[langParam as keyof typeof messages]) {
        return langParam;
      }

      // 2. 브라우저 언어 설정 확인
      const browserLang = navigator.language.split('-')[0];
      if (browserLang && messages[browserLang as keyof typeof messages]) {
        return browserLang;
      }

      // 3. 기본 언어로 설정
      return defaultLocale;
    };

    const locale = determineLocale();
    onLocaleChange(locale);

    // URL에 lang 파라미터가 없거나 잘못된 경우 올바른 언어로 리다이렉트
    const currentLang = searchParams.get('lang');
    if (!currentLang || !messages[currentLang as keyof typeof messages]) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('lang', locale);
      router.replace(newUrl.toString());
    }
  }, [searchParams, onLocaleChange, router]);

  return null;
} 