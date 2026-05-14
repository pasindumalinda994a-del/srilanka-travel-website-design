"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Label, H2Secondary, Paragraph, Button, Arrow } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ExperienceProps = {
  content: HomeContent["experience"];
};

export default function Experience({ content }: ExperienceProps) {
  const experience = content;
  const headingLines = experience.heading.split("\n");
  const paragraphLines = experience.paragraph.split("\n");

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headingRef.current ||
      !paragraphRef.current ||
      !ctaRef.current
    )
      return;

    gsap.registerPlugin(ScrollTrigger);

    const imageCards = gsap.utils.toArray<HTMLElement>(
      sectionRef.current.querySelectorAll("[data-experience-image]")
    );

    // Initial state: heading, paragraph, CTA slide up and fade in
    gsap.set([headingRef.current, paragraphRef.current, ctaRef.current], {
      y: 50,
      opacity: 0,
    });

    gsap.set(imageCards, {
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
        imageCards,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            each: 0.1,
            from: "start",
          },
        },
        "<0.2"
      )
      .to(
        paragraphRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<0.2"
      )
      .to(
        ctaRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<0.2"
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
          <div className="col-span-12 md:col-span-1">
            <Label className="self-start">{experience.label}</Label>
          </div>
          <div className="col-span-12 md:col-span-11 flex flex-col gap-8 md:gap-12 pl-0 md:pl-8">
            <div ref={headingRef}>
              <H2Secondary className="font-bold max-w-4xl self-start">
                {headingLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < headingLines.length - 1 && <br />}
                  </span>
                ))}
              </H2Secondary>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-2">
              <div
                data-experience-image
                className="relative rounded-3xl overflow-hidden aspect-video"
              >
                <Image
                  src="/images/homepage/s-experience-image-1.png"
                  alt="Desert dunes landscape"
                  fill
                  className="object-cover"
                />
                {/* Gradient overlay for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent z-[5]" />
              </div>

              <div
                data-experience-image
                className="relative rounded-3xl overflow-hidden aspect-video"
              >
                <Image
                  src="/images/homepage/s-experience-image-2.png"
                  alt="Desert landscape with path"
                  fill
                  className="object-cover"
                />
                {/* Gradient overlay for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent z-[5]" />
              </div>

              <div
                data-experience-image
                className="relative rounded-3xl overflow-hidden aspect-video"
              >
                <Image
                  src="/images/homepage/s-experience-image-3.png"
                  alt="Rock formations landscape"
                  fill
                  className="object-cover"
                />
                {/* Gradient overlay for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent z-[5]" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div ref={paragraphRef} className="flex-1">
                <Paragraph>
                  {paragraphLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < paragraphLines.length - 1 && <br />}
                    </span>
                  ))}
                </Paragraph>
              </div>

              <div ref={ctaRef} className="flex items-center gap-3 md:gap-4">
                <Button variant="primary" size="md">
                  {experience.cta}
                </Button>
                <Button variant="icon" size="md" aria-label="Explore more">
                  <Arrow direction="up-right" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

