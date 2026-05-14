"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Label, H2Secondary, FAQCard, Button, Arrow } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type FAQProps = {
  content: HomeContent["faq"];
};

export default function FAQ({ content }: FAQProps) {
  const { label, heading, items, prompt } = content;
  const headingLines = heading.split("\n");
  const promptLines = prompt.description.split("\n");

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const faqCardsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headerRef.current ||
      !imageRef.current ||
      !faqCardsContainerRef.current
    )
      return;

    const faqCards = gsap.utils.toArray<HTMLElement>(
      faqCardsContainerRef.current.querySelectorAll("[data-faq-card]")
    );

    gsap.registerPlugin(ScrollTrigger);

    // Initial state: header and image slide up + fade
    gsap.set(headerRef.current, {
      y: 50,
      opacity: 0,
    });

    gsap.set(imageRef.current, {
      opacity: 0,
    });

    gsap.set(faqCards, {
      y: 40,
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

    tl.to(headerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        imageRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<0.2"
      )
      .to(
        faqCards,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: {
            each: 0.1,
            from: "start",
          },
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
        <div className="grid grid-cols-12 gap-3">
          <div
            ref={headerRef}
            className="col-span-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-8 lg:gap-12"
          >
            <Label className="self-start md:self-center shrink-0">
              {label}
            </Label>

            <div className="flex-1 text-left ml-4 md:ml-48">
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
          {/* Left column - Image container (4 cols) */}
          <div
            ref={imageRef}
            className="group col-span-12 md:col-span-4 relative rounded-3xl overflow-hidden self-start h-[365px]"
          >
            <Image
              src="/images/homepage/s-faq-image.png"
              alt="Smiling people in green tea fields"
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.15] group-hover:blur-[1px]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent z-[5]" />
            <div className="absolute top-5 left-5 z-10 text-white max-w-[80%] text-left">
              <h3 className="font-bold text-xl mb-2">{prompt.title}</h3>
              <p className="text-white text-base font-medium">
                {promptLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < promptLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div className="absolute bottom-5 right-5 z-10">
              <Button
                variant="icon"
                size="md"
                className="bg-white/90 backdrop-blur-sm hover:bg-white transition-transform duration-300 group-hover:rotate-45"
                aria-label={prompt.ctaAria}
              >
                <Arrow direction="up-right" className="text-black" />
              </Button>
            </div>
          </div>

          {/* Right column - FAQ cards container (8 cols) */}
          <div
            ref={faqCardsContainerRef}
            className="col-span-12 md:col-span-8 flex flex-col gap-2"
          >
            {items.map((item, index) => (
              <div key={index} data-faq-card>
                <FAQCard question={item.question} answer={item.answer} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

