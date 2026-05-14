"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Label, Button, Arrow, Paragraph } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ExploreProps = {
  content: HomeContent["explore"];
};

export default function Explore({ content }: ExploreProps) {
  const explore = content;
  const headingLines = explore.heading.split("\n");
  const paragraphLines = explore.paragraph.split("\n");
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const imageOneRef = useRef<HTMLDivElement | null>(null);
  const imageTwoRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headingRef.current ||
      !ctaRef.current ||
      !imageOneRef.current ||
      !imageTwoRef.current ||
      !paragraphRef.current
    )
      return;

    gsap.registerPlugin(ScrollTrigger);

    // Initial state
    gsap.set([headingRef.current, ctaRef.current, paragraphRef.current], {
      y: 50,
      opacity: 0,
    });

    gsap.set([imageOneRef.current, imageTwoRef.current], {
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "top 40%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(headingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        ctaRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<0.2" // 0.05s after heading starts
      )
      .to(
        imageOneRef.current,
        {
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
        },
        "<0.2" // 0.1s after heading starts
      )
      .to(
        imageTwoRef.current,
        {
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
        },
        "<0.2" // with image one
      )
      .to(
        paragraphRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<0.2" // slight offset after images
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);
  return (
    <section ref={sectionRef} className="w-full pb-28 md:pb-30 lg:pb-32">
      <div className="mx-auto max-w-[1440px] px-2">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-5 flex flex-col gap-6 md:gap-8">
            <Label className="self-start">{explore.label}</Label>

            <h2
              ref={headingRef}
              className="font-bold text-[1.75rem]"
              style={{
                lineHeight: "1.2",
                letterSpacing: "-0.05em",
                fontWeight: "500",
              }}
            >
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>

            <div ref={ctaRef} className="flex items-center gap-3 md:gap-4">
              <Button variant="primary" size="md">
                {explore.cta}
              </Button>
              <Button variant="icon" size="md" aria-label="Explore more">
                <Arrow direction="up-right" />
              </Button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="grid grid-cols-7 gap-3">
              <div
                ref={imageOneRef}
                className="group col-span-7 md:col-span-3 relative rounded-3xl overflow-hidden"
                style={{ height: "280px" }}
              >
                <Image
                  src="/images/homepage/s-explore-image-1.jpeg"
                  alt="Scenic landscape"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.15] group-hover:blur-[1px]"
                />
                {/* Gradient overlay for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent z-[5]" />
                <p className="absolute bottom-5 left-5 z-10 text-white text-base font-medium">
                  See real moments
                  <br /> from our trips.
                </p>
                <div className="absolute bottom-5 right-5 z-10">
                  <Button
                    variant="icon"
                    size="sm"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white transition-transform duration-300 group-hover:rotate-45"
                    aria-label="View image"
                  >
                    <Arrow direction="up-right" className="text-black" />
                  </Button>
                </div>
              </div>

              <div className="col-span-7 md:col-span-4 flex flex-col gap-4">
                <div
                  ref={imageTwoRef}
                  className="relative rounded-3xl overflow-hidden"
                  style={{ height: "220px" }}
                >
                  <Image
                    src="/images/homepage/s-explore-image-2.jpeg"
                    alt="Nature path landscape"
                    fill
                    className="object-cover"
                  />
                  {/* Gradient overlay for text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent z-[5]" />
                  <div className="absolute top-4 left-4 z-10">
                    <Label
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm text-white"
                    >
                      {explore.naturePathLabel}
                    </Label>
                  </div>
                </div>

                <div ref={paragraphRef}>
                  <Paragraph className="text-gray-700">
                    {paragraphLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < paragraphLines.length - 1 && <br />}
                      </span>
                    ))}
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

