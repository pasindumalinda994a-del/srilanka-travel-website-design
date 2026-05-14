"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TestimonialCard, {
  type TestimonialCardProps,
} from "./TestimonialCard";

const ANIMATION = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

export interface TestimonialMarqueeProps {
  items: readonly TestimonialCardProps[];
  speed?: number;
  direction?: "up" | "down";
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

function useResizeObserver(
  callback: () => void,
  refs: Array<React.RefObject<Element | null>>,
  deps: React.DependencyList
) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.ResizeObserver) {
      const onResize = () => callback();
      window.addEventListener("resize", onResize);
      callback();
      return () => window.removeEventListener("resize", onResize);
    }
    const observers = refs.map((ref) => {
      if (!ref.current) return null;
      const obs = new ResizeObserver(callback);
      obs.observe(ref.current);
      return obs;
    });
    callback();
    return () => observers.forEach((o) => o?.disconnect());
  }, deps);
}

function useMarqueeLoop(
  trackRef: React.RefObject<HTMLDivElement | null>,
  velocity: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  direction: "up" | "down"
) {
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (seqHeight <= 0) return;

    offsetRef.current = ((offsetRef.current % seqHeight) + seqHeight) % seqHeight;
    track.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;

    if (prefersReduced) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const animate = (t: number) => {
      if (lastRef.current == null) lastRef.current = t;
      const dt = Math.max(0, (t - lastRef.current) / 1000);
      lastRef.current = t;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : velocity;
      const ease = 1 - Math.exp(-dt / ANIMATION.SMOOTH_TAU);
      velRef.current += (target - velRef.current) * ease;

      let next = offsetRef.current + velRef.current * dt;
      next = ((next % seqHeight) + seqHeight) % seqHeight;
      offsetRef.current = next;
      track.style.transform = `translate3d(0, ${-next}px, 0)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [velocity, seqHeight, isHovered, hoverSpeed, direction]);
}

export default function TestimonialMarquee({
  items,
  speed = 40,
  direction = "down",
  gap = -10,
  pauseOnHover = true,
  hoverSpeed,
  className = "",
  style,
  "aria-label": ariaLabel = "Testimonials",
}: TestimonialMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);

  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(ANIMATION.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    return pauseOnHover ? 0 : undefined;
  }, [hoverSpeed, pauseOnHover]);

  const velocity = useMemo(() => {
    const mag = Math.abs(speed);
    const mul = direction === "down" ? -1 : 1;
    return mag * mul;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const seq = seqRef.current;
    if (!container || !seq) return;

    const ch = container.clientHeight;
    const sh = seq.getBoundingClientRect().height;
    if (sh <= 0) return;

    setSeqHeight(Math.ceil(sh));
    const needed =
      Math.ceil(ch / sh) + ANIMATION.COPY_HEADROOM;
    setCopyCount(Math.max(ANIMATION.MIN_COPIES, needed));
  }, []);

  useResizeObserver(
    updateDimensions,
    [containerRef, seqRef],
    [items.length, gap]
  );

  useMarqueeLoop(
    trackRef,
    velocity,
    seqHeight,
    isHovered,
    effectiveHoverSpeed,
    direction
  );

  const onEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true);
  }, [effectiveHoverSpeed]);
  const onLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false);
  }, [effectiveHoverSpeed]);

  const listStyle = useMemo(
    () => ({ marginBottom: gap }) as React.CSSProperties,
    [gap]
  );

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden h-full inline-block ${className}`}
      style={style}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white via-white/70 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/70 to-transparent z-10" />
      <div
        ref={trackRef}
        className="flex flex-col will-change-transform select-none relative z-0 motion-reduce:transform-none w-full"
      >
        {Array.from({ length: copyCount }).map((_, copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? seqRef : undefined}
            className="flex flex-col w-full"
            aria-hidden={copyIndex > 0}
          >
            {items.map((item, i) => (
              <div
                key={`${copyIndex}-${i}`}
                className="flex-none w-full"
                style={listStyle}
              >
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
