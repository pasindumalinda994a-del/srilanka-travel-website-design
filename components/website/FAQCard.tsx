"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Arrow from "./Arrow";

interface FAQCardProps {
  question: string;
  answer: string;
}

export default function FAQCard({ question, answer }: FAQCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const answerWrapperRef = useRef<HTMLDivElement | null>(null);
  const answerContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = answerWrapperRef.current;
    const content = answerContentRef.current;
    if (!wrapper || !content) return;

    if (isOpen) {
      gsap.set(content, { y: 50, opacity: 0 });
      gsap.to(wrapper, {
        height: "auto",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(content, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        delay: 0.05,
      });
    } else {
      gsap.to(content, {
        y: 50,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(wrapper, {
        height: 0,
        duration: 0.35,
        ease: "power2.in",
        delay: 0.05,
      });
    }
  }, [isOpen]);

  return (
    <div className="bg-gray-50 rounded-2xl p-4 md:p-5 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 text-left"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Collapse answer" : "Expand answer"}
      >
        <span className="font-medium text-base md:text-lg flex-1">
          {question}
        </span>
        <span
          className={`inline-flex shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
        >
          <Arrow direction="up-right" className="text-black" />
        </span>
      </button>
      <div
        ref={answerWrapperRef}
        style={{ height: 0, overflow: "hidden" }}
        className="origin-top"
      >
        <div ref={answerContentRef} className="mt-2 pt-2">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
