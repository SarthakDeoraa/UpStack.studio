"use client";

import { useState, useCallback } from "react";
import { services, type Service } from "../../data/services";
import Button from "../Button";

/* ─── Arrow Down Icon (circled) ─── */
function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
      <line x1="12" y1="8" x2="12" y2="16" />
      <polyline points="8 12 12 16 16 12" />
    </svg>
  );
}

/* ─── Single Accordion Item ─── */
function ServiceItem({
  service,
  index,
  isOpen,
  isFirst,
  isLast,
  onToggle,
}: {
  service: Service;
  index: number;
  isOpen: boolean;
  isFirst: boolean;
  isLast: boolean;
  onToggle: () => void;
}) {
  const cornerClasses = [
    "rounded-xl md:rounded-2xl",
    isFirst ? "rounded-t-[1.5rem] md:rounded-t-[2.5rem]" : "",
    isLast ? "rounded-b-[1.5rem] md:rounded-b-[2.5rem]" : "",
  ].join(" ");
  return (
    <div>
      {/* Dark inner panel */}
      <div className={`${cornerClasses} bg-[var(--color-bg)] overflow-hidden`}>
        {/* Header / Toggle */}
        <button
          id={`service-toggle-${index}`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`service-panel-${index}`}
          className={`w-full flex items-center justify-between px-6 md:px-10 py-5 md:py-6 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[var(--color-orange)] focus-visible:outline-offset-[-2px] ${cornerClasses}`}
        >
          <h3 className="font-clash text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-[0.06em] uppercase text-white text-center w-full leading-none">
            {service.title}
          </h3>
          <span
            className={`shrink-0 ml-4 transition-transform duration-300 ease-out ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ArrowDown className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </span>
        </button>

        {/* Collapsible Content */}
        <div
          id={`service-panel-${index}`}
          role="region"
          aria-labelledby={`service-toggle-${index}`}
          className="grid transition-[grid-template-rows] duration-400 ease-out"
          style={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
          }}
        >
          <div className="overflow-hidden">
            <div className="px-6 md:px-16 lg:px-24 pb-8 md:pb-10 pt-2">
              <p className="text-white/70 text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto">
                {service.description}
              </p>
              <div className="flex justify-center mt-6 md:mt-8">
                <Button href="#contact" className="!text-base md:!text-lg !px-6 !py-1.5">
                  Book a call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Services Section ─── */
export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section id="services" className="relative w-full -mt-[3rem] md:-mt-[4rem]">
      {/* ── Full section: white bg + 30% texture ── */}
      <div className="relative bg-white">
        {/* 30% opacity texture overlay on white */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "url('/texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* ── Header Area ── */}
        <div className="relative z-10 pt-24 md:pt-32 pb-6 md:pb-8 px-6">
          {/* Corner dots */}
          <div className="absolute top-14 md:top-22 left-6 md:left-8 w-5 h-5 md:w-7 md:h-7 rounded-full bg-[var(--color-bg)]" />
          <div className="absolute top-14 md:top-22 right-6 md:right-8 w-5 h-5 md:w-7 md:h-7 rounded-full bg-[var(--color-bg)]" />

          {/* Title */}
          <div className="flex flex-col items-center">
            <h2 className="font-clash text-[clamp(2.5rem,12vw,8rem)] leading-[1] tracking-[0.06em] uppercase font-semibold whitespace-nowrap">
              <span className="text-[var(--color-orange)]">{"{ "}</span>
              <span className="text-[var(--color-bg)]">SERVICES</span>
              <span className="text-[var(--color-orange)]">{" }"}</span>
            </h2>
            <p className="font-body text-sm md:text-base text-[var(--color-bg)]/50 mt-3 tracking-widest italic">
              what we can do
            </p>
          </div>
        </div>

        {/* ── Textured Box with Accordions ── */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-24 md:pb-32">
          {/* Full opacity texture box */}
          <div
            className="rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 lg:p-5"
            style={{
              backgroundImage: "url('/texture.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Accordion items inside the textured box */}
            <div className="flex flex-col gap-3 md:gap-4">
              {services.map((service, i) => (
                <ServiceItem
                  key={service.title}
                  service={service}
                  index={i}
                  isOpen={openIndex === i}
                  isFirst={i === 0}
                  isLast={i === services.length - 1}
                  onToggle={() => handleToggle(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
