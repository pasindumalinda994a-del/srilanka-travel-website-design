"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Label, H2Primary, Button, Arrow } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOUR_IMAGES = [
  "/images/homepage/s-tour-image-1.jpeg",
  "/images/homepage/s-tour-image-2.jpeg",
  "/images/homepage/s-tour-image-3.jpeg",
  "/images/homepage/s-tour-image-4.jpeg",
] as const;

type OurToursProps = {
  content: HomeContent["ourTours"];
};

export default function OurTours({ content }: OurToursProps) {
  const ourTours = content;

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingWrapperRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingWrapperRef.current || !ctaRef.current)
      return;

    gsap.registerPlugin(ScrollTrigger);

    // initial state
    const tourCards = gsap.utils.toArray<HTMLElement>(
      sectionRef.current.querySelectorAll("[data-tour-card]")
    );

    // initial state: heading + CTA slide up, cards fade in only
    gsap.set([headingWrapperRef.current, ctaRef.current], {
      y: 50,
      opacity: 0,
    });

    gsap.set(tourCards, {
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

    tl.to(headingWrapperRef.current, {
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
        "<0.2"
      )
      .to(
        tourCards,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            each: 0.1,
            from: "center",
          },
        },
        "<0.1"
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
          <div className="col-span-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            <div className="flex flex-col gap-6 md:gap-8">
              <Label className="self-start">{ourTours.label}</Label>

              <div ref={headingWrapperRef}>
                <H2Primary className="font-bold ml-0 md:ml-18">
                  {ourTours.heading.line1}
                  <br />
                  {ourTours.heading.line2}
                </H2Primary>
              </div>
            </div>

            <div ref={ctaRef} className="flex items-center gap-3 md:gap-4">
              <Button variant="primary" size="md">
                {ourTours.cta}
              </Button>
              <Button variant="icon" size="md" aria-label="Explore more">
                <Arrow direction="up-right" />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 mt-6 md:mt-8">
          {ourTours.tours.map((tour, index) => (
            <div
              key={tour.title}
              data-tour-card
              className="group col-span-12 md:col-span-3 relative rounded-3xl overflow-hidden"
              style={{ height: "500px" }}
            >
              <Image
                src={TOUR_IMAGES[index]}
                alt={tour.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.15]"
              />
              {/* Gradient overlay for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent z-[5]"></div>
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="icon"
                  size="sm"
                  className="bg-white hover:bg-gray-100 transition-transform duration-300 group-hover:rotate-45"
                  aria-label="View tour"
                >
                  <Arrow direction="up-right" className="text-black" />
                </Button>
              </div>
              <div className="absolute bottom-6 left-6 z-10 text-white">
                <h3 className="font-bold text-xl mb-1">{tour.title}</h3>
                <p className="opacity-90">
                  <span className="text-xl font-semibold">${tour.price}</span>
                  <span className="text-sm"> / {tour.perPerson}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

