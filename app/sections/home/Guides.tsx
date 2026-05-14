"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Label, H2Primary, Paragraph } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1.5" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M7 10v5M7 7v.01M12 15v-5M12 10v.01M17 15v-4a2 2 0 0 0-4 0" />
      <path d="M17 10h.01" />
    </svg>
  );
}

type GuidesProps = {
  content: HomeContent["guides"];
};

export default function Guides({ content }: GuidesProps) {
  const guides = content;
  const { featureLabels, leftCard, rightSection } = guides;
  const headingLines = guides.heading.split("\n");

  const firstRowLabels = featureLabels.slice(0, 3);
  const secondRowLabels = featureLabels.slice(3, 6);

  const sectionRef = useRef<HTMLElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const rightImageRef = useRef<HTMLDivElement | null>(null);
  const rightContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !leftCardRef.current ||
      !headingRef.current ||
      !rightImageRef.current ||
      !rightContentRef.current
    )
      return;

    gsap.registerPlugin(ScrollTrigger);

    // Initial state: elements slide up and fade in
    gsap.set([headingRef.current, rightContentRef.current], {
      y: 50,
      opacity: 0,
    });

    gsap.set(leftCardRef.current, { opacity: 0 });
    gsap.set(rightImageRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "top 40%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(
      leftCardRef.current,
      {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "<0.2"
    )
      .to(
        headingRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<0.15"
      )
      .to(
        rightImageRef.current,
        {
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "<0.15"
      )
      .to(
        rightContentRef.current,
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
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Left section — 6 cols: labels + card (image + text) */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2 max-w-[560px]">
              <div className="flex flex-nowrap gap-2">
                {firstRowLabels.map((text) => (
                  <Label key={text} variant="default" size="lg">
                    {text}
                  </Label>
                ))}
              </div>
              <div className="flex flex-nowrap gap-2">
                {secondRowLabels.map((text) => (
                  <Label key={text} variant="default" size="lg">
                    {text}
                  </Label>
                ))}
              </div>
            </div>
            <div
              ref={leftCardRef}
              className="bg-[#FAFAFA] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row p-8"
            >
              <div className="relative w-full md:w-[260px] lg:w-[280px] aspect-square rounded-2xl md:rounded-3xl overflow-hidden shrink-0">
                <Image
                  src={leftCard.image}
                  alt={leftCard.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col justify-center gap-3">
                <h3 className="font-bold text-lg md:text-xl tracking-tight">
                  {leftCard.title}
                </h3>
                <Paragraph fontWeight="400" className="text-gray-700">
                  {leftCard.paragraph}
                </Paragraph>
                <div className="flex gap-2 mt-1">
                  <a
                    href={leftCard.socialLinks.instagram}
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={leftCard.socialLinks.website}
                    aria-label="Website"
                    className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={leftCard.socialLinks.linkedin}
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right section — 6 cols: H2 + container (image left + content right) */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            <div ref={headingRef}>
              <H2Primary>
                {headingLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line}
                    {index < headingLines.length - 1 && <br />}
                  </span>
                ))}
              </H2Primary>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div
                ref={rightImageRef}
                className="relative w-full md:w-[260px] lg:w-[280px] aspect-square rounded-2xl md:rounded-3xl overflow-hidden shrink-0"
              >
                <Image
                  src={rightSection.image}
                  alt={rightSection.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div
                ref={rightContentRef}
                className="flex flex-col gap-4 justify-center"
              >
                <Label variant="default" size="md" className="self-start">
                  {rightSection.founderLabel}
                </Label>
                <Paragraph
                  fontWeight="400"
                  className="text-gray-700 italic"
                >
                  {rightSection.quote}
                </Paragraph>
                <Paragraph
                  fontWeight="400"
                  className="text-gray-600 text-sm"
                >
                  {rightSection.attribution}
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

