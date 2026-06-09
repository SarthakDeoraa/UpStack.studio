"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import TypographicGrid, { type GridMetrics } from "../TypographicGrid";
import WorkCard from "../WorkCard";
import { projects } from "../../data/projects";

// Background layers
function WorkBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div
        className="absolute top-0 left-0 w-full h-1/2"
        style={{
          backgroundImage: "url('/work-bg.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{
          backgroundImage: "url('/work-bg.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          transform: "scaleY(-1)",
        }}
      />
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 w-full h-32 md:h-48 z-[1]"
        style={{
          background: "linear-gradient(to bottom, var(--color-bg) 0%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 md:h-48 z-[1]"
        style={{
          background: "linear-gradient(to top, var(--color-bg) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

function GridHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [metrics, setMetrics] = useState<GridMetrics | null>(null);

  const measure = useCallback(() => {
    if (!containerRef.current || !textRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const text = textRef.current.getBoundingClientRect();
    setMetrics({
      containerWidth: container.width,
      containerHeight: container.height,
      lines: [{
        top: text.top - container.top,
        bottom: text.bottom - container.top,
        left: text.left - container.left,
        right: text.right - container.left,
      }]
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [measure]);

  useEffect(() => {
    document.fonts.ready.then(measure);
  }, [measure]);

  return (
    <div ref={containerRef} className="relative w-fit inline-block">
      <TypographicGrid 
        metrics={metrics} 
        color="#FF4F00" 
        tightBounds={true}
        hideMajorLines={true}
      />
      <h2 ref={textRef} className={`relative z-10 ${className}`}>
        {children}
      </h2>
    </div>
  );
}

export default function OurWork() {
  return (
    <section id="our-work" className="relative w-full">

      {/* ══════ Desktop Layout (static, no sticky) ══════ */}
      <div className="hidden sm:block">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 pt-8 md:pt-12 pb-0">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
            <GridHeading className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[0.08em] uppercase text-white">
              Our Work
            </GridHeading>
            <p className="text-sm md:text-base text-white/60 md:whitespace-nowrap leading-relaxed md:pb-2">
              &ldquo;Building stacks with{" "}
              <span className="text-white font-semibold">supreme quality</span>{" "}
              and{" "}
              <span className="text-white font-semibold">systematic workflows</span>
              &rdquo;
            </p>
          </div>
        </div>

        {/* Cards grid with bg */}
        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
          <WorkBackground />
          <div className="relative z-10 h-full flex items-center px-10 md:px-20 lg:px-32 py-8 md:py-12">
            <div className="w-full grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-14 lg:gap-x-10 lg:gap-y-16">
              {projects.map((project, i) => (
                <WorkCard
                  key={i}
                  index={i}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-16 md:pb-24">
          <h3 className="font-brand text-[clamp(2rem,6vw,5rem)] leading-[1.1] text-white">
            Your dream, our{" "}
            <span className="text-orange">build</span>
          </h3>
        </div>
      </div>

      {/* ══════ Mobile Layout ══════ */}
      <div className="sm:hidden relative">
        {/* Still background, freezes as soon as section reaches top */}
        <div className="sticky top-0 h-screen w-full z-0 pointer-events-none">
          <WorkBackground />
        </div>

        {/* Content wrapper pulled up over the background */}
        <div className="relative z-10 -mt-[100vh] flex flex-col min-h-[100vh]">
          {/* Header at top (Sticky, z-20 so it covers cards) */}
          <div className="sticky top-0 z-20 bg-[var(--color-bg)] px-6 pt-10 pb-4">
            <GridHeading className="font-display text-[clamp(2.2rem,8vw,3rem)] leading-[1] tracking-[0.08em] uppercase text-white text-center">
              Our Work
            </GridHeading>
            <p className="text-sm text-white/60 leading-relaxed text-center mt-3">
              &ldquo;Building stacks with{" "}
              <span className="text-white font-semibold">supreme quality</span>{" "}
              and{" "}
              <span className="text-white font-semibold">systematic workflows</span>
              &rdquo;
            </p>
            {/* Soft fade below header */}
            <div
              className="absolute bottom-0 left-0 w-full h-24 translate-y-full pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, var(--color-bg) 10%, transparent 100%)",
              }}
            />
          </div>

          {/* Scrolling cards (z-10 so they go under header/tagline) */}
          <div className="relative z-10 pt-16 pb-16 px-6 flex flex-col gap-6 flex-1">
            {projects.map((project, i) => (
              <WorkCard
                key={i}
                index={i}
                title={project.title}
                description={project.description}
                image={project.image}
                link={project.link}
              />
            ))}
          </div>

          {/* Tagline at bottom (Sticky, z-20 so it covers cards) */}
          <div className="sticky bottom-0 z-20 bg-[var(--color-bg)] px-6 pt-6 pb-8 mt-auto">
            {/* Soft fade above tagline */}
            <div
              className="absolute top-0 left-0 w-full h-24 -translate-y-full pointer-events-none"
              style={{
                background: "linear-gradient(to top, var(--color-bg) 10%, transparent 100%)",
              }}
            />
            <h3 className="font-brand text-[clamp(1.8rem,7vw,3rem)] leading-[1.1] text-white text-center">
              Your dream, our{" "}
              <span className="text-orange">build</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
