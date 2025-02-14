// src/components/Hero.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import Image from 'next/image';

const defaultTranslations = {
  hero: {
    title: "Digital Excellence",
    subtitle: "Transforming Brands in Kuwait Through Digital Innovation",
    cta: "Explore Our Universe"
  }
};

export const Hero = () => {
  const params = useParams();
  const [translations, setTranslations] = useState(defaultTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const locale = params.locale as string;
        const translationModule = await import(`@/translations/locales/${locale}/home.json`);
        if (translationModule.default) {
          setTranslations(translationModule.default);
        }
      } catch (error) {
        console.error('Error loading translations:', error);
        setTranslations(defaultTranslations);
      }
    };

    loadTranslations();
  }, [params.locale]);

  return (
    <div className="flex flex-col overflow-hidden pb-20">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              {translations.hero.subtitle} <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400">
                {translations.hero.title}
              </span>
            </h1>
          </>
        }
      >
        <div className="relative w-full h-full">
          <Image
            src="/hero-image.jpg"
            alt="hero"
            fill
            className="mx-auto rounded-2xl object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={90}
            draggable={false}
          />
        </div>
      </ContainerScroll>
    </div>
  );
};