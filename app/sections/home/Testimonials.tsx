"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Label,
  H2Primary,
  Paragraph,
  Button,
  Arrow,
  TestimonialMarquee,
} from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HighlightIcon = ({ iconSrc }: { iconSrc: string }) => (
  <Image
    src={iconSrc}
    alt=""
    width={20}
    height={20}
    className="w-5 h-5 shrink-0 invert opacity-70"
    aria-hidden
    unoptimized
  />
);

type TestimonialsProps = {
  content: HomeContent["testimonials"];
};

export default function Testimonials({ content }: TestimonialsProps) {
  const testimonials = content;
  const paragraphLines = testimonials.paragraph.split("\n");
  const hasPanel = "rating" in testimonials && "highlights" in testimonials;
  const hasHero = "heroImage" in testimonials && "overlayQuote" in testimonials;
  const hasItems = "items" in testimonials && testimonials.items.length > 0;

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headingRef.current ||
      !paragraphRef.current
    )
      return;

    gsap.registerPlugin(ScrollTrigger);

    const imageContainers = gsap.utils.toArray<HTMLElement>(
      sectionRef.current.querySelectorAll("[data-testimonial-image]")
    );

    gsap.set([headingRef.current, paragraphRef.current], {
      y: 50,
      opacity: 0,
    });

    gsap.set(imageContainers, {
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
        imageContainers,
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
          <div className="col-span-12 flex flex-col gap-8 md:gap-12">
            <div className="self-start">
              <Label>{testimonials.label}</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end">
              <div
                ref={headingRef}
                className="md:col-span-6 lg:col-span-7 ml-0 md:ml-18"
              >
                <H2Primary>
                  {testimonials.heading.line1}
                  <br />
                  {testimonials.heading.line2}
                </H2Primary>
              </div>

              <div
                ref={paragraphRef}
                className="md:col-span-6 lg:col-span-5 flex justify-end"
              >
                <Paragraph className="text-right">
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
        <div className="grid grid-cols-12 gap-3 mt-6 md:mt-16">
          {hasPanel && (
            <div
              data-testimonial-image
              className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-6 h-[460px] md:h-[520px] py-6 md:py-8 pl-6 md:pl-0"
            >
              <div className="flex items-end gap-3">
                <div>
                  <span className="text-3xl md:text-4xl font-bold text-black">
                    {testimonials.rating}
                  </span>
                  <span className="text-lg text-gray-400 ml-1">/5</span>
                </div>
                <span className="text-base text-gray-500 pb-1">
                  Based on 280+ verified
                  <br />
                  traveler reviews
                </span>
              </div>
              <p className="font-normal text-gray-500 text-base max-w-[240px]">
                {testimonials.reviewCount}
              </p>
              <ul className="flex flex-col gap-3">
                {testimonials.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <HighlightIcon iconSrc={h.iconSrc} />
                    <p className="font-normal text-base text-gray-600">
                      {h.text}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <p className="font-normal text-base text-gray-700 mb-4 max-w-[260px]">
                  {testimonials.ctaText}
                </p>
                <div className="flex items-center gap-3 md:gap-4">
                  <Button variant="primary" size="md">
                    {testimonials.cta}
                  </Button>
                  <Button
                    variant="icon"
                    size="md"
                    aria-label="Plan your trip"
                  >
                    <Arrow direction="up-right" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          {hasHero && (
            <div
              data-testimonial-image
              className="col-span-12 md:col-span-4 lg:col-span-5 md:ml-2 lg:ml-4 relative rounded-2xl overflow-hidden h-[460px] md:h-[520px]"
            >
              <Image
                src={testimonials.heroImage}
                alt="Traveler testimonial"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <Paragraph className="text-white text-base md:text-lg font-medium mb-2">
                  &ldquo;{testimonials.overlayQuote}&rdquo;
                </Paragraph>
                <Paragraph className="text-white/90 text-sm">
                  {testimonials.overlayAttribution}
                </Paragraph>
              </div>
            </div>
          )}
          {hasItems && (
            <div
              data-testimonial-image
              className="col-span-12 md:col-span-4 lg:col-span-4 h-[460px] md:h-[520px] w-full"
            >
              <TestimonialMarquee
                items={testimonials.items}
                direction="down"
                gap={12}
                pauseOnHover
                className="w-full h-full"
                aria-label="Traveler testimonials"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

