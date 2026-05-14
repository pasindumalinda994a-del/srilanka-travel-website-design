"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Label, H2Primary, Paragraph } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type VideoTourProps = {
  content: HomeContent["videoTour"];
};

export default function VideoTour({ content }: VideoTourProps) {
  const videoTour = content;
  const paragraphLines = videoTour.paragraph.split("\n");
  const taglineLines = videoTour.tagline.split("\n");
  const statCaptionLines = videoTour.statCaption.split("\n");

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headingRef.current ||
      !paragraphRef.current ||
      !videoContainerRef.current
    )
      return;

    gsap.registerPlugin(ScrollTrigger);

    // Initial state: h2 and paragraph slide up + fade
    gsap.set([headingRef.current, paragraphRef.current], {
      y: 50,
      opacity: 0,
    });

    // Video container: y 100, opacity 0
    gsap.set(videoContainerRef.current, {
      y: 100,
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
        videoContainerRef.current,
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
              <Label>{videoTour.label}</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end">
              <div ref={headingRef} className="md:col-span-6 lg:col-span-7">
                <H2Primary className="ml-0 md:ml-18">
                  {videoTour.heading.line1}
                  <br />
                  {videoTour.heading.line2}
                </H2Primary>
              </div>

              <div
                ref={paragraphRef}
                className="md:col-span-6 lg:col-span-5 flex justify-end text-right"
              >
                <Paragraph>
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
        <div className="grid grid-cols-12 gap-3 mt-6 md:mt-8">
          <div className="col-span-12">
            <div
              ref={videoContainerRef}
              className="group relative w-full h-[650px] rounded-3xl overflow-hidden"
            >
              <Image
                src="/images/homepage/s-video-tour-image.jpeg"
                alt="Verdant terraced hills and tea plantation landscape"
                fill
                className="object-cover transition-transform duration-500 ease-out group-has-[.play-button:hover]:scale-[1.15] group-has-[.play-button:hover]:blur-[1px]"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="play-button w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-black/15 hover:scale-110 transition-transform duration-200"
                  aria-label="Play video"
                >
                  <Image
                    src="/icons/play.svg"
                    alt="Play video"
                    width={96}
                    height={96}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </button>
              </div>

              <div className="absolute top-6 md:top-8 lg:top-12 right-6 md:right-8 lg:right-12 text-white text-right flex flex-col items-end">
                <div className="text-6xl md:text-7xl lg:text-8xl font-[500] mb-2">
                  {videoTour.stat}
                </div>
                <Paragraph className="text-white text-base md:text-lg max-w-xs text-right">
                  {statCaptionLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < statCaptionLines.length - 1 && <br />}
                    </span>
                  ))}
                </Paragraph>
              </div>

              <div className="absolute bottom-6 md:bottom-8 lg:bottom-12 left-6 md:left-8 lg:left-12 text-white">
                <Paragraph className="text-white text-lg md:text-xl lg:text-2xl">
                  {taglineLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < taglineLines.length - 1 && <br />}
                    </span>
                  ))}
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

