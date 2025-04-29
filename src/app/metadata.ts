import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ARCHI',
  description: '캔버스 기반의 유연한 편집 경험을 제공하는 AI 문서 작성기. 자유로운 레이아웃과 AI의 도움으로 더 나은 문서를 작성하세요.',
  openGraph: {
    title: 'Archi - AI 문서 작성기',
    description: '캔버스 기반의 유연한 편집 경험을 제공하는 AI 문서 작성기. 자유로운 레이아웃과 AI의 도움으로 더 나은 문서를 작성하세요.',
    url: 'https://hello.archi.so',
    siteName: 'Archi',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Archi - AI 문서 작성기',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Archi - AI 문서 작성기',
    description: '캔버스 기반의 유연한 편집 경험을 제공하는 AI 문서 작성기. 자유로운 레이아웃과 AI의 도움으로 더 나은 문서를 작성하세요.',
    images: ['/og-image.png'],
  },
}; 