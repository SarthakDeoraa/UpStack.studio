"use client";

import { useState } from "react";
import Button from "../Button";

const pricingPlans = [
  {
    planName: "Free Plan",
    price: "Free",
    features: [
      "20 Minute call and consultation",
      "Brand analysis and audit.",
      "Brand Outlines and Guidelines",
    ],
  },
  {
    planName: "Standard Plan",
    price: "$499",
    features: [
      "Project ready within in 3-4 weeks.",
      "Responsive design.",
      "Pleasant Visual design matching your brand.",
      "Essential Features Only",
      "Basic SEO optimization.",
      "30 days of support.",
    ],
  },
  {
    planName: "Pro Plan",
    price: "$999",
    features: [
      "Project ready within in 1-2 weeks.",
      "Responsive design.",
      "Advanced Animations & Interactions.",
      "Full SEO & Performance optimization.",
      "Custom integrations.",
      "90 days of support.",
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0 text-[var(--color-orange)] mt-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function PricingCard({
  planName,
  price,
  features,
  showCTA,
}: {
  planName: string;
  price: string;
  features: string[];
  showCTA?: boolean;
}) {
  return (
    <div className="group relative w-full rounded-[2rem] border border-[var(--color-orange)]/20 overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 shadow-[0_0_20px_rgba(255,79,0,0.03)] hover:shadow-[0_20px_40px_rgba(255,79,0,0.2)] hover:border-[var(--color-orange)]/50 bg-[rgba(255,255,255,0.02)] backdrop-blur-xl z-10 hover:z-20 h-full flex flex-col cursor-default">
      {/* Darker hover background & glow */}
      <div
        className="absolute inset-0 z-0 opacity-10 group-hover:opacity-100 transition-opacity duration-500 bg-cover bg-center"
        style={{ backgroundImage: "url('/work-card-hover-bg.png')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        <p className="text-white/80 font-body text-sm md:text-base mb-4 font-medium tracking-wide">
          {planName}
        </p>
        <h3 className="font-clash font-semibold text-5xl lg:text-6xl mb-8 tracking-wide bg-gradient-to-l from-[var(--color-orange)] to-white bg-clip-text text-transparent w-max">
          {price}
        </h3>

        <div className="w-full h-px bg-white/10 mb-8" />

        <ul className="flex flex-col gap-4 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-white/70 text-sm md:text-base">
              <CheckIcon />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {showCTA && (
          <div className="mt-8 flex justify-center w-full">
            <Button href="#contact" className="!text-base md:!text-lg !px-6 !py-1.5 w-full">
              Book a call
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative w-full rounded-t-[2rem] md:rounded-t-[3rem] bg-[var(--color-bg)] z-10 -mt-[2rem] md:-mt-[3rem] pt-20 md:pt-32 pb-10 md:pb-16 overflow-hidden"
    >
      {/* Corner Glass Dots */}
      <div className="absolute top-8 md:top-12 left-6 md:left-12 w-6 h-6 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/20 backdrop-blur-md z-20" />
      <div className="absolute top-8 md:top-12 right-6 md:right-12 w-6 h-6 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/20 backdrop-blur-md z-20" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-2 md:pt-3 lg:pt-2">
        {/* Desktop Title Background (Moved higher to be visible) */}
        <div className="hidden md:flex absolute top-0 left-0 right-0 justify-center pointer-events-none z-0 overflow-hidden">
          <h2 className="font-clash text-[clamp(6rem,18vw,16rem)] leading-none uppercase font-bold bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent select-none whitespace-nowrap">
            Pricing
          </h2>
        </div>

        {/* Mobile Title (Normal stacking) */}
        <div className="md:hidden flex justify-center mb-10 relative z-10">
          <h2 className="font-clash text-6xl uppercase font-bold bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent text-center whitespace-nowrap">
            Pricing
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 items-stretch pt-0 md:pt-[15%] lg:pt-[12%]">
          {pricingPlans.map((plan, i) => (
            <PricingCard
              key={i}
              planName={plan.planName}
              price={plan.price}
              features={plan.features}
              showCTA={plan.planName === "Free Plan"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
