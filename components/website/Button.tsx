"use client";

import { ReactNode, ButtonHTMLAttributes, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
  showArrow?: boolean;
  arrowDirection?: "up-right" | "up" | "right" | "down" | "left" | "down-right" | "down-left" | "up-left";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  showArrow = false,
  arrowDirection = "up-right",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-black text-white rounded-full",
    secondary: "bg-white text-black rounded-full",
    icon: "bg-black text-white rounded-full aspect-square -ml-3",
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    icon: {
      sm: "w-10 h-10",
      md: "w-12 h-12",
      lg: "w-14 h-14",
    },
  };
  
  const finalSizeClasses = variant === "icon" 
    ? `${sizeClasses.icon[size]} p-0`
    : sizeClasses[size];
  const gapClass = showArrow ? "gap-2" : "";

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const topTextRef = useRef<HTMLSpanElement | null>(null);
  const bottomTextRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const hoverTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!buttonRef.current || !topTextRef.current || !bottomTextRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(bottomTextRef.current, { y: 50 });
      gsap.set(topTextRef.current, { y: 0 });
      if (arrowRef.current) {
        gsap.set(arrowRef.current, { rotate: 0, transformOrigin: "50% 50%" });
      }

      hoverTimeline.current = gsap.timeline({ paused: true })
        .to(
          topTextRef.current,
          {
            y: -50,
            duration: 0.35,
            ease: "power3.out",
          },
          0
        )
        .to(
          bottomTextRef.current,
          {
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          },
          0
        )
        .to(
          arrowRef.current,
          {
            rotate: 45,
            duration: 0.35,
            ease: "power3.out",
          },
          0
        );
    }, buttonRef);

    return () => {
      ctx.revert();
    };
  }, []);
  
  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${finalSizeClasses} ${gapClass} ${className}`}
      onMouseEnter={() => hoverTimeline.current?.play()}
      onMouseLeave={() => hoverTimeline.current?.reverse()}
      {...props}
    >
      {variant === "icon" ? (
        <span>{children}</span>
      ) : (
        <span className="relative inline-block overflow-hidden">
          <span ref={topTextRef} className="block">
            {children}
          </span>
          <span
            ref={bottomTextRef}
            className="block absolute left-0 top-0"
          >
            {children}
          </span>
        </span>
      )}
      {showArrow && (
        <span className="inline-flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            ref={arrowRef}
            viewBox="0 -960 960 960"
            className="w-5 h-5 origin-center"
          >
            <path d="M246.67-244 200-290.67l402.67-402.66H236V-760h480v480h-66.67v-366.67L246.67-244Z" />
          </svg>
        </span>
      )}
    </button>
  );
}
