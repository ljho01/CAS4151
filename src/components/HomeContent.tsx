'use client';

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { VisitorTracker } from "@/components/VisitorTracker";
import { messages } from "@/i18n";

interface FormResponse {
  success: boolean;
  data?: any;
}

const formSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  advice: z.string().optional(),
});

interface HomeContentProps {
  locale: string;
}

export function HomeContent({ locale }: HomeContentProps) {
  const [showPopup, setShowPopup] = useState(false);

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = messages[locale as keyof typeof messages];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      advice: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const finalData = JSON.stringify({
        id: document.cookie.split("; ").find(row => row.startsWith("visitor_id="))?.split("=")[1],
        email: values.email,
        advice: values.advice
      });

      const response = await axios.get<FormResponse>(
        `https://script.google.com/macros/s/AKfycbzcSrWWxktZrwnSEBP0RJx5Et6dlEHS71rWU7Fr6RqjyYbQZbASz7KUb5GYHH7S4CyEZw/exec?action=insert&table=visitors&data=${finalData}`
      );

      const data = response.data ? JSON.parse((response.data as any).slice(10, -1)) : {success: false, data: null};
      if (data.success) {
        setShowPopup(true);
        form.reset();
      } else {
        console.error('서버 응답 실패:', data.data);
        alert('폼 제출에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error);
      alert('폼 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <VisitorTracker />
      {/* 헤더 */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl">
        <div className="mx-4 sm:mx-6 lg:mx-8">
          <div className="group flex justify-between items-center h-16 bg-transparent hover:bg-white/80 hover:backdrop-blur-md rounded-full px-6 border border-transparent hover:border-gray-200/60 transition-all duration-300">
            <Link href="/" className="text-xl font-bold text-gray-900">
              ARCHI
            </Link>
            <Button className="rounded-full" asChild>
              <Link href="#contact">
                {t('nav.startFree')}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="relative min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden pt-20">
        {/* 데스크톱 버전 - 전체 화면 */}
        <div className="hidden md:block w-full h-screen overflow-hidden shadow-2xl absolute top-0 left-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-white to-transparent flex flex-col justify-end px-4 sm:px-6 lg:px-20">
            <div className="w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gray-500 mb-16 max-w-2xl font-medium">
                {t('hero.description')}
              </p>
            </div>
          </div>
        </div>

        {/* 모바일 버전 - 카드 스타일 */}
        <div className="md:hidden w-full h-full flex items-center mt-10 flex-col gap-2">
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <h1 className="text-2xl font-bold mb-2 mt-8">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* 사용 사례 섹션 */}
      <section className="py-20 bg-white overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{t('features.title')}</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden w-full">
            <div className="flex animate-infinite-scroll whitespace-nowrap">
              {/* feature 아이템을 한 줄로 반복 */}
              {[
                t('features.brainstorming'),
                t('features.knowledge'),
                t('features.marketing'),
                t('features.resume'),
                t('features.essay'),
                t('features.presentation'),
                t('features.newsletter'),
                t('features.syllabus'),
                t('features.learning'),
                t('features.goals'),
              ].map((item, i) => (
                <div key={i} className="inline-block px-8 text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">{item}</div>
              ))}
              {/* 반복 */}
              {[
                t('features.brainstorming'),
                t('features.knowledge'),
                t('features.marketing'),
                t('features.resume'),
                t('features.essay'),
                t('features.presentation'),
                t('features.newsletter'),
                t('features.syllabus'),
                t('features.learning'),
                t('features.goals'),
              ].map((item, i) => (
                <div key={i + 10} className="inline-block px-8 text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{t('faq.title')}</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t('faq.items.service.question')}</AccordionTrigger>
              <AccordionContent>
                {t('faq.items.service.answer')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{t('faq.items.notion.question')}</AccordionTrigger>
              <AccordionContent>
                {t('faq.items.notion.answer')}
              </AccordionContent>
            </AccordionItem>      
            <AccordionItem value="item-3">
              <AccordionTrigger>{t('faq.items.ai.question')}</AccordionTrigger>
              <AccordionContent>
                {t('faq.items.ai.answer')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>{t('faq.items.security.question')}</AccordionTrigger>
              <AccordionContent>
                {t('faq.items.security.answer')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>{t('faq.items.plans.question')}</AccordionTrigger>
              <AccordionContent>
                {t('faq.items.plans.answer')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 문의 폼 섹션 */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contact.title')}</h2>
            <p className="text-gray-600">
              {t('contact.description')}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder={t('contact.emailPlaceholder')}
                        {...field} 
                        type="email"
                        className="h-12 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="advice"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={t('contact.advicePlaceholder')}
                        className="min-h-24 rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full h-12 rounded-lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? '...' : t('contact.submit')}
              </Button>
            </form>
          </Form>
        </div>
      </section>

      {/* 팝업 */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('popup.title')}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            {t('popup.message')}
          </p>
          <DialogFooter>
            <Button onClick={() => setShowPopup(false)}>
              {t('popup.close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 푸터 */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <p>{t('footer.copyright')}</p>
              <p>{t('footer.year')}</p>
            </div>
            <div className="flex space-x-8">
              <Link href={`mailto:${t('footer.email')}`} className="text-gray-400 hover:text-white">
                {t('footer.email')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 