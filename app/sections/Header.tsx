"use client";

import Link from "next/link";
import type { HomeContent } from "@/app/HomeContent";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

type HeaderProps = {
  content: HomeContent["header"];
};

export default function Header({ content }: HeaderProps) {
  const header = content;
  const headerRootRef = useRef<HTMLElement | null>(null);
  const navItemRefs = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    const el = headerRootRef.current;
    if (!el) return;

    const sync = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${Math.round(el.getBoundingClientRect().height)}px`
      );
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    window.addEventListener("resize", sync);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);

  useEffect(() => {
    const elements = navItemRefs.current.filter(Boolean);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        const underline = el.querySelector<HTMLElement>("[data-underline]");
        if (!underline) return;

        gsap.set(underline, { scaleX: 0, transformOrigin: "left" });

        const onEnter = () => {
          gsap.to(underline, {
            scaleX: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        };

        const onLeave = () => {
          gsap.to(underline, {
            scaleX: 0,
            duration: 0.4,
            ease: "power3.inOut",
          });
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        (el as any)._onEnter = onEnter;
        (el as any)._onLeave = onLeave;
      });
    });

    return () => {
      elements.forEach((el) => {
        const onEnter = (el as any)._onEnter as () => void;
        const onLeave = (el as any)._onLeave as () => void;
        if (onEnter) el.removeEventListener("mouseenter", onEnter);
        if (onLeave) el.removeEventListener("mouseleave", onLeave);
      });
      ctx.revert();
    };
  }, []);
  return (
    <header ref={headerRootRef} className="w-full">
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-3 items-center py-6">
          <Link href="/" className="col-span-6 md:col-span-3 flex items-center gap-3 md:gap-4 min-w-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="w-6 h-6 fill-current"
            >
              <path d="m40-240 240-320 190 253.33h316.67L560-608 443.33-453.33l-42-55.34L560-720l360 480H40Zm513.67-66.67Zm-380.34 0h213.34L280-449 173.33-306.67Zm0 0h213.34-213.34Z" />
            </svg>
            <span className="text-lg md:text-base font-medium">{header.logo}</span>
          </Link>

          <div className="hidden md:flex col-span-12 md:col-span-6 justify-center">
            <p className="text-sm md:text-base font-medium">
              <span className="opacity-75">{header.basedIn}</span> {header.region}
            </p>
          </div>

          <div className="col-span-6 md:col-span-3 flex justify-end items-center gap-2 md:gap-4">
            <button
              type="button"
              aria-label="Open menu"
              className="flex md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
            <div className="hidden md:flex gap-6 md:gap-8">
              <Link href="/tours">
                <span
                  ref={(el) => {
                    if (el) navItemRefs.current[0] = el;
                  }}
                  className="relative inline-flex flex-col cursor-pointer font-medium"
                >
                  <span>{header.nav.tours}</span>
                  <span
                    data-underline
                    className="pointer-events-none mt-0.5 h-[2px] w-full bg-current origin-left scale-x-0"
                  />
                </span>
              </Link>
              <Link href="/about">
                <span
                  ref={(el) => {
                    if (el) navItemRefs.current[1] = el;
                  }}
                  className="relative inline-flex flex-col cursor-pointer font-medium"
                >
                  <span>{header.nav.about}</span>
                  <span
                    data-underline
                    className="pointer-events-none mt-0.5 h-[2px] w-full bg-current origin-left scale-x-0"
                  />
                </span>
              </Link>
              <Link href="/blog">
                <span
                  ref={(el) => {
                    if (el) navItemRefs.current[2] = el;
                  }}
                  className="relative inline-flex flex-col cursor-pointer font-medium"
                >
                  <span>{header.nav.blog}</span>
                  <span
                    data-underline
                    className="pointer-events-none mt-0.5 h-[2px] w-full bg-current origin-left scale-x-0"
                  />
                </span>
              </Link>
              <Link href="/gallery">
                <span
                  ref={(el) => {
                    if (el) navItemRefs.current[3] = el;
                  }}
                  className="relative inline-flex flex-col cursor-pointer font-medium"
                >
                  <span>{header.nav.gallery}</span>
                  <span
                    data-underline
                    className="pointer-events-none mt-0.5 h-[2px] w-full bg-current origin-left scale-x-0"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
