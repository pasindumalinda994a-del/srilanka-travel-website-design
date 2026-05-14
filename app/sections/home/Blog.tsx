"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Label, H2Primary, Button, Arrow } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type BlogProps = {
  content: HomeContent["blog"];
};

export default function Blog({ content }: BlogProps) {
  const blog = content;
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const blogCards = gsap.utils.toArray<HTMLElement>(
      sectionRef.current.querySelectorAll("[data-blog-card]")
    );

    gsap.registerPlugin(ScrollTrigger);

    // Initial state: header slides up + fades
    gsap.set(headerRef.current, {
      y: 50,
      opacity: 0,
    });

    gsap.set(blogCards, {
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
    }).to(
      blogCards,
      {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.15,
          from: "start",
        },
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
          <div
            ref={headerRef}
            className="col-span-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8"
          >
            <div className="flex flex-col gap-6 md:gap-8">
              <Label className="self-start">{blog.label}</Label>

              <H2Primary className="font-bold ml-18">
                {blog.heading.line1}
                <br />
                {blog.heading.line2}
              </H2Primary>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <Button variant="primary" size="md">
                {blog.cta}
              </Button>
              <Button variant="icon" size="md" aria-label="Explore more">
                <Arrow direction="up-right" />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mt-6 md:mt-8">
          {blog.items.map((item, index) => (
            <div
              key={item.title}
              data-blog-card
              className={`col-span-12 ${
                index === 0 ? "md:col-span-8" : "md:col-span-4"
              } relative rounded-3xl overflow-hidden`}
              style={{ height: "500px" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 z-10 text-white">
                <p className="text-sm opacity-90 mb-2">{item.date}</p>
                <h3 className="font-500 text-3xl">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

