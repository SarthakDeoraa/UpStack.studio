"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ─── Inline SVG Icons ─── */
function ArrowRight({ size = 18, className = "" }: { size?: number; className?: string }) {
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
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function MenuIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
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
      className={className}
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function XIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
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
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Our Work", href: "#our-work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setClosing(false);
    }, 250);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (mobileOpen) closeMobile();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [mobileOpen, closeMobile]
  );

  return (
    <nav
      id="navbar"
      className="absolute top-0 left-0 right-0 z-50 py-6 md:py-8"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="shrink-0" aria-label="UpStack Studio Home">
          <Image
            src="/logo.svg"
            alt="UpStack Studio"
            width={200}
            height={42.5}
            preload
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8 lg:gap-15">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link font-display text-sm lg:text-xl tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="nav-link group flex items-center gap-2 font-display text-sm lg:text-xl tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors"
          >
            Contact Us
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
          onClick={() => {
            if (mobileOpen) {
              closeMobile();
            } else {
              setMobileOpen(true);
            }
          }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <div className="relative w-6 h-6">
            <MenuIcon
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                mobileOpen
                  ? "opacity-0 rotate-90 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <XIcon
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                mobileOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`lg:hidden absolute top-full left-0 right-0 navbar-solid border-t border-white/5 ${
            closing ? "mobile-menu-exit" : "mobile-menu-enter"
          }`}
        >
          <div className="px-6 py-8 flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display text-2xl tracking-[0.12em] uppercase text-white/80 hover:text-white hover:bg-white/5 rounded-lg px-4 py-3 transition-all"
                style={{
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="group flex items-center gap-3 font-display text-2xl tracking-[0.12em] uppercase text-orange hover:text-orange-lt hover:bg-white/5 rounded-lg px-4 py-3 transition-all mt-2"
              style={{
                animationDelay: `${NAV_LINKS.length * 50}ms`,
              }}
            >
              Contact Us
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
