'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export function VisitorTracker() {
  const [ip, setIp] = useState<string>("unknown");

  // 방문자 ID 생성 및 쿠키 저장
  const getVisitorId = () => {
    const cookieName = "visitor_id";
    const existingId = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${cookieName}=`))
      ?.split("=")[1];

    if (existingId) {
      return existingId;
    }

    const newId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const date = new Date();
    date.setTime(date.getTime() + (180 * 24 * 60 * 60 * 1000)); // 6개월
    document.cookie = `${cookieName}=${newId}; expires=${date.toUTCString()}; path=/`;
    return newId;
  };

  // IP 주소 가져오기
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIp((response.data as any).ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };
    fetchIp();
  }, []);

  // 방문자 정보 전송
  useEffect(() => {
    const trackVisitor = async () => {
      if (ip === "unknown") return;

      const visitorData = encodeURIComponent(JSON.stringify({
        id: getVisitorId(),
        landingUrl: window.location.href,
        ip: ip,
        referer: document.referrer,
        time_stamp: new Date().toISOString(),
        utm: new URLSearchParams(window.location.search).get("utm"),
        device: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
      }));
      console.log(visitorData);
      try {
        await axios.get(
          `/api/?action=insert&table=visitors&data=${visitorData}`
        );
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, [ip]);

  return null; // UI를 렌더링하지 않음
} 