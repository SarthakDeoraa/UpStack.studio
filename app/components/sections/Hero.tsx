"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

/* ─── Inline SVG Icons ─── */
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

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-end pb-16 sm:pb-20 md:pb-24 lg:items-center lg:pb-0"
    >
      {/* Right Blob Parallax Wrapper */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2] transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)` }}
      >
        {/* Right blob wrapper — blob + grain move together */}
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

      {/* Left Blob Parallax Wrapper */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2] transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)` }}
      >
        {/* Left blob wrapper */}
        <div
          className="blob-wrapper absolute pointer-events-none"
        style={{
          bottom: "-10vh",
          transform: "translateY(-50%)",
          left: "min(-25vw, -25vh)",
          width: "max(60vw, clamp(450px, 85vw, 100vh))",
          height: "clamp(450px, 85vw, 100vh)",
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
      {/* Fade Overlays — specifically targeted to hide grid without clipping blobs */}
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
      {/* <div className="relative z-[10] w-full px-6 md:px-12 lg:px-20 pt-32 md:pt-40 lg:pt-0">
        <div className="max-w-3xl">
          <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.01em] text-cream mb-6 md:mb-8">
            ELEVATING
            <br />
            BEYOND
            <br />
            CONSCIENCE
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-md leading-relaxed mb-8 md:mb-10">
            No buzzwords. No clutter. Just sharp code,{" "}
            <span className="text-orange italic">bold design</span>, and a
            solution built for you — right now.
          </p>

          <a
            href="#contact"
            className="cta-button inline-flex items-center gap-3 border border-white/40 rounded-full px-7 py-3 text-sm md:text-base font-body text-white transition-all hover:gap-4"
          >
            <span>Book a call</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div> */}
    </section>
  );
}
