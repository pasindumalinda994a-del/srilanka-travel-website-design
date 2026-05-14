"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Label, H2Secondary, Paragraph, Button, Arrow } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ReadyProps = {
  content: HomeContent["ready"];
};

export default function Ready({ content }: ReadyProps) {
  const ready = content;
  const headingLines = ready.heading.split("\n");
  const overlayLines = ready.imageOverlay.split("\n");

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const imageCardRef = useRef<HTMLDivElement | null>(null);
  const phoneCardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headerRef.current ||
      !imageCardRef.current ||
      !phoneCardRef.current ||
      !contentRef.current
    )
      return;

    const messageCards = gsap.utils.toArray<HTMLElement>(
      phoneCardRef.current.querySelectorAll("[data-ready-msg]")
    );

    gsap.registerPlugin(ScrollTrigger);

    // Initial state: header and content blocks slide up + fade
    gsap.set(headerRef.current, {
      y: 50,
      opacity: 0,
    });

    gsap.set([imageCardRef.current, phoneCardRef.current, contentRef.current], {
      y: 60,
      opacity: 0,
    });

    // Message cards: start scaled down and invisible for popup effect
    gsap.set(messageCards, {
      scale: 0,
      opacity: 0,
      transformOrigin: "bottom center",
    });

    const buttonsRef = contentRef.current.querySelector<HTMLElement>(
      "[data-ready-buttons]"
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

    tl.to(headerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        imageCardRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<0.2"
      )
      .to(
        phoneCardRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<0.15"
      )
      .to(
        contentRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<0.15"
      );

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

    // After phone frame is in, pop up each message card one by one (slight delay)
    tl.to(
      messageCards,
      {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: "back.out(1.4)",
        stagger: {
          each: 0.3,
          from: "start",
        },
      },
      "<0.25"
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
          <div
            ref={headerRef}
            className="col-span-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-8"
          >
            <Label className="self-start md:self-center shrink-0">
              {ready.label}
            </Label>

            <div className="flex-1 text-left w-full ml-4 md:ml-48">
              <H2Secondary textAlign="left">
                {headingLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < headingLines.length - 1 && <br />}
                  </span>
                ))}
              </H2Secondary>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mt-6 md:mt-8">
          <div ref={imageCardRef} className="col-span-12 md:col-span-4">
            <div className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/homepage/s-ready-image-1.png"
                alt="Cyclist on a misty forest road"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.15] group-hover:blur-[1px]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent z-[5]" />
              <p className="absolute bottom-5 left-5 z-10 text-white text-base font-medium">
                {overlayLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < overlayLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <div className="absolute bottom-5 right-5 z-10">
                <Button
                  variant="icon"
                  size="sm"
                  className="bg-white/90 backdrop-blur-sm hover:bg-white transition-transform duration-300 group-hover:rotate-45"
                  aria-label={ready.viewToursAria}
                >
                  <Arrow direction="up-right" className="text-black" />
                </Button>
              </div>
            </div>
          </div>

          <div ref={phoneCardRef} className="col-span-12 md:col-span-4">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-white flex items-start justify-center">
              <div className="relative inline-block w-full h-full mt-6 scale-[1.4] origin-top overflow-hidden">
                <Image
                  src="/images/homepage/s-phone-frame.png"
                  alt="Phone frame"
                  fill
                  className="object-contain object-top"
                />
              </div>
              {/* Message cards overlay — on top of the phone screen */}
              <div
                className="absolute inset-0 flex flex-col gap-2 sm:gap-3 justify-center px-[20%] pt-[30%] pb-[18%] pointer-events-none"
                aria-hidden
              >
                <div data-ready-msg className="flex justify-end">
                  <span className="max-w-[88%] rounded-2xl rounded-br-md bg-neutral-900 px-3.5 py-2.5 text-[13px] sm:text-sm text-white shadow-md">
                    Good morning! Ready for tomorrow&apos;s desert adventure?
                  </span>
                </div>
                <div data-ready-msg className="flex justify-start">
                  <span className="max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[13px] sm:text-sm text-neutral-900 shadow-md border border-neutral-200/80">
                    Almost ready! What should I bring with me? 👋
                  </span>
                </div>
                <div data-ready-msg className="flex justify-end">
                  <span className="max-w-[88%] rounded-2xl rounded-br-md bg-neutral-900 px-3.5 py-2.5 text-[13px] sm:text-sm text-white shadow-md">
                    Just water, a hat, and light clothes — mornings are cool, afternoons warm :)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={contentRef}
            className="col-span-12 md:col-span-4 flex flex-col gap-6 aspect-[4/3] justify-center"
          >
            <Paragraph>{ready.intro}</Paragraph>

            <div className="flex flex-col ">
              {ready.checklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-black text-xl">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div
              data-ready-buttons
              className="flex items-center gap-3 md:gap-4"
            >
              <Button variant="primary" size="md">
                {ready.cta}
              </Button>
              <Button variant="icon" size="md" aria-label="Explore more">
                <Arrow direction="up-right" className="text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

