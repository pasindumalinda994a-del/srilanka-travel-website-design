"use client";

import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let rafId: number;
    let lenisInstance: { destroy: () => void } | null = null;
    let cancelled = false;

    void (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      });
      lenisInstance = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, []);

  return <>{children}</>;
}
