"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { H1, Paragraph } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";

// Static import of hero background image from public folder
import heroBg from "@/public/images/homepage/s-hero-image-back.png";

type HeroProps = {
  content: HomeContent["hero"];
};

const PARALLAX_FACTOR = 0.15;

/** Z-index layers: bottom (0) to top (10). Single source of truth for stacking. */
const LAYER = {
  background: 0,
  heading: 1,
  mask: 2,
  content: 10,
} as const;

export default function Hero({ content }: HeroProps) {
  const hero = content;
  const spotsLines = hero.spots.split("\n");
  const descriptionLines = hero.description.split("\n");
  const [maskOffset, setMaskOffset] = useState(0);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const maskImageRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const leftInfoRef = useRef<HTMLDivElement | null>(null);
  const rightInfoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = typeof window !== "undefined" ? window.scrollY : 0;
      setMaskOffset(y * PARALLAX_FACTOR);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (heroImageRef.current) {
      gsap.from(heroImageRef.current, {
        scale: 1.5,
        duration: 2,
        ease: "power3.out",
        transformOrigin: "center center",
      });
    }

    if (maskImageRef.current) {
      gsap.from(maskImageRef.current, {
        scale: 1.25,
        duration: 2,
        ease: "power3.out",
        transformOrigin: "center center",
      });
    }

    if (headingRef.current) {
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });
    }

    if (leftInfoRef.current) {
      gsap.from(leftInfoRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
      });
    }

    if (rightInfoRef.current) {
      gsap.from(rightInfoRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section className="w-full pb-28 md:pb-30 lg:pb-32 pt-2 md:pt-1 lg:pt-1">
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-3">
          <span className="col-span-12">
            <div className="relative w-full h-[calc(100dvh-var(--header-height)-0.5rem)] lg:h-[calc(100dvh-var(--header-height)-1rem)] min-h-[320px] rounded-3xl overflow-hidden isolate">
              <div ref={heroImageRef} className="w-full h-full">
                <Image
                  src={heroBg}
                  alt="Hero image"
                  fill
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  className="object-cover object-center"
                  style={{ zIndex: LAYER.background }}
                  priority
                />
              </div>
              {/* Top-centered hero heading */}
              <div
                ref={headingRef}
                className="absolute inset-0 flex items-start justify-center text-center text-white pt-48 md:pt-8 lg:pt-10 pointer-events-none"
                style={{ zIndex: LAYER.heading }}
              >
                <H1
                  textSize={{
                    mobile: "5.25rem",
                    tablet: "4.5rem",
                    desktop: "17rem",
                  }}
                  className="max-w-8xl bg-[linear-gradient(to_bottom,_#ffffff,_rgba(255,255,255,0.95),_rgba(255,255,255,0.55),_rgba(255,255,255,0.08),_transparent)] bg-clip-text text-transparent filter blur-[0.5px]"
                >
                  {hero.heading.line1}
                </H1>
              </div>
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ zIndex: LAYER.mask, transform: `translate3d(0, ${maskOffset}px, 0)` }}
              >
                <div ref={maskImageRef} className="w-full h-full">
                  <Image
                    src="/images/homepage/s-hero-image-mask.png"
                    alt=""
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover object-bottom mix-blend-lighten"
                    aria-hidden
                  />
                </div>
              </div>

              <div
                className="absolute inset-0 text-white flex flex-col"
                style={{ zIndex: LAYER.content }}
              >
                <div className="px-6 md:px-6 lg:px-12 pt-6 md:pt-6 lg:pt-12 pb-6 md:pb-6 lg:pb-12 flex flex-col md:flex-row justify-between items-stretch gap-6 w-full h-full">
                  <div className="flex flex-col items-start h-full min-h-0 flex-1 md:flex-initial md:w-auto">
                    {/* Bottom-left description + labels */}
                    <div ref={leftInfoRef} className="mt-auto">
                      <Paragraph className="text-white text-base md:text-lg max-w-md text-left">
                        {descriptionLines.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < descriptionLines.length - 1 && <br />}
                          </span>
                        ))}
                      </Paragraph>
                      <div className="flex items-center gap-3 flex-wrap justify-start mt-8">
                        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                          <Image
                            src="/icons/private.svg"
                            alt="Private"
                            width={20}
                            height={20}
                            className="w-5 h-5 shrink-0"
                          />
                          <span className="text-sm md:text-base">
                            {hero.labels.privateTrips}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                          <Image
                            src="/icons/transport.svg"
                            alt="Transport"
                            width={20}
                            height={20}
                            className="w-5 h-5 shrink-0"
                          />
                          <span className="text-sm md:text-base">
                            {hero.labels.transportIncluded}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                          <Image
                            src="/icons/route.svg"
                            alt="Route"
                            width={20}
                            height={20}
                            className="w-5 h-5 shrink-0"
                          />
                          <span className="text-sm md:text-base">
                            {hero.labels.customRoute}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    ref={rightInfoRef}
                    className="hidden md:flex flex-col items-end gap-4 text-right h-full justify-end"
                  >
                    <div className="flex items-center gap-4 md:gap-6 ml-auto">
                      <Paragraph className="text-white text-lg md:text-xl text-right">
                        {spotsLines.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < spotsLines.length - 1 && <br />}
                          </span>
                        ))}
                      </Paragraph>
                      {/* Icons Container */}
                      <div className="flex items-center border-1 border-white/25 gap-1 md:gap-1 bg-white/10 backdrop-blur-sm rounded-full px-1 py-1">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 flex items-center justify-center">
                          <Image
                            src="/icons/camera.svg"
                            alt="Camera"
                            width={35}
                            height={35}
                            className="w-5 h-5 md:w-5 md:h-5"
                          />
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 flex items-center justify-center">
                          <Image
                            src="/icons/hilllogo.svg"
                            alt="Hill Logo"
                            width={35}
                            height={35}
                            className="w-5 h-5 md:w-5 md:h-5"
                          />
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 flex items-center justify-center">
                          <Image
                            src="/icons/tempurature.svg"
                            alt="Temperature"
                            width={35}
                            height={35}
                            className="w-5 h-5 md:w-5 md:h-5"
                          />
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 flex items-center justify-center">
                          <Image
                            src="/icons/location.svg"
                            alt="Location"
                            width={35}
                            height={35}
                            className="w-5 h-5 md:w-5 md:h-5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </section>
  );
}

