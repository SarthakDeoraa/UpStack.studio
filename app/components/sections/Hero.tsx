"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import TypographicGrid, { type GridMetrics } from "../TypographicGrid";
import Button from "../Button";

// Icons
function ArrowRight({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// Hero
export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gridMetrics, setGridMetrics] = useState<GridMetrics | null>(null);

  // Track text positions for grid
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];

  const measureGrid = useCallback(() => {
    const container = contentRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const lines = lineRefs
      .map((ref) => {
        if (!ref.current) return null;
        const rect = ref.current.getBoundingClientRect();
        return {
          top: rect.top - containerRect.top,
          bottom: rect.bottom - containerRect.top,
          left: rect.left - containerRect.left,
          right: rect.right - containerRect.left,
        };
      })
      .filter(Boolean) as GridMetrics["lines"];

    setGridMetrics({
      containerWidth: containerRect.width,
      containerHeight: containerRect.height,
      lines,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Measure grid layout
  useLayoutEffect(() => {
    measureGrid();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measureGrid, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [measureGrid]);

  // Wait for custom fonts
  useEffect(() => {
    document.fonts.ready.then(() => {
      measureGrid();
    });
  }, [measureGrid]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Right Blob */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2] transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)` }}
      >
        <div
          className="blob-wrapper absolute pointer-events-none"
        style={{
          top: "-15vh",
          right: "min(-30vw, -25vh)",
          width: "max(75vw, clamp(550px, 95vw, 110vh))",
          height: "clamp(550px, 95vw, 110vh)",
          mixBlendMode: "screen",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 40%)"
        }}
        aria-hidden="true"
      >
        <img
          src="/right-blob.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src="/texture.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          style={{ 
            mixBlendMode: "multiply",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)"
          }}
        />
      </div>
      </div>

      {/* Left Blob */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2] transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)` }}
      >
        <div
          className="blob-wrapper absolute pointer-events-none"
        style={{
          bottom: "10vh",
          left: "min(-25vw, -25vh)",
          width: "max(45vw, clamp(350px, 60vw, 75vh))",
          height: "clamp(350px, 60vw, 75vh)",
          animationDelay: "-5s",
          animationDuration: "10s",
          mixBlendMode: "screen",
          WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 50%)",
          maskImage: "linear-gradient(to left, transparent 0%, black 50%)"
        }}
        aria-hidden="true"
      >
        <img
          src="/left-blob.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src="/texture.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          style={{ 
            mixBlendMode: "multiply",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 90%)",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)"
          }}
        />
      </div>
      </div>
      {/* Top Fade */}
      <div className="absolute inset-0 z-[3] pointer-events-none" aria-hidden="true">
       
        <div 
          className="absolute top-0 inset-x-0 h-40 md:h-64 bg-gradient-to-b from-[#232323] via-[#232323]/50 to-transparent" 
          style={{ 
            WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 80%)",
            maskImage: "linear-gradient(to right, black 40%, transparent 80%)" 
          }}
        />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-[10] w-full px-6 md:px-12 lg:px-20 pt-20 md:pt-24 lg:pt-16">
        {/* Background Grid */}
        <TypographicGrid metrics={gridMetrics} />

        <div className="relative max-w-3xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="relative z-[1] font-brand text-[clamp(2.8rem,6.5vw,6rem)] leading-[1.2] tracking-[0.03em] text-white mb-0 md:-mb-5">
            <span ref={lineRefs[0]} className="inline-block">ELEVATING</span>
            <br />
            <span ref={lineRefs[1]} className="inline-block">BEYOND</span>
            <br />
            <span ref={lineRefs[2]} className="inline-block">CONSCIENCE</span>
          </h1>

          <p className="relative z-10 text-sm sm:text-base md:text-lg text-white/70 max-w-lg leading-relaxed mb-12 md:mb-16">
            No buzzwords. No clutter. Just sharp code,{" "}
            <span className="text-orange italic">bold design</span>, and a
            solution built for you — right now.
          </p>

          <Button href="#contact" className="mt-6">
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
}
