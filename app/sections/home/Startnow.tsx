"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Label, Button, Arrow, Paragraph } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type StartnowProps = {
  content: HomeContent["startnow"];
};

export default function Startnow({ content }: StartnowProps) {
  const startnow = content;
  const headingLines = startnow.heading.split("\n");
  const paragraphLines = startnow.paragraph.split("\n");

  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const image1Ref = useRef<HTMLDivElement | null>(null);
  const image2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !contentRef.current ||
      !image1Ref.current ||
      !image2Ref.current
    )
      return;

    gsap.registerPlugin(ScrollTrigger);

    // Initial state: content slide up + fade, images fade only
    gsap.set(contentRef.current, {
      y: 50,
      opacity: 0,
    });

    gsap.set([image1Ref.current, image2Ref.current], {
      opacity: 0,
    });

    const buttonsRef = contentRef.current.querySelector<HTMLElement>(
      "[data-startnow-buttons]"
    );
    if (buttonsRef) {
      gsap.set(buttonsRef, { y: 24, opacity: 0 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "top 40%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(contentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    });

    if (buttonsRef) {
      tl.to(
        buttonsRef,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "<0.15"
      );
    }

    tl.to(
      image1Ref.current,
      {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "<0.2"
    ).to(
      image2Ref.current,
      {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "<0.15"
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full pb-28 md:pb-30 lg:pb-32">
      <div className="mx-auto max-w-[1440px] px-2">
        <div className="grid grid-cols-12 gap-3 bg-gray-50 rounded-3xl p-4 md:p-6 lg:p-8">
          {/* Left side content - 5 columns */}
          <div
            ref={contentRef}
            className="col-span-12 md:col-span-5 flex flex-col gap-6 md:gap-8"
          >
            <Label className="self-start">{startnow.label}</Label>

            <h2
              className="font-bold text-[2.25rem] md:text-[2.5rem] lg:text-[1.8rem]"
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

            <Paragraph className="text-gray-700">
              {paragraphLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < paragraphLines.length - 1 && <br />}
                </span>
              ))}
            </Paragraph>

            <div
              data-startnow-buttons
              className="flex items-center gap-3 md:gap-4"
            >
              <Button variant="primary" size="md">
                {startnow.cta}
              </Button>
              <Button variant="icon" size="md" aria-label="Plan your trip">
                <Arrow direction="up-right" />
              </Button>
            </div>
          </div>

          {/* Right side images - 3 columns + 4 columns */}
          <div
            ref={image1Ref}
            className="col-span-12 md:col-span-3 relative rounded-3xl overflow-hidden"
            style={{ height: "365px" }}
          >
            <Image
              src="/images/homepage/s-start-image-1.png"
              alt="Tea plantation workers in lush green fields"
              fill
              className="object-cover"
            />
          </div>

          <div
            ref={image2Ref}
            className="col-span-12 md:col-span-4 relative rounded-3xl overflow-hidden"
            style={{ height: "280px" }}
          >
            <Image
              src="/images/homepage/s-start-image-2.jpeg"
              alt="Traveler high-fiving smiling children"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

