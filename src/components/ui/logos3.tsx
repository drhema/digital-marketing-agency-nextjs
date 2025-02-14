// src/components/ui/logos3.tsx
"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Logo {
  id: string;
  name: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos: Logo[];
  className?: string;
}

const getCleanImageUrl = (url: string) => {
  return url.replace(/^\/+/, '').replace(/^https:\/\/https:\/\//, 'https://');
};

export const Logos3 = ({
  heading = "Trusted by Leading Companies",
  logos = [],
}: Logos3Props) => {
  return (
    <section className="py-32">
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl dark:text-white">
          {heading}
        </h2>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-6xl">
          <Carousel
            opts={{ 
              loop: true,
              align: "center",
              containScroll: "trimSnaps",
              dragFree: true,
            }}
            plugins={[
              AutoScroll({ 
                playOnInit: true, 
                speed: 0.5,
                stopOnInteraction: false,
                stopOnMouseEnter: true
              })
            ]}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="group relative aspect-video flex items-center justify-center p-6">
                    <div className="relative h-16 w-full">
                      <Image
                        src={getCleanImageUrl(logo.image)}
                        alt={logo.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={cn(
                          "object-contain transition-all duration-300 group-hover:scale-105",
                          "filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100",
                          logo.className
                        )}
                        priority
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};