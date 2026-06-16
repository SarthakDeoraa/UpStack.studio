"use client";

import Link from "next/link";

interface WorkCardProps {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
  index: number;
}

export default function WorkCard({ title, description, image, link, index }: WorkCardProps) {
  // Use the link if provided, otherwise fallback to #
  const href = link || "#";

  return (
    <Link href={href} className="block w-full">
      <div
        className="relative group cursor-pointer rounded-xl border border-white/10 overflow-hidden aspect-[3/2] sm:aspect-[16/9] transition-all duration-500 hover:shadow-[15px_15px_40px_-10px_rgba(255,79,0,0.4)]"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        {/* Project Background Image (if available) */}
        {image && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.2] sm:brightness-100 transition-all duration-700 group-hover:scale-105 sm:group-hover:brightness-[0.2]"
            style={{ backgroundImage: `url('${image}')` }}
          />
        )}

        {/* Hover Orange Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 bg-cover bg-center"
          style={{ backgroundImage: "url('/work-card-hover-bg.png')" }}
        />

        {/* Hover Content container */}
        <div className="absolute inset-0 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          {/* Centered Title */}
          {title && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <h3 className="font-clash text-[clamp(2rem,5vw,4rem)] leading-tight text-white tracking-wide text-center">
                {title}
              </h3>
            </div>
          )}

          {/* Bottom Left Description */}
          {description && (
            <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6">
              <p className="text-sm md:text-base text-white/80 flex items-center gap-3">
                {description}
                <span className="text-white/60 text-lg">→</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
